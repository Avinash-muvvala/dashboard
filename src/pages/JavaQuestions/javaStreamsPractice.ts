import type { QuestionItem } from "./JavaQuestions";

export interface JavaStreamsQuestion extends QuestionItem {
  id: number;
  expectedCollector: string;
  sampleInput?: string;
  expectedOutput?: string;
  answerCode?: string;
}

type RawStreamsQuestion = Pick<
  QuestionItem,
  "question" | "pattern" | "hint"
> & {
  expectedCollector?: string;
  answerCode?: string;
};

const rawQuestions: RawStreamsQuestion[] = [
  {
    question: "Group employees by department.",
    pattern: "Pattern 1: Group by key",
    hint: "Use groupingBy with the department as the key. It creates one bucket per department.",
  },
  {
    question: "Count employees per department.",
    pattern: "Pattern 2: Group and count",
    hint: "Use groupingBy with counting as the downstream collector.",
  },
  {
    question: "Find the average salary per department.",
    pattern: "Pattern 3: Group and aggregate",
    hint: "Compose groupingBy with averagingDouble on salary.",
  },
  {
    question: "Find the highest-paid employee in each department.",
    pattern: "Pattern 3: Group and aggregate",
    hint: "Group by department and use maxBy with a salary comparator downstream.",
  },
  {
    question: "Find the total salary cost per department.",
    pattern: "Pattern 3: Group and aggregate",
    hint: "Group by department and use summingDouble on salary downstream.",
  },
  {
    question: "Group words by their length.",
    pattern: "Pattern 1: Group by key",
    hint: "Use groupingBy with String::length as the classifier.",
  },
  {
    question: "Group employees by decade of age (20s, 30s, 40s, ...).",
    pattern: "Pattern 1: Group by key",
    hint: "Compute an age-decade key (age / 10 * 10), then group by that key.",
  },
  {
    question: "Find the department with the most employees.",
    pattern: "Pattern 3: Group and aggregate",
    hint: "Count employees per department, then select the map entry with the largest count.",
  },
  {
    question: "Group students by grade (A/B/C) computed from their score.",
    pattern: "Pattern 1: Group by key",
    hint: "Make the score-to-grade function the groupingBy classifier.",
  },
  {
    question:
      "Count how many employees are above and below the company average salary.",
    pattern: "Pattern 3: Group and aggregate",
    hint: "Compute the average first, then compare each salary with it and count each side.",
  },
  {
    question: "Find the first repeating character in a string.",
    pattern: "Pattern 4: Preserve encounter order",
    hint: "Count characters into a LinkedHashMap, then find the first entry with a count greater than one.",
  },
  {
    question: "Find the first non-repeating character in a string.",
    pattern: "Pattern 4: Preserve encounter order",
    hint: "Count characters into a LinkedHashMap, then find the first entry with a count of one.",
  },
  {
    question:
      "Group numbers by parity (even/odd), preserving first-seen order within each group.",
    pattern: "Pattern 4: Preserve encounter order",
    hint: "Use groupingBy with a LinkedHashMap supplier; choose the key from whether a number is even or odd.",
  },
  {
    question: "Build a map of employee id to employee name.",
    pattern: "Pattern 5: Lookup with toMap",
    hint: "Use toMap with the id as key and name as value. Consider what duplicate ids should do.",
  },
  {
    question:
      "Build a map of department to total salary, handling duplicate departments with a merge function.",
    pattern: "Pattern 5: Lookup with toMap",
    hint: "Use toMap with department and salary mappings, and Double::sum as the merge function.",
  },
  {
    question:
      "Given two equal-length lists (names and ages), build a Map<String, Integer>.",
    pattern: "Pattern 5: Lookup with toMap",
    hint: "Pair elements by index, then collect each name-age pair into a map.",
  },
  {
    question:
      "Convert employees to Map<Integer, Employee> and detect duplicate ids (the conversion should throw).",
    pattern: "Pattern 5: Lookup with toMap",
    hint: "Use toMap with id as the key and the employee as the value; omit a merge function so duplicates throw.",
  },
  {
    question: "Partition employees into those earning above and below 60000.",
    pattern: "Pattern 6: Partition into two groups",
    hint: "Use partitioningBy with the salary > 60000 predicate.",
  },
  {
    question: "Partition a list of integers into primes and non-primes.",
    pattern: "Pattern 6: Partition into two groups",
    hint: "Write an isPrime predicate and pass it to partitioningBy.",
  },
  {
    question: "Partition words into palindromes and non-palindromes.",
    pattern: "Pattern 6: Partition into two groups",
    hint: "Compare each word with its reverse inside a partitioningBy predicate.",
  },
  {
    question:
      "Flatten a List<List<Integer>> into one sorted list with duplicates removed.",
    pattern: "Pattern 7: Flatten nested collections",
    hint: "Use flatMap(List::stream), then distinct and sorted before collecting.",
  },
  {
    question:
      "Get the distinct set of all skills across employees, where each employee has a List<String> skills.",
    pattern: "Pattern 7: Flatten nested collections",
    hint: "Map each employee to their skills stream with flatMap, then distinct and collect to a set.",
  },
  {
    question:
      "Flatten a Map<String, List<Employee>> into one list sorted by salary.",
    pattern: "Pattern 7: Flatten nested collections",
    hint: "Stream the map values, flatMap their employee lists, then sort by salary.",
  },
  {
    question:
      "Split a sentence into words, then flatten into all distinct characters used.",
    pattern: "Pattern 7: Flatten nested collections",
    hint: "Turn words into character streams with flatMap, then apply distinct.",
  },
  {
    question: "Find the second-highest salary.",
    pattern: "Pattern 8: Top-N and kth values",
    hint: "Remove duplicate salaries, sort descending, skip one, and take the next value.",
  },
  {
    question: "Find the third-lowest score in a list of exam scores.",
    pattern: "Pattern 8: Top-N and kth values",
    hint: "Sort distinct scores ascending, skip two, and take the next value.",
  },
  {
    question: "Find the top three most frequent words.",
    pattern: "Pattern 8: Top-N and kth values",
    hint: "Count words into a map, then sort entries by count descending and limit to three.",
  },
  {
    question: "Find the youngest employee in each department.",
    pattern: "Pattern 8: Top-N and kth values",
    hint: "Group by department and select the employee with minimum age in each group.",
  },
  {
    question: "Find the total number of characters across all words.",
    pattern: "Pattern 9: Reduction",
    hint: "Map words to their lengths and sum with mapToInt.",
  },
  {
    question: "Find the longest word in a list of strings.",
    pattern: "Pattern 9: Reduction",
    hint: "Use max with a comparator based on String::length.",
  },
  {
    question:
      "Concatenate employee names with reduce (not joining), then explain why joining is better here.",
    pattern: "Pattern 9: Reduction",
    hint: "Reduce from an empty string; then compare with Collectors.joining, which is clearer and avoids repeated string concatenation.",
  },
  {
    question: "Find the product of all numbers in a list using reduce.",
    pattern: "Pattern 9: Reduction",
    hint: "Use 1 as the identity value and multiply each number into the accumulator.",
  },
  {
    question:
      "Find the employee with the maximum (salary - age) using a custom Comparator.",
    pattern: "Pattern 9: Reduction",
    hint: "Use max with a comparator whose key is salary minus age.",
  },
  {
    question:
      "Sort employees by department, then by salary descending within each department.",
    pattern: "Pattern 10: Sort by multiple fields",
    hint: "Chain comparing department with thenComparing salary in reverse order.",
  },
  {
    question: "Sort strings by length, then alphabetically for ties.",
    pattern: "Pattern 10: Sort by multiple fields",
    hint: "Build a comparator by length, then chain natural string order.",
  },
  {
    question:
      "Sort a Map<String, List<Employee>> by the size of its value lists, descending.",
    pattern: "Pattern 10: Sort by multiple fields",
    hint: "Stream the map entries and compare each value list's size in reverse order.",
  },
  {
    question:
      "Return distinct employees by id when equals() is not overridden.",
    pattern: "Pattern 11: Distinct by key",
    hint: "Collect to a map keyed by id, keep the first value on collisions, and use LinkedHashMap to preserve encounter order.",
  },
  {
    question:
      "Given orders with a customerId, keep the first order seen for each customer.",
    pattern: "Pattern 11: Distinct by key",
    hint: "Use toMap keyed by customerId with a merge function that keeps the existing value.",
  },
  {
    question:
      "Find the first repeating character again; justify in one line why this is not a good pure-stream candidate.",
    pattern: "Pattern 12: Recognize stateful scans",
    hint: "A first-seen scan needs prior-element state; prefer a loop or ordered frequency map over mutable state in a stream filter.",
  },
  {
    question:
      "Compute a running total (cumulative sum) of a list of numbers; explain why streams alone do not do this cleanly without external state.",
    pattern: "Pattern 12: Recognize stateful scans",
    hint: "A running total depends on previous elements; use a loop or a purpose-built collector rather than a stateful lambda.",
  },
  {
    question:
      "Find the longest substring without repeating characters; identify why this needs a loop/sliding window, not a stream one-liner.",
    pattern: "Pattern 12: Recognize stateful scans",
    hint: "The sliding window updates based on previously seen characters, so an explicit loop is the clearer tool.",
  },
  {
    question: "Join employee names into 'Alice, Bob, Carol'.",
    pattern: "Pattern 13: String joining",
    hint: "Map employees to names and collect with joining using a comma-space delimiter.",
  },
  {
    question:
      "Join department names into '[HR | Eng | Sales]' using a custom prefix, suffix, and delimiter.",
    pattern: "Pattern 13: String joining",
    hint: "Use joining with delimiter ' | ', prefix '[', and suffix ']'.",
  },
  {
    question: "Check whether any employee earns more than 100000.",
    pattern: "Pattern 14: Match and count",
    hint: "Use anyMatch with the salary > 100000 predicate.",
  },
  {
    question: "Check whether all employees earn above 30000.",
    pattern: "Pattern 14: Match and count",
    hint: "Use allMatch with the salary > 30000 predicate.",
  },
  {
    question: "Count how many words start with a vowel.",
    pattern: "Pattern 14: Match and count",
    hint: "Filter by whether the first character is a vowel, then count.",
  },
  {
    question:
      "Get minimum, maximum, average, and count of salaries in one pass.",
    pattern: "Pattern 15: Summary statistics",
    hint: "Map salaries to a DoubleStream and call summaryStatistics once.",
  },
  {
    question: "Get summary statistics of word lengths.",
    pattern: "Pattern 15: Summary statistics",
    hint: "Map words to their integer lengths and collect IntSummaryStatistics.",
  },
  {
    question:
      "Given int[] arr, find its sum and average without boxing to Integer.",
    pattern: "Pattern 16: Primitive streams",
    hint: "Use Arrays.stream(int[]) to get an IntStream; use its numeric operations without boxing.",
  },
  {
    question: "Return department names as a sorted TreeSet with no duplicates.",
    pattern: "Pattern 17: Collect into a structure",
    hint: "Map employees to department names and collect with toCollection(TreeSet::new).",
  },
  {
    question: "Find students whose first name starts with A, ignoring case.",
    pattern: "Pattern 14: Match and filter",
    hint: "Filter by a lower-cased name prefix.",
    expectedCollector: "filter + toList()",
    answerCode:
      'List<Student> result = students.stream().filter(student -> student.getName().toLowerCase(Locale.ROOT).startsWith("a")).toList();\nSystem.out.println(result);',
  },
  {
    question: "Group students by department.",
    pattern: "Pattern 1: Group by key",
    hint: "Use the department as the groupingBy classifier.",
    expectedCollector: "groupingBy(Student::getDepartment)",
    answerCode:
      "Map<String, List<Student>> grouped = students.stream().collect(Collectors.groupingBy(Student::getDepartment));\nSystem.out.println(grouped);",
  },
  {
    question: "Find the total number of students.",
    pattern: "Pattern 14: Match and count",
    hint: "Use count() directly on the student stream.",
    expectedCollector: "count()",
    answerCode:
      "long count = students.stream().count();\nSystem.out.println(count);",
  },
  {
    question: "Return department names alphabetically without duplicates.",
    pattern: "Pattern 17: Collect into a structure",
    hint: "Map to department, then distinct and sort.",
    expectedCollector: "map + distinct + sorted",
    answerCode:
      "List<String> departments = students.stream().map(Student::getDepartment).distinct().sorted().toList();\nSystem.out.println(departments);",
  },
  {
    question: "Count students in each department.",
    pattern: "Pattern 2: Group and count",
    hint: "Use groupingBy with counting as the downstream collector.",
    expectedCollector: "groupingBy(Student::getDepartment, counting())",
    answerCode:
      "Map<String, Long> counts = students.stream().collect(Collectors.groupingBy(Student::getDepartment, Collectors.counting()));\nSystem.out.println(counts);",
  },
  {
    question: "Find students whose rank is less than 3.",
    pattern: "Pattern 14: Match and filter",
    hint: "Filter using getRank() < 3.",
    expectedCollector: "filter + toList()",
    answerCode:
      "List<Student> result = students.stream().filter(student -> student.getRank() < 3).toList();\nSystem.out.println(result);",
  },
  {
    question: "Find students whose rank is between 4 and 5 inclusive.",
    pattern: "Pattern 14: Match and filter",
    hint: "Both endpoints are included, so use >= 4 and <= 5.",
    expectedCollector: "filter + toList()",
    answerCode:
      "List<Student> result = students.stream().filter(student -> student.getRank() >= 4 && student.getRank() <= 5).toList();\nSystem.out.println(result);",
  },
  {
    question: "Find the average rank of male and female students.",
    pattern: "Pattern 3: Group and aggregate",
    hint: "Group by gender and average the integer rank.",
    expectedCollector:
      "groupingBy(Student::getGender, averagingInt(Student::getRank))",
    answerCode:
      "Map<String, Double> averageByGender = students.stream().collect(Collectors.groupingBy(Student::getGender, Collectors.averagingInt(Student::getRank)));\nSystem.out.println(averageByGender);",
  },
  {
    question: "Find students who live in KKL and sort them by name.",
    pattern: "Pattern 10: Sort by multiple fields",
    hint: "Filter the city case-insensitively, then sort by Student::getName.",
    expectedCollector:
      "filter + sorted(Comparator.comparing(Student::getName))",
    answerCode:
      'List<Student> result = students.stream().filter(student -> student.getCity().equalsIgnoreCase("kkl")).sorted(Comparator.comparing(Student::getName)).toList();\nSystem.out.println(result);',
  },
  {
    question: "Find the first student whose rank is 2.",
    pattern: "Pattern 8: Top-N and kth values",
    hint: "Filter by rank and use findFirst; more than one student may share rank 2.",
    expectedCollector: "filter + findFirst()",
    answerCode:
      "Student result = students.stream().filter(student -> student.getRank() == 2).findFirst().orElseThrow();\nSystem.out.println(result);",
  },
  {
    question: "Display the student with the second-highest mark.",
    pattern: "Pattern 8: Top-N and kth values",
    hint: "Sort by marks descending, skip the highest, and take the next student.",
    expectedCollector:
      "sorted(Comparator.comparingInt(Student::getMarks).reversed()) + skip(1)",
    answerCode:
      "Student result = students.stream().sorted(Comparator.comparingInt(Student::getMarks).reversed()).skip(1).findFirst().orElseThrow();\nSystem.out.println(result);",
  },
  {
    question: "Sort students by name, then by age.",
    pattern: "Pattern 10: Sort by multiple fields",
    hint: "Chain comparing by name with thenComparingInt by age.",
    expectedCollector:
      "sorted(Comparator.comparing(Student::getName).thenComparingInt(Student::getAge))",
    answerCode:
      "List<Student> result = students.stream().sorted(Comparator.comparing(Student::getName).thenComparingInt(Student::getAge)).toList();\nSystem.out.println(result);",
  },
  {
    question: "Find the string with the minimum length.",
    pattern: "Pattern 8: Top-N and kth values",
    hint: "Use min with a comparator based on String::length.",
    expectedCollector: "min(Comparator.comparingInt(String::length))",
    answerCode:
      "String result = strings.stream().min(Comparator.comparingInt(String::length)).orElseThrow();\nSystem.out.println(result);",
  },
  {
    question: "Sort students by rank in ascending order.",
    pattern: "Pattern 10: Sort by multiple fields",
    hint: "Use sorted with Comparator.comparingInt(Student::getRank).",
    expectedCollector: "sorted(Comparator.comparingInt(Student::getRank))",
    answerCode:
      "List<Student> result = students.stream().sorted(Comparator.comparingInt(Student::getRank)).toList();\nSystem.out.println(result);",
  },
  {
    question:
      "Return each duplicated integer once, preserving first-seen order.",
    pattern: "Pattern 4: Preserve encounter order",
    hint: "Count with a LinkedHashMap, then keep entries whose count exceeds one.",
    expectedCollector:
      "groupingBy(identity(), LinkedHashMap::new, counting()) + filter",
    answerCode:
      "List<Integer> result = numbers.stream().collect(Collectors.groupingBy(Function.identity(), LinkedHashMap::new, Collectors.counting())).entrySet().stream().filter(entry -> entry.getValue() > 1).map(Map.Entry::getKey).toList();\nSystem.out.println(result);",
  },
  {
    question: "Find all prime numbers in a list of integers.",
    pattern: "Pattern 14: Match and filter",
    hint: "Filter values greater than one whose divisors from 2 through sqrt(n) all fail to divide evenly.",
    expectedCollector: "filter + IntStream.rangeClosed(...).allMatch(...) ",
    answerCode:
      "List<Integer> result = numbers.stream().filter(number -> number > 1 && IntStream.rangeClosed(2, (int) Math.sqrt(number)).allMatch(divisor -> number % divisor != 0)).toList();\nSystem.out.println(result);",
  },
  {
    question: "Find all even numbers in a list.",
    pattern: "Pattern 14: Match and filter",
    hint: "Filter values whose remainder after division by two is zero.",
    expectedCollector: "filter(number -> number % 2 == 0)",
    answerCode:
      "List<Integer> result = numbers.stream().filter(number -> number % 2 == 0).toList();\nSystem.out.println(result);",
  },
  {
    question: "Find all odd numbers in a list.",
    pattern: "Pattern 14: Match and filter",
    hint: "Filter values whose remainder after division by two is nonzero.",
    expectedCollector: "filter(number -> number % 2 != 0)",
    answerCode:
      "List<Integer> result = numbers.stream().filter(number -> number % 2 != 0).toList();\nSystem.out.println(result);",
  },
  {
    question: "Find the longest string in a list.",
    pattern: "Pattern 8: Top-N and kth values",
    hint: "Use max with a comparator based on String::length.",
    expectedCollector: "max(Comparator.comparingInt(String::length))",
    answerCode:
      'String result = strings.stream().max(Comparator.comparingInt(String::length)).orElse("");\nSystem.out.println(result);',
  },
  {
    question: "Find the second-highest distinct integer.",
    pattern: "Pattern 8: Top-N and kth values",
    hint: "Remove duplicates, sort descending, skip the highest, then take the next value.",
    expectedCollector: "distinct + sorted(reverseOrder()) + skip(1)",
    answerCode:
      "int result = numbers.stream().distinct().sorted(Comparator.reverseOrder()).skip(1).findFirst().orElseThrow();\nSystem.out.println(result);",
  },
  {
    question: "Convert every string in a list to uppercase.",
    pattern: "Pattern 7: Flatten nested collections",
    hint: "Map each string through String::toUpperCase.",
    expectedCollector: "map(String::toUpperCase)",
    answerCode:
      "List<String> result = strings.stream().map(String::toUpperCase).toList();\nSystem.out.println(result);",
  },
  {
    question: "Count the integers greater than 10.",
    pattern: "Pattern 14: Match and count",
    hint: "Filter by n > 10 and count the remaining elements.",
    expectedCollector: "filter + count()",
    answerCode:
      "long count = numbers.stream().filter(number -> number > 10).count();\nSystem.out.println(count);",
  },
  {
    question: "Find the maximum integer in a list.",
    pattern: "Pattern 9: Reduction",
    hint: "Use max with Integer::compareTo.",
    expectedCollector: "max(Integer::compareTo)",
    answerCode:
      "int maximum = numbers.stream().max(Integer::compareTo).orElseThrow();\nSystem.out.println(maximum);",
  },
  {
    question: "Find the sum of all even integers.",
    pattern: "Pattern 16: Primitive streams",
    hint: "Use mapToInt, filter for even values, then sum.",
    expectedCollector: "mapToInt + filter + sum()",
    answerCode:
      "int sum = numbers.stream().mapToInt(Integer::intValue).filter(number -> number % 2 == 0).sum();\nSystem.out.println(sum);",
  },
  {
    question: "Sort a list of integers in reverse order.",
    pattern: "Pattern 10: Sort by multiple fields",
    hint: "Pass Comparator.reverseOrder() to sorted.",
    expectedCollector: "sorted(Comparator.reverseOrder())",
    answerCode:
      "List<Integer> result = numbers.stream().sorted(Comparator.reverseOrder()).toList();\nSystem.out.println(result);",
  },
  {
    question: "Find the frequency of every string in a list.",
    pattern: "Pattern 2: Group and count",
    hint: "Group by Function.identity() and count each group.",
    expectedCollector: "groupingBy(identity(), counting())",
    answerCode:
      "Map<String, Long> frequency = strings.stream().collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));\nSystem.out.println(frequency);",
  },
  {
    question: "Find both the minimum and maximum integer in a list.",
    pattern: "Pattern 15: Summary statistics",
    hint: "Use IntSummaryStatistics to calculate both in one pass.",
    expectedCollector: "mapToInt + summaryStatistics()",
    answerCode:
      'IntSummaryStatistics stats = numbers.stream().mapToInt(Integer::intValue).summaryStatistics();\nSystem.out.println("min = " + stats.getMin() + ", max = " + stats.getMax());',
  },
  {
    question: "Remove duplicates from integers and sort them descending.",
    pattern: "Pattern 8: Top-N and kth values",
    hint: "Apply distinct, then sorted with Comparator.reverseOrder().",
    expectedCollector: "distinct + sorted(reverseOrder())",
    answerCode:
      "List<Integer> result = numbers.stream().distinct().sorted(Comparator.reverseOrder()).toList();\nSystem.out.println(result);",
  },
  {
    question: "Find the product of all non-negative integers.",
    pattern: "Pattern 9: Reduction",
    hint: "Filter for non-negative values and reduce using 1 as the identity.",
    expectedCollector: "filter + reduce(1, multiplication)",
    answerCode:
      "long product = numbers.stream().filter(number -> number >= 0).mapToLong(Integer::longValue).reduce(1L, (left, right) -> left * right);\nSystem.out.println(product);",
  },
  {
    question:
      "Print each student's rank increased by one without mutating students.",
    pattern: "Pattern 7: Map values",
    hint: "Map each student to a display value containing rank + 1.",
    expectedCollector: "map(Student -> rank + 1)",
    answerCode:
      'List<String> result = students.stream().map(student -> student.getName() + ": " + (student.getRank() + 1)).toList();\nSystem.out.println(result);',
  },
  {
    question: "Find the student with the highest rank number.",
    pattern: "Pattern 9: Reduction",
    hint: "Use max with a comparator on Student::getRank.",
    expectedCollector: "max(Comparator.comparingInt(Student::getRank))",
    answerCode:
      "Student result = students.stream().max(Comparator.comparingInt(Student::getRank)).orElseThrow();\nSystem.out.println(result);",
  },
  {
    question: "Find the name of the employee with the third-highest salary.",
    pattern: "Pattern 8: Top-N and kth values",
    hint: "Sort employees by salary descending, map to name, skip two, and take the next value.",
    expectedCollector:
      "sorted(Comparator.comparingDouble(Employee::getSalary).reversed()) + skip(2)",
    answerCode:
      "String name = employees.stream().sorted(Comparator.comparingDouble(Employee::getSalary).reversed()).map(Employee::getName).skip(2).findFirst().orElseThrow();\nSystem.out.println(name);",
  },
];

const employeeInput = `id, name, department, salary, age
1, Alice, Engineering, 95000, 31
2, Bob, Sales, 72000, 27
3, Cara, Engineering, 110000, 38
4, David, Sales, 68000, 42
5, Erin, HR, 55000, 25`;

const examples: Record<
  number,
  { input: string; output: string; note?: string }
> = {
  1: {
    input: employeeInput,
    output: "Engineering -> [Alice, Cara]\nHR -> [Erin]\nSales -> [Bob, David]",
    note: "Map iteration order is unspecified unless you request an ordered map.",
  },
  2: {
    input: employeeInput,
    output: "Engineering -> 2\nHR -> 1\nSales -> 2",
  },
  3: {
    input: employeeInput,
    output: "Engineering -> 102500.0\nHR -> 55000.0\nSales -> 70000.0",
  },
  4: {
    input: employeeInput,
    output:
      "Engineering -> Cara (110000.0)\nHR -> Erin (55000.0)\nSales -> Bob (72000.0)",
  },
  5: {
    input: employeeInput,
    output: "Engineering -> 205000.0\nHR -> 55000.0\nSales -> 140000.0",
  },
  6: {
    input: 'words = ["stream", "java", "collector", "java"]',
    output: "4 -> [java, java]\n6 -> [stream]\n9 -> [collector]",
  },
  7: {
    input: employeeInput,
    output: "20s -> [Bob, Erin]\n30s -> [Alice, Cara]\n40s -> [David]",
  },
  8: {
    input: employeeInput,
    output: "Engineering -> 2\nSales -> 2",
    note: "Engineering and Sales are tied for the most employees.",
  },
  9: {
    input:
      "students = [(Ava, 95), (Ben, 84), (Cara, 76)]\nA: score >= 90; B: score >= 80; otherwise C",
    output: "A -> [Ava]\nB -> [Ben]\nC -> [Cara]",
  },
  10: {
    input: employeeInput,
    output:
      "Company average salary -> 80000.0\nAbove average -> 2\nBelow average -> 3",
  },
  11: {
    input: 'text = "swiss"',
    output: "s",
  },
  12: {
    input: 'text = "swiss"',
    output: "w",
  },
  13: {
    input: "numbers = [3, 2, 4, 1, 6, 5]",
    output: "odd -> [3, 1, 5]\neven -> [2, 4, 6]",
    note: "The first-seen group order is odd, then even; preserve it with LinkedHashMap.",
  },
  14: {
    input: "employees = [(1, Alice), (2, Bob), (3, Cara)]",
    output: "1 -> Alice\n2 -> Bob\n3 -> Cara",
  },
  15: {
    input: employeeInput,
    output: "Engineering -> 205000.0\nHR -> 55000.0\nSales -> 140000.0",
  },
  16: {
    input: 'names = ["Ava", "Ben", "Cara"]\nages = [30, 25, 28]',
    output: "Ava -> 30\nBen -> 25\nCara -> 28",
  },
  17: {
    input: "employees = [(1, Alice), (2, Bob), (1, Alex)]",
    output: "Throws IllegalStateException because employee id 1 is duplicated.",
  },
  18: {
    input: employeeInput + "\nPredicate: salary > 60000",
    output: "true -> [Alice, Bob, Cara, David]\nfalse -> [Erin]",
  },
  19: {
    input: "numbers = [2, 3, 4, 5, 8, 9]",
    output: "true (prime) -> [2, 3, 5]\nfalse (not prime) -> [4, 8, 9]",
  },
  20: {
    input: 'words = ["level", "java", "radar", "stream"]',
    output: "true (palindrome) -> [level, radar]\nfalse -> [java, stream]",
  },
  21: {
    input: "nested = [[3, 1, 2], [2, 4, 1]]",
    output: "[1, 2, 3, 4]",
  },
  22: {
    input:
      "Alice skills = [Java, SQL]\nBob skills = [SQL, Docker]\nCara skills = [React]",
    output: "[Docker, Java, React, SQL] (distinct skills; order may vary)",
  },
  23: {
    input:
      "Engineering = [Alice: 95000, Cara: 110000]\nSales = [Bob: 72000, David: 68000]\nHR = [Erin: 55000]",
    output:
      "Erin (55000.0)\nDavid (68000.0)\nBob (72000.0)\nAlice (95000.0)\nCara (110000.0)",
    note: "Sorted by salary ascending.",
  },
  24: {
    input: 'sentence = "java streams"',
    output: "Distinct characters -> j, a, v, (space), s, t, r, e, m",
  },
  25: {
    input: "salaries = [95000, 72000, 110000, 68000, 55000]",
    output: "95000.0",
  },
  26: {
    input: "scores = [70, 90, 80, 80, 60]",
    output: "80 (third-lowest distinct score)",
  },
  27: {
    input:
      'words = ["java", "stream", "java", "sql", "stream", "java", "sql", "api"]',
    output: "java -> 3\nsql -> 2\nstream -> 2",
    note: "The tie for second place is ordered alphabetically for this example.",
  },
  28: {
    input: employeeInput,
    output: "Engineering -> Alice (31)\nHR -> Erin (25)\nSales -> Bob (27)",
  },
  29: {
    input: 'words = ["java", "stream", "api"]',
    output: "13",
  },
  30: {
    input: 'words = ["sql", "stream", "java"]',
    output: "stream (length 6)",
  },
  31: {
    input: 'names = ["Alice", "Bob", "Cara"]',
    output: "AliceBobCara",
    note: "Joining with a StringBuilder/collector is preferable for many strings because repeated immutable concatenation creates extra intermediate strings.",
  },
  32: {
    input: "numbers = [2, 3, 4]",
    output: "24",
  },
  33: {
    input:
      "Alice: salary 95000, age 31\nBob: salary 72000, age 27\nCara: salary 110000, age 38",
    output: "Cara (salary - age = 109962.0)",
  },
  34: {
    input: employeeInput,
    output:
      "Engineering: Cara (110000.0), Alice (95000.0)\nHR: Erin (55000.0)\nSales: Bob (72000.0), David (68000.0)",
  },
  35: {
    input: 'words = ["pear", "fig", "kiwi", "plum", "apricot"]',
    output: "[fig, kiwi, pear, plum, apricot]",
  },
  36: {
    input: "Engineering -> 3 employees\nSales -> 2 employees\nHR -> 1 employee",
    output: "Engineering -> 3\nSales -> 2\nHR -> 1",
  },
  37: {
    input: "employees = [(1, Alice), (2, Bob), (1, Alex), (3, Cara)]",
    output: "[Alice (1), Bob (2), Cara (3)] (keep the first employee per id)",
  },
  38: {
    input:
      "orders = [(101, customer 1), (102, customer 2), (103, customer 1), (104, customer 3), (105, customer 2)]",
    output: "[101, 102, 104] (first order per customer)",
  },
  39: {
    input: 'text = "swiss"',
    output:
      "s\nUse a loop or ordered frequency map; a first-seen scan requires state.",
  },
  40: {
    input: "numbers = [3, 1, 4, 2]",
    output: "[3, 4, 8, 10]",
  },
  41: {
    input: 'text = "abcabcbb"',
    output: '"abc" (length 3; first longest match)',
  },
  42: {
    input: 'names = ["Alice", "Bob", "Cara"]',
    output: "Alice, Bob, Cara",
  },
  43: {
    input: 'departments = ["HR", "Eng", "Sales"]',
    output: "[HR | Eng | Sales]",
  },
  44: {
    input: employeeInput + "\nThreshold: salary > 100000",
    output: "true",
  },
  45: {
    input: employeeInput + "\nThreshold: every salary > 30000",
    output: "true",
  },
  46: {
    input: 'words = ["apple", "banana", "orange", "umbrella", "kiwi"]',
    output: "3",
  },
  47: {
    input: employeeInput,
    output: "min = 55000.0\nmax = 110000.0\naverage = 80000.0\ncount = 5",
  },
  48: {
    input: 'words = ["java", "stream", "api"]',
    output: "min = 3\nmax = 6\naverage = 4.333333333333333\ncount = 3",
  },
  49: {
    input: "arr = [5, 3, 8, 1]",
    output: "sum = 17\naverage = 4.25",
  },
  50: {
    input: 'departments = ["Sales", "Engineering", "Sales", "HR"]',
    output: "[Engineering, HR, Sales]",
  },
};

const getExpectedCollector = (questionNumber: number) => {
  if (questionNumber <= 10) {
    return "groupingBy (+ counting / averagingDouble / summingDouble / maxBy / minBy)";
  }
  if (questionNumber <= 13) {
    return "groupingBy(Function.identity(), LinkedHashMap::new, counting())";
  }
  if (questionNumber <= 17)
    return "toMap (include a merge function when needed)";
  if (questionNumber <= 20) return "partitioningBy";
  if (questionNumber <= 24) return "flatMap + distinct / sorted";
  if (questionNumber <= 28) {
    return "distinct + sorted + skip / limit, or groupingBy + minBy / maxBy";
  }
  if (questionNumber <= 33) return "reduce / mapToInt.sum / max(Comparator)";
  if (questionNumber <= 36) {
    return "sorted(Comparator.comparing(...).thenComparing(...))";
  }
  if (questionNumber <= 38) {
    return "toMap(key, value, (first, next) -> first, LinkedHashMap::new)";
  }
  if (questionNumber <= 41)
    return "Loop or sliding window (avoid a forced stream)";
  if (questionNumber <= 43)
    return "Collectors.joining(delimiter, prefix, suffix)";
  if (questionNumber <= 46) return "anyMatch / allMatch / filter + count";
  if (questionNumber <= 48) return "summaryStatistics()";
  if (questionNumber === 49)
    return "IntStream (mapToInt / Arrays.stream(int[]))";
  return "collect(Collectors.toCollection(TreeSet::new))";
};

export const javaStreamsQuestions: JavaStreamsQuestion[] = rawQuestions.map(
  ({ question, pattern, hint }, index) => ({
    id: index + 1,
    question,
    explanation: "",
    inputs: examples[index + 1]?.input ?? "",
    pattern,
    hint,
    expectedCollector:
      rawQuestions[index].expectedCollector ?? getExpectedCollector(index + 1),
    answerCode: rawQuestions[index].answerCode,
    sampleInput: examples[index + 1]?.note,
    expectedOutput: examples[index + 1]?.output,
  }),
);
