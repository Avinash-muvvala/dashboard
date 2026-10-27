export const week2Topics = {
  "2-0": {
    theory:
      "In Java, a String is a sequence of characters and is a Reference Type, meaning it is an object of the String class. Unlike primitive types, Strings have built-in methods to manipulate text. A key characteristic of Java Strings is 'immutability,' meaning once a String object is created, its value cannot be changed; any modification creates a new object.",
    keyPoints: [
      "Strings are Reference Types (Objects)",
      "Strings are immutable (cannot be changed after creation)",
      "String literals are stored in the String Pool for memory efficiency",
      "Strings can be joined using the + operator or concat() method",
    ],
    code: '// String initialization\nString greeting = "Hello";\nString language = "Java";\n\n// String operations\nString fullMessage = greeting + " " + language; // Concatenation\nint length = fullMessage.length();\nString upper = fullMessage.toUpperCase();\n\nSystem.out.println(fullMessage);\nSystem.out.println("Length: " + length);\nSystem.out.println("Uppercase: " + upper);',
    quizzes: [
      {
        question: "Why is a String considered a Reference Type in Java?",
        options: [
          "It is a primitive type that stores values directly",
          "It is an object created from the String class",
          "It can only store numeric values",
          "It is automatically converted to an int",
        ],
        correctIndex: 1,
        explanation:
          "Strings in Java are objects of the java.lang.String class, which makes them reference types.",
      },
      {
        question: "What does 'immutability' mean regarding Strings?",
        options: [
          "Strings can be changed as many times as needed",
          "The value of a String object cannot be modified after it is created",
          "Strings are deleted from memory immediately after use",
          "Strings can only hold a maximum of 10 characters",
        ],
        correctIndex: 1,
        explanation:
          "Because Strings are immutable, any operation that changes the content actually creates a new String object.",
      },
      {
        question:
          "Which operator is used to join (concatenate) two strings in Java?",
        options: ["&", "&&", "+", "||"],
        correctIndex: 2,
        explanation:
          "The '+' operator is the standard way to concatenate strings in Java.",
      },
    ],
  },
  "2-1": {
    theory:
      "StringBuilder is a mutable sequence of characters, used when you need to perform many modifications to a string (like appending, inserting, or deleting) without creating a new object each time. Unlike String, which is immutable, StringBuilder changes its internal character array directly, making it much more efficient for repeated string manipulation such as inside loops.",

    keyPoints: [
      "StringBuilder is mutable — its contents can change without creating a new object",
      "String is immutable — every modification creates a brand new String object",
      "Common methods: append(), insert(), delete(), reverse(), replace()",
      "StringBuilder is not synchronized (not thread-safe), which makes it faster than StringBuffer",
      "Use StringBuilder when concatenating strings inside loops for better performance",
      "Call toString() to convert a StringBuilder back into a regular String",
    ],

    code: `// Creating a StringBuilder
StringBuilder sb = new StringBuilder("Hello");

// Appending
sb.append(" World");
System.out.println(sb); // Hello World

// Inserting
sb.insert(5, ",");
System.out.println(sb); // Hello, World

// Deleting
sb.delete(5, 6);
System.out.println(sb); // Hello World

// Reversing
sb.reverse();
System.out.println(sb); // dlroW olleH

// StringBuilder vs String performance
String result = "";
for (int i = 0; i < 3; i++) {
    result += i; // creates a new String object each time
}
System.out.println(result); // 012

StringBuilder fastResult = new StringBuilder();
for (int i = 0; i < 3; i++) {
    fastResult.append(i); // modifies the same object
}
System.out.println(fastResult); // 012`,

    quizzes: [
      {
        question:
          "What is the main advantage of using StringBuilder instead of String when performing many concatenations in a loop?",
        options: [
          "StringBuilder automatically sorts characters alphabetically",
          "StringBuilder modifies its own internal data instead of creating a new object each time",
          "StringBuilder can only store numbers, making it faster",
          "StringBuilder is immutable, so it never changes",
        ],
        correctIndex: 1,
        explanation:
          "StringBuilder is mutable, meaning it changes its existing character sequence in place rather than allocating a brand-new object for every modification, which saves memory and time.",
      },
      {
        question:
          "Which statement correctly distinguishes String from StringBuilder?",
        options: [
          "String is mutable, StringBuilder is immutable",
          "Both String and StringBuilder are immutable",
          "String is immutable, StringBuilder is mutable",
          "Both String and StringBuilder are mutable",
        ],
        correctIndex: 2,
        explanation:
          "String objects cannot be changed after creation — every modification produces a new object. StringBuilder, on the other hand, can be changed directly without creating new objects.",
      },
      {
        question:
          'Given:\nStringBuilder sb = new StringBuilder("Cat");\nsb.append("Dog");\nWhat does sb contain now?',
        options: ["Cat", "Dog", "CatDog", "DogCat"],
        correctIndex: 2,
        explanation:
          "The append() method adds the given text to the end of the existing StringBuilder content, so 'Dog' is added after 'Cat', producing 'CatDog'.",
      },
      {
        question:
          "Which method would you use to convert a StringBuilder object into a regular String?",
        options: ["convert()", "parseString()", "toString()", "getString()"],
        correctIndex: 2,
        explanation:
          "The toString() method returns a String representation of the current contents of the StringBuilder, which is the standard way to convert it back to a String.",
      },
      {
        question:
          "Why is StringBuilder generally faster than StringBuffer for single-threaded programs?",
        options: [
          "StringBuilder stores less data than StringBuffer",
          "StringBuilder is synchronized while StringBuffer is not",
          "StringBuilder is not synchronized, avoiding the overhead of thread-safety locks",
          "StringBuilder does not support append() or insert()",
        ],
        correctIndex: 2,
        explanation:
          "StringBuffer is synchronized to be thread-safe, which adds performance overhead. StringBuilder skips this synchronization, making it faster in single-threaded contexts where thread safety isn't needed.",
      },
    ],
  },
  "2-2": {
    theory:
      "StringBuffer is also a mutable sequence of characters, very similar to StringBuilder in what it can do — append, insert, delete, reverse, replace. The key difference is that StringBuffer is synchronized (thread-safe), meaning multiple threads can safely operate on the same StringBuffer object without corrupting its data. This safety comes at a cost: StringBuffer is slower than StringBuilder because every method call has to acquire and release a lock. StringBuffer was introduced first (since Java 1.0), while StringBuilder was added later in Java 5 as a faster, non-synchronized alternative for single-threaded use.",

    keyPoints: [
      "StringBuffer is mutable, just like StringBuilder",
      "StringBuffer is synchronized — safe to use across multiple threads",
      "Synchronization makes StringBuffer slower than StringBuilder",
      "Same core methods: append(), insert(), delete(), reverse(), replace()",
      "Use StringBuffer only when thread safety is actually required",
      "For most everyday single-threaded code, StringBuilder is the preferred choice",
    ],

    code: `// Creating a StringBuffer
StringBuffer sbf = new StringBuffer("Hello");

// Appending
sbf.append(" World");
System.out.println(sbf); // Hello World

// Inserting
sbf.insert(5, ",");
System.out.println(sbf); // Hello, World

// Deleting
sbf.delete(5, 6);
System.out.println(sbf); // Hello World

// Reversing
sbf.reverse();
System.out.println(sbf); // dlroW olleH

// Thread safety demonstration (conceptual)
StringBuffer sharedBuffer = new StringBuffer();

Runnable task = () -> {
    for (int i = 0; i < 1000; i++) {
        sharedBuffer.append("a"); // safe even with multiple threads
    }
};

Thread t1 = new Thread(task);
Thread t2 = new Thread(task);
t1.start();
t2.start();
// sharedBuffer will safely end up with 2000 characters total`,

    quizzes: [
      {
        question:
          "What is the main difference between StringBuffer and StringBuilder?",
        options: [
          "StringBuffer is immutable, StringBuilder is mutable",
          "StringBuffer is synchronized (thread-safe), StringBuilder is not",
          "StringBuffer cannot use append() or insert()",
          "StringBuilder was introduced before StringBuffer",
        ],
        correctIndex: 1,
        explanation:
          "Both classes are mutable and share the same core methods. The real distinction is that StringBuffer is synchronized, making it safe for multiple threads, while StringBuilder is not synchronized.",
      },
      {
        question:
          "Why would a developer choose StringBuffer over StringBuilder in a specific scenario?",
        options: [
          "When the program needs faster performance in a single thread",
          "When multiple threads need to safely modify the same character sequence",
          "When the string values should never change",
          "When working only with numeric data",
        ],
        correctIndex: 1,
        explanation:
          "StringBuffer's synchronization guarantees that concurrent modifications from multiple threads won't corrupt the data, which is exactly the scenario where its extra overhead is worthwhile.",
      },
      {
        question:
          "Which Java version introduced StringBuilder as a faster alternative to StringBuffer?",
        options: ["Java 1.0", "Java 5", "Java 8", "Java 11"],
        correctIndex: 1,
        explanation:
          "StringBuffer existed since Java 1.0, but StringBuilder was introduced in Java 5 to offer the same mutable functionality without the performance cost of synchronization.",
      },
      {
        question:
          "What is the main performance trade-off when using StringBuffer instead of StringBuilder?",
        options: [
          "StringBuffer uses less memory but has fewer methods",
          "StringBuffer is slower due to synchronization overhead, but is thread-safe",
          "StringBuffer is faster but not thread-safe",
          "There is no performance difference at all",
        ],
        correctIndex: 1,
        explanation:
          "Synchronization requires acquiring and releasing locks on every method call, which adds overhead and makes StringBuffer slower than StringBuilder, in exchange for thread safety.",
      },
      {
        question:
          'Given:\nStringBuffer sbf = new StringBuffer("Java");\nsbf.reverse();\nWhat does sbf contain now?',
        options: ["Java", "avaJ", "JAVA", "java"],
        correctIndex: 1,
        explanation:
          "The reverse() method flips the order of characters in the sequence. Reversing 'Java' character by character produces 'avaJ'.",
      },
    ],
  },
  "2-3": {
    theory:
      "An enum (short for enumeration) is a special Java type used to define a fixed set of named constants. Instead of using plain integers or strings to represent a limited set of options (like days of the week or directions), enums give those values meaningful names and type safety. Enums are implicitly final and extend java.lang.Enum, so they cannot be subclassed. They can also have constructors, fields, and methods, making them far more powerful than simple constant lists.",

    keyPoints: [
      "Enum defines a fixed set of named constants",
      "Declared using the 'enum' keyword instead of 'class'",
      "Enum constants are implicitly public, static, and final",
      "Enums can have constructors, fields, and methods",
      "Enum constructors are always private or package-private (cannot be public)",
      "Use values() to get all constants, and ordinal() for a constant's position (starting at 0)",
      "Enums are commonly used in switch statements for cleaner, safer branching",
    ],

    code: `// Basic enum
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

Day today = Day.WEDNESDAY;
System.out.println(today); // WEDNESDAY

// Using values() and ordinal()
for (Day d : Day.values()) {
    System.out.println(d + " -> " + d.ordinal());
}
// MONDAY -> 0
// TUESDAY -> 1
// ... etc

// Enum with constructor and fields
enum Planet {
    MERCURY(3.3e23),
    EARTH(5.97e24),
    JUPITER(1.9e27);

    private final double mass;

    Planet(double mass) {
        this.mass = mass;
    }

    public double getMass() {
        return mass;
    }
}

System.out.println(Planet.EARTH.getMass()); // 5.97e24

// Enum in a switch statement
Day d = Day.FRIDAY;
switch (d) {
    case FRIDAY:
        System.out.println("Almost weekend!");
        break;
    default:
        System.out.println("Regular day");
}`,

    quizzes: [
      {
        question: "What is the primary purpose of an enum in Java?",
        options: [
          "To store dynamically changing values",
          "To define a fixed set of named constants",
          "To replace all classes in a program",
          "To perform mathematical calculations",
        ],
        correctIndex: 1,
        explanation:
          "Enums are designed to represent a fixed, predefined set of constant values, giving them meaningful names instead of relying on raw numbers or strings.",
      },
      {
        question: "What access modifiers do enum constants implicitly have?",
        options: [
          "private and final",
          "protected and static",
          "public, static, and final",
          "public and abstract",
        ],
        correctIndex: 2,
        explanation:
          "Every constant declared inside an enum is automatically public, static, and final, meaning it cannot be reassigned and is accessible without an instance.",
      },
      {
        question:
          "Given:\nenum Color { RED, GREEN, BLUE }\nWhat does Color.GREEN.ordinal() return?",
        options: ["0", "1", "2", "GREEN"],
        correctIndex: 1,
        explanation:
          "The ordinal() method returns the zero-based position of a constant in its enum declaration. Since GREEN is the second constant (index starts at 0), it returns 1.",
      },
      {
        question: "What access modifier can an enum's constructor have?",
        options: [
          "public only",
          "protected only",
          "private or package-private only",
          "It cannot have a constructor",
        ],
        correctIndex: 2,
        explanation:
          "Enum constructors are always implicitly private or package-private since enum constants are created internally by the JVM, and no other code should be able to instantiate new enum values.",
      },
      {
        question:
          "Why would you add a constructor and fields to an enum, like in the Planet example?",
        options: [
          "To allow enum constants to be modified at runtime",
          "To associate extra data (like mass) with each constant",
          "To make the enum mutable",
          "Enums cannot have constructors, so this is not possible",
        ],
        correctIndex: 1,
        explanation:
          "Adding a constructor and fields lets each enum constant carry its own associated data, such as a planet's mass, making enums much more powerful than simple named constants.",
      },
    ],
  },
  "2-4": {
    theory:
      "The if-else statement is a fundamental control flow structure in Java that lets a program make decisions and execute different blocks of code based on whether a condition is true or false. A single 'if' checks one condition. Adding 'else' provides an alternative path when the condition is false. Chaining 'else if' allows checking multiple conditions in sequence, and the code only enters one matching block before skipping the rest.",

    keyPoints: [
      "if executes a block only when its condition evaluates to true",
      "else executes when the if condition is false",
      "else if allows checking multiple conditions in order",
      "Only one matching block runs — once a condition is true, the rest are skipped",
      "Conditions must evaluate to a boolean (true or false)",
      "Curly braces {} are optional for single-statement blocks but recommended for clarity",
      "if-else chains are evaluated top to bottom, stopping at the first true condition",
    ],

    code: `// Basic if-else
int age = 20;

if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}
// Output: Adult

// if-else if-else chain
int score = 75;

if (score >= 90) {
    System.out.println("Grade A");
} else if (score >= 75) {
    System.out.println("Grade B");
} else if (score >= 50) {
    System.out.println("Grade C");
} else {
    System.out.println("Fail");
}
// Output: Grade B

// Nested if
int num = 15;

if (num > 0) {
    if (num % 2 == 0) {
        System.out.println("Positive Even");
    } else {
        System.out.println("Positive Odd");
    }
} else {
    System.out.println("Not Positive");
}
// Output: Positive Odd

// Common mistake: using = instead of ==
int x = 5;
if (x == 5) { // correct comparison
    System.out.println("x is 5");
}`,

    quizzes: [
      {
        question: "What must the condition inside an if statement evaluate to?",
        options: [
          "An integer value",
          "A String value",
          "A boolean value (true or false)",
          "Any non-null object",
        ],
        correctIndex: 2,
        explanation:
          "Java requires if conditions to evaluate strictly to a boolean type. Unlike some languages, integers or objects cannot be used directly as conditions.",
      },
      {
        question:
          'Given:\nint score = 85;\nif (score >= 90) {\n  System.out.println("A");\n} else if (score >= 75) {\n  System.out.println("B");\n} else {\n  System.out.println("C");\n}\nWhat is printed?',
        options: ["A", "B", "C", "Nothing is printed"],
        correctIndex: 1,
        explanation:
          "Java checks conditions top to bottom. Since score (85) is not >= 90, it moves to the next check: 85 >= 75 is true, so 'B' is printed and the remaining else block is skipped.",
      },
      {
        question:
          "What happens once one condition in an if-else if-else chain evaluates to true?",
        options: [
          "All matching blocks execute",
          "Only that block executes, and the rest of the chain is skipped",
          "The program throws an error",
          "The chain restarts from the top",
        ],
        correctIndex: 1,
        explanation:
          "As soon as a true condition is found, its block runs and the remaining else if / else parts in that chain are automatically skipped, regardless of whether they'd also be true.",
      },
      {
        question:
          "What is a common mistake beginners make when writing conditions in Java?",
        options: [
          "Using == instead of = for comparison",
          "Using = instead of == for comparison, which is actually an assignment",
          "Forgetting to declare the enum type",
          "Using semicolons after every condition",
        ],
        correctIndex: 1,
        explanation:
          "Using a single '=' inside a condition performs assignment rather than comparison. For boolean conditions this often causes a compile error, but for boolean variables it silently changes the value.",
      },
      {
        question:
          "In the nested if example, why does the code check 'num > 0' before checking 'num % 2 == 0'?",
        options: [
          "To first confirm the number is positive, then determine if it's even or odd within that condition",
          "Because Java requires all if statements to be nested",
          "To make the code run faster",
          "There is no real reason, it's arbitrary",
        ],
        correctIndex: 0,
        explanation:
          "Nesting lets the program first establish a broader condition (positive number) before checking a more specific sub-condition (even or odd), producing more precise, layered logic.",
      },
    ],
  },
  "2-5": {
    theory:
      "The switch statement is another control flow structure, used as a cleaner alternative to long if-else if chains when comparing a single variable against multiple possible fixed values. It evaluates an expression once and then jumps directly to the matching 'case' label. Java's traditional switch requires a 'break' statement after each case to prevent 'fall-through' (where execution continues into the next case). Java also supports a newer switch expression syntax (introduced in Java 14) using arrow labels (->), which removes the need for break and can directly return a value.",

    keyPoints: [
      "switch compares one variable/expression against multiple case values",
      "Each case must end with break, or execution 'falls through' into the next case",
      "default runs when no case matches (similar to the final else)",
      "Works with byte, short, int, char, String, and enum types",
      "Traditional switch uses colons (case X:) with break statements",
      "Modern switch expressions (Java 14+) use arrows (case X ->) and don't need break",
      "Switch expressions can directly return a value using yield or the arrow shorthand",
    ],

    code: `// Traditional switch statement
int day = 3;
String dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    default:
        dayName = "Unknown";
        break;
}
System.out.println(dayName); // Wednesday

// Fall-through mistake (missing break)
int num = 2;
switch (num) {
    case 1:
        System.out.println("One");
    case 2:
        System.out.println("Two");
    case 3:
        System.out.println("Three");
        break;
    default:
        System.out.println("Other");
}
// Output:
// Two
// Three
// (falls through because there's no break after case 2)

// Modern switch expression (Java 14+)
int month = 4;
String season = switch (month) {
    case 12, 1, 2 -> "Winter";
    case 3, 4, 5 -> "Spring";
    case 6, 7, 8 -> "Summer";
    case 9, 10, 11 -> "Autumn";
    default -> "Invalid month";
};
System.out.println(season); // Spring

// switch with String
String fruit = "Apple";
switch (fruit) {
    case "Apple":
        System.out.println("Selected Apple");
        break;
    case "Banana":
        System.out.println("Selected Banana");
        break;
    default:
        System.out.println("Unknown fruit");
}
// Output: Selected Apple`,

    quizzes: [
      {
        question:
          "What happens if you forget to add a break statement after a case in a traditional switch statement?",
        options: [
          "The program throws a compile-time error",
          "Execution 'falls through' and continues into the next case's code",
          "The switch statement is skipped entirely",
          "Java automatically adds break for you",
        ],
        correctIndex: 1,
        explanation:
          "Without break, Java doesn't stop after a matching case — it keeps executing the code in the following cases too, a behavior known as 'fall-through', until it hits a break or the end of the switch.",
      },
      {
        question:
          'Given:\nint num = 2;\nswitch (num) {\n  case 1: System.out.println("One");\n  case 2: System.out.println("Two");\n  case 3: System.out.println("Three"); break;\n  default: System.out.println("Other");\n}\nWhat is printed?',
        options: ["Two", "Two, Three", "One, Two, Three", "Other"],
        correctIndex: 1,
        explanation:
          "Execution jumps to case 2 ('Two') and, since there's no break after it, falls through into case 3 ('Three') where it finally hits a break and stops.",
      },
      {
        question: "Which data types can be used in a Java switch statement?",
        options: [
          "Only int and double",
          "Only boolean values",
          "byte, short, int, char, String, and enum types",
          "Only custom class objects",
        ],
        correctIndex: 2,
        explanation:
          "Java switch statements support byte, short, int, char, String, and enum types, but they do not support floating-point types like float or double, or boolean.",
      },
      {
        question:
          "What is a key advantage of the modern switch expression (using ->) introduced in Java 14?",
        options: [
          "It requires more break statements for safety",
          "It eliminates fall-through issues and can directly return a value",
          "It only works with String types",
          "It removes the need for a default case entirely",
        ],
        correctIndex: 1,
        explanation:
          "The arrow syntax executes only the matching case with no fall-through risk, and switch expressions can be assigned directly to a variable, making the code more concise and safer.",
      },
      {
        question:
          "In a switch statement, what is the purpose of the default case?",
        options: [
          "It always executes first, regardless of the value",
          "It executes only when none of the other cases match",
          "It is required for the code to compile",
          "It replaces the need for break statements",
        ],
        correctIndex: 1,
        explanation:
          "default acts as a fallback, similar to a final 'else' block — it runs only if the switch expression doesn't match any of the defined case values.",
      },
    ],
  },
  "2-6": {
    theory:
      "Loops allow a block of code to be executed repeatedly, based on a condition, without writing the same statements over and over. Java provides four main types of loops: the 'for' loop, ideal when the number of iterations is known in advance; the 'while' loop, which checks its condition before each iteration and is used when the number of repetitions is unknown; the 'do-while' loop, which checks its condition after each iteration, guaranteeing the loop body runs at least once; and the enhanced 'for-each' loop, used to iterate directly over arrays or collections without manually managing an index.",

    keyPoints: [
      "for loop: best when the number of iterations is known (has init, condition, update in one line)",
      "while loop: checks the condition BEFORE running the body — may run zero times",
      "do-while loop: checks the condition AFTER running the body — always runs at least once",
      "for-each (enhanced for) loop: iterates directly over arrays/collections, no index needed",
      "break exits a loop completely",
      "continue skips the current iteration and moves to the next one",
      "Infinite loops occur when the condition never becomes false — must be avoided carefully",
    ],

    code: `// for loop
for (int i = 1; i <= 5; i++) {
    System.out.println("For loop: " + i);
}
// Output: 1 2 3 4 5

// while loop
int i = 1;
while (i <= 5) {
    System.out.println("While loop: " + i);
    i++;
}
// Output: 1 2 3 4 5

// do-while loop
int j = 1;
do {
    System.out.println("Do-while loop: " + j);
    j++;
} while (j <= 5);
// Output: 1 2 3 4 5

// do-while runs at least once, even if condition is false initially
int k = 10;
do {
    System.out.println("Runs once: " + k);
} while (k < 5);
// Output: Runs once: 10

// enhanced for-each loop
int[] numbers = {10, 20, 30};
for (int num : numbers) {
    System.out.println("For-each: " + num);
}
// Output: 10 20 30

// break and continue
for (int x = 1; x <= 5; x++) {
    if (x == 3) continue; // skip 3
    if (x == 5) break;    // stop at 5
    System.out.println("Loop with break/continue: " + x);
}
// Output: 1 2 4`,

    quizzes: [
      {
        question:
          "Which loop is best suited when you already know exactly how many times you want to repeat something?",
        options: [
          "while loop",
          "do-while loop",
          "for loop",
          "for-each loop only",
        ],
        correctIndex: 2,
        explanation:
          "The for loop combines initialization, condition, and update in a single line, making it the natural choice when the number of iterations is known in advance.",
      },
      {
        question:
          "What is the key difference between a while loop and a do-while loop?",
        options: [
          "while checks the condition after the body; do-while checks it before",
          "while checks the condition before the body; do-while checks it after, guaranteeing at least one run",
          "There is no difference between them",
          "do-while cannot use break or continue",
        ],
        correctIndex: 1,
        explanation:
          "A while loop tests its condition first, so it may never execute if the condition starts false. A do-while loop executes the body first and checks the condition afterward, so it always runs at least once.",
      },
      {
        question:
          "Given:\nint k = 10;\ndo {\n  System.out.println(k);\n} while (k < 5);\nWhat is printed?",
        options: ["Nothing is printed", "10", "5", "An infinite loop occurs"],
        correctIndex: 1,
        explanation:
          "Since do-while always executes the body first regardless of the condition, '10' is printed once before the condition (10 < 5, which is false) is even checked, so the loop stops after just one run.",
      },
      {
        question:
          "What does the enhanced for-each loop allow you to do that a regular for loop requires extra code for?",
        options: [
          "Iterate directly over array/collection elements without managing an index manually",
          "Run the loop body a random number of times",
          "Skip using any condition entirely",
          "Automatically sort the array before looping",
        ],
        correctIndex: 0,
        explanation:
          "The for-each loop automatically walks through each element of an array or collection, removing the need to declare and increment an index variable manually.",
      },
      {
        question:
          "In this loop:\nfor (int x = 1; x <= 5; x++) {\n  if (x == 3) continue;\n  if (x == 5) break;\n  System.out.println(x);\n}\nWhat gets printed?",
        options: ["1 2 3 4", "1 2 4", "1 2 3 4 5", "1 2 4 5"],
        correctIndex: 1,
        explanation:
          "When x is 3, continue skips printing and jumps to the next iteration. When x reaches 5, break stops the loop entirely before it prints, so only 1, 2, and 4 get printed.",
      },
    ],
  },
  "2-7": {
    theory:
      "An array is a fixed-size container that stores multiple values of the same data type in contiguous memory, accessed using a zero-based index. Arrays are reference types in Java — even arrays of primitives are objects on the heap, with the variable itself just holding a reference to that memory. Once created, an array's size is fixed and cannot be changed (if you need dynamic resizing, use ArrayList or other collections instead). Java supports single-dimensional arrays, multi-dimensional arrays (like 2D grids), and jagged arrays (rows of different lengths). Arrays have a built-in 'length' property (not a method — no parentheses) to get their size.",

    keyPoints: [
      "Arrays store multiple values of the same type in one variable",
      "Indexing starts at 0 — the last valid index is (length - 1)",
      "Array size is fixed at creation and cannot grow or shrink",
      "Arrays are reference types — declaring one just creates a reference, use 'new' to allocate memory",
      "Use .length (no parentheses) to get the number of elements",
      "Default values: 0 for numeric types, false for boolean, null for reference types",
      "2D arrays are essentially 'arrays of arrays' and can even be jagged (uneven row lengths)",
      "Accessing an index outside the valid range throws ArrayIndexOutOfBoundsException",
      "The Arrays class (java.util.Arrays) provides helper methods like sort(), toString(), fill(), and equals()",
      "Arrays can be passed to methods, and since they are references, changes inside a method affect the original array",
    ],

    code: `// Declaring and creating arrays
int[] numbers = new int[5];       // array of 5 ints, defaults to 0
numbers[0] = 10;
numbers[1] = 20;
System.out.println(numbers[0]);   // 10

// Declaration with initialization (array literal)
int[] scores = {90, 85, 78, 92, 60};
System.out.println(scores[2]);    // 78

// Array length property
System.out.println(scores.length); // 5

// Looping through an array (standard for)
for (int i = 0; i < scores.length; i++) {
    System.out.println("Index " + i + ": " + scores[i]);
}

// Looping through an array (enhanced for-each)
for (int score : scores) {
    System.out.println(score);
}

// Default values
int[] defaults = new int[3];
System.out.println(defaults[0]); // 0

boolean[] flags = new boolean[3];
System.out.println(flags[0]); // false

String[] names = new String[3];
System.out.println(names[0]); // null

// ArrayIndexOutOfBoundsException
int[] arr = {1, 2, 3};
// System.out.println(arr[5]); // throws ArrayIndexOutOfBoundsException

// 2D array (matrix)
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
System.out.println(matrix[1][2]); // 6 (row 1, column 2)

// Looping through a 2D array
for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        System.out.print(matrix[row][col] + " ");
    }
    System.out.println();
}

// Jagged array (rows with different lengths)
int[][] jagged = new int[3][];
jagged[0] = new int[]{1};
jagged[1] = new int[]{1, 2};
jagged[2] = new int[]{1, 2, 3};
System.out.println(jagged[2][2]); // 3

// Arrays are reference types — passed to methods by reference
void modify(int[] arr) {
    arr[0] = 999;
}
int[] data = {1, 2, 3};
modify(data);
System.out.println(data[0]); // 999

// Useful java.util.Arrays methods
import java.util.Arrays;

int[] unsorted = {5, 2, 9, 1};
Arrays.sort(unsorted);
System.out.println(Arrays.toString(unsorted)); // [1, 2, 5, 9]

int[] filled = new int[4];
Arrays.fill(filled, 7);
System.out.println(Arrays.toString(filled)); // [7, 7, 7, 7]

int[] a1 = {1, 2, 3};
int[] a2 = {1, 2, 3};
System.out.println(Arrays.equals(a1, a2)); // true`,

    quizzes: [
      {
        question:
          "What is the index of the last element in an array declared as int[] arr = new int[10]?",
        options: ["10", "9", "0", "11"],
        correctIndex: 1,
        explanation:
          "Array indexing starts at 0, so an array of length 10 has valid indices from 0 to 9. The last element is therefore at index 9, not 10.",
      },
      {
        question:
          "What happens if you try to access an index that is out of an array's valid range?",
        options: [
          "Java returns null automatically",
          "Java throws an ArrayIndexOutOfBoundsException",
          "The array automatically resizes itself",
          "The program silently ignores the request",
        ],
        correctIndex: 1,
        explanation:
          "Java performs bounds checking at runtime, so accessing an index outside the array's valid range (0 to length-1) throws an ArrayIndexOutOfBoundsException.",
      },
      {
        question:
          "What is the default value of each element in a newly created boolean array like 'new boolean[5]'?",
        options: ["true", "false", "null", "0"],
        correctIndex: 1,
        explanation:
          "Primitive boolean array elements default to false when the array is created, just as numeric primitives default to 0 and reference types default to null.",
      },
      {
        question:
          "Given:\nint[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};\nWhat does matrix[2][0] return?",
        options: ["1", "3", "7", "9"],
        correctIndex: 2,
        explanation:
          "matrix[2] refers to the third row {7, 8, 9}, and index [0] of that row is 7, since matrix indexing follows [row][column] order starting from 0.",
      },
      {
        question:
          "Why does modifying an array inside a method also change the original array outside the method?",
        options: [
          "Arrays are primitives, so Java copies the value automatically",
          "Arrays are reference types, so the method receives a reference to the same array in memory",
          "Java creates a completely new array every time a method is called",
          "This behavior only happens with 2D arrays, not 1D arrays",
        ],
        correctIndex: 1,
        explanation:
          "Since arrays are reference types, passing one to a method passes a reference (memory address) to the same underlying array, so changes made inside the method are visible outside it too.",
      },
      {
        question: "What is a 'jagged array' in Java?",
        options: [
          "An array that cannot be sorted",
          "A 2D array where each row can have a different number of columns",
          "An array that automatically resizes itself",
          "An array that only stores negative numbers",
        ],
        correctIndex: 1,
        explanation:
          "A jagged array is a 2D (or multi-dimensional) array where each inner array (row) can have a different length, unlike a regular rectangular matrix where every row has the same number of columns.",
      },
      {
        question:
          "Which of these correctly gets the number of elements in an array called 'data'?",
        options: [
          "data.length()",
          "data.size()",
          "data.length",
          "data.count()",
        ],
        correctIndex: 2,
        explanation:
          "Arrays expose 'length' as a property, not a method — so it's accessed without parentheses, unlike collections such as ArrayList which use the size() method instead.",
      },
    ],
  },
  "2-8": {
    theory:
      "A multi-dimensional array is essentially an 'array of arrays' — the most common form is the 2D array, which represents data in rows and columns (like a table, grid, or matrix). Java doesn't have true multi-dimensional arrays like some languages; instead, it implements them by nesting array references inside another array. This means each row in a 2D array is actually its own independent array object, which is why Java allows 'jagged arrays' where rows can have different lengths. Multi-dimensional arrays can also extend to 3D or higher, though 2D is by far the most common in real-world use (grids, matrices, tables, game boards, etc.).",

    keyPoints: [
      "A 2D array is an array where each element is itself an array (array of arrays)",
      "Declared as type[][] name, e.g., int[][] grid",
      "Accessed using two indices: array[row][column]",
      "Because each row is its own array object, rows can have different lengths (jagged arrays)",
      "grid.length gives the number of rows; grid[i].length gives the number of columns in row i",
      "Can be created directly with literal values, or with 'new' and filled in later",
      "3D (or higher) arrays are possible: type[][][] — array of arrays of arrays",
      "Nested loops are the standard way to traverse 2D arrays (outer loop = rows, inner loop = columns)",
      "Common uses: matrices, grids, game boards (like tic-tac-toe or chess), tables of data, image pixel maps",
    ],

    code: `// Declaring and creating a 2D array (rectangular)
int[][] grid = new int[3][4]; // 3 rows, 4 columns, all default to 0
grid[0][0] = 1;
grid[2][3] = 99;
System.out.println(grid[2][3]); // 99

// Declaring with literal values
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
System.out.println(matrix[1][2]); // 6 (row 1, column 2)

// Getting dimensions
System.out.println(matrix.length);     // 3 (number of rows)
System.out.println(matrix[0].length);  // 3 (number of columns in row 0)

// Traversing with nested for loops
for (int row = 0; row < matrix.length; row++) {
    for (int col = 0; col < matrix[row].length; col++) {
        System.out.print(matrix[row][col] + " ");
    }
    System.out.println(); // move to next line after each row
}
// Output:
// 1 2 3
// 4 5 6
// 7 8 9

// Traversing with enhanced for-each (nested)
for (int[] currentRow : matrix) {
    for (int value : currentRow) {
        System.out.print(value + " ");
    }
    System.out.println();
}

// Jagged array — rows with different lengths
int[][] jagged = new int[3][];
jagged[0] = new int[]{1};
jagged[1] = new int[]{1, 2};
jagged[2] = new int[]{1, 2, 3};

for (int[] row : jagged) {
    System.out.println("Row length: " + row.length);
}
// Output:
// Row length: 1
// Row length: 2
// Row length: 3

// 3D array example
int[][][] cube = new int[2][2][2];
cube[0][0][0] = 1;
cube[1][1][1] = 8;
System.out.println(cube[1][1][1]); // 8

// Practical example: Tic-Tac-Toe board
String[][] board = {
    {"X", "O", "X"},
    {"O", "X", "O"},
    {"X", "O", "X"}
};
System.out.println(board[0][1]); // O

// Summing all values in a 2D array
int[][] nums = {
    {1, 2},
    {3, 4},
    {5, 6}
};
int sum = 0;
for (int[] row : nums) {
    for (int val : row) {
        sum += val;
    }
}
System.out.println("Sum: " + sum); // Sum: 21`,

    quizzes: [
      {
        question: "How does Java actually implement a 2D array under the hood?",
        options: [
          "As a single continuous block treated as rows and columns natively",
          "As an array where each element is itself a separate array object",
          "As a special primitive type distinct from regular arrays",
          "As a linked list of rows",
        ],
        correctIndex: 1,
        explanation:
          "Java doesn't have true multi-dimensional arrays built into the language. Instead, a 2D array is implemented as an array of array references, where each row is its own independent array object.",
      },
      {
        question:
          "Given:\nint[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};\nWhat does matrix[0].length return?",
        options: ["1", "3", "9", "0"],
        correctIndex: 1,
        explanation:
          "matrix[0] refers to the first row array {1, 2, 3}, and .length on that specific row returns the number of columns in that row, which is 3.",
      },
      {
        question:
          "Why is it possible to create a jagged array in Java, where rows have different lengths?",
        options: [
          "Because Java arrays automatically resize",
          "Because each row of a 2D array is a separate, independently-sized array object",
          "Jagged arrays are actually not allowed in Java",
          "Because jagged arrays use ArrayList instead of arrays",
        ],
        correctIndex: 1,
        explanation:
          "Since a 2D array is really an array of array references, each row can point to an array of any length — there's no requirement that all rows be the same size.",
      },
      {
        question:
          "When traversing a 2D array with nested loops, what does the outer loop typically represent?",
        options: [
          "The columns",
          "The rows",
          "The total number of elements",
          "The data type of the array",
        ],
        correctIndex: 1,
        explanation:
          "By convention, the outer loop iterates over the rows (using matrix.length), while the inner loop iterates over the columns of the current row (using matrix[row].length).",
      },
      {
        question: "How would you declare a 3D array of integers in Java?",
        options: [
          "int[3] cube;",
          "int[][][] cube;",
          "int{{{}}} cube;",
          "array3D<int> cube;",
        ],
        correctIndex: 1,
        explanation:
          "A 3D array simply adds another set of brackets: int[][][] declares an array of arrays of arrays, following the same nesting pattern used for 2D arrays.",
      },
      {
        question:
          "What is a common real-world use case for 2D arrays, as shown in the theory?",
        options: [
          "Storing a single sequential list of names",
          "Representing grids, matrices, or game boards like tic-tac-toe",
          "Storing method definitions",
          "Only for mathematical constants",
        ],
        correctIndex: 1,
        explanation:
          "2D arrays naturally model grid-like structures, making them ideal for representing matrices, tables of data, image pixel maps, and game boards such as tic-tac-toe or chess.",
      },
    ],
  },
};
