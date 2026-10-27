import type { DayType } from "../Constants/DayType";

export type QuestionEntry = {
  question: string;
  explanation: string;
  inputs: string;
  expectedOutput?: string;
};

export const pythonQuestions: Record<DayType, QuestionEntry[]> = {
  "Day 1": [
    {
      question: "List Comprehension Filter",
      explanation:
        "Use list comprehension to filter and transform a list of numbers, returning only even numbers squared.",
      inputs: "Array: [1, 2, 3, 4, 5, 6, 7, 8]",
      expectedOutput: "[4, 16, 36, 64]",
    },
    {
      question: "Exception Handling Chain",
      explanation:
        "Write a function that reads an integer from a string and handles ValueError and TypeError gracefully, returning a default value on failure.",
      inputs: "Inputs: '42', 'abc', None",
      expectedOutput: "42, default value, default value",
    },
    {
      question: "Simple Decorator",
      explanation:
        "Implement a decorator that logs the name and execution time of any function it wraps.",
      inputs: "Function: sleep(0.1) decorated with @timer",
      expectedOutput: "Function name and elapsed time are printed",
    },
    {
      question: "Generator Range",
      explanation:
        "Create a generator that yields Fibonacci numbers up to a given limit without storing them in memory.",
      inputs: "Limit: 100",
      expectedOutput: "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]",
    },
    {
      question: "Thread-Safe Counter",
      explanation:
        "Implement a counter class that is safe to increment from multiple threads using Python's threading primitives.",
      inputs: "Threads: 10, increments per thread: 1000",
      expectedOutput: "10000",
    },
  ],
  "Day 2": [
    {
      question: "Tuple vs List Benchmark",
      explanation:
        "Write code demonstrating the performance difference between list and tuple access, and explain when to use each.",
      inputs: "Size: 1,000,000 elements",
      expectedOutput:
        "Benchmark timings; tuple access is typically slightly faster",
    },
    {
      question: "Dataclass with Validation",
      explanation:
        "Create a dataclass for a Product with name, price, and quantity fields. Add post-init validation to ensure price and quantity are positive.",
      inputs: "Product('Widget', -5.0, 10) should raise ValueError",
      expectedOutput: "ValueError",
    },
    {
      question: "Async Fetch Simulation",
      explanation:
        "Using async/await, implement a function that fetches data from multiple URLs concurrently and returns results as a list.",
      inputs: "URLs: ['url1', 'url2', 'url3'] with simulated delays",
      expectedOutput: "A list containing the results for url1, url2, and url3",
    },
    {
      question: "Lambda Sort",
      explanation:
        "Sort a list of dictionaries by multiple keys using lambda functions — first by department, then by salary descending.",
      inputs: "Employees: [{'name':'A','dept':'HR','salary':50000}, ...]",
      expectedOutput: "Employees sorted by department, then salary descending",
    },
    {
      question: "Context Manager File Handler",
      explanation:
        "Implement a custom context manager class for safe file operations that handles exceptions and always closes the file.",
      inputs: "File: 'data.txt' with read/write operations",
      expectedOutput: "File operations complete and the file is closed",
    },
  ],
  "Day 3": [
    {
      question: "Custom Iterator",
      explanation:
        "Build a custom iterator class that iterates over a range in steps, implementing __iter__ and __next__.",
      inputs: "StepRange(0, 20, 3) → 0, 3, 6, 9, 12, 15, 18",
    },
    {
      question: "Map and Filter Pipeline",
      explanation:
        "Use map and filter to process a list of strings: filter out empty strings, strip whitespace, and convert to uppercase.",
      inputs: "Input: ['  hello ', '', 'world ', '  ', 'python']",
      expectedOutput: "['HELLO', 'WORLD', 'PYTHON']",
    },
    {
      question: "__init__ vs __new__",
      explanation:
        "Implement a Singleton class using __new__ to ensure only one instance is ever created regardless of how many times it's instantiated.",
      inputs: "a = Singleton(); b = Singleton(); assert a is b",
      expectedOutput: "true",
    },
    {
      question: "Stacked Decorators",
      explanation:
        "Create two decorators — @retry(n) and @timeout(s) — and apply them together on a flaky network call function.",
      inputs: "Function: fetch_data() with retry=3, timeout=2s",
    },
    {
      question: "Duck Typing Validator",
      explanation:
        "Write a function that accepts any object and calls .quack() on it, demonstrating duck typing with multiple compatible classes.",
      inputs: "Classes: Duck, Person, RubberDuck — all with .quack()",
    },
  ],
  "Day 4": [
    {
      question: "Deep vs Shallow Copy",
      explanation:
        "Demonstrate the difference between copy.copy() and copy.deepcopy() using a nested list, showing that shallow copy shares inner references.",
      inputs: "Matrix: [[1, 2], [3, 4], [5, 6]]",
    },
    {
      question: "Reference Cycle Detection",
      explanation:
        "Create an object with a circular reference and show how Python's garbage collector handles it using the gc module.",
      inputs: "Object A references B, B references A",
    },
    {
      question: "*args and **kwargs Forwarder",
      explanation:
        "Write a wrapper function that accepts any combination of positional and keyword arguments and forwards them to another function.",
      inputs: "wrapper(1, 2, key='val') → inner(1, 2, key='val')",
    },
    {
      question: "@staticmethod vs @classmethod",
      explanation:
        "Implement a Date class with a @classmethod constructor from_string('2024-01-15') and a @staticmethod is_valid_date(y,m,d).",
      inputs: "Date.from_string('2024-06-15'), Date.is_valid_date(2024,13,1)",
    },
    {
      question: "MRO Resolution",
      explanation:
        "Create a diamond inheritance hierarchy (A, B, C, D) and use type.__mro__ to show the method resolution order and which method wins.",
      inputs:
        "D extends B and C, both extend A — print MRO and call D().method()",
    },
  ],
  "Day 5": [
    {
      question: "LRU Cache",
      explanation:
        "Implement an LRU (Least Recently Used) cache using an OrderedDict with a fixed capacity. Evict the least recently used item when at capacity.",
      inputs:
        "Capacity: 3, operations: put(1,1), put(2,2), get(1), put(3,3), get(2)",
    },
    {
      question: "Merge Two Sorted Lists",
      explanation:
        "Merge two sorted linked lists into one sorted linked list. Return the head of the merged list.",
      inputs: "List1: 1→2→4, List2: 1→3→4 → Output: 1→1→2→3→4→4",
    },
    {
      question: "Valid Palindrome",
      explanation:
        "Check if a string is a palindrome considering only alphanumeric characters and ignoring case.",
      inputs: "Input: 'A man, a plan, a canal: Panama' → True",
    },
    {
      question: "FizzBuzz Efficient",
      explanation:
        "Implement FizzBuzz for 1–100 without using modulo — instead use counters that reset at 3 and 5.",
      inputs: "Range: 1 to 100",
    },
    {
      question: "Reverse a String",
      explanation:
        "Reverse a string in three ways: slicing, recursion, and using a stack. Compare their time complexities.",
      inputs: "Input: 'Hello, World!'",
    },
  ],
  "Day 6": [
    {
      question: "Balanced Parentheses",
      explanation:
        "Check whether a string of parentheses, brackets, and braces is balanced using a stack.",
      inputs: "Input: '{[()]}' → True, '([)]' → False",
      expectedOutput: "True, False",
    },
    {
      question: "Queue using Two Stacks",
      explanation:
        "Implement a queue (FIFO) using two stacks (LIFO). Support enqueue and dequeue in amortized O(1).",
      inputs:
        "enqueue(1), enqueue(2), dequeue() → 1, enqueue(3), dequeue() → 2",
    },
    {
      question: "Find the Duplicate Number",
      explanation:
        "Given an array of n+1 integers where each is in [1,n], find the one duplicate without modifying the array and using O(1) extra space.",
      inputs: "Array: [1, 3, 4, 2, 2] → 2",
    },
    {
      question: "Anagram Check",
      explanation:
        "Determine if two strings are anagrams of each other in O(n) time without sorting.",
      inputs:
        "Inputs: 'listen' and 'silent' → True, 'hello' and 'world' → False",
      expectedOutput: "True, False",
    },
    {
      question: "Binary Search",
      explanation:
        "Implement iterative and recursive binary search on a sorted array, returning the index of the target or -1.",
      inputs: "Array: [1,3,5,7,9,11,13], Target: 7 → index 3",
    },
  ],
  "Day 7": [
    {
      question: "Flatten Nested List",
      explanation:
        "Recursively flatten a deeply nested list of arbitrary depth into a single flat list.",
      inputs: "Input: [1, [2, [3, [4]], 5]] → [1, 2, 3, 4, 5]",
    },
    {
      question: "First Non-Repeating Character",
      explanation:
        "Find the first character in a string that does not repeat. Return the character or -1 if none exists.",
      inputs: "Input: 'leetcode' → 'l', 'aabb' → -1",
      expectedOutput: "'l', -1",
    },
    {
      question: "Fibonacci with Memoization",
      explanation:
        "Implement Fibonacci using memoization via a dictionary, and compare performance with the naive recursive version.",
      inputs: "n: 40 — show call count reduction",
    },
    {
      question: "Sort Dictionary by Value",
      explanation:
        "Sort a dictionary by its values in descending order and return a new ordered dictionary.",
      inputs: "Input: {'b':3,'a':1,'c':2} → {'b':3,'c':2,'a':1}",
    },
    {
      question: "Bubble Sort",
      explanation:
        "Implement bubble sort with an early-exit optimization when no swaps occur in a pass. Count total swaps.",
      inputs: "Array: [64, 34, 25, 12, 22, 11, 90]",
    },
  ],
  "Day 8": [
    {
      question: "Intersection of Two Arrays",
      explanation:
        "Find the intersection of two arrays — elements that appear in both. Return unique elements sorted.",
      inputs: "Array1: [1,2,2,1], Array2: [2,2] → [2]",
    },
    {
      question: "Missing Number in Range",
      explanation:
        "Given an array containing n distinct numbers in [0,n], find the one missing number in O(n) time and O(1) space.",
      inputs: "Array: [3,0,1] → 2",
    },
    {
      question: "Move Zeroes to End",
      explanation:
        "Move all zeros in an array to the end while maintaining the relative order of non-zero elements, in-place.",
      inputs: "Array: [0,1,0,3,12] → [1,3,12,0,0]",
    },
    {
      question: "Reverse a Linked List",
      explanation:
        "Reverse a singly linked list iteratively and recursively. Return the new head.",
      inputs: "1→2→3→4→5 → 5→4→3→2→1",
    },
    {
      question: "Prime Checker",
      explanation:
        "Implement an efficient prime checker using trial division up to √n. Then use the Sieve of Eratosthenes to list all primes up to N.",
      inputs: "is_prime(17) → True, sieve(30) → [2,3,5,7,11,13,17,19,23,29]",
    },
  ],
  "Day 9": [
    {
      question: "Custom Context Manager",
      explanation:
        "Implement a context manager using both a class (__enter__/__exit__) and @contextmanager decorator that measures and prints elapsed time.",
      inputs: "with Timer(): time.sleep(0.5) → prints '0.50s'",
    },
    {
      question: "'is' vs '==' Comparison",
      explanation:
        "Demonstrate the difference between identity (is) and equality (==) with integers, strings, and custom objects. Show where Python interns objects.",
      inputs: "a=1000; b=1000; a==b → True, a is b → False (varies)",
      expectedOutput: "a == b: True; a is b: usually False",
    },
    {
      question: "Profiling a Script",
      explanation:
        "Use cProfile and line_profiler to profile a matrix multiplication function. Identify the hotspot and optimize it.",
      inputs: "Matrix: 100x100 — profile before and after optimization",
    },
    {
      question: "Abstract Base Classes",
      explanation:
        "Define an ABC Shape with abstract methods area() and perimeter(). Implement Circle and Rectangle, and show that Shape() raises TypeError.",
      inputs: "Circle(r=5), Rectangle(w=4, h=6)",
    },
    {
      question: "Monkey Patching",
      explanation:
        "Replace a method on an existing class at runtime using monkey patching. Demonstrate with a third-party-style class and unit test patching using unittest.mock.",
      inputs: "Patch datetime.now() to return a fixed date",
    },
  ],
  "Day 10": [
    {
      question: "Maximum Depth of Binary Tree",
      explanation:
        "Find the maximum depth (number of nodes along the longest root-to-leaf path) of a binary tree using recursion and BFS.",
      inputs: "Tree: [3,9,20,null,null,15,7] → 3",
    },
    {
      question: "Validate a BST",
      explanation:
        "Determine if a binary tree is a valid Binary Search Tree using min/max bound tracking during traversal.",
      inputs: "Tree: [5,1,4,null,null,3,6] → False (4's right child 3 < 4)",
    },
    {
      question: "Level Order Traversal",
      explanation:
        "Return the level-order (BFS) traversal of a binary tree as a list of lists, each inner list containing one level's values.",
      inputs: "Tree: [3,9,20,null,null,15,7] → [[3],[9,20],[15,7]]",
    },
    {
      question: "Invert a Binary Tree",
      explanation:
        "Mirror a binary tree by swapping left and right children at every node, both recursively and iteratively.",
      inputs: "Tree: [4,2,7,1,3,6,9] → [4,7,2,9,6,3,1]",
    },
    {
      question: "Lowest Common Ancestor",
      explanation:
        "Find the lowest common ancestor of two nodes in a binary search tree, leveraging BST ordering for an O(h) solution.",
      inputs: "BST: [6,2,8,0,4,7,9], p=2, q=8 → 6",
    },
  ],
  "Day 11": [
    {
      question: "Memory Management Demo",
      explanation:
        "Demonstrate Python's reference counting using sys.getrefcount(), show how del decrements count, and illustrate weak references with weakref.",
      inputs: "Object with multiple references — trace count changes",
    },
    {
      question: "Multiprocessing vs Multithreading",
      explanation:
        "Run a CPU-bound task (prime factorization) using threading vs multiprocessing. Measure and compare wall-clock times to illustrate the GIL effect.",
      inputs: "Task: factorize numbers 1–10000, workers: 4",
    },
    {
      question: "Yield and Send",
      explanation:
        "Implement a generator that uses both yield (to produce values) and .send() (to receive external values), acting as a running average calculator.",
      inputs: "Send: 10, 20, 30 → yield: 10.0, 15.0, 20.0",
    },
    {
      question: "Merge Two Dictionaries",
      explanation:
        "Merge two dictionaries using four methods: update(), {**a,**b}, dict union operator |=, and ChainMap. Show behavior for duplicate keys.",
      inputs: "a={'x':1,'y':2}, b={'y':3,'z':4} → {'x':1,'y':3,'z':4}",
    },
    {
      question: "PEP 8 Linter",
      explanation:
        "Write a basic PEP 8 checker that scans a Python file for violations: line length > 79, missing whitespace around operators, and tabs vs spaces.",
      inputs: "File with 3 intentional PEP 8 violations",
    },
  ],
  "Day 12": [
    {
      question: "Subsets via Backtracking",
      explanation:
        "Generate all possible subsets (the power set) of a set of distinct integers using backtracking.",
      inputs:
        "Input: [1,2,3] → [[], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3]]",
    },
    {
      question: "Permutations",
      explanation:
        "Generate all permutations of a list of distinct integers using backtracking with in-place swapping.",
      inputs:
        "Input: [1,2,3] → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
    },
    {
      question: "Combination Sum",
      explanation:
        "Find all combinations of candidates that sum to a target. Candidates may be reused; return unique combinations.",
      inputs: "Candidates: [2,3,6,7], Target: 7 → [[2,2,3],[7]]",
    },
    {
      question: "Palindrome Partitioning",
      explanation:
        "Partition a string so that every substring is a palindrome. Return all possible partitions.",
      inputs: "Input: 'aab' → [['a','a','b'],['aa','b']]",
    },
    {
      question: "Word Search",
      explanation:
        "Given a 2D board of characters, determine if a word exists by navigating adjacent cells (no revisiting). Use backtracking with visited tracking.",
      inputs: "Board: [['A','B','C'],['D','E','F']], Word: 'BEF' → True",
    },
  ],
  "Day 13": [
    {
      question: "Climbing Stairs",
      explanation:
        "Count the number of distinct ways to climb n stairs taking 1 or 2 steps at a time. Solve with DP in O(n) time and O(1) space.",
      inputs: "n=5 → 8 ways",
    },
    {
      question: "House Robber",
      explanation:
        "Given houses with money, find the maximum amount you can rob without robbing two adjacent houses.",
      inputs: "Houses: [2,7,9,3,1] → 12 (rob 2, 9, 1)",
    },
    {
      question: "Coin Change",
      explanation:
        "Given coin denominations and a target amount, find the minimum number of coins needed. Return -1 if impossible.",
      inputs: "Coins: [1,5,6,9], Amount: 11 → 2 (5+6)",
    },
    {
      question: "Longest Common Subsequence",
      explanation:
        "Find the length of the longest subsequence common to two strings using 2D DP. Also reconstruct the actual LCS.",
      inputs: "s1='ABCBDAB', s2='BDCAB' → LCS length 4 ('BCAB')",
    },
    {
      question: "Longest Increasing Subsequence",
      explanation:
        "Find the length of the longest strictly increasing subsequence. Solve with O(n²) DP, then optimize to O(n log n) using binary search.",
      inputs: "Array: [10,9,2,5,3,7,101,18] → 4",
    },
  ],
  "Day 14": [
    {
      question: "Number of Islands",
      explanation:
        "Count the number of islands in a 2D binary grid using DFS/BFS. An island is surrounded by water and formed by connecting adjacent 1s.",
      inputs: "Grid: [['1','1','0'],['0','1','0'],['0','0','1']] → 2",
    },
    {
      question: "Course Schedule",
      explanation:
        "Determine if it is possible to finish all courses given prerequisites. Detect cycles in a directed graph using topological sort.",
      inputs: "numCourses=2, prerequisites=[[1,0],[0,1]] → False (cycle)",
    },
    {
      question: "Graph Valid Tree",
      explanation:
        "Given n nodes and edges, determine if the edges form a valid tree (connected and acyclic) using Union-Find.",
      inputs: "n=5, edges=[[0,1],[0,2],[0,3],[1,4]] → True",
    },
    {
      question: "Pacific Atlantic Water Flow",
      explanation:
        "Find cells in a matrix from which water can flow to both the Pacific and Atlantic oceans. Use reverse BFS from each ocean.",
      inputs: "3×3 matrix with heights → list of [row,col] coordinates",
    },
    {
      question: "Clone Graph",
      explanation:
        "Deep clone an undirected graph. Each node has a value and a list of neighbors. Use DFS with a hash map to avoid re-cloning nodes.",
      inputs: "Graph: 1—2—3—4—1 (cycle) → cloned graph",
    },
  ],
  "Day 15": [
    {
      question: "Top K Frequent Elements",
      explanation:
        "Return the k most frequent elements from an array in O(n log k) using a min-heap, and in O(n) using bucket sort.",
      inputs: "Array: [1,1,1,2,2,3], k=2 → [1,2]",
    },
    {
      question: "Kth Largest Element",
      explanation:
        "Find the kth largest element in an unsorted array using a min-heap of size k, and with Quickselect for O(n) average.",
      inputs: "Array: [3,2,1,5,6,4], k=2 → 5",
    },
    {
      question: "Merge K Sorted Lists",
      explanation:
        "Merge k sorted linked lists into one sorted list using a min-heap that stores (value, list_index, node).",
      inputs: "Lists: [[1,4,5],[1,3,4],[2,6]] → 1→1→2→3→4→4→5→6",
    },
    {
      question: "Find Median from Data Stream",
      explanation:
        "Design a data structure that supports addNum() and findMedian() using two heaps: a max-heap for the lower half and a min-heap for the upper half.",
      inputs:
        "addNum(1), addNum(2), findMedian()→1.5, addNum(3), findMedian()→2.0",
    },
    {
      question: "Implement Trie",
      explanation:
        "Implement a Trie with insert, search, and startsWith methods. Use a dictionary of children at each TrieNode.",
      inputs:
        "insert('apple'), search('apple')→True, startsWith('app')→True, search('app')→False",
    },
  ],
  "Day 16": [
    {
      question: "Two Sum",
      explanation:
        "Find two indices in an array whose values sum to a target. Return exactly one answer using a hash map in O(n).",
      inputs: "Array: [2,7,11,15], target=9 → [0,1]",
    },
    {
      question: "Best Time to Buy and Sell Stock",
      explanation:
        "Find the maximum profit by choosing one day to buy and a later day to sell. Track the running minimum price.",
      inputs: "Prices: [7,1,5,3,6,4] → 5 (buy at 1, sell at 6)",
    },
    {
      question: "Contains Duplicate",
      explanation:
        "Determine if any value appears at least twice in an array using a hash set for O(n) time.",
      inputs: "Array: [1,2,3,1] → True, [1,2,3,4] → False",
    },
    {
      question: "Maximum Subarray (Kadane's)",
      explanation:
        "Find the contiguous subarray with the largest sum using Kadane's algorithm in O(n). Also return the subarray indices.",
      inputs: "Array: [-2,1,-3,4,-1,2,1,-5,4] → 6 (subarray [4,-1,2,1])",
    },
    {
      question: "Product of Array Except Self",
      explanation:
        "Return an array where each element is the product of all other elements — no division, in O(n) using prefix and suffix products.",
      inputs: "Array: [1,2,3,4] → [24,12,8,6]",
    },
  ],
  "Day 17": [
    {
      question: "Valid Anagram",
      explanation:
        "Determine if two strings are anagrams using a character frequency counter in O(n), without sorting.",
      inputs: "s='anagram', t='nagaram' → True; s='rat', t='car' → False",
    },
    {
      question: "Group Anagrams",
      explanation:
        "Group a list of strings into anagram clusters. Use a sorted-string tuple as the hash map key.",
      inputs:
        "Input: ['eat','tea','tan','ate','nat','bat'] → [['eat','tea','ate'],['tan','nat'],['bat']]",
    },
    {
      question: "Encode and Decode Strings",
      explanation:
        "Design a method to encode a list of strings to a single string, and decode it back. Handle strings with any character including delimiters.",
      inputs:
        "Strings: ['Hello','#World','foo/bar'] — round-trip encode→decode",
    },
    {
      question: "Longest Consecutive Sequence",
      explanation:
        "Find the length of the longest consecutive integer sequence in O(n) using a hash set — only start counting from the beginning of each sequence.",
      inputs: "Array: [100,4,200,1,3,2] → 4 (sequence 1,2,3,4)",
    },
    {
      question: "Valid Sudoku",
      explanation:
        "Determine if a 9×9 Sudoku board is valid by checking each row, column, and 3×3 box in a single O(1) pass.",
      inputs: "Partially filled board with one violated column",
    },
  ],
  "Day 18": [
    {
      question: "Three Sum",
      explanation:
        "Find all unique triplets in an array that sum to zero using sorting and two-pointer technique in O(n²).",
      inputs: "Array: [-1,0,1,2,-1,-4] → [[-1,-1,2],[-1,0,1]]",
    },
    {
      question: "Container With Most Water",
      explanation:
        "Given heights of vertical lines, find two that together with the x-axis form a container with the most water, using two pointers.",
      inputs: "Heights: [1,8,6,2,5,4,8,3,7] → 49",
    },
    {
      question: "Trapping Rain Water",
      explanation:
        "Calculate total water trapped between bars after raining. Solve with O(n) two-pointer approach after the naive O(n²) solution.",
      inputs: "Heights: [0,1,0,2,1,0,1,3,2,1,2,1] → 6",
    },
    {
      question: "Minimum Window Substring",
      explanation:
        "Find the smallest window in string s that contains all characters of string t using a sliding window with two frequency maps.",
      inputs: "s='ADOBECODEBANC', t='ABC' → 'BANC'",
    },
    {
      question: "Sliding Window Maximum",
      explanation:
        "Return the max value in every sliding window of size k across the array. Use a monotonic deque for O(n).",
      inputs: "Array: [1,3,-1,-3,5,3,6,7], k=3 → [3,3,5,5,6,7]",
    },
  ],
  "Day 19": [
    {
      question: "Reverse Linked List II",
      explanation:
        "Reverse a linked list from position m to n in one pass, in-place.",
      inputs: "List: 1→2→3→4→5, m=2, n=4 → 1→4→3→2→5",
    },
    {
      question: "Linked List Cycle Detection",
      explanation:
        "Detect if a linked list has a cycle using Floyd's slow/fast pointer algorithm. If a cycle exists, return the node where it begins.",
      inputs: "List with cycle at node 2: 3→2→0→-4→(back to 2)",
    },
    {
      question: "Remove Nth Node From End",
      explanation:
        "Remove the nth node from the end of a linked list in one pass using two pointers n nodes apart.",
      inputs: "List: 1→2→3→4→5, n=2 → 1→2→3→5",
    },
    {
      question: "Reorder Linked List",
      explanation:
        "Reorder a list L0→L1→…→Ln into L0→Ln→L1→Ln-1→… in-place using find-middle, reverse second half, and merge.",
      inputs: "List: 1→2→3→4→5 → 1→5→2→4→3",
    },
    {
      question: "Copy List with Random Pointer",
      explanation:
        "Deep copy a linked list where each node has a next and a random pointer using a hash map of original→copy mappings.",
      inputs: "Nodes: [7,null],[13,0],[11,4],[10,2],[1,0]",
    },
  ],
  "Day 20": [
    {
      question: "Search a 2D Matrix",
      explanation:
        "Search for a target in an m×n matrix where each row is sorted and the first integer of each row is greater than the last of the previous row.",
      inputs:
        "Matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], Target: 3 → True",
    },
    {
      question: "Find Minimum in Rotated Sorted Array",
      explanation:
        "Find the minimum element in a rotated sorted array (no duplicates) using binary search in O(log n).",
      inputs: "Array: [3,4,5,1,2] → 1",
    },
    {
      question: "Search in Rotated Sorted Array",
      explanation:
        "Search for a target in a rotated sorted array using binary search, determining which half is sorted at each step.",
      inputs: "Array: [4,5,6,7,0,1,2], Target: 0 → index 4",
    },
    {
      question: "Time-Based Key-Value Store",
      explanation:
        "Design a store where you can set(key, value, timestamp) and get(key, timestamp) the value at or before a timestamp using binary search.",
      inputs: "set('foo','bar',1), get('foo',1)→'bar', get('foo',3)→'bar'",
    },
    {
      question: "Median of Two Sorted Arrays",
      explanation:
        "Find the median of two sorted arrays in O(log(min(m,n))) using binary search partitioning.",
      inputs: "nums1=[1,3], nums2=[2] → 2.0; nums1=[1,2], nums2=[3,4] → 2.5",
    },
  ],
  "Day 21": [
    {
      question: "Rotate Image",
      explanation:
        "Rotate an n×n matrix 90 degrees clockwise in-place by transposing and then reversing each row.",
      inputs: "Matrix: [[1,2,3],[4,5,6],[7,8,9]] → [[7,4,1],[8,5,2],[9,6,3]]",
    },
    {
      question: "Spiral Matrix",
      explanation:
        "Return all elements of a matrix in spiral (clockwise) order by peeling the outer layer iteratively.",
      inputs: "Matrix: [[1,2,3],[4,5,6],[7,8,9]] → [1,2,3,6,9,8,7,4,5]",
    },
    {
      question: "Set Matrix Zeroes",
      explanation:
        "If an element is zero, set its entire row and column to zero, in-place. Use O(1) extra space by storing flags in the matrix itself.",
      inputs: "Matrix: [[1,1,1],[1,0,1],[1,1,1]] → [[1,0,1],[0,0,0],[1,0,1]]",
    },
    {
      question: "Game of Life",
      explanation:
        "Advance a Game of Life board one generation in-place using bit manipulation to encode both old and new state in one integer.",
      inputs: "Board: [[0,1,0],[0,0,1],[1,1,1],[0,0,0]] → next generation",
    },
    {
      question: "Pascal's Triangle",
      explanation:
        "Generate the first n rows of Pascal's Triangle and use it to compute the kth row in O(k) space.",
      inputs: "n=5 → [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]",
    },
  ],
  "Day 22": [
    {
      question: "Longest Palindromic Substring",
      explanation:
        "Find the longest palindromic substring by expanding around each center (odd and even length) in O(n²).",
      inputs: "Input: 'babad' → 'bab' or 'aba'; 'cbbd' → 'bb'",
    },
    {
      question: "Longest Substring Without Repeating Characters",
      explanation:
        "Find the length of the longest substring without repeating characters using a sliding window with a character index map.",
      inputs: "Input: 'abcabcbb' → 3 ('abc')",
    },
    {
      question: "Palindromic Substrings Count",
      explanation:
        "Count how many palindromic substrings a string has by expanding from each center.",
      inputs: "Input: 'aaa' → 6 ('a','a','a','aa','aa','aaa')",
    },
    {
      question: "Decode Ways",
      explanation:
        "Count the number of ways to decode a digit string to letters (1→A … 26→Z) using dynamic programming.",
      inputs: "Input: '226' → 3 ('BZ','VF','BBF')",
    },
    {
      question: "Word Break",
      explanation:
        "Determine if a string can be segmented into words from a dictionary using BFS or DP.",
      inputs: "s='leetcode', wordDict=['leet','code'] → True",
    },
  ],
  "Day 23": [
    {
      question: "Construct Binary Tree from Preorder and Inorder",
      explanation:
        "Rebuild a binary tree given its preorder and inorder traversals. Use a hash map for O(1) inorder index lookup.",
      inputs:
        "Preorder: [3,9,20,15,7], Inorder: [9,3,15,20,7] → tree rooted at 3",
    },
    {
      question: "Binary Tree Max Path Sum",
      explanation:
        "Find the maximum path sum in a binary tree where the path may start and end at any node. Use a post-order DFS with a global max.",
      inputs: "Tree: [-10,9,20,null,null,15,7] → 42 (15→20→7)",
    },
    {
      question: "Serialize and Deserialize Binary Tree",
      explanation:
        "Encode a binary tree to a string and decode the string back. Use BFS with 'null' markers for missing nodes.",
      inputs:
        "Tree: [1,2,3,null,null,4,5] → '1,2,3,null,null,4,5' → back to tree",
    },
    {
      question: "Binary Tree Right Side View",
      explanation:
        "Return the values visible from the right side of a binary tree (the last node at each level) using BFS.",
      inputs: "Tree: [1,2,3,null,5,null,4] → [1,3,4]",
    },
    {
      question: "Count Good Nodes in Binary Tree",
      explanation:
        "A node is 'good' if no node on the path from root to it has a greater value. Count all good nodes using DFS.",
      inputs: "Tree: [3,1,4,3,null,1,5] → 4 good nodes",
    },
  ],
  "Day 24": [
    {
      question: "Number of Connected Components",
      explanation:
        "Count the number of connected components in an undirected graph of n nodes and a list of edges using Union-Find.",
      inputs: "n=5, edges=[[0,1],[1,2],[3,4]] → 2",
    },
    {
      question: "Redundant Connection",
      explanation:
        "Find the edge that can be removed to make a graph a tree (no cycle) using Union-Find.",
      inputs: "Edges: [[1,2],[1,3],[2,3]] → [2,3]",
    },
    {
      question: "Word Ladder",
      explanation:
        "Find the shortest transformation sequence from beginWord to endWord, changing one letter at a time, using BFS.",
      inputs:
        "begin='hit', end='cog', wordList=['hot','dot','dog','lot','log','cog'] → 5",
    },
    {
      question: "Alien Dictionary",
      explanation:
        "Given a sorted list of words in an alien language, derive the order of characters using topological sort on a character dependency graph.",
      inputs: "Words: ['wrt','wrf','er','ett','rftt'] → 'wertf'",
    },
    {
      question: "Cheapest Flights Within K Stops",
      explanation:
        "Find the cheapest price from src to dst with at most k stops using Bellman-Ford with k+1 relaxation rounds.",
      inputs:
        "n=3, flights=[[0,1,100],[1,2,100],[0,2,500]], src=0, dst=2, k=1 → 200",
    },
  ],
  "Day 25": [
    {
      question: "Unique Paths",
      explanation:
        "Count unique paths from top-left to bottom-right of an m×n grid, moving only right or down. Solve with DP and then combinatorics.",
      inputs: "m=3, n=7 → 28",
    },
    {
      question: "Jump Game",
      explanation:
        "Determine if you can reach the last index of an array where each element is your max jump length. Use a greedy max-reach tracker.",
      inputs: "Array: [2,3,1,1,4] → True; [3,2,1,0,4] → False",
    },
    {
      question: "Jump Game II",
      explanation:
        "Find the minimum number of jumps to reach the last index using a greedy BFS-layer approach.",
      inputs: "Array: [2,3,1,1,4] → 2; [2,3,0,1,4] → 2",
    },
    {
      question: "Gas Station",
      explanation:
        "Find the starting gas station index from which you can complete a circuit. Use a greedy linear scan: if total gas >= total cost, a solution always exists.",
      inputs: "Gas: [1,2,3,4,5], Cost: [3,4,5,1,2] → start at index 3",
    },
    {
      question: "Hand of Straights",
      explanation:
        "Determine if a hand of cards can be rearranged into groups of W consecutive cards using a sorted frequency map.",
      inputs: "Hand: [1,2,3,6,2,3,4,7,8], W=3 → True",
    },
  ],
  "Day 26": [
    {
      question: "Min Stack",
      explanation:
        "Design a stack that supports push, pop, top, and getMin in O(1). Use an auxiliary stack that tracks the minimum at each level.",
      inputs: "push(-2),push(0),push(-3),getMin()→-3,pop(),top()→0,getMin()→-2",
    },
    {
      question: "Evaluate Reverse Polish Notation",
      explanation:
        "Evaluate an expression in Reverse Polish Notation using a stack. Support +, -, *, / (truncate toward zero).",
      inputs: "Tokens: ['2','1','+','3','*'] → 9; ['4','13','5','/','+''] → 6",
    },
    {
      question: "Daily Temperatures",
      explanation:
        "For each day, find how many days until a warmer temperature. Use a monotonic decreasing stack of indices.",
      inputs: "Temps: [73,74,75,71,69,72,76,73] → [1,1,4,2,1,1,0,0]",
    },
    {
      question: "Car Fleet",
      explanation:
        "Given positions and speeds of cars heading to a target, count the number of car fleets that arrive. Use a stack after sorting by position.",
      inputs: "Target=12, Position=[10,8,0,5,3], Speed=[2,4,1,1,3] → 3 fleets",
    },
    {
      question: "Largest Rectangle in Histogram",
      explanation:
        "Find the largest rectangle that can be formed in a histogram using a monotonic increasing stack to track left boundaries.",
      inputs: "Heights: [2,1,5,6,2,3] → 10",
    },
  ],
  "Day 27": [
    {
      question: "Insert Interval",
      explanation:
        "Insert a new interval into a sorted list of non-overlapping intervals and merge if necessary in O(n).",
      inputs: "Intervals: [[1,3],[6,9]], new=[2,5] → [[1,5],[6,9]]",
    },
    {
      question: "Merge Intervals",
      explanation:
        "Merge all overlapping intervals from a list after sorting by start time.",
      inputs:
        "Intervals: [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]",
    },
    {
      question: "Non-Overlapping Intervals",
      explanation:
        "Find the minimum number of intervals to remove to make the rest non-overlapping. Sort by end time and use a greedy approach.",
      inputs: "Intervals: [[1,2],[2,3],[3,4],[1,3]] → 1 (remove [1,3])",
    },
    {
      question: "Meeting Rooms II",
      explanation:
        "Find the minimum number of meeting rooms required to hold all meetings using a min-heap of end times.",
      inputs: "Intervals: [[0,30],[5,10],[15,20]] → 2 rooms",
    },
    {
      question: "Minimum Interval to Include Each Query",
      explanation:
        "For each query point, find the size of the smallest interval containing it. Sort both and use a min-heap keyed by interval size.",
      inputs:
        "Intervals: [[1,4],[2,4],[3,6],[4,4]], Queries: [2,3,4,5] → [3,3,1,4]",
    },
  ],
  "Day 28": [
    {
      question: "Implement Queue using Stacks",
      explanation:
        "Implement a FIFO queue using only two LIFO stacks. Amortize the reversal cost so that each element is moved at most once.",
      inputs: "push(1),push(2),peek()→1,pop()→1,empty()→False",
    },
    {
      question: "Design HashMap",
      explanation:
        "Design a hash map from scratch without built-in hash tables. Handle collisions with chaining using linked list buckets.",
      inputs: "put(1,1),put(2,2),get(1)→1,remove(2),get(2)→-1",
    },
    {
      question: "Design Browser History",
      explanation:
        "Design a browser history structure supporting visit(url), back(steps), and forward(steps) using a doubly linked list or array with a pointer.",
      inputs: "visit('a'),visit('b'),visit('c'),back(1)→'b',forward(1)→'c'",
    },
    {
      question: "Design Twitter",
      explanation:
        "Design a simplified Twitter with postTweet, getNewsFeed (10 most recent from user and follows), follow, and unfollow.",
      inputs:
        "postTweet(1,5),getNewsFeed(1)→[5],follow(1,2),postTweet(2,6),getNewsFeed(1)→[6,5]",
    },
    {
      question: "LFU Cache",
      explanation:
        "Design a Least Frequently Used cache with get and put in O(1). Use a hash map of frequencies and doubly linked list per frequency.",
      inputs: "Capacity=2, put(1,1),put(2,2),get(1)→1,put(3,3),get(2)→-1",
    },
  ],
  "Day 29": [
    {
      question: "Number of 1 Bits",
      explanation:
        "Count the number of set bits (1s) in the binary representation of an integer using Brian Kernighan's algorithm: n &= (n-1) drops the lowest set bit.",
      inputs: "n=11 (0b1011) → 3",
    },
    {
      question: "Counting Bits",
      explanation:
        "Return an array of bit counts for every number from 0 to n. Use the DP relation: bits[i] = bits[i >> 1] + (i & 1).",
      inputs: "n=5 → [0,1,1,2,1,2]",
    },
    {
      question: "Reverse Bits",
      explanation: "Reverse the bits of a 32-bit unsigned integer.",
      inputs: "n=0b00000010100101000001111010011100 → 964176192",
    },
    {
      question: "Missing Number XOR",
      explanation:
        "Find the missing number in [0, n] using XOR: XOR all indices and all values, the unpaired number remains.",
      inputs: "Array: [3,0,1] → 2",
    },
    {
      question: "Sum of Two Integers",
      explanation:
        "Add two integers without using + or - operators. Use XOR for the sum bits and AND+shift for carry, iterate until carry is zero.",
      inputs: "a=2, b=3 → 5",
    },
  ],
  "Day 30": [
    {
      question: "Kth Smallest in BST",
      explanation:
        "Find the kth smallest element in a BST using in-order traversal iteratively with a counter.",
      inputs: "BST: [3,1,4,null,2], k=1 → 1",
    },
    {
      question: "Construct BST from Preorder",
      explanation:
        "Build a BST from its preorder traversal by inserting each element, or recursively using min/max bounds.",
      inputs: "Preorder: [8,5,1,7,10,12] → balanced BST",
    },
    {
      question: "Delete Node in BST",
      explanation:
        "Delete a node with a given key in a BST. Handle three cases: no children, one child, and two children (replace with in-order successor).",
      inputs: "BST: [5,3,6,2,4,null,7], key=3 → [5,4,6,2,null,null,7]",
    },
    {
      question: "Convert Sorted Array to BST",
      explanation:
        "Convert a sorted array to a height-balanced BST by recursively choosing the middle element as root.",
      inputs: "Array: [-10,-3,0,5,9] → balanced BST",
    },
    {
      question: "Balance a BST",
      explanation:
        "Given an unbalanced BST, return a balanced BST with the same keys using in-order traversal and sorted-array-to-BST.",
      inputs: "Skewed BST: 1→2→3→4 → balanced tree",
    },
  ],
  "Day 31": [
    {
      question: "Jump Game III",
      explanation:
        "Starting from a given index, determine if you can reach any index with value 0 by jumping arr[i] positions left or right. Use BFS.",
      inputs: "Array: [4,2,3,0,3,1,2], start=5 → True",
    },
    {
      question: "Minimum Score of a Path Between Two Cities",
      explanation:
        "Find the minimum edge weight on any path between node 1 and node n in an undirected graph (all paths, not just shortest). Use Union-Find.",
      inputs: "n=4, roads=[[1,2,9],[2,3,6],[2,4,5],[1,4,7]] → 5",
    },
    {
      question: "Snakes and Ladders",
      explanation:
        "Find the minimum number of dice rolls to finish a Snakes and Ladders board. Flatten the board and run BFS.",
      inputs: "6×6 board with snakes and ladders encoded as -1 or target",
    },
    {
      question: "Open the Lock",
      explanation:
        "Find the minimum number of turns to get from '0000' to the target on a 4-digit lock, avoiding dead-end combinations. Use BFS.",
      inputs:
        "deadends=['0201','0101','0102','1212','2002'], target='0202' → 6",
    },
    {
      question: "Walls and Gates",
      explanation:
        "Fill each empty room in a grid with the distance to its nearest gate using multi-source BFS starting from all gates simultaneously.",
      inputs: "Grid with INF (empty), -1 (wall), 0 (gate) → filled distances",
    },
  ],
  "Day 32": [
    {
      question: "Edit Distance",
      explanation:
        "Find the minimum number of insertions, deletions, and replacements to transform word1 into word2 using 2D DP.",
      inputs: "word1='horse', word2='ros' → 3",
    },
    {
      question: "Burst Balloons",
      explanation:
        "Maximize coins from bursting balloons where bursting balloon i gives nums[i-1]*nums[i]*nums[i+1] coins. Use interval DP.",
      inputs: "Balloons: [3,1,5,8] → 167",
    },
    {
      question: "Regular Expression Matching",
      explanation:
        "Implement regex matching supporting '.' (any char) and '*' (zero or more of preceding) using 2D DP.",
      inputs: "s='aab', p='c*a*b' → True",
    },
    {
      question: "Wildcard Matching",
      explanation:
        "Implement wildcard matching where '?' matches any single character and '*' matches any sequence (including empty). Use 2D DP.",
      inputs: "s='adceb', p='*a*b' → True",
    },
    {
      question: "Interleaving String",
      explanation:
        "Determine if s3 is formed by interleaving s1 and s2 using 2D DP where dp[i][j] = can s1[:i] and s2[:j] form s3[:i+j].",
      inputs: "s1='aabcc', s2='dbbca', s3='aadbbcbcac' → True",
    },
  ],
  "Day 33": [
    {
      question: "Find All Anagrams in a String",
      explanation:
        "Find all starting indices of anagrams of pattern p in string s using a fixed-size sliding window with frequency comparison.",
      inputs: "s='cbaebabacd', p='abc' → [0,6]",
    },
    {
      question: "Permutation in String",
      explanation:
        "Check if any permutation of string s1 exists as a substring of s2 using a sliding window of length len(s1).",
      inputs: "s1='ab', s2='eidbaooo' → True",
    },
    {
      question: "Longest Repeating Character Replacement",
      explanation:
        "Find the length of the longest substring you can form by replacing at most k characters to make all chars the same.",
      inputs: "s='AABABBA', k=1 → 4",
    },
    {
      question: "Fruit Into Baskets",
      explanation:
        "Find the longest subarray with at most 2 distinct values (fruit types). Equivalent to the 'two pointers / sliding window with dict' pattern.",
      inputs: "fruits=[1,2,1,2,3] → 4 (subarray [1,2,1,2])",
    },
    {
      question: "Subarrays with K Different Integers",
      explanation:
        "Count subarrays with exactly K distinct integers using the identity: exactly(K) = atMost(K) - atMost(K-1).",
      inputs: "Array: [1,2,1,2,3], K=2 → 7",
    },
  ],
  "Day 34": [
    {
      question: "Find Peak Element",
      explanation:
        "Find a peak element (greater than its neighbors) in an array using binary search. A peak is guaranteed to exist at boundaries.",
      inputs: "Array: [1,2,3,1] → index 2; [1,2,1,3,5,6,4] → index 5",
    },
    {
      question: "Capacity to Ship Packages Within D Days",
      explanation:
        "Find the minimum ship capacity to ship all packages within D days. Binary search on capacity from max(weights) to sum(weights).",
      inputs: "Weights: [1,2,3,4,5,6,7,8,9,10], D=5 → 15",
    },
    {
      question: "Koko Eating Bananas",
      explanation:
        "Find the minimum eating speed k such that Koko can eat all bananas in h hours. Binary search on k from 1 to max(piles).",
      inputs: "Piles: [3,6,7,11], h=8 → 4",
    },
    {
      question: "Split Array Largest Sum",
      explanation:
        "Split an array into m non-empty subarrays to minimize the maximum subarray sum. Binary search on the answer.",
      inputs: "Array: [7,2,5,10,8], m=2 → 18",
    },
    {
      question: "Minimum Number of Days to Make m Bouquets",
      explanation:
        "Find the earliest day by which m bouquets of k consecutive bloomed flowers exist. Binary search on the day.",
      inputs: "bloomDay=[1,10,3,10,2], m=3, k=1 → day 3",
    },
  ],
  "Day 35": [
    {
      question: "Longest Valid Parentheses",
      explanation:
        "Find the length of the longest valid parentheses substring using a stack that stores indices of unmatched characters.",
      inputs: "Input: ')()())' → 4; '(()' → 2",
    },
    {
      question: "Maximal Rectangle",
      explanation:
        "Find the largest rectangle containing only 1s in a binary matrix. Build histogram row by row and apply largest-rectangle-in-histogram.",
      inputs:
        "Matrix: [['1','0','1','0'],['1','0','1','1'],['1','1','1','1']] → 6",
    },
    {
      question: "Sum of Subarray Minimums",
      explanation:
        "Find the sum of minimum values of all subarrays using a monotonic stack to count how many subarrays each element is the minimum of.",
      inputs: "Array: [3,1,2,4] → 17",
    },
    {
      question: "Maximum Width Ramp",
      explanation:
        "Find the maximum width ramp (i,j) where i<j and A[i]≤A[j]. Use a monotonic stack for candidates, then right-to-left scan.",
      inputs: "Array: [6,0,8,2,1,5] → 4 (index 1 to 5)",
    },
    {
      question: "132 Pattern",
      explanation:
        "Determine if a 132 pattern (i<j<k with nums[i]<nums[k]<nums[j]) exists. Use a stack with a running max-from-right.",
      inputs: "Array: [3,1,4,2] → True; [1,2,3,4] → False",
    },
  ],
  "Day 36": [
    {
      question: "Reconstruct Itinerary",
      explanation:
        "Given a list of airline tickets, reconstruct the itinerary in lexical order starting from JFK. Use Hierholzer's algorithm for Eulerian path.",
      inputs:
        "Tickets: [['MUC','LHR'],['JFK','MUC'],['SFO','SJC'],['LHR','SFO']] → ['JFK','MUC','LHR','SFO','SJC']",
    },
    {
      question: "Min Cost to Connect All Points",
      explanation:
        "Find the minimum cost to connect all points where cost is Manhattan distance, using Prim's algorithm with a min-heap.",
      inputs: "Points: [[0,0],[2,2],[3,10],[5,2],[7,0]] → 20",
    },
    {
      question: "Network Delay Time",
      explanation:
        "Find the minimum time for a signal from node k to reach all other nodes using Dijkstra's algorithm.",
      inputs: "Times=[[2,1,1],[2,3,1],[3,4,1]], n=4, k=2 → 2",
    },
    {
      question: "Swim in Rising Water",
      explanation:
        "Find the earliest time t at which you can travel from top-left to bottom-right of a grid where cell (i,j) requires water level >= grid[i][j]. Use Dijkstra.",
      inputs: "Grid: [[0,2],[1,3]] → 3",
    },
    {
      question: "Find Critical and Pseudo-Critical Edges in MST",
      explanation:
        "Given a graph, classify each edge as critical (its removal increases MST weight) or pseudo-critical (included in some but not all MSTs). Use Kruskal's algorithm.",
      inputs:
        "n=5, edges=[[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]] → critical=[0,1], pseudo=[2,3,4,5]",
    },
  ],
  "Day 37": [
    {
      question: "Maximum Points on a Line",
      explanation:
        "Find the maximum number of points that lie on the same straight line. For each point, compute slope to every other point and use a hash map of slopes.",
      inputs: "Points: [[1,1],[2,2],[3,3]] → 3",
    },
    {
      question: "Fraction to Recurring Decimal",
      explanation:
        "Convert numerator/denominator to a decimal string, placing parentheses around the repeating part. Track remainder positions with a hash map.",
      inputs: "numerator=1, denominator=6 → '0.1(6)'",
    },
    {
      question: "Excel Sheet Column Title",
      explanation:
        "Convert an integer column number to an Excel column title (1→A, 26→Z, 27→AA). Handle the off-by-one with n-- before modulo.",
      inputs: "n=28 → 'AB'; n=701 → 'ZY'",
    },
    {
      question: "Pow(x, n)",
      explanation:
        "Implement fast exponentiation (x^n) using binary exponentiation in O(log n). Handle negative exponents correctly.",
      inputs: "x=2.0, n=10 → 1024.0; x=2.0, n=-2 → 0.25",
    },
    {
      question: "Multiply Strings",
      explanation:
        "Multiply two non-negative integers represented as strings without converting to int. Use grade-school multiplication into an array of digits.",
      inputs: "num1='123', num2='456' → '56088'",
    },
  ],
  "Day 38": [
    {
      question: "Sudoku Solver",
      explanation:
        "Solve a Sudoku puzzle by filling empty cells with backtracking, checking row/column/box constraints after each placement.",
      inputs: "Partially filled 9×9 board with exactly one solution",
    },
    {
      question: "N-Queens",
      explanation:
        "Place N queens on an N×N chessboard so no two queens attack each other. Return all distinct solutions using backtracking.",
      inputs: "n=4 → 2 solutions; n=8 → 92 solutions",
    },
    {
      question: "Letter Combinations of a Phone Number",
      explanation:
        "Return all possible letter combinations a digit string could represent (phone keypad mapping) using backtracking.",
      inputs: "digits='23' → ['ad','ae','af','bd','be','bf','cd','ce','cf']",
    },
    {
      question: "Generate Parentheses",
      explanation:
        "Generate all combinations of well-formed parentheses of length 2n. At each step, add '(' if open < n, add ')' if close < open.",
      inputs: "n=3 → ['((()))','(()())','(())()','()(())','()()()']",
    },
    {
      question: "Zuma Game",
      explanation:
        "Find the minimum number of balls you must insert to clear all balls from the board in the Zuma game. Use backtracking with memoization.",
      inputs: "board='WRRBBW', hand='RRB' → -1 (not clearable)",
    },
  ],
  "Day 39": [
    {
      question: "Trapping Rain Water II",
      explanation:
        "Calculate the total water trapped in a 3D height map after raining. Use a min-heap (priority queue) from the boundary inward — water level is bounded by the minimum surrounding wall.",
      inputs: "Grid: [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]] → 4",
    },
    {
      question: "Cut Off Trees for Golf Event",
      explanation:
        "Cut trees in ascending order of height. Find the minimum total steps using BFS to navigate between each pair. Return -1 if unreachable.",
      inputs: "Forest: [[1,2,3],[0,0,4],[7,6,5]] → 6",
    },
    {
      question: "Shortest Path in Binary Matrix",
      explanation:
        "Find the shortest clear path from top-left to bottom-right of an n×n binary matrix (0=clear, 1=blocked) in 8 directions using BFS.",
      inputs: "Grid: [[0,1],[1,0]] → 2",
    },
    {
      question: "Race Car",
      explanation:
        "Find the minimum number of instructions (Accelerate, Reverse) for a race car to reach position target using BFS or DP.",
      inputs: "target=3 → 2 (AA); target=6 → 5",
    },
    {
      question: "Minimum Moves to Reach Target with Rotations",
      explanation:
        "Move a snake (two cells) in an n×n grid from top-left (horizontal) to bottom-right (horizontal) with minimum moves. BFS on (row, col, direction) state.",
      inputs: "Grid: 4×4 with obstacles → minimum moves count",
    },
  ],
  "Day 40": [
    {
      question: "K Closest Points to Origin",
      explanation:
        "Return the k closest points to the origin using a max-heap of size k. Avoid computing sqrt by comparing squared distances.",
      inputs: "Points: [[1,3],[-2,2]], k=1 → [[-2,2]]",
    },
    {
      question: "Task Scheduler",
      explanation:
        "Find the minimum time to execute all tasks with a cooldown n between same-task executions. Use a max-heap and a wait queue.",
      inputs: "Tasks: ['A','A','A','B','B','B'], n=2 → 8",
    },
    {
      question: "Reorganize String",
      explanation:
        "Rearrange a string so no two adjacent characters are the same. Greedily place the most frequent character first using a max-heap.",
      inputs: "s='aab' → 'aba'; s='aaab' → '' (impossible)",
    },
    {
      question: "Smallest Range Covering Elements from K Lists",
      explanation:
        "Find the smallest range [a,b] such that each of K sorted lists has at least one element in it. Use a min-heap tracking one element per list.",
      inputs: "Lists: [[4,10,15,24],[0,9,12,20],[5,18,22,30]] → [20,24]",
    },
    {
      question: "IPO",
      explanation:
        "Choose at most k projects to maximize capital. Greedily pick the most profitable affordable project at each step using two heaps (min by capital, max by profit).",
      inputs: "k=2, W=0, Profits=[1,2,3], Capital=[0,1,1] → 4",
    },
  ],
  "Day 41": [
    {
      question: "Find the Longest Substring Containing Vowels in Even Counts",
      explanation:
        "Find the longest substring where every vowel appears an even number of times. Encode vowel parity as a 5-bit bitmask and use a prefix XOR hash map.",
      inputs: "s='eleetminicoworoep' → 13",
    },
    {
      question: "Maximum XOR of Two Numbers in an Array",
      explanation:
        "Find the maximum XOR of any two numbers in the array. Build a binary Trie and for each number greedily choose the opposite bit at each level.",
      inputs: "Array: [3,10,5,25,2,8] → 28 (5 XOR 25)",
    },
    {
      question: "Concatenated Words",
      explanation:
        "Find all words in a list that can be formed by concatenating two or more other words. Use DFS with memoization / DP per word.",
      inputs:
        "Words: ['cat','cats','catsdogcats','dog','dogcatsdog','rat'] → ['catsdogcats','dogcatsdog']",
    },
    {
      question: "Hard Binary Tree Cameras",
      explanation:
        "Place the minimum number of cameras on tree nodes so every node is monitored. Use greedy DFS: only place a camera when a leaf's parent is unmonitored.",
      inputs: "Tree: [0,0,null,0,0] → 1 camera",
    },
    {
      question: "Minimum Number of Taps to Open to Water a Garden",
      explanation:
        "Find the minimum number of taps to open to water the entire garden [0,n]. Convert to interval coverage and solve with greedy jump.",
      inputs: "n=5, ranges=[3,4,1,1,0,0] → 1",
    },
  ],
  "Day 42": [
    {
      question: "Count of Smaller Numbers After Self",
      explanation:
        "For each element in an array, count how many elements to its right are smaller than it.",
      inputs: "Array: [5, 2, 6, 1]",
    },
    {
      question: "Reverse Pairs",
      explanation:
        "Count the number of important reverse pairs (i, j) where i < j and nums[i] > 2 * nums[j].",
      inputs: "Array: [1, 3, 2, 3, 1]",
    },
    {
      question: "Maximum Profit in Job Scheduling",
      explanation:
        "Given jobs with start times, end times, and profits, find the maximum profit from non-overlapping jobs.",
      inputs: "Starts: [1,2,3,3], Ends: [3,4,5,6], Profit: [50,10,40,70]",
    },
  ],
  "Day 43": [
    {
      question: "Minimum Cost to Hire K Workers",
      explanation:
        "Hire exactly k workers with minimum total cost where each worker must be paid at least their wage/quality ratio times their quality. Sort by ratio and use a max-heap on quality.",
      inputs: "quality=[10,20,5], wage=[70,50,30], k=2 → 105.0",
    },
    {
      question: "Maximize Sum of Array After K Negations",
      explanation:
        "Negate exactly k elements of an array to maximize its sum. Greedily negate the most negative numbers, then the smallest positive if k is still odd.",
      inputs: "Array: [4,2,3], k=1 → 5; Array: [3,-1,0,2], k=3 → 6",
    },
    {
      question: "Minimum Cost to Make Array Equal",
      explanation:
        "Find the value to set all elements of an array to that minimizes total cost (weighted absolute difference). Binary search on the median.",
      inputs: "nums=[1,3,5,2], cost=[2,3,1,14] → 8 (set all to 2)",
    },
    {
      question: "Strange Printer",
      explanation:
        "Find the minimum number of print turns to print a string where each turn prints any sequence of the same character. Use interval DP.",
      inputs: "s='aaabbb' → 2; s='aba' → 2",
    },
    {
      question: "Remove Boxes",
      explanation:
        "Remove groups of boxes of the same color to maximize points (k boxes at once = k² points). Use 3D DP with memoization.",
      inputs: "boxes=[1,3,2,2,2,3,4,3,1] → 23",
    },
  ],
  "Day 44": [
    {
      question: "K-th Smallest Prime Fraction",
      explanation:
        "Given a sorted array of primes, find the kth smallest fraction a[i]/a[j] (i<j). Use a min-heap initialized with all a[i]/a[last] fractions.",
      inputs: "arr=[1,2,3,5], k=3 → [2,5] (fraction 2/5)",
    },
    {
      question: "Minimum Number of Refueling Stops",
      explanation:
        "Find the minimum number of refueling stops to reach the target. Use a max-heap — greedily refuel at the most fuel-rich station encountered so far when you run out.",
      inputs:
        "target=100, startFuel=10, stations=[[10,60],[20,30],[30,30],[60,40]] → 2",
    },
    {
      question: "Dinner Plate Stacks",
      explanation:
        "Design a stack set where each stack has a fixed capacity. push() fills leftmost non-full stack; pop() pops from rightmost non-empty; popAtStack(i) pops from stack i. Use a sorted set of available stacks.",
      inputs: "capacity=2, push(1..5), popAtStack(0)→2, push(20), pop()→20",
    },
    {
      question: "Maximum Frequency Stack",
      explanation:
        "Design a stack that returns the most frequently pushed element on pop (ties broken by most recently pushed). Use frequency maps and a group map keyed by frequency.",
      inputs: "push(5,7,5,7,4,5), pop()→5, pop()→7, pop()→5, pop()→4",
    },
    {
      question: "Orderly Queue",
      explanation:
        "Given a string and k, you can move one of the first k characters to the end. Find the lexicographically smallest string possible. If k>=2, sort the string; otherwise try all rotations.",
      inputs: "s='cba', k=1 → 'acb'; s='baaca', k=3 → 'aaabc'",
    },
  ],
  "Day 45": [
    {
      question: "Minimum Cost to Connect Two Groups of Points",
      explanation:
        "Connect every point in group 1 to at least one in group 2 and vice versa. Minimize total connection cost using bitmask DP over group 2's coverage.",
      inputs: "cost=[[15,96],[36,2]] → 17",
    },
    {
      question: "Number of Ways to Form a Target String Given a Dictionary",
      explanation:
        "Count ways to form a target from left to right by choosing characters from columns of a word list. Use 2D DP with column frequency counts.",
      inputs: "words=['acca','bbbb','caca'], target='aba' → 6",
    },
    {
      question: "Maximize Score After N Operations",
      explanation:
        "Pair 2n numbers into n pairs to maximize the sum of i*gcd(pair) for i from 1 to n. Use bitmask DP over pairings.",
      inputs: "nums=[1,2] → 1; nums=[3,4,6,8] → 11",
    },
    {
      question: "Optimal Account Balancing",
      explanation:
        "Given a list of transactions, find the minimum number of transfers to settle all debts. Compute net balances, then use backtracking to minimize transaction count.",
      inputs: "transactions=[[0,1,10],[1,0,1],[1,2,5],[2,0,5]] → 1",
    },
    {
      question: "Minimum Cost to Reach Destination in Time",
      explanation:
        "Reach node n-1 from node 0 in exactly maxTime steps minimizing total fees. Use 2D DP: dp[t][node] = min fee to reach node using exactly t time.",
      inputs:
        "maxTime=30, edges=[[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees=[5,1,2,20,20,3] → 11",
    },
  ],
};

Object.values(pythonQuestions).forEach((questions) => {
  questions.forEach((question) => {
    if (!question.expectedOutput) {
      const separatorMatch = /\s→\s/.exec(question.inputs);
      const arrowIndex =
        separatorMatch?.index ?? question.inputs.lastIndexOf("→");
      question.expectedOutput =
        arrowIndex >= 0
          ? question.inputs
              .slice(arrowIndex + (separatorMatch?.[0].length ?? 1))
              .trim()
          : "Return the correct result for the supplied sample input.";
    }
  });
});
