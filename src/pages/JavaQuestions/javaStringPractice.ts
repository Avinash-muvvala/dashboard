export type JavaStringDifficulty = "Easy" | "Medium" | "Hard";

export type JavaStringQuestion = {
  id: number;
  title: string;
  category: string;
  difficulty: JavaStringDifficulty;
  prompt: string;
  hint: string;
  example: string;
};

export const javaStringQuestions: JavaStringQuestion[] = [
  {
    id: 1,
    title: "Reverse a string",
    category: "String basics",
    difficulty: "Easy",
    prompt: "Return the characters of a string in reverse order.",
    hint: "Try StringBuilder.reverse(), or iterate from the last index to the first.",
    example: 'Input: "hello" -> Output: "olleh"',
  },
  {
    id: 2,
    title: "Check whether a string is a palindrome",
    category: "String basics",
    difficulty: "Easy",
    prompt: "Determine whether a string reads the same forward and backward.",
    hint: "Compare characters from both ends and move toward the center. Decide whether case and spaces should matter.",
    example: 'Input: "level" -> Output: true',
  },
  {
    id: 3,
    title: "Count character occurrences",
    category: "Frequency and duplicates",
    difficulty: "Easy",
    prompt: "Count how many times each character appears in a string.",
    hint: "Use a Map<Character, Integer> and increment the count for each character.",
    example: 'Input: "avinash" -> Output includes a -> 2',
  },
  {
    id: 4,
    title: "Find duplicate characters",
    category: "Frequency and duplicates",
    difficulty: "Easy",
    prompt:
      "Print each character that occurs more than once, without printing it repeatedly.",
    hint: "Track characters seen so far in one set and repeated characters in another.",
    example: 'Input: "sasasa" -> Output: [s, a]',
  },
  {
    id: 5,
    title: "Find duplicate words",
    category: "Frequency and duplicates",
    difficulty: "Easy",
    prompt:
      "Find repeated words in a sentence. Treat words with different casing as the same.",
    hint: "Normalize the sentence to lowercase, split on whitespace, and track words with sets.",
    example: 'Input: "the cat and the cat" -> Output: [the, cat]',
  },
  {
    id: 6,
    title: "Remove duplicate characters",
    category: "Frequency and duplicates",
    difficulty: "Easy",
    prompt:
      "Remove repeated characters while preserving the order of their first occurrence.",
    hint: "A LinkedHashSet preserves insertion order. Build a String from the unique characters.",
    example: 'Input: "banana" -> Output: "ban"',
  },
  {
    id: 7,
    title: "Check whether two strings are anagrams",
    category: "String comparison",
    difficulty: "Easy",
    prompt:
      "Determine whether two strings contain the same characters with the same frequencies.",
    hint: "Normalize case and optional whitespace, then compare character-frequency maps or sorted character arrays.",
    example: 'Input: "listen", "silent" -> Output: true',
  },
  {
    id: 8,
    title: "Find the first non-repeating character",
    category: "Frequency and duplicates",
    difficulty: "Medium",
    prompt:
      "Return the first character in the string whose total frequency is one.",
    hint: "Count characters in insertion order, then scan the string or ordered map for a count of one.",
    example: 'Input: "abbaccadssac" -> Output: d',
  },
  {
    id: 9,
    title: "Check whether a string contains only digits",
    category: "Validation and cleanup",
    difficulty: "Easy",
    prompt:
      "Return true only when the non-empty input contains digits and no other characters.",
    hint: "Use Character.isDigit for each character, or match the entire string with the regular expression \\d+.",
    example: 'Input: "12045" -> Output: true',
  },
  {
    id: 10,
    title: "Count vowels and consonants",
    category: "Character processing",
    difficulty: "Easy",
    prompt:
      "Count vowels and consonants in a string. Ignore spaces, digits, and punctuation.",
    hint: "Check Character.isLetter first, then compare the lowercase character with a, e, i, o, and u.",
    example: 'Input: "avinash! 2" -> Output: 3 vowels, 4 consonants',
  },
  {
    id: 11,
    title: "Check whether one string is a rotation of another",
    category: "String comparison",
    difficulty: "Medium",
    prompt:
      "Determine whether the second string is a rotation of the first, using all characters exactly once.",
    hint: "The strings must have equal lengths. Check whether the second string occurs in the first string concatenated with itself.",
    example: 'Input: "waterbottle", "erbottlewat" -> Output: true',
  },
  {
    id: 12,
    title: "Find the longest word in a sentence",
    category: "Words and sentences",
    difficulty: "Easy",
    prompt:
      "Return the longest word in a sentence. If there is a tie, return the first one.",
    hint: "Split on whitespace and keep the longest word seen so far.",
    example: 'Input: "Java has useful collections" -> Output: "collections"',
  },
  {
    id: 13,
    title: "Convert a word to title case",
    category: "Case conversion",
    difficulty: "Easy",
    prompt:
      "Capitalize the first character of a word and make the remaining characters lowercase.",
    hint: "Handle an empty string before accessing charAt(0). Use Locale.ROOT for consistent lowercase conversion.",
    example: 'Input: "hELLO" -> Output: "Hello"',
  },
  {
    id: 14,
    title: "Convert every word in a sentence to title case",
    category: "Case conversion",
    difficulty: "Medium",
    prompt:
      "Capitalize the first character of every word and lowercase the remaining characters.",
    hint: "Split into words, transform each word, then join them with spaces. Consider how to handle repeated whitespace.",
    example: 'Input: "hello this is java" -> Output: "Hello This Is Java"',
  },
  {
    id: 15,
    title: "Generate all unique permutations of a string",
    category: "Combinatorial strings",
    difficulty: "Hard",
    prompt:
      "Print every distinct arrangement of the input characters. Do not print duplicate permutations when characters repeat.",
    hint: "Use backtracking with a used-character array. Sort the characters first to skip duplicate choices at each recursion depth.",
    example: 'Input: "aab" -> Output: [aab, aba, baa]',
  },
  {
    id: 16,
    title: "Find word frequencies in a sentence",
    category: "Frequency and duplicates",
    difficulty: "Easy",
    prompt:
      "Count each word in a sentence without treating letter case as different.",
    hint: "Normalize case, split on whitespace, and update a Map<String, Integer>.",
    example:
      'Input: "the cat and the cat" -> Output includes the -> 2, cat -> 2',
  },
  {
    id: 17,
    title: "Iterate through characters without toCharArray()",
    category: "Character processing",
    difficulty: "Easy",
    prompt:
      "Print each character in a string on its own line without calling toCharArray().",
    hint: "Use a loop from zero to length() - 1 and read each character with charAt(index).",
    example: 'Input: "Java" -> Output: J, a, v, a (one per line)',
  },
  {
    id: 18,
    title: "Remove non-alphabetic characters",
    category: "Validation and cleanup",
    difficulty: "Easy",
    prompt:
      "Remove every character that is not a letter, while preserving spaces between words.",
    hint: "Use Character.isLetter and Character.isWhitespace, or a regular expression that keeps letters and whitespace.",
    example: 'Input: "Java 17!" -> Output: "Java "',
  },
  {
    id: 19,
    title: "Convert lowercase to uppercase without toUpperCase()",
    category: "Case conversion",
    difficulty: "Medium",
    prompt:
      "Convert lowercase English ASCII letters to uppercase without using toUpperCase(). Leave other characters unchanged.",
    hint: "For characters between 'a' and 'z', subtract the difference between 'a' and 'A'.",
    example: 'Input: "java 17" -> Output: "JAVA 17"',
  },
  {
    id: 20,
    title: "Convert uppercase to lowercase without toLowerCase()",
    category: "Case conversion",
    difficulty: "Medium",
    prompt:
      "Convert uppercase English ASCII letters to lowercase without using toLowerCase(). Leave other characters unchanged.",
    hint: "For characters between 'A' and 'Z', add the difference between 'a' and 'A'.",
    example: 'Input: "JAVA 17" -> Output: "java 17"',
  },
  {
    id: 21,
    title: "Reverse the words in a sentence",
    category: "Words and sentences",
    difficulty: "Easy",
    prompt:
      "Reverse the order of words in a sentence while keeping each word's spelling unchanged.",
    hint: "Split the sentence into words and iterate over the array from the last index to the first.",
    example: 'Input: "my name is Ava" -> Output: "Ava is name my"',
  },
  {
    id: 22,
    title: "Check whether strings are at most one edit apart",
    category: "String comparison",
    difficulty: "Hard",
    prompt:
      "Return true when two strings are equal or can be made equal with at most one insertion, deletion, or replacement.",
    hint: "If lengths differ by more than one, return false. Scan both strings with two indices and allow only one mismatch or skipped character.",
    example: 'Input: "pale", "bale" -> Output: true',
  },
  {
    id: 23,
    title: "Compress consecutive repeated characters",
    category: "Character processing",
    difficulty: "Medium",
    prompt:
      "Replace each run of repeated characters with the character followed by its count.",
    hint: "Track the current run length and append it when the character changes or the scan reaches the end.",
    example: 'Input: "aaabbcc" -> Output: "a3b2c2"',
  },
  {
    id: 24,
    title: "Print all substrings of a string",
    category: "Substring problems",
    difficulty: "Medium",
    prompt: "Print every non-empty contiguous substring of the input string.",
    hint: "Use two nested loops for start and exclusive end indices, then call substring(start, end).",
    example: 'Input: "avi" -> Output includes "a", "av", "avi", "v", "vi", "i"',
  },
  {
    id: 25,
    title: "Find the longest common prefix",
    category: "Substring problems",
    difficulty: "Medium",
    prompt:
      "Return the longest prefix shared by every string in an array. Return an empty string if none is shared.",
    hint: "Compare characters by index across all strings, or sort the array and compare its first and last values.",
    example: 'Input: ["geeks", "geek", "geezer"] -> Output: "gee"',
  },
  {
    id: 26,
    title: "Validate a simple email format",
    category: "Validation and cleanup",
    difficulty: "Medium",
    prompt:
      "Check whether an address has non-empty text before and after a single @ symbol and contains a dot after the @.",
    hint: "Use a simple regular expression for practice. Full email validation requires more than a single regex.",
    example: 'Input: "person@example.com" -> Output: true',
  },
  {
    id: 27,
    title: "Convert camelCase to snake_case",
    category: "Case conversion",
    difficulty: "Medium",
    prompt:
      "Convert a camelCase identifier to snake_case, including acronym boundaries such as HTTPRequest.",
    hint: "Insert an underscore before an uppercase letter when preceded by lowercase or when it ends an uppercase run before a lowercase letter.",
    example: 'Input: "HTTPRequest" -> Output: "http_request"',
  },
  {
    id: 28,
    title: "Remove consecutive duplicate characters",
    category: "Character processing",
    difficulty: "Easy",
    prompt:
      "Remove adjacent repeated characters while keeping non-consecutive repetitions.",
    hint: "Append a character only when it is the first character or differs from the previous character.",
    example: 'Input: "geeksforgeeks" -> Output: "geksforgeks"',
  },
  {
    id: 29,
    title: "Convert a numeric string to an integer manually",
    category: "Parsing",
    difficulty: "Medium",
    prompt:
      "Convert a non-negative decimal digit string to an int without using parseInt() or Integer.valueOf().",
    hint: "For each digit, multiply the accumulated result by 10 and add the numeric value of the next digit.",
    example: 'Input: "2527" -> Output: 2527',
  },
];
