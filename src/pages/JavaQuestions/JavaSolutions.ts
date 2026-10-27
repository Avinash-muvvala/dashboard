import type { DayType } from "../Constants/DayType";

interface Approach {
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  code: string;
}

interface SolutionData {
  problem: string;
  link: string;
  approaches: Approach[];
}

export const javaSolutions: Record<DayType, SolutionData[]> = {
  "Day 1": [
    {
      problem: "Two Sum",
      link: "https://neetcode.io/solutions/two-sum",
      approaches: [
        {
          name: "Brute Force",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "Use nested loops to check every possible pair of numbers. If their sum matches the target, return their indices.",
          code: "for(int i=0; i<nums.length; i++) {\n    for(int j = i+1; j<nums.length; j++) {\n        if(nums[i] + nums[j] == target) return new int[]{i, j};\n    }\n}",
        },
        {
          name: "One-Pass Hash Map (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Use a HashMap to store values and their indices. For each number, check if (target - current) exists in the map to find the pair instantly.",
          code: "Map<Integer, Integer> map = new HashMap<>();\nfor (int i = 0; i < nums.length; i++) {\n    int complement = target - nums[i];\n    if (map.containsKey(complement)) return new int[]{map.get(complement), i};\n    map.put(nums[i], i);\n}\nreturn new int[]{};",
        },
      ],
    },
    {
      problem: "Contains Duplicate",
      link: "https://neetcode.io/solutions/contains-duplicate",
      approaches: [
        {
          name: "Brute Force",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "Compare every element with every other element using two loops to see if any are equal.",
          code: "for (int i = 0; i < nums.length; i++) {\n    for (int j = i + 1; j < nums.length; j++) {\n        if (nums[i] == nums[j]) return true;\n    }\n}\nreturn false;",
        },
        {
          name: "HashSet (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Add elements to a HashSet one by one. If an element cannot be added because it already exists, return true.",
          code: "Set<Integer> seen = new HashSet<>();\nfor (int num : nums) {\n    if (!seen.add(num)) return true;\n}\nreturn false;",
        },
      ],
    },
    {
      problem: "Best Time to Buy and Sell Stock",
      link: "https://neetcode.io/solutions/best-time-to-buy-and-sell-stock",
      approaches: [
        {
          name: "Brute Force",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "Calculate the profit for every possible buying day and every subsequent selling day to find the maximum.",
          code: "int maxP = 0;\nfor (int i = 0; i < prices.length; i++) {\n    for (int j = i + 1; j < prices.length; j++) {\n        maxP = Math.max(maxP, prices[j] - prices[i]);\n    }\n}\nreturn maxP;",
        },
        {
          name: "One Pass (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Track the minimum price seen so far. For each new price, calculate the profit and update the global maximum profit.",
          code: "int min = prices[0], profit = 0;\nfor (int i=1; i<prices.length; i++) {\n    if(prices[i] < min) min = prices[i];\n    profit = Math.max(profit, prices[i] - min);\n}\nreturn profit;",
        },
      ],
    },
  ],
  "Day 2": [
    {
      problem: "Product of Array Except Self",
      link: "https://neetcode.io/solutions/product-of-array-except-self",
      approaches: [
        {
          name: "Brute Force",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "For each index, calculate the product of every other element by looping through the array again.",
          code: "int[] res = new int[nums.length];\nfor (int i = 0; i < nums.length; i++) {\n    int prod = 1;\n    for (int j = 0; j < nums.length; j++) {\n        if (i != j) prod *= nums[j];\n    }\n    res[i] = prod;\n}\nreturn res;",
        },
        {
          name: "Prefix & Suffix (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Calculate prefix products in one pass. In a second pass (backwards), multiply those values by suffix products.",
          code: "int n = nums.length; int[] res = new int[n]; res[0] = 1;\nfor (int i = 1; i < n; i++) res[i] = res[i-1] * nums[i-1];\nint suffix = 1;\nfor (int i = n - 1; i >= 0; i--) {\n    res[i] *= suffix;\n    suffix *= nums[i];\n}\nreturn res;",
        },
      ],
    },
    {
      problem: "Maximum Subarray",
      link: "https://neetcode.io/solutions/maximum-subarray",
      approaches: [
        {
          name: "Brute Force",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "Iterate through all possible subarrays, calculate their sums, and keep track of the largest sum found.",
          code: "int max = nums[0];\nfor(int i=0; i<nums.length; i++) {\n    int current = 0;\n    for(int j=i; j<nums.length; j++) {\n        current += nums[j];\n        max = Math.max(max, current);\n    }\n}\nreturn max;",
        },
        {
          name: "Kadane's Algorithm (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Iterate through the array once. At each element, decide whether to add it to the existing subarray sum or start a new subarray.",
          code: "int max = nums[0], current = nums[0];\nfor(int i = 1; i < nums.length; i++) {\n    current = Math.max(nums[i], current + nums[i]);\n    max = Math.max(max, current);\n}\nreturn max;",
        },
      ],
    },
    {
      problem: "Maximum Product Subarray",
      link: "https://neetcode.io/solutions/maximum-product-subarray",
      approaches: [
        {
          name: "Brute Force",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "Check every possible subarray product using nested loops and track the maximum.",
          code: "int max = nums[0];\nfor(int i=0; i<nums.length; i++) {\n    int prod = 1;\n    for(int j=i; j<nums.length; j++) {\n        prod *= nums[j];\n        max = Math.max(max, prod);\n    }\n}\nreturn max;",
        },
        {
          name: "Kadane's Variation (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Maintain both a max and a min running product. Swap them when the current number is negative, as a negative times a minimum negative produces a new maximum.",
          code: "public int maxProduct(int[] nums) {\n    int maxP = nums[0], minP = nums[0], result = nums[0];\n    for (int i = 1; i < nums.length; i++) {\n        if (nums[i] < 0) { int tmp = maxP; maxP = minP; minP = tmp; }\n        maxP = Math.max(nums[i], maxP * nums[i]);\n        minP = Math.min(nums[i], minP * nums[i]);\n        result = Math.max(result, maxP);\n    }\n    return result;\n}",
        },
      ],
    },
  ],
  "Day 3": [
    {
      problem: "Find Minimum in Rotated Sorted Array",
      link: "https://neetcode.io/solutions/find-minimum-in-rotated-sorted-array",
      approaches: [
        {
          name: "Linear Scan",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Iterate through the array to find the point where the order breaks (nums[i] > nums[i+1]).",
          code: "for (int i = 0; i < nums.length - 1; i++) {\n    if (nums[i] > nums[i+1]) return nums[i+1];\n}\nreturn nums[0];",
        },
        {
          name: "Binary Search (Optimal)",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
          explanation:
            "Use binary search. If mid > right, the pivot (minimum) is in the right half. Otherwise, it is in the left half.",
          code: "public int findMin(int[] nums) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] > nums[right]) left = mid + 1;\n        else right = mid;\n    }\n    return nums[left];\n}",
        },
      ],
    },
    {
      problem: "Longest Consecutive Sequence",
      link: "https://neetcode.io/solutions/longest-consecutive-sequence",
      approaches: [
        {
          name: "HashSet (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Add all numbers to a Set. Only start a sequence count if the number is the 'start' of a sequence (i.e., num - 1 is not in the set). This ensures each number is visited only a constant number of times.",
          code: "public int longestConsecutive(int[] nums) {\n    Set<Integer> set = new HashSet<>();\n    for (int n : nums) set.add(n);\n    int longest = 0;\n    for (int n : set) {\n        if (!set.contains(n - 1)) {\n            int cur = n, len = 1;\n            while (set.contains(cur + 1)) { cur++; len++; }\n            longest = Math.max(longest, len);\n        }\n    }\n    return longest;\n}",
        },
      ],
    },
    {
      problem: "Remove Duplicates from Sorted Array",
      link: "https://neetcode.io/solutions/remove-duplicates-from-sorted-array",
      approaches: [
        {
          name: "Two-Pointer In-Place Rewrite",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
          explanation:
            "Sort the input collection first. Use a secondary write index to compact unique variables sequentially within the source boundaries while caching isolated duplicates into an auxiliary collection.",
          code: 'int[] nums = {1,2,3,1,1,1,4,5,6,1,2,2,3,4,5};\nList<Integer> duplicates = new ArrayList<>();\nArrays.sort(nums);\nint index = 1;\nfor(int i = 1; i < nums.length; i++){\n    if(nums[i] != nums[i-1]){\n        nums[index] = nums[i];\n        index++;\n    } else {\n        duplicates.add(nums[i]);\n    }\n}\nfor(int i = 0; i < index; i++){\n    System.out.print(nums[i] + " ");\n}\nSystem.out.println("\\nDuplicates: " + duplicates);',
        },
      ],
    },
  ],
  "Day 4": [
    {
      problem: "Longest Substring Without Repeating Characters",
      link: "https://neetcode.io/solutions/longest-substring-without-repeating-characters",
      approaches: [
        {
          name: "Sliding Window (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(min(n, m))",
          explanation:
            "Maintain a sliding window where each character is unique. Use a HashMap to store the last seen index of each character. If a duplicate is found, jump the left pointer to the position after the last occurrence.",
          code: "public int lengthOfLongestSubstring(String s) {\n    Map<Character, Integer> map = new HashMap<>();\n    int maxLen = 0, left = 0;\n    for (int right = 0; right < s.length(); right++) {\n        char c = s.charAt(right);\n        if (map.containsKey(c)) left = Math.max(left, map.get(c) + 1);\n        map.put(c, right);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}",
        },
      ],
    },
    {
      problem: "Longest Repeating Character Replacement",
      link: "https://neetcode.io/solutions/longest-repeating-character-replacement",
      approaches: [
        {
          name: "Sliding Window (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Maintain a frequency count of characters in the current window. A window is valid if (length - maxFrequency) <= k. Instead of re-scanning for maxFrequency, we only update it when the current character's count increases.",
          code: "public int characterReplacement(String s, int k) {\n    int[] count = new int[26];\n    int maxCount = 0, maxLen = 0, left = 0;\n    for (int right = 0; right < s.length(); right++) {\n        maxCount = Math.max(maxCount, ++count[s.charAt(right) - 'A']);\n        while ((right - left + 1) - maxCount > k) count[s.charAt(left++) - 'A']--;\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}",
        },
      ],
    },
    {
      problem: "Minimum Window Substring",
      link: "https://neetcode.io/solutions/minimum-window-substring",
      approaches: [
        {
          name: "Sliding Window (Optimal)",
          timeComplexity: "O(n + m)",
          spaceComplexity: "O(m)",
          explanation:
            "Use two frequency maps: one for characters required and one for the current window. Expand the right pointer until all requirements are met, then shrink the left pointer as much as possible while maintaining validity.",
          code: 'public String minWindow(String s, String t) {\n    Map<Character, Integer> need = new HashMap<>(), window = new HashMap<>();\n    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);\n    int left=0, right=0, valid=0, start=0, minLen=Integer.MAX_VALUE;\n    while (right < s.length()) {\n        char c = s.charAt(right++);\n        if (need.containsKey(c)) {\n            window.merge(c, 1, Integer::sum);\n            if (window.get(c).equals(need.get(c))) valid++;\n        }\n        while (valid == need.size()) {\n            if (right - left < minLen) { start = left; minLen = right - left; }\n            char d = s.charAt(left++);\n            if (need.containsKey(d)) {\n                if (window.get(d).equals(need.get(d))) valid--;\n                window.merge(d, -1, Integer::sum);\n            }\n        }\n    }\n    return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);\n}',
        },
      ],
    },
  ],
  "Day 5": [
    {
      problem: "Sliding Window Maximum",
      link: "https://leetcode.com/problems/sliding-window-maximum/",
      approaches: [
        {
          name: "Monotonic Deque (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(k) where k is the window size",
          explanation:
            "Maintain a double-ended queue (Deque) that stores indices of elements. Ensure that the values corresponding to these indices are always in strictly decreasing order. For each element, clean up the back of the deque by removing indices of all values smaller than the current element. Additionally, clean up the front of the deque to remove elements that have fallen outside the bounds of the current sliding window. The front of the deque will always hold the index of the maximum element for that window.",
          code: "public int[] maxSlidingWindow(int[] nums, int k) {\n    if (nums == null || nums.length == 0) return new int[0];\n    int n = nums.length;\n    int[] result = new int[n - k + 1];\n    int ri = 0;\n    \n    // Deque will store indices\n    Deque<Integer> q = new ArrayDeque<>();\n    \n    for (int i = 0; i < nums.length; i++) {\n        // Remove numbers out of current window range from front\n        if (!q.isEmpty() && q.peek() == i - k) {\n            q.poll();\n        }\n        \n        // Remove smaller numbers in k range from back\n        while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) {\n            q.pollLast();\n        }\n        \n        // Add current element's index\n        q.offer(i);\n        \n        // Start adding to results array once first window is fully covered\n        if (i >= k - 1) {\n            result[ri++] = nums[q.peek()];\n        }\n    }\n    return result;\n}",
        },
        {
          name: "Block Partitioning / Two-Pass Prefix-Suffix Arrays (Alternative)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n) auxiliary memory arrays",
          explanation:
            "Divide the input array into blocks of size k. Precompute two tracking arrays: 'left' and 'right'. 'left[i]' stores the maximum element from the start of its block up to index i (sweeping left-to-right). 'right[i]' stores the maximum element from index i to the end of its block (sweeping right-to-left). For any sliding window spanning from index i to j, the maximum value is simply the maximum of right[i] (max of the suffix in the first block) and left[j] (max of the prefix in the second block).",
          code: "public int[] maxSlidingWindow(int[] nums, int k) {\n    int n = nums.length;\n    if (n == 0 || k == 0) return new int[0];\n    \n    int[] left = new int[n];\n    int[] right = new int[n];\n    \n    // Populate left-to-right block max\n    for (int i = 0; i < n; i++) {\n        if (i % k == 0) {\n            left[i] = nums[i]; // Block start\n        } else {\n            left[i] = Math.max(left[i - 1], nums[i]);\n        }\n    }\n    \n    // Populate right-to-left block max\n    for (int i = n - 1; i >= 0; i--) {\n        if (i == n - 1 || (i + 1) % k == 0) {\n            right[i] = nums[i]; // Block end\n        } else {\n            right[i] = Math.max(right[i + 1], nums[i]);\n        }\n    }\n    \n    int[] result = new int[n - k + 1];\n    for (int i = 0; i <= n - k; i++) {\n        result[i] = Math.max(right[i], left[i + k - 1]);\n    }\n    \n    return result;\n}",
        },
      ],
    },
    {
      problem: "Find All Duplicates in an Array / Frequency Tracking",
      link: "https://neetcode.io/solutions/find-all-duplicates-in-an-array",
      approaches: [
        {
          name: "HashMap Frequency Counter",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Iterate through the string and map each character to its occurrence frequency using a HashMap. Afterward, loop through the key set to identify and print duplicate entries with a frequency higher than 1.",
          code: 'String str = "aabcaadcdefe";\nMap<Character, Integer> hh = new HashMap<>();\nint count;\nfor(int i = 0; i < str.length(); i++) {\n    if(hh.containsKey(str.charAt(i))) {\n        count = hh.get(str.charAt(i));\n        hh.put(str.charAt(i), count + 1);\n    } else {\n        hh.put(str.charAt(i), 1);\n    }\n}\nfor(char key : hh.keySet()) {\n    if(hh.get(key) > 1) {\n        System.out.println(key + "--->" + hh.get(key));\n    }\n}',
        },
      ],
    },
    {
      problem: "Remove Element",
      link: "https://neetcode.io/solutions/remove-element",
      approaches: [
        {
          name: "Two-Pointer Skipping",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
          explanation:
            "Sort the values, then process elements sequentially using an expansion variable loop. Skip values that match the target value, collecting all non-matching values into a clean output sequence.",
          code: "int[] data = {1,2,3,4,5,2,6,7,8,2,11,12,13,14,2};\nint target = 2;\nList<Integer> result = new ArrayList<>();\nArrays.sort(data);\nint index = 0;\nfor(int i = 0; i < data.length; i++){\n    if(data[i] != target){\n        data[index] = data[i];\n        index++;\n    }\n}\nfor(int i = 0; i < index; i++){\n    result.add(data[i]);\n}\nSystem.out.println(result);",
        },
      ],
    },
  ],
  "Day 6": [
    {
      problem: "Valid Anagram",
      link: "https://neetcode.io/solutions/valid-anagram",
      approaches: [
        {
          name: "Frequency Counter (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Use an integer array of size 26 to count occurrences. Increment for string S and decrement for string T. If the final array is all zeros, the strings are anagrams.",
          code: "public boolean isAnagram(String s, String t) {\n    if (s.length() != t.length()) return false;\n    int[] count = new int[26];\n    for (char c : s.toCharArray()) count[c - 'a']++;\n    for (char c : t.toCharArray()) count[c - 'a']--;\n    for (int x : count) if (x != 0) return false;\n    return true;\n}",
        },
      ],
    },
    {
      problem: "Group Anagrams",
      link: "https://neetcode.io/solutions/group-anagrams",
      approaches: [
        {
          name: "Sorting Key",
          timeComplexity: "O(n * k log k)",
          spaceComplexity: "O(n * k)",
          explanation:
            "Sort each string alphabetically to create a 'key'. Anagrams will share the same key. Use a HashMap to group strings by their sorted keys.",
          code: "public List<List<String>> groupAnagrams(String[] strs) {\n    Map<String, List<String>> map = new HashMap<>();\n    for (String s : strs) {\n        char[] chars = s.toCharArray();\n        Arrays.sort(chars);\n        String key = new String(chars);\n        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n    }\n    return new ArrayList<>(map.values());\n}",
        },

        {
          name: "Character Count Key (Optimal)",
          timeComplexity: "O(n * k)",
          spaceComplexity: "O(n * k)",
          explanation:
            "Instead of sorting, create a string key based on the character counts (e.g., '1#0#2...'). This avoids the O(k log k) sorting cost and handles potential collisions by using a delimiter.",
          code: "public List<List<String>> groupAnagrams(String[] strs) {\n    if (strs == null || strs.length == 0) return new ArrayList<>();\n    Map<String, List<String>> map = new HashMap<>();\n    for (String s : strs) {\n        int[] count = new int[26];\n        for (char c : s.toCharArray()) count[c - 'a']++;\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < 26; i++) {\n            sb.append(count[i]);\n            sb.append('#');\n        }\n        String key = sb.toString();\n        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n    }\n    return new ArrayList<>(map.values());\n}",
        },
      ],
    },
    {
      problem: "First Unique Character in a String",
      link: "https://neetcode.io/solutions/first-unique-character-in-a-string",
      approaches: [
        {
          name: "Brute Force (Nested Loops)",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "Compare each character against every other character in the string using nested loops. If a character does not match any other index, print or return it.",
          code: 'String str = "abbac";\nfor (int i = 0; i < str.length(); i++) {\n    char current = str.charAt(i);\n    boolean isRepeat = true;\n    for (int j = 0; j < str.length(); j++) {\n        if (i != j && str.charAt(j) == current) {\n            isRepeat = false;\n            break;\n        }\n    }\n    if (isRepeat) {\n        System.out.println(current);\n    }\n}',
        },
      ],
    },
  ],
  "Day 7": [
    {
      problem: "Longest Common Prefix",
      link: "https://neetcode.io/solutions/longest-common-prefix",
      approaches: [
        {
          name: "Horizontal Scanning (Optimal)",
          timeComplexity: "O(n * m)",
          spaceComplexity: "O(1)",
          explanation:
            "Assume the first string is the common prefix. Iterate through the rest of the strings, repeatedly shortening the prefix using substring operations until it matches the beginning of the current string (indexOf == 0). If the prefix becomes empty, there is no common prefix.",
          code: 'if(strs == null || strs.length == 0) {\n    return "";\n}\nString prefix = strs[0];\nfor(int i = 1; i < strs.length; i++){\n    while(strs[i].indexOf(prefix) != 0){\n        prefix = prefix.substring(0, prefix.length() - 1);\n        if(prefix.isEmpty()){\n            return "";\n        }\n    }\n}\nreturn prefix;',
        },
        {
          name: "Sorting Approach",
          timeComplexity: "O(n * log n * m)",
          spaceComplexity: "O(n)",
          explanation:
            "Sort the list of strings lexicographically. Sorting clusters the strings by character similarity, meaning you only need to find the common characters between the absolute first and absolute last string to find the prefix for the entire set.",
          code: 'List<String> data = Arrays.asList("hello","heman","heater","head","hell","herus");\nCollections.sort(data);\n\nString first = data.get(0);\nString last = data.get(data.size()-1);\nint i = 0;\n\nwhile(i < first.length() && i < last.length() && first.charAt(i) == last.charAt(i)){\n    i++;\n}\nString lcp = first.substring(0, i);\nSystem.out.println(lcp);',
        },
      ],
    },
    {
      problem: "Find All Duplicates in an Array / Frequency Tracking",
      link: "https://neetcode.io/solutions/find-all-duplicates-in-an-array",
      approaches: [
        {
          name: "HashMap Frequency Counter",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Iterate through the string and map each character to its occurrence frequency using a HashMap. Afterward, loop through the key set to identify and print duplicate entries with a frequency higher than 1.",
          code: 'String str = "aabcaadcdefe";\nMap<Character, Integer> hh = new HashMap<>();\nint count;\nfor(int i = 0; i < str.length(); i++) {\n    if(hh.containsKey(str.charAt(i))) {\n        count = hh.get(str.charAt(i));\n        hh.put(str.charAt(i), count + 1);\n    } else {\n        hh.put(str.charAt(i), 1);\n    }\n}\nfor(char key : hh.keySet()) {\n    if(hh.get(key) > 1) {\n        System.out.println(key + "--->" + hh.get(key));\n    }\n}',
        },
      ],
    },
    {
      problem: "Find the Index of the First Occurrence in a String",
      link: "https://neetcode.io/solutions/find-the-index-of-the-first-occurrence-in-a-string",
      approaches: [
        {
          name: "Sliding Window Substring Search",
          timeComplexity: "O((n-m)*m)",
          spaceComplexity: "O(1)",
          explanation:
            "Slide a window of size `s2.length()` along `s1`. Extract substrings at every offset position and compare them directly against `s2` to locate the first matching index.",
          code: "public static int occurance(String s1, String s2){\n    if(s2.length() == 0) return 0;\n    for(int i = 0; i <= s1.length() - s2.length(); i++){\n        if(s1.substring(i, i + s2.length()).equals(s2)){\n            return i;\n        }\n    }\n    return -1;\n}",
        },
      ],
    },
  ],
  "Day 8": [
    {
      problem: "Valid Palindrome",
      link: "https://neetcode.io/solutions/valid-palindrome",
      approaches: [
        {
          name: "Two Pointers (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Place pointers at the start and end of the string. Move them inward, skipping any non-alphanumeric characters using Character.isLetterOrDigit(). Compare the characters in a case-insensitive manner.",
          code: "public boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n        left++; right--;\n    }\n    return true;\n}",
        },
      ],
    },
    {
      problem: "Longest Palindromic Substring",
      link: "https://neetcode.io/solutions/longest-palindromic-substring",
      approaches: [
        {
          name: "Expand Around Center (Optimal)",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "Every character (odd length) and every gap between characters (even length) is a potential center of a palindrome. Expand outward from all 2n-1 centers and keep track of the maximum length found.",
          code: "public String longestPalindrome(String s) {\n    int start = 0, maxLen = 0;\n    for (int i = 0; i < s.length(); i++) {\n        int len1 = expand(s, i, i);\n        int len2 = expand(s, i, i + 1);\n        int len = Math.max(len1, len2);\n        if (len > maxLen) {\n            maxLen = len;\n            start = i - (len - 1) / 2;\n        }\n    }\n    return s.substring(start, start + maxLen);\n}\nprivate int expand(String s, int l, int r) {\n    while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {\n        l--; r++;\n    }\n    return r - l - 1;\n}",
        },
      ],
    },
    {
      problem: "Palindromic Substrings",
      link: "https://neetcode.io/solutions/palindromic-substrings",
      approaches: [
        {
          name: "Dynamic Programming",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(n^2)",
          explanation:
            "Use a 2D boolean array where dp[i][j] is true if the substring from i to j is a palindrome. A substring is a palindrome if the outer characters match and the inner substring was also a palindrome.",
          code: "public int countSubstrings(String s) {\n    int n = s.length(), count = 0;\n    boolean[][] dp = new boolean[n][n];\n    for (int i = n - 1; i >= 0; i--) {\n        for (int j = i; j < n; j++) {\n            dp[i][j] = s.charAt(i) == s.charAt(j) && (j - i <= 2 || dp[i+1][j-1]);\n            if (dp[i][j]) count++;\n        }\n    }\n    return count;\n}",
        },
        {
          name: "Expand Around Center (Space Optimal)",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "Similar to Longest Palindromic Substring, expand from each center and increment a counter for every valid palindrome expanded.",
          code: "",
        },
      ],
    },
  ],
  "Day 9": [
    {
      problem: "3Sum",
      link: "https://neetcode.io/solutions/3sum",
      approaches: [
        {
          name: "Two Pointers (Optimal)",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "Sort the array. Fix one element and use two pointers to find the other two. Skip duplicates to ensure unique triplets.",
          code: "public List<List<Integer>> threeSum(int[] nums) {\n    Arrays.sort(nums);\n    List<List<Integer>> res = new ArrayList<>();\n    for (int i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int left = i + 1, right = nums.length - 1;\n        while (left < right) {\n            int sum = nums[i] + nums[left] + nums[right];\n            if (sum == 0) {\n                res.add(Arrays.asList(nums[i], nums[left++], nums[right--]));\n                while (left < right && nums[left] == nums[left - 1]) left++;\n                while (left < right && nums[right] == nums[right + 1]) right--;\n            } else if (sum < 0) left++;\n            else right--;\n        }\n    }\n    return res;\n}",
        },
      ],
    },
    {
      problem: "Container With Most Water",
      link: "https://neetcode.io/solutions/container-with-most-water",
      approaches: [
        {
          name: "Brute Force",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "Check every possible pair of vertical lines and calculate the area. Keep track of the maximum area found.",
          code: "int maxWater = 0;\nfor (int i = 0; i < height.length; i++) {\n    for (int j = i + 1; j < height.length; j++) {\n        int area = Math.min(height[i], height[j]) * (j - i);\n        maxWater = Math.max(maxWater, area);\n    }\n}\nreturn maxWater;",
        },
        {
          name: "Two Pointers (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Start with pointers at both ends. Move the pointer with the shorter height inward, as that is the only way to potentially find a larger area despite the decreasing width.",
          code: "public int maxArea(int[] height) {\n    int left = 0, right = height.length - 1, maxWater = 0;\n    while (left < right) {\n        maxWater = Math.max(maxWater, Math.min(height[left], height[right]) * (right - left));\n        if (height[left] < height[right]) left++;\n        else right--;\n    }\n    return maxWater;\n}",
        },
      ],
    },
    {
      problem: "Trapping Rain Water",
      link: "https://leetcode.com/problems/trapping-rain-water/",
      approaches: [
        {
          name: "Two-Pointer Approach (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Instead of precomputing arrays, use two pointers (`left` and `right`) starting at the ends of the array. Maintain `leftMax` and `rightMax`. Move the pointer that points to the smaller height, because the lower boundary determines the bottleneck for trapped water. Update the respective maximum value and calculate trapped water at that position on the fly.",
          code: "public int trap(int[] height) {\n    if (height == null || height.length == 0) return 0;\n    \n    int left = 0, right = height.length - 1;\n    int leftMax = 0, rightMax = 0;\n    int totalWater = 0;\n    \n    while (left < right) {\n        if (height[left] < height[right]) {\n            if (height[left] >= leftMax) {\n                leftMax = height[left];\n            } else {\n                totalWater += leftMax - height[left];\n            }\n            left++;\n        } else {\n            if (height[right] >= rightMax) {\n                rightMax = height[right];\n            } else {\n                totalWater += rightMax - height[right];\n            }\n            right--;\n        }\n    }\n    return totalWater;\n}",
        },
        {
          name: "Prefix & Suffix Max Arrays (Precomputation)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Create two extra arrays: `leftMax` where leftMax[i] stores the maximum height encountered from the left up to index i, and `rightMax` where rightMax[i] stores the maximum height encountered from the right down to index i. Finally, iterate through the array, using the minimum of leftMax[i] and rightMax[i] minus the current height to find the water trapped at index i.",
          code: "public int trap(int[] height) {\n    if (height == null || height.length == 0) return 0;\n    int n = height.length;\n    int totalWater = 0;\n    \n    int[] leftMax = new int[n];\n    int[] rightMax = new int[n];\n    \n    leftMax[0] = height[0];\n    for (int i = 1; i < n; i++) {\n        leftMax[i] = Math.max(leftMax[i - 1], height[i]);\n    }\n    \n    rightMax[n - 1] = height[n - 1];\n    for (int i = n - 2; i >= 0; i--) {\n        rightMax[i] = Math.max(rightMax[i + 1], height[i]);\n    }\n    \n    for (int i = 0; i < n; i++) {\n        totalWater += Math.min(leftMax[i], rightMax[i]) - height[i];\n    }\n    \n    return totalWater;\n}",
        },
      ],
    },
  ],
  "Day 10": [
    {
      problem: "Find Minimum in Rotated Sorted Array",
      link: "https://neetcode.io/solutions/find-minimum-in-rotated-sorted-array",
      approaches: [
        {
          name: "Linear Scan",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Iterate through the array to find the point where the order breaks (nums[i] > nums[i+1]).",
          code: "for (int i = 0; i < nums.length - 1; i++) {\n    if (nums[i] > nums[i+1]) return nums[i+1];\n}\nreturn nums[0];",
        },
        {
          name: "Binary Search (Optimal)",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
          explanation:
            "Use binary search. If mid > right, the pivot (minimum) is in the right half. Otherwise, it is in the left half.",
          code: "public int findMin(int[] nums) {\n    int left = 0, right = nums.length - 1;\n    while (left < right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] > nums[right]) left = mid + 1;\n        else right = mid;\n    }\n    return nums[left];\n}",
        },
      ],
    },
    {
      problem: "Search in Rotated Sorted Array",
      link: "https://neetcode.io/solutions/search-in-rotated-sorted-array",
      approaches: [
        {
          name: "Linear Search",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Iterate through the array and return the index if the target is found.",
          code: "for(int i=0; i<nums.length; i++) {\n    if(nums[i] == target) return i;\n}\nreturn -1;",
        },
        {
          name: "Modified Binary Search (Optimal)",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
          explanation:
            "Determine which side is sorted. If the target is within the range of the sorted side, move there; otherwise, search the other side.",
          code: "public int search(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[left] <= nums[mid]) {\n            if (target >= nums[left] && target < nums[mid]) right = mid - 1;\n            else left = mid + 1;\n        } else {\n            if (target > nums[mid] && target <= nums[right]) left = mid + 1;\n            else right = mid - 1;\n        }\n    }\n    return -1;\n}",
        },
      ],
    },
    {
      problem: "Sqrt(x)",
      link: "https://neetcode.io/solutions/sqrtx",
      approaches: [
        {
          name: "Binary Search Bound Tracking",
          timeComplexity: "O(log x)",
          spaceComplexity: "O(1)",
          explanation:
            "Search for the integer square root within the range [1, x] using binary search. Use cast long variables for matching operations to prevent integer overflow.",
          code: "public int mySqrt(int x) {\n    if(x == 0 || x == 1) return x;\n    int start = 1, end = x, res = 0;\n    while(start <= end) {\n        int mid = start + (end - start) / 2;\n        if((long) mid * mid > (long) x){\n            end = mid - 1;\n        } else if(mid * mid == x){\n            return mid;\n        } else {\n            start = mid + 1;\n            res = mid;\n        }\n    }\n    return res;\n}",
        },
      ],
    },
  ],
  "Day 11": [
    {
      problem: "Sum of Two Integers",
      link: "https://neetcode.io/solutions/sum-of-two-integers",
      approaches: [
        {
          name: "Bit Manipulation (Optimal)",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
          explanation:
            "Use XOR (^) for addition without carry and AND (&) shifted left (<< 1) for the carry. Repeat until the carry is zero.",
          code: "public int getSum(int a, int b) {\n    while (b != 0) {\n        int carry = (a & b) << 1;\n        a = a ^ b;\n        b = carry;\n    }\n    return a;\n}",
        },
      ],
    },
    {
      problem: "Number of 1 Bits",
      link: "https://neetcode.io/solutions/number-of-1-bits",
      approaches: [
        {
          name: "Bit Shifting",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
          explanation:
            "Check each of the 32 bits of the integer by shifting it right and checking the last bit with (n & 1).",
          code: "public int hammingWeight(int n) {\n    int count = 0;\n    while (n != 0) {\n        count += (n & 1);\n        n >>>= 1;\n    }\n    return count;\n}",
        },
        {
          name: "Brian Kernighan's Algorithm (Optimal)",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
          explanation:
            "The operation n & (n - 1) always clears the least significant set bit. The number of times we can do this is the number of 1 bits.",
          code: "public int hammingWeight(int n) {\n    int count = 0;\n    while (n != 0) {\n        n &= (n - 1);\n        count++;\n    }\n    return count;\n}",
        },
      ],
    },
    {
      problem: "Missing Number",
      link: "https://neetcode.io/solutions/missing-number",
      approaches: [
        {
          name: "Sum Formula",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Calculate the expected sum of 0 to n using n*(n+1)/2 and subtract all elements in the array. The result is the missing number.",
          code: "int n = nums.length;\nint expectedSum = n * (n + 1) / 2;\nint actualSum = 0;\nfor (int num : nums) actualSum += num;\nreturn expectedSum - actualSum;",
        },
        {
          name: "XOR (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "XOR all numbers from 0 to n and all elements in the array. Since a ^ a = 0, all numbers except the missing one will cancel out.",
          code: "public int missingNumber(int[] nums) {\n    int xor = nums.length;\n    for (int i = 0; i < nums.length; i++) {\n        xor ^= i ^ nums[i];\n    }\n    return xor;\n}",
        },
      ],
    },
  ],
  "Day 12": [
    {
      problem: "Reverse a Linked List",
      link: "https://neetcode.io/solutions/reverse-linked-list",
      approaches: [
        {
          name: "Iterative Pointer Reversal",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Maintain three pointers: prev (initially null), curr (initially head), and next. Iterate through the list, cache the next node, change the current node's pointer to face backward towards prev, and then shift both prev and curr forward one step.",
          code: "public ListNode reverseList(ListNode head) {\n    ListNode prev = null;\n    ListNode curr = head;\n    while (curr != null) {\n        ListNode nextTemp = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = nextTemp;\n    }\n    return prev;\n}",
        },
      ],
    },
    {
      problem: "Detect Cycle in a Linked List",
      link: "https://neetcode.io/solutions/linked-list-cycle",
      approaches: [
        {
          name: "Floyd's Tortoise and Hare (Two-Pointer)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Initialize two pointers at the head: a slow pointer that moves one step at a time, and a fast pointer that moves two steps at a time. If there is a cycle in the list, the fast pointer will eventually wrap around and meet the slow pointer. If the fast pointer reaches null, no cycle exists.",
          code: "public boolean hasCycle(ListNode head) {\n    if (head == null || head.next == null) {\n        return false;\n    }\n    ListNode slow = head;\n    ListNode fast = head;\n    while (fast != null && fast.next != null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow == fast) {\n            return true;\n        }\n    }\n    return false;\n}",
        },
      ],
    },
    {
      problem: "Merge Two Sorted Lists",
      link: "https://neetcode.io/solutions/merge-two-sorted-lists",
      approaches: [
        {
          name: "Iterative (Optimal)",
          timeComplexity: "O(n + m)",
          spaceComplexity: "O(1)",
          explanation:
            "Use a dummy head to simplify edge cases. Compare the heads of both lists, attach the smaller one to the merged list, and advance that list's pointer.",
          code: "public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0), cur = dummy;\n    while (l1 != null && l2 != null) {\n        if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }\n        else { cur.next = l2; l2 = l2.next; }\n        cur = cur.next;\n    }\n    cur.next = (l1 != null) ? l1 : l2;\n    return dummy.next;\n}",
        },
      ],
    },
  ],
  "Day 13": [
    {
      problem: "Remove Nth Node From End of List",
      link: "https://neetcode.io/solutions/remove-nth-node-from-end-of-list",
      approaches: [
        {
          name: "Two Pointers (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Use a dummy node to handle removing the head. Advance a 'fast' pointer n steps. Then move both 'fast' and 'slow' until 'fast' reaches the end. 'slow' will be just before the target node.",
          code: "public ListNode removeNthFromEnd(ListNode head, int n) {\n    ListNode dummy = new ListNode(0);\n    dummy.next = head;\n    ListNode fast = dummy, slow = dummy;\n    for (int i = 0; i <= n; i++) fast = fast.next;\n    while (fast != null) { slow = slow.next; fast = fast.next; }\n    slow.next = slow.next.next;\n    return dummy.next;\n}",
        },
      ],
    },
    {
      problem: "Reorder List",
      link: "https://neetcode.io/solutions/reorder-list",
      approaches: [
        {
          name: "Reverse and Merge (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "1. Find the middle of the list using slow/fast pointers. 2. Reverse the second half of the list. 3. Interleave the two halves by picking one node from each.",
          code: "public void reorderList(ListNode head) {\n    if (head == null) return;\n    ListNode slow = head, fast = head;\n    while (fast.next != null && fast.next.next != null) { slow = slow.next; fast = fast.next.next; }\n    ListNode second = slow.next; slow.next = null;\n    ListNode prev = null;\n    while (second != null) { ListNode tmp = second.next; second.next = prev; prev = second; second = tmp; }\n    second = prev;\n    ListNode first = head;\n    while (second != null) {\n        ListNode tmp1 = first.next, tmp2 = second.next;\n        first.next = second; second.next = tmp1;\n        first = tmp1; second = tmp2;\n    }\n}",
        },
      ],
    },
    {
      problem: "Remove Duplicates from Sorted List",
      link: "https://neetcode.io/solutions/remove-duplicates-from-sorted-list",
      approaches: [
        {
          name: "Iterative Element Lookahead",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Traverse the linked list using a tracking pointer. If the current node's value equals the next node's value, bypass the next node by linking directly to the node after it.",
          code: "public ListNode deleteDuplicates(ListNode head) {\n    if(head == null || head.next == null) return head;\n    ListNode current = head;\n    while(current != null && current.next != null) {\n        if(current.val == current.next.val) {\n            current.next = current.next.next;\n        } else {\n            current = current.next;\n        }\n    }\n    return head;\n}",
        },
      ],
    },
  ],
  "Day 14": [
    {
      problem: "Valid Parentheses",
      link: "https://neetcode.io/solutions/valid-parentheses",
      approaches: [
        {
          name: "Stack (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Use a stack to keep track of opening brackets. When a closing bracket is encountered, it must match the top of the stack. If it doesn't, or if the stack is empty when a closer appears, the string is invalid.",
          code: "public boolean isValid(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    for (char c : s.toCharArray()) {\n        if (c == '(' || c == '[' || c == '{') stack.push(c);\n        else {\n            if (stack.isEmpty()) return false;\n            char top = stack.pop();\n            if (c == ')' && top != '(') return false;\n            if (c == ']' && top != '[') return false;\n            if (c == '}' && top != '{') return false;\n        }\n    }\n    return stack.isEmpty();\n}",
        },
      ],
    },
    {
      problem: "Merge Intervals",
      link: "https://neetcode.io/solutions/merge-intervals",
      approaches: [
        {
          name: "Sorting (Optimal)",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
          explanation:
            "Sort intervals by their start times. Iterate through the sorted list and compare the current interval with the last merged one. If they overlap, update the end time; otherwise, add a new entry.",
          code: "public int[][] merge(int[][] intervals) {\n    if (intervals.length <= 1) return intervals;\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    List<int[]> res = new ArrayList<>();\n    int[] cur = intervals[0];\n    for (int i = 1; i < intervals.length; i++) {\n        if (intervals[i][0] <= cur[1]) cur[1] = Math.max(cur[1], intervals[i][1]);\n        else { res.add(cur); cur = intervals[i]; }\n    }\n    res.add(cur);\n    return res.toArray(new int[0][]);\n}",
        },
      ],
    },
    {
      problem: "Insert Interval",
      link: "https://neetcode.io/solutions/insert-interval",
      approaches: [
        {
          name: "Linear Scan (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Iterate through the sorted intervals in three phases: add all intervals that end before the new interval starts, merge all overlapping intervals into the new interval, and finally add all remaining intervals.",
          code: "public int[][] insert(int[][] intervals, int[] newInterval) {\n    List<int[]> res = new ArrayList<>();\n    int i = 0, n = intervals.length;\n    while (i < n && intervals[i][1] < newInterval[0]) res.add(intervals[i++]);\n    while (i < n && intervals[i][0] <= newInterval[1]) {\n        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n        i++;\n    }\n    res.add(newInterval);\n    while (i < n) res.add(intervals[i++]);\n    return res.toArray(new int[0][]);\n}",
        },
      ],
    },
  ],
  "Day 15": [
    {
      problem: "Non-overlapping Intervals",
      link: "https://neetcode.io/solutions/non-overlapping-intervals",
      approaches: [
        {
          name: "Greedy (By End Time)",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(1)",
          explanation:
            "To minimize removals, we want to maximize the number of non-overlapping intervals. Sorting by end time allows us to always pick the interval that finishes earliest, leaving the most room for others.",
          code: "public int eraseOverlapIntervals(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n    int count = 0, end = Integer.MIN_VALUE;\n    for (int[] interval : intervals) {\n        if (interval[0] >= end) end = interval[1];\n        else count++;\n    }\n    return count;\n}",
        },
        {
          name: "Greedy (By Start Time)",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(1)",
          explanation:
            "Sort by start time. When an overlap occurs, greedily remove the interval that ends later to minimize the risk of future overlaps.",
          code: "// Sort by start, if overlap, remove the one with larger end time",
        },
      ],
    },
    {
      problem: "Meeting Rooms",
      link: "https://neetcode.io/solutions/meeting-rooms",
      approaches: [
        {
          name: "Sorting (Optimal)",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(1)",
          explanation:
            "Sort the meetings by start time. If any meeting starts before the previous meeting finishes, a conflict exists and the person cannot attend all meetings.",
          code: "public boolean canAttendMeetings(int[][] intervals) {\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    for (int i = 1; i < intervals.length; i++) {\n        if (intervals[i][0] < intervals[i-1][1]) return false;\n    }\n    return true;\n}",
        },
      ],
    },
    {
      problem: "Meeting Rooms II",
      link: "https://neetcode.io/solutions/meeting-rooms-ii",
      approaches: [
        {
          name: "Min-Heap (Optimal)",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
          explanation:
            "Sort by start time and use a min-heap to keep track of end times. The heap size represents the number of rooms currently in use. If a meeting starts after the earliest meeting ends, reuse that room (poll from heap).",
          code: "public int minMeetingRooms(int[][] intervals) {\n    if (intervals == null || intervals.length == 0) return 0;\n    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n    PriorityQueue<Integer> heap = new PriorityQueue<>();\n    for (int[] iv : intervals) {\n        if (!heap.isEmpty() && heap.peek() <= iv[0]) heap.poll();\n        heap.offer(iv[1]);\n    }\n    return heap.size();\n}",
        },
        {
          name: "Two Pointer / Chronological Order",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
          explanation:
            "Separate and sort start and end times. Iterate through start times; if a meeting starts before the earliest end time, we need a new room. Otherwise, a room freed up.",
          code: "// Separate arrays for starts and ends, use two pointers",
        },
      ],
    },
  ],
  "Day 16": [
    {
      problem: "Maximum Depth of Binary Tree",
      link: "https://neetcode.io/solutions/maximum-depth-of-binary-tree",
      approaches: [
        {
          name: "Recursive DFS (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(h)",
          explanation:
            "Use a post-order traversal logic. The depth of any node is 1 plus the maximum depth of its left and right subtrees. A null node represents a depth of 0.",
          code: "public int maxDepth(TreeNode root) {\n    if (root == null) return 0;\n    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}",
        },
      ],
    },
    {
      problem: "Invert / Flip Binary Tree",
      link: "https://neetcode.io/solutions/invert-binary-tree",
      approaches: [
        {
          name: "Recursive DFS (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(h)",
          explanation:
            "Traverse the tree depths down to the leaf nodes. At every parent node level, swap the left child reference and right child reference using a temporary variable placeholder.",
          code: "public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    \n    TreeNode left = invertTree(root.left);\n    TreeNode right = invertTree(root.right);\n    \n    root.left = right;\n    root.right = left;\n    return root;\n}",
        },
        {
          name: "Iterative BFS (Queue)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Use a Queue to process the tree layer by layer (Level Order Traversal). Pull a node out, swap its left and right child elements immediately, and push the children into the queue to repeat the process.",
          code: "public TreeNode invertTree(TreeNode root) {\n    if (root == null) return null;\n    Queue<TreeNode> queue = new LinkedList<>();\n    queue.add(root);\n    \n    while (!queue.isEmpty()) {\n        TreeNode curr = queue.poll();\n        \n        // Swap children\n        TreeNode temp = curr.left;\n        curr.left = curr.right;\n        curr.right = temp;\n        \n        if (curr.left != null) queue.add(curr.left);\n        if (curr.right != null) queue.add(curr.right);\n    }\n    return root;\n}",
        },
      ],
    },
    {
      problem: "Same Tree",
      link: "https://neetcode.io/solutions/same-tree",
      approaches: [
        {
          name: "Recursive DFS (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(h)",
          explanation:
            "Two trees are identical if the current nodes have the same value and their respective left and right subtrees are also identical. Handle null cases as base conditions.",
          code: "public boolean isSameTree(TreeNode p, TreeNode q) {\n    if (p == null && q == null) return true;\n    if (p == null || q == null) return false;\n    return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}",
        },
      ],
    },
  ],
  "Day 17": [
    {
      problem: "Symmetric Tree",
      link: "https://neetcode.io/solutions/symmetric-tree",
      approaches: [
        {
          name: "Recursive Mirror Validation",
          timeComplexity: "O(n)",
          spaceComplexity: "O(h)",
          explanation:
            "A tree is symmetric if its left and right subtrees are mirror images of each other. Recursively compare the left child's left subtree with the right child's right subtree, and the left child's right subtree with the right child's left subtree.",
          code: "public boolean isSymmetric(TreeNode root) {\n    if (root == null) return true;\n    return dfs(root.left, root.right);\n}\nprivate boolean dfs(TreeNode left, TreeNode right){\n    if(left == null && right == null) return true;\n    if(left == null || right == null || left.val != right.val) return false;\n    return dfs(left.left, right.right) && dfs(left.right, right.left);\n}",
        },
      ],
    },
    {
      problem: "Subtree of Another Tree",
      link: "https://neetcode.io/solutions/subtree-of-another-tree",
      approaches: [
        {
          name: "Recursive Comparison (Optimal)",
          timeComplexity: "O(m * n)",
          spaceComplexity: "O(m + n)",
          explanation:
            "Traverse the main tree. At each node, check if the subtree rooted there is identical to 'subRoot' using a helper function. The helper checks if values match and subtrees are identical.",
          code: "public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n    if (root == null) return false;\n    if (isSameTree(root, subRoot)) return true;\n    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n}\n\nprivate boolean isSameTree(TreeNode p, TreeNode q) {\n    if (p == null && q == null) return true;\n    if (p == null || q == null || p.val != q.val) return false;\n    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}",
        },
      ],
    },
    {
      problem: "Binary Tree Level Order Traversal",
      link: "https://neetcode.io/solutions/binary-tree-level-order-traversal",
      approaches: [
        {
          name: "BFS (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Use a queue to process nodes level by level. Use the queue size at the start of each iteration to process exactly one 'row' of the tree at a time.",
          code: "public List<List<Integer>> levelOrder(TreeNode root) {\n    List<List<Integer>> res = new ArrayList<>();\n    if (root == null) return res;\n    Queue<TreeNode> q = new LinkedList<>();\n    q.offer(root);\n    while (!q.isEmpty()) {\n        int size = q.size();\n        List<Integer> level = new ArrayList<>();\n        for (int i = 0; i < size; i++) {\n            TreeNode node = q.poll();\n            level.add(node.val);\n            if (node.left != null) q.offer(node.left);\n            if (node.right != null) q.offer(node.right);\n        }\n        res.add(level);\n    }\n    return res;\n}",
        },
      ],
    },
  ],
  "Day 18": [
    {
      problem: "Binary Tree Maximum Path Sum",
      link: "https://neetcode.io/solutions/binary-tree-maximum-path-sum",
      approaches: [
        {
          name: "Recursive DFS (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(h)",
          explanation:
            "For every node, calculate the maximum 'gain' it can contribute to a path. A path can 'split' at a node (using both children), which updates the global maximum, but it must return only the best single branch to its parent.",
          code: "int maxSum = Integer.MIN_VALUE;\npublic int maxPathSum(TreeNode root) {\n    dfs(root);\n    return maxSum;\n}\nprivate int dfs(TreeNode node) {\n    if (node == null) return 0;\n    int left = Math.max(0, dfs(node.left));\n    int right = Math.max(0, dfs(node.right));\n    maxSum = Math.max(maxSum, node.val + left + right);\n    return node.val + Math.max(left, right);\n}",
        },
      ],
    },
    {
      problem: "Serialize and Deserialize Binary Tree",
      link: "https://neetcode.io/solutions/serialize-and-deserialize-binary-tree",
      approaches: [
        {
          name: "Preorder Traversal (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Serialize by performing a preorder traversal, appending node values to a string and using a delimiter (like '#') for null nodes. Deserialize by splitting the string into a queue and rebuilding the tree recursively.",
          code: 'public String serialize(TreeNode root) {\n    if (root == null) return "#";\n    return root.val + "," + serialize(root.left) + "," + serialize(root.right);\n}\n\npublic TreeNode deserialize(String data) {\n    Queue<String> q = new LinkedList<>(Arrays.asList(data.split(",")));\n    return build(q);\n}\n\nprivate TreeNode build(Queue<String> q) {\n    String val = q.poll();\n    if (val.equals("#")) return null;\n    TreeNode node = new TreeNode(Integer.parseInt(val));\n    node.left = build(q);\n    node.right = build(q);\n    return node;\n}',
        },
      ],
    },
    {
      problem: "Construct Binary Tree from Preorder and Inorder Traversal",
      link: "https://neetcode.io/solutions/construct-binary-tree-from-preorder-and-inorder-traversal",
      approaches: [
        {
          name: "HashMap + Recursion (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "The first element in preorder is always the root. Find this root in the inorder array to determine the size of the left and right subtrees. Use a HashMap for O(1) index lookups in the inorder array.",
          code: "public TreeNode buildTree(int[] preorder, int[] inorder) {\n    Map<Integer, Integer> map = new HashMap<>();\n    for (int i = 0; i < inorder.length; i++) map.put(inorder[i], i);\n    return build(preorder, 0, preorder.length - 1, 0, inorder.length - 1, map);\n}\n\nprivate TreeNode build(int[] pre, int ps, int pe, int is, int ie, Map<Integer, Integer> map) {\n    if (ps > pe) return null;\n    TreeNode root = new TreeNode(pre[ps]);\n    int idx = map.get(pre[ps]);\n    int leftSize = idx - is;\n    root.left = build(pre, ps + 1, ps + leftSize, is, idx - 1, map);\n    root.right = build(pre, ps + leftSize + 1, pe, idx + 1, ie, map);\n    return root;\n}",
        },
      ],
    },
  ],
  "Day 19": [
    {
      problem: "Lowest Common Ancestor of BST",
      link: "https://neetcode.io/solutions/lowest-common-ancestor-of-a-binary-search-tree",
      approaches: [
        {
          name: "Iterative Split Tracking (Optimal)",
          timeComplexity: "O(h)",
          spaceComplexity: "O(1)",
          explanation:
            "Start at the root node. If both target nodes 'p' and 'q' have values greater than the current node, move to the right child. If both have values less than the current node, move to the left child. The moment they diverge (one is smaller, one is larger) or you hit one of the nodes, you have found the LCA.",
          code: "public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    TreeNode curr = root;\n    while (curr != null) {\n        if (p.val > curr.val && q.val > curr.val) {\n            curr = curr.right;\n        } else if (p.val < curr.val && q.val < curr.val) {\n            curr = curr.left;\n        } else {\n            return curr;\n        }\n    }\n    return null;\n}",
        },
        {
          name: "Recursive Binary Search Split",
          timeComplexity: "O(h)",
          spaceComplexity: "O(h)",
          explanation:
            "Apply the exact same BST split logic recursively. If both values are greater than root, return the result of recurring on the right subtree. If both are smaller, recur on the left subtree. Otherwise, the current root is the LCA split point.",
          code: "public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n    if (root == null) return null;\n    \n    if (p.val > root.val && q.val > root.val) {\n        return lowestCommonAncestor(root.right, p, q);\n    }\n    if (p.val < root.val && q.val < root.val) {\n        return lowestCommonAncestor(root.left, p, q);\n    }\n    \n    return root;\n}",
        },
      ],
    },
    {
      problem: "Validate Binary Search Tree",
      link: "https://neetcode.io/solutions/validate-binary-search-tree",
      approaches: [
        {
          name: "Recursive Range (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(h)",
          explanation:
            "A tree is a BST if every node's value is within a valid range (min, max). As you go left, update the max; as you go right, update the min.",
          code: "public boolean isValidBST(TreeNode root) {\n    return validate(root, null, null);\n}\n\nprivate boolean validate(TreeNode node, Integer min, Integer max) {\n    if (node == null) return true;\n    if ((min != null && node.val <= min) || (max != null && node.val >= max)) return false;\n    return validate(node.left, min, node.val) && validate(node.right, node.val, max);\n}",
        },
        {
          name: "Inorder Traversal",
          timeComplexity: "O(n)",
          spaceComplexity: "O(h)",
          explanation:
            "An inorder traversal of a BST must result in a strictly increasing sequence. Keep track of the 'prev' node value to verify this.",
          code: "// Use a Long or null check for the previous value to handle Integer.MIN_VALUE cases.",
        },
      ],
    },
    {
      problem: "Kth Smallest Element in a BST",
      link: "https://neetcode.io/solutions/kth-smallest-element-in-a-bst",
      approaches: [
        {
          name: "Iterative Inorder (Optimal)",
          timeComplexity: "O(h + k)",
          spaceComplexity: "O(h)",
          explanation:
            "Perform an iterative inorder traversal using a stack. Since inorder visits nodes in ascending order, the k-th node visited is the answer.",
          code: "public int kthSmallest(TreeNode root, int k) {\n    Deque<TreeNode> stack = new ArrayDeque<>();\n    TreeNode cur = root;\n    while (cur != null || !stack.isEmpty()) {\n        while (cur != null) {\n            stack.push(cur);\n            cur = cur.left;\n        }\n        cur = stack.pop();\n        if (--k == 0) return cur.val;\n        cur = cur.right;\n    }\n    return -1;\n}",
        },
      ],
    },
  ],
  "Day 20": [
    {
      problem: "Set Matrix Zeroes",
      link: "https://neetcode.io/solutions/set-matrix-zeroes",
      approaches: [
        {
          name: "First Row/Col as Markers (Optimal)",
          timeComplexity: "O(m * n)",
          spaceComplexity: "O(1)",
          explanation:
            "Use the first row and first column of the matrix itself to store whether that row/column should be zeroed. Use two variables to track if the first row/column originally had a zero.",
          code: "public void setZeroes(int[][] matrix) {\n    boolean firstRow = false, firstCol = false;\n    for (int j = 0; j < matrix[0].length; j++) if (matrix[0][j] == 0) firstRow = true;\n    for (int i = 0; i < matrix.length; i++) if (matrix[i][0] == 0) firstCol = true;\n    for (int i = 1; i < matrix.length; i++)\n        for (int j = 1; j < matrix[0].length; j++)\n            if (matrix[i][j] == 0) { matrix[i][0] = 0; matrix[0][j] = 0; }\n    for (int i = 1; i < matrix.length; i++)\n        for (int j = 1; j < matrix[0].length; j++)\n            if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;\n    if (firstRow) Arrays.fill(matrix[0], 0);\n    if (firstCol) for (int i = 0; i < matrix.length; i++) matrix[i][0] = 0;\n}",
        },
      ],
    },
    {
      problem: "Spiral Matrix",
      link: "https://neetcode.io/solutions/spiral-matrix",
      approaches: [
        {
          name: "Boundary Simulation (Optimal)",
          timeComplexity: "O(m * n)",
          spaceComplexity: "O(1)",
          explanation:
            "Maintain four boundaries (top, bottom, left, right). Traverse from left to right, top to bottom, right to left, and bottom to top, inward, shrinking the boundaries after each direction.",
          code: "public List<Integer> spiralOrder(int[][] matrix) {\n    List<Integer> res = new ArrayList<>();\n    int top=0, bottom=matrix.length-1, left=0, right=matrix[0].length-1;\n    while (top <= bottom && left <= right) {\n        for (int j = left; j <= right; j++) res.add(matrix[top][j]); top++;\n        for (int i = top; i <= bottom; i++) res.add(matrix[i][right]); right--;\n        if (top <= bottom) { for (int j = right; j >= left; j--) res.add(matrix[bottom][j]); bottom--; }\n        if (left <= right) { for (int i = bottom; i >= top; i--) res.add(matrix[i][left]); left++; }\n    }\n    return res;\n}",
        },
      ],
    },
    {
      problem: "Rotate Image",
      link: "https://neetcode.io/solutions/rotate-image",
      approaches: [
        {
          name: "Layer Rotation (Optimal)",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "Rotate the matrix in layers from the outermost to the innermost. Perform a four-way swap of elements for each group of four cells in the layer.",
          code: "public void rotate(int[][] matrix) {\n    int n = matrix.length;\n    for (int i = 0; i < n / 2; i++) {\n        for (int j = i; j < n - 1 - i; j++) {\n            int tmp = matrix[i][j];\n            matrix[i][j] = matrix[n-1-j][i];\n            matrix[n-1-j][i] = matrix[n-1-i][n-1-j];\n            matrix[n-1-i][n-1-j] = matrix[j][n-1-i];\n            matrix[j][n-1-i] = tmp;\n        }\n    }\n}",
        },
        {
          name: "Transpose and Reverse",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(1)",
          explanation:
            "First, transpose the matrix (swap matrix[i][j] with matrix[j][i]). Second, reverse each individual row.",
          code: "// Transpose then Reverse rows",
        },
      ],
    },
  ],
  "Day 21": [
    {
      problem: "Implement Trie (Prefix Tree)",
      link: "https://neetcode.io/solutions/implement-trie-prefix-tree",
      approaches: [
        {
          name: "TrieNode Array (Optimal)",
          timeComplexity: "O(m) per op",
          spaceComplexity: "O(N * M)",
          explanation:
            "Create a TrieNode class containing an array of 26 references and a boolean 'isEnd'. For 'insert' and 'search', traverse the character path. 'startsWith' is identical to search but doesn't require the 'isEnd' flag to be true.",
          code: "class Trie {\n    private TrieNode root = new TrieNode();\n    public void insert(String word) {\n        TrieNode cur = root;\n        for (char c : word.toCharArray()) {\n            if (cur.children[c-'a'] == null) cur.children[c-'a'] = new TrieNode();\n            cur = cur.children[c-'a'];\n        }\n        cur.isEnd = true;\n    }\n    public boolean search(String word) {\n        TrieNode cur = find(word);\n        return cur != null && cur.isEnd;\n    }\n    public boolean startsWith(String prefix) {\n        return find(prefix) != null;\n    }\n    private TrieNode find(String s) {\n        TrieNode cur = root;\n        for (char c : s.toCharArray()) {\n            if (cur.children[c-'a'] == null) return null;\n            cur = cur.children[c-'a'];\n        }\n        return cur;\n    }\n    static class TrieNode { TrieNode[] children = new TrieNode[26]; boolean isEnd; }\n}",
        },
      ],
    },
    {
      problem: "Add and Search Word",
      link: "https://neetcode.io/solutions/design-add-and-search-words-data-structure",
      approaches: [
        {
          name: "Trie with Backtracking DFS (Optimal)",
          timeComplexity:
            "O(M) for addWord, O(N) for search (O(26^N) in worst case with wildcards)",
          spaceComplexity:
            "O(M * L) where M is the number of words and L is word length",
          explanation:
            "Implement a standard Trie structure where each node contains an array of 26 child references and a boolean flag indicating the end of a word. For regular lookups, follow character paths iteratively. When encountering a '.' wildcard, switch to a recursive depth-first search (DFS) that checks all non-null children of the current node to see if any child path matches the remainder of the string.",
          code: "class WordDictionary {\n    private class TrieNode {\n        TrieNode[] children = new TrieNode[26];\n        boolean isEndOfWord = false;\n    }\n    \n    private TrieNode root;\n\n    public WordDictionary() {\n        root = new TrieNode();\n    }\n    \n    public void addWord(String word) {\n        TrieNode curr = root;\n        for (char ch : word.toCharArray()) {\n            if (curr.children[ch - 'a'] == null) {\n                curr.children[ch - 'a'] = new TrieNode();\n            }\n            curr = curr.children[ch - 'a'];\n        }\n        curr.isEndOfWord = true;\n    }\n    \n    public boolean search(String word) {\n        return dfs(word, 0, root);\n    }\n    \n    private boolean dfs(String word, int index, TrieNode curr) {\n        if (curr == null) return false;\n        if (index == word.length()) return curr.isEndOfWord;\n        \n        char ch = word.charAt(index);\n        if (ch == '.') {\n            for (TrieNode child : curr.children) {\n                if (child != null && dfs(word, index + 1, child)) {\n                    return true;\n                }\n            }\n            return false;\n        } else {\n            return dfs(word, index + 1, curr.children[ch - 'a']);\n        }\n    }\n}",
        },
        {
          name: "HashMap Grouping by Word Length (Alternative)",
          timeComplexity:
            "O(M) for addWord, O(W * N) for search where W is total words of the same length",
          spaceComplexity:
            "O(M * L) total characters saved in heap memory arrays",
          explanation:
            "Group words inside a HashMap where the key is the string length and the value is a list of words of that specific size. When searching for a word with wildcards, skip deep prefix trees entirely; map straight to the bucket matching its string length, and perform character-by-character regex-style inspections across those subset items.",
          code: "class WordDictionary {\n    private Map<Integer, List<String>> map;\n\n    public WordDictionary() {\n        map = new HashMap<>();\n    }\n    \n    public void addWord(String word) {\n        int len = word.length();\n        map.putIfAbsent(len, new ArrayList<>());\n        map.get(len).add(word);\n    }\n    \n    public boolean search(String word) {\n        int len = word.length();\n        if (!map.containsKey(len)) return false;\n        \n        for (String w : map.get(len)) {\n            if (match(word, w)) return true;\n        }\n        return false;\n    }\n    \n    private boolean match(String pattern, String word) {\n        for (int i = 0; i < pattern.length(); i++) {\n            char pChar = pattern.charAt(i);\n            if (pChar != '.' && pChar != word.charAt(i)) {\n                return false;\n            }\n        }\n        return true;\n    }\n}",
        },
      ],
    },
    {
      problem: "Word Search",
      link: "https://neetcode.io/solutions/word-search",
      approaches: [
        {
          name: "Backtracking (Optimal)",
          timeComplexity: "O(m * n * 4^L)",
          spaceComplexity: "O(L)",
          explanation:
            "Run a DFS from every cell that matches the first letter of the word. Mark the current cell as visited (e.g., '#') to avoid reuse, and explore all 4 neighbors. Unmark the cell (backtrack) after exploring.",
          code: "public boolean exist(char[][] board, String word) {\n    for (int i = 0; i < board.length; i++)\n        for (int j = 0; j < board[0].length; j++)\n            if (dfs(board, word, i, j, 0)) return true;\n    return false;\n}\nprivate boolean dfs(char[][] b, String w, int i, int j, int k) {\n    if (k == w.length()) return true;\n    if (i<0||i>=b.length||j<0||j>=b[0].length||b[i][j]!=w.charAt(k)) return false;\n    char tmp = b[i][j]; b[i][j] = '#';\n    boolean found = dfs(b,w,i+1,j,k+1)||dfs(b,w,i-1,j,k+1)||dfs(b,w,i,j+1,k+1)||dfs(b,w,i,j-1,k+1);\n    b[i][j] = tmp;\n    return found;\n}",
        },
      ],
    },
  ],
  "Day 22": [
    {
      problem: "Top K Frequent Elements",
      link: "https://neetcode.io/solutions/top-k-frequent-elements",
      approaches: [
        {
          name: "Heap (Priority Queue)",
          timeComplexity: "O(n log k)",
          spaceComplexity: "O(n)",
          explanation:
            "Count frequencies using a HashMap. Use a Min-Heap of size K to keep track of the most frequent elements. If the heap exceeds size K, remove the element with the lowest frequency.",
          code: "public int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int n : nums) freq.merge(n, 1, Integer::sum);\n    PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> freq.get(a) - freq.get(b));\n    for (int n : freq.keySet()) {\n        pq.offer(n);\n        if (pq.size() > k) pq.poll();\n    }\n    int[] res = new int[k];\n    for (int i = k - 1; i >= 0; i--) res[i] = pq.poll();\n    return res;\n}",
        },
        {
          name: "Bucket Sort (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Count frequencies. Create an array of lists where the index represents the frequency. Populate the 'buckets' and iterate backwards from the highest frequency to pick K elements.",
          code: "",
        },
      ],
    },
    {
      problem: "Find Median from Data Stream",
      link: "https://leetcode.com/problems/find-median-from-data-stream/",
      approaches: [
        {
          name: "Two Heaps - Min & Max Heap (Optimal)",
          timeComplexity: "O(log n) for addNum, O(1) for findMedian",
          spaceComplexity: "O(n) to store all stream elements",
          explanation:
            "Maintain two priority queues: a max-heap ('small') for the lower half of numbers and a min-heap ('large') for the upper half. Every time you add a number, push it to 'small', then pass the largest value of 'small' over to 'large' to keep them ordered. If 'large' ends up with more elements than 'small', move one back. This keeps their sizes balanced so that finding the median is a direct O(1) look at their roots.",
          code: "class MedianFinder {\n    private PriorityQueue<Integer> small; // Max-heap for lower half\n    private PriorityQueue<Integer> large; // Min-heap for upper half\n\n    public MedianFinder() {\n        // Max-heap initialized with a reverse order comparator\n        small = new PriorityQueue<>((a, b) -> b - a);\n        large = new PriorityQueue<>();\n    }\n    \n    public void addNum(int num) {\n        small.add(num);\n        \n        // Balance step 1: Ensure every element in small <= every element in large\n        large.add(small.poll());\n        \n        // Balance step 2: Keep sizes equal or let 'small' hold 1 extra element\n        if (small.size() < large.size()) {\n            small.add(large.poll());\n        }\n    }\n    \n    public double findMedian() {\n        if (small.size() > large.size()) {\n            return small.peek();\n        }\n        return (small.peek() + large.peek()) / 2.0;\n    }\n}",
        },
        {
          name: "TreeMap Element Balancing (Alternative)",
          timeComplexity: "O(log n) for addNum, O(log n) for findMedian",
          spaceComplexity: "O(n) unique entries and frequency trackers",
          explanation:
            "Utilize a self-balancing binary search tree (implemented via Java's TreeMap) to manage ordered numbers alongside an explicit frequency map tracker. Simulate tracking down indices inside the sorted map by keeping a running counter of values to locate the exact median element offsets without a linear array scan.",
          code: "class MedianFinder {\n    private TreeMap<Integer, Integer> map = new TreeMap<>();\n    private int totalSize = 0;\n    \n    public void addNum(int num) {\n        map.put(num, map.getOrDefault(num, 0) + 1);\n        totalSize++;\n    }\n    \n    public double findMedian() {\n        int mid1 = (totalSize - 1) / 2;\n        int mid2 = totalSize / 2;\n        \n        int val1 = getValueAtIndex(mid1);\n        int val2 = (mid1 == mid2) ? val1 : getValueAtIndex(mid2);\n        \n        return (val1 + val2) / 2.0;\n    }\n    \n    private int getValueAtIndex(int targetIndex) {\n        int currentCount = 0;\n        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {\n            currentCount += entry.getValue();\n            if (currentCount > targetIndex) {\n                return entry.getKey();\n            }\n        }\n        return 0;\n    }\n}",
        },
      ],
    },
    {
      problem: "Kth Largest Element in an Array",
      link: "https://neetcode.io/solutions/kth-largest-element-in-an-array",
      approaches: [
        {
          name: "Sorting",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(n)",
          explanation: "sort the data",
          code: "  Arrays.sort(nums) return nums[nums.length - k];",
        },
      ],
    },
  ],
  "Day 23": [
    {
      problem: "Task Scheduler",
      link: "https://neetcode.io/solutions/task-scheduler",
      approaches: [
        {
          name: "Greedy / Math (Optimal)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation:
            "Count the frequencies of each task. Find the maximum frequency (maxFreq) and count how many tasks share this maximum frequency (maxCount). The minimum time required is determined by the formula: (maxFreq - 1) * (n + 1) + maxCount. If the total number of tasks is larger than this formula result (due to filling idle slots completely), return the length of the tasks array.",
          code: "public int leastInterval(char[] tasks, int n) {\n    int[] frequencies = new int[26];\n    for (char t : tasks) {\n        frequencies[t - 'A']++;\n    }\n    \n    int maxFreq = 0;\n    for (int f : frequencies) {\n        maxFreq = Math.max(maxFreq, f);\n    }\n    \n    int maxCount = 0;\n    for (int f : frequencies) {\n        if (f == maxFreq) {\n            maxCount++;\n        }\n    }\n    \n    int ans = (maxFreq - 1) * (n + 1) + maxCount;\n    return Math.max(ans, tasks.length);\n}",
        },
        {
          name: "Max-Heap / Priority Queue",
          timeComplexity: "O(N * log K)",
          spaceComplexity: "O(K)",
          explanation:
            "Use a Max-Heap to track task frequencies. In each cycle of size n + 1, pull the highest frequency tasks out, decrement their counts, and track them temporarily. Push them back into the heap if they still have remaining cycles left once the interval cool-down clears.",
          code: "public int leastInterval(char[] tasks, int n) {\n    int[] count = new int[26];\n    for (char c : tasks) count[c - 'A']++;\n    \n    PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());\n    for (int f : count) if (f > 0) maxHeap.add(f);\n    \n    int time = 0;\n    while (!maxHeap.isEmpty()) {\n        List<Integer> temp = new ArrayList<>();\n        for (int i = 0; i <= n; i++) {\n            if (!maxHeap.isEmpty()) {\n                temp.add(maxHeap.poll() - 1);\n            }\n        }\n        for (int remain : temp) {\n            if (remain > 0) maxHeap.add(remain);\n        }\n        time += maxHeap.isEmpty() ? temp.size() : n + 1;\n    }\n    return time;\n}",
        },
      ],
    },
    {
      problem: "Reorganize String",
      link: "https://neetcode.io/solutions/reorganize-string",
      approaches: [
        {
          name: "Max-Heap / Priority Queue (Optimal)",
          timeComplexity: "O(N * log K)",
          spaceComplexity: "O(K)",
          explanation:
            "Count character frequencies and push them into a Max-Heap based on occurrence counts. Pop the most frequent character to append to the result string. To prevent adjacent duplicates, keep the previously used character aside and only re-insert it back into the heap during the *next* cycle when another character has stepped in between.",
          code: "public String reorganizeString(String s) {\n    int[] counts = new int[26];\n    for (char c : s.toCharArray()) counts[c - 'a']++;\n    \n    PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> Integer.compare(b[1], a[1]));\n    for (int i = 0; i < 26; i++) {\n        if (counts[i] > 0) {\n            if (counts[i] > (s.length() + 1) / 2) return \"\";\n            maxHeap.add(new int[]{i + 'a', counts[i]});\n        }\n    }\n    \n    StringBuilder sb = new StringBuilder();\n    int[] prev = null;\n    \n    while (!maxHeap.isEmpty()) {\n        int[] curr = maxHeap.poll();\n        sb.append((char) curr[0]);\n        curr[1]--;\n        \n        if (prev != null) {\n            maxHeap.add(prev);\n            prev = null;\n        }\n        \n        if (curr[1] > 0) {\n            prev = curr;\n        }\n    }\n    return sb.toString();\n}",
        },
      ],
    },

    {
      problem: "Merge K Sorted Lists",
      link: "https://neetcode.io/solutions/merge-k-sorted-lists",
      approaches: [
        {
          name: "Min-Heap (Optimal)",
          timeComplexity: "O(n log k)",
          spaceComplexity: "O(k)",
          explanation:
            "Add the head of every list to a Min-Heap. Repeatedly poll the smallest element and, if the polled node has a next node, add that next node to the heap.",
          code: "public ListNode mergeKLists(ListNode[] lists) {\n    PriorityQueue<ListNode> pq = new PriorityQueue<>((a,b) -> a.val - b.val);\n    for (ListNode l : lists) if (l != null) pq.offer(l);\n    ListNode dummy = new ListNode(0), cur = dummy;\n    while (!pq.isEmpty()) {\n        cur.next = pq.poll();\n        cur = cur.next;\n        if (cur.next != null) pq.offer(cur.next);\n    }\n    return dummy.next;\n}",
        },
        {
          name: "Divide and Conquer",
          timeComplexity: "O(n log k)",
          spaceComplexity: "O(1)",
          explanation:
            "Pair up the k lists and merge each pair using the 'Merge Two Sorted Lists' logic. Repeat until only one merged list remains.",
          code: "",
        },
      ],
    },
  ],
  "Day 24": [
    {
      problem: "Jump Game",
      link: "https://neetcode.io/solutions/jump-game",
      approaches: [
        {
          name: "Greedy (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Keep track of the 'farthest' index reachable. If at any point the current index is greater than the farthest reach, return false. If the farthest reach meets or exceeds the last index, return true.",
          code: "public boolean canJump(int[] nums) {\n    int maxReach = 0;\n    for (int i = 0; i < nums.length; i++) {\n        if (i > maxReach) return false;\n        maxReach = Math.max(maxReach, i + nums[i]);\n    }\n    return true;\n}",
        },
        {
          name: "Backward Greedy",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Start from the goal and move the 'goal post' left. If the current position can reach the goal post, the current position becomes the new goal post.",
          code: "int goal = nums.length - 1;\nfor (int i = nums.length - 1; i >= 0; i--) {\n    if (i + nums[i] >= goal) goal = i;\n}\nreturn goal == 0;",
        },
      ],
    },
    {
      problem: "Jump Game II",
      link: "https://neetcode.io/solutions/jump-game-ii",
      approaches: [
        {
          name: "Greedy / BFS (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Maintain a window (defined by 'left' and 'right' pointers) representing the range of indices reachable with the current number of jumps. For each jump level, calculate the farthest position reachable from any index within the current window. Once the end of the current jump window is reached, increment the jump count and shift the window to start from 'right + 1' up to the new 'farthest' point.",
          code: "public int jump(int[] nums) {\n    int jumps = 0;\n    int left = 0, right = 0;\n    \n    while (right < nums.length - 1) {\n        int farthest = 0;\n        for (int i = left; i <= right; i++) {\n            farthest = Math.max(farthest, i + nums[i]);\n        }\n        left = right + 1;\n        right = farthest;\n        jumps++;\n    }\n    return jumps;\n}",
        },
        {
          name: "Single Pass Loop",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Iterate through the array while maintaining the farthest index reachable so far. Track the boundary of the current jump using an 'end' pointer. Every time the loop index reaches this 'end' boundary, it means a jump must be made to advance. Increment the jump counter and update 'end' to match the farthest reach found.",
          code: "public int jump(int[] nums) {\n    int jumps = 0, farthest = 0, end = 0;\n    \n    for (int i = 0; i < nums.length - 1; i++) {\n        farthest = Math.max(farthest, i + nums[i]);\n        if (i == end) {\n            jumps++;\n            end = farthest;\n        }\n    }\n    return jumps;\n}",
        },
      ],
    },
    {
      problem: "Gas Station",
      link: "https://neetcode.io/solutions/gas-station",
      approaches: [
        {
          name: "Greedy (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "First, check if a global solution is possible by verifying if the sum of all gas is greater than or equal to the sum of all costs. If it is, a valid starting point is guaranteed to exist. Traverse the stations while maintaining a running 'totalTank' balance. If the balance drops below 0 at any station, it means it's impossible to start from or pass through the previous indices. Reset the balance to 0 and set the next station as the new candidate starting point.",
          code: "public int canCompleteCircuit(int[] gas, int[] cost) {\n    int totalGas = 0, totalCost = 0;\n    for (int i = 0; i < gas.length; i++) {\n        totalGas += gas[i];\n        totalCost += cost[i];\n    }\n    if (totalGas < totalCost) return -1;\n\n    int totalTank = 0;\n    int startPosition = 0;\n    for (int i = 0; i < gas.length; i++) {\n        totalTank += gas[i] - cost[i];\n        if (totalTank < 0) {\n            totalTank = 0;\n            startPosition = i + 1;\n        }\n    }\n    return startPosition;\n}",
        },
        {
          name: "Single-Pass Optimization",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Track both the total net balance of the entire trip and the current tank balance in a single loop. If the current tank falls below zero, reset it and set the starting position to the next station. At the end of the array, if the overall net balance across the entire circuit is negative, return -1; otherwise, return the recorded starting position.",
          code: "public int canCompleteCircuit(int[] gas, int[] cost) {\n    int totalNet = 0;\n    int currentTank = 0;\n    int start = 0;\n    \n    for (int i = 0; i < gas.length; i++) {\n        int netChange = gas[i] - cost[i];\n        totalNet += netChange;\n        currentTank += netChange;\n        \n        if (currentTank < 0) {\n            currentTank = 0;\n            start = i + 1;\n        }\n    }\n    return totalNet >= 0 ? start : -1;\n}",
        },
      ],
    },
  ],
  "Day 25": [
    {
      problem: "Hand of Straights",
      link: "https://neetcode.io/solutions/hand-of-straights",
      approaches: [
        {
          name: "TreeMap / Sorted Map (Optimal)",
          timeComplexity: "O(N * log N)",
          spaceComplexity: "O(N)",
          explanation:
            "Count frequencies of each card using a sorted map (TreeMap) or by sorting the unique keys. Start with the smallest available card card and check if the next groupSize - 1 consecutive cards are available. Decrement their counts in the map. If any consecutive card is missing or runs out of count early, return false.",
          code: "public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    \n    TreeMap<Integer, Integer> countMap = new TreeMap<>();\n    for (int card : hand) {\n        countMap.put(card, countMap.getOrDefault(card, 0) + 1);\n    }\n    \n    while (!countMap.isEmpty()) {\n        int first = countMap.firstKey();\n        for (int i = 0; i < groupSize; i++) {\n            int currentCard = first + i;\n            if (!countMap.containsKey(currentCard)) return false;\n            \n            int count = countMap.get(currentCard);\n            if (count == 1) {\n                countMap.remove(currentCard);\n            } else {\n                countMap.put(currentCard, count - 1);\n            }\n        }\n    }\n    return true;\n}",
        },
        {
          name: "HashMap + Minimum Heap",
          timeComplexity: "O(N * log N)",
          spaceComplexity: "O(N)",
          explanation:
            "Store card frequencies in a standard HashMap, and push all unique cards into a Minimum Heap. Always pop the smallest element from the heap to serve as the start of a consecutive group, and verify if the next elements up to groupSize exist in the HashMap.",
          code: "public boolean isNStraightHand(int[] hand, int groupSize) {\n    if (hand.length % groupSize != 0) return false;\n    \n    Map<Integer, Integer> count = new HashMap<>();\n    for (int card : hand) count.put(card, count.getOrDefault(card, 0) + 1);\n    \n    PriorityQueue<Integer> minHeap = new PriorityQueue<>();\n    for (int card : count.keySet()) minHeap.add(card);\n    \n    while (!minHeap.isEmpty()) {\n        int first = minHeap.peek();\n        for (int i = first; i < first + groupSize; i++) {\n            if (!count.containsKey(i)) return false;\n            count.put(i, count.get(i) - 1);\n            if (count.get(i) == 0) {\n                if (i != minHeap.peek()) return false;\n                minHeap.poll();\n            }\n        }\n    }\n    return true;\n}",
        },
      ],
    },

    {
      problem: "Partition Labels",
      link: "https://neetcode.io/solutions/partition-labels",
      approaches: [
        {
          name: "Greedy (Optimal)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation:
            "First, scan the string to record the last occurrence index of every character. Then, loop through the string again while tracking a running window. Update the end of the current partition window to be the maximum of the current end index and the last seen location of the current character. When the loop counter reaches the tracked end index, a complete partition is found. Record its length and reset the start tracker for the next partition.",
          code: "public List<Integer> partitionLabels(String s) {\n    int[] lastIndices = new int[26];\n    for (int i = 0; i < s.length(); i++) {\n        lastIndices[s.charAt(i) - 'a'] = i;\n    }\n    \n    List<Integer> result = new ArrayList<>();\n    int start = 0, end = 0;\n    \n    for (int i = 0; i < s.length(); i++) {\n        end = Math.max(end, lastIndices[s.charAt(i) - 'a']);\n        if (i == end) {\n            result.add(end - start + 1);\n            start = i + 1;\n        }\n    }\n    return result;\n}",
        },
      ],
    },
    {
      problem: "Valid Parenthesis String",
      link: "https://neetcode.io/solutions/valid-parenthesis-string",
      approaches: [
        {
          name: "Greedy Range Tracking (Optimal)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(1)",
          explanation:
            "Maintain a range of possible open parenthesis counts, tracking the minimum ('leftMin') and maximum ('leftMax') possible open brackets left unmatched. When encountering '(', both limits increase. For ')', both limits decrease. For '*', since it can act as anything, it broadens the range ('leftMin' decreases, 'leftMax' increases). If 'leftMax' drops below 0 at any point, there are too many closing brackets, so return false. If 'leftMin' drops below 0, reset it to 0 because we cannot have a negative count of open brackets. A valid string must finish with a 'leftMin' of 0.",
          code: "public boolean checkValidString(String s) {\n    int leftMin = 0, leftMax = 0;\n    \n    for (int i = 0; i < s.length(); i++) {\n        char c = s.charAt(i);\n        if (c == '(') {\n            leftMin++;\n            leftMax++;\n        } else if (c == ')') {\n            leftMin--;\n            leftMax--;\n        } else {\n            leftMin--;\n            leftMax++;\n        }\n        if (leftMax < 0) return false;\n        if (leftMin < 0) leftMin = 0;\n    }\n    \n    return leftMin == 0;\n}",
        },
        {
          name: "Two Stacks (Indices Tracking)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation:
            "Use two separate stacks to store the indices of open parenthesis characters and asterisks respectively. When encountering a ')', prioritize popping from the open parenthesis stack; if empty, pop from the asterisk stack. If both are empty, the string is invalid. At the end, match any remaining open parenthesis with remaining asterisks, ensuring each asterisk index is greater than the open parenthesis index it is trying to close.",
          code: "public boolean checkValidString(String s) {\n    Stack<Integer> openStack = new Stack<>();\n    Stack<Integer> starStack = new Stack<>();\n    \n    for (int i = 0; i < s.length(); i++) {\n        char c = s.charAt(i);\n        if (c == '(') openStack.push(i);\n        else if (c == '*') starStack.push(i);\n        else {\n            if (!openStack.isEmpty()) openStack.pop();\n            else if (!starStack.isEmpty()) starStack.pop();\n            else return false;\n        }\n    }\n    \n    while (!openStack.isEmpty() && !starStack.isEmpty()) {\n        if (openStack.pop() > starStack.pop()) return false;\n    }\n    \n    return openStack.isEmpty();\n}",
        },
      ],
    },
  ],
  "Day 26": [
    {
      problem: "Number of Islands",
      link: "https://neetcode.io/solutions/number-of-islands",
      approaches: [
        {
          name: "DFS (Optimal)",
          timeComplexity: "O(m * n)",
          spaceComplexity: "O(m * n)",
          explanation:
            "Iterate through the grid. When a '1' is found, increment the count and use DFS to sink the entire island (turn '1's to '0's) to avoid re-counting.",
          code: "public int numIslands(char[][] grid) {\n    int count = 0;\n    for (int i = 0; i < grid.length; i++) {\n        for (int j = 0; j < grid[0].length; j++) {\n            if (grid[i][j] == '1') { dfs(grid, i, j); count++; }\n        }\n    }\n    return count;\n}\n\nprivate void dfs(char[][] g, int i, int j) {\n    if (i < 0 || i >= g.length || j < 0 || j >= g[0].length || g[i][j] != '1') return;\n    g[i][j] = '0';\n    dfs(g, i + 1, j); dfs(g, i - 1, j); dfs(g, i, j + 1); dfs(g, i, j - 1);\n}",
        },
        {
          name: "BFS",
          timeComplexity: "O(m * n)",
          spaceComplexity: "O(min(m, n))",
          explanation:
            "Similar to DFS, but use a Queue to visit all connected land cells level by level.",
          code: "// Use a Queue<int[]> to process neighbors level by level",
        },
      ],
    },
    {
      problem: "Clone Graph",
      link: "https://neetcode.io/solutions/clone-graph",
      approaches: [
        {
          name: "DFS with HashMap (Optimal)",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          explanation:
            "Use a HashMap to map original nodes to their clones. Perform a DFS; if a node is already in the map, return the clone. Otherwise, create a clone, store it, and recursively clone its neighbors.",
          code: "private Map<Node, Node> map = new HashMap<>();\npublic Node cloneGraph(Node node) {\n    if (node == null) return null;\n    if (map.containsKey(node)) return map.get(node);\n    Node clone = new Node(node.val);\n    map.put(node, clone);\n    for (Node neighbor : node.neighbors) {\n        clone.neighbors.add(cloneGraph(neighbor));\n    }\n    return clone;\n}",
        },
      ],
    },
    {
      problem: "Max Area of Island",
      link: "https://neetcode.io/solutions/max-area-of-island",
      approaches: [
        {
          name: "Depth-First Search / DFS (Optimal)",
          timeComplexity: "O(R * C)",
          spaceComplexity: "O(R * C)",
          explanation:
            "Iterate through every cell in the grid. When a cell containing '1' is found, trigger a recursive Depth-First Search (DFS) to explore the entire island. To prevent infinite loops and avoid counting the same land cells twice, sink the visited land by flipping '1's to '0's (or track them in a visited set). The DFS function returns the sum of 1 (for the current cell) plus the area returned by the recursive calls in all 4 cardinal directions. Track and update the maximum area encountered.",
          code: "private int ROWS, COLS;\n\npublic int maxAreaOfIsland(int[][] grid) {\n    ROWS = grid.length;\n    COLS = grid[0].length;\n    int maxArea = 0;\n    \n    for (int r = 0; r < ROWS; r++) {\n        for (int c = 0; c < COLS; c++) {\n            if (grid[r][c] == 1) {\n                maxArea = Math.max(maxArea, dfs(grid, r, c));\n            }\n        }\n    }\n    return maxArea;\n}\n\nprivate int dfs(int[][] grid, int r, int c) {\n    if (r < 0 || r >= ROWS || c < 0 || c >= COLS || grid[r][c] == 0) {\n        return 0;\n    }\n    \n    grid[r][c] = 0; // Mark as visited by sinking the island cell\n    \n    return (1 + dfs(grid, r + 1, c) +\n                dfs(grid, r - 1, c) +\n                dfs(grid, r, c + 1) +\n                dfs(grid, r, c - 1));\n}",
        },
        {
          name: "Breadth-First Search / BFS",
          timeComplexity: "O(R * C)",
          spaceComplexity: "O(min(R, C))",
          explanation:
            "Similar to the DFS approach, traverse the grid until you encounter an unvisited land cell ('1'). Instead of using recursion, use an explicit Queue to discover the island iteratively. Pop a cell off the queue, look at its 4 horizontal and vertical neighbors, increment your local area counter for every valid neighbor found, flip it to '0' to mark it visited, and push it into the queue to process next.",
          code: "public int maxAreaOfIsland(int[][] grid) {\n    int rows = grid.length, cols = grid[0].length;\n    int maxArea = 0;\n    int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n    \n    for (int r = 0; r < rows; r++) {\n        for (int c = 0; c < cols; c++) {\n            if (grid[r][c] == 1) {\n                int currentArea = 0;\n                Queue<int[]> queue = new LinkedList<>();\n                queue.offer(new int[]{r, c});\n                grid[r][c] = 0;\n                \n                while (!queue.isEmpty()) {\n                    int[] cell = queue.poll();\n                    currentArea++;\n                    \n                    for (int[] dir : directions) {\n                        int nr = cell[0] + dir[0];\n                        int nc = cell[1] + dir[1];\n                        \n                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {\n                            queue.offer(new int[]{nr, nc});\n                            grid[nr][nc] = 0; \n                        }\n                    }\n                }\n                maxArea = Math.max(maxArea, currentArea);\n            }\n        }\n    }\n    return maxArea;\n}",
        },
      ],
    },
  ],
  "Day 27": [
    {
      problem: "Course Schedule",
      link: "https://neetcode.io/solutions/course-schedule",
      approaches: [
        {
          name: "Topological Sort / Kahn's Algorithm",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V + E)",
          explanation:
            "Represent courses as a directed graph. Calculate the in-degree of each node. Use a Queue to process nodes with 0 in-degree. If we process all nodes, no cycle exists.",
          code: "public boolean canFinish(int numCourses, int[][] prerequisites) {\n    int[] inDegree = new int[numCourses];\n    List<List<Integer>> adj = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n    for (int[] p : prerequisites) {\n        adj.get(p[1]).add(p[0]);\n        inDegree[p[0]]++;\n    }\n    Queue<Integer> q = new LinkedList<>();\n    for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.add(i);\n    int count = 0;\n    while (!q.isEmpty()) {\n        int curr = q.poll(); count++;\n        for (int next : adj.get(curr)) {\n            if (--inDegree[next] == 0) q.add(next);\n        }\n    }\n    return count == numCourses;\n}",
        },
      ],
    },
    {
      problem: "Course Schedule II",
      link: "https://neetcode.io/solutions/course-schedule-ii",
      approaches: [
        {
          name: "Topological Sort / DFS (Optimal)",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V + E)",
          explanation:
            "Build an adjacency list to represent the graph. Use an array or set to track the state of each node during a Depth-First Search (0 = unvisited, 1 = visiting, 2 = visited). If you encounter a node currently in the 'visiting' state (1), a cycle exists, making it impossible to complete all courses—so return an empty array. If no cycle is found, add the course to the output list after completely visiting all its neighbors. Reverse the final list (or build it backwards) to get the correct chronological order.",
          code: "private boolean hasCycle;\n\npublic int[] findOrder(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> adj = new ArrayList<>();\n    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n    for (int[] pre : prerequisites) {\n        adj.get(pre[1]).add(pre[0]);\n    }\n    \n    int[] visited = new int[numCourses]; // 0: unvisited, 1: visiting, 2: visited\n    List<Integer> order = new ArrayList<>();\n    hasCycle = false;\n    \n    for (int i = 0; i < numCourses; i++) {\n        if (visited[i] == 0) {\n            dfs(i, adj, visited, order);\n        }\n        if (hasCycle) return new int[0];\n    }\n    \n    int[] result = new int[numCourses];\n    for (int i = 0; i < numCourses; i++) {\n        result[i] = order.get(numCourses - 1 - i);\n    }\n    return result;\n}\n\nprivate void dfs(int node, List<List<Integer>> adj, int[] visited, List<Integer> order) {\n    if (hasCycle) return;\n    visited[node] = 1; // Mark as visiting\n    \n    for (int neighbor : adj.get(node)) {\n        if (visited[neighbor] == 1) {\n            hasCycle = true;\n            return;\n        } else if (visited[neighbor] == 0) {\n            dfs(neighbor, adj, visited, order);\n        }\n    }\n    \n    visited[node] = 2; // Mark as fully visited\n    order.add(node);\n}",
        },
        {
          name: "Kahn's Algorithm / BFS (Indegree)",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V + E)",
          explanation:
            "Track the total incoming edges ('indegree') for each course. Add all courses with an indegree of 0 (no prerequisites remaining) to a Queue. Process elements from the queue iteratively, appending each popped course directly to the final results array. For each course processed, decrement the indegree count of its dependent neighbors. If a neighbor's indegree reaches 0, push it into the queue. If the final array length doesn't equal total courses, a dependency loop exists.",
          code: "public int[] findOrder(int numCourses, int[][] prerequisites) {\n    List<List<Integer>> adj = new ArrayList<>();\n    int[] indegree = new int[numCourses];\n    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n    \n    for (int[] pre : prerequisites) {\n        adj.get(pre[1]).add(pre[0]);\n        indegree[pre[0]]++;\n    }\n    \n    Queue<Integer> queue = new LinkedList<>();\n    for (int i = 0; i < numCourses; i++) {\n        if (indegree[i] == 0) queue.offer(i);\n    }\n    \n    int[] order = new int[numCourses];\n    int index = 0;\n    \n    while (!queue.isEmpty()) {\n        int curr = queue.poll();\n        order[index++] = curr;\n        \n        for (int neighbor : adj.get(curr)) {\n            indegree[neighbor]--;\n            if (indegree[neighbor] == 0) {\n                queue.offer(neighbor);\n            }\n        }\n    }\n    \n    return index == numCourses ? order : new int[0];\n}",
        },
      ],
    },
    {
      problem: "Graph Valid Tree",
      link: "https://neetcode.io/solutions/graph-valid-tree",
      approaches: [
        {
          name: "BFS / DFS (Optimal)",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V + E)",
          explanation:
            "A tree is a graph with no cycles and exactly one connected component. First, check if edges == n - 1. Then use BFS/DFS starting from node 0 to see if you can reach all n nodes.",
          code: "public boolean validTree(int n, int[][] edges) {\n    if (edges.length != n - 1) return false;\n    List<List<Integer>> graph = new ArrayList<>();\n    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());\n    for (int[] e : edges) { graph.get(e[0]).add(e[1]); graph.get(e[1]).add(e[0]); }\n    boolean[] visited = new boolean[n];\n    Queue<Integer> q = new LinkedList<>();\n    q.offer(0); visited[0] = true;\n    int count = 1;\n    while (!q.isEmpty()) {\n        int node = q.poll();\n        for (int nb : graph.get(node)) if (!visited[nb]) { visited[nb]=true; q.offer(nb); count++; }\n    }\n    return count == n;\n}",
        },
      ],
    },
  ],

  "Day 28": [
    {
      problem: "Number of Connected Components",
      link: "https://neetcode.io/solutions/number-of-connected-components-in-an-undirected-graph",
      approaches: [
        {
          name: "Union-Find (Optimal)",
          timeComplexity: "O(E * α(V))",
          spaceComplexity: "O(V)",
          explanation:
            "Initialize each node as its own component. For each edge, perform a 'union'. If the nodes were in different components, decrement the total count. Path compression makes this very efficient.",
          code: "public int countComponents(int n, int[][] edges) {\n    int[] parent = new int[n];\n    for (int i = 0; i < n; i++) parent[i] = i;\n    int components = n;\n    for (int[] e : edges) {\n        int p1 = find(parent, e[0]), p2 = find(parent, e[1]);\n        if (p1 != p2) { parent[p1] = p2; components--; }\n    }\n    return components;\n}\n\nprivate int find(int[] parent, int x) {\n    if (parent[x] == x) return x;\n    return parent[x] = find(parent, parent[x]);\n}",
        },
      ],
    },
    {
      problem: "Pacific Atlantic Water Flow",
      link: "https://neetcode.io/solutions/pacific-atlantic-water-flow",
      approaches: [
        {
          name: "BFS from Ocean Borders (Optimal)",
          timeComplexity: "O(m * n)",
          spaceComplexity: "O(m * n)",
          explanation:
            "Instead of checking every cell, work backward. Start BFS from the cells touching the Pacific and track reachable cells. Do the same for the Atlantic. The intersection of both sets is the answer.",
          code: "public List<List<Integer>> pacificAtlantic(int[][] heights) {\n    int m = heights.length, n = heights[0].length;\n    boolean[][] pac = new boolean[m][n], atl = new boolean[m][n];\n    Queue<int[]> pq = new LinkedList<>(), aq = new LinkedList<>();\n    for (int i = 0; i < m; i++) {\n        pq.offer(new int[]{i, 0}); pac[i][0] = true;\n        aq.offer(new int[]{i, n - 1}); atl[i][n - 1] = true;\n    }\n    for (int j = 0; j < n; j++) {\n        pq.offer(new int[]{0, j}); pac[0][j] = true;\n        aq.offer(new int[]{m - 1, j}); atl[m - 1][j] = true;\n    }\n    bfs(heights, pq, pac); bfs(heights, aq, atl);\n    List<List<Integer>> res = new ArrayList<>();\n    for (int i = 0; i < m; i++)\n        for (int j = 0; j < n; j++)\n            if (pac[i][j] && atl[i][j]) res.add(Arrays.asList(i, j));\n    return res;\n}",
        },
      ],
    },
    {
      problem: "Rotting Oranges",
      link: "https://neetcode.io/solutions/rotting-oranges",
      approaches: [
        {
          name: "Breadth-First Search / BFS (Optimal)",
          timeComplexity: "O(R * C)",
          spaceComplexity: "O(R * C)",
          explanation:
            "Scan the entire grid initially to count the total number of fresh oranges and add the coordinates of all starting rotten oranges ('2') into a Queue. Run a multi-source BFS layer by layer. For every minute that passes, process all rotten oranges currently in the queue, spreading the rot to their 4-directional fresh neighbors. Turn infected fresh oranges into rotten ones, decrement the fresh counter, and push their new coordinates into the queue. Repeat until the queue is empty. If the fresh orange count hits zero, return the minutes elapsed; otherwise, return -1.",
          code: "public int orangesRotting(int[][] grid) {\n    if (grid == null || grid.length == 0) return 0;\n    int rows = grid.length;\n    int cols = grid[0].length;\n    Queue<int[]> queue = new LinkedList<>();\n    int freshOranges = 0;\n    \n    // Step 1: Count fresh oranges and add initial rotten oranges to the queue\n    for (int r = 0; r < rows; r++) {\n        for (int c = 0; c < cols; c++) {\n            if (grid[r][c] == 2) {\n                queue.offer(new int[]{r, c});\n            } else if (grid[r][c] == 1) {\n                freshOranges++;\n            }\n        }\n    }\n    \n    if (freshOranges == 0) return 0;\n    int minutes = 0;\n    int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n    \n    // Step 2: Multi-source BFS tracking levels/minutes\n    while (!queue.isEmpty() && freshOranges > 0) {\n        int size = queue.size();\n        for (int i = 0; i < size; i++) {\n            int[] current = queue.poll();\n            for (int[] dir : directions) {\n                int nextR = current[0] + dir[0];\n                int nextC = current[1] + dir[1];\n                \n                // If a fresh neighbor is found, make it rot\n                if (nextR >= 0 && nextR < rows && nextC >= 0 && nextC < cols && grid[nextR][nextC] == 1) {\n                    grid[nextR][nextC] = 2;\n                    freshOranges--;\n                    queue.offer(new int[]{nextR, nextC});\n                }\n            }\n        }\n        minutes++;\n    }\n    \n    return freshOranges == 0 ? minutes : -1;\n}",
        },
      ],
    },
  ],
  "Day 29": [
    {
      problem: "Combination Sum",
      link: "https://neetcode.io/solutions/combination-sum",
      approaches: [
        {
          name: "Backtracking (Optimal)",
          timeComplexity: "O(2^target)",
          spaceComplexity: "O(target)",
          explanation:
            "Explore all combinations by either including a candidate (multiple times) or skipping it. Use a recursive 'backtrack' function to manage the current sum and path.",
          code: "public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    List<List<Integer>> res = new ArrayList<>();\n    Arrays.sort(candidates);\n    backtrack(candidates, target, 0, new ArrayList<>(), res);\n    return res;\n}\n\nprivate void backtrack(int[] c, int remain, int start, List<Integer> path, List<List<Integer>> res) {\n    if (remain == 0) { res.add(new ArrayList<>(path)); return; }\n    for (int i = start; i < c.length && c[i] <= remain; i++) {\n        path.add(c[i]);\n        backtrack(c, remain - c[i], i, path, res);\n        path.remove(path.size() - 1);\n    }\n}",
        },
      ],
    },
    {
      problem: "Combination Sum II",
      link: "https://neetcode.io/solutions/combination-sum-ii",
      approaches: [
        {
          name: "Backtracking (Optimal)",
          timeComplexity: "O(2^target)",
          spaceComplexity: "O(target)",
          explanation:
            "Explore all combinations by either including a candidate (multiple times) or skipping it. Use a recursive 'backtrack' function to manage the current sum and path.",
          code: "public List<List<Integer>> combinationSum(int[] candidates, int target) {\n    List<List<Integer>> res = new ArrayList<>();\n    Arrays.sort(candidates);\n    backtrack(candidates, target, 0, new ArrayList<>(), res);\n    return res;\n}\n\nprivate void backtrack(int[] c, int remain, int start, List<Integer> path, List<List<Integer>> res) {\n    if (remain == 0) { res.add(new ArrayList<>(path)); return; }\n    for (int i = start; i < c.length && c[i] <= remain; i++) {\n        path.add(c[i]);\n        backtrack(c, remain - c[i], i, path, res);\n        path.remove(path.size() - 1);\n    }\n}",
        },
      ],
    },
    {
      problem: "Subsets",
      link: "https://neetcode.io/solutions/subsets",
      approaches: [
        {
          name: "Backtracking / Decision Tree (Optimal)",
          timeComplexity: "O(n * 2^n)",
          spaceComplexity: "O(n)",
          explanation:
            "Generate subsets using a binary decision tree structure. For each element at index 'i', make two distinct recursive paths: one that includes the current element in the running subset slice, and one that excludes it. When the index pointer reaches the end of the array, a valid subset configuration has been reached. Add a copy of the current path to the final results list.",
          code: "public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> res = new ArrayList<>();\n    backtrack(nums, 0, new ArrayList<>(), res);\n    return res;\n}\n\nprivate void backtrack(int[] nums, int i, List<Integer> subset, List<List<Integer>> res) {\n    if (i == nums.length) {\n        res.add(new ArrayList<>(subset));\n        return;\n    }\n    \n    // Decision 1: Include the current element nums[i]\n    subset.add(nums[i]);\n    backtrack(nums, i + 1, subset, res);\n    \n    // Decision 2: Exclude the current element nums[i] (Backtrack step)\n    subset.remove(subset.size() - 1);\n    backtrack(nums, i + 1, subset, res);\n}",
        },
        {
          name: "Iterative / Cascading",
          timeComplexity: "O(n * 2^n)",
          spaceComplexity: "O(n * 2^n)",
          explanation:
            "Start with a list containing just the empty set []. Iterate through each number in the array. For each number, take all existing subsets present in the results list, create a copy of them, add the current number to those copies, and merge them back into the main results list.",
          code: "public List<List<Integer>> subsets(int[] nums) {\n    List<List<Integer>> res = new ArrayList<>();\n    res.add(new ArrayList<>()); // Start with the empty set\n    \n    for (int num : nums) {\n        int size = res.size();\n        for (int i = 0; i < size; i++) {\n            List<Integer> subset = new ArrayList<>(res.get(i));\n            subset.add(num);\n            res.add(subset);\n        }\n    }\n    return res;\n}",
        },
      ],
    },
  ],
  "Day 30": [
    {
      problem: "Permutations",
      link: "https://neetcode.io/solutions/permutations",
      approaches: [
        {
          name: "Backtracking / Collection Tracking (Optimal)",
          timeComplexity: "O(n * n!)",
          spaceComplexity: "O(n!)",
          explanation:
            "Iterate through the numbers list to build a permutation. Use a temporary list to track the current path and a boolean array (or set) to mark numbers currently in use. If the path list size equals the array length, a complete permutation has been formed, so add it to the final result list. Otherwise, loop through all elements, skipping any that are already marked as used, push the available number into the path, and recurse.",
          code: "public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> res = new ArrayList<>();\n    backtrack(res, new ArrayList<>(), nums, new boolean[nums.length]);\n    return res;\n}\n\nprivate void backtrack(List<List<Integer>> res, List<Integer> path, int[] nums, boolean[] used) {\n    if (path.size() == nums.length) {\n        res.add(new ArrayList<>(path));\n        return;\n    }\n    \n    for (int i = 0; i < nums.length; i++) {\n        if (used[i]) continue; // Skip already chosen elements\n        \n        path.add(nums[i]);\n        used[i] = true;\n        \n        backtrack(res, path, nums, used);\n        \n        // Undo choice (Backtrack)\n        used[i] = false;\n        path.remove(path.size() - 1);\n    }\n}",
        },
        {
          name: "In-Place Element Swapping",
          timeComplexity: "O(n * n!)",
          spaceComplexity: "O(n)",
          explanation:
            "Instead of allocating an auxiliary track structure, generate permutations in-place by swapping the element at the current 'start' pointer with subsequent indices. Recurse by advancing the start pointer forward. Once the branch finishes execution, swap the elements back to restore the original array state for alternative branches.",
          code: "public List<List<Integer>> permute(int[] nums) {\n    List<List<Integer>> res = new ArrayList<>();\n    backtrack(0, nums, res);\n    return res;\n}\n\nprivate void backtrack(int start, int[] nums, List<List<Integer>> res) {\n    if (start == nums.length) {\n        List<Integer> permutation = new ArrayList<>();\n        for (int num : nums) permutation.add(num);\n        res.add(permutation);\n        return;\n    }\n    \n    for (int i = start; i < nums.length; i++) {\n        swap(nums, start, i);\n        backtrack(start + 1, nums, res);\n        swap(nums, start, i); // Backtrack swap\n    }\n}\n\nprivate void swap(int[] nums, int i, int j) {\n    int temp = nums[i];\n    nums[i] = nums[j];\n    nums[j] = temp;\n}",
        },
      ],
    },
    {
      problem: "Letter Combinations of a Phone Number",
      link: "https://neetcode.io/solutions/letter-combinations-of-a-phone-number",
      approaches: [
        {
          name: "Backtracking / Decision Tree (Optimal)",
          timeComplexity: "O(N * 4^N)",
          spaceComplexity: "O(N)",
          explanation:
            "Create a fixed lookup array or map representing the classic phone keypad mappings (e.g., '2' maps to 'abc'). Use a recursive backtracking function that tracks the current digit index position. For the digit at the current index, loop through all its mapped characters. Append one character to a string builder, move to the next digit index via recursion, and then strip the character off (backtrack) to try the next available letter option.",
          code: 'private final String[] MAP = {\n    "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"\n};\n\npublic List<String> letterCombinations(String digits) {\n    List<String> res = new ArrayList<>();\n    if (digits == null || digits.length() == 0) return res;\n    \n    backtrack(0, digits, new StringBuilder(), res);\n    return res;\n}\n\nprivate void backtrack(int index, String digits, StringBuilder path, List<String> res) {\n    if (index == digits.length()) {\n        res.add(path.toString());\n        return;\n    }\n    \n    String letters = MAP[digits.charAt(index) - \'0\'];\n    for (int i = 0; i < letters.length(); i++) {\n        path.append(letters.charAt(i));\n        backtrack(index + 1, digits, path, res);\n        path.deleteCharAt(path.length() - 1); // Undo choice (Backtrack)\n    }\n}',
        },
        {
          name: "Iterative / BFS Queue Simulation",
          timeComplexity: "O(N * 4^N)",
          spaceComplexity: "O(4^N)",
          explanation:
            "Use a FIFO Queue to dynamically assemble combinations level-by-level. Initialize the queue with an empty string. Loop through each digit in the input string. For every digit, check the current size of the queue, pop each partial combination out, and append every possible mapped letter of the current digit back into the queue.",
          code: 'public List<String> letterCombinations(String digits) {\n    LinkedList<String> ans = new LinkedList<String>();\n    if (digits.isEmpty()) return ans;\n    \n    String[] mapping = new String[] {"0", "1", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};\n    ans.add("");\n    \n    for (int i = 0; i < digits.length(); i++) {\n        int x = Character.getNumericValue(digits.charAt(i));\n        while (ans.peek().length() == i) {\n            String t = ans.remove();\n            for (char s : mapping[x].toCharArray()) {\n                ans.add(t + s);\n            }\n        }\n    }\n    return ans;\n}',
        },
      ],
    },
    {
      problem: "Word Search II",
      link: "https://neetcode.io/solutions/word-search-ii",
      approaches: [
        {
          name: "Trie + Backtracking (Optimal)",
          timeComplexity: "O(M * (4 * 3^(L-1)))",
          spaceComplexity: "O(N * L)",
          explanation:
            "Insert all words into a Trie. DFS through the board; if the current sequence exists in the Trie, continue. To avoid duplicates and improve speed, store the full word at the leaf node and set it to null once found.",
          code: "public List<String> findWords(char[][] board, String[] words) {\n    TrieNode root = new TrieNode();\n    for (String w : words) {\n        TrieNode cur = root;\n        for (char c : w.toCharArray()) {\n            if (cur.children[c-'a'] == null) cur.children[c-'a'] = new TrieNode();\n            cur = cur.children[c-'a'];\n        }\n        cur.word = w;\n    }\n    List<String> res = new ArrayList<>();\n    for (int i = 0; i < board.length; i++)\n        for (int j = 0; j < board[0].length; j++)\n            dfs(board, i, j, root, res);\n    return res;\n}\nprivate void dfs(char[][] b, int i, int j, TrieNode node, List<String> res) {\n    char c = (i < 0 || i >= b.length || j < 0 || j >= b[0].length) ? '#' : b[i][j];\n    if (c == '#' || node.children[c-'a'] == null) return;\n    node = node.children[c-'a'];\n    if (node.word != null) { res.add(node.word); node.word = null; }\n    b[i][j] = '#';\n    dfs(b, i+1, j, node, res); dfs(b, i-1, j, node, res);\n    dfs(b, i, j+1, node, res); dfs(b, i, j-1, node, res);\n    b[i][j] = c;\n}\nstatic class TrieNode { TrieNode[] children = new TrieNode[26]; String word; }",
        },
      ],
    },
  ],
  "Day 31": [
    {
      problem: "Climbing Stairs",
      link: "https://neetcode.io/solutions/climbing-stairs",
      approaches: [
        {
          name: "Recursion with Memoization",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Use a memo array to store results of subproblems. climb(n) = climb(n-1) + climb(n-2).",
          code: "int[] memo = new int[n + 1];\npublic int solve(int n) {\n    if (n <= 2) return n;\n    if (memo[n] != 0) return memo[n];\n    return memo[n] = solve(n - 1) + solve(n - 2);\n}",
        },
        {
          name: "Bottom-Up Dynamic Programming (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Since we only need the last two values (i-1 and i-2), we can use two variables instead of a full array to save space.",
          code: "public int climbStairs(int n) {\n    if (n <= 2) return n;\n    int first = 1, second = 2;\n    for (int i = 3; i <= n; i++) {\n        int third = first + second;\n        first = second;\n        second = third;\n    }\n    return second;\n}",
        },
      ],
    },
    {
      problem: "House Robber",
      link: "https://neetcode.io/solutions/house-robber",
      approaches: [
        {
          name: "Dynamic Programming (Tabulation)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "At each house, you have two choices: Rob it (current + money from 2 houses ago) or Skip it (money from 1 house ago).",
          code: "public int rob(int[] nums) {\n    if (nums.length == 0) return 0;\n    int[] dp = new int[nums.length + 1];\n    dp[1] = nums[0];\n    for (int i = 2; i <= nums.length; i++)\n        dp[i] = Math.max(dp[i - 1], nums[i - 1] + dp[i - 2]);\n    return dp[nums.length];\n}",
        },
        {
          name: "Space Optimized DP (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Since we only ever need the results of the previous two houses, we can replace the DP array with two variables to save space.",
          code: "int rob1 = 0, rob2 = 0;\nfor (int n : nums) {\n    int temp = Math.max(n + rob1, rob2);\n    rob1 = rob2;\n    rob2 = temp;\n}\nreturn rob2;",
        },
      ],
    },
    {
      problem: "House Robber II",
      link: "https://neetcode.io/solutions/house-robber-ii",
      approaches: [
        {
          name: "Two-Pass DP (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          explanation:
            "Because the houses are in a circle, you cannot rob the first and last house together. We solve the House Robber I problem twice: once excluding the first house and once excluding the last house.",
          code: "public int robII(int[] nums) {\n    if (nums.length == 1) return nums[0];\n    return Math.max(robRange(nums, 0, nums.length - 2), \n                    robRange(nums, 1, nums.length - 1));\n}\n\nprivate int robRange(int[] nums, int start, int end) {\n    int prev2 = 0, prev1 = 0;\n    for (int i = start; i <= end; i++) {\n        int cur = Math.max(prev1, nums[i] + prev2);\n        prev2 = prev1;\n        prev1 = cur;\n    }\n    return prev1;\n}",
        },
      ],
    },
  ],
  "Day 32": [
    {
      problem: "Coin Change",
      link: "https://neetcode.io/solutions/coin-change",
      approaches: [
        {
          name: "Brute Force (DFS)",
          timeComplexity: "O(S^n)",
          spaceComplexity: "O(n)",
          explanation:
            "Try every combination of coins that sum to the amount. Extremely inefficient for large amounts.",
          code: "// Recursive calls exploring all coin branches...",
        },
        {
          name: "Bottom-Up DP (Optimal)",
          timeComplexity: "O(n * amount)",
          spaceComplexity: "O(amount)",
          explanation:
            "Build a DP array where dp[i] is the minimum coins for amount i. For every coin, if i >= coin, dp[i] = min(dp[i], dp[i-coin] + 1).",
          code: "public int coinChange(int[] coins, int amount) {\n    int[] dp = new int[amount + 1];\n    Arrays.fill(dp, amount + 1);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        for (int coin : coins) {\n            if (i >= coin) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}",
        },
      ],
    },
    {
      problem: "Longest Increasing Subsequence",
      link: "https://neetcode.io/solutions/longest-increasing-subsequence",
      approaches: [
        {
          name: "Dynamic Programming",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(n)",
          explanation:
            "Initialize dp[i] = 1 for all i. For each element, check all previous elements. If nums[j] < nums[i], update dp[i] = max(dp[i], dp[j] + 1).",
          code: "public int lengthOfLIS(int[] nums) {\n    int[] dp = new int[nums.length];\n    Arrays.fill(dp, 1);\n    int maxLen = 1;\n    for (int i = 1; i < nums.length; i++) {\n        for (int j = 0; j < i; j++) {\n            if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);\n        }\n        maxLen = Math.max(maxLen, dp[i]);\n    }\n    return maxLen;\n}",
        },
        {
          name: "Binary Search (Optimal)",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
          explanation:
            "Maintain a list of the smallest tail for all increasing subsequences. Use binary search to replace or append elements.",
          code: "// Use Collections.binarySearch or custom implementation to achieve O(n log n)",
        },
      ],
    },
    {
      problem: "Unique Paths",
      link: "https://neetcode.io/solutions/unique-paths",
      approaches: [
        {
          name: "2D Dynamic Programming",
          timeComplexity: "O(m * n)",
          spaceComplexity: "O(m * n)",
          explanation:
            "Create a grid where dp[i][j] is the number of ways to reach that cell. Since you can only move down or right, the value of any cell is the sum of the cell above it and the cell to its left.",
          code: "public int uniquePaths(int m, int n) {\n    int[][] dp = new int[m][n];\n    for (int i = 0; i < m; i++) dp[i][0] = 1;\n    for (int j = 0; j < n; j++) dp[0][j] = 1;\n    for (int i = 1; i < m; i++)\n        for (int j = 1; j < n; j++)\n            dp[i][j] = dp[i-1][j] + dp[i][j-1];\n    return dp[m-1][n-1];\n}",
        },
        {
          name: "Combinatorics (Optimal)",
          timeComplexity: "O(min(m, n))",
          spaceComplexity: "O(1)",
          explanation:
            "This is a combination problem. You must take exactly (m-1) down moves and (n-1) right moves. The total moves are (m+n-2). The answer is (m+n-2) Choose (m-1).",
          code: "// Calculate C(n+m-2, n-1) using a loop to avoid overflow",
        },
      ],
    },
  ],
  "Day 33": [
    {
      problem: "Longest Common Subsequence",
      link: "https://neetcode.io/solutions/longest-common-subsequence",
      approaches: [
        {
          name: "2D Dynamic Programming (Optimal)",
          timeComplexity: "O(m * n)",
          spaceComplexity: "O(m * n)",
          explanation:
            "Use a 2D grid where dp[i][j] represents the LCS of strings ending at those indices. If chars match, move diagonally; otherwise, take the max of top or left.",
          code: "public int longestCommonSubsequence(String text1, String text2) {\n    int m = text1.length(), n = text2.length();\n    int[][] dp = new int[m + 1][n + 1];\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (text1.charAt(i-1) == text2.charAt(j-1)) \n                dp[i][j] = dp[i-1][j-1] + 1;\n            else \n                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return dp[m][n];\n}",
        },
      ],
    },
    {
      problem: "Word Break Problem",
      link: "https://leetcode.com/problems/word-break/",
      approaches: [
        {
          name: "Dynamic Programming - Tabulation (Optimal)",
          timeComplexity: "O(n^3)",
          spaceComplexity:
            "O(n + m) where n is string length and m is dictionary size",
          explanation:
            "Create a boolean array 'dp' of size n + 1, where dp[i] represents whether the substring s[0...i] can be segmented. Initialize dp[0] to true (empty string is valid). For every index i, look backward at all previous indices j. If dp[j] is true and the substring from j to i exists in the dictionary set, set dp[i] to true and break early.",
          code: "public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> wordSet = new HashSet<>(wordDict);\n    boolean[] dp = new boolean[s.length() + 1];\n    dp[0] = true; // Base case: empty string\n\n    for (int i = 1; i <= s.length(); i++) {\n        for (int j = 0; j < i; j++) {\n            if (dp[j] && wordSet.contains(s.substring(j, i))) {\n                dp[i] = true;\n                break; // Found a valid split, move to next i\n            }\n        }\n    }\n    return dp[s.length()];\n}",
        },
        {
          name: "Top-Down Recursion + Memoization",
          timeComplexity: "O(n^3)",
          spaceComplexity:
            "O(n + m) due to the recursion stack and memoization map",
          explanation:
            "Use a recursive helper method to check prefixes. To avoid computing the same state multiple times, use a Boolean array or Map to 'memoize' (cache) whether the substring starting at a specific index can be successfully segmented. If an index is already checked, return its cached result immediately.",
          code: "public boolean wordBreak(String s, List<String> wordDict) {\n    Set<String> wordSet = new HashSet<>(wordDict);\n    Boolean[] memo = new Boolean[s.length()];\n    return dfs(s, 0, wordSet, memo);\n}\n\nprivate boolean dfs(String s, int start, Set<String> wordSet, Boolean[] memo) {\n    if (start == s.length()) return true;\n    if (memo[start] != null) return memo[start];\n\n    for (int end = start + 1; end <= s.length(); end++) {\n        if (wordSet.contains(s.substring(start, end)) && dfs(s, end, wordSet, memo)) {\n            return memo[start] = true;\n        }\n    }\n    return memo[start] = false;\n}",
        },
      ],
    },
    {
      problem: "Decode Ways",
      link: "https://neetcode.io/solutions/decode-ways",
      approaches: [
        {
          name: "Dynamic Programming (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "dp[i] stores the ways to decode the string up to index i. We check if a single digit (1-9) or a double digit (10-26) can form a valid character.",
          code: "public int numDecodings(String s) {\n    int n = s.length();\n    int[] dp = new int[n + 1];\n    dp[0] = 1;\n    dp[1] = s.charAt(0) != '0' ? 1 : 0;\n    for (int i = 2; i <= n; i++) {\n        int one = s.charAt(i - 1) - '0';\n        int two = Integer.parseInt(s.substring(i - 2, i));\n        if (one >= 1) dp[i] += dp[i - 1];\n        if (two >= 10 && two <= 26) dp[i] += dp[i - 2];\n    }\n    return dp[n];\n}",
        },
      ],
    },
  ],
  "Day 34": [
    {
      problem: "Longest Palindromic Subsequence",
      link: "https://neetcode.io/solutions/longest-palindromic-subsequence",
      approaches: [
        {
          name: "2D Dynamic Programming (Optimal)",
          timeComplexity: "O(n^2)",
          spaceComplexity: "O(n^2)",
          explanation:
            "This problem can be treated as finding the Longest Common Subsequence (LCS) between the original string 's' and its reversed version. Alternatively, define a 2D DP table where dp[i][j] tracks the longest palindromic subsequence from index i to j. Loop backwards from the end of the string. If characters at i and j match, dp[i][j] = 2 + dp[i+1][j-1]. If they mismatch, take the maximum of skipping either character: Math.max(dp[i+1][j], dp[i][j-1]).",
          code: "public int longestPalindromeSubseq(String s) {\n    int n = s.length();\n    int[][] dp = new int[n][n];\n    \n    for (int i = n - 1; i >= 0; i--) {\n        dp[i][i] = 1; // Base case: single characters are palindromes of length 1\n        for (int j = i + 1; j < n; j++) {\n            if (s.charAt(i) == s.charAt(j)) {\n                dp[i][j] = 2 + dp[i + 1][j - 1];\n            } else {\n                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);\n            }\n        }\n    }\n    return dp[0][n - 1];\n}",
        },
      ],
    },
    {
      problem: "Edit Distance",
      link: "https://neetcode.io/solutions/edit-distance",
      approaches: [
        {
          name: "2D Dynamic Programming (Optimal)",
          timeComplexity: "O(m * n)",
          spaceComplexity: "O(m * n)",
          explanation:
            "Create a 2D grid matrix of size (m+1) x (n+1) where dp[i][j] represents the minimum edit operations to convert word1[0...i] into word2[0...j]. Pre-populate the base cases for converting to/from empty strings. Loop through both strings: if word1.charAt(i-1) == word2.charAt(j-1), no new operation is needed, so carry over the diagonal value dp[i-1][j-1]. If they don't match, look at the three neighboring operations (Insert: left, Delete: top, Replace: diagonal-left), pick the minimum of those three options, and add 1.",
          code: "public int minDistance(String word1, String word2) {\n    int m = word1.length();\n    int n = word2.length();\n    int[][] dp = new int[m + 1][n + 1];\n    \n    // Base cases: transforming to/from an empty string\n    for (int i = 0; i <= m; i++) dp[i][0] = i;\n    for (int j = 0; j <= n; j++) dp[0][j] = j;\n    \n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\n                dp[i][j] = dp[i - 1][j - 1];\n            } else {\n                int insertOp = dp[i][j - 1];\n                int deleteOp = dp[i - 1][j];\n                int replaceOp = dp[i - 1][j - 1];\n                dp[i][j] = 1 + Math.min(replaceOp, Math.min(insertOp, deleteOp));\n            }\n        }\n    }\n    return dp[m][n];\n}",
        },
      ],
    },
    {
      problem: "0/1 Knapsack Problem",
      link: "https://neetcode.io/solutions/knapsack",
      approaches: [
        {
          name: "1D Array Space-Optimized DP (Optimal)",
          timeComplexity: "O(N * W)",
          spaceComplexity: "O(W)",
          explanation:
            "Instead of a large 2D matrix layout, manage a 1D tracking array 'dp' of size capacity + 1. For each item choice, evaluate the capacity states backwards from the max capacity down to the item's weight. This backward traversal ensures that item values from the current iteration are not used multiple times (preventing unbounded duplication). At each state, decide whether to exclude the item or include it by adding its value to the remainder capacity balance solution.",
          code: "public int knapsack(int[] weights, int[] values, int capacity) {\n    int[] dp = new int[capacity + 1];\n    \n    for (int i = 0; i < weights.length; i++) {\n        int currentWeight = weights[i];\n        int currentValue = values[i];\n        // Traverse backwards to prevent using the same item instance twice\n        for (int w = capacity; w >= currentWeight; w--) {\n            dp[w] = Math.max(dp[w], dp[w - currentWeight] + currentValue);\n        }\n    }\n    return dp[capacity];\n}",
        },
        {
          name: "Standard 2D Dynamic Programming",
          timeComplexity: "O(N * W)",
          spaceComplexity: "O(N * W)",
          explanation:
            "Maintain a 2D matrix where dp[i][w] represents the max profit achieved using the first 'i' items up to a weight threshold 'w'. If the item's weight exceeds 'w', skip it and copy the value from the row above: dp[i-1][w]. Otherwise, calculate the max value by comparing excluding the item versus adding the current item's profit to the optimal value of the remaining weight capacity.",
          code: "public int knapsack2D(int[] weights, int[] values, int capacity) {\n    int n = weights.length;\n    int[][] dp = new int[n + 1][capacity + 1];\n    \n    for (int i = 1; i <= n; i++) {\n        for (int w = 1; w <= capacity; w++) {\n            if (weights[i - 1] <= w) {\n                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);\n            } else {\n                dp[i][w] = dp[i - 1][w];\n            }\n        }\n    }\n    return dp[n][capacity];\n}",
        },
      ],
    },
  ],
  "Day 35": [
    {
      problem: "Partition Equal Subset Sum",
      link: "https://neetcode.io/solutions/partition-equal-subset-sum",
      approaches: [
        {
          name: "Space-Optimized Dynamic Programming / Boolean Array (Optimal)",
          timeComplexity: "O(N * Target)",
          spaceComplexity: "O(Target)",
          explanation:
            "First, calculate the total sum of the array. If the sum is odd, it's impossible to partition it into two equal integer subsets, so return false. Otherwise, the problem reduces to finding a subset that sums up to exactly half of the total sum (target = sum / 2). Initialize a boolean array 'dp' of size target + 1, where dp[i] is true if a sum of i is achievable. Set dp[0] = true. Loop through each number, and update the DP array backwards from target down to num to prevent using the same element multiple times.",
          code: "public boolean canPartition(int[] nums) {\n    int sum = 0;\n    for (int num : nums) sum += num;\n    \n    // If total sum is odd, it cannot be split into two equal integer partitions\n    if (sum % 2 != 0) return false;\n    \n    int target = sum / 2;\n    boolean[] dp = new boolean[target + 1];\n    dp[0] = true;\n    \n    for (int num : nums) {\n        for (int j = target; j >= num; j--) {\n            if (dp[j - num]) {\n                dp[j] = true;\n            }\n        }\n    }\n    return dp[target];\n}",
        },
      ],
    },
    {
      problem: "Target Sum",
      link: "https://neetcode.io/solutions/target-sum",
      approaches: [
        {
          name: "Space-Optimized 1D DP / Subset Sum Reduction (Optimal)",
          timeComplexity: "O(N * Target)",
          spaceComplexity: "O(Target)",
          explanation:
            "This problem can be mathematically reduced to a 0/1 Knapsack problem. Let P be the subset of positive numbers and N be the subset of negative numbers. We know that Sum(P) - Sum(N) = target, and Sum(P) + Sum(N) = totalSum. Adding these gives 2 * Sum(P) = target + totalSum, meaning Sum(P) = (target + totalSum) / 2. If (target + totalSum) is odd or negative, return 0. Now, simply count the number of subsets that add up to this new target using a 1D tracking array.",
          code: "public int findTargetSumWays(int[] nums, int target) {\n    int totalSum = 0;\n    for (int num : nums) totalSum += num;\n    \n    // Edge cases where no mathematical solution exists\n    if ((target + totalSum) % 2 != 0 || Math.abs(target) > totalSum) return 0;\n    \n    int subsetTarget = (target + totalSum) / 2;\n    int[] dp = new int[subsetTarget + 1];\n    dp[0] = 1; // Base case: 1 way to make a sum of 0 (empty set)\n    \n    for (int num : nums) {\n        for (int j = subsetTarget; j >= num; j--) {\n            dp[j] += dp[j - num];\n        }\n    }\n    return dp[subsetTarget];\n}",
        },
        {
          name: "Top-Down Memorization (DFS Map)",
          timeComplexity: "O(N * Sum)",
          spaceComplexity: "O(N * Sum)",
          explanation:
            "Use deep recursion to explore both pathways (+ and -) for each element at index 'i'. To avoid calculating duplicate sub-problems, use a Memoization string key format like 'index,currentSum' to cache results. If the target matches at the end of the array, return 1; otherwise, return 0.",
          code: 'public int findTargetSumWays(int[] nums, int target) {\n    Map<String, Integer> memo = new HashMap<>();\n    return dfs(nums, 0, 0, target, memo);\n}\n\nprivate int dfs(int[] nums, int i, int currentSum, int target, Map<String, Integer> memo) {\n    if (i == nums.length) {\n        return currentSum == target ? 1 : 0;\n    }\n    String key = i + "," + currentSum;\n    if (memo.containsKey(key)) return memo.get(key);\n    \n    int add = dfs(nums, i + 1, currentSum + nums[i], target, memo);\n    int subtract = dfs(nums, i + 1, currentSum - nums[i], target, memo);\n    \n    memo.put(key, add + subtract);\n    return add + subtract;\n}',
        },
      ],
    },
    {
      problem: "Interleaving String",
      link: "https://neetcode.io/solutions/interleaving-string",
      approaches: [
        {
          name: "2D Dynamic Programming (Optimal)",
          timeComplexity: "O(M * N)",
          spaceComplexity: "O(M * N)",
          explanation:
            "Create a 2D boolean matrix 'dp' of size (s1.length() + 1) x (s2.length() + 1), where dp[i][j] signifies if s3[0...i+j-1] can be completely formed by interleaving s1[0...i-1] and s2[0...j-1]. Fill the table starting from base conditions. For any cell (i, j), it is true if either: 1) the character from s1 matches s3 and dp[i-1][j] is true, OR 2) the character from s2 matches s3 and dp[i][j-1] is true.",
          code: "public boolean isInterleave(String s1, String s2, String s3) {\n    if (s1.length() + s2.length() != s3.length()) return false;\n    \n    boolean[][] dp = new boolean[s1.length() + 1][s2.length() + 1];\n    dp[0][0] = true;\n    \n    // Initialize base columns (matching only s1 with s3)\n    for (int i = 1; i <= s1.length(); i++) {\n        dp[i][0] = dp[i - 1][0] && s1.charAt(i - 1) == s3.charAt(i - 1);\n    }\n    \n    // Initialize base rows (matching only s2 with s3)\n    for (int j = 1; j <= s2.length(); j++) {\n        dp[0][j] = dp[0][j - 1] && s2.charAt(j - 1) == s3.charAt(j - 1);\n    }\n    \n    // Fill remaining table grids\n    for (int i = 1; i <= s1.length(); i++) {\n        for (int j = 1; j <= s2.length(); j++) {\n            boolean matchS1 = dp[i - 1][j] && s1.charAt(i - 1) == s3.charAt(i + j - 1);\n            boolean matchS2 = dp[i][j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1);\n            dp[i][j] = matchS1 || matchS2;\n        }\n    }\n    return dp[s1.length()][s2.length()];\n}",
        },
      ],
    },
  ],
  "Day 36": [
    {
      problem: "Burst Balloons",
      link: "https://neetcode.io/solutions/burst-balloons",
      approaches: [
        {
          name: "Interval Matrix Chain Dynamic Programming (Optimal)",
          timeComplexity: "O(n^3)",
          spaceComplexity: "O(n^2)",
          explanation:
            "Think backwards: instead of choosing which balloon to burst *first*, choose which balloon 'k' to burst *last* in a given subarray range [i, j]. Pad the array with boundaries of 1 at both ends. For any interval of length from 1 to n, iterate through all possible last-burst candidates 'k' within that window. The coins gained from choosing k last is: (padded[i-1] * padded[k] * padded[j+1]) + dp[i][k-1] + dp[k+1][j].",
          code: "public int maxCoins(int[] nums) {\n    int n = nums.length;\n    int[] padded = new int[n + 2];\n    padded[0] = 1;\n    padded[n + 1] = 1;\n    for (int i = 0; i < n; i++) padded[i + 1] = nums[i];\n    \n    int[][] dp = new int[n + 2][n + 2];\n    \n    for (int len = 1; len <= n; len++) {\n        for (int i = 1; i <= n - len + 1; i++) {\n            int j = i + len - 1;\n            for (int k = i; k <= j; k++) {\n                int coins = padded[i - 1] * padded[k] * padded[j + 1];\n                dp[i][j] = Math.max(dp[i][j], coins + dp[i][k - 1] + dp[k + 1][j]);\n            }\n        }\n    }\n    return dp[1][n];\n}",
        },
      ],
    },
    {
      problem: "Regular Expression Matching",
      link: "https://neetcode.io/solutions/regular-expression-matching",
      approaches: [
        {
          name: "2D String DP / Top-Down Cache (Optimal)",
          timeComplexity: "O(m * n)",
          spaceComplexity: "O(m * n)",
          explanation:
            "Use a 2D boolean grid or memoized tracking function. When evaluating indices i (for string s) and j (for pattern p), if the next pattern character is '*', we have two choices: 1) Ignore the wildcard group completely (advance pattern index by 2: j+2). 2) If the current characters match or pattern has '.', use the wildcard character once and consume s[i] (advance string index to i+1 while keeping j the same). If no '*' is present, simply check if characters match and step both indices forward by 1.",
          code: "public boolean isMatch(String s, String p) {\n    Boolean[][] memo = new Boolean[s.length() + 1][p.length() + 1];\n    return dfs(0, 0, s, p, memo);\n}\n\nprivate boolean dfs(int i, int j, String s, String p, Boolean[][] memo) {\n    if (memo[i][j] != null) return memo[i][j];\n    if (j == p.length()) return i == s.length();\n    \n    boolean match = i < s.length() && (s.charAt(i) == p.charAt(j) || p.charAt(j) == '.');\n    \n    if (j + 1 < p.length() && p.charAt(j + 1) == '*') {\n        boolean ignoreStar = dfs(i, j + 2, s, p, memo);\n        boolean useStar = match && dfs(i + 1, j, s, p, memo);\n        memo[i][j] = ignoreStar || useStar;\n    } else {\n        memo[i][j] = match && dfs(i + 1, j + 1, s, p, memo);\n    }\n    return memo[i][j];\n}",
        },
      ],
    },
    {
      problem: "Wildcard Matching",
      link: "https://neetcode.io/solutions/wildcard-matching",
      approaches: [
        {
          name: "Two-Pointer Greedy Sequence Tracking (Optimal)",
          timeComplexity: "O(m * n) worst case, O(m + n) average",
          spaceComplexity: "O(1)",
          explanation:
            "Traverse string s and pattern p with two primary pointers. If characters match or p has '?', simply advance both pointers. If a '*' is encountered, it is a wildcard anchor: record the position of the '*' in the pattern and the current position in the string, then advance only the pattern pointer. If a mismatch occurs later, backtrack to the last recorded '*' anchor state, step the string pointer forward by 1 to consume an extra character via wildcard, and restart evaluation from there.",
          code: "public boolean isMatch(String s, String p) {\n    int sIdx = 0, pIdx = 0, matchIdx = 0, starIdx = -1;\n    \n    while (sIdx < s.length()) {\n        if (pIdx < p.length() && (p.charAt(pIdx) == '?' || p.charAt(pIdx) == s.charAt(sIdx))) {\n            sIdx++;\n            pIdx++;\n        } else if (pIdx < p.length() && p.charAt(pIdx) == '*') {\n            starIdx = pIdx;\n            matchIdx = sIdx;\n            pIdx++;\n        } else if (starIdx != -1) {\n            pIdx = starIdx + 1;\n            matchIdx++;\n            sIdx = matchIdx;\n        } else {\n            return false;\n        }\n    }\n    \n    while (pIdx < p.length() && p.charAt(pIdx) == '*') {\n        pIdx++;\n    }\n    return pIdx == p.length();\n}",
        },
      ],
    },
  ],
  "Day 37": [
    {
      problem: "Network Delay Time",
      link: "https://neetcode.io/solutions/network-delay-time",
      approaches: [
        {
          name: "Dijkstra's Algorithm via Min-Heap (Optimal)",
          timeComplexity: "O(E * log V)",
          spaceComplexity: "O(V + E)",
          explanation:
            "Build an adjacency list representation of the network graph. Maintain an array to track the shortest distance to each node, initialized to infinity, with dist[k] set to 0. Use a Minimum Priority Queue to store pairs of [node, time_elapsed]. Pop the node with the shortest current time. If this time is greater than your tracked minimum distance, skip it. Otherwise, look at all its neighbors, calculate their potential path cost, and if it's cheaper than their recorded cost, update the array and push them into the heap. The answer is the maximum value in the distance array, or -1 if any node remains unreached.",
          code: "public int networkDelayTime(int[][] times, int n, int k) {\n    Map<Integer, List<int[]>> adj = new HashMap<>();\n    for (int[] t : times) {\n        adj.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});\n    }\n    \n    PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a[1], b[1]));\n    int[] dist = new int[n + 1];\n    Arrays.fill(dist, Integer.MAX_VALUE);\n    \n    dist[k] = 0;\n    minHeap.offer(new int[]{k, 0});\n    \n    while (!minHeap.isEmpty()) {\n        int[] curr = minHeap.poll();\n        int node = curr[0], d = curr[1];\n        \n        if (d > dist[node]) continue;\n        if (!adj.containsKey(node)) continue;\n        \n        for (int[] edge : adj.get(node)) {\n            int neighbor = edge[0], weight = edge[1];\n            if (dist[node] + weight < dist[neighbor]) {\n                dist[neighbor] = dist[node] + weight;\n                minHeap.offer(new int[]{neighbor, dist[neighbor]});\n            }\n        }\n    }\n    \n    int maxTime = 0;\n    for (int i = 1; i <= n; i++) {\n        if (dist[i] == Integer.MAX_VALUE) return -1;\n        maxTime = Math.max(maxTime, dist[i]);\n    }\n    return maxTime;\n}",
        },
      ],
    },
    {
      problem: "Cheapest Flights Within K Stops",
      link: "https://neetcode.io/solutions/cheapest-flights-within-k-stops",
      approaches: [
        {
          name: "Bellman-Ford / Layered Array Relaxation (Optimal)",
          timeComplexity: "O(K * E)",
          spaceComplexity: "O(V)",
          explanation:
            "Since the path is bounded by K stops, we can run a modified Bellman-Ford shortest-path algorithm for exactly K + 1 iterations. Maintain a pricing array initialized to infinity with prices[src] = 0. In each iteration, create a clone of the prices array from the previous round (to prevent updates from bleeding into the current step and counting as multiple stops). Relax all flight edges by checking if prices[flight_source] + cost is less than the current price of flight_destination in our snapshot clone.",
          code: "public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n    int[] prices = new int[n];\n    Arrays.fill(prices, Integer.MAX_VALUE);\n    prices[src] = 0;\n    \n    for (int i = 0; i <= k; i++) {\n        int[] temp = Arrays.copyOf(prices, n);\n        for (int[] flight : flights) {\n            int u = flight[0], v = flight[1], price = flight[2];\n            if (prices[u] == Integer.MAX_VALUE) continue;\n            if (prices[u] + price < temp[v]) {\n                temp[v] = prices[u] + price;\n            }\n        }\n        prices = temp;\n    }\n    return prices[dst] == Integer.MAX_VALUE ? -1 : prices[dst];\n}",
        },
      ],
    },
    {
      problem: "Path With Minimum Effort",
      link: "https://neetcode.io/solutions/path-with-minimum-effort",
      approaches: [
        {
          name: "Modified Dijkstra on Grid (Optimal)",
          timeComplexity: "O(R * C * log(R * C))",
          spaceComplexity: "O(R * C)",
          explanation:
            "Use Dijkstra's algorithm tailored for grid cells. Maintain an 'efforts' matrix to track the minimum effort required to reach each cell, initialized to infinity. Use a Minimum Heap storing [row, col, current_max_effort]. Pop the cell with the minimum effort. For each of its 4 cardinal neighbors, calculate the absolute height difference between the current cell and the neighbor. The effort to move to this neighbor is the maximum of your current path effort and this single step difference. If this is lower than the neighbor's recorded effort, update it and push it to the heap.",
          code: "public int minimumEffortPath(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    int[][] efforts = new int[rows][cols];\n    for (int[] row : efforts) Arrays.fill(row, Integer.MAX_VALUE);\n    \n    PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a[2], b[2]));\n    efforts[0][0] = 0;\n    minHeap.offer(new int[]{0, 0, 0});\n    \n    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n    \n    while (!minHeap.isEmpty()) {\n        int[] curr = minHeap.poll();\n        int r = curr[0], c = curr[1], effort = curr[2];\n        \n        if (r == rows - 1 && c == cols - 1) return effort;\n        if (effort > efforts[r][c]) continue;\n        \n        for (int[] d : dirs) {\n            int nr = r + d[0], nc = c + d[1];\n            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {\n                int nextEffort = Math.max(effort, Math.abs(heights[r][c] - heights[nr][nc]));\n                if (nextEffort < efforts[nr][nc]) {\n                    efforts[nr][nc] = nextEffort;\n                    minHeap.offer(new int[]{nr, nc, nextEffort});\n                }\n            }\n        }\n    }\n    return 0;\n}",
        },
      ],
    },
  ],
  "Day 38": [
    {
      problem: "Reconstruct Itinerary",
      link: "https://neetcode.io/solutions/reconstruct-itinerary",
      approaches: [
        {
          name: "Hierholzer's Algorithm / Eulerian Path DFS (Optimal)",
          timeComplexity: "O(E * log E)",
          spaceComplexity: "O(V + E)",
          explanation:
            "Treat airports as vertices and tickets as directed edges. Since we must consume every single ticket exactly once, this is an Eulerian Path problem. Build an adjacency map where targets are stored in a PriorityQueue to automatically enforce alphabetical sorting. Perform a modified post-order DFS starting from 'JFK'. Recursively pop destinations out of the queue and traverse them. When an airport node has no remaining outbound flights left, add it to the head of a linked list. The resulting list is the complete path in correct sequential order.",
          code: 'public List<String> findItinerary(List<List<String>> tickets) {\n    Map<String, PriorityQueue<String>> adj = new HashMap<>();\n    for (List<String> ticket : tickets) {\n        adj.computeIfAbsent(ticket.get(0), k -> new PriorityQueue<>()).add(ticket.get(1));\n    }\n    \n    LinkedList<String> itinerary = new LinkedList<>();\n    dfs("JFK", adj, itinerary);\n    return itinerary;\n}\n\nprivate void dfs(String airport, Map<String, PriorityQueue<String>> adj, LinkedList<String> itinerary) {\n    PriorityQueue<String> destinations = adj.get(airport);\n    while (destinations != null && !destinations.isEmpty()) {\n        dfs(destinations.poll(), adj, itinerary);\n    }\n    itinerary.addFirst(airport); // Add to head on backtracking\n}',
        },
      ],
    },
    {
      problem: "Path With Minimum Effort",
      link: "https://neetcode.io/solutions/path-with-minimum-effort",
      approaches: [
        {
          name: "Modified Dijkstra on Grid (Optimal)",
          timeComplexity: "O(R * C * log(R * C))",
          spaceComplexity: "O(R * C)",
          explanation:
            "Use Dijkstra's algorithm tailored for grid cells. Maintain an 'efforts' matrix to track the minimum effort required to reach each cell, initialized to infinity. Use a Minimum Heap storing [row, col, current_max_effort]. Pop the cell with the minimum effort. For each of its 4 cardinal neighbors, calculate the absolute height difference between the current cell and the neighbor. The effort to move to this neighbor is the maximum of your current path effort and this single step difference. If this is lower than the neighbor's recorded effort, update it and push it to the heap.",
          code: "public int minimumEffortPath(int[][] heights) {\n    int rows = heights.length, cols = heights[0].length;\n    int[][] efforts = new int[rows][cols];\n    for (int[] row : efforts) Arrays.fill(row, Integer.MAX_VALUE);\n    \n    PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a[2], b[2]));\n    efforts[0][0] = 0;\n    minHeap.offer(new int[]{0, 0, 0});\n    \n    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n    \n    while (!minHeap.isEmpty()) {\n        int[] curr = minHeap.poll();\n        int r = curr[0], c = curr[1], effort = curr[2];\n        \n        if (r == rows - 1 && c == cols - 1) return effort;\n        if (effort > efforts[r][c]) continue;\n        \n        for (int[] d : dirs) {\n            int nr = r + d[0], nc = c + d[1];\n            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {\n                int nextEffort = Math.max(effort, Math.abs(heights[r][c] - heights[nr][nc]));\n                if (nextEffort < efforts[nr][nc]) {\n                    efforts[nr][nc] = nextEffort;\n                    minHeap.offer(new int[]{nr, nc, nextEffort});\n                }\n            }\n        }\n    }\n    return 0;\n}",
        },
      ],
    },
    {
      problem: "Swim in Rising Water",
      link: "https://neetcode.io/solutions/swim-in-rising-water",
      approaches: [
        {
          name: "Modified Dijkstra with Min-Heap Range (Optimal)",
          timeComplexity: "O(N^2 * log N)",
          spaceComplexity: "O(N^2)",
          explanation:
            "This is a bottleneck shortest path problem. Use a Minimum Priority Queue storing [row, col, maximum_elevation_seen_so_far]. Start at grid[0][0] and track visited cells with a 2D boolean array. Pop the cell with the lowest bottleneck value. If you reach the destination cell (N-1, N-1), return its value immediately. Otherwise, look at its unvisited neighbors; their new path bottleneck value is the maximum of the current bottleneck and the neighbor's cell height. Push this new state back into the heap.",
          code: "public int swimInWater(int[][] grid) {\n    int n = grid.length;\n    PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a[2], b[2]));\n    boolean[][] visited = new boolean[n][n];\n    \n    minHeap.offer(new int[]{0, 0, grid[0][0]});\n    visited[0][0] = true;\n    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n    \n    while (!minHeap.isEmpty()) {\n        int[] curr = minHeap.poll();\n        int r = curr[0], c = curr[1], time = curr[2];\n        \n        if (r == n - 1 && c == n - 1) return time;\n        \n        for (int[] d : dirs) {\n            int nr = r + d[0], nc = c + d[1];\n            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {\n                visited[nr][nc] = true;\n                minHeap.offer(new int[]{nr, nc, Math.max(time, grid[nr][nc])});\n            }\n        }\n    }\n    return 0;\n}",
        },
      ],
    },
  ],
  "Day 39": [
    {
      problem: "LRU Cache",
      link: "https://neetcode.io/solutions/lru-cache",
      approaches: [
        {
          name: "HashMap + Doubly Linked List (Optimal)",
          timeComplexity: "O(1)",
          spaceComplexity: "O(Capacity)",
          explanation:
            "Combine a standard HashMap with an explicit custom Doubly Linked List. The HashMap provides O(1) lookups by mapping keys directly to list node references. The Doubly Linked List enables constant-time node insertions and deletions. Every time a key is accessed or modified via 'get' or 'put', isolate its corresponding node and relocate it to the head of the list (marking it most recently used). If a 'put' execution triggers a capacity overflow, evict the node sitting at the tail of the list and remove its entry from the map.",
          code: "class LRUCache {\n    private class Node {\n        int key, val;\n        Node prev, next;\n        Node(int k, int v) { this.key = k; this.val = v; }\n    }\n    \n    private final int capacity;\n    private final Map<Integer, Node> map;\n    private final Node head, tail;\n\n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        this.map = new HashMap<>();\n        this.head = new Node(0, 0);\n        this.tail = new Node(0, 0);\n        head.next = tail;\n        tail.prev = head;\n    }\n    \n    public int get(int key) {\n        if (!map.containsKey(key)) return -1;\n        Node node = map.get(key);\n        remove(node);\n        insertAtHead(node);\n        return node.val;\n    }\n    \n    public void put(int key, int value) {\n        if (map.containsKey(key)) {\n            remove(map.get(key));\n        }\n        if (map.size() == capacity) {\n            map.remove(tail.prev.key);\n            remove(tail.prev);\n        }\n        Node newNode = new Node(key, value);\n        map.put(key, newNode);\n        insertAtHead(newNode);\n    }\n    \n    private void remove(Node node) {\n        node.prev.next = node.next;\n        node.next.prev = node.prev;\n    }\n    \n    private void insertAtHead(Node node) {\n        node.next = head.next;\n        node.next.prev = node;\n        head.next = node;\n        node.prev = head;\n    }\n}",
        },
      ],
    },
    {
      problem: "LFU Cache",
      link: "https://neetcode.io/solutions/lfu-cache",
      approaches: [
        {
          name: "Dual HashMaps + LinkedHashSet Bucket Mapping (Optimal)",
          timeComplexity: "O(1)",
          spaceComplexity: "O(Capacity)",
          explanation:
            "Use two HashMaps along with an ordered set structure. The first map tracks node values and their frequency metadata by key: Map<Integer, Node>. The second map associates numerical frequencies with a LinkedHashSet of keys: Map<Integer, LinkedHashSet<Integer>>, creating bucket tiers. Maintain a 'minFrequency' pointer tracker variable. Whenever an item is accessed, remove it from its current frequency bucket, increment its counter, and append it to the next tier up. If a capacity overflow forces eviction, pull the oldest element from the bucket tier pointed to by 'minFrequency'.",
          code: "class LFUCache {\n    private class Node {\n        int key, value, frequency = 1;\n        Node(int k, int v) { this.key = k; this.value = v; }\n    }\n    \n    private final int capacity;\n    private int minFreq = 0;\n    private final Map<Integer, Node> cache = new HashMap<>();\n    private final Map<Integer, LinkedHashSet<Integer>> freqMap = new HashMap<>();\n\n    public LFUCache(int capacity) { this.capacity = capacity; }\n    \n    public int get(int key) {\n        if (!cache.containsKey(key)) return -1;\n        Node node = cache.get(key);\n        updateFrequency(node);\n        return node.value;\n    }\n    \n    public void put(int key, int value) {\n        if (capacity <= 0) return;\n        if (cache.containsKey(key)) {\n            Node node = cache.get(key);\n            node.value = value;\n            updateFrequency(node);\n            return;\n        }\n        if (cache.size() >= capacity) {\n            int evict = freqMap.get(minFreq).iterator().next();\n            freqMap.get(minFreq).remove(evict);\n            cache.remove(evict);\n        }\n        Node newNode = new Node(key, value);\n        cache.put(key, newNode);\n        minFreq = 1;\n        freqMap.computeIfAbsent(1, x -> new LinkedHashSet<>()).add(key);\n    }\n    \n    private void updateFrequency(Node node) {\n        int f = node.frequency;\n        freqMap.get(f).remove(node.key);\n        if (freqMap.get(f).isEmpty() && f == minFreq) minFreq++;\n        node.frequency++;\n        freqMap.computeIfAbsent(node.frequency, x -> new LinkedHashSet<>()).add(node.key);\n    }\n}",
        },
      ],
    },
    {
      problem: "Design Twitter",
      link: "https://neetcode.io/solutions/design-twitter",
      approaches: [
        {
          name: "Object Relationships with Global Sequence Counter (Optimal)",
          timeComplexity:
            "postTweet: O(1), follow/unfollow: O(1), getNewsFeed: O(F * log 10) where F is the number of followees",
          spaceComplexity: "O(Users + Tweets)",
          explanation:
            "Model the architecture using clear data mappings. Track tweets globally with an auto-incrementing time variable. Map user tracking IDs to their personal set of followed user IDs: Map<Integer, Set<Integer>>. Map each user ID to a linked list of their own posted Tweet objects. To construct the chronological news feed, gather the individual tweet lists belonging to the user and their followees, and pass them into a Max-Heap Priority Queue sorted by the global timestamp. Extract the top 10 most recent records.",
          code: "class Twitter {\n    private static int timestamp = 0;\n    private class Tweet {\n        int id, time;\n        Tweet next;\n        Tweet(int id) { this.id = id; this.time = timestamp++; }\n    }\n    \n    private final Map<Integer, Set<Integer>> followers = new HashMap<>();\n    private final Map<Integer, Tweet> userTweets = new HashMap<>();\n\n    public void postTweet(int userId, int tweetId) {\n        follow(userId, userId); // Auto-follow yourself\n        Tweet t = new Tweet(tweetId);\n        t.next = userTweets.get(userId);\n        userTweets.put(userId, t);\n    }\n    \n    public List<Integer> getNewsFeed(int userId) {\n        List<Integer> res = new ArrayList<>();\n        if (!followers.containsKey(userId)) return res;\n        \n        PriorityQueue<Tweet> maxHeap = new PriorityQueue<>((a, b) -> Integer.compare(b.time, a.time));\n        for (int followeeId : followers.get(userId)) {\n            Tweet t = userTweets.get(followeeId);\n            if (t != null) maxHeap.offer(t);\n        }\n        \n        while (!maxHeap.isEmpty() && res.size() < 10) {\n            Tweet curr = maxHeap.poll();\n            res.add(curr.id);\n            if (curr.next != null) maxHeap.offer(curr.next);\n        }\n        return res;\n    }\n    \n    public void follow(int followerId, int followeeId) {\n        followers.computeIfAbsent(followerId, x -> new HashSet<>()).add(followeeId);\n    }\n    \n    public void unfollow(int followerId, int followeeId) {\n        if (followers.containsKey(followerId) && followerId != followeeId) {\n            followers.get(followerId).remove(followeeId);\n        }\n    }\n}",
        },
      ],
    },
  ],
  "Day 40": [
    {
      problem: "Encode and Decode Strings",
      link: "https://neetcode.io/solutions/encode-and-decode-strings",
      approaches: [
        {
          name: "Length-Prefix Encoding (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "To handle strings containing any character, prepend each string with its length and a special delimiter (e.g., '4#'). During decoding, parse the length to know exactly how many characters to read next.",
          code: "public String encode(List<String> strs) {\n    StringBuilder sb = new StringBuilder();\n    for (String s : strs) sb.append(s.length()).append('#').append(s);\n    return sb.toString();\n}\npublic List<String> decode(String s) {\n    List<String> res = new ArrayList<>();\n    int i = 0;\n    while (i < s.length()) {\n        int j = s.indexOf('#', i);\n        int len = Integer.parseInt(s.substring(i, j));\n        res.add(s.substring(j + 1, j + 1 + len));\n        i = j + 1 + len;\n    }\n    return res;\n}",
        },
      ],
    },
    {
      problem: "Reverse Words in a String",
      link: "https://neetcode.io/solutions/reverse-words-in-a-string",
      approaches: [
        {
          name: "Built-in Split and Reverse Simulation (Optimal Linear)",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation:
            "Trim the leading and trailing spaces from the string. Split the entire string into an array of substrings using a regular expression that catches one or more spaces ('\\\\s+'). Loop through the generated words array backwards from the last element to the first element, appending each non-empty string to a StringBuilder separated by a single space.",
          code: 'public String reverseWords(String s) {\n    String[] words = s.trim().split("\\\\s+");\n    StringBuilder sb = new StringBuilder();\n    \n    for (int i = words.length - 1; i >= 0; i--) {\n        sb.append(words[i]);\n        if (i > 0) {\n            sb.append(" ");\n        }\n    }\n    return sb.toString();\n}',
        },
        {
          name: "In-Place Array Reversal",
          timeComplexity: "O(N)",
          spaceComplexity: "O(N)",
          explanation:
            "Convert the string into a character array. First, reverse the entire character array. Next, iterate through the reversed array to find the boundaries of each individual word and reverse each word back into its original character order. Finally, clean up the data by shifting characters forward to strip out any leading, trailing, or consecutive duplicate spaces.",
          code: "public String reverseWords(String s) {\n    char[] a = s.toCharArray();\n    int n = a.length;\n    \n    // Step 1: Reverse the entire array\n    reverse(a, 0, n - 1);\n    \n    // Step 2: Reverse each individual word\n    reverseWords(a, n);\n    \n    // Step 3: Clean up spaces\n    return cleanSpaces(a, n);\n}\n\nprivate void reverse(char[] a, int i, int j) {\n    while (i < j) {\n        char t = a[i];\n        a[i++] = a[j];\n        a[j--] = t;\n    }\n}\n\nprivate void reverseWords(char[] a, int n) {\n    int i = 0, j = 0;\n    while (i < n) {\n        while (i < j || i < n && a[i] == ' ') i++; // Skip spaces\n        while (j < i || j < n && a[j] != ' ') j++; // Skip words\n        reverse(a, i, j - 1);                      // Reverse the word\n    }\n}\n\nprivate String cleanSpaces(char[] a, int n) {\n    int i = 0, j = 0;\n    while (j < n) {\n        while (j < n && a[j] == ' ') j++;             // Skip spaces\n        while (j < n && a[j] != ' ') a[i++] = a[j++]; // Keep word\n        while (j < n && a[j] == ' ') j++;             // Skip spaces\n        if (j < n) a[i++] = ' ';                      // Keep only one space\n    }\n    return new String(a, 0, i);\n}",
        },
      ],
    },
    {
      problem: "Largest Rectangle in Histogram",
      link: "https://neetcode.io/solutions/largest-rectangle-in-histogram",
      approaches: [
        {
          name: "Monotonic Increasing Stack (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n) for stack tracking allocation",
          explanation:
            "Maintain a stack that stores indices of the bars in strictly increasing height order. Loop through each bar; if the current bar is shorter than the bar represented at the top of the stack, pop the stack and calculate the rectangle area with the popped bar as the smallest height bottleneck. The width is determined by the distance between the current index and the index now at the top of the stack. A final pass handles any remaining bars left inside the stack.",
          code: "public int largestRectangleArea(int[] heights) {\n    Stack<Integer> stack = new Stack<>();\n    int maxArea = 0;\n    int n = heights.length;\n    \n    for (int i = 0; i <= n; i++) {\n        // Treat the end of array as a bar of height 0 to clear the stack\n        int currentHeight = (i == n) ? 0 : heights[i];\n        \n        while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {\n            int height = heights[stack.pop()];\n            int width = stack.isEmpty() ? i : i - stack.peek() - 1;\n            maxArea = Math.max(maxArea, height * width);\n        }\n        stack.push(i);\n    }\n    return maxArea;\n}",
        },
        {
          name: "Segment Boundaries Precomputation (Alternative)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n) auxiliary memory arrays",
          explanation:
            "Precompute two arrays: 'lessFromLeft' and 'lessFromRight'. For each bar, 'lessFromLeft[i]' stores the index of the first bar to its left that is strictly shorter than it. Similarly, 'lessFromRight[i]' stores the first shorter bar index to its right. Once these boundaries are established using a quick linear lookup pass, calculate the maximum possible area for every single bar serving as the baseline minimum height.",
          code: "public int largestRectangleArea(int[] heights) {\n    if (heights == null || heights.length == 0) return 0;\n    int n = heights.length;\n    int[] lessFromLeft = new int[n];\n    int[] lessFromRight = new int[n];\n    \n    lessFromLeft[0] = -1;\n    for (int i = 1; i < n; i++) {\n        int p = i - 1;\n        while (p >= 0 && heights[p] >= heights[i]) {\n            p = lessFromLeft[p];\n        }\n        lessFromLeft[i] = p;\n    }\n    \n    lessFromRight[n - 1] = n;\n    for (int i = n - 2; i >= 0; i--) {\n        int p = i + 1;\n        while (p < n && heights[p] >= heights[i]) {\n            p = lessFromRight[p];\n        }\n        lessFromRight[i] = p;\n    }\n    \n    int maxArea = 0;\n    for (int i = 0; i < n; i++) {\n        int width = lessFromRight[i] - lessFromLeft[i] - 1;\n        maxArea = Math.max(maxArea, heights[i] * width);\n    }\n    return maxArea;\n}",
        },
      ],
    },
  ],
  "Day 41": [
    {
      problem: "Alien Dictionary",
      link: "https://neetcode.io/solutions/alien-dictionary",
      approaches: [
        {
          name: "Topological Sort (Optimal)",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V + E)",
          explanation:
            "Build a directed graph by comparing adjacent words to find character precedence. Use Kahn's algorithm (BFS with in-degree) to find the ordering. If the result length doesn't match the unique character count, a cycle exists.",
          code: 'public String alienOrder(String[] words) {\n    Map<Character, Set<Character>> graph = new HashMap<>();\n    Map<Character, Integer> inDeg = new HashMap<>();\n    for (String w : words) for (char c : w.toCharArray()) { graph.putIfAbsent(c, new HashSet<>()); inDeg.putIfAbsent(c, 0); }\n    for (int i = 0; i < words.length - 1; i++) {\n        String a = words[i], b = words[i+1];\n        if (a.length() > b.length() && a.startsWith(b)) return "";\n        for (int j = 0; j < Math.min(a.length(), b.length()); j++) {\n            if (a.charAt(j) != b.charAt(j)) {\n                if (!graph.get(a.charAt(j)).contains(b.charAt(j))) {\n                    graph.get(a.charAt(j)).add(b.charAt(j));\n                    inDeg.put(b.charAt(j), inDeg.get(b.charAt(j)) + 1);\n                } break;\n            }\n        }\n    }\n    Queue<Character> q = new LinkedList<>();\n    for (char c : inDeg.keySet()) if (inDeg.get(c) == 0) q.offer(c);\n    StringBuilder sb = new StringBuilder();\n    while (!q.isEmpty()) {\n        char c = q.poll(); sb.append(c);\n        for (char nb : graph.get(c)) if (--inDeg.get(nb) == 0) q.offer(nb);\n    }\n    return sb.length() == inDeg.size() ? sb.toString() : "";\n}',
        },
      ],
    },
    {
      problem: "Palindrome Pairs",
      link: "https://neetcode.io/solutions/palindrome-pairs",
      approaches: [
        {
          name: "Trie with Palindrome Suffix Tracking (Optimal)",
          timeComplexity: "O(N * W^2)",
          spaceComplexity: "O(N * W^2)",
          explanation:
            "Insert the reverse of each word into a Trie. At each Trie node, maintain the index of the word ending there, alongside a list of indices of words whose remaining suffix forms a palindrome. To find pairs for a given word, traverse the Trie character by character. If we match a complete reversed word in the Trie, check if the remaining suffix of our current word is a palindrome. Conversely, if we reach the end of our current word, any word indices cached in the remaining Trie branch's palindrome list form valid pairs.",
          code: "private static class TrieNode {\n    int wordId = -1;\n    List<Integer> restIsPalindrome = new ArrayList<>();\n    TrieNode[] next = new TrieNode[26];\n}\n\npublic List<List<Integer>> palindromePairs(String[] words) {\n    List<List<Integer>> res = new ArrayList<>();\n    TrieNode root = new TrieNode();\n    \n    // Step 1: Build the Trie with reversed words\n    for (int i = 0; i < words.length; i++) {\n        addWord(root, words[i], i);\n    }\n    \n    // Step 2: Find matches for each word\n    for (int i = 0; i < words.length; i++) {\n        search(words, i, root, res);\n    }\n    \n    return res;\n}\n\nprivate void addWord(TrieNode root, String word, int id) {\n    for (int i = word.length() - 1; i >= 0; i--) {\n        if (isPalindrome(word, 0, i)) {\n            root.restIsPalindrome.add(id);\n        }\n        int c = word.charAt(i) - 'a';\n        if (root.next[c] == null) root.next[c] = new TrieNode();\n        root = root.next[c];\n    }\n    root.wordId = id;\n    root.restIsPalindrome.add(id); // Empty suffix is a palindrome\n}\n\nprivate void search(String[] words, int id, TrieNode root, List<List<Integer>> res) {\n    String word = words[id];\n    for (int i = 0; i < word.length(); i++) {\n        if (root.wordId >= 0 && root.wordId != id && isPalindrome(word, i, word.length() - 1)) {\n            res.add(Arrays.asList(id, root.wordId));\n        }\n        \n        root = root.next[word.charAt(i) - 'a'];\n        if (root == null) return;\n    }\n    \n    for (int palId : root.restIsPalindrome) {\n        if (palId == id) continue;\n        res.add(Arrays.asList(id, palId));\n    }\n}\n\nprivate boolean isPalindrome(String word, int i, int j) {\n    while (i < j) {\n        if (word.charAt(i++) != word.charAt(j--)) return false;\n    }\n    return true;\n}",
        },
        {
          name: "HashMap Prefix/Suffix Splitting",
          timeComplexity: "O(N * W^2)",
          spaceComplexity: "O(N * W)",
          explanation:
            "Store all words alongside their indices in a HashMap. For each word, split it into two substrings (prefix and suffix) at every possible boundary point. If the prefix is a palindrome, look up the reverse of the suffix in the map to potentially form a pair (reversed_suffix + word). If the suffix is a palindrome, look up the reverse of the prefix to form a pair (word + reversed_prefix). Take care to handle the empty string uniquely to prevent duplicate pairs.",
          code: "public List<List<Integer>> palindromePairs(String[] words) {\n    List<List<Integer>> res = new ArrayList<>();\n    Map<String, Integer> map = new HashMap<>();\n    for (int i = 0; i < words.length; i++) map.put(words[i], i);\n    \n    for (int i = 0; i < words.length; i++) {\n        for (int j = 0; j <= words[i].length(); j++) {\n            String str1 = words[i].substring(0, j);\n            String str2 = words[i].substring(j);\n            \n            if (isPalindrome(str1)) {\n                String revStr2 = new StringBuilder(str2).reverse().toString();\n                if (map.containsKey(revStr2) && map.get(revStr2) != i) {\n                    res.add(Arrays.asList(map.get(revStr2), i));\n                }\n            }\n            if (isPalindrome(str2) && str2.length() > 0) {\n                String revStr1 = new StringBuilder(str1).reverse().toString();\n                if (map.containsKey(revStr1) && map.get(revStr1) != i) {\n                    res.add(Arrays.asList(i, map.get(revStr1)));\n                }\n            }\n        }\n    }\n    return res;\n}\n\nprivate boolean isPalindrome(String s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n        if (s.charAt(left++) != s.charAt(right--)) return false;\n    }\n    return true;\n}",
        },
      ],
    },
    {
      problem: "Minimum Window Substring",
      link: "https://neetcode.io/solutions/minimum-window-substring",
      approaches: [
        {
          name: "Sliding Window (Optimal)",
          timeComplexity: "O(n + m)",
          spaceComplexity: "O(m)",
          explanation:
            "Use two frequency maps: one for characters required and one for the current window. Expand the right pointer until all requirements are met, then shrink the left pointer as much as possible while maintaining validity.",
          code: 'public String minWindow(String s, String t) {\n    Map<Character, Integer> need = new HashMap<>(), window = new HashMap<>();\n    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);\n    int left=0, right=0, valid=0, start=0, minLen=Integer.MAX_VALUE;\n    while (right < s.length()) {\n        char c = s.charAt(right++);\n        if (need.containsKey(c)) {\n            window.merge(c, 1, Integer::sum);\n            if (window.get(c).equals(need.get(c))) valid++;\n        }\n        while (valid == need.size()) {\n            if (right - left < minLen) { start = left; minLen = right - left; }\n            char d = s.charAt(left++);\n            if (need.containsKey(d)) {\n                if (window.get(d).equals(need.get(d))) valid--;\n                window.merge(d, -1, Integer::sum);\n            }\n        }\n    }\n    return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);\n}',
        },
      ],
    },
  ],
  "Day 42": [
    {
      problem: "Count of Smaller Numbers After Self",
      link: "https://neetcode.io/solutions/count-of-smaller-numbers-after-self",
      approaches: [
        {
          name: "Modified Merge Sort / Divide and Conquer (Optimal)",
          timeComplexity: "O(N * log N)",
          spaceComplexity: "O(N)",
          explanation:
            "Since indices shift during sorting, track an auxiliary array of item indices. Implement a modified merge sort. During the merge step, compare elements from the left sorted subarray against the right sorted subarray. If an element in the right subarray is smaller than the element in the left subarray, it means this right element is smaller than the current left element (and all remaining elements in the left segment). Increment a running right-counter tracker. When a left element is finally selected to merge back, add this running right-counter count directly to its index in the global results array.",
          code: "private int[] count;\n\npublic List<Integer> countSmaller(int[] nums) {\n    int n = nums.length;\n    count = new int[n];\n    int[] indices = new int[n];\n    for (int i = 0; i < n; i++) indices[i] = i;\n    \n    mergesort(nums, indices, 0, n - 1);\n    \n    List<Integer> res = new ArrayList<>();\n    for (int c : count) res.add(c);\n    return res;\n}\n\nprivate void mergesort(int[] nums, int[] indices, int left, int right) {\n    if (left >= right) return;\n    int mid = left + (right - left) / 2;\n    mergesort(nums, indices, left, mid);\n    mergesort(nums, indices, mid + 1, right);\n    merge(nums, indices, left, mid, right);\n}\n\nprivate void merge(int[] nums, int[] indices, int left, int mid, int right) {\n    int[] temp = new int[right - left + 1];\n    int i = left, j = mid + 1, k = 0;\n    int rightSmallerCount = 0;\n    \n    while (i <= mid && j <= right) {\n        if (nums[indices[j]] < nums[indices[i]]) {\n            rightSmallerCount++;\n            temp[k++] = indices[j++];\n        } else {\n            count[indices[i]] += rightSmallerCount;\n            temp[k++] = indices[i++];\n        }\n    }\n    \n    while (i <= mid) {\n        count[indices[i]] += rightSmallerCount;\n        temp[k++] = indices[i++];\n    }\n    while (j <= right) {\n        temp[k++] = indices[j++];\n    }\n    \n    System.arraycopy(temp, 0, indices, left, temp.length);\n}",
        },
      ],
    },
    {
      problem: "Reverse Pairs",
      link: "https://neetcode.io/solutions/reverse-pairs",
      approaches: [
        {
          name: "Modified Merge Sort / Divide and Conquer (Optimal)",
          timeComplexity: "O(N * log N)",
          spaceComplexity: "O(N)",
          explanation:
            "Utilize a divide-and-conquer strategy identical to standard Merge Sort. Before merging the left and right halves together, loop through the elements to count valid pairs. For each element 'i' in the left array, maintain a pointer 'j' in the right array. Advance 'j' as long as the condition (nums[i] > 2 * (long)nums[j]) holds true. Since both arrays are individually sorted at this step, the number of valid pairs for the current 'i' is simply the distance from the beginning of the right array up to 'j'. Add this distance to a global count, then perform a standard array merge step.",
          code: "public int reversePairs(int[] nums) {\n    return mergeSort(nums, 0, nums.length - 1);\n}\n\nprivate int mergeSort(int[] nums, int left, int right) {\n    if (left >= right) return 0;\n    int mid = left + (right - left) / 2;\n    int count = mergeSort(nums, left, mid) + mergeSort(nums, mid + 1, right);\n    \n    // Step 1: Count reverse pairs explicitly before merging\n    int j = mid + 1;\n    for (int i = left; i <= mid; i++) {\n        while (j <= right && nums[i] > 2.0 * nums[j]) {\n            j++;\n        }\n        count += (j - (mid + 1));\n    }\n    \n    // Step 2: Standard merge operation\n    merge(nums, left, mid, right);\n    return count;\n}\n\nprivate void merge(int[] nums, int left, int mid, int right) {\n    int[] temp = new int[right - left + 1];\n    int i = left, j = mid + 1, k = 0;\n    \n    while (i <= mid && j <= right) {\n        if (nums[i] <= nums[j]) temp[k++] = nums[i++];\n        else temp[k++] = nums[j++];\n    }\n    while (i <= mid) temp[k++] = nums[i++];\n    while (j <= right) temp[k++] = nums[j++];\n    \n    System.arraycopy(temp, 0, nums, left, temp.length);\n}",
        },
      ],
    },
    {
      problem: "Maximum Profit in Job Scheduling",
      link: "https://neetcode.io/solutions/maximum-profit-in-job-scheduling",
      approaches: [
        {
          name: "DP Tabulation with Binary Search (Optimal)",
          timeComplexity:
            "O(n log n) due to sorting and performing binary search n times",
          spaceComplexity:
            "O(n) to store the wrapped job structures and the DP array",
          explanation:
            "Group startTime, endTime, and profit into a single custom Job object and sort them by their end times in ascending order. Create a DP array where dp[i] represents the maximum profit achievable up to the i-th job. For each job, use binary search to locate the latest previous job whose end time does not conflict with the current job's start time. Calculate the profit of including this job versus skipping it, and store the maximum value in the DP table.",
          code: "public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {\n    int n = startTime.length;\n    Job[] jobs = new Job[n];\n    for (int i = 0; i < n; i++) {\n        jobs[i] = new Job(startTime[i], endTime[i], profit[i]);\n    }\n    // Sort jobs by their end times\n    Arrays.sort(jobs, (a, b) -> Integer.compare(a.end, b.end));\n    \n    int[] dp = new int[n];\n    dp[0] = jobs[0].profit;\n    \n    for (int i = 1; i < n; i++) {\n        int currentProfit = jobs[i].profit;\n        int prevCompatibleIdx = binarySearch(jobs, i);\n        if (prevCompatibleIdx != -1) {\n            currentProfit += dp[prevCompatibleIdx];\n        }\n        // dp[i] is max of taking current job vs skipping it (taking dp[i-1])\n        dp[i] = Math.max(dp[i - 1], currentProfit);\n    }\n    return dp[n - 1];\n}\n\nprivate int binarySearch(Job[] jobs, int index) {\n    int low = 0, high = index - 1;\n    int ans = -1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (jobs[mid].end <= jobs[index].start) {\n            ans = mid;\n            low = mid + 1; // Look for a later compatible job\n        } else {\n            high = mid - 1;\n        }\n    }\n    return ans;\n}\n\nprivate static class Job {\n    int start, end, profit;\n    Job(int start, int end, int profit) {\n        this.start = start;\n        this.end = end;\n        this.profit = profit;\n    }\n}",
        },
        {
          name: "Top-Down Recursion + Memoization (Alternative)",
          timeComplexity: "O(n log n)",
          spaceComplexity:
            "O(n) for the recursion call stack and memoization cache array",
          explanation:
            "Sort the jobs by their start times instead. Write a recursive function that decides whether to take or skip the job at the current index. If you take it, use binary search to skip ahead to the next compatible job index that starts at or after the current job's end time. Store computed subproblem answers in a memoization array to avoid redundant branch exploration.",
          code: "public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {\n    int n = startTime.length;\n    Job[] jobs = new Job[n];\n    for (int i = 0; i < n; i++) {\n        jobs[i] = new Job(startTime[i], endTime[i], profit[i]);\n    }\n    // Sort jobs by start times\n    Arrays.sort(jobs, (a, b) -> Integer.compare(a.start, b.start));\n    \n    Integer[] memo = new Integer[n];\n    return dfs(jobs, 0, memo);\n}\n\nprivate int dfs(Job[] jobs, int idx, Integer[] memo) {\n    if (idx >= jobs.length) return 0;\n    if (memo[idx] != null) return memo[idx];\n    \n    // Option 1: Skip current job\n    int skip = dfs(jobs, idx + 1, memo);\n    \n    // Option 2: Take current job, find next available index via binary search\n    int nextIdx = findNextJob(jobs, idx);\n    int take = jobs[idx].profit + dfs(jobs, nextIdx, memo);\n    \n    return memo[idx] = Math.max(skip, take);\n}\n\nprivate int findNextJob(Job[] jobs, int currentIdx) {\n    int low = currentIdx + 1, high = jobs.length - 1;\n    int ans = jobs.length;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (jobs[mid].start >= jobs[currentIdx].end) {\n            ans = mid;\n            high = mid - 1;\n        } else {\n            low = mid + 1;\n        }\n    }\n    return ans;\n}\n\nprivate static class Job {\n    int start, end, profit;\n    Job(int start, int end, int profit) {\n        this.start = start;\n        this.end = end;\n        this.profit = profit;\n    }\n}",
        },
      ],
    },
  ],
  "Day 43": [
    {
      problem: "Reverse Integer",
      link: "https://neetcode.io/solutions/reverse-integer",
      approaches: [
        {
          name: "Modulo and Digit Shift",
          timeComplexity: "O(log10(n))",
          spaceComplexity: "O(1)",
          explanation:
            "Peel off the last digit of the integer iteratively using the modulo operator (`% 10`). Append it to the `reverse` tracker by shifting its existing values left (`reverse * 10`) before reducing the original number via integer division.",
          code: "int value = 901;\nint reverse = 0;\nwhile(value != 0){\n    int digit = value % 10;\n    reverse = reverse * 10 + digit;\n    value = value / 10;\n}\nSystem.out.println(reverse);",
        },
      ],
    },
    {
      problem: "Counting Bits",
      link: "https://neetcode.io/solutions/counting-bits",
      approaches: [
        {
          name: "Dynamic Programming (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          explanation:
            "Use the relation that the number of bits in i is the same as i/2 (i >> 1) plus 1 if i is odd (i & 1).",
          code: "public int[] countBits(int n) {\n    int[] dp = new int[n + 1];\n    for (int i = 1; i <= n; i++) {\n        dp[i] = dp[i >> 1] + (i & 1);\n    }\n    return dp;\n}",
        },
      ],
    },
    {
      problem: "Reverse Bits",
      link: "https://neetcode.io/solutions/reverse-bits",
      approaches: [
        {
          name: "Bit Manipulation (Optimal)",
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
          explanation:
            "Iterate 32 times. In each step, shift the result to the left to make room, take the last bit of 'n' using (n & 1), and add it to the result. Then shift 'n' to the right.",
          code: "public int reverseBits(int n) {\n    int result = 0;\n    for (int i = 0; i < 32; i++) {\n        result = (result << 1) | (n & 1);\n        n >>>= 1;\n    }\n    return result;\n}",
        },
      ],
    },
  ],
  "Day 44": [
    {
      problem: "Trapping Rain Water II",
      link: "https://neetcode.io/solutions/trapping-rain-water-ii",
      approaches: [
        {
          name: "PriorityQueue Min-Heap Boundary Shrinking (Optimal)",
          timeComplexity: "O(M * N * log(M * N))",
          spaceComplexity: "O(M * N)",
          explanation:
            "Think of this as a spillover simulation from the outside inward. First, push all outer boundary cells of the grid into a Minimum Priority Queue and mark them as visited, since boundary cells can never hold water. Pop the cell with the lowest elevation from the heap. Check its 4 unvisited neighbors. If a neighbor is shorter than the popped cell's height, it will trap water equal to the difference. Update that neighbor's effective spill height to the maximum of its own height and the current boundary height, then push it into the heap. Repeat until all cells are visited.",
          code: "public int trapRainWater(int[][] heightMap) {\n    if (heightMap == null || heightMap.length <= 2 || heightMap[0].length <= 2) return 0;\n    \n    int m = heightMap.length;\n    int n = heightMap[0].length;\n    PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a[2], b[2]));\n    boolean[][] visited = new boolean[m][n];\n    \n    // Push all boundary cells into the min-heap\n    for (int r = 0; r < m; r++) {\n        for (int c = 0; c < n; c++) {\n            if (r == 0 || r == m - 1 || c == 0 || c == n - 1) {\n                minHeap.offer(new int[]{r, c, heightMap[r][c]});\n                visited[r][c] = true;\n            }\n        }\n    }\n    \n    int trappedWater = 0;\n    int[][] dirs = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};\n    \n    while (!minHeap.isEmpty()) {\n        int[] curr = minHeap.poll();\n        int r = curr[0], c = curr[1], height = curr[2];\n        \n        for (int[] d : dirs) {\n            int nr = r + d[0];\n            int nc = c + d[1];\n            \n            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {\n                visited[nr][nc] = true;\n                // Water trapped is the boundary height minus neighbor's native height\n                trappedWater += Math.max(0, height - heightMap[nr][nc]);\n                // The next cell's effective wall height is bounded by the max seen\n                minHeap.offer(new int[]{nr, nc, Math.max(heightMap[nr][nc], height)});\n            }\n        }\n    }\n    return trappedWater;\n}",
        },
      ],
    },
    {
      problem: "Median of Two Sorted Arrays",
      link: "https://neetcode.io/solutions/median-of-two-sorted-arrays",
      approaches: [
        {
          name: "Binary Search on Partition Sizes (Optimal)",
          timeComplexity: "O(log(min(M, N)))",
          spaceComplexity: "O(1)",
          explanation:
            "To achieve logarithmic time, perform a binary search on the smaller array to find a valid partition point. Let the partition split both arrays into a combined left half and right half. For a partition to be correct, the largest element in the left half of array A must be smaller than or equal to the smallest element in the right half of array B (A_left <= B_right), and vice-versa (B_left <= A_right). If the partition is correct, calculate the median using the maximum of the left elements and the minimum of the right elements depending on whether the combined size is odd or even. If a check fails, shift the binary search range appropriately.",
          code: "public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n    int[] A = nums1;\n    int[] B = nums2;\n    int total = A.length + B.length;\n    int half = (total + 1) / 2;\n    \n    // Ensure binary search is performed on the smaller array for O(log(min(M,N)))\n    if (A.length > B.length) {\n        int[] temp = A;\n        A = B;\n        B = temp;\n    }\n    \n    int l = 0, r = A.length;\n    while (l <= r) {\n        int i = l + (r - l) / 2; // Partition index for A\n        int j = half - i;        // Partition index for B\n        \n        int A_left = (i > 0) ? A[i - 1] : Integer.MIN_VALUE;\n        int A_right = (i < A.length) ? A[i] : Integer.MAX_VALUE;\n        int B_left = (j > 0) ? B[j - 1] : Integer.MIN_VALUE;\n        int B_right = (j < B.length) ? B[j] : Integer.MAX_VALUE;\n        \n        // Partition is valid\n        if (A_left <= B_right && B_left <= A_right) {\n            if (total % 2 != 0) {\n                return Math.max(A_left, B_left);\n            }\n            return (Math.max(A_left, B_left) + Math.min(A_right, B_right)) / 2.0;\n        } else if (A_left > B_right) {\n            r = i - 1; // Move partition in A to the left\n        } else {\n            l = i + 1; // Move partition in A to the right\n        }\n    }\n    return 0.0;\n}",
        },
      ],
    },
    {
      problem: "Merge Sorted Array",
      link: "https://neetcode.io/solutions/merge-sorted-array",
      approaches: [
        {
          name: "Array Insertion + Sort Sorting",
          timeComplexity: "O((m+n) log(m+n))",
          spaceComplexity: "O(1)",
          explanation:
            "Append all elements of `nums2` directly into the empty trailing slots of `nums1`, then use built-in array sorting primitives to organize the combined values.",
          code: "public void merge(int[] nums1, int m, int[] nums2, int n) {\n    for(int j = 0; j < n; j++){\n        nums1[m + j] = nums2[j];\n    }\n    Arrays.sort(nums1);\n}",
        },
      ],
    },
  ],
  "Day 45": [
    {
      problem: "Sliding Window Maximum",
      link: "https://leetcode.com/problems/sliding-window-maximum/",
      approaches: [
        {
          name: "Monotonic Deque (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(k) where k is the window size",
          explanation:
            "Maintain a double-ended queue (Deque) that stores indices of elements. Ensure that the values corresponding to these indices are always in strictly decreasing order. For each element, clean up the back of the deque by removing indices of all values smaller than the current element. Additionally, clean up the front of the deque to remove elements that have fallen outside the bounds of the current sliding window. The front of the deque will always hold the index of the maximum element for that window.",
          code: "public int[] maxSlidingWindow(int[] nums, int k) {\n    if (nums == null || nums.length == 0) return new int[0];\n    int n = nums.length;\n    int[] result = new int[n - k + 1];\n    int ri = 0;\n    \n    // Deque will store indices\n    Deque<Integer> q = new ArrayDeque<>();\n    \n    for (int i = 0; i < nums.length; i++) {\n        // Remove numbers out of current window range from front\n        if (!q.isEmpty() && q.peek() == i - k) {\n            q.poll();\n        }\n        \n        // Remove smaller numbers in k range from back\n        while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) {\n            q.pollLast();\n        }\n        \n        // Add current element's index\n        q.offer(i);\n        \n        // Start adding to results array once first window is fully covered\n        if (i >= k - 1) {\n            result[ri++] = nums[q.peek()];\n        }\n    }\n    return result;\n}",
        },
        {
          name: "Block Partitioning / Two-Pass Prefix-Suffix Arrays (Alternative)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n) auxiliary memory arrays",
          explanation:
            "Divide the input array into blocks of size k. Precompute two tracking arrays: 'left' and 'right'. 'left[i]' stores the maximum element from the start of its block up to index i (sweeping left-to-right). 'right[i]' stores the maximum element from index i to the end of its block (sweeping right-to-left). For any sliding window spanning from index i to j, the maximum value is simply the maximum of right[i] (max of the suffix in the first block) and left[j] (max of the prefix in the second block).",
          code: "public int[] maxSlidingWindow(int[] nums, int k) {\n    int n = nums.length;\n    if (n == 0 || k == 0) return new int[0];\n    \n    int[] left = new int[n];\n    int[] right = new int[n];\n    \n    // Populate left-to-right block max\n    for (int i = 0; i < n; i++) {\n        if (i % k == 0) {\n            left[i] = nums[i]; // Block start\n        } else {\n            left[i] = Math.max(left[i - 1], nums[i]);\n        }\n    }\n    \n    // Populate right-to-left block max\n    for (int i = n - 1; i >= 0; i--) {\n        if (i == n - 1 || (i + 1) % k == 0) {\n            right[i] = nums[i]; // Block end\n        } else {\n            right[i] = Math.max(right[i + 1], nums[i]);\n        }\n    }\n    \n    int[] result = new int[n - k + 1];\n    for (int i = 0; i <= n - k; i++) {\n        result[i] = Math.max(right[i], left[i + k - 1]);\n    }\n    \n    return result;\n}",
        },
      ],
    },
    {
      problem: "Binary Tree Maximum Path Sum",
      link: "https://neetcode.io/solutions/binary-tree-maximum-path-sum",
      approaches: [
        {
          name: "Recursive DFS (Optimal)",
          timeComplexity: "O(n)",
          spaceComplexity: "O(h)",
          explanation:
            "For every node, calculate the maximum 'gain' it can contribute to a path. A path can 'split' at a node (using both children), which updates the global maximum, but it must return only the best single branch to its parent.",
          code: "int maxSum = Integer.MIN_VALUE;\npublic int maxPathSum(TreeNode root) {\n    dfs(root);\n    return maxSum;\n}\nprivate int dfs(TreeNode node) {\n    if (node == null) return 0;\n    int left = Math.max(0, dfs(node.left));\n    int right = Math.max(0, dfs(node.right));\n    maxSum = Math.max(maxSum, node.val + left + right);\n    return node.val + Math.max(left, right);\n}",
        },
      ],
    },
    {
      problem: "Minimum Window Substring",
      link: "https://neetcode.io/solutions/minimum-window-substring",
      approaches: [
        {
          name: "Sliding Window (Optimal)",
          timeComplexity: "O(n + m)",
          spaceComplexity: "O(m)",
          explanation:
            "Use two frequency maps: one for characters required and one for the current window. Expand the right pointer until all requirements are met, then shrink the left pointer as much as possible while maintaining validity.",
          code: 'public String minWindow(String s, String t) {\n    Map<Character, Integer> need = new HashMap<>(), window = new HashMap<>();\n    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);\n    int left=0, right=0, valid=0, start=0, minLen=Integer.MAX_VALUE;\n    while (right < s.length()) {\n        char c = s.charAt(right++);\n        if (need.containsKey(c)) {\n            window.merge(c, 1, Integer::sum);\n            if (window.get(c).equals(need.get(c))) valid++;\n        }\n        while (valid == need.size()) {\n            if (right - left < minLen) { start = left; minLen = right - left; }\n            char d = s.charAt(left++);\n            if (need.containsKey(d)) {\n                if (window.get(d).equals(need.get(d))) valid--;\n                window.merge(d, -1, Integer::sum);\n            }\n        }\n    }\n    return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);\n}',
        },
      ],
    },
  ],
};
