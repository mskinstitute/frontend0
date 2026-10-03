export interface VisualizerTemplate {
  id: string;
  title: string;
  category: 'Fundamentals' | 'Data Structures' | 'Recursion' | 'Algorithms' | 'OOP';
  description: string;
  code: string;
  recommendedTab: 'memory' | 'tree_graph' | 'matrix' | 'recursion';
}

export const VISUALIZER_TEMPLATES: VisualizerTemplate[] = [
  {
    id: 'aliasing',
    title: 'Object References & Aliasing (Pointers)',
    category: 'Fundamentals',
    description: 'Understand how Python handles variable references, heap pointers, and shallow vs deep copies.',
    recommendedTab: 'memory',
    code: `# Demonstration: Variables as Pointers to Heap Objects
# 'a' points to a new list in heap
a = [10, 20, 30]

# 'b' points to the EXACT SAME object as 'a' (Aliasing)
b = a

# Modifying 'b' also changes 'a'!
b.append(40)

# 'c' is an independent shallow copy (New Heap ID)
c = a.copy()
c.append(99)

print("a:", a)
print("b:", b)
print("c:", c)
`,
  },
  {
    id: 'linked_list',
    title: 'Singly Linked List Reversal',
    category: 'Data Structures',
    description: 'Step through reversing node pointers in a linked list in-place.',
    recommendedTab: 'tree_graph',
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Construct list: 1 -> 2 -> 3 -> None
node3 = ListNode(3)
node2 = ListNode(2, node3)
head = ListNode(1, node2)

# In-place reversal algorithm
prev = None
curr = head

while curr is not None:
    nxt = curr.next
    curr.next = prev
    prev = curr
    curr = nxt

head = prev
print("Reversed list head val:", head.val)
`,
  },
  {
    id: 'binary_tree',
    title: 'Binary Search Tree (BST) Insert',
    category: 'Data Structures',
    description: 'Visualize binary tree nodes connecting with left and right children.',
    recommendedTab: 'tree_graph',
    code: `class TreeNode:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def insert(root, val):
    if root is None:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root

# Build Binary Search Tree
root = TreeNode(50)
for val in [30, 70, 20, 40]:
    root = insert(root, val)

print("BST root:", root.val)
`,
  },
  {
    id: 'recursion_fib',
    title: 'Recursion: Fibonacci Call Tree',
    category: 'Recursion',
    description: 'Watch the recursion call tree expand, calculate values, and backtrack returns.',
    recommendedTab: 'recursion',
    code: `def fib(n):
    # Base cases
    if n <= 1:
        return n
    
    # Recursive branches
    left = fib(n - 1)
    right = fib(n - 2)
    return left + right

ans = fib(4)
print("Fibonacci(4) =", ans)
`,
  },
  {
    id: 'matrix_grid',
    title: '2D Matrix Grid Traversal',
    category: 'Data Structures',
    description: 'Observe row and column pointers traverse a 2D coordinate grid.',
    recommendedTab: 'matrix',
    code: `# 3x3 2D Grid Representation
grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

total_sum = 0
for r in range(len(grid)):
    for c in range(len(grid[0])):
        val = grid[r][c]
        total_sum += val
        print(f"Cell [{r}][{c}] = {val}")

print("Total sum:", total_sum)
`,
  },
  {
    id: 'graph_bfs',
    title: 'Graph BFS Traversal (Adjacency List)',
    category: 'Algorithms',
    description: 'Explore nodes level by level using an adjacency dictionary and queue.',
    recommendedTab: 'memory',
    code: `from collections import deque

graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}

visited = []
queue = deque(['A'])

while queue:
    node = queue.popleft()
    if node not in visited:
        visited.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                queue.append(neighbor)

print("BFS Order:", visited)
`,
  },
  {
    id: 'oop_bank',
    title: 'Object-Oriented Programming (OOP)',
    category: 'OOP',
    description: 'Inspect class instances, the self parameter, and dynamic object attributes.',
    recommendedTab: 'memory',
    code: `class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.transactions = []

    def deposit(self, amount):
        self.balance += amount
        self.transactions.append(f"+{amount}")
        return self.balance

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            self.transactions.append(f"-{amount}")
            return True
        return False

acc1 = BankAccount("Rohit", 500)
acc1.deposit(200)
acc1.withdraw(150)

acc2 = BankAccount("Simran", 1000)
acc2.deposit(500)
`,
  },
  {
    id: 'bubble_sort',
    title: 'Bubble Sort with Swaps',
    category: 'Algorithms',
    description: 'See array elements compare and swap step-by-step into ascending order.',
    recommendedTab: 'memory',
    code: `arr = [64, 34, 25, 12, 22]
n = len(arr)

for i in range(n):
    for j in range(0, n - i - 1):
        if arr[j] > arr[j + 1]:
            # Swap adjacent elements
            arr[j], arr[j + 1] = arr[j + 1], arr[j]

print("Sorted array:", arr)
`,
  },
];
