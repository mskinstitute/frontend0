// Python execution tracer script injected into Pyodide

export const PYTHON_TRACER_CODE = `
import sys
import io
import json
import types

def _msk_serialize_val(val, heap, visited_ids, depth=0):
    val_id = str(id(val))
    
    # 1. Primitives
    if val is None:
        return {"type": "none", "typeStr": "NoneType", "repr": "None", "isPrimitive": True}
    elif isinstance(val, bool):
        return {"type": "bool", "typeStr": "bool", "repr": str(val), "isPrimitive": True}
    elif isinstance(val, (int, float)):
        tname = "int" if isinstance(val, int) else "float"
        return {"type": tname, "typeStr": tname, "repr": str(val), "isPrimitive": True}
    elif isinstance(val, str):
        # Truncate very long strings for safety
        r = repr(val)
        if len(r) > 100:
            r = r[:97] + "...'"
        return {"type": "str", "typeStr": "str", "repr": r, "isPrimitive": True}
    elif isinstance(val, (types.FunctionType, types.BuiltinFunctionType, types.MethodType)):
        fname = getattr(val, '__name__', 'function')
        return {"type": "function", "typeStr": "function", "repr": f"<function {fname}>", "isPrimitive": True}
    
    # 2. Non-Primitives (Heap Objects)
    # Check if already in heap
    if val_id in heap:
        return {
            "type": heap[val_id]["type"],
            "typeStr": heap[val_id]["typeStr"],
            "repr": heap[val_id]["repr"],
            "isPrimitive": False,
            "heapId": val_id
        }
    
    # Detect Circular References
    if val_id in visited_ids:
        return {
            "type": "object",
            "typeStr": type(val).__name__,
            "repr": f"<{type(val).__name__} @ {val_id[:6]}>",
            "isPrimitive": False,
            "heapId": val_id
        }
    
    visited_ids.add(val_id)
    
    # 2A. Lists & Tuples
    if isinstance(val, (list, tuple)):
        is_list = isinstance(val, list)
        tname = "list" if is_list else "tuple"
        items = []
        
        # Check if 2D Matrix (list of lists of equal lengths)
        is_2d = False
        matrix_dims = None
        if is_list and len(val) > 0 and all(isinstance(row, (list, tuple)) for row in val):
            first_len = len(val[0])
            if all(len(row) == first_len for row in val) and len(val) <= 12 and first_len <= 12:
                is_2d = True
                matrix_dims = [len(val), first_len]

        heap_entry = {
            "id": val_id,
            "type": tname,
            "typeStr": tname,
            "repr": f"{'[' if is_list else '('}len={len(val)}{']' if is_list else ')'}",
            "items": [],
            "is2DMatrix": is_2d,
            "matrixDimensions": matrix_dims
        }
        heap[val_id] = heap_entry
        
        # Limit items to 50 to avoid memory explosion
        for idx, item in enumerate(val[:50]):
            serialized_child = _msk_serialize_val(item, heap, visited_ids, depth + 1)
            items.append({"index": idx, "value": serialized_child})
        
        heap_entry["items"] = items
        return {"type": tname, "typeStr": tname, "repr": heap_entry["repr"], "isPrimitive": False, "heapId": val_id}

    # 2B. Dictionaries
    elif isinstance(val, dict):
        items = []
        heap_entry = {
            "id": val_id,
            "type": "dict",
            "typeStr": "dict",
            "repr": f"dict(len={len(val)})",
            "items": []
        }
        heap[val_id] = heap_entry
        
        for k, v in list(val.items())[:30]:
            k_repr = str(k) if isinstance(k, (int, str, bool)) else repr(k)
            ser_val = _msk_serialize_val(v, heap, visited_ids, depth + 1)
            items.append({"key": k_repr, "value": ser_val})
        
        heap_entry["items"] = items
        return {"type": "dict", "typeStr": "dict", "repr": heap_entry["repr"], "isPrimitive": False, "heapId": val_id}

    # 2C. Sets
    elif isinstance(val, (set, frozenset)):
        items = []
        heap_entry = {
            "id": val_id,
            "type": "set",
            "typeStr": "set",
            "repr": f"set(len={len(val)})",
            "items": []
        }
        heap[val_id] = heap_entry
        
        for idx, item in enumerate(list(val)[:30]):
            ser_val = _msk_serialize_val(item, heap, visited_ids, depth + 1)
            items.append({"index": idx, "value": ser_val})
        
        heap_entry["items"] = items
        return {"type": "set", "typeStr": "set", "repr": heap_entry["repr"], "isPrimitive": False, "heapId": val_id}

    # 2D. Custom Classes & Objects
    else:
        cls_name = type(val).__name__
        heap_entry = {
            "id": val_id,
            "type": "object",
            "typeStr": cls_name,
            "repr": f"<{cls_name}>",
            "attributes": {}
        }
        heap[val_id] = heap_entry
        
        attrs = {}
        # Check __dict__
        user_dict = getattr(val, '__dict__', {})
        for attr_name, attr_val in list(user_dict.items())[:20]:
            if not attr_name.startswith('__'):
                attrs[attr_name] = _msk_serialize_val(attr_val, heap, visited_ids, depth + 1)
        
        heap_entry["attributes"] = attrs
        
        # Specialized Node Detection
        # 1. Linked List Node: has ('val' or 'data' or 'value') and ('next')
        val_key = next((k for k in ['val', 'value', 'data', 'item'] if k in attrs), None)
        if val_key and 'next' in attrs:
            heap_entry["isLinkedListNode"] = True
            heap_entry["linkedListVal"] = attrs[val_key]["repr"]
            next_ser = attrs['next']
            heap_entry["linkedListNextId"] = next_ser.get("heapId") if not next_ser.get("isPrimitive") else None
        
        # 2. Binary Tree Node: has val_key and ('left' and 'right')
        if val_key and ('left' in attrs or 'right' in attrs):
            heap_entry["isTreeNode"] = True
            heap_entry["treeVal"] = attrs[val_key]["repr"]
            left_ser = attrs.get('left')
            right_ser = attrs.get('right')
            heap_entry["treeLeftId"] = left_ser.get("heapId") if (left_ser and not left_ser.get("isPrimitive")) else None
            heap_entry["treeRightId"] = right_ser.get("heapId") if (right_ser and not right_ser.get("isPrimitive")) else None

        return {"type": "object", "typeStr": cls_name, "repr": heap_entry["repr"], "isPrimitive": False, "heapId": val_id}


def _msk_run_visualizer(user_code: str, max_steps: int = 500):
    steps = []
    stdout_buf = io.StringIO()
    old_stdout = sys.stdout
    sys.stdout = stdout_buf
    
    # Recursion tracking
    call_stack_history = []
    recursion_counter = 0
    recursion_tree = []
    active_recursion_nodes = {}
    
    prev_locals_map = {}

    def tracer(frame, event, arg):
        nonlocal recursion_counter, prev_locals_map
        if len(steps) >= max_steps:
            return None
        
        # Filter: only track user code from <string>
        if frame.f_code.co_filename != '<string>':
            return tracer

        lineno = frame.f_lineno
        func_name = frame.f_code.co_name
        
        # Handle Call / Return for Recursion tracking
        if event == 'call':
            recursion_counter += 1
            node_id = f"node_{recursion_counter}"
            parent_id = call_stack_history[-1]["id"] if call_stack_history else None
            
            # Extract call arguments
            arg_names = frame.f_code.co_varnames[:frame.f_code.co_argcount]
            call_args = {}
            for name in arg_names:
                if name in frame.f_locals:
                    call_args[name] = repr(frame.f_locals[name])
            
            rec_node = {
                "id": node_id,
                "parentId": parent_id,
                "funcName": func_name,
                "depth": len(call_stack_history),
                "args": call_args,
                "isCompleted": False,
                "isActive": True
            }
            recursion_tree.append(rec_node)
            active_recursion_nodes[node_id] = rec_node
            call_stack_history.append({"id": node_id, "name": func_name})

        # Build Call Stack Frames
        step_heap = {}
        step_visited_ids = set()
        frames = []
        curr = frame
        while curr and curr.f_code.co_filename == '<string>':
            f_locals = {}
            for k, v in curr.f_locals.items():
                if not k.startswith('__') and not isinstance(v, types.ModuleType):
                    ser = _msk_serialize_val(v, step_heap, step_visited_ids)
                    ser["name"] = k
                    f_locals[k] = ser
            
            frames.append({
                "id": f"{curr.f_code.co_name}_{curr.f_lineno}",
                "funcName": curr.f_code.co_name,
                "line": curr.f_lineno,
                "locals": f_locals
            })
            curr = curr.f_back
        
        # Globals
        f_globals = {}
        for k, v in frame.f_globals.items():
            if not k.startswith('__') and not isinstance(v, types.ModuleType) and k not in ['_msk_run_visualizer', '_msk_serialize_val']:
                ser = _msk_serialize_val(v, step_heap, step_visited_ids)
                ser["name"] = k
                f_globals[k] = ser

        # Return event handling for recursion
        if event == 'return' and call_stack_history:
            top_rec = call_stack_history.pop()
            rec_node = active_recursion_nodes.get(top_rec["id"])
            if rec_node:
                rec_node["returnValue"] = repr(arg)
                rec_node["isCompleted"] = True
                rec_node["isActive"] = False

        # Generate Natural Language Explanation
        explanation = ""
        changed_var = None
        current_locals = frames[0]["locals"] if frames else {}
        
        if event == 'call':
            if func_name == '<module>':
                explanation = "Starting execution of script..."
            else:
                explanation = f"Calling function \`{func_name}()\` with arguments."
        elif event == 'return':
            explanation = f"Function \`{func_name}()\` returning {repr(arg)}."
        elif event == 'line':
            # Detect what changed
            for var_k, var_v in current_locals.items():
                prev_val = prev_locals_map.get(var_k)
                if prev_val != var_v.get("repr"):
                    changed_var = var_k
                    explanation = f"Line {lineno}: variable \`{var_k}\` is now {var_v.get('repr')}."
                    break
            if not explanation:
                explanation = f"Executing line {lineno}."
        elif event == 'exception':
            exc_type, exc_val, _ = arg
            explanation = f"⚠️ Exception raised: {getattr(exc_type, '__name__', str(exc_type))}: {exc_val}"

        prev_locals_map = {k: v.get("repr") for k, v in current_locals.items()}

        step_obj = {
            "stepIndex": len(steps),
            "line": lineno,
            "event": event,
            "funcName": func_name,
            "callStack": frames,
            "globals": f_globals,
            "heap": step_heap,
            "stdout": stdout_buf.getvalue(),
            "explanation": explanation,
            "changedVarName": changed_var,
            "recursionTree": [dict(n) for n in recursion_tree]
        }
        
        if event == 'exception':
            exc_type, exc_val, _ = arg
            step_obj["error"] = {
                "type": getattr(exc_type, '__name__', str(exc_type)),
                "message": str(exc_val)
            }

        steps.append(step_obj)
        return tracer

    try:
        # Pre-compile to check for syntax errors before running tracer
        compiled = compile(user_code, '<string>', 'exec')
        sys.settrace(tracer)
        global_scope = {}
        exec(compiled, global_scope)
    except SyntaxError as syn_err:
        steps.append({
            "stepIndex": len(steps),
            "line": syn_err.lineno or 1,
            "event": "exception",
            "funcName": "<module>",
            "callStack": [],
            "globals": {},
            "heap": {},
            "stdout": stdout_buf.getvalue(),
            "explanation": f"SyntaxError on line {syn_err.lineno}: {syn_err.msg}",
            "error": {
                "type": "SyntaxError",
                "message": f"Line {syn_err.lineno}: {syn_err.msg}"
            }
        })
    except Exception as run_err:
        exc_type = type(run_err).__name__
        steps.append({
            "stepIndex": len(steps),
            "line": getattr(run_err, 'lineno', 1),
            "event": "exception",
            "funcName": "<module>",
            "callStack": [],
            "globals": {},
            "heap": {},
            "stdout": stdout_buf.getvalue(),
            "explanation": f"Runtime {exc_type}: {run_err}",
            "error": {
                "type": exc_type,
                "message": str(run_err)
            }
        })
    finally:
        sys.settrace(None)
        sys.stdout = old_stdout

    return json.dumps({
        "steps": steps,
        "totalSteps": len(steps),
        "stdout": stdout_buf.getvalue()
    })
`;
