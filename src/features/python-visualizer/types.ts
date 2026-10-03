export type VisualizerEvent = 'line' | 'call' | 'return' | 'exception';

export type VariableType =
  | 'int'
  | 'float'
  | 'str'
  | 'bool'
  | 'none'
  | 'list'
  | 'dict'
  | 'set'
  | 'tuple'
  | 'object'
  | 'function'
  | 'other';

export interface SerializedVariable {
  name: string;
  type: VariableType;
  typeStr: string;
  repr: string;
  isPrimitive: boolean;
  heapId?: string; // If non-primitive, points to HeapObject.id
}

export interface HeapObject {
  id: string;
  type: VariableType;
  typeStr: string;
  repr: string;
  items?: { key?: string | number; index?: number; value: SerializedVariable }[];
  attributes?: Record<string, SerializedVariable>;
  // Specialized detection metadata
  isLinkedListNode?: boolean;
  linkedListNextId?: string | null;
  linkedListVal?: string;
  isTreeNode?: boolean;
  treeVal?: string;
  treeLeftId?: string | null;
  treeRightId?: string | null;
  is2DMatrix?: boolean;
  matrixDimensions?: [number, number];
}

export interface CallFrame {
  id: string;
  funcName: string;
  line: number;
  locals: Record<string, SerializedVariable>;
}

export interface RecursionNode {
  id: string;
  parentId: string | null;
  funcName: string;
  depth: number;
  args: Record<string, string>;
  returnValue?: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface VisualizerStep {
  stepIndex: number;
  line: number;
  event: VisualizerEvent;
  funcName: string;
  callStack: CallFrame[];
  globals: Record<string, SerializedVariable>;
  heap: Record<string, HeapObject>;
  stdout: string;
  explanation?: string;
  changedVarName?: string;
  error?: {
    type: string;
    message: string;
  };
  recursionTree?: RecursionNode[];
}

export interface TraceExecutionResult {
  steps: VisualizerStep[];
  totalSteps: number;
  hasError: boolean;
  errorMessage?: string;
  stdout: string;
  executionTimeMs: number;
}

export type ActiveVisualizationTab =
  | 'memory'
  | 'tree_graph'
  | 'matrix'
  | 'recursion'
  | 'console';
