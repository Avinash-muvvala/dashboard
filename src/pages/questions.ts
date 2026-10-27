type LanguageType = "Java" | "Python" | "JavaScript";
type DayType = 
  | "Day 1" 
  | "Day 2" 
  | "Day 3" 
  | "Day 4" 
  | "Day 5" 
  | "Day 6" 
  | "Day 7" 
  | "Day 8" 
  | "Day 9" 
  | "Day 10" 
  | "Day 11" 
  | "Day 12" 
  | "Day 13" 
  | "Day 14" 
  | "Day 15";
export const days: DayType[] = [
  "Day 1",
  "Day 2",
  "Day 3",
  "Day 4",
  "Day 5",
  "Day 6",
  "Day 7",
  "Day 8",
  "Day 9",
  "Day 10",
  "Day 11",
  "Day 12",
  "Day 13",
  "Day 14",
  "Day 15"
];
export const languages: LanguageType[] = ["Java", "Python", "JavaScript"];

export const questionsByLanguage: Record<LanguageType, Record<DayType, string[]>> = {
  Java: {
    "Day 1": ["Two Sum", "Best Time to Buy and Sell Stock", "Contains Duplicate", "Product of Array Except Self", "Maximum Subarray"],
    "Day 2": ["Maximum Product Subarray", "Find Minimum in Rotated Sorted Array", "Search in Rotated Sorted Array", "binary search", "3Sum"],
    "Day 3": ["Container With Most Water", "Sum of Two Integers", "Number of 1 Bits", "Counting Bits", "Missing Number"],
    "Day 4": ["Reverse Bits", "Climbing Stairs", "Coin Change", "Longest Increasing Subsequence", "Longest Common Subsequence"],
    "Day 5": ["Word Break Problem", "Combination Sum", "House Robber", "House Robber II", "Decode Ways"],
    "Day 6": ["Unique Paths", "Jump Game", "Clone Graph", "Course Schedule", "Pacific Atlantic Water Flow"],
    "Day 7": ["Number of Islands", "Longest Consecutive Sequence", "Alien Dictionary", "Graph Valid Tree", "Number of Connected Components"],
    "Day 8": ["Insert Interval", "Merge Intervals", "Non-overlapping Intervals", "Meeting Rooms", "Meeting Rooms II"],
    "Day 9": ["Reverse a Linked List", "Detect Cycle in a Linked List", "Merge Two Sorted Lists", "Merge K Sorted Lists", "Remove Nth Node From End Of List"],
    "Day 10": ["Reorder List", "Set Matrix Zeroes", "Spiral Matrix", "Rotate Image", "Word Search"],
    "Day 11": ["Longest Substring Without Repeating Characters", "Longest Repeating Character Replacement", "Minimum Window Substring", "Valid Anagram", "Group Anagrams"],
    "Day 12": ["Valid Parentheses", "Valid Palindrome", "Longest Palindromic Substring", "Palindromic Substrings", "Encode and Decode Strings"],
    "Day 13": ["Maximum Depth of Binary Tree", "Same Tree", "Invert/Flip Binary Tree", "Binary Tree Maximum Path Sum", "Binary Tree Level Order Traversal"],
    "Day 14": ["Serialize and Deserialize Binary Tree", "Subtree of Another Tree", "Construct Binary Tree from Preorder and Inorder Traversal", "Validate Binary Search Tree", "Kth Smallest Element in a BST"],
    "Day 15": ["Lowest Common Ancestor of BST", "Implement Trie (Prefix Tree)", "Add and Search Word", "Word Search II", "Top K Frequent Elements"],
  },
  Python: {
    "Day 1": ["What is a list comprehension?", "How do you handle exceptions?", "What are Python decorators?", "Explain Python generators", "What is the GIL?"],
    "Day 2": ["Difference between list and tuple", "How to use dataclasses?", "What is `async` / `await`?", "Explain lambda functions", "How do you handle files?"],
    "Day 3": ["What is a Python iterator?", "How to use `map` and `filter`?", "Explain `__init__` and `__new__`", "What are decorators?", "What is duck typing?"],
    "Day 4": ["Deep copy vs Shallow copy", "Explain Python Garbage Collection", "What are *args and **kwargs?", "Difference between @staticmethod and @classmethod", "What is the __mro__?"],
    "Day 5": ["Implement a LRU Cache", "Merge Two Sorted Lists", "Valid Palindrome", "FizzBuzz (Efficient version)", "Reverse a String"],
    "Day 6": ["Check for Balanced Parentheses", "Implement a Queue using Stacks", "Find the duplicate number", "Anagram Check", "Binary Search implementation"],
    "Day 7": ["Flatten a nested list", "Find the first non-repeating character", "Fibonacci sequence (Memoization)", "Sort a dictionary by value", "Implement a Bubble Sort"],
    "Day 8": ["Intersection of two arrays", "Find the missing number in range", "Move zeroes to end", "Reverse a Linked List", "Check if a number is Prime"],
    "Day 9": ["Explain Python’s 'with' statement (Context Managers)", "What is the difference between 'is' and '=='?", "How do you profile a Python script?", "What are abstract base classes (ABCs)?", "Explain monkey patching in Python"],
    "Day 10": ["Maximum depth of a binary tree", "Validate a BST", "Level order traversal", "Invert a binary tree", "Lowest common ancestor"],
    "Day 11": ["How does Python's memory management work?", "What is the difference between multiprocessing and multithreading?", "Explain the use of 'yield' keyword", "How to merge two dictionaries?", "What is PEP 8?"],
    "Day 12": ["Subsets (Backtracking)", "Permutations", "Combination Sum", "Palindrome Partitioning", "Word Search"],
    "Day 13": ["Climbing Stairs", "House Robber", "Coin Change", "Longest Common Subsequence", "Longest Increasing Subsequence"],
    "Day 14": ["Number of Islands", "Course Schedule", "Graph Valid Tree", "Pacific Atlantic Water Flow", "Clone Graph"],
    "Day 15": ["Top K Frequent Elements", "Kth Largest Element in an Array", "Merge K Sorted Lists", "Find Median from Data Stream", "Implement Trie"],
  },
  JavaScript: {
    "Day 1": ["What is closure in JavaScript?", "Explain event bubbling.", "How do promises work?", "What is hoisting?", "Difference between var, let, const"],
    "Day 2": ["What is `this` in JavaScript?", "Explain prototypes", "What is async/await?", "What are arrow functions?", "Explain the event loop"],
    "Day 3": ["What is a JS module?", "Explain destructuring", "What are template literals?", "What is JSON?", "How do you handle errors?"],
    "Day 4": ["Call, Apply, and Bind", "What is Debouncing?", "What is Throttling?", "Difference between == and ===", "Explain the Temporal Dead Zone"],
    "Day 5": ["Implement Array.prototype.map", "Implement Array.prototype.filter", "Implement Array.prototype.reduce", "Explain Map vs Set", "What is WeakMap?"],
    "Day 6": ["What is the DOM?", "Explain Event Delegation", "Difference between localStorage and sessionStorage", "What is a Polyfill?", "Explain Shadow DOM"],
    "Day 7": ["Two Sum", "Valid Anagram", "Longest Substring Without Repeating Characters", "Valid Parentheses", "Reverse a Linked List"],
    "Day 8": ["Flatten a Deeply Nested Array", "Implement a Deep Clone function", "Currying implementation", "Compose and Pipe functions", "Promisify a callback function"],
    "Day 9": ["What is Webpack/Babel?", "Explain Cross-Site Scripting (XSS)", "What is CORS?", "Difference between SSR and CSR", "How do Service Workers work?"],
    "Day 10": ["Binary Search", "Search in Rotated Sorted Array", "3Sum", "Container With Most Water", "Merge Intervals"],
    "Day 11": ["What are Generators (*function)?", "Explain the Proxy object", "What is the difference between a Microtask and a Macrotask?", "How does 'strict mode' change JS?", "Explain Symbols"],
    "Day 12": ["Number of Islands", "Clone Graph", "Pacific Atlantic Water Flow", "Course Schedule", "Alien Dictionary"],
    "Day 13": ["Climbing Stairs", "Coin Change", "Longest Common Subsequence", "Word Break", "House Robber"],
    "Day 14": ["Maximum Depth of Binary Tree", "Validate BST", "Level Order Traversal", "Invert Binary Tree", "Lowest Common Ancestor"],
    "Day 15": ["Implement a basic Pub/Sub pattern", "Build a simple To-Do logic (state management)", "Fetch API vs Axios", "What are Higher Order Components?", "Explain React Hooks (if applicable) or ES6 Classes"]
  },
};