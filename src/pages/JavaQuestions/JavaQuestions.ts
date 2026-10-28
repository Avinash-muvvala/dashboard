import type { DayType } from "../Constants/DayType";

/**
 * Java Interview Questions — Ordered by Topic & Difficulty
 *
 * Progression:
 *  Days  1– 2  →  Arrays & Sliding Window          (foundation)
 *  Days  3– 4  →  Strings & Hashing                (builds on arrays)
 *  Day   5     →  Two Pointers & Binary Search      (pattern recognition)
 *  Day   6     →  Bit Manipulation                  (isolated, self-contained)
 *  Days  7– 8  →  Linked Lists                      (pointer manipulation)
 *  Days  9–10  →  Stacks, Queues & Intervals        (linear structures)
 *  Days 11–13  →  Trees (BFS / DFS)                 (recursive thinking)
 *  Day  14     →  Tries                             (extends tree knowledge)
 *  Days 15–16  →  Graphs                            (needs tree/DFS foundation)
 *  Days 17–18  →  Dynamic Programming               (hardest; needs everything above)
 *  Days 19–20  →  Review / Mixed Hard               (consolidation)
 */

export interface QuestionItem {
  question: string;
  explanation: string;
  inputs: string;
  expectedOutput?: string;
  pattern?: string;
  hint?: string;
}

export const javaQuestions: Record<DayType, QuestionItem[]> = {
  "Day 1": [
    {
      question: "Two Sum",
      explanation:
        "Find two numbers in the array that add up to a target number, and return their positions.",
      inputs: "Array: [2, 4, 5, 8], Target: 10",
      expectedOutput: "(0, 3)",
    },
    {
      question: "Contains Duplicate",
      explanation: "Check if any number appears more than once in the array.",
      inputs: "Array: [1, 2, 3, 1]",
      expectedOutput: "true",
    },
    {
      question: "Best Time to Buy and Sell Stock",
      explanation:
        "Find the best day to buy a stock and a future day to sell it to get the maximum profit.",
      inputs: "Stock Prices per day: [7, 1, 5, 3, 6, 4]",
      expectedOutput: "5",
    },
  ],

  "Day 2": [
    {
      question: "Product of Array Except Self",
      explanation:
        "For every position, multiply all the numbers in the array together except the number at that current position.",
      inputs: "Array: [1, 2, 3, 4]",
      expectedOutput: "[24, 12, 8, 6]",
    },
    {
      question: "Maximum Subarray",
      explanation:
        "Find a connected block of numbers in the array that gives the highest total sum when added together.",
      inputs: "Array: [-2, 1, -3, 4, -1, 2, 1]",
      expectedOutput: "6",
    },
    {
      question: "Maximum Product Subarray",
      explanation:
        "Find a connected block of numbers in the array that gives the highest multiplied total.",
      inputs: "Array: [2, 3, -2, 4]",
      expectedOutput: "6",
    },
  ],

  "Day 3": [
    {
      question: "Find Minimum in Rotated Sorted Array",
      explanation:
        "Find the smallest value in a sorted list of numbers that has been shifted/rotated around.",
      inputs: "Array: [3, 4, 5, 1, 2]",
      expectedOutput: "1",
    },
    {
      question: "Longest Consecutive Sequence",
      explanation:
        "Find the length of the longest chain of numbers that can be ordered sequentially, even if scattered in the array.",
      inputs: "Array: [100, 4, 200, 1, 3, 2]",
      expectedOutput: "4",
    },
    {
      question: "Remove Duplicates from Sorted Array",
      explanation:
        "Modify a sorted list of numbers in place so that unique elements appear only once, returning the new size.",
      inputs: "Array: [1, 1, 2]",
      expectedOutput: "2; modified array: [1, 2]",
    },
  ],

  "Day 4": [
    {
      question: "Longest Substring Without Repeating Characters",
      explanation:
        "Find the length of the longest part of a string that contains completely unique characters with no repeats.",
      inputs: 'String: "abcabcbb"',
      expectedOutput: "3",
    },
    {
      question: "Longest Repeating Character Replacement",
      explanation:
        "Find the longest string of identical letters you can make if you are allowed to change a few letters to any other letter.",
      inputs: 'String: "AABABBA", Allowed Changes (k): 1',
      expectedOutput: "4",
    },
    {
      question: "Minimum Window Substring",
      explanation:
        "Find the smallest section of a main text string that contains all the letters of a target string in any order.",
      inputs: 'Main String: "ADOBECODEBANC", Target Letters: "ABC"',
      expectedOutput: "BANC",
    },
  ],

  "Day 5": [
    {
      question: "Sliding Window Maximum",
      explanation:
        "Find the single largest number visible within a sliding frame at each step as it moves across an array.",
      inputs: "Array: [1, 3, -1, -3, 5, 3, 6, 7], Frame Size (k): 3",
      expectedOutput: "[3, 3, 5, 5, 6, 7]",
    },
    {
      question: "Find All Duplicates in an Array",
      explanation:
        "Find all the numbers in an array that show up more than once.",
      inputs: "Array: [4, 3, 2, 7, 8, 2, 3, 1]",
      expectedOutput: "[2, 3]",
    },
    {
      question: "Remove Element",
      explanation:
        "Remove all occurrences of a specific target value from an array in place.",
      inputs: "Array: [3, 2, 2, 3], Target to remove: 3",
      expectedOutput: "2; modified array: [2, 2]",
    },
  ],

  "Day 6": [
    {
      question: "Valid Anagram",
      explanation:
        "Check if one word can be formed by rearranging the letters of another word exactly.",
      inputs: 'Word 1: "anagram", Word 2: "nagaram"',
      expectedOutput: "true",
    },
    {
      question: "Group Anagrams",
      explanation:
        "Take a list of words and group together the ones that contain the exact same letters rearranged.",
      inputs: 'Words: ["eat", "tea", "tan", "ate", "nat", "bat"]',
      expectedOutput: "[[eat, tea, ate], [tan, nat], [bat]]",
    },
    {
      question: "First Unique Character in a String",
      explanation:
        "Find the very first letter in a word that does not repeat anywhere else, and return its position.",
      inputs: 'String: "leetcode"',
      expectedOutput: "0",
    },
  ],

  "Day 7": [
    {
      question: "Longest Common Prefix",
      explanation:
        "Find the longest starting letter combination that is shared by all words in a list.",
      inputs: 'Words: ["flower", "flow", "flight"]',
      expectedOutput: "fl",
    },
    {
      question: "Frequency Tracking",
      explanation:
        "Count exactly how many times each unique character or number shows up in a list.",
      inputs: "Array: [4, 3, 2, 7, 8, 2, 3, 1]",
      expectedOutput: "{1: 1, 2: 2, 3: 2, 4: 1, 7: 1, 8: 1}",
    },
    {
      question: "Find the Index of the First Occurrence in a String",
      explanation:
        "Find the starting position of a smaller text string inside a larger text string.",
      inputs: 'Main text: "sadbutsad", Search text: "sad"',
      expectedOutput: "0",
    },
  ],

  "Day 8": [
    {
      question: "Valid Palindrome",
      explanation:
        "Check if a sentence reads the same forwards and backwards after removing all spaces and punctuation.",
      inputs: 'String: "A man, a plan, a canal: Panama"',
      expectedOutput: "true",
    },
    {
      question: "Longest Palindromic Substring",
      explanation:
        "Find the longest section of a string that is a palindrome (reads same forwards and backwards).",
      inputs: 'String: "babad"',
      expectedOutput: '"bab" or "aba"',
    },
    {
      question: "Palindromic Substrings",
      explanation:
        "Count how many total sections inside a string are palindromes.",
      inputs: 'String: "aaa"',
      expectedOutput: "6",
    },
  ],

  "Day 9": [
    {
      question: "3Sum",
      explanation:
        "Find all unique groups of three numbers in an array that add up exactly to zero.",
      inputs: "Array: [-1, 0, 1, 2, -1, -4]",
      expectedOutput: "[[-1, -1, 2], [-1, 0, 1]]",
    },
    {
      question: "Container With Most Water",
      explanation:
        "Find two vertical lines on a graph that, together with the ground, can hold the largest volume of water.",
      inputs: "Line Heights: [1, 8, 6, 2, 5, 4, 8, 3, 7]",
      expectedOutput: "49",
    },
    {
      question: "Trapping Rain Water",
      explanation:
        "Calculate how much total rainwater can get trapped between vertical block structures of varying heights.",
      inputs: "Elevation Map Heights: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
      expectedOutput: "6",
    },
  ],

  "Day 10": [
    {
      question: "Binary Search",
      explanation:
        "Quickly locate a target number in a pre-sorted list by repeatedly cutting the list in half.",
      inputs: "Sorted Array: [-1, 0, 3, 5, 9, 12], Target: 9",
      expectedOutput: "4",
    },
    {
      question: "Search in Rotated Sorted Array",
      explanation:
        "Find the position of a target number inside a sorted array that has been shifted/rotated.",
      inputs: "Array: [4, 5, 6, 7, 0, 1, 2], Target: 0",
      expectedOutput: "4",
    },
    {
      question: "Sqrt(x)",
      explanation:
        "Calculate and return the square root of a number, rounded down to the nearest whole integer, without using built-in math functions.",
      inputs: "Number (x): 8",
      expectedOutput: "2",
    },
  ],

  "Day 11": [
    {
      question: "Sum of Two Integers",
      explanation:
        "Add two numbers together without using the mathematical '+' or '-' operators.",
      inputs: "Number A: 1, Number B: 2",
      expectedOutput: "3",
    },
    {
      question: "Number of 1 Bits",
      explanation:
        "Count how many '1's exist in the binary representation of a number.",
      inputs: "Number: 11 (Binary: 00000000000000000000000000001011)",
      expectedOutput: "3",
    },
    {
      question: "Missing Number",
      explanation:
        "Given an array containing numbers from 0 to N with one number missing, find the missing one.",
      inputs: "Array: [3, 0, 1]",
      expectedOutput: "2",
    },
  ],

  "Day 12": [
    {
      question: "Reverse a Linked List",
      explanation:
        "Flip a connected chain of data nodes so that it points in the exact opposite direction.",
      inputs: "Linked List: 1 -> 2 -> 3 -> 4 -> 5",
      expectedOutput: "5 -> 4 -> 3 -> 2 -> 1",
    },
    {
      question: "Detect Cycle in a Linked List",
      explanation:
        "Check if a chain of nodes loops back on itself somewhere, causing an infinite loop.",
      inputs: "Linked List: 3 -> 2 -> 0 -> -4 (where -4 points back to 2)",
      expectedOutput: "true",
    },
    {
      question: "Merge Two Sorted Lists",
      explanation:
        "Combine two already-sorted chains of nodes into one single sorted chain.",
      inputs: "List 1: 1 -> 2 -> 4, List 2: 1 -> 3 -> 4",
      expectedOutput: "1 -> 1 -> 2 -> 3 -> 4 -> 4",
    },
  ],

  "Day 13": [
    {
      question: "Remove Nth Node From End of List",
      explanation:
        "Delete the N-th node from the very end of a connected chain of nodes.",
      inputs: "Linked List: 1 -> 2 -> 3 -> 4 -> 5, Node from end (n): 2",
      expectedOutput: "1 -> 2 -> 3 -> 5",
    },
    {
      question: "Reorder List",
      explanation:
        "Rearrange a connected chain of nodes to alternate between the start and the end.",
      inputs: "Linked List: 1 -> 2 -> 3 -> 4",
      expectedOutput: "1 -> 4 -> 2 -> 3",
    },
    {
      question: "Remove Duplicates from Sorted List",
      explanation:
        "Clean up a sorted chain of nodes so that each value appears only once.",
      inputs: "Linked List: 1 -> 1 -> 2 -> 3 -> 3",
      expectedOutput: "1 -> 2 -> 3",
    },
  ],

  "Day 14": [
    {
      question: "Valid Parentheses",
      explanation:
        "Check if brackets like (), [], and {} are closed in the correct order and pairs.",
      inputs: 'String: "()[]{}"',
      expectedOutput: "true",
    },
    {
      question: "Merge Intervals",
      explanation:
        "Take a list of overlapping time slots/ranges and merge the overlapping ones together.",
      inputs: "Ranges: [[1,3],[2,6],[8,10],[15,18]]",
      expectedOutput: "[[1,6],[8,10],[15,18]]",
    },
    {
      question: "Insert Interval",
      explanation:
        "Add a new time slot/range into a list of sorted ranges and combine any overlaps.",
      inputs: "Existing Ranges: [[1,3],[6,9]], New Range: [2,5]",
      expectedOutput: "[[1,5],[6,9]]",
    },
  ],

  "Day 15": [
    {
      question: "Non-overlapping Intervals",
      explanation:
        "Find the minimum number of time slots/ranges you need to remove to make sure none of them overlap.",
      inputs: "Ranges: [[1,2],[2,3],[3,4],[1,3]]",
      expectedOutput: "1",
    },
    {
      question: "Meeting Rooms",
      explanation:
        "Determine if a person can attend all scheduled meetings without any time clashes.",
      inputs: "Meeting Times: [[0,30],[5,10],[15,20]]",
      expectedOutput: "false",
    },
    {
      question: "Meeting Rooms II",
      explanation:
        "Find the minimum number of total conference rooms needed to hold all scheduled meetings.",
      inputs: "Meeting Times: [[0,30],[5,10],[15,20]]",
      expectedOutput: "2",
    },
  ],

  // ─── MEDIUM: Day 16–30 ────────────────────────────────────────────────────

  "Day 16": [
    {
      question: "Maximum Depth of Binary Tree",
      explanation:
        "Find the number of nodes along the longest path from the top root node down to the farthest leaf node.",
      inputs: "Tree Root: [3, 9, 20, null, null, 15, 7]",
      expectedOutput: "3",
    },
    {
      question: "Invert / Flip Binary Tree",
      explanation:
        "Flip a tree so that every left child and right child switch places.",
      inputs: "Tree Root: [4, 2, 7, 1, 3, 6, 9]",
      expectedOutput: "[4, 7, 2, 9, 6, 3, 1]",
    },
    {
      question: "Same Tree",
      explanation:
        "Check if two separate binary trees are completely identical in structure and values.",
      inputs: "Tree 1: [1, 2, 3], Tree 2: [1, 2, 3]",
      expectedOutput: "true",
    },
  ],

  "Day 17": [
    {
      question: "Symmetric Tree",
      explanation:
        "Check if a tree is a perfect mirror image of itself from left to right.",
      inputs: "Tree Root: [1, 2, 2, 3, 4, 4, 3]",
      expectedOutput: "true",
    },
    {
      question: "Subtree of Another Tree",
      explanation:
        "Check if a smaller tree is an exact match of a part inside a larger tree.",
      inputs: "Main Tree: [3, 4, 5, 1, 2], Sub-Tree: [4, 1, 2]",
      expectedOutput: "true",
    },
    {
      question: "Binary Tree Level Order Traversal",
      explanation: "Group tree node values row by row, from top to bottom.",
      inputs: "Tree Root: [3, 9, 20, null, null, 15, 7]",
      expectedOutput: "[[3], [9, 20], [15, 7]]",
    },
  ],

  "Day 18": [
    {
      question: "Binary Tree Maximum Path Sum",
      explanation:
        "Find the highest possible sum you can get by connecting adjacent nodes along any path in a tree.",
      inputs: "Tree Root: [-10, 9, 20, null, null, 15, 7]",
      expectedOutput: "42",
    },
    {
      question: "Serialize and Deserialize Binary Tree",
      explanation:
        "Convert a tree structure into a flat text string, and write a function to turn that string back into the tree.",
      inputs: "Tree Root: [1, 2, 3, null, null, 4, 5]",
      expectedOutput:
        "Serialized: [1,2,3,null,null,4,5]; deserialization restores the same tree",
    },
    {
      question: "Construct Binary Tree from Preorder and Inorder Traversal",
      explanation:
        "Rebuild a tree structure using two lists that show the order nodes were visited in different traversal patterns.",
      inputs: "Preorder: [3,9,20,15,7], Inorder: [9,3,15,20,7]",
      expectedOutput: "[3,9,20,null,null,15,7]",
    },
  ],

  "Day 19": [
    {
      question: "Lowest Common Ancestor of BST",
      explanation:
        "Find the lowest shared parent node of two specified nodes in a Binary Search Tree.",
      inputs: "BST Root: [6, 2, 8, 0, 4, 7, 9], Node P: 2, Node Q: 8",
      expectedOutput: "6",
    },
    {
      question: "Validate Binary Search Tree",
      explanation:
        "Check if a tree properly follows the rule: all left nodes smaller than parent, all right nodes larger.",
      inputs: "Tree Root: [2, 1, 3]",
      expectedOutput: "true",
    },
    {
      question: "Kth Smallest Element in a BST",
      explanation: "Find the K-th smallest value inside a Binary Search Tree.",
      inputs: "BST Root: [3, 1, 4, null, 2], k: 1",
      expectedOutput: "1",
    },
  ],

  "Day 20": [
    {
      question: "Set Matrix Zeroes",
      explanation:
        "If an element in a grid is 0, set its entire row and column to 0.",
      inputs: "Grid Matrix: [[1,1,1],[1,0,1],[1,1,1]]",
      expectedOutput: "[[1,0,1],[0,0,0],[1,0,1]]",
    },
    {
      question: "Spiral Matrix",
      explanation:
        "Return all elements of a grid matrix in a clockwise spiral reading order.",
      inputs: "Grid Matrix: [[1,2,3],[4,5,6],[7,8,9]]",
      expectedOutput: "[1,2,3,6,9,8,7,4,5]",
    },
    {
      question: "Rotate Image",
      explanation: "Rotate a grid matrix 90 degrees clockwise in place.",
      inputs: "Grid Matrix: [[1,2,3],[4,5,6],[7,8,9]]",
      expectedOutput: "[[7,4,1],[8,5,2],[9,6,3]]",
    },
  ],

  "Day 21": [
    {
      question: "Implement Trie (Prefix Tree)",
      explanation:
        "Design a text search data structure that supports inserting words and checking if words or starting prefixes exist.",
      inputs: 'Operations: insert("apple"), search("apple"), startsWith("app")',
      expectedOutput: "search=true, startsWith=true",
    },
    {
      question: "Add and Search Word",
      explanation:
        "Design a data structure to store words where you can search using dots '.' as wildcards matching any letter.",
      inputs: 'Operations: addWord("bad"), search(".ad")',
      expectedOutput: "true",
    },
    {
      question: "Word Search",
      explanation:
        "Check if a target word can be constructed by connecting adjacent letters on a letter grid matrix.",
      inputs:
        "Letter Grid: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], Word: \"ABCCED\"",
      expectedOutput: "true",
    },
  ],

  "Day 22": [
    {
      question: "Top K Frequent Elements",
      explanation:
        "Find the K numbers that show up most frequently inside an array.",
      inputs: "Array: [1, 1, 1, 2, 2, 3], k: 2",
      expectedOutput: "[1, 2]",
    },
    {
      question: "Find Median from Data Stream",
      explanation:
        "Design a data structure that continuously accepts incoming numbers and quickly calculates the median at any moment.",
      inputs: "Stream Actions: addNum(1), addNum(2), findMedian()",
      expectedOutput: "1.5",
    },
    {
      question: "Kth Largest Element in an Array",
      explanation:
        "Find the K-th largest value in an unsorted array without fully sorting it.",
      inputs: "Array: [3, 2, 1, 5, 6, 4], k: 2",
      expectedOutput: "5",
    },
  ],

  "Day 23": [
    {
      question: "Task Scheduler",
      explanation:
        "Given a list of tasks with a cooldown period between identical tasks, find the minimum time to finish all tasks.",
      inputs: "Tasks: ['A','A','A','B','B','B'], Cooldown (n): 2",
      expectedOutput: "8",
    },
    {
      question: "Reorganize String",
      explanation:
        "Rearrange characters in a string so that no two adjacent characters are the same. Return empty string if impossible.",
      inputs: 'String: "aab"',
      expectedOutput: '"aba"',
    },
    {
      question: "Merge K Sorted Lists",
      explanation:
        "Combine multiple sorted chains of nodes into one single, fully sorted chain.",
      inputs: "Lists: [1->4->5, 1->3->4, 2->6]",
      expectedOutput: "1->1->2->3->4->4->5->6",
    },
  ],

  "Day 24": [
    {
      question: "Jump Game",
      explanation:
        "Determine if you can successfully reach the very last index of an array if each value tells you the maximum leap you can make.",
      inputs: "Jump Array: [2, 3, 1, 1, 4]",
      expectedOutput: "true",
    },
    {
      question: "Jump Game II",
      explanation:
        "Find the minimum number of jumps needed to reach the last index of an array.",
      inputs: "Jump Array: [2, 3, 1, 1, 4]",
      expectedOutput: "2",
    },
    {
      question: "Gas Station",
      explanation:
        "Find the starting gas station index from which you can complete a full circular route without running out of gas.",
      inputs: "Gas: [1,2,3,4,5], Cost: [3,4,5,1,2]",
      expectedOutput: "3",
    },
  ],

  "Day 25": [
    {
      question: "Hand of Straights",
      explanation:
        "Check if a hand of cards can be rearranged into groups of consecutive cards of a given size.",
      inputs: "Hand: [1,2,3,6,2,3,4,7,8], Group Size: 3",
      expectedOutput: "true",
    },
    {
      question: "Partition Labels",
      explanation:
        "Partition a string into as many parts as possible so that each letter appears in at most one part.",
      inputs: 'String: "ababcbacadefegdehijhklij"',
      expectedOutput: "[9, 7, 8]",
    },
    {
      question: "Valid Parenthesis String",
      explanation:
        "Check if a string with '(', ')' and '*' (wildcard) characters is a valid parentheses string.",
      inputs: 'String: "(*)"',
      expectedOutput: "true",
    },
  ],

  "Day 26": [
    {
      question: "Number of Islands",
      explanation:
        "Count the number of separate land masses (connected '1's) surrounded completely by water ('0's) on a grid map.",
      inputs: "Grid Map: [['1','1','0'],['1','1','0'],['0','0','1']]",
      expectedOutput: "2",
    },
    {
      question: "Clone Graph",
      explanation:
        "Make a complete, deep copy of a connected node graph network.",
      inputs: "Graph Adjacency List: [[2,4],[1,3],[2,4],[1,3]]",
      expectedOutput: "[[2,4],[1,3],[2,4],[1,3]] (deep copy)",
    },
    {
      question: "Max Area of Island",
      explanation:
        "Find the largest island (connected group of 1s) in a grid and return its area.",
      inputs: "Grid: [[0,0,1,0,0],[0,1,1,0,0],[0,1,0,0,0]]",
      expectedOutput: "4",
    },
  ],

  "Day 27": [
    {
      question: "Course Schedule",
      explanation:
        "Determine if it is possible to finish all courses given prerequisite requirements (checking for circular loops).",
      inputs: "Total Courses: 2, Prerequisites: [[1,0]]",
      expectedOutput: "true",
    },
    {
      question: "Course Schedule II",
      explanation:
        "Return the order in which you should take courses to finish all of them given their prerequisites.",
      inputs: "Total Courses: 4, Prerequisites: [[1,0],[2,0],[3,1],[3,2]]",
      expectedOutput: "[0,1,2,3]",
    },
    {
      question: "Graph Valid Tree",
      explanation:
        "Check if a graph network is a valid structural tree (all nodes connected with zero circular loops).",
      inputs: "Nodes count: 5, Edge List: [[0,1],[0,2],[0,3],[1,4]]",
      expectedOutput: "true",
    },
  ],

  "Day 28": [
    {
      question: "Number of Connected Components",
      explanation:
        "Count how many separate, disconnected groupings exist within a network of nodes.",
      inputs: "Nodes count: 5, Edge List: [[0,1],[1,2],[3,4]]",
      expectedOutput: "2",
    },
    {
      question: "Pacific Atlantic Water Flow",
      explanation:
        "Find all coordinates where rainwater can flow down to both the Pacific and Atlantic oceans.",
      inputs: "Heights Grid: [[1,2,2,3,5],[3,2,3,4,4]]",
      expectedOutput: "[[0,4],[1,3],[1,4]]",
    },
    {
      question: "Rotting Oranges",
      explanation:
        "Find the minimum number of minutes until no fresh orange remains in a grid, given rotten oranges spread each minute.",
      inputs: "Grid: [[2,1,1],[1,1,0],[0,1,1]]",
      expectedOutput: "4",
    },
  ],

  "Day 29": [
    {
      question: "Combination Sum",
      explanation:
        "Find all unique lists of numbers that add up to a target amount, allowing the same number to be used multiple times.",
      inputs: "Candidates: [2, 3, 6, 7], Target: 7",
      expectedOutput: "[[2,2,3],[7]]",
    },
    {
      question: "Combination Sum II",
      explanation:
        "Find all unique combinations that sum to target, where each number may only be used once.",
      inputs: "Candidates: [10,1,2,7,6,1,5], Target: 8",
      expectedOutput: "[[1,1,6],[1,2,5],[1,7],[2,6]]",
    },
    {
      question: "Subsets",
      explanation:
        "Return all possible subsets (the power set) of a given array of unique integers.",
      inputs: "Array: [1, 2, 3]",
      expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
    },
  ],

  "Day 30": [
    {
      question: "Permutations",
      explanation:
        "Return all possible orderings (permutations) of a list of distinct numbers.",
      inputs: "Array: [1, 2, 3]",
      expectedOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
    },
    {
      question: "Letter Combinations of a Phone Number",
      explanation:
        "Return all possible letter combinations that a phone number's digits could represent.",
      inputs: 'Digits: "23"',
      expectedOutput: "[ad,ae,af,bd,be,bf,cd,ce,cf]",
    },
    {
      question: "Word Search II",
      explanation:
        "Given a letter grid and a list of dictionary words, find all words that can be formed on the grid.",
      inputs:
        "Letter Grid: [['o','a','a','n'],['e','t','a','e']], Words: [\"oath\",\"pea\",\"eat\",\"rain\"]",
      expectedOutput: "[oath,eat]",
    },
  ],

  // ─── HARD: Day 31–45 ──────────────────────────────────────────────────────

  "Day 31": [
    {
      question: "Climbing Stairs",
      explanation:
        "Count how many unique ways you can climb to the top of a staircase if you can take either 1 or 2 steps at a time.",
      inputs: "Total Steps (n): 3",
      expectedOutput: "3",
    },
    {
      question: "House Robber",
      explanation:
        "Find the maximum money you can steal from a row of houses without robbing two adjacent houses on the same night.",
      inputs: "House Money: [1, 2, 3, 1]",
      expectedOutput: "4",
    },
    {
      question: "House Robber II",
      explanation:
        "Find the maximum money you can steal from houses arranged in a circle, where the first and last houses are neighbors.",
      inputs: "Circular House Money: [2, 3, 2]",
      expectedOutput: "3",
    },
  ],

  "Day 32": [
    {
      question: "Coin Change",
      explanation:
        "Find the fewest number of coins needed to make up a target amount of money.",
      inputs: "Coin Options: [1, 2, 5], Target Amount: 11",
      expectedOutput: "3",
    },
    {
      question: "Longest Increasing Subsequence",
      explanation:
        "Find the length of the longest chain of numbers in an array that continuously gets larger from left to right.",
      inputs: "Array: [10, 9, 2, 5, 3, 7, 101, 18]",
      expectedOutput: "4",
    },
    {
      question: "Unique Paths",
      explanation:
        "Count how many unique paths an item can take from the top-left to the bottom-right of a grid, moving only down or right.",
      inputs: "Grid Rows (m): 3, Columns (n): 7",
      expectedOutput: "28",
    },
  ],

  "Day 33": [
    {
      question: "Longest Common Subsequence",
      explanation:
        "Find the length of the longest matching sequence of characters shared between two text strings in the same order.",
      inputs: 'String A: "abcde", String B: "ace"',
      expectedOutput: "3",
    },
    {
      question: "Word Break Problem",
      explanation:
        "Check if a text string can be cleanly split into words from a provided dictionary list.",
      inputs: 'String: "leetcode", Dictionary: ["leet", "code"]',
      expectedOutput: "true",
    },
    {
      question: "Decode Ways",
      explanation:
        "Count how many different messages a string of digits can be decoded into using A=1 to Z=26.",
      inputs: 'Digit String: "12"',
      expectedOutput: "2",
    },
  ],

  "Day 34": [
    {
      question: "Longest Palindromic Subsequence",
      explanation:
        "Find the length of the longest subsequence of a string that is also a palindrome.",
      inputs: 'String: "bbbab"',
      expectedOutput: "4",
    },
    {
      question: "Edit Distance",
      explanation:
        "Find the minimum number of operations (insert, delete, replace) to convert one word into another.",
      inputs: 'Word 1: "horse", Word 2: "ros"',
      expectedOutput: "3",
    },
    {
      question: "0/1 Knapsack Problem",
      explanation:
        "Given weights and values of items, find the maximum value you can fit into a bag with a weight limit.",
      inputs: "Weights: [1,2,3], Values: [6,10,12], Capacity: 5",
      expectedOutput: "22",
    },
  ],

  "Day 35": [
    {
      question: "Partition Equal Subset Sum",
      explanation:
        "Determine if an array can be partitioned into two subsets with equal sums.",
      inputs: "Array: [1, 5, 11, 5]",
      expectedOutput: "true",
    },
    {
      question: "Target Sum",
      explanation:
        "Assign + or - signs to each number in an array to reach a target sum. Count the number of ways.",
      inputs: "Array: [1, 1, 1, 1, 1], Target: 3",
      expectedOutput: "5",
    },
    {
      question: "Interleaving String",
      explanation:
        "Check if a third string is formed by interleaving the characters of two other strings in order.",
      inputs: 's1: "aabcc", s2: "dbbca", s3: "aadbbcbcac"',
      expectedOutput: "true",
    },
  ],

  "Day 36": [
    {
      question: "Burst Balloons",
      explanation:
        "Find the maximum coins you can collect by bursting balloons strategically, where bursting multiplies adjacent values.",
      inputs: "Balloons: [3, 1, 5, 8]",
      expectedOutput: "167",
    },
    {
      question: "Regular Expression Matching",
      explanation:
        "Implement regex matching with '.' (matches any single character) and '*' (matches zero or more of preceding element).",
      inputs: 'String: "aa", Pattern: "a*"',
      expectedOutput: "true",
    },
    {
      question: "Wildcard Matching",
      explanation:
        "Implement wildcard matching where '?' matches any single character and '*' matches any sequence of characters.",
      inputs: 'String: "adceb", Pattern: "*a*b"',
      expectedOutput: "true",
    },
  ],

  "Day 37": [
    {
      question: "Network Delay Time",
      explanation:
        "Find the minimum time for a signal to reach all nodes in a weighted directed graph using Dijkstra's algorithm.",
      inputs: "Times: [[2,1,1],[2,3,1],[3,4,1]], n: 4, k: 2",
      expectedOutput: "2",
    },
    {
      question: "Cheapest Flights Within K Stops",
      explanation:
        "Find the cheapest price from source to destination with at most K stops in a flight network.",
      inputs:
        "n: 3, Flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 1",
      expectedOutput: "200",
    },
    {
      question: "Path With Minimum Effort",
      explanation:
        "Find a path from top-left to bottom-right of a grid that minimizes the maximum absolute difference between consecutive cells.",
      inputs: "Heights: [[1,2,2],[3,8,2],[5,3,5]]",
      expectedOutput: "2",
    },
  ],

  "Day 38": [
    {
      question: "Reconstruct Itinerary",
      explanation:
        "Given a list of airline tickets, reconstruct the itinerary in lexicographic order starting from JFK.",
      inputs:
        'Tickets: [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
      expectedOutput: "[JFK, MUC, LHR, SFO, SJC]",
    },
    {
      question: "Min Cost to Connect All Points",
      explanation:
        "Find the minimum cost to connect all points where cost is the Manhattan distance between them (Minimum Spanning Tree).",
      inputs: "Points: [[0,0],[2,2],[3,10],[5,2],[7,0]]",
      expectedOutput: "20",
    },
    {
      question: "Swim in Rising Water",
      explanation:
        "Find the minimum time needed to swim from top-left to bottom-right of a grid where the water level rises over time.",
      inputs: "Grid: [[0,2],[1,3]]",
      expectedOutput: "3",
    },
  ],

  "Day 39": [
    {
      question: "LRU Cache",
      explanation:
        "Design a data structure that follows Least Recently Used cache eviction policy with O(1) get and put operations.",
      inputs: "capacity: 2, put(1,1), put(2,2), get(1), put(3,3), get(2)",
      expectedOutput: "get(1)=1, get(2)=-1",
    },
    {
      question: "LFU Cache",
      explanation:
        "Design a data structure that follows Least Frequently Used cache eviction policy with O(1) operations.",
      inputs: "capacity: 2, put(1,1), put(2,2), get(1), put(3,3), get(2)",
      expectedOutput: "get(2)=-1",
    },
    {
      question: "Design Twitter",
      explanation:
        "Design a simplified Twitter with postTweet, getNewsFeed, follow, and unfollow methods.",
      inputs:
        "postTweet(1,5), getNewsFeed(1), follow(1,2), postTweet(2,6), getNewsFeed(1)",
      expectedOutput: "[6, 5]",
    },
  ],

  "Day 40": [
    {
      question: "Encode and Decode Strings",
      explanation:
        "Convert a list of words into a single text string, and write a way to unpack it back into the original list.",
      inputs: 'Words list: ["Hello", "World"]',
      expectedOutput: '["Hello", "World"]',
    },
    {
      question: "Reverse Words in a String",
      explanation:
        "Reverse the order of words in a sentence string, removing extra spaces.",
      inputs: 'String: "  the sky is blue  "',
      expectedOutput: '"blue is sky the"',
    },
    {
      question: "Largest Rectangle in Histogram",
      explanation:
        "Find the area of the largest rectangular shape that can fit completely inside a bar graph chart.",
      inputs: "Bar Heights: [2, 1, 5, 6, 2, 3]",
      expectedOutput: "10",
    },
  ],

  "Day 41": [
    {
      question: "Alien Dictionary",
      explanation:
        "Given a sorted list of words from an alien language, figure out the sorted order of their alphabet letters.",
      inputs: 'Sorted Alien Words: ["wrt","wrf","er","ett","rft"]',
      expectedOutput: '"wertf"',
    },
    {
      question: "Palindrome Pairs",
      explanation:
        "Given a list of words, find all pairs of indices where concatenating the two words forms a palindrome.",
      inputs: 'Words: ["abcd","dcba","lls","s","sssll"]',
      expectedOutput: "[[0,1],[1,0],[3,2],[2,4]]",
    },
    {
      question: "Minimum Window Substring",
      explanation:
        "Revisit: Find the smallest section of a main text string that contains all letters of a target string.",
      inputs: 'Main String: "ADOBECODEBANC", Target Letters: "ABC"',
      expectedOutput: "BANC",
    },
  ],

  "Day 42": [
    {
      question: "Count of Smaller Numbers After Self",
      explanation:
        "For each element in an array, count how many elements to its right are smaller than it.",
      inputs: "Array: [5, 2, 6, 1]",
      expectedOutput: "[2,1,1,0]",
    },
    {
      question: "Reverse Pairs",
      explanation:
        "Count the number of important reverse pairs (i, j) where i < j and nums[i] > 2 * nums[j].",
      inputs: "Array: [1, 3, 2, 3, 1]",
      expectedOutput: "2",
    },
    {
      question: "Maximum Profit in Job Scheduling",
      explanation:
        "Given jobs with start times, end times, and profits, find the maximum profit from non-overlapping jobs.",
      inputs: "Starts: [1,2,3,3], Ends: [3,4,5,6], Profit: [50,10,40,70]",
      expectedOutput: "120",
    },
  ],

  "Day 43": [
    {
      question: "Reverse Integer",
      explanation:
        "Flip the digits of a number backwards, keeping its positive or negative sign.",
      inputs: "Number: -123",
      expectedOutput: "-321",
    },
    {
      question: "Counting Bits",
      explanation:
        "For every number from 0 up to N, count how many '1' bits each number has in binary.",
      inputs: "Limit (n): 2",
      expectedOutput: "[0,1,1]",
    },
    {
      question: "Reverse Bits",
      explanation:
        "Take the 32-bit binary representation of a number and flip it completely backwards.",
      inputs: "Binary String: 00000010100101000001111010011100",
      expectedOutput: "964176192",
    },
  ],

  "Day 44": [
    {
      question: "Trapping Rain Water II",
      explanation:
        "Calculate how much rainwater can be trapped in a 3D elevation grid.",
      inputs: "Height Map: [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]",
      expectedOutput: "4",
    },
    {
      question: "Median of Two Sorted Arrays",
      explanation: "Find the median of two sorted arrays in O(log(m+n)) time.",
      inputs: "Array 1: [1,3], Array 2: [2]",
      expectedOutput: "2.0",
    },
    {
      question: "Merge Sort",
      explanation:
        "Implement merge sort algorithm to sort an array in O(n log n) time.",
      inputs: "Array: [38, 27, 43, 3, 9, 82, 10]",
      expectedOutput: "[3,9,10,27,38,43,82]",
    },
  ],

  "Day 45": [
    {
      question: "Sliding Window Maximum",
      explanation:
        "Revisit: Find the single largest number visible within a sliding window at each step.",
      inputs: "Array: [1, 3, -1, -3, 5, 3, 6, 7], Frame Size (k): 3",
      expectedOutput: "[3,3,5,5,6,7]",
    },
    {
      question: "Binary Tree Maximum Path Sum",
      explanation:
        "Revisit: Find the highest possible sum by connecting adjacent nodes along any path in a tree.",
      inputs: "Tree Root: [1, 2, 3]",
      expectedOutput: "6",
    },
    {
      question: "Minimum Window Substring",
      explanation:
        "Revisit Hard: Find the smallest section of a string containing all target letters.",
      inputs: 'Main String: "a", Target Letters: "a"',
      expectedOutput: "a",
    },
  ],
};
