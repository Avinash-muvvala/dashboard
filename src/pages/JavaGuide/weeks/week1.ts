export const week1Topics = {
  "1-0": {
    theory:
      "A variable is a container used to store data. Every variable in Java must have a data type. Data types tell Java what kind of value a variable can store. Java data types are divided into two categories: Primitive Types and Reference Types.",

    keyPoints: [
      "Variables store data values",
      "Every variable must have a data type",
      "Java data types are divided into Primitive Types and Reference Types",
      "The data type determines what kind of data can be stored",
    ],

    code: `// Variables with different data types
int age = 25;
double salary = 45000.50;
boolean isActive = true;
char grade = 'A';

String name = "Alice";

System.out.println(age);
System.out.println(name);`,

    quizzes: [
      {
        question: "Java data types are divided into which two categories?",
        options: [
          "Numbers and Text",
          "Primitive and Reference",
          "Local and Global",
          "Static and Dynamic",
        ],
        correctIndex: 1,
        explanation:
          "Java data types are divided into Primitive Types and Reference Types.",
      },
      {
        question:
          "Think of a variable like a cardboard box. In Java, what does the 'Data Type' represent?",
        options: [
          "The label written on the outside of the box",
          "The actual item placed inside the box",
          "A rule that specifies exactly what type of item is allowed inside that box",
          "The location where the box is stored in the warehouse",
        ],
        correctIndex: 2,
        explanation:
          "A data type tells Java what kind of information (like a whole number, decimal, or text) a specific variable is allowed to hold.",
      },
      {
        question:
          "Which of the following is an example of a REFERENCE data type?",
        options: ["int", "double", "boolean", "String"],
        correctIndex: 3,
        explanation:
          "String is a class in Java, meaning it is a reference type. Keywords like int, double, and boolean are primitive types.",
      },
      {
        question:
          "What will happen if you try to save the text \"John\" into a variable declared as an 'int'?",
        options: [
          "Java automatically converts the text into a number.",
          "The code will fail to compile because of a type mismatch error.",
          "The program runs but prints an empty space.",
          "The program runs but crashes immediately when printing the variable.",
        ],
        correctIndex: 1,
        explanation:
          "Java is a strongly typed language. If you define a variable as an integer ('int'), you cannot assign text to it; the compiler will stop you right away.",
      },
      {
        question:
          "Which primitive data type would be best suited to store whether a user has turned on 'Dark Mode' in an application?",
        options: ["int", "char", "boolean", "double"],
        correctIndex: 2,
        explanation:
          "A setting like 'Dark Mode' is either true (on) or false (off). The 'boolean' data type is perfect for storing these true/false states.",
      },
    ],
  },
  "1-1": {
    theory:
      "Java has two types of data types. Primitive types store the actual value directly in memory. Reference types store the memory address of an object. Primitive types include byte, short, int, long, float, double, boolean, and char. Reference types include String, arrays, and objects.",

    keyPoints: [
      "8 primitive types: byte, short, int, long, float, double, boolean, char",
      "Primitive variables store the actual value",
      "Reference variables store a memory address (reference) to an object",
      "Examples of reference types: String, arrays, objects",
      "Primitive fields default to 0 or false",
      "Reference fields default to null",
    ],

    code: `// Primitive Types
int age = 25;
double salary = 45000.50;
boolean isActive = true;

// Reference Types
String name = "Alice";
int[] scores = {90, 85, 92};

// Primitive copy
int a = 10;
int b = a;
b = 20;

System.out.println(a); // 10

// Reference copy
int[] arr1 = {1, 2, 3};
int[] arr2 = arr1;
arr2[0] = 99;

System.out.println(arr1[0]); // 99`,

    quizzes: [
      {
        question:
          "What do reference variables explicitly store inside their memory boxes?",
        options: [
          "The raw, complete contents of the object",
          "A memory address pointing to where the object resides",
          "Only numerical digits",
          "Only text characters",
        ],
        correctIndex: 1,
        explanation:
          "Reference variables hold the memory address (the reference layout tracking location) of an object, rather than storing the bulky object data directly inside themselves.",
      },
      {
        question:
          "Which of the following listings consists entirely of primitive data types?",
        options: [
          "int, double, String, boolean",
          "byte, short, char, long",
          "int, float, array, double",
          "boolean, character, integer, double",
        ],
        correctIndex: 1,
        explanation:
          "The types 'byte', 'short', 'char', and 'long' belong to the 8 standard built-in primitive keywords. 'String' and 'array' are reference types, and 'integer' or 'character' capitalized are object wrappers.",
      },
      {
        question:
          "If you do not manually assign an initial value to an object reference variable field, what does Java set its default value to?",
        options: ["0", "false", "null", "blank space"],
        correctIndex: 2,
        explanation:
          "Reference variables that don't point to any real memory address default to 'null', which literally stands for an empty pointer or 'nothing'.",
      },
      {
        question:
          "Look at this code:\nint[] list1 = {5, 10};\nint[] list2 = list1;\nlist2[1] = 40;\nWhat is inside list1[1]?",
        options: ["10", "40", "5", "null"],
        correctIndex: 1,
        explanation:
          "Because arrays are reference types, assigning list1 to list2 means both point to the same exact physical array in memory. Modifying index 1 via list2 changes it for list1 as well.",
      },
      {
        question:
          "Why does changing primitive 'b' after writing 'int b = a;' leave primitive 'a' completely unaffected?",
        options: [
          "Primitives are locked immediately after creation.",
          "Java creates a brand new, completely independent value copy of 'a' and hands that value directly to 'b'.",
          "The compiler automatically tracks changes and runs a rollback operation.",
          "Primitives are stored on the reference heap storage area.",
        ],
        correctIndex: 1,
        explanation:
          "Primitives hold actual values. When you copy a primitive variable to another, Java completely replicates the raw value. The two variables do not share any tracking links afterward.",
      },
    ],
  },

  "1-2": {
    theory:
      "Operators in Java are symbols that perform operations on variables and values. Java supports arithmetic, assignment, comparison, logical, bitwise, and ternary operators. An expression is a combination of variables, values, and operators that evaluates to a single value. Operator precedence determines the order in which operators are evaluated.",
    keyPoints: [
      "% (modulo) returns the remainder: 10 % 3 = 1",
      "&& and || short-circuit — they stop evaluating as soon as the result is known",
      "== compares values for primitives but references for objects — use .equals() for Strings",
      "Ternary: condition ? valueIfTrue : valueIfFalse",
    ],
    code: `int x = 10, y = 3;
System.out.println(x / y);   // 3 (integer division!)
System.out.println(x % y);   // 1 (remainder)

// Compound assignment
x += 5;  // x = 15
x++;     // x = 16

// Short-circuit logical
if (y != 0 && x / y > 2) {
    System.out.println("Safe division");
}

// Ternary
String status = (x > 10) ? "big" : "small";

// String comparison
String s1 = "hello", s2 = "hello";
System.out.println(s1.equals(s2)); // true (always use .equals)`,
    quizzes: [
      {
        question:
          "What do reference variables explicitly store inside their memory boxes?",
        options: [
          "The raw, complete contents of the object",
          "A memory address pointing to where the object resides",
          "Only numerical digits",
          "Only text characters",
        ],
        correctIndex: 1,
        explanation:
          "Reference variables hold the memory address (the reference layout tracking location) of an object, rather than storing the bulky object data directly inside themselves.",
      },
      {
        question:
          "Which of the following listings consists entirely of primitive data types?",
        options: [
          "int, double, String, boolean",
          "byte, short, char, long",
          "int, float, array, double",
          "boolean, character, integer, double",
        ],
        correctIndex: 1,
        explanation:
          "The types 'byte', 'short', 'char', and 'long' belong to the 8 standard built-in primitive keywords. 'String' and 'array' are reference types, and 'integer' or 'character' capitalized are object wrappers.",
      },
      {
        question:
          "If you do not manually assign an initial value to an object reference variable field, what does Java set its default value to?",
        options: ["0", "false", "null", "blank space"],
        correctIndex: 2,
        explanation:
          "Reference variables that don't point to any real memory address default to 'null', which literally stands for an empty pointer or 'nothing'.",
      },
      {
        question:
          "Look at this code:\nint[] list1 = {5, 10};\nint[] list2 = list1;\nlist2[1] = 40;\nWhat is inside list1[1]?",
        options: ["10", "40", "5", "null"],
        correctIndex: 1,
        explanation:
          "Because arrays are reference types, assigning list1 to list2 means both point to the same exact physical array in memory. Modifying index 1 via list2 changes it for list1 as well.",
      },
      {
        question:
          "Why does changing primitive 'b' after writing 'int b = a;' leave primitive 'a' completely unaffected?",
        options: [
          "Primitives are locked immediately after creation.",
          "Java creates a brand new, completely independent value copy of 'a' and hands that value directly to 'b'.",
          "The compiler automatically tracks changes and runs a rollback operation.",
          "Primitives are stored on the reference heap storage area.",
        ],
        correctIndex: 1,
        explanation:
          "Primitives hold actual values. When you copy a primitive variable to another, Java completely replicates the raw value. The two variables do not share any tracking links afterward.",
      },
    ],
  },
  "1-3": {
    theory:
      "Type casting in Java is converting a value from one data type to another. Implicit casting (widening) happens automatically when converting a smaller type to a larger type with no data loss. Explicit casting (narrowing) must be done manually using a cast operator and may result in data loss or truncation. Widening order: byte → short → int → long → float → double.",
    keyPoints: [
      "Widening (implicit): smaller → larger, automatic, no data loss",
      "Narrowing (explicit): larger → smaller, use (type) cast, may lose data",
      "Casting truncates — does NOT round: (int) 9.9 gives 9, not 10",
      "char can be cast to int to get its Unicode value",
    ],
    code: `// Implicit widening — automatic
int myInt = 100;
double myDouble = myInt; // 100.0

// Explicit narrowing — manual
double pi = 3.99;
int piInt = (int) pi;    // 3 (truncated, not rounded!)

// Data loss with large numbers
long bigNum = 1234567890123L;
int small = (int) bigNum; // unexpected value — overflow!

// char <-> int
char letter = 'A';
int ascii = letter;           // 65
char next = (char)(ascii + 1); // 'B'
System.out.println(next);`,
    quizzes: [
      {
        question:
          "What happens to the fractional decimal digits when you cast a float or a double value down to an int variable?",
        options: [
          "The number is rounded to the closest mathematical integer.",
          "The number is rounded upwards to the higher value.",
          "The decimal digits are completely truncated (cut off) without rounding.",
          "The program crashes immediately with an ArithmeticException.",
        ],
        correctIndex: 2,
        explanation:
          "Java uses truncation during narrowing conversion. Converting 7.9 to an integer simply drops the '.9' completely, resulting in a flat 7.",
      },
      {
        question:
          "Which of the following type conversions requires a manual, explicit cast operator like (byte) or (int) in Java?",
        options: [
          "int to double",
          "byte to int",
          "long to double",
          "long to int",
        ],
        correctIndex: 3,
        explanation:
          "A long (64-bit) is physically larger than an int (32-bit). Moving from a larger data container down to a smaller container requires an explicit narrowing cast.",
      },
      {
        question:
          "Why does Java perform implicit casting (widening) automatically without requiring extra code?",
        options: [
          "Because the destination data type is larger, guaranteeing that the target value will fit perfectly without any data loss.",
          "Because Java only works properly with decimal numbers.",
          "Because it prevents variables from using up heap storage.",
          "Because the compiler turns all values into text strings first.",
        ],
        correctIndex: 0,
        explanation:
          "Widening conversions change a smaller type to a larger type (like int to long). Since the destination type has more than enough bits to hold the original value, it is always safe and completely automatic.",
      },
      {
        question:
          "Look at this line: char alpha = 'C'; int code = alpha; What is stored inside the variable 'code'?",
        options: [
          "It causes a compilation error because a letter isn't a number.",
          "The numerical ASCII/Unicode value of the character 'C'.",
          "The value 0.",
          'The literal text characters "alpha".',
        ],
        correctIndex: 1,
        explanation:
          "Characters are represented by numeric Unicode numbers behind the scenes. Assigning a char directly to an int works implicitly, copying that character's exact numeric identity code (which is 67 for 'C').",
      },
      {
        question:
          "What dangerous side-effect can happen if you forcefully use explicit narrowing on a number that is too large for the smaller variable type?",
        options: [
          "The program pauses and waits for user intervention.",
          "The variable defaults to null.",
          "The value overflows or wraps around, resulting in a totally incorrect or negative value.",
          "Java automatically upgrades the variable back to a long size.",
        ],
        correctIndex: 2,
        explanation:
          "When a number exceeds the capacity limits of the destination type, the extra binary bits are discarded. This causes data corruption known as integer overflow, giving you an entirely distorted result.",
      },
    ],
  },
  "1-4": {
    theory:
      "A Wrapper class in Java is a class whose object wraps or contains a primitive data type. They provide a way to use primitive data types as objects, which is required because Java collections (like ArrayList and HashMap) can only store objects, not primitives. Java handles the conversion between primitives and wrappers automatically through Autoboxing (primitive to wrapper) and Unboxing (wrapper to primitive). All wrapper classes are immutable and final.",
    keyPoints: [
      "Object Representation: Every primitive has a corresponding wrapper class in the java.lang package (e.g., int → Integer, char → Character).",
      "Autoboxing & Unboxing: Done automatically by the compiler, but can introduce performance overhead or a NullPointerException if a null wrapper is unboxed.",
      "Utility Methods: Provide vital static methods for conversions (e.g., Integer.parseInt(\"123\")) and property checks (e.g., Character.isDigit('5')).",
      "The Integer Cache Pitfall: Java caches Integer objects for values from -128 to 127. Values in this range reuse the same object reference, meaning '==' returns true. Outside this range, '==' returns false because they are distinct objects. Always use .equals() for value comparison.",
    ],
    code: "// Autoboxing & Unboxing\nInteger boxed = 25;        // Autoboxing (primitive int to Integer object)\nint unboxed = boxed;        // Unboxing (Integer object to primitive int)\n\n// Utility Methods\nString numberStr = \"456\";\nint parsedInt = Integer.parseInt(numberStr); // Converts String to primitive int\nboolean isLetter = Character.isLetter('A');  // true\n\n// The Integer Cache Trap\nInteger x = 127;\nInteger y = 127;\nSystem.out.println(x == y); // true (uses cached instances)\n\nInteger a = 128;\nInteger b = 128;\nSystem.out.println(a == b); // false (different objects in memory!)\nSystem.out.println(a.equals(b)); // true (correct way to compare values)\n\n// NullPointerException Risk\nInteger score = null;\n// int finalScore = score; // Throws NullPointerException during automatic unboxing!",
    quizzes: [
      {
        question:
          'What will be the output of this code snippet?\nInteger num1 = 100;\nInteger num2 = 100;\nInteger num3 = 200;\nInteger num4 = 200;\nSystem.out.println((num1 == num2) + " " + (num3 == num4));',
        options: ["true true", "false false", "true false", "false true"],
        correctIndex: 2,
        explanation:
          "Java caches Integer objects from -128 to 127. Because 100 is within this range, num1 and num2 point to the exact same cached object reference, making num1 == num2 true. 200 is outside the cache range, so num3 and num4 point to newly created, distinct objects, making num3 == num4 false.",
      },
      {
        question:
          "Why do we absolutely need Wrapper Classes in Java when we already have primitive data types?",
        options: [
          "Because primitive types make programs run too slowly.",
          "Because Java Collections (like ArrayList) can only store objects, meaning raw primitives cannot be placed inside them directly.",
          "Because wrapper classes are the only data types that can hold negative numbers.",
          "Because wrapper classes automatically encrypt your data for security.",
        ],
        correctIndex: 1,
        explanation:
          "Java collections are designed to work only with Objects. Wrapper classes allow us to pack primitive values into an Object container so they can be stored in Lists, Maps, and Sets.",
      },
      {
        question:
          "Which method should a developer ALWAYS use to reliably compare the actual numerical values inside two Wrapper Objects?",
        options: ["==", "=", ".equals()", ".compareValue()"],
        correctIndex: 2,
        explanation:
          "The '==' operator checks if two reference variables point to the exact same object box in memory. To look *inside* the boxes and compare the actual data values safely, you must use the '.equals()' method.",
      },
      {
        question:
          'What is the name of the built-in utility function used to convert a String containing numbers (like "500") directly into a raw primitive int?',
        options: [
          "Integer.convertString()",
          "Integer.parseInt()",
          "String.toInt()",
          "Integer.valueOf()",
        ],
        correctIndex: 1,
        explanation:
          "'Integer.parseInt()' is a highly popular static utility method that parses a textual String and extracts its matching primitive integer value.",
      },
      {
        question:
          "What happens if you attempt to assign an Integer variable that holds 'null' directly into a raw primitive int variable?",
        options: [
          "The primitive int is safely initialized to 0.",
          "The compilation process fails with a syntax error.",
          "The program runs fine but prints a blank warning message.",
          "The program crashes at runtime with a NullPointerException.",
        ],
        correctIndex: 3,
        explanation:
          "When Java tries to unbox the Integer object into an int, it calls a method behind the scenes to extract the value. If the object reference is 'null', there is no object to extract data from, resulting in a sudden NullPointerException crash.",
      },
    ],
  },
  "1-5": {
    theory:
      "In Java, data types are split into primitives (like raw numbers) and objects. Sometimes, you need to treat a primitive like an object—for example, when adding numbers to a list (ArrayList), because lists in Java can only hold objects, not raw numbers. To bridge this gap, Java provides 'Wrapper Classes' for every primitive type (e.g., Integer for int, Double for double). 'Autoboxing' is when Java automatically converts a primitive into its matching object wrapper. 'Unboxing' is the exact opposite: Java automatically converts the object back into a raw primitive. Before Java 5, programmers had to do this conversion manually using tedious code, but now Java handles it automatically behind the scenes to make writing code much cleaner and easier.",
    keyPoints: [
      "Every primitive type has a matching object version called a Wrapper Class (e.g., int has Integer, char has Character).",
      "Autoboxing: Converting a primitive to an Object (e.g., putting a raw '5' into a box labeled 'Integer').",
      "Unboxing: Taking the primitive value out of the Object box (e.g., pulling '5' out of the 'Integer' box back into a raw int).",
      "Why it matters: Java Collections (like ArrayList or HashMap) cannot hold primitive types; they only hold objects. Autoboxing lets you pass primitives directly into collections.",
      "The Beginner's Trap: If an Object wrapper is null and you try to convert it to a primitive (unboxing), Java will crash with a NullPointerException because you cannot extract a value from 'nothing'.",
    ],
    code: "// 1. AUTOBOXING (Primitive -> Object)\nint primitiveInt = 42;\nInteger boxedObject = primitiveInt; // Java automatically 'boxes' it\nSystem.out.println(\"Boxed Object: \" + boxedObject);\n\n// 2. UNBOXING (Object -> Primitive)\nInteger anotherBox = Integer.valueOf(100);\nint primitiveAgain = anotherBox; // Java automatically 'unboxes' it\nSystem.out.println(\"Unboxed Primitive: \" + primitiveAgain);\n\n// 3. WHERE IT IS COMMONLY USED (Collections)\n// You cannot do: java.util.ArrayList<int> list;\njava.util.ArrayList<Integer> objectList = new java.util.ArrayList<>();\n\nobjectList.add(10); // Autoboxing: compiler turns the raw number 10 into an Integer object\nint firstItem = objectList.get(0); // Unboxing: compiler extracts the raw int value from the object\n\n// 4. THE FRESHMAN PITFALL (NullPointerException)\nInteger emptyBox = null; \ntry {\n    int criticalError = emptyBox; // CRASH! Trying to unbox a 'null' object into a primitive\n} catch (NullPointerException e) {\n    System.out.println(\"Error caught! You cannot unbox a null object into a primitive variable.\");\n}",
    quizzes: [
      {
        question:
          "Which of the following code snippets will trigger a NullPointerException due to improper unboxing?",
        options: [
          "Integer num = 10; int result = num;",
          "Integer num = null; int result = num;",
          "int num = 0; Integer result = num;",
          "Integer num = Integer.valueOf(5);",
        ],
        correctIndex: 1,
        explanation:
          "If an Integer object is 'null', it means it points to nothing. Trying to assign it to a primitive 'int' forces Java to perform unboxing. Since there is no number inside the box to extract, Java throws a NullPointerException.",
      },
      {
        question:
          "What happens automatically behind the scenes when you write the line: Integer myObject = 50;",
        options: [
          "Explicit Casting",
          "Autoboxing",
          "Unboxing",
          "Data Truncation",
        ],
        correctIndex: 1,
        explanation:
          "Java detects that you are assigning a raw primitive 'int' (50) to an 'Integer' object type, so it automatically wraps ('boxes') the number into an object container.",
      },
      {
        question:
          "Why does the code 'ArrayList<int> scores = new ArrayList<>();' cause a compilation error in Java?",
        options: [
          "ArrayLists can only store reference types (objects), not raw primitive types like 'int'.",
          "The word 'ArrayList' must always be fully capitalized.",
          "ArrayLists cannot hold numeric values.",
          "You must declare the initial maximum capacity size inside the parentheses.",
        ],
        correctIndex: 0,
        explanation:
          "Java Collections can only hold objects. To make a list of integers, you must use the Wrapper Class name 'Integer' instead of the primitive type 'int'.",
      },
      {
        question: "What is the exact inverse operation of Autoboxing called?",
        options: [
          "Type Widening",
          "Explicit Casting",
          "Unboxing",
          "Object Parsing",
        ],
        correctIndex: 2,
        explanation:
          "While Autoboxing converts a primitive into a wrapper object, Unboxing is the reverse process where Java automatically pulls the primitive value out of that object container.",
      },
      {
        question:
          "If you look at the statement 'int value = objectList.get(0);' where the list stores Integer objects, what process is Java performing?",
        options: [
          "It is performing unboxing to convert the retrieved Integer object into a raw primitive int value.",
          "It is performing widening casting to make the number consume more bit storage.",
          "It is allocating new memory on the heap tracking reference.",
          "It is converting text digits into a math sequence.",
        ],
        correctIndex: 0,
        explanation:
          "Because 'objectList.get(0)' provides an Integer object wrapper and you are saving it into a primitive 'int' variable, Java handles the conversion automatically by running an unboxing mechanism.",
      },
    ],
  },
  "1-6": {
    theory:
      "Imagine a method as a helpful kitchen appliance, like a juicer. You put fruit in (inputs), it squeezes the fruit (actions), and it hands you a glass of juice (output). In coding, a method is just a named block of code that does a specific job. Instead of writing the exact same code over and over again, you write it once inside a method. Then, whenever you need that job done, you just shout the method's name to run it. This keeps your code clean, neat, and organized.",
    keyPoints: [
      "Don't Repeat Yourself: Methods let you write a piece of code once and reuse it anywhere, anytime.",
      "The Name: Give your method a clear name that states exactly what it does (like 'calculateTax' or 'sendEmail').",
      "Inputs (Parameters): These are the pieces of information you feed into the method so it can do its job.",
      "Outputs (Return Value): This is the final result the method hands back to you. If a method doesn't hand back any result and just does a physical action (like printing text to the screen), we use the keyword 'void'.",
      "How to use it: To make a method run, you 'call' it by writing its name followed by parentheses, like this: greetUser();",
    ],
    code: 'public class SimpleMethodExample {\n\n    public static void main(String[] args) {\n        // 1. Calling a simple method that just prints text\n        sayHello();\n\n        // 2. Calling a method, giving it inputs, and saving the answer\n        int totalCandy = doubleTheAmount(5); // We pass 5 as an input\n        System.out.println("Doubled amount: " + totalCandy); // Prints 10\n    }\n\n    // A simple \'void\' method (It does an action but gives back NO data answer)\n    public static void sayHello() {\n        System.out.println("Hello, Friend!");\n    }\n\n    // A method that expects an input (int number) and gives back an output (int answer)\n    public static int doubleTheAmount(int startingNumber) {\n        int answer = startingNumber * 2;\n        return answer; // This sends the final result back to the main program\n    }\n}',
    quizzes: [
      {
        question:
          "If a method calculates your age and needs to send that age number back to the main program, what should its return type be?",
        options: ["void", "String", "int", "boolean"],
        correctIndex: 2,
        explanation:
          "An age is a whole number, so the method needs to return an 'int' (integer). If you used 'void', the method would not be able to send any data answer back to your program.",
      },
      {
        question:
          "What is the primary architectural purpose of utilizing methods in software engineering?",
        options: [
          "To make the code run completely error-free automatically.",
          "To avoid writing duplicate code, allowing blocks of logic to be written once and reused multiple times.",
          "To ensure all variables are allocated inside heap memory storage.",
          "To turn console applications into web-based user dashboards.",
        ],
        correctIndex: 1,
        explanation:
          "Methods enable 'Code Reusability' (DRY: Don't Repeat Yourself). Instead of copying and pasting the same operations throughout your codebase, you abstract it into a method and call it wherever needed.",
      },
      {
        question:
          "If you define a method with the signature 'public static void clearScreen()', what can you expect this method to return when executed?",
        options: [
          "An integer value of 0.",
          "A boolean flag indicating status.",
          "Absolutely nothing; the 'void' keyword means it returns no data value to the caller.",
          "A null tracking pointer layout.",
        ],
        correctIndex: 2,
        explanation:
          "The 'void' keyword explicitly dictates to the Java compiler that the method executes its internal logic operations but does not hand back any result data back to the calling structure.",
      },
      {
        question:
          "Which of the following is the correct syntax layout to trigger or 'call' a method named 'processPayment' that requires no arguments?",
        options: [
          "call processPayment;",
          "processPayment();",
          "new processPayment;",
          "execute processPayment();",
        ],
        correctIndex: 1,
        explanation:
          "To invoke or execute a method in Java, you simply type the exact identifier name followed by matching parentheses '()' and a ending semicolon.",
      },
      {
        question:
          "What will happen during compilation if a method is declared to return an 'int' value, but you forget to include a 'return' statement inside the code block?",
        options: [
          "Java automatically returns 0 by default.",
          "The program crashes with a NullPointerException when launched.",
          "A compilation error occurs stating that a return statement is missing.",
          "The method runs indefinitely in an infinite processing loop.",
        ],
        correctIndex: 2,
        explanation:
          "If a method specifies a concrete return type other than 'void', it makes a formal promise to the compiler to supply that data type. Forgetting the 'return' statement breaks that contract, leading to a compilation failure.",
      },
    ],
  },
  "1-7": {
    theory:
      "Think of parameters and return types as the input and output slots of a machine. Parameters are the inputs—they are the blank variables you define inside the method's parentheses so it can receive data to work with. Return types are the outputs—they specify the exact type of data the method will give back to you when it finishes its job. If a method does not need to send any data back, we use the keyword 'void'. Together, they allow your methods to communicate seamlessly with the rest of your program by accepting raw information, processing it, and delivering a result.",
    keyPoints: [
      "Parameters (Inputs): The placeholders inside the method definition that tell Java, 'Hey, this method needs these specific pieces of info to run.'",
      "Arguments: The actual values you pass into those parameter slots when you call the method.",
      "Return Type (Output): The data type (like int, String, double, or boolean) listed right before the method name that promises what kind of value the method will hand back.",
      "The 'return' Keyword: Used inside the method to stop its execution and instantly ship the final answer back to the caller.",
      "The 'void' Rule: If a method's return type is 'void', it cannot use the 'return' keyword to send data back (though it can use a bare 'return;' to exit early).",
    ],
    code: 'public class InputsAndOutputs {\n\n    public static void main(String[] args) {\n        // Passing arguments \'Alice\' and 3 into the method\n        String announcement = createGreeter("Alice", 3);\n        System.out.println(announcement);\n        \n        // Calling a method with no parameters and storing the boolean output\n        boolean isStoreOpen = checkSystemStatus();\n        System.out.println("Is the store open? " + isStoreOpen);\n    }\n\n    // 1. Method with parameters (String name, int badgeNumber) and a String return type\n    public static String createGreeter(String name, int badgeNumber) {\n        // Combining the inputs into a single message\n        String message = "Welcome Employee: " + name + " (ID: " + badgeNumber + ")";\n        return message; // Sending the String back\n    }\n\n    // 2. Method with NO parameters and a boolean return type\n    public static boolean checkSystemStatus() {\n        int currentHour = 14; // Imagine this is 2 PM\n        if (currentHour >= 9 && currentHour <= 18) {\n            return true; // Return true if business hours\n        }\n        return false; // Otherwise return false\n    }\n}',
    quizzes: [
      {
        question: "What is the difference between a parameter and an argument?",
        options: [
          "Parameters are numbers, while arguments are text strings.",
          "Parameters are the variables defined in the method setup; arguments are the actual values you pass into them when calling it.",
          "Arguments are defined in the method setup; parameters are the values you pass into them.",
          "There is no difference; they are exactly the same thing.",
        ],
        correctIndex: 1,
        explanation:
          "Parameters act as the placeholder variables inside the method's definition (like 'String name'). Arguments are the real, live data values (like '\"Alice\"') you feed into those placeholders when you make the method run.",
      },
      {
        question:
          "Given the method declaration 'public static double calculateInterest(int principal, double rate)', what is the return type?",
        options: ["public", "int", "double", "calculateInterest"],
        correctIndex: 2,
        explanation:
          "The return type is explicitly specified directly before the method name. In this instance, it is 'double', meaning this method promises to return a floating-point decimal value.",
      },
      {
        question:
          "What instantly occurs within execution flow when Java encounters a 'return' statement inside a non-void method?",
        options: [
          "The method restarts from the beginning.",
          "The method completely stops executing right then and there, and spits the specified value back to the caller.",
          "The value is stored in a public global variable.",
          "The application pauses and checks for syntax warnings.",
        ],
        correctIndex: 1,
        explanation:
          "The 'return' keyword instantly terminates the current execution sequence inside the method block and sends the following value directly back to whichever point initiated the method call.",
      },
      {
        question:
          "What will happen if you attempt to assign the output of a method declared as 'public static void printReport()' to a variable like 'int result = printReport();'?",
        options: [
          "The variable 'result' is initialized to 0.",
          "The code compiles successfully but sets the variable value to null.",
          "A compilation error occurs because a 'void' method does not produce any value to assign.",
          "The method runs twice to check for errors.",
        ],
        correctIndex: 2,
        explanation:
          "A method explicitly marked with a 'void' return status produces no output data. Attempting to trap its non-existent return value inside a variable yields a direct compiler layout mismatch error.",
      },
      {
        question:
          "Look at this snippet: 'public static boolean isEven(int checkNum)'. What represents the method parameter?",
        options: [
          "boolean",
          "isEven",
          "int checkNum",
          "The matching arguments inside main",
        ],
        correctIndex: 2,
        explanation:
          "The declaration syntax components inside the method parentheses ('int checkNum') define the required placeholder variables, which are formally designated as the method parameters.",
      },
    ],
  },
};
