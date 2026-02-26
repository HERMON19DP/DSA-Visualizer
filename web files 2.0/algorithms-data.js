// ============================================
// DSA LEARNER APP - COMPLETE ALGORITHM DATA
// ============================================
// 21 Data Structures + 25 Algorithms = 46 Total Topics

const DSAData = {
  
  // ==================== LINEAR DATA STRUCTURES (7) ====================
  
  'array': {
    name: 'Array',
    category: 'Linear Data Structure',
    type: 'data-structure',
    visualizationType: 'array',
    timeComplexity: 'O(1) access, O(n) search',
    spaceComplexity: 'O(n)',
    description: 'Contiguous memory locations storing elements of same type, accessed by index.',
    developer: 'Unknown',
    yearDeveloped: 'Ancient concept',
    useCases: 'Random access, fixed-size collections, matrix operations',
    pseudocode: [
      'declare array[n]',
      'access: arr[i]',
      'insert: arr[i] = value',
      'traverse: for i = 0 to n-1'
    ],
    inputFields: [
      { name: 'values', label: 'Array Values', type: 'array', placeholder: 'e.g., 5, 3, 8, 1, 9' }
    ]
  },

  'linked-list': {
    name: 'Linked List',
    category: 'Linear Data Structure',
    type: 'data-structure',
    visualizationType: 'linked-list',
    timeComplexity: 'O(1) insertion/deletion at head',
    spaceComplexity: 'O(n)',
    description: 'Linear collection of nodes where each node points to the next.',
    developer: 'Allen Newell, Cliff Shaw, Herbert A. Simon',
    yearDeveloped: '1955-1956',
    useCases: 'Dynamic memory allocation, implementation of stacks/queues',
    pseudocode: [
      'insertAtHead(x): create new node, point to head',
      'insertAtTail(x): traverse to end, add node',
      'delete(x): find node, update pointers',
      'search(x): traverse and compare'
    ],
    inputFields: [
      { name: 'operations', label: 'Operations', type: 'text', placeholder: 'e.g., insert 5, insert 10, delete 5' }
    ]
  },

  'stack': {
    name: 'Stack',
    category: 'Linear Data Structure',
    type: 'data-structure',
    visualizationType: 'stack',
    timeComplexity: 'O(1) push/pop',
    spaceComplexity: 'O(n)',
    description: 'LIFO (Last In First Out) data structure.',
    developer: 'Alan M. Turing',
    yearDeveloped: '1946',
    useCases: 'Function calls, undo operations, expression evaluation',
    pseudocode: [
      'push(x): add x to top',
      'pop(): remove and return top',
      'peek(): return top without removing',
      'isEmpty(): check if stack is empty'
    ],
    inputFields: [
      { name: 'operations', label: 'Operations', type: 'text', placeholder: 'e.g., push 5, push 10, pop' }
    ]
  },

  'queue': {
    name: 'Queue',
    category: 'Linear Data Structure',
    type: 'data-structure',
    visualizationType: 'queue',
    timeComplexity: 'O(1) enqueue/dequeue',
    spaceComplexity: 'O(n)',
    description: 'FIFO (First In First Out) data structure.',
    developer: 'Unknown',
    yearDeveloped: 'Unknown',
    useCases: 'Task scheduling, BFS, buffering',
    pseudocode: [
      'enqueue(x): add x to rear',
      'dequeue(): remove and return front',
      'front(): return front without removing',
      'isEmpty(): check if queue is empty'
    ],
    inputFields: [
      { name: 'operations', label: 'Operations', type: 'text', placeholder: 'e.g., enqueue 5, enqueue 10, dequeue' }
    ]
  },

  'circular-queue': {
    name: 'Circular Queue',
    category: 'Linear Data Structure',
    type: 'data-structure',
    visualizationType: 'queue',
    timeComplexity: 'O(1) enqueue/dequeue',
    spaceComplexity: 'O(n)',
    description: 'Queue where last position connects to first, efficiently using space.',
    developer: 'Unknown',
    yearDeveloped: 'Unknown',
    useCases: 'CPU scheduling, memory management, buffering',
    pseudocode: [
      'enqueue(x): rear = (rear + 1) % n',
      'dequeue(): front = (front + 1) % n',
      'isFull(): (rear + 1) % n == front',
      'isEmpty(): front == rear'
    ],
    inputFields: [
      { name: 'size', label: 'Queue Size', type: 'number', placeholder: 'e.g., 5' },
      { name: 'operations', label: 'Operations', type: 'text', placeholder: 'e.g., enqueue 1, enqueue 2' }
    ]
  },

  'deque': {
    name: 'Deque',
    category: 'Linear Data Structure',
    type: 'data-structure',
    visualizationType: 'queue',
    timeComplexity: 'O(1) both ends',
    spaceComplexity: 'O(n)',
    description: 'Double-ended queue allowing insertion/deletion at both ends.',
    developer: 'Unknown',
    yearDeveloped: 'Unknown',
    useCases: 'Palindrome checking, sliding window, undo-redo',
    pseudocode: [
      'insertFront(x): add at front',
      'insertRear(x): add at rear',
      'deleteFront(): remove from front',
      'deleteRear(): remove from rear'
    ],
    inputFields: [
      { name: 'operations', label: 'Operations', type: 'text', placeholder: 'e.g., insertFront 5, insertRear 10' }
    ]
  },

  'priority-queue': {
    name: 'Priority Queue',
    category: 'Linear Data Structure',
    type: 'data-structure',
    visualizationType: 'heap',
    timeComplexity: 'O(log n) insert/delete',
    spaceComplexity: 'O(n)',
    description: 'Queue where elements have priorities, highest priority served first.',
    developer: 'Unknown',
    yearDeveloped: 'Unknown',
    useCases: 'Dijkstra, Huffman coding, CPU scheduling',
    pseudocode: [
      'insert(x, priority): add with priority',
      'extractMax(): remove highest priority',
      'peek(): view highest priority',
      'usually implemented using heap'
    ],
    inputFields: [
      { name: 'elements', label: 'Elements (value:priority)', type: 'text', placeholder: 'e.g., 10:5, 20:1, 30:3' }
    ]
  },

  // ==================== TREES (7) ====================

  'binary-tree': {
    name: 'Binary Tree',
    category: 'Tree',
    type: 'data-structure',
    visualizationType: 'tree',
    timeComplexity: 'O(n) traversal',
    spaceComplexity: 'O(h)',
    description: 'Hierarchical structure where each node has at most two children.',
    developer: 'Unknown',
    yearDeveloped: 'Unknown',
    useCases: 'Expression trees, Huffman coding, decision trees',
    pseudocode: [
      'insert(x): add node',
      'inorder(): left, root, right',
      'preorder(): root, left, right',
      'postorder(): left, right, root'
    ],
    inputFields: [
      { name: 'values', label: 'Node Values', type: 'array', placeholder: 'e.g., 1, 2, 3, 4, 5' }
    ]
  },

  'bst': {
    name: 'Binary Search Tree',
    category: 'Tree',
    type: 'data-structure',
    visualizationType: 'tree',
    timeComplexity: 'O(log n) avg, O(n) worst',
    spaceComplexity: 'O(n)',
    description: 'Binary tree where left child < parent < right child.',
    developer: 'P.F. Windley, A.D. Booth, D.J. Wheeler',
    yearDeveloped: '1960',
    useCases: 'Databases, search applications',
    pseudocode: [
      'insert(x):',
      '  if x < root: insert in left',
      '  else: insert in right',
      'search similar to binary search'
    ],
    inputFields: [
      { name: 'values', label: 'Node Values', type: 'array', placeholder: 'e.g., 50, 30, 70, 20, 40' }
    ]
  },

  'avl-tree': {
    name: 'AVL Tree',
    category: 'Tree',
    type: 'data-structure',
    visualizationType: 'tree',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    description: 'Self-balancing BST where heights of children differ by at most 1.',
    developer: 'Adelson-Velsky, Landis',
    yearDeveloped: '1962',
    useCases: 'Database indexing, balanced trees',
    pseudocode: [
      'insert(x): BST insert',
      'update balance factors',
      'if unbalanced: rotate',
      'rotations: LL, RR, LR, RL'
    ],
    inputFields: [
      { name: 'values', label: 'Node Values', type: 'array', placeholder: 'e.g., 10, 20, 30, 40' }
    ]
  },

  'red-black-tree': {
    name: 'Red-Black Tree',
    category: 'Tree',
    type: 'data-structure',
    visualizationType: 'tree',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    description: 'Self-balancing BST with colored nodes ensuring balance.',
    developer: 'Rudolf Bayer',
    yearDeveloped: '1972',
    useCases: 'Java TreeMap, C++ map/set',
    pseudocode: [
      '1. Every node red or black',
      '2. Root is black',
      '3. Red nodes have black children',
      '4. Same black height on all paths'
    ],
    inputFields: [
      { name: 'values', label: 'Node Values', type: 'array', placeholder: 'e.g., 10, 20, 30, 15' }
    ]
  },

  'heap': {
    name: 'Heap',
    category: 'Tree',
    type: 'data-structure',
    visualizationType: 'tree',
    timeComplexity: 'O(log n) insert/delete',
    spaceComplexity: 'O(n)',
    description: 'Complete binary tree where parent ≥ children (max) or ≤ (min).',
    developer: 'J. W. J. Williams',
    yearDeveloped: '1964',
    useCases: 'Priority queues, heap sort',
    pseudocode: [
      'insert(x): add at end, bubble up',
      'extractMax(): remove root, bubble down',
      'heapify(): convert array to heap'
    ],
    inputFields: [
      { name: 'values', label: 'Values', type: 'array', placeholder: 'e.g., 10, 20, 15, 30' },
      { name: 'type', label: 'Type', type: 'select', options: ['min', 'max'] }
    ]
  },

  'trie': {
    name: 'Trie',
    category: 'Tree',
    type: 'data-structure',
    visualizationType: 'tree',
    timeComplexity: 'O(m) where m = key length',
    spaceComplexity: 'O(ALPHABET_SIZE × N)',
    description: 'Prefix tree for storing strings efficiently.',
    developer: 'Edward Fredkin',
    yearDeveloped: '1960',
    useCases: 'Autocomplete, spell checker, IP routing',
    pseudocode: [
      'insert(word):',
      '  for each char in word',
      '    if not exists: create node',
      '  mark end of word'
    ],
    inputFields: [
      { name: 'words', label: 'Words', type: 'text', placeholder: 'e.g., cat, car, dog' }
    ]
  },

  'segment-tree': {
    name: 'Segment Tree',
    category: 'Tree',
    type: 'data-structure',
    visualizationType: 'tree',
    timeComplexity: 'O(log n) query/update',
    spaceComplexity: 'O(n)',
    description: 'Tree for range queries and updates efficiently.',
    developer: 'Jon Louis Bentley',
    yearDeveloped: '1977',
    useCases: 'Range queries (sum, min, max)',
    pseudocode: [
      'build(arr, low, high)',
      'query(l, r): return aggregate',
      'update(index, val): propagate'
    ],
    inputFields: [
      { name: 'array', label: 'Array', type: 'array', placeholder: 'e.g., 1, 3, 5, 7, 9' }
    ]
  },

  // ==================== GRAPHS & HASHING (7) ====================

  'graph': {
    name: 'Graph',
    category: 'Graph',
    type: 'data-structure',
    visualizationType: 'graph',
    timeComplexity: 'Varies',
    spaceComplexity: 'O(V + E)',
    description: 'Vertices connected by edges.',
    developer: 'Leonhard Euler',
    yearDeveloped: '1736',
    useCases: 'Social networks, maps, networks',
    pseudocode: [
      'addVertex(v)',
      'addEdge(u, v)',
      'Adjacency Matrix: O(V²)',
      'Adjacency List: O(V+E)'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 5' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0-1, 1-2' }
    ]
  },

  'directed-graph': {
    name: 'Directed Graph',
    category: 'Graph',
    type: 'data-structure',
    visualizationType: 'graph',
    timeComplexity: 'Varies',
    spaceComplexity: 'O(V + E)',
    description: 'Graph with directed edges (one-way).',
    developer: 'Unknown',
    yearDeveloped: 'Unknown',
    useCases: 'Web crawling, task scheduling',
    pseudocode: [
      'addEdge(u, v): u → v',
      'in-degree, out-degree',
      'topological sort if DAG'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 4' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0→1, 1→2' }
    ]
  },

  'weighted-graph': {
    name: 'Weighted Graph',
    category: 'Graph',
    type: 'data-structure',
    visualizationType: 'graph',
    timeComplexity: 'Varies',
    spaceComplexity: 'O(V + E)',
    description: 'Graph with weighted edges.',
    developer: 'Unknown',
    yearDeveloped: 'Unknown',
    useCases: 'Shortest path, MST, network flow',
    pseudocode: [
      'addEdge(u, v, weight)',
      'Dijkstra, Prim, Kruskal',
      'Bellman-Ford for negative weights'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 4' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0-1:5, 1-2:3' }
    ]
  },

  'adjacency-matrix': {
    name: 'Adjacency Matrix',
    category: 'Graph',
    type: 'data-structure',
    visualizationType: 'grid',
    timeComplexity: 'O(1) edge lookup',
    spaceComplexity: 'O(V²)',
    description: '2D array for graph representation.',
    developer: 'Unknown',
    yearDeveloped: 'Unknown',
    useCases: 'Dense graphs, quick edge lookup',
    pseudocode: [
      'matrix[V][V]',
      'matrix[i][j] = 1 if edge exists',
      'matrix[i][j] = weight for weighted'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 4' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0-1, 1-2' }
    ]
  },

  'hash-table': {
    name: 'Hash Table',
    category: 'Hashing',
    type: 'data-structure',
    visualizationType: 'hash',
    timeComplexity: 'O(1) avg',
    spaceComplexity: 'O(n)',
    description: 'Maps keys to values using hash function.',
    developer: 'Hans Peter Luhn',
    yearDeveloped: '1953',
    useCases: 'Dictionaries, caches, databases',
    pseudocode: [
      'insert(key, value):',
      '  index = hash(key) % size',
      '  table[index] = value',
      'collision: chaining/open addressing'
    ],
    inputFields: [
      { name: 'operations', label: 'Operations', type: 'text', placeholder: 'e.g., insert a:1, get a' }
    ]
  },

  'hash-map': {
    name: 'Hash Map',
    category: 'Hashing',
    type: 'data-structure',
    visualizationType: 'hash',
    timeComplexity: 'O(1) avg',
    spaceComplexity: 'O(n)',
    description: 'Map using hash table for key-value pairs.',
    developer: 'Based on hash table',
    yearDeveloped: '1950s',
    useCases: 'Caching, frequency counting',
    pseudocode: [
      'put(key, value)',
      'get(key)',
      'remove(key)',
      'containsKey(key)'
    ],
    inputFields: [
      { name: 'operations', label: 'Operations', type: 'text', placeholder: 'e.g., put a:1, get a' }
    ]
  },

  'hash-set': {
    name: 'Hash Set',
    category: 'Hashing',
    type: 'data-structure',
    visualizationType: 'hash',
    timeComplexity: 'O(1) avg',
    spaceComplexity: 'O(n)',
    description: 'Set using hash table, unique elements only.',
    developer: 'Based on hash table',
    yearDeveloped: '1950s',
    useCases: 'Remove duplicates, membership test',
    pseudocode: [
      'add(element)',
      'remove(element)',
      'contains(element)',
      'no duplicates'
    ],
    inputFields: [
      { name: 'operations', label: 'Operations', type: 'text', placeholder: 'e.g., add 5, add 10' }
    ]
  },

  // ==================== SORTING & SEARCHING (3) ====================

  'merge-sort': {
    name: 'Merge Sort',
    category: 'Sorting',
    type: 'algorithm',
    visualizationType: 'array',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Divide and conquer sorting algorithm.',
    developer: 'John von Neumann',
    yearDeveloped: '1945',
    useCases: 'Large datasets, stable sorting',
    pseudocode: [
      'if length > 1',
      '  mid = length / 2',
      '  left = mergeSort(left half)',
      '  right = mergeSort(right half)',
      '  merge(left, right)'
    ],
    inputFields: [
      { name: 'array', label: 'Array', type: 'array', placeholder: 'e.g., 38, 27, 43, 3' }
    ]
  },

  'quick-sort': {
    name: 'Quick Sort',
    category: 'Sorting',
    type: 'algorithm',
    visualizationType: 'array',
    timeComplexity: 'O(n log n) avg',
    spaceComplexity: 'O(log n)',
    description: 'Partition-based sorting with pivot.',
    developer: 'Tony Hoare',
    yearDeveloped: '1959',
    useCases: 'General sorting, in-place',
    pseudocode: [
      'choose pivot',
      'partition around pivot',
      'quickSort(left)',
      'quickSort(right)'
    ],
    inputFields: [
      { name: 'array', label: 'Array', type: 'array', placeholder: 'e.g., 10, 7, 8, 9, 1' }
    ]
  },

  'binary-search': {
    name: 'Binary Search',
    category: 'Searching',
    type: 'algorithm',
    visualizationType: 'array',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Search in sorted array by halving.',
    developer: 'Unknown',
    yearDeveloped: '1946',
    useCases: 'Sorted arrays, dictionaries',
    pseudocode: [
      'left = 0, right = n-1',
      'while left ≤ right',
      '  mid = (left + right) / 2',
      '  if arr[mid] == target: found',
      '  else adjust bounds'
    ],
    inputFields: [
      { name: 'array', label: 'Sorted Array', type: 'array', placeholder: 'e.g., 2, 5, 8, 12, 16' },
      { name: 'target', label: 'Target', type: 'number', placeholder: 'e.g., 12' }
    ]
  },

  // ==================== GREEDY ALGORITHMS (5) ====================

  'greedy-algorithm': {
    name: 'Greedy Algorithms',
    category: 'Greedy',
    type: 'algorithm',
    visualizationType: 'array',
    timeComplexity: 'Varies',
    spaceComplexity: 'Varies',
    description: 'Local optimal choices for global optimum.',
    developer: 'Various',
    yearDeveloped: 'Various',
    useCases: 'Optimization, activity selection',
    pseudocode: [
      'while not done',
      '  choose best local option',
      '  add to solution',
      '  update state'
    ],
    inputFields: [
      { name: 'problem', label: 'Problem', type: 'text', placeholder: 'e.g., activity selection' }
    ]
  },

  'fractional-knapsack': {
    name: 'Fractional Knapsack',
    category: 'Greedy',
    type: 'algorithm',
    visualizationType: 'grid',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description: 'Take fractions of items by value/weight ratio.',
    developer: 'George Dantzig',
    yearDeveloped: '1957',
    useCases: 'Resource allocation',
    pseudocode: [
      'calculate value/weight ratio',
      'sort by ratio (descending)',
      'take items greedily'
    ],
    inputFields: [
      { name: 'weights', label: 'Weights', type: 'array', placeholder: 'e.g., 10, 20, 30' },
      { name: 'values', label: 'Values', type: 'array', placeholder: 'e.g., 60, 100, 120' },
      { name: 'capacity', label: 'Capacity', type: 'number', placeholder: 'e.g., 50' }
    ]
  },

  'job-sequencing': {
    name: 'Job Sequencing',
    category: 'Greedy',
    type: 'algorithm',
    visualizationType: 'array',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n)',
    description: 'Schedule jobs to maximize profit.',
    developer: 'Unknown',
    yearDeveloped: 'Unknown',
    useCases: 'CPU scheduling, task management',
    pseudocode: [
      'sort jobs by profit',
      'for each job',
      '  find free slot before deadline',
      '  schedule if possible'
    ],
    inputFields: [
      { name: 'jobs', label: 'Jobs (deadline:profit)', type: 'text', placeholder: 'e.g., 2:100, 1:19' }
    ]
  },

  'prims-algorithm': {
    name: "Prim's Algorithm",
    category: 'Greedy',
    type: 'algorithm',
    visualizationType: 'graph',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V)',
    description: 'Minimum spanning tree by growing from vertex.',
    developer: 'Jarník, Prim, Dijkstra',
    yearDeveloped: '1930, 1957',
    useCases: 'Network design, circuit design',
    pseudocode: [
      'start from any vertex',
      'while vertices remain',
      '  find min edge to unvisited',
      '  add to MST'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 5' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0-1:2, 0-3:6' }
    ]
  },

  'kruskals-algorithm': {
    name: "Kruskal's Algorithm",
    category: 'Greedy',
    type: 'algorithm',
    visualizationType: 'graph',
    timeComplexity: 'O(E log E)',
    spaceComplexity: 'O(V)',
    description: 'MST by sorting edges and adding if no cycle.',
    developer: 'Joseph Kruskal',
    yearDeveloped: '1956',
    useCases: 'Network design, clustering',
    pseudocode: [
      'sort edges by weight',
      'for each edge',
      '  if no cycle: add to MST',
      'uses Union-Find'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 4' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0-1:10, 0-2:6' }
    ]
  },

  // ==================== GRAPH & STRING/DP (8) ====================

  'dijkstra': {
    name: "Dijkstra's Algorithm",
    category: 'Graph',
    type: 'algorithm',
    visualizationType: 'graph',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V)',
    description: 'Shortest path from source to all vertices.',
    developer: 'Edsger W. Dijkstra',
    yearDeveloped: '1956',
    useCases: 'GPS, network routing',
    pseudocode: [
      'dist[source] = 0, others = ∞',
      'while unvisited exist',
      '  u = min dist vertex',
      '  relax neighbors'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 5' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0-1:4, 0-2:2' },
      { name: 'source', label: 'Source', type: 'number', placeholder: 'e.g., 0' }
    ]
  },

  'string-matching': {
    name: 'String Matching',
    category: 'String',
    type: 'algorithm',
    visualizationType: 'array',
    timeComplexity: 'O(nm) naive',
    spaceComplexity: 'O(1)',
    description: 'Find pattern in text.',
    developer: 'Various',
    yearDeveloped: 'Various',
    useCases: 'Text search, DNA sequencing',
    pseudocode: [
      'for each position in text',
      '  check if pattern matches',
      '  return position if found'
    ],
    inputFields: [
      { name: 'text', label: 'Text', type: 'text', placeholder: 'e.g., AABAACAADAABAABA' },
      { name: 'pattern', label: 'Pattern', type: 'text', placeholder: 'e.g., AABA' }
    ]
  },

  'rabin-karp': {
    name: 'Rabin-Karp',
    category: 'String',
    type: 'algorithm',
    visualizationType: 'array',
    timeComplexity: 'O(n+m) avg',
    spaceComplexity: 'O(1)',
    description: 'String matching using rolling hash.',
    developer: 'Rabin, Karp',
    yearDeveloped: '1987',
    useCases: 'Plagiarism detection',
    pseudocode: [
      'compute pattern hash',
      'slide window with rolling hash',
      'if hash matches: verify'
    ],
    inputFields: [
      { name: 'text', label: 'Text', type: 'text', placeholder: 'e.g., GEEKS FOR GEEKS' },
      { name: 'pattern', label: 'Pattern', type: 'text', placeholder: 'e.g., GEEK' }
    ]
  },

  'dynamic-programming': {
    name: 'Dynamic Programming',
    category: 'Dynamic Programming',
    type: 'algorithm',
    visualizationType: 'grid',
    timeComplexity: 'Varies',
    spaceComplexity: 'Varies',
    description: 'Break into overlapping subproblems.',
    developer: 'Richard Bellman',
    yearDeveloped: '1950s',
    useCases: 'Optimization problems',
    pseudocode: [
      'identify subproblems',
      'define recurrence',
      'build bottom-up or top-down',
      'memoization or tabulation'
    ],
    inputFields: [
      { name: 'problem', label: 'Problem', type: 'text', placeholder: 'e.g., fibonacci' }
    ]
  },

  'floyd-warshall': {
    name: 'Floyd-Warshall',
    category: 'Dynamic Programming',
    type: 'algorithm',
    visualizationType: 'grid',
    timeComplexity: 'O(V³)',
    spaceComplexity: 'O(V²)',
    description: 'All-pairs shortest paths.',
    developer: 'Floyd, Warshall',
    yearDeveloped: '1962',
    useCases: 'Routing, transitive closure',
    pseudocode: [
      'for k in vertices',
      '  for i in vertices',
      '    for j in vertices',
      '      dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 4' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0-1:5, 1-2:3' }
    ]
  },

  'warshall-algorithm': {
    name: 'Warshall Algorithm',
    category: 'Dynamic Programming',
    type: 'algorithm',
    visualizationType: 'grid',
    timeComplexity: 'O(V³)',
    spaceComplexity: 'O(V²)',
    description: 'Transitive closure of graph.',
    developer: 'Stephen Warshall',
    yearDeveloped: '1962',
    useCases: 'Reachability analysis',
    pseudocode: [
      'for k in vertices',
      '  for i in vertices',
      '    for j in vertices',
      '      reach[i][j] = reach[i][j] OR (reach[i][k] AND reach[k][j])'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 4' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0→1, 1→2' }
    ]
  },

  'optimal-bst': {
    name: 'Optimal BST',
    category: 'Dynamic Programming',
    type: 'algorithm',
    visualizationType: 'tree',
    timeComplexity: 'O(n³)',
    spaceComplexity: 'O(n²)',
    description: 'BST with minimum search cost.',
    developer: 'Donald Knuth',
    yearDeveloped: '1971',
    useCases: 'Dictionary with frequencies',
    pseudocode: [
      'cost[i][j] = min cost for keys i to j',
      'try each key as root',
      'minimize total cost'
    ],
    inputFields: [
      { name: 'keys', label: 'Keys', type: 'array', placeholder: 'e.g., 10, 12, 20' },
      { name: 'freq', label: 'Frequencies', type: 'array', placeholder: 'e.g., 34, 8, 50' }
    ]
  },

  'knapsack': {
    name: '0/1 Knapsack',
    category: 'Dynamic Programming',
    type: 'algorithm',
    visualizationType: 'grid',
    timeComplexity: 'O(nW)',
    spaceComplexity: 'O(nW)',
    description: 'Maximize value without fractions.',
    developer: 'George Dantzig',
    yearDeveloped: '1957',
    useCases: 'Resource allocation',
    pseudocode: [
      'dp[i][w] = max value with i items, weight w',
      'if weight[i] ≤ w',
      '  take or leave item',
      'else skip item'
    ],
    inputFields: [
      { name: 'weights', label: 'Weights', type: 'array', placeholder: 'e.g., 2, 3, 4, 5' },
      { name: 'values', label: 'Values', type: 'array', placeholder: 'e.g., 3, 4, 5, 6' },
      { name: 'capacity', label: 'Capacity', type: 'number', placeholder: 'e.g., 5' }
    ]
  },

  // ==================== ADVANCED ALGORITHMS (9) ====================

  'tsp': {
    name: 'TSP',
    category: 'Advanced',
    type: 'algorithm',
    visualizationType: 'graph',
    timeComplexity: 'O(n²2ⁿ) DP',
    spaceComplexity: 'O(n2ⁿ)',
    description: 'Shortest route visiting all cities once.',
    developer: 'Studied by many',
    yearDeveloped: '1930s',
    useCases: 'Route optimization, logistics',
    pseudocode: [
      'dp[mask][i] = min cost ending at i',
      'try all subsets',
      'return minimum tour cost'
    ],
    inputFields: [
      { name: 'cities', label: 'Cities', type: 'number', placeholder: 'e.g., 4' },
      { name: 'distances', label: 'Distances', type: 'text', placeholder: 'distance matrix' }
    ]
  },

  'matrix-chain': {
    name: 'Matrix Chain',
    category: 'Dynamic Programming',
    type: 'algorithm',
    visualizationType: 'grid',
    timeComplexity: 'O(n³)',
    spaceComplexity: 'O(n²)',
    description: 'Optimal matrix multiplication order.',
    developer: 'Unknown',
    yearDeveloped: 'Unknown',
    useCases: 'Compiler optimization',
    pseudocode: [
      'm[i][j] = min ops for matrices i to j',
      'try all split points k',
      'minimize total multiplications'
    ],
    inputFields: [
      { name: 'dimensions', label: 'Dimensions', type: 'array', placeholder: 'e.g., 40, 20, 30, 10' }
    ]
  },

  'lcs': {
    name: 'LCS',
    category: 'Dynamic Programming',
    type: 'algorithm',
    visualizationType: 'grid',
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(mn)',
    description: 'Longest common subsequence.',
    developer: 'Unknown',
    yearDeveloped: 'Unknown',
    useCases: 'DNA sequencing, diff',
    pseudocode: [
      'if X[i] == Y[j]',
      '  dp[i][j] = dp[i-1][j-1] + 1',
      'else',
      '  dp[i][j] = max(dp[i-1][j], dp[i][j-1])'
    ],
    inputFields: [
      { name: 'string1', label: 'String 1', type: 'text', placeholder: 'e.g., ABCDGH' },
      { name: 'string2', label: 'String 2', type: 'text', placeholder: 'e.g., AEDFHR' }
    ]
  },

  'simplex-method': {
    name: 'Simplex Method',
    category: 'Linear Programming',
    type: 'algorithm',
    visualizationType: 'grid',
    timeComplexity: 'Polynomial (practice)',
    spaceComplexity: 'O(mn)',
    description: 'Linear programming solver.',
    developer: 'George Dantzig',
    yearDeveloped: '1947',
    useCases: 'Optimization, resource allocation',
    pseudocode: [
      'convert to standard form',
      'find initial solution',
      'pivot to optimal solution'
    ],
    inputFields: [
      { name: 'objective', label: 'Objective', type: 'text', placeholder: 'e.g., max 3x + 2y' }
    ]
  },

  'max-flow': {
    name: 'Max Flow',
    category: 'Graph',
    type: 'algorithm',
    visualizationType: 'graph',
    timeComplexity: 'O(E × max_flow)',
    spaceComplexity: 'O(V + E)',
    description: 'Maximum flow from source to sink.',
    developer: 'Ford, Fulkerson',
    yearDeveloped: '1956',
    useCases: 'Network flow, bipartite matching',
    pseudocode: [
      'while augmenting path exists',
      '  find bottleneck',
      '  augment flow',
      '  update residual graph'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 6' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0-1:16' },
      { name: 'source', label: 'Source', type: 'number', placeholder: 'e.g., 0' },
      { name: 'sink', label: 'Sink', type: 'number', placeholder: 'e.g., 5' }
    ]
  },

  'stable-marriage': {
    name: 'Stable Marriage',
    category: 'Graph',
    type: 'algorithm',
    visualizationType: 'grid',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(n²)',
    description: 'Stable matching between two sets.',
    developer: 'Gale, Shapley',
    yearDeveloped: '1962',
    useCases: 'College admissions, job matching',
    pseudocode: [
      'while free man exists',
      '  man proposes to top woman',
      '  woman accepts if better match',
      'result is stable'
    ],
    inputFields: [
      { name: 'n', label: 'Pairs', type: 'number', placeholder: 'e.g., 3' }
    ]
  },

  'n-queens': {
    name: 'N-Queens',
    category: 'Backtracking',
    type: 'algorithm',
    visualizationType: 'grid',
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n²)',
    description: 'Place n queens on board safely.',
    developer: 'Max Bezzel',
    yearDeveloped: '1848',
    useCases: 'Constraint satisfaction',
    pseudocode: [
      'for each row',
      '  try each column',
      '  if safe: place queen',
      '  recurse, backtrack if needed'
    ],
    inputFields: [
      { name: 'n', label: 'Board Size', type: 'number', placeholder: 'e.g., 8' }
    ]
  },

  'hamiltonian-circuit': {
    name: 'Hamiltonian Circuit',
    category: 'Graph',
    type: 'algorithm',
    visualizationType: 'graph',
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n)',
    description: 'Path visiting all vertices once.',
    developer: 'William Hamilton',
    yearDeveloped: '1857',
    useCases: 'Route planning, puzzles',
    pseudocode: [
      'for each vertex',
      '  if safe: add to path',
      '  recurse',
      '  backtrack if no solution'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 5' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0-1, 1-2' }
    ]
  },

  'graph-coloring': {
    name: 'Graph Coloring',
    category: 'Graph',
    type: 'algorithm',
    visualizationType: 'graph',
    timeComplexity: 'O(mⁿ)',
    spaceComplexity: 'O(n)',
    description: 'Color vertices, no adjacent same color.',
    developer: 'Various',
    yearDeveloped: '1800s',
    useCases: 'Map coloring, scheduling, Sudoku',
    pseudocode: [
      'for each vertex',
      '  try each color',
      '  if safe: assign',
      '  recurse, backtrack'
    ],
    inputFields: [
      { name: 'vertices', label: 'Vertices', type: 'number', placeholder: 'e.g., 5' },
      { name: 'edges', label: 'Edges', type: 'text', placeholder: 'e.g., 0-1, 1-2' },
      { name: 'colors', label: 'Colors', type: 'number', placeholder: 'e.g., 3' }
    ]
  }

};

// ============================================
// HELPER FUNCTIONS
// ============================================

function getCategories() {
  const categories = new Set();
  Object.values(DSAData).forEach(item => categories.add(item.category));
  return Array.from(categories).sort();
}

function getItemsByCategory(category) {
  return Object.entries(DSAData)
    .filter(([_, item]) => item.category === category)
    .map(([key, item]) => ({ key, ...item }));
}

function getItemsByType(type) {
  return Object.entries(DSAData)
    .filter(([_, item]) => item.type === type)
    .map(([key, item]) => ({ key, ...item }));
}

function searchItems(query) {
  query = query.toLowerCase();
  return Object.entries(DSAData)
    .filter(([key, item]) => 
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
    .map(([key, item]) => ({ key, ...item }));
}

function getStats() {
  const dataStructures = Object.values(DSAData).filter(item => item.type === 'data-structure');
  const algorithms = Object.values(DSAData).filter(item => item.type === 'algorithm');
  
  return {
    total: Object.keys(DSAData).length,
    dataStructures: dataStructures.length,
    algorithms: algorithms.length,
    categories: getCategories().length
  };
}

console.log('DSA Learner App - All 46 Topics Loaded! ✅');
console.log('📊 Stats:', getStats());