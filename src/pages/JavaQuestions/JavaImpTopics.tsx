import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Container,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TerminalIcon from "@mui/icons-material/Terminal";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const importantTopicsData = [
  {
    title: "Java Memory Management",
    image: "public/Java Imp images/imp1.jpg",
    description: `Most beginners get confused between JDK, JRE, and JVM.
Let’s simplify it 👇

🔹 JVM (Java Virtual Machine)
👉 Executes Java bytecode
👉 Platform independent

🔹 JRE (Java Runtime Environment)
👉 Provides libraries + JVM to run Java apps

🔹 JDK (Java Development Kit)
👉 Everything you need to develop Java apps (JRE + tools)

💡 Simple analogy:
JDK = Kitchen
JRE = Ingredients
JVM = Chef 👨‍🍳

👉 Without JVM, Java cannot run!`,
  },
  {
    title: "Object-Oriented Programming (OOP) Concepts",
    images: [
      "public/Java Imp images/img2.jpg",
      "public/Java Imp images/img2.1.jpg",
      "public/Java Imp images/img2.2.jpg",
    ],
    description:
      'Day 2 – Mastering OOP Concepts with Real-Life Examples (Java)\n\nObject-Oriented Programming (OOP) is the backbone of Java. Instead of memorizing definitions, let’s understand it with simple real-life examples \n\n🔹 1. Encapsulation (Data Hiding)\n👉 Example: A bank account\nYou can’t directly access your balance. You use methods like deposit() or withdraw()\n✔️ Data is protected\n✔️ Access is controlled\n\n🔹 2. Inheritance (Reusability)\n👉 Example: Parent → Child\nA child inherits features like surname, traits from parents\n✔️ Code reuse\n✔️ Reduces duplication\n\n🔹 3. Polymorphism (Many Forms)\n👉 Example: Same action, different behavior\nPayment → can be Credit Card / UPI / Cash\n✔️ Same method, different implementation\n\n🔹 4. Abstraction (Hide Complexity)\n👉 Example: Driving a car 🚗\nYou use steering, brake, accelerator — but don’t know engine internals\n✔️ Focus on "what", not "how"\n\n💡 Why OOP matters?\nBecause it helps us write clean, reusable, scalable code — just like real-world systems.',
  },
  {
    title: "Java Collections Framework",
    image: "public/Java Imp images/img3.jpg",
    description:
      "Day 3 – ArrayList vs LinkedList (Java) Simplified\n\nIf you’re learning Java, this is one of the most common interview questions👇\nLet’s break it down in the simplest way 👇\n\n🔹 ArrayList\n👉 Backed by a dynamic array\n\n✔️ Fast for reading (get operations)\n✔️ Efficient for accessing elements by index\n❌ Slow for inserting/deleting in middle (shifting required)\n\n📌 Example:\nThink of it like a row of seats in a theater 🎭\nIf someone leaves in the middle → everyone needs to shift\n\n\n🔹 LinkedList\n👉 Made of nodes connected with pointers\n\n✔️ Fast insertions/deletions\n✔️ No shifting needed\n❌ Slow for accessing elements (no direct index)\n\n📌 Example:\nThink of it like a train 🚆\nEach coach is connected → easy to add/remove coaches\n\n⚡ Key Differences at a Glance\n\nArrayList 🟢\n- Data Structure: Dynamic Array\n- Access Time: Fast ⚡\n- Insert/Delete: Slow (shift)\n- Memory: Less\n\nLinkedList 🔵\n- Data Structure: Doubly Linked List\n- Access Time: Slow 🐢\n- Insert/Delete: Fast (no shift)\n- Memory: More (extra pointers)\n\n💡 When to use what?\n\n✔️ Use ArrayList → when you need fast reads\n✔️ Use LinkedList → when frequent insert/delete operations\n\n🔥 Pro Tip:\nIn real-world applications, ArrayList is used more often because read operations are more common.",
  },
  {
    title: "Exception Handling in Java",
    images: [
      "public/Java Imp images/img4.jpg",
      "public/Java Imp images/img4.1.jpg",
      "public/Java Imp images/img4.2.jpg",
    ],
    description:
      'Day 4 — Exception Handling in Java — Explained Simply 👇\n\n🔹 What is Exception Handling?\n👉 It is a way to handle errors so your program doesn’t crash\n💡 In simple words:\n👉 “Handle problems without stopping the program”\n\n🔹 Types of Exceptions:\n\n✅ Checked Exceptions\n👉 Checked at compile time\n👉 Example: IOException, SQLException\n\n✅ Unchecked Exceptions\n👉 Occur at runtime\n👉 Example: NullPointerException, ArithmeticException\n\n🔹 Why do we use it?\n👉 To avoid program crashes\n👉 To handle errors gracefully\n👉 To improve user experience\n\n🔹 When do we use it?\n👉 When there is a chance of error\nExamples:\nFile handling 📂\nDatabase connection 🗄️\nUser input ⚠️\n🔹 Real-Time Example:\n💡 ATM Machine 🏧\n👉 If withdrawal fails (low balance),\nsystem shows message instead of crashing\n\n💡 Java Example:\ntry {\nint a = 10/0;\n} catch(Exception e) {\nSystem.out.println("Handled error");\n}',
  },
  {
    title: "Multithreading in Java",
    images: [
      "public/Java Imp images/img5.jpg",
      "public/Java Imp images/img5.2.jpg",
      "public/Java Imp images/img5.3.jpg",
    ],
    description:
      'Day 5 — Multithreading in Java — Explained Simply 👇\n\nLet’s understand it simply 👇\n\n🔹 What is a Thread?\n👉 A small unit of a process (a task)\n\n🔹 What is Multithreading?\n👉 Running multiple tasks at the same time\n\n💡 Real-life example:\n👉 Cooking in a kitchen 🍳\nOne person cuts vegetables\nAnother cooks\nAnother serves\n➡️ Multiple tasks happening together = Multithreading\n\n🔹 Why use Multithreading?\n👉 Faster execution\n👉 Better performance\n👉 Efficient CPU usage\n\n🔹 How to create a Thread?\n✅ By extending Thread class\n✅ By implementing Runnable interface\n\n💡 Example:\nnew Thread(() -> {\nSystem.out.println("Running thread");\n}).start();\n\n💡 Simple idea:\n👉 One task = slow\n👉 Multiple tasks = fast 🚀',
  },
  {
    title: "Java in the Age of AI",
    images: ["public/Java Imp images/img6.jpg"],
    description:
      "🚀 Java in the Age of AI: More Relevant Than Ever\n\nWith all the buzz around AI, many people assume traditional languages like Java are losing importance. But the reality is quite the opposite.\n\nHere’s a simple perspective 👇\n\n🧠 AI builds intelligence, but Java builds systems\nAI models can generate insights, predictions, and responses — but they don’t run businesses. Java powers the backend systems where real decisions, workflows, and transactions happen.\n\n⚙️ Most developers don’t train AI — they integrate it\n\nIn real-world applications, we:\nCall AI APIs\nProcess responses\nEmbed AI into products\n\nAnd Java is one of the best languages for building scalable, reliable backend systems to handle this.\n\n📦 Strong ecosystem advantage\nWith frameworks like Spring and emerging tools like Spring AI, Java developers can easily integrate AI without switching tech stacks.\n\n☁️ Built for scale and performance\nAI applications demand high performance and cost efficiency. Java’s JVM and cloud-native capabilities make it ideal for deploying large-scale AI-powered systems.\n\n🛡️ Reliability matters more than ever\nAI can sometimes be unpredictable. Java systems ensure:\n\nValidation\nSecurity\nBusiness logic enforcement\n👉 AI suggests, but Java decides.\n\n💡 Final Thought\nThe future is not about replacing Java with AI.\nIt’s about combining AI with strong backend systems — and Java remains a key player in making AI usable in the real world.",
  },
  {
    title: "Streams in Java",
    images: [
      "public/Java Imp images/img7.jpg",
      "public/Java Imp images/img7.1.jpg",
    ],
    description:
      "Day 6 —  Streams in Java — Explained Simply 👇\n\nLet’s understand it simply 👇\n\nIf you're still using traditional loops in Java, it's time to level up with Streams (introduced in Java 8).\n\n💡 What are Java Streams?\nStreams help you process collections (like lists) in a clean, readable, and functional way.\n\n🔹 Example: Traditional vs Stream\n👉 Without Stream:\nfor (int n : list) {\n if (n % 2 == 0) {\n System.out.println(n);\n }\n}\n👉 With Stream:\nlist.stream()\n .filter(n -> n % 2 == 0)\n .forEach(System.out::println);\n\n🔹 Why Developers Love Streams?\n✔ Less code\n✔ More readability\n✔ Easy data transformations\n✔ Supports parallel processing\n\n🔹 Common Operations\n✨ filter() → select data\n✨ map() → transform data\n✨ sorted() → sort elements\n✨ collect() → convert to list\n\n🔹 Real Power Example\nlist.stream()\n .filter(n -> n > 2)\n .map(n -> n * 2)\n .forEach(System.out::println);\n\n📌 Pro Tip:\nUse parallelStream() for handling large datasets efficiently using multithreading ⚡\n\n💬 Final Thought:\n\"Streams turn complex data processing into simple pipelines.\"",
  },
  {
    title: "String vs StringBuilder vs StringBuffer",
    images: ["public/Java Imp images/img8.jpg"],
    description:
      'Day 7: String vs StringBuilder vs StringBuffer (Java)\n\nUnderstanding the difference between these three is 🔑 for writing efficient Java code!\n\n🔹 1. String :\nImmutable (cannot be changed)\nEvery modification creates a new object ❗\nSlower for frequent updates\nString s = "Hello";\ns = s + " World"; // creates new object\n\n🔹 2. StringBuilder :\nMutable (can be changed)\nFaster than String ⚡\nNot thread-safe\nStringBuilder sb = new StringBuilder("Hello");\nsb.append(" World");\n\n🔹 3. StringBuffer :\nMutable\nThread-safe (synchronized) 🔒\nSlightly slower than StringBuilder\nStringBuffer sbf = new StringBuffer("Hello");\nsbf.append(" World");\n\n\n🔹 When to Use :\n✔ Use String → when data doesn’t change\n✔ Use StringBuilder → for single-threaded performance\n✔ Use StringBuffer → for multi-threaded safety\n\n💡 Pro Tip:\nIn most modern applications, StringBuilder is preferred unless thread safety is required.\n\n📌 Final Thought:\n"Choose the right tool — it directly impacts performance."',
  },
  {
    title: "equals() vs == in Java",
    images: ["public/Java Imp images/img9.jpg"],
    description:
      'Day 8: equals() vs == in Java (Very Important Interview Topic)\n\nThis is one of the most commonly asked Java interview questions — and also one of the most misunderstood! 👇\n\n🔹 == (Double Equals)\nCompares memory/reference location\nChecks if two objects point to the same memory\nString a = new String("Java");\nString b = new String("Java");\nSystem.out.println(a == b); // false ❌\n\n🔹 equals() Method\nCompares actual content (values)\nDefined inside Object class (can be overridden)\nString a = new String("Java");\nString b = new String("Java");\nSystem.out.println(a.equals(b)); // true ✅\n\n🔹 String Special Case (String Pool)\nString x = "Hello";\nString y = "Hello";\nSystem.out.println(x == y); // true ✅\n\n👉 Because both refer to same object in String Pool\n\n💡 Pro Tip:\nAlways use equals() for comparing object values — especially Strings!\n\n📌 Final Thought:\n"== checks if objects are the same, equals() checks if values are the same."',
  },
  {
    title: "HashMap Internal Working",
    images: ["public/Java Imp images/img10.jpg"],
    description:
      '🔥 Day 9: HashMap Internal Working (Java)\n\nOne of the most important concepts for interviews — let’s break it down simply 👇\n\n🔹 What is HashMap?\nA HashMap in Java stores data in key-value pairs for fast access.\n\n🔹 How HashMap Works Internally?\n👉 Step-by-step:\n1️⃣ Hashing\nKey → converted into a hashcode using hashCode()\n\n2️⃣ Index Calculation\nIndex = hashcode % array size\n\n3️⃣ Storage (Bucket)\nData stored in an array (called buckets)\n\n4️⃣ Collision Handling\nIf multiple keys map to same index:\n✔ Uses LinkedList (Java 7)\n✔ Uses Tree (Red-Black Tree) when entries > 8 (Java 8)\n\n🔹 Simple Example\nimport java.util.HashMap;\n\npublic class Main {\n public static void main(String[] args) {\n HashMap<Integer, String> map = new HashMap<>();\n\n map.put(1, "Java");\n map.put(2, "Python");\n map.put(3, "C++");\n\n System.out.println(map.get(2)); // Python\n }\n}\n\n🔹 Collision Example\nmap.put(10, "A");\nmap.put(20, "B"); // may go to same bucket\n👉 Both stored in same bucket → handled internally\n\n🔹 Key Points\n✔ Default size = 16\n✔ Load factor = 0.75\n✔ Resizes when threshold exceeded\n✔ Not thread-safe ❌\n\n🔹 Real-Life Analogy\n📦 Think of HashMap like:\nApartment building (array)\nEach flat = bucket\nPeople with same flat number = collision\n\n💡 Pro Tip:\nGood hashCode() + equals() = Better performance 🚀\n\n📌 Final Thought:\n"HashMap is fast because it uses hashing — not searching."',
  },
  {
    title: "HashSet vs TreeSet vs LinkedHashSet",
    images: ["public/Java Imp images/img11.jpg"],
    description:
      '🔥 Day 10: HashSet vs TreeSet vs LinkedHashSet (Java)\n\nUnderstanding Sets becomes much easier when you know what each one is meant for 👇\n\n🔹 1. HashSet\n\n👉 Definition: A Set that stores unique elements with no guaranteed order, optimized for fast performance.\n\nHashSet<Integer> set = new HashSet<>();\nset.add(3);\nset.add(1);\nset.add(2);\nSystem.out.println(set); // order not guaranteed\n\n🔹 2. LinkedHashSet\n\n👉 Definition: A Set that stores unique elements while maintaining insertion order.\n\nLinkedHashSet<Integer> set = new LinkedHashSet<>();\nset.add(3);\nset.add(1);\nset.add(2);\nSystem.out.println(set); // [3, 1, 2]\n\n🔹 3. TreeSet\n\n👉 Definition: A Set that stores unique elements in sorted (natural or custom) order.\n\nTreeSet<Integer> set = new TreeSet<>();\nset.add(3);\nset.add(1);\nset.add(2);\nSystem.out.println(set); // [1, 2, 3]\n\n💡 Pro Tip:\n\nThink of Sets like this:\nHashSet = Speed ⚡\nLinkedHashSet = Order 📌\nTreeSet = Sorting 🔄\n\n📌 Final Thought:\n"Same uniqueness, different behavior — choose wisely."',
  },
  {
    title: "Comparable vs Comparator",
    images: ["public/Java Imp images/img12.jpg"],
    description:
      '🔥 Day 11: Comparable vs Comparator (Java)\n\nOne of the most important concepts for sorting in Java — especially for interviews 👇\n\n🔹 1. Comparable\n👉 Definition: Defines the natural (default) sorting of objects inside the class itself.\n✔ Found in java.lang\n✔ Uses compareTo() method\n✔ Only one sorting logic per class\n\n🔹 2. Comparator\n👉 Definition: Defines custom sorting logic outside the class.\n✔ Found in java.util\n✔ Uses compare() method\n✔ Supports multiple sorting logics\n\n\n🔹 When to Use?\n✔ Comparable → when class has natural/default order\n✔ Comparator → when you need multiple or dynamic sorting\n\n💡 Real-Life Analogy:\nComparable = Default rule 📏\nComparator = Custom rule 🎯\n\n📌 Final Thought:\n"Comparable gives you one way to sort, Comparator gives you many."',
  },
  {
    title: "forEach vs Stream vs Parallel Stream",
    images: ["public/Java Imp images/img13.jpg"],
    description:
      '🔥 Day 12: forEach vs Stream vs Parallel Stream (Java)\n\nAnother important concept for writing clean and efficient Java code 👇\n\n🔹 1. forEach (Traditional / External Iteration)\n👉 Definition: Iterates over elements one by one using loops or forEach().\n✔ Simple and easy to use\n✔ Full control over iteration\n✔ Runs in a single thread\n\n🔹 2. Stream (Sequential Stream)\n👉 Definition: Processes data in a pipeline (functional style) sequentially.\n✔ Cleaner and more readable code\n✔ Supports operations like filter(), map()\n✔ Runs in a single thread\n\n🔹 3. Parallel Stream\n👉 Definition: Processes data using multiple threads simultaneously.\n✔ Faster for large datasets ⚡\n✔ Uses multi-core processors\n✔ Order may not be guaranteed ❗\n\n🔹 When to Use?\n✔ forEach → simple iteration & full control\n✔ Stream → clean transformations & readability\n✔ Parallel Stream → large data + performance needs\n\n💡 Pro Tip:\nParallel streams are powerful — but use them carefully. Not every task benefits from parallelism.\n\n📌 Final Thought:\n"Write simple with forEach, clean with Stream, fast with Parallel Stream."',
  },
  {
    title: "Optional Class",
    images: ["public/Java Imp images/img14.jpg"],
    description:
      '🔥 Day 13: Optional Class (Java 8)\n\nHandling null values is one of the most common problems in Java — and that’s where Optional comes in 👇\n\n🔹 What is Optional?\n👉 Definition: Optional is a container object introduced in Java 8 that may or may not contain a non-null value.\n\n🔹 Why use Optional?\n✔ Avoids NullPointerException ❌\n✔ Makes code more readable\n✔ Encourages better null handling\n\n🔹 Common Methods\n✨ of(value) → creates Optional (no null allowed)\n✨ ofNullable(value) → allows null\n✨ isPresent() → checks if value exists\n✨ get() → gets value (use carefully ⚠️)\n✨ orElse(default) → returns default if null\n✨ ifPresent() → runs code if value exists\n\n🔹 Simple Example\n\nimport java.util.Optional;\nOptional<String> name = Optional.ofNullable(null);\n// Check value\nSystem.out.println(name.isPresent()); // false\n// Default value\nSystem.out.println(name.orElse("Default Name"));\n\n👉 Output:\nfalse\nDefault Name\n\n🔹 Better Way (Recommended)\nOptional<String> name = Optional.of("Java");\nname.ifPresent(n -> System.out.println(n));\n\n🔹 Key Points\n✔ Optional is mainly used for return types\n✔ Avoid using get() without checking\n✔ Helps write cleaner and safer code\n\n💡 Pro Tip:\nUse orElseThrow() when you want to throw exception instead of default value\n\n📌 Final Thought:\n"Optional doesn’t remove null — it helps you handle it better."',
  },
  {
    title: "Immutable Class",
    images: ["public/Java Imp images/img15.jpg"],
    description:
      '🔥 Day 14: Immutable Class (How String is Immutable in Java)\n\nOne of the most important concepts in Java — especially for interviews 👇\n\n🔹 What is an Immutable Class?\n👉 Definition: An immutable class is a class whose objects cannot be changed once created.\n\n🔹 Example: String\nString s = "Hello";\ns.concat(" World");\nSystem.out.println(s); // Hello (not changed)\n👉 Why Because String is immutable\n\n🔹 How String Becomes Immutable?\n✔ String class is final (cannot be extended)\n✔ Internal data is private & final\n✔ No methods modify the original object\n✔ Any change creates a new object\n\n🔹 Behind the Scenes\nString s1 = "Hello";\nString s2 = s1.concat(" World");\nSystem.out.println(s1); // Hello\nSystem.out.println(s2); // Hello World\n👉 s1 remains unchanged\n👉 s2 is a new object\n\n🔹 Why Immutability is Important?\n✔ Thread-safe (no synchronization needed)\n✔ Security (safe for sharing data)\n✔ Caching (String Pool optimization)\n✔ Reliable & predictable behavior\n\n🔹 How to Create Your Own Immutable Class?\n✔ Make class final\n✔ Make fields private final\n✔ No setters\n✔ Initialize via constructor only\n✔ Return copies of mutable objects\n\n🔹 Real-Life Analogy\n📦 Like a sealed box — once created, you cannot change what’s inside.\n\n💡 Pro Tip:\nUse immutable objects for better performance and safety in multi-threaded applications.\n\n📌 Final Thought:\n"Immutability = Safety + Simplicity + Performance" ',
  },
  {
    title: "Functional Interfaces & Lambda Expressions",
    images: ["public/Java Imp images/img16.jpg"],
    description:
      '🔥 Day 15: Functional Interfaces & Lambda Expressions (Java)\n\nOne of the core concepts behind modern Java (introduced in Java 8) — clean, concise, and powerful 👇\n\n🔹 1. Functional Interface\n👉 Definition: An interface that contains exactly one abstract method.\n✔ Can have multiple default/static methods\n✔ Annotated with @FunctionalInterface (optional but recommended)\nExamples:\n✔ Runnable\n✔ Callable\n✔ Comparator\n\n🔹 2. Lambda Expression\n👉 Definition: A short way to implement a functional interface without creating a class.\n🧠 Think of it as: “function without name”\n\n🔹 Traditional Way vs Lambda\n👉 Without Lambda:\nRunnable r = new Runnable() {\n public void run() {\n System.out.println("Hello Java");\n }\n};\n\n👉 With Lambda:\nRunnable r = () -> System.out.println("Hello Java");\n\n🔹 Syntax\n(parameters) -> expression\nExamples:\n(int a, int b) -> a + b\nx -> x * x\n() -> System.out.println("Hi")\n\n🔹 Why Use Lambda?\n✔ Less boilerplate code\n✔ Improves readability\n✔ Enables functional programming\n✔ Works perfectly with Streams\n\n🔹 Built-in Functional Interfaces\n✔ Predicate<T> → returns boolean\n✔ Function<T, R> → transforms data\n✔ Consumer<T> → performs action\n✔ Supplier<T> → provides data\n\n🔹 When to Use?\n✔ When interface has one abstract method\n✔ With collections & streams\n✔ For cleaner and shorter code\n\n💡 Pro Tip:\nUse lambda expressions with Streams to write powerful one-line operations 🚀\n\n📌 Final Thought:\n"Write less code, do more work — that’s the power of Lambda."',
  },
  {
    title: "Method References (:: operator)",
    images: ["public/Java Imp images/img17.jpg"],
    description:
      '🔥 Day 16: Method References (:: operator) in Java\n\nA powerful feature introduced in Java 8 that makes your code cleaner and more readable 👇\n\n🔹 What is Method Reference?\n👉 Definition: A shorter way to refer to a method using :: instead of writing a lambda expression.\n\n🔹 Why Use It?\n✔ Reduces boilerplate code\n✔ Improves readability\n✔ Works perfectly with Streams & Functional Interfaces\n\n🔹 Lambda vs Method Reference\n👉 Using Lambda:\nlist.forEach(x -> System.out.println(x));\n👉 Using Method Reference:\nlist.forEach(System.out::println);\n✨ Cleaner & simpler!\n\n🔹 Types of Method References\n1️⃣ Static Method Reference\nClassName::staticMethod\n2️⃣ Instance Method (of object)\nobject::instanceMethod\n3️⃣ Instance Method (of class)\nClassName::instanceMethod\n4️⃣ Constructor Reference\nClassName::new\n\n🔹 Examples\n✔ Static:\nMath::max\n✔ Instance:\nSystem.out::println\n✔ Constructor:\nArrayList::new\n\n🔹 When to Use?\n✔ When lambda just calls an existing method\n✔ To make code shorter and cleaner\n✔ With Streams and Functional Interfaces\n\n💡 Pro Tip:\nIf your lambda looks like 👉 (x) -> method(x)\nYou can replace it with 👉 Class::method\n\n📌 Final Thought:\n"Method Reference = Cleaner Lambda"',
  },
  {
    title: "Default & Static Methods in Interfaces",
    images: ["public/Java Imp images/img18.jpg"],
    description:
      '🔥 Day 17: Default & Static Methods in Interfaces (Java)\n\nA powerful feature introduced in Java 8 that made interfaces much more flexible 👇\n\n🔹 1. Default Methods\n👉 Definition: Methods inside an interface with a body (implementation) using default keyword.\n✔ Allows adding new methods without breaking existing code\n✔ Can be overridden in implementing classes\n\ninterface MyInterface {\n default void show() {\n System.out.println("Default Method");\n }\n}\n\n🔹 2. Static Methods\n👉 Definition: Methods inside an interface with a body using static keyword.\n✔ Belongs to the interface, not to objects\n✔ Cannot be overridden\n\ninterface MyInterface {\n static void display() {\n System.out.println("Static Method");\n }\n}\n\n🔹 How to Call?\n✔ Default method:\nMyInterface obj = new MyClass();\nobj.show();\n✔ Static method:\nMyInterface.display();\n\n🔹 Why Introduced?\n✔ Backward compatibility\n✔ Add new features to interfaces\n✔ Reduce need for utility classes\n\n💡 Pro Tip:\nUse default methods for shared behavior and static methods for utility logic.\n\n📌 Final Thought:\n"Interfaces are no longer just contracts — they can have behavior too."',
  },
  {
    title: "Serialization & Deserialization",
    images: ["public/Java Imp images/img19.jpg"],
    description:
      ' Day 18 A very important concept for saving and transferring objects in Java 👇\n\n🔹 1. Serialization\n👉 Definition: Converting an object into a byte stream so it can be saved to a file or sent over a network.\n✔ Used for file storage 📁\n✔ Used in networking 🌐\n✔ Implemented using Serializable interface\n\n🔹 2. Deserialization\n👉 Definition: Converting the byte stream back into an object.\n✔ Restores object state\n✔ Used when reading from file/network\n\n🔹 Simple Example\nimport java.io.*;\n// Serializable class\nclass Student implements Serializable {\n int id;\n String name;\n Student(int id, String name) {\n this.id = id;\n this.name = name;\n }\n}\n\npublic class Main {\n public static void main(String[] args) throws Exception {\n // Serialization\n Student s1 = new Student(1, "Java");\n ObjectOutputStream oos = new ObjectOutputStream(\n new FileOutputStream("data.txt"));\n oos.writeObject(s1);\n oos.close();\n // Deserialization\n ObjectInputStream ois = new ObjectInputStream(\n new FileInputStream("data.txt"));\n Student s2 = (Student) ois.readObject();\n ois.close();\n System.out.println(s2.id + " " + s2.name);\n }\n}\n\n🔹 Key Points\n✔ Must implement Serializable interface\n✔ Use ObjectOutputStream → write object\n✔ Use ObjectInputStream → read object\n✔ transient keyword → skip fields\n\n🔹 Real-Life Analogy\n📦 Serialization = Packing an object into a box\n📦 Deserialization = Unpacking it back\n\n💡 Pro Tip:\nAlways define serialVersionUID to avoid version mismatch issues\n\n📌 Final Thought:\n"Serialization turns objects into data, Deserialization brings them back to life."',
  },
  {
    title: "Transient & Volatile Keywords",
    images: ["public/Java Imp images/img20.jpg"],
    description:
      '🔥 Day 19: Transient & Volatile Keywords (Java)\n\nTwo small keywords — but very important in interviews and real-world applications 👇\n\n🔹 1. transient keyword\n👉 Definition: Prevents a variable from being serialized.\n✔ Used with Serialization\n✔ Value is not saved in byte stream\n✔ Gets default value after deserialization\n\nclass Student implements java.io.Serializable {\n int id;\n transient String password; // will NOT be saved\n}\n\n👉 After deserialization → password = null\n\n🔹 2. volatile keyword\n👉 Definition: Ensures a variable is always read from main memory, not CPU cache.\n✔ Used in multithreading\n✔ Guarantees visibility of changes across threads\n✔ Prevents caching issues\n\nclass SharedData {\n volatile boolean flag = true;\n}\n\n👉 One thread updates → other threads see it immediately\n\n🔹 When to Use?\n✔ transient → sensitive data (passwords, tokens) 🔐\n✔ volatile → shared variables between threads ⚡\n\n💡 Pro Tip:\nvolatile does NOT guarantee thread safety — only visibility!\n\n📌 Final Thought:\n"transient protects data from storage, volatile protects data across threads."',
  },
  {
    title: "Thread Lifecycle in Java",
    images: ["public/Java Imp images/img21.jpg"],
    description:
      '🔥 Day 20: Thread Lifecycle in Java\n\nUnderstanding thread lifecycle is key to mastering multithreading 👇\n\n🔹 What is Thread Lifecycle?\n👉 It defines the different states a thread goes through during its execution.\n\n🔹 Thread States in Java\n\n1️⃣ NEW\n👉 Thread is created but not started\nThread t = new Thread();\n\n2️⃣ RUNNABLE\n👉 Thread is ready or running (after start())\n\n3️⃣ BLOCKED\n👉 Waiting to acquire a lock (synchronization)\n\n4️⃣ WAITING\n👉 Waiting indefinitely for another thread\n(e.g., wait())\n\n5️⃣ TIMED_WAITING\n👉 Waiting for a specific time\n(e.g., sleep(1000))\n\n6️⃣ TERMINATED\n👉 Thread execution is completed\n\n🔹 Simple Example\nclass MyThread extends Thread {\n public void run() {\n System.out.println("Thread Running...");\n }\n}\n\npublic class Main {\n public static void main(String[] args) {\n MyThread t = new MyThread();\n\n System.out.println(t.getState()); // NEW\n\n t.start();\n System.out.println(t.getState()); // RUNNABLE\n }\n}\n\n🔹 Lifecycle Flow\nNEW → RUNNABLE → (BLOCKED / WAITING / TIMED_WAITING) → TERMINATED\n\n🔹 Key Points\n✔ start() → moves thread to RUNNABLE\n✔ sleep() → TIMED_WAITING\n✔ wait() → WAITING\n✔ Lock issues → BLOCKED\n\n💡 Pro Tip:\nThread state may change quickly — don’t rely on exact timing in real systems.\n\n📌 Final Thought:\n"Threads have a life cycle — understanding it helps you control execution."',
  },
  {
    title: "Synchronization in Java",
    images: ["public/Java Imp images/img22.jpg"],
    description:
      'Day 21 A crucial concept in multithreading to avoid data inconsistency 👇\n\n🔹 What is Synchronization?\n👉 Definition: Synchronization is a mechanism to control access of multiple threads to shared resources.\n\n🔹 Why Do We Need It?\n👉 Without synchronization:\nMultiple threads modify data ❌\nResults become inconsistent ❌\n👉 With synchronization:\nOnly one thread accesses at a time ✅\nData remains correct ✅\n\n🔹 Simple Example (Without Synchronization)\n\nclass Counter {\n int count = 0;\n void increment() {\n count++;\n }\n}\n\n👉 Problem: Multiple threads → wrong count ⚠️\n\n🔹 With Synchronization\n\nclass Counter {\n int count = 0;\n synchronized void increment() {\n count++;\n }\n}\n\n👉 Now:\n✔ One thread at a time\n✔ Correct result\n\n🔹 Types of Synchronization\n\n1️⃣ Method Level\nsynchronized void method() { }\n\n2️⃣ Block Level\nsynchronized(this) {\n // critical section\n}\n\n3️⃣ Static Synchronization\nstatic synchronized void method() { }\n\n🔹 Key Points\n✔ Prevents race conditions\n✔ Uses intrinsic lock (monitor)\n✔ Slows performance slightly (due to locking)\n\n🔹 When to Use?\n✔ Shared variables\n✔ Multi-threaded environment\n✔ Critical sections\n\n💡 Pro Tip:\nUse synchronization only where needed — too much can reduce performance ⚡\n\n📌 Final Thought:\n"Synchronization ensures safety, but balance it with performance."',
  },
  {
    title: "Deadlock in Java",
    images: ["public/Java Imp images/img23.jpg"],
    description:
      '🔥 Day 22: Deadlock in Java (with Example 🔥)\n\nOne of the most dangerous problems in multithreading — and a favorite interview topic 👇\n\n🔹 What is Deadlock?\n👉 Definition: A situation where two or more threads are stuck forever, waiting for each other’s resources.\n\n🔹 Simple Real-Life Example\n👤 Person A holds Resource 1 and waits for Resource 2\n👤 Person B holds Resource 2 and waits for Resource 1\n👉 Result = ❌ No one proceeds (Deadlock)\n\n🔹 Java Example\nclass DeadlockExample {\n public static void main(String[] args) {\n\n final Object lock1 = new Object();\n final Object lock2 = new Object();\n\n Thread t1 = new Thread(() -> {\n synchronized(lock1) {\n System.out.println("Thread 1: Holding lock1");\n\n try { Thread.sleep(100); } catch (Exception e) {}\n\n synchronized(lock2) {\n System.out.println("Thread 1: Holding lock2");\n }\n }\n });\n\n Thread t2 = new Thread(() -> {\n synchronized(lock2) {\n System.out.println("Thread 2: Holding lock2");\n\n try { Thread.sleep(100); } catch (Exception e) {}\n\n synchronized(lock1) {\n System.out.println("Thread 2: Holding lock1");\n }\n }\n });\n\n t1.start();\n t2.start();\n }\n}\n\n🔹 What Happens?\n✔ Thread 1 locks lock1\n✔ Thread 2 locks lock2\n❌ Both wait for each other → Deadlock\n\n🔹 Deadlock Visualization\nThread 1 → lock1 → waiting for lock2\nThread 2 → lock2 → waiting for lock1\n\n🔹 Conditions for Deadlock (Must Have All 4)\n1️⃣ Mutual Exclusion\n2️⃣ Hold and Wait\n3️⃣ No Preemption\n4️⃣ Circular Wait\n\n🔹 How to Prevent Deadlock?\n✔ Always lock resources in same order\n✔ Use tryLock() (from ReentrantLock)\n✔ Avoid nested locks when possible\n✔ Use timeouts\n\n🔹 Key Takeaway\n👉 Deadlock doesn’t crash your program — it freezes it forever ❗\n\n💡 Pro Tip:\nConsistent lock ordering is the easiest and most effective solution 🚀\n\n📌 Final Thought:\n"Deadlock is not an error — it’s a silent killer in multithreading."',
  },
  {
    title: "Executor Framework",
    images: ["public/Java Imp images/img24.jpg"],
    description:
      '🔥 Day 23: Executor Framework (Java)\n\nManaging threads manually is hard — that’s where the Executor Framework (introduced in Java 5) makes life easier 👇\n\n🔹 What is Executor Framework?\n👉 Definition: A framework to manage and control threads efficiently using thread pools.\n\n🔹 Why Use It?\n✔ No need to manually create/manage threads\n✔ Reuses threads (better performance) ⚡\n✔ Handles task execution efficiently\n\n🔹 Core Components\n1️⃣ Executor → Runs tasks\n2️⃣ ExecutorService → Manages lifecycle (start/stop)\n3️⃣ ThreadPool → Group of reusable threads\n\n🔹 Simple Example\nimport java.util.concurrent.*;\npublic class Main {\n public static void main(String[] args) {\n\n ExecutorService executor = Executors.newFixedThreadPool(3);\n\n for (int i = 1; i <= 5; i++) {\n int task = i;\n\n executor.execute(() -> {\n System.out.println("Task " + task +\n " executed by " + Thread.currentThread().getName());\n });\n }\n\n executor.shutdown();\n }\n}\n\n🔹 What Happens?\n✔ Thread pool of size 3 created\n✔ 5 tasks submitted\n✔ Threads are reused to execute tasks\n\n🔹 Types of Thread Pools\n✔ newFixedThreadPool(n) → Fixed threads\n✔ newCachedThreadPool() → Dynamic threads\n✔ newSingleThreadExecutor() → One thread\n\n🔹 Key Methods\n✔ execute() → runs task\n✔ submit() → returns result (Future)\n✔ shutdown() → stops executor\n\n🔹 When to Use?\n✔ Handling multiple tasks\n✔ Server applications\n✔ Background processing\n\n💡 Pro Tip:\nAlways call shutdown() to avoid memory leaks 🚀\n\n📌 Final Thought:\n"Executor Framework = Better performance + Cleaner thread management" ',
  },
  {
    title: "Callable & Future",
    images: ["public/Java Imp images/img25.jpg"],
    description:
      '🔥 Day 24: Callable & Future (Java)\n\nTaking multithreading to the next level — getting results from threads 👇\n\n🔹 1. Callable\n👉 Definition: Similar to Runnable, but can return a result and throw exceptions.\n✔ Part of java.util.concurrent\n✔ Has call() method\nCallable<Integer> task = () -> 10 + 20;\n\n🔹 2. Future\n👉 Definition: Represents the result of an asynchronous computation.\n✔ Used to get result from Callable\n✔ Can check if task is complete\n\n🔹 Simple Example\nimport java.util.concurrent.*;\n\npublic class Main {\n public static void main(String[] args) throws Exception {\n\n ExecutorService executor = Executors.newSingleThreadExecutor();\n\n Callable<Integer> task = () -> {\n Thread.sleep(1000);\n return 30;\n };\n\n Future<Integer> result = executor.submit(task);\n\n System.out.println("Task submitted...");\n\n System.out.println("Result: " + result.get()); // waits & gets result\n\n executor.shutdown();\n }\n}\n\n🔹 What Happens?\n✔ Task runs in separate thread\n✔ Future holds result\n✔ get() waits until result is ready\n\n🔹 Important Future Methods\n✔ get() → get result (blocking)\n✔ isDone() → check completion\n✔ cancel() → cancel task\n\n🔹 When to Use?\n✔ When you need result from thread\n✔ Async tasks\n✔ Background processing\n\n💡 Pro Tip:\nUse Callable + Future with Executor Framework for clean async programming 🚀\n\n📌 Final Thought:\n"Runnable runs tasks, Callable returns results."',
  },
  {
    title: "Parallel Streams vs Threads",
    images: ["public/Java Imp images/img25.1.jpg"],
    description:
      ' DAy 25: A very common confusion in multithreading — when to use what? 👇\n\n🔹 1. Parallel Streams\n👉 Definition: A high-level way to process data in parallel using Streams.\n✔ Uses ForkJoinPool (common pool) internally\n✔ Simple and concise\n✔ No manual thread management\nlist.parallelStream()\n .forEach(n -> System.out.println(n));\n\n🔹 2. Threads (Manual Multithreading)\n👉 Definition: Low-level way to create and manage threads manually.\n✔ Full control over thread behavior\n✔ More complex to manage\n\nThread t = new Thread(() -> {\n System.out.println("Running in thread");\n});\nt.start();\n\n🔹 When to Use?\n✔ Parallel Stream → data processing (filter, map, etc.)\n✔ Threads → custom tasks, fine control\n\n🔹 Important Note ⚠️\n👉 Parallel streams:\nNot always faster ❗\nAvoid for small datasets\nBe careful with shared state\n\n💡 Pro Tip:\nUse parallel streams for simple parallel data operations, and threads for complex workflows.\n\n📌 Final Thought:\n"Parallel Streams = simplicity, Threads = control."',
  },
  {
    title: "JVM Memory Model (Heap vs Stack vs Metaspace)",
    images: ["public/Java Imp images/img26.jpg"],
    description:
      '🔥 Day 26: JVM Memory Model (Heap vs Stack vs Metaspace)\n\nOne of the most important core Java concepts — and a favorite interview topic 👇\n\n🔹 What is JVM Memory Model?\n👉 It defines how memory is allocated and managed in a Java program.\n\n🔹 1. Heap Memory 🧠\n👉 Definition: Stores objects and instance variables\n✔ Shared across all threads\n✔ Managed by Garbage Collector (GC)\n✔ Divided into Young & Old Generation\nString s = new String("Java"); // stored in Heap\n\n🔹 2. Stack Memory 📦\n👉 Definition: Stores method calls and local variables\n✔ Each thread has its own stack\n✔ Faster access ⚡\n✔ Automatically cleared after method execution\nint x = 10; // stored in Stack\n\n🔹 3. Metaspace (Java 8+) 🗂️\n👉 Definition: Stores class metadata\n✔ Replaced PermGen (before Java 8)\n✔ Stores class structure, methods, etc.\n✔ Uses native memory\n\n🔹 Memory Flow Example\nclass Test {\n int x = 10;\n}\npublic class Main {\n public static void main(String[] args) {\n Test t = new Test();\n }\n}\n\n👉 Stack → reference t\n👉 Heap → object Test\n👉 Metaspace → class Test metadata\n\n🔹 Common Errors\n❌ OutOfMemoryError → Heap full\n❌ StackOverflowError → Stack overflow\n\n🔹 Real-Life Analogy\n🏢 Heap = Storage room (shared)\n📦 Stack = Worker’s desk (private)\n📚 Metaspace = Library (class info)\n\n💡 Pro Tip:\nUnderstanding memory helps in debugging performance and memory issues 🚀\n\n📌 Final Thought:\n"Stack manages execution, Heap stores objects, Metaspace holds class definitions."',
  },
  {
    title: "Garbage Collection (How Java Manages Memory)",
    images: ["public/Java Imp images/img27.jpg"],
    description:
      '🔥 Day 27: Garbage Collection (How Java Manages Memory)\n\nOne of the most powerful features of Java — automatic memory management 👇\n\n🔹 What is Garbage Collection (GC)?\n👉 Definition: GC automatically removes unused objects from Heap memory.\n\n🔹 Why is GC Needed?\n✔ Prevents memory leaks\n✔ Frees unused memory\n✔ Improves application performance\n\n🔹 How GC Works (Step-by-Step)\n1️⃣ Objects are created in Heap\n2️⃣ Some objects become unreachable\n3️⃣ GC identifies these objects\n4️⃣ Memory is freed automatically\n\n🔹 Simple Example\npublic class Main {\n public static void main(String[] args) {\n\n String s1 = new String("Java");\n s1 = null; // eligible for GC\n\n System.gc(); // request JVM to run GC\n }\n}\n\n👉 s1 object becomes eligible for GC\n\n🔹 When Object is Eligible for GC?\n✔ Reference is null\n✔ Object is unreachable\n✔ Anonymous object\n\n🔹 Types of Garbage Collection\n✔ Minor GC → Young generation\n✔ Major GC → Old generation\n✔ Full GC → Entire heap\n\n🔹 Important Points\n✔ GC is automatic (no manual delete ❌)\n✔ System.gc() is just a request (not guaranteed)\n✔ Works only on Heap memory\n\n🔹 Real-Life Analogy\n🧹 GC = Cleaner\n🗑️ Unused objects = Garbage\n🏠 Heap = Room\n\n💡 Pro Tip:\nAvoid creating unnecessary objects to reduce GC overhead 🚀\n\n📌 Final Thought:\n"Java manages memory for you — but writing efficient code is still your responsibility."',
  },
  {
    title: "Java 8 Date & Time API (LocalDate, LocalDateTime)",
    images: ["public/Java Imp images/img28.jpg"],
    description:
      '🔥 Day 28: Java 8 Date & Time API (LocalDate, LocalDateTime)\n\nWorking with date & time became much easier and cleaner in Java 8 👇\n\n🔹 Why New Date & Time API?\n\n👉 Old classes (Date, Calendar) were:\n❌ Not thread-safe\n❌ Complex to use\n👉 Java 8 introduced a modern API:\n✔ Simple\n✔ Immutable\n✔ Thread-safe\n\n🔹 1. LocalDate\n👉 Definition: Represents date only (YYYY-MM-DD)\n\nimport java.time.LocalDate;\nLocalDate date = LocalDate.now();\nSystem.out.println(date); // 2026-05-04\n\n✔ No time\n✔ Used for birthdays, events\n\n🔹 2. LocalDateTime\n👉 Definition: Represents date + time\n\nimport java.time.LocalDateTime;\nLocalDateTime dt = LocalDateTime.now();\nSystem.out.println(dt); // 2026-05-04T10:30:45\n\n✔ Date + Time together\n✔ No timezone\n\n🔹 3. Creating Custom Date & Time\nLocalDate date = LocalDate.of(2024, 1, 1);\nLocalDateTime dt = LocalDateTime.of(2024, 1, 1, 10, 30);\n\n🔹 4. Common Operations\ndate.plusDays(5);\ndate.minusMonths(1);\n\ndt.plusHours(2);\ndt.minusMinutes(30);\n\n🔹 5. Formatting Date\nimport java.time.format.DateTimeFormatter;\n\nDateTimeFormatter f = DateTimeFormatter.ofPattern("dd-MM-yyyy");\nSystem.out.println(date.format(f));\n\n🔹 When to Use?\n✔ LocalDate → date only\n✔ LocalDateTime → date + time\n✔ Use ZonedDateTime → when timezone needed\n\n💡 Pro Tip:\nAll classes in java.time are immutable → safe for multithreading 🚀\n\n📌 Final Thought:\n"Java 8 Date API made date handling simple, safe, and powerful."',
  },
  {
    title: "Wrapper Classes in Java",
    images: ["public/Java Imp images/img29.jpg"],
    description:
      'Day 29: A key concept to understand how Java handles primitives like objects 👇\n\n🔹 What be Wrapper Classes?\n👉 Definition: Wrapper classes convert primitive data types into objects.\n✔ Part of Java\n✔ Stored in java.lang package\n\nPrimitive | Wrapper Class\nint -> Integer\ndouble -> Double\nchar -> Character\nboolean -> Boolean\n\n🔹 Why Wrapper Classes?\n✔ Needed for Collections (like ArrayList)\n✔ Used in Generics\n✔ Provide utility methods\n\n🔹 1. Autoboxing\n👉 Definition: Automatic conversion of primitive → object\nInteger obj = 10; // int → Integer (Autoboxing)\n\n🔹 2. Unboxing\n👉 Definition: Object → primitive automatically\nint num = obj; // Integer → int (Unboxing)\n\n🔹 Simple Example\nimport java.util.*;\n\npublic class Main {\n public static void main(String[] args) {\n\n ArrayList<Integer> list = new ArrayList<>();\n\n list.add(10); // autoboxing\n list.add(20);\n\n int value = list.get(0); // unboxing\n\n System.out.println(value);\n }\n}\n\n🔹 What Happens Internally?\n✔ 10 → Integer.valueOf(10)\n✔ obj → obj.intValue()\n\n🔹 Key Points\n✔ Wrapper classes are immutable\n✔ Autoboxing simplifies code\n✔ Avoid excessive boxing → performance overhead ⚠️\n\n🔹 When to Use?\n✔ Collections (ArrayList, HashMap)\n✔ Generic programming\n✔ Utility methods (parse, compare, etc.)\n\n💡 Pro Tip:\nUse primitives for performance, wrappers for flexibility 🚀\n\n📌 Final Thought:\n"Wrapper classes bridge the gap between primitives and objects."',
  },
  {
    title: "ConcurrentHashMap vs HashMap",
    images: ["public/Java Imp images/img30.jpg"],
    description:
      '🔥 Day 30: ConcurrentHashMap vs HashMap (Java)\n\nA very important interview topic in multithreading & collections 👇\n\n🔹 1. HashMap\n👉 Definition: A non-synchronized Map used for storing key-value pairs.\n✔ Fast performance ⚡\n❌ Not thread-safe\n❌ Multiple threads may cause data inconsistency\nHashMap<Integer, String> map = new HashMap<>();\n\nmap.put(1, "Java");\nmap.put(2, "Python");\n\n🔹 2. ConcurrentHashMap\n👉 Definition: A thread-safe version of HashMap designed for concurrent access.\n✔ Thread-safe ✅\n✔ Better performance than Hashtable\n✔ Allows multiple threads to read/write safely\n\nConcurrentHashMap<Integer, String> map =\n new ConcurrentHashMap<>();\n\nmap.put(1, "Java");\nmap.put(2, "Python");\n\n🔹 Why ConcurrentHashMap is Better?\n👉 Instead of locking the entire map:\n✔ Locks only a portion internally\n✔ Multiple threads work simultaneously ⚡\n\n🔹 Simple Multithreading Example\nConcurrentHashMap<Integer, String> map =\n new ConcurrentHashMap<>();\n\nThread t1 = new Thread(() -> map.put(1, "Java"));\nThread t2 = new Thread(() -> map.put(2, "Python"));\n\nt1.start();\nt2.start();\n👉 Safe concurrent updates ✅\n\n🔹 When to Use?\n✔ HashMap → single-threaded apps\n✔ ConcurrentHashMap → multithreaded apps\n\n💡 Pro Tip:\nNever use plain HashMap for concurrent modifications 🚀\n\n📌 Final Thought:\n"HashMap is fast, ConcurrentHashMap is safely fast."',
  },
  {
    title: "Fail-Fast vs Fail-Safe Iterators",
    images: ["public/Java Imp images/img31.jpg"],
    description:
      '🔥 Day 31: Fail-Fast vs Fail-Safe Iterators (Java)\n\nA very important collections interview topic in Java 👇\n\n🔹 1. Fail-Fast Iterator\n👉 Definition: Throws ConcurrentModificationException if collection is modified while iterating.\n✔ Works on original collection\n✔ Detects structural modification quickly\n❌ Not safe for concurrent modification\nExample:\nArrayList<String> list = new ArrayList<>();\n\nlist.add("Java");\nlist.add("Python");\n\nfor(String s : list) {\n list.add("C++"); // Exception\n}\n👉 Output:\nConcurrentModificationException\n\n🔹 2. Fail-Safe Iterator\n👉 Definition: Works on a cloned copy of collection, so modification is allowed during iteration.\n✔ No exception during modification\n✔ Safe for concurrent environments\n❌ Extra memory usage\nExample:\nCopyOnWriteArrayList<String> list =\n new CopyOnWriteArrayList<>();\n\nlist.add("Java");\nlist.add("Python");\n\nfor(String s : list) {\n list.add("C++"); // No Exception\n}\n👉 Safe iteration ✅\n\n🔹 Examples\n✔ Fail-Fast:\nArrayList\nHashMap\n✔ Fail-Safe:\nCopyOnWriteArrayList\nConcurrentHashMap iterator\n\n🔹 When to Use?\n✔ Fail-Fast → single-threaded apps\n✔ Fail-Safe → concurrent/multithreaded apps\n\n💡 Pro Tip:\nFail-Fast iterators fail quickly to prevent unpredictable behavior 🚀\n\n📌 Final Thought:\n"Fail-Fast detects problems early, Fail-Safe avoids them using a copy."',
  },
  {
    title: "WeakHashMap in Java",
    images: ["public/Java Imp images/img32.jpg"],
    description:
      'Day 32: A special type of Map that works with Garbage Collection 👇\n\n🔹 What is WeakHashMap?\n👉 Definition: A Map where keys are stored as weak references.\n✔ If a key has no strong reference elsewhere,\n➡️ Garbage Collector can remove the entry automatically 🧹\n\n🔹 Why Use WeakHashMap?\n✔ Prevents memory leaks\n✔ Automatically removes unused entries\n✔ Useful for caching mechanisms\n\n🔹 Simple Example\n\nimport java.util.*;\npublic class Main {\n public static void main(String[] args) {\n WeakHashMap<String, String> map =\n new WeakHashMap<>();\n String key = new String("Java");\n map.put(key, "Programming");\n System.out.println("Before GC: " + map);\n key = null; // remove strong reference\n System.gc();\n try {\n Thread.sleep(1000);\n } catch (Exception e) {}\n System.out.println("After GC: " + map);\n }\n}\n\n🔹 Output (may vary)\nBefore GC: {Java=Programming}\nAfter GC: {}\n👉 Entry removed automatically by GC ✅\n\n🔹 How It Works Internally\n✔ Keys → weak references\n✔ Values → normal references\n\n👉 If key becomes unreachable:\n🧹 GC removes entire entry\n\n🔹 Real-World Uses\n✔ Image caching 🖼️\n✔ Metadata storage\n✔ Session-like temporary data\n✔ Memory-sensitive caches\n\n🔹 Important Points\n✔ Only keys are weakly referenced\n✔ GC timing is unpredictable\n✔ Not suitable when data must always persist\n\n💡 Pro Tip:\nUse WeakHashMap when you want cache entries to disappear automatically when memory is needed 🚀\n\n📌 Final Thought:\n"WeakHashMap helps Java manage memory smarter by cooperating with Garbage Collection."',
  },
  {
    title: "PriorityQueue in Java",
    images: ["public/Java Imp images/img33.jpg"],
    description:
      'Day 33: A powerful queue structure where elements are processed based on priority 👇\n\n🔹 What is PriorityQueue?\n👉 Definition: A queue that stores elements according to their priority order instead of insertion order.\n✔ Part of Java Collections Framework\n✔ Based on Heap Data Structure\n✔ By default → Min Heap\n\n🔹 How It Works Internally?\n👉 PriorityQueue uses a Binary Heap\n✔ Smallest element stays at root\n✔ Insert/Delete operations maintain heap property\n\n🔹 Simple Example\n\nimport java.util.*;\npublic class Main {\n public static void main(String[] args) {\n PriorityQueue<Integer> pq =\n new PriorityQueue<>();\n pq.add(30);\n pq.add(10);\n pq.add(20);\n System.out.println(pq);\n System.out.println(pq.poll()); // 10\n System.out.println(pq.poll()); // 20\n System.out.println(pq.poll()); // 30\n }\n}\n\n🔹 Output\n[10, 30, 20]\n\n10\n20\n30\n\n👉 Retrieval happens in sorted priority order ✅\n\n🔹 Important Methods\n✔ add() / offer() → insert element\n✔ poll() → remove highest priority element\n✔ peek() → view top element\n\n🔹 Min Heap vs Max Heap\n✔ Default → Min Heap\n✔ Max Heap using Comparator:\nPriorityQueue<Integer> pq =\n new PriorityQueue<>(Collections.reverseOrder());\n\n🔹 Time Complexity\nOperation | Complexity\nadd()     | O(log n)\npoll()    | O(log n)\npeek()    | O(1)\n\n🔹 Real-World Uses\n✔ Task Scheduling 🖥️\n✔ CPU Scheduling ⚡\n✔ Dijkstra Algorithm 📍\n✔ Job Processing Systems\n\n💡 Pro Tip:\nPriorityQueue does NOT maintain full sorted order internally — only heap order 🚀\n\n📌 Final Thought:\n"PriorityQueue always gives priority to the most important element first."',
  },
  {
    title: "ThreadPool vs Creating Threads",
    images: ["public/Java Imp images/img34.jpg"],
    description:
      '🔥 Day 34: ThreadPool vs Creating Threads (Java)\n\nA very important multithreading concept for writing scalable applications 👇\n\n🔹 1. Creating Threads Manually\n👉 Definition: Creating a new thread every time a task needs execution.\nThread t = new Thread(() -> {\n System.out.println("Task Running");\n});\nt.start();\n\n✔ Simple for small programs\n❌ Expensive for large applications\n❌ Too many threads = high memory & CPU usage\n\n🔹 2. ThreadPool\n👉 Definition: A pool of reusable worker threads managed by Executor Framework.\nExecutorService executor =\n Executors.newFixedThreadPool(3);\nexecutor.execute(() ->\n System.out.println("Task Running"));\nexecutor.shutdown();\n\n✔ Reuses threads ♻️\n✔ Better performance ⚡\n✔ Controls number of threads\n\n🔹 How ThreadPool Works?\n1️⃣ Create fixed number of threads\n2️⃣ Submit tasks to queue\n3️⃣ Worker threads execute tasks\n4️⃣ Threads reused for next tasks\n\n🔹 When to Use?\n✔ Manual Threads → small/simple apps\n✔ ThreadPool → real-world scalable systems\n\n🔹 Real-World Uses\n✔ Web servers 🌐\n✔ Background jobs ⚙️\n✔ APIs & microservices 🚀\n✔ Parallel task execution\n\n💡 Pro Tip:\nNever create thousands of threads manually — use ThreadPool for better resource management 🚀\n\n📌 Final Thought:\n"Creating threads gives control, ThreadPool gives scalability."',
  },
  {
    title: "ExecutorService (Real-World Usage)",
    images: ["public/Java Imp images/img35.jpg"],
    description:
      '🔥 Day 35: ExecutorService (Real-World Usage) in Java\n\nA powerful framework for managing threads efficiently in real-world applications 👇\n🔹 What is ExecutorService?\n👉 Definition: An interface in java.util.concurrent used to manage and execute asynchronous tasks using thread pools.\n✔ Part of Executor Framework\n✔ Handles thread creation & management automatically\n✔ Improves performance by reusing threads ♻️\n\n🔹 Why Use ExecutorService?\n✔ Better performance ⚡\n✔ Controlled thread management\n✔ Easy task execution\n✔ Scalable for large applications\n\n🔹 Simple Real-World Example\nimport java.util.concurrent.*;\npublic class Main {\n public static void main(String[] args) {\n ExecutorService executor =\n Executors.newFixedThreadPool(3);\n for (int i = 1; i <= 5; i++) {\n int taskId = i;\n executor.execute(() -> {\n System.out.println(\n "Processing Task " + taskId +\n " by " + Thread.currentThread().getName()\n );\n\n try {\n Thread.sleep(1000);\n } catch (Exception e) {}\n });\n }\n\n executor.shutdown();\n }\n}\n\n🔹 What Happens Here?\n✔ Thread pool with 3 threads created\n✔ 5 tasks submitted\n✔ Threads are reused for multiple tasks\n\n🔹 Types of ExecutorService\n✔ newFixedThreadPool(n) → fixed threads\n✔ newCachedThreadPool() → dynamic threads\n✔ newSingleThreadExecutor() → one worker thread\n\n🔹 Real-World Uses\n✔ Web servers 🌐\n✔ APIs & microservices 🚀\n✔ Background jobs ⚙️\n✔ Email/SMS processing 📩\n✔ Parallel data processing 📊\n\n🔹 Why Better Than Manual Threads?\n❌ Manual thread creation is expensive\n✅ ExecutorService reuses threads efficiently\n\n💡 Pro Tip:\nAlways call shutdown() after completing tasks to avoid resource leaks 🚀\n\n📌 Final Thought:\n"ExecutorService simplifies multithreading and makes Java applications scalable."',
  },
  {
    title: "Race Condition in Java",
    images: ["public/Java Imp images/img36.jpg"],
    description:
      '🔥 Day 36: Race Condition (with Example) in Java\n\nOne of the most common and dangerous problems in multithreading 👇\n\n🔹 What is Race Condition?\n👉 Definition: A situation where multiple threads access and modify shared data simultaneously, causing unpredictable results.\n\n🔹 Why Does It Happen?\n✔ Threads run concurrently\n✔ Shared variable is modified without synchronization\n❌ Final result becomes inconsistent\n\n🔹 Simple Example (Race Condition)\nclass Counter {\n int count = 0;\n void increment() {\n count++;\n }\n}\n\npublic class Main {\n public static void main(String[] args)\n throws Exception {\n Counter c = new Counter();\n Thread t1 = new Thread(() -> {\n for(int i = 0; i < 1000; i++) {\n c.increment();\n }\n });\n Thread t2 = new Thread(() -> {\n for(int i = 0; i < 1000; i++) {\n c.increment();\n }\n });\n t1.start();\n t2.start();\n t1.join();\n t2.join();\n System.out.println(c.count);\n }\n}\n\n🔹 Expected Output\n2000\n❌ Actual output may be:\n1634\n1892\n1975\n\n👉 Because both threads update count at the same time ⚠️\n🔹 How to Fix It?\n✅ Use synchronized\nsynchronized void increment() {\n count++;\n}\n✔ Now result becomes consistent ✅\n\n🔹 What Happens Internally?\n👉 count++ is NOT atomic\nIt actually performs:\n1. Read count\n2. Increment\n3. Write back\n\n👉 Two threads may overlap these steps\n🔹 Real-Life Analogy\n🏦 Two people updating same bank balance at same time\n➡️ Final balance becomes incorrect\n\n🔹 When Race Condition Occurs?\n✔ Shared mutable data\n✔ Multiple threads\n✔ No proper synchronization\n\n💡 Pro Tip:\nUse synchronization, locks, or atomic classes to avoid race conditions 🚀\n\n📌 Final Thought:\n"Race conditions create unpredictable bugs that are hard to detect but critical to fix."',
  },
  {
    title: "Volatile Keyword in Java",
    images: ["public/Java Imp images/img37.jpg"],
    description:
      '🔥 Day 37: Volatile Keyword (Simple Explanation) in Java\n\nA small keyword with a huge role in multithreading 👇\n🔹 What be volatile?\n👉 Definition: The volatile keyword ensures that a variable’s latest value is always read from main memory, not from a thread’s local cache.\n\n🔹 Why Do We Need It?\nIn multithreading:\n✔ Each thread may keep its own cached copy of variables\n❌ Changes made by one thread may not be visible to others\n\n👉 volatile fixes this visibility problem ✅\n🔹 Simple Example\nclass SharedData {\n volatile boolean flag = true;\n void stop() {\n flag = false;\n }\n}\n\npublic class Main {\n public static void main(String[] args)\n throws Exception {\n SharedData data = new SharedData();\n Thread t1 = new Thread(() -> {\n System.out.println("Thread started");\n while(data.flag) {\n // waiting\n }\n System.out.println("Thread stopped");\n });\n t1.start();\n Thread.sleep(2000);\n data.stop();\n }\n}\n\n🔹 What Happens Here?\n✔ t1 keeps checking flag\n✔ Main thread changes flag = false\n✔ Because flag is volatile → change becomes visible immediately ✅\n\n👉 Thread exits successfully\n🔹 Without volatile ❌\n👉 Thread may continue forever because it reads old cached value\n🔹 Key Point\n✅ volatile guarantees visibility\n❌ It does NOT guarantee thread safety\n\n🔹 When to Use volatile?\n✔ Status flags\n✔ Shutdown signals\n✔ Simple shared variables\n\n🔹 When NOT to Use?\n❌ For operations like:\ncount++;\n\n👉 Because it is NOT atomic\n🔹 Real-Life Analogy\n📢 volatile = public announcement speaker\n➡️ Every thread hears the latest update immediately\n\n💡 Pro Tip:\nUse volatile for visibility, synchronized for complete thread safety 🚀\n\n📌 Final Thought:\n"volatile ensures threads see the latest value instantly."',
  },
  {
    title: "String Pool in Java",
    images: ["public/Java Imp images/img38.jpg"],
    description:
      '🔥 Day 38: String Pool in Java\n\nOne of the most important core Java concepts and a favorite interview topic 👇\n\n🔹 What is String Pool?\n👉 Definition: String Pool is a special memory area inside Heap where Java stores string literals to reuse memory efficiently.\n✔ Avoids duplicate String objects\n✔ Improves memory optimization ⚡\n✔ Part of Heap memory\n\n🔹 How It Works?\n👉 When a String literal is created:\nString s1 = "Java";\n✔ JVM first checks String Pool\n✔ If "Java" already exists → reuse reference\n✔ Otherwise → create new object in pool\n\n🔹 Simple Example\npublic class Main {\n public static void main(String[] args) {\n String s1 = "Java";\n String s2 = "Java";\n System.out.println(s1 == s2);\n }\n}\n\n🔹 Output\ntrue\n👉 Because both references point to same pooled object ✅\n\n🔹 Using new Keyword\nString s1 = new String("Java");\nString s2 = new String("Java");\nSystem.out.println(s1 == s2);\n\n🔹 Output\nfalse\n👉 new always creates separate objects in Heap ❌\n\n🔹 Important Concept: intern()\nString s1 = new String("Java");\nString s2 = s1.intern();\nSystem.out.println(s1 == s2);\n👉 intern() returns reference from String Pool\n\n🔹 Memory Visualization\n✔ "Java" literal → String Pool\n✔ new String("Java") → Heap object\n\n🔹 Why String Pool Exists?\n✔ Saves memory\n✔ Reuses immutable strings\n✔ Improves performance 🚀\n\n🔹 Real-Life Analogy\n📚 String Pool = Shared library book\n➡️ Multiple people use same copy instead of creating new copies\n\n💡 Pro Tip:\nAlways use String literals when possible for better memory optimization 🚀\n\n📌 Final Thought:\n"String Pool makes Java memory-efficient by reusing immutable strings."',
  },
  {
    title: "ClassLoader in Java",
    images: ["public/Java Imp images/img39.jpg"],
    description:
      '🔥 Day 39: ClassLoader in Java\n\nOne of the most important JVM internal concepts in Java 👇\n\n🔹 What is ClassLoader?\n👉 Definition: ClassLoader is a JVM component responsible for loading .class files into memory at runtime.\n✔ Loads classes dynamically\n✔ Part of JVM\n✔ Converts bytecode into executable class objects\n\n🔹 Why is ClassLoader Needed?\n👉 JVM cannot execute .java files directly.\nFlow:\n.java → compiler → .class → ClassLoader → JVM Execution\n\n🔹 Types of ClassLoaders\n1️⃣ Bootstrap ClassLoader\n✔ Loads core Java classes\n\n✔ Example:\njava.lang.String\njava.util.ArrayList\n2️⃣ Platform (Extension) ClassLoader\n✔ Loads Java extension libraries\n3️⃣ Application ClassLoader\n✔ Loads classes from your application classpath\n\n🔹 Simple Example\npublic class Main {\n public static void main(String[] args) {\n ClassLoader cl =\n Main.class.getClassLoader();\n System.out.println(cl);\n }\n}\n\n🔹 Possible Output\njdk.internal.loader.ClassLoaders$AppClassLoader\n👉 Your class is loaded by Application ClassLoader ✅\n\n🔹 How Class Loading Works?\n1️⃣ Loading\n2️⃣ Linking\n3️⃣ Initialization\n\n🔹 Parent Delegation Model\n👉 Child ClassLoader asks parent first.\nFlow:\nApplication → Platform → Bootstrap\n✔ Prevents duplicate loading\n✔ Improves security\n\n🔹 Real-Life Analogy\n📚 ClassLoader = Librarian\n➡️ JVM asks for a class\n➡️ ClassLoader finds and loads it into memory\n\n🔹 Important Points\n✔ Classes are loaded only when needed\n✔ Same class is not loaded multiple times\n✔ Custom ClassLoaders can also be created\n\n💡 Pro Tip:\nUnderstanding ClassLoader helps in debugging frameworks, JDBC drivers, Spring Boot internals, and memory issues 🚀\n\n📌 Final Thought:\n"ClassLoader is the bridge between compiled bytecode and JVM execution."',
  },
  {
    title: "Reflection API in Java",
    images: ["public/Java Imp images/img40.jpg"],
    description:
      '🔥 Day 40: Reflection API in Java\n\nOne of the most powerful and advanced features in Java 👇\n\n🔹 What is Reflection API?\n👉 Definition: Reflection API allows Java programs to inspect and manipulate classes, methods, fields, and constructors at runtime.\n✔ Examine class structure dynamically\n✔ Access private members\n✔ Invoke methods at runtime\n\n🔹 Why Use Reflection?\n✔ Framework development\n✔ Dependency Injection (Spring)\n✔ ORM tools (Hibernate)\n✔ Testing frameworks (JUnit)\n\n🔹 Simple Example\nimport java.lang.reflect.Method;\nclass Student {\n public void display() {\n System.out.println("Hello Reflection");\n }\n}\n\npublic class Main {\n public static void main(String[] args)\n throws Exception {\n Class<?> cls = Student.class;\n Object obj = cls.getDeclaredConstructor()\n .newInstance();\n Method method = cls.getMethod("display");\n method.invoke(obj);\n }\n}\n\n🔹 Output\nHello Reflection\n\n👉 Method executed dynamically at runtime ✅\n🔹 What Reflection Can Access?\n✔ Class name\n✔ Methods\n✔ Fields\n✔ Constructors\n✔ Annotations\n\n🔹 Access Private Fields Example\nField field = cls.getDeclaredField("name");\nfield.setAccessible(true);\n\n👉 Allows access to private members ⚠️\n\n🔹 How Reflection Works?\n1️⃣ JVM loads class metadata\n2️⃣ Reflection reads metadata\n3️⃣ Program dynamically accesses members\n\n🔹 Advantages\n✔ Dynamic programming\n✔ Powerful framework support\n✔ Runtime inspection\n\n🔹 Disadvantages ⚠️\n❌ Slower performance\n❌ Breaks encapsulation\n❌ Security concerns\n\n🔹 Real-Life Analogy\n🕵️ Reflection = Inspecting a locked room\n➡️ You can see and access everything dynamically\n\n💡 Pro Tip:\nReflection is powerful, but use it carefully because it can impact performance and security 🚀\n\n📌 Final Thought:\n"Reflection gives Java the power to inspect and modify itself at runtime."',
  },
  {
    title: "Generics in Java",
    images: ["public/Java Imp images/img41.jpg"],
    description:
      '🔥 Day 41: Generics in Java\n\nOne of the most important features introduced in Java 5 for type safety and reusable code 👇\n\n🔹 What are Generics?\n👉 Definition: Generics allow classes, interfaces, and methods to work with different data types while providing compile-time type safety.\n✔ Reusable code\n✔ Type safety\n✔ No need for explicit casting\n\n🔹 Problem Without Generics ❌\nArrayList list = new ArrayList();\n\nlist.add("Java");\nlist.add(100);\n\nString s = (String) list.get(1); // Runtime Error\n\n👉 Mixed types can cause ClassCastException\n🔹 Using Generics ✅\nArrayList<String> list =\n new ArrayList<>();\n\nlist.add("Java");\n\nString s = list.get(0);\n✔ Only String values allowed\n✔ Compile-time checking\n\n🔹 Advantages of Generics\n✔ Type safety\n✔ Reusable code\n✔ Removes type casting\n✔ Better readability\n\n🔹 Important Concept: Type Erasure\n👉 Generics exist only at compile time.\n👉 JVM removes generic type information during runtime.\n\n🔹 Real-Life Analogy\n📦 Generic Box\n➡️ Same box can store books, phones, or laptops depending on type\n\n💡 Pro Tip:\nAlways use Generics with collections for safer and cleaner code 🚀\n\n📌 Final Thought:\n"Generics make Java code flexible, reusable, and type-safe."',
  },
  {
    title: "Producer–Consumer Problem",
    images: ["public/Java Imp images/img42.jpg"],
    description:
      '🔥 Day 42: Producer–Consumer Problem in Java\n\nOne of the most classic multithreading problems in Java 👇\n\n🔹 What is Producer–Consumer Problem?\n👉 Definition: A synchronization problem where:\n✔ Producer thread adds data\n✔ Consumer thread removes data\n✔ Both share the same buffer/queue\n\n🔹 The Challenge ⚠️\n❌ Producer should not add when buffer is full\n❌ Consumer should not remove when buffer is empty\n👉 Proper synchronization is required\n\n🔹 Simple Example\n\nimport java.util.*;\n\nclass SharedBuffer {\n Queue<Integer> queue =\n new LinkedList<>();\n int capacity = 3;\n synchronized void produce(int value)\n throws Exception {\n while(queue.size() == capacity) {\n wait();\n }\n queue.add(value);\n System.out.println("Produced: " + value);\n notify();\n }\n synchronized void consume()\n throws Exception {\n while(queue.isEmpty()) {\n wait();\n }\n int value = queue.poll();\n System.out.println("Consumed: " + value);\n notify();\n }\n}\n\npublic class Main {\n public static void main(String[] args) {\n SharedBuffer buffer = new SharedBuffer();\n Thread producer = new Thread(() -> {\n int value = 1;\n while(true) {\n try {\n buffer.produce(value++);\n Thread.sleep(1000);\n } catch(Exception e) {}\n }\n });\n\n Thread consumer = new Thread(() -> {\n while(true) {\n try {\n buffer.consume();\n Thread.sleep(1500);\n } catch(Exception e) {}\n }\n });\n\n producer.start();\n consumer.start();\n }\n}\n🔹 What Happens Here?\n✔ Producer adds items to queue\n✔ Consumer removes items\n✔ wait() pauses thread\n✔ notify() wakes waiting thread\n\n🔹 Real-Life Analogy\n🏭 Producer = Factory worker making products\n🛒 Consumer = Customer buying products\n📦 Buffer = Storage room\n\n🔹 Why is it Important?\n✔ Prevents race conditions\n✔ Ensures thread coordination\n✔ Used in messaging systems & task queues\n\n🔹 Modern Alternatives\n✔ BlockingQueue\n✔ Executor Framework\n✔ Reactive programming\n\n💡 Pro Tip:\nAlways use while with wait() instead of if to avoid unexpected wakeups 🚀\n\n📌 Final Thought:\n"Producer–Consumer problem teaches the foundation of thread communication and synchronization."',
  },
  {
    title: "SOLID Principles in Java",
    images: ["public/Java Imp images/img43.jpg"],
    description:
      '🔥 Day 43: SOLID Principles in Java\n\nOne of the most important concepts for writing clean, maintainable, and scalable code 👇\n\n🔹 What is SOLID?\n👉 Definition: SOLID is a set of 5 Object-Oriented Design Principles introduced by Robert C. Martin.\nThese principles help developers write:\n✔ Cleaner code\n✔ Flexible architecture\n✔ Maintainable applications\n✔ Better scalable systems\n\n🔥 S — Single Responsibility Principle (SRP)\n👉 A class should have only ONE reason to change.\n❌ Bad:\nclass Report {\n void generateReport() {}\n void saveToDatabase() {}\n}\n✅ Good:\nclass ReportGenerator {\n void generateReport() {}\n}\nclass ReportSaver {\n void saveToDatabase() {}\n}\n✔ One class = One responsibility\n\n🔥 O — Open/Closed Principle (OCP)\n👉 Software should be open for extension, but closed for modification.\n✅ Add new behavior without changing existing code.\ninterface Shape {\n double area();\n}\n✔ Easy to add new shapes\n\n🔥 L — Liskov Substitution Principle (LSP)\n👉 Child classes should properly replace parent classes.\n❌ Bad design breaks expected behavior.\nclass Bird {\n void fly() {}\n}\n👉 Penguin cannot fly ❌\n✔ Inheritance should make sense logically.\n\n🔥 I — Interface Segregation Principle (ISP)\n👉 Do not force classes to implement unused methods.\n❌ Bad:\ninterface Worker {\n void work();\n void eat();\n}\n✔ Split interfaces into smaller ones.\n\n🔥 D — Dependency Inversion Principle (DIP)\n👉 Depend on abstractions, not concrete classes.\n❌ Tight coupling:\nclass Car {\n Engine engine = new DieselEngine();\n}\n✅ Better:\nclass Car {\n Engine engine;\n}\n✔ Flexible & loosely coupled code\n\n🔹 Why SOLID Matters?\n✔ Easier maintenance\n✔ Better testing\n✔ Cleaner architecture\n✔ Scalable enterprise applications\n\n🔹 Real-World Usage\n✔ Spring Framework\n✔ Microservices\n✔ Enterprise Applications\n✔ Clean Architecture\n\n🔹 Real-Life Analogy\n🏗 SOLID = Building strong software architecture foundations\n\n💡 Pro Tip:\nMost design patterns work best when SOLID principles are followed 🚀\n\n📌 Final Thought:\n"SOLID principles transform messy code into professional software design."',
  },
  {
    title: "Singleton Design Pattern",
    images: ["public/Java Imp images/img44.jpg"],
    description:
      '🔥 Day 44: Singleton Design Pattern in Java\n\nOne of the most popular and widely used design patterns in Java 👇\n\n🔹 What is Singleton Pattern?\n👉 Definition: Singleton Pattern ensures that a class has only ONE object(instance) throughout the application.\n✔ Only one instance created\n✔ Global access point provided\n✔ Saves memory/resources\n\n🔥 Why Use Singleton?\n✔ Database Connection\n✔ Logger\n✔ Configuration Manager\n✔ Cache Manager\n✔ Thread Pools\n👉 These resources should usually have only one shared object.\n\n🔹 Simple Singleton Example\nclass Singleton {\n // static object\n private static Singleton instance =\n new Singleton();\n // private constructor\n private Singleton() {}\n // global access method\n public static Singleton getInstance() {\n return instance;\n }\n}\npublic class Main {\n public static void main(String[] args) {\n Singleton s1 =\n Singleton.getInstance();\n Singleton s2 =\n Singleton.getInstance();\n System.out.println(s1 == s2);\n }\n}\n\n🔹 Output\ntrue\n👉 Both references point to SAME object ✅\n\n🔥 Important Rules of Singleton\n✔ Constructor must be private\n✔ Object stored in static variable\n✔ Public method provides access\n\n🔹 How It Works Internally?\n1️⃣ Class loads into JVM\n2️⃣ Singleton object created once\n3️⃣ getInstance() always returns same object\n\n🔥 Thread-Safe Singleton\npublic static synchronized\nSingleton getInstance() {\n if(instance == null) {\n instance = new Singleton();\n }\n return instance;\n}\n✔ Prevents multiple object creation in multithreading\n\n🔹 Real-Life Analogy\n🏛 Government = One Prime Minister\n➡️ Entire country shares one official instance\n\n🔹 Advantages\n✔ Controlled object creation\n✔ Saves memory\n✔ Global access\n✔ Useful for shared resources\n\n🔹 Disadvantages ⚠️\n❌ Difficult in unit testing\n❌ Can create tight coupling\n❌ Multithreading issues if not handled properly\n\n💡 Pro Tip:\nBest modern Singleton approach in Java:\n✔ Enum Singleton\n✔ Bill Pugh Singleton\n\n📌 Final Thought:\n"Singleton ensures one shared object for the entire application lifecycle."',
  },
  {
    title: "Factory Design Pattern",
    images: ["public/Java Imp images/img45.jpg"],
    description:
      '🔥 Day 45: Factory Design Pattern in Java\n\nOne of the most commonly used Creational Design Patterns in Java 👇\n\n🔹 What is Factory Design Pattern?\n👉 Definition: Factory Pattern creates objects without exposing object creation logic to the client.\n✔ Object creation centralized\n✔ Loose coupling\n✔ Easy to extend\n\n🔥 Why Use Factory Pattern?\nInstead of:\nCar car = new BMW();\n👉 We use a Factory:\nCar car = CarFactory.getCar("BMW");\n✔ Client does not know exact object creation details.\n\n🔥 How Factory Pattern Works?\n1️⃣ Client requests object\n2️⃣ Factory decides which object to create\n3️⃣ Factory returns object\n4️⃣ Client uses object without knowing implementation details\n\n🔹 Advantages\n✔ Loose coupling\n✔ Cleaner code\n✔ Easier maintenance\n✔ Easy to add new object types\n\n🔹 Disadvantages ⚠️\n❌ More classes required\n❌ Code complexity may increase for small projects\n\n🔹 Real-World Examples\n✔ JDBC DriverManager\n✔ Logger frameworks\n✔ Notification systems\n✔ Payment gateways\n\n🔹 Real-Life Analogy\n🏭 Factory = Car manufacturing company\n➡️ Customer asks for a car\n➡️ Factory creates appropriate model internally\n\n💡 Pro Tip:\nFactory Pattern is heavily used in Spring Framework & enterprise applications 🚀\n\n📌 Final Thought:\n"Factory Pattern hides object creation complexity and promotes loose coupling."',
  },
  {
    title: "Builder Design Pattern",
    images: ["public/Java Imp images/img46.jpg"],
    description:
      '🔥 Day 46: Builder Design Pattern in Java\n\nOne of the best design patterns for creating complex objects in Java 👇\n\n🔹 What is Builder Design Pattern?\n👉 Definition: Builder Pattern helps create complex objects step-by-step instead of using large constructors.\n✔ Cleaner object creation\n✔ Readable code\n✔ Avoids constructor confusion\n\n🔥 Problem Without Builder Pattern\n❌ Too many constructor parameters:\nStudent s = new Student(\n "John",\n 25,\n "New York",\n "Java",\n true\n);\n\n👉 Hard to read & maintain ⚠️\n🔹 Using Builder Pattern ✅\nStudent s = new Student.Builder()\n .setName("John")\n .setAge(25)\n .setCity("New York")\n .setCourse("Java")\n .build();\n✔ More readable\n✔ Flexible object creation\n\n🔹 Complete Example\nclass Student {\n private String name;\n private int age;\n private String city;\n\n private Student(Builder builder) {\n this.name = builder.name;\n this.age = builder.age;\n this.city = builder.city;\n }\n\n public void show() {\n System.out.println(\n name + " " + age + " " + city\n );\n }\n\n static class Builder {\n private String name;\n private int age;\n private String city;\n\n public Builder setName(String name) {\n this.name = name;\n return this;\n }\n public Builder setAge(int age) {\n this.age = age;\n return this;\n }\n public Builder setCity(String city) {\n this.city = city;\n return this;\n }\n public Student build() {\n return new Student(this);\n }\n }\n}\n\n🔹 Client Code\npublic class Main {\n public static void main(String[] args) {\n Student s =\n new Student.Builder()\n .setName("John")\n .setAge(25)\n .setCity("New York")\n .build();\n s.show();\n }\n}\n\n🔹 Output\nJohn 25 New York\n\n🔥 How Builder Pattern Works?\n1️⃣ Builder object created\n2️⃣ Values set step-by-step\n3️⃣ build() creates final object\n\n🔹 Advantages\n✔ Readable code\n✔ Immutable objects support\n✔ Flexible object creation\n✔ Avoids telescoping constructors\n\n🔹 Disadvantages ⚠️\n❌ More code/classes required\n❌ Slightly complex for small objects\n\n🔹 Real-World Usage\n✔ Lombok @Builder\n✔ StringBuilder\n✔ HTTP Request builders\n✔ Spring Framework APIs\n\n🔹 Real-Life Analogy\n🍔 Burger Builder\n➡️ Choose bread, cheese, sauce, toppings step-by-step\n\n💡 Pro Tip:\nBuilder Pattern is best when objects have many optional parameters 🚀\n\n📌 Final Thought:\n"Builder Pattern makes complex object creation simple, readable, and maintainable."',
  },
  {
    title: "Strategy Design Pattern",
    images: ["public/Java Imp images/img47.jpg"],
    description:
      '🔥 Day 47: Strategy Design Pattern in Java\n\nOne of the most powerful behavioral design patterns in Java 👇\n\n🔹 What is Strategy Pattern?\n👉 Definition: Strategy Pattern allows selecting an algorithm or behavior at runtime.\n✔ Encapsulates behaviors into separate classes\n✔ Makes code flexible\n✔ Avoids large if-else conditions\n\n🔥 Real Problem Without Strategy Pattern\n❌ Too many conditions:\nif(type.equals("CreditCard")) {\n // payment logic\n}\nelse if(type.equals("UPI")) {\n // payment logic\n}\nelse if(type.equals("PayPal")) {\n // payment logic\n}\n\n👉 Hard to maintain & extend ⚠️\n🔹 Strategy Pattern Solution ✅\n✔ Create separate strategy classes for each behavior.\n🔹 Step 1: Strategy Interface\ninterface PaymentStrategy {\n void pay(int amount);\n}\n\n🔹 Step 2: Implement Strategies\nclass CreditCardPayment\n implements PaymentStrategy {\n public void pay(int amount) {\n System.out.println(\n "Paid using Credit Card: " + amount);\n }\n}\nclass UpiPayment\n implements PaymentStrategy {\n public void pay(int amount) {\n System.out.println(\n "Paid using UPI: " + amount);\n }\n}\n\n🔹 Step 3: Context Class\nclass PaymentService {\n private PaymentStrategy strategy;\n public PaymentService(\n PaymentStrategy strategy) {\n this.strategy = strategy;\n }\n public void makePayment(int amount) {\n strategy.pay(amount);\n }\n}\n\n🔹 Step 4: Client Code\npublic class Main {\n public static void main(String[] args) {\n PaymentStrategy strategy =\n new CreditCardPayment();\n PaymentService service =\n new PaymentService(strategy);\n service.makePayment(5000);\n\n strategy = new UpiPayment();\n service = new PaymentService(strategy);\n service.makePayment(2000);\n }\n}\n\n🔹 Output\nPaid using Credit Card: 5000\nPaid using UPI: 2000\n\n🔥 How Strategy Pattern Works?\n1️⃣ Client chooses strategy\n2️⃣ Context receives strategy\n3️⃣ Strategy behavior executed dynamically\n\n🔹 Advantages\n✔ Open/Closed Principle support\n✔ Removes complex conditions\n✔ Easy to add new behaviors\n✔ Better maintainability\n\n🔹 Disadvantages ⚠️\n❌ More classes required\n❌ Client must know available strategies\n\n🔹 Real-World Usage\n✔ Payment systems 💳\n✔ Sorting algorithms 📊\n✔ Compression utilities 📦\n✔ Navigation apps 🗺️\n\n🔹 Real-Life Analogy\n🚗 Google Maps choosing route strategy:\n✔ Fastest route\n✔ Shortest route\n✔ Avoid tolls\n➡️ Same app, different strategies\n\n💡 Pro Tip:\nStrategy Pattern works best when multiple algorithms can solve the same problem 🚀\n\n📌 Final Thought:\n"Strategy Pattern makes behavior flexible and interchangeable at runtime."',
  },
  {
    title: "Observer Design Pattern",
    images: ["public/Java Imp images/img48.jpg"],
    description:
      '🔥 Day 48: Observer Design Pattern in Java\n\nOne of the most useful behavioral design patterns in Java 👇\n\n🔹 What is Observer Pattern?\n👉 Definition: Observer Pattern defines a one-to-many dependency between objects.\nWhen the subject changes, all observers are notified automatically.\n✔ Loose coupling\n✔ Real-time updates\n✔ Easy event handling\n\n🔥 Real Problem Without Observer Pattern\n❌ Every class must check for changes manually\n❌ Code becomes tightly coupled\n❌ Hard to maintain\n\n🔥 How Observer Pattern Works?\n1️⃣ Subject holds a list of observers\n2️⃣ Observer registers with subject\n3️⃣ Subject changes state\n4️⃣ All observers get notified automatically\n\n🔹 Advantages\n✔ Loose coupling\n✔ Easy to add/remove observers\n✔ Great for event-driven systems\n✔ Supports real-time updates\n\n🔹 Disadvantages ⚠️\n❌ Too many notifications can affect performance\n❌ Order of notification may matter\n❌ Can be tricky with memory leaks if observers are not removed\n\n🔹 Real-World Usage\n✔ UI event listeners\n✔ News notifications\n✔ Social media updates\n✔ Stock market alerts\n✔ Java PropertyChangeListener\n\n🔹 Real-Life Analogy\n📢 Subject = News publisher\n👀 Observers = News channels/subscribers\n➡️ When news is published, everyone subscribed gets the update\n\n💡 Pro Tip:\nObserver Pattern is perfect when one object needs to notify many others automatically 🚀\n\n📌 Final Thought:\n"Observer Pattern helps build responsive systems with automatic updates."',
  },
  {
    title:
      "Clean Code Best Practices + Common Java Mistakes + Debugging Java Applications",
    images: ["public/Java Imp images/img49.jpg"],
    description:
      "Day 49: Clean Code Best Practices + Common Java Mistakes + Debugging Java Applications Writing code is easy.",
  },
  {
    title: "Java Best Practices + Interview Tips + Learning Recap",
    images: ["public/Java Imp images/img50.jpg"],
    description:
      "🚀 Day 50: Java Best Practices + Interview Tips + Learning Recap\n\n50 Days of Java Learning Journey Completed 🎉🔥\n\nFrom Core Java concepts to Multithreading, Collections, JVM internals, and Design Patterns — this journey was all about building strong fundamentals 💪\n\n🔥 1. Java Best Practices\n✅ Write Clean & Readable Code\n✔ Use meaningful variable names\n✔ Ensure proper formatting\n✔ Keep methods small and focused\n✔ Write reusable code\n\n✅ Follow SOLID Principles\n✔ Better maintainability\n✔ Flexible architecture\n✔ Scalable applications\n\n✅ Use Collections Wisely\n✔ ArrayList → Fast random access\n✔ LinkedList → Frequent insertions/deletions\n✔ HashMap → Fast key-value lookup\n✔ ConcurrentHashMap → Thread-safe operations\n\n✅ Use Immutability Where Possible\n✔ Safer in multithreaded environments\n✔ Easier debugging\n✔ Better code reliability\n\n✅ Optimize Performance\n✔ Use StringBuilder for string modifications\n✔ Avoid unnecessary object creation\n✔ Use ThreadPools instead of manual thread creation\n\n---\n\n🔥 2. Java Interview Tips\n✅ Focus on Fundamentals\nMost interviews heavily focus on:\n✔ OOPs Concepts\n✔ Collections Framework\n✔ Multithreading & Concurrency\n✔ JVM Internals\n✔ Exception Handling\n✔ Design Patterns\n\n✅ Understand “Why”, Not Just “What”\nExample:\n❌ Don't just memorize what a HashMap does.\n✔ Understand its internal workings, hashing, and collision handling.\n\n✅ Practice Writing Code\n✔ Solve coding problems regularly\n✔ Debug complex applications\n✔ Work on real-world examples\n\n✅ Explain Concepts with Examples\nInterviewers love:\n✔ Real-life analogies\n✔ Low-level internal working explanations\n✔ Practical use cases\n\n✅ Master Common Interview Topics\n✔ '==' vs '.equals()'\n✔ String Constant Pool\n✔ Synchronization & Locks\n✔ ExecutorService & Thread Pools\n✔ ConcurrentHashMap internals\n✔ Singleton Pattern\n✔ SOLID Principles\n\n✅ Communicate Clearly\n✔ Think out loud before answering\n✔ Explain your logic step-by-step\n✔ Stay calm and collaborative during coding rounds\n\n---\n\n🔥 3. 50-Day Learning Recap\n📚 Core Java\n✔ OOPs Principles\n✔ String Mechanics\n✔ Wrapper Classes\n✔ Exception Handling\n✔ Generics\n\n📚 Collections Framework\n✔ List, Set, and Map interfaces\n✔ HashMap internals (Buckets, Treeifying)\n✔ Concurrent collections\n\n📚 Multithreading & Concurrency\n✔ Thread lifecycle\n✔ Synchronization & Race conditions\n✔ Deadlock prevention\n✔ Executor Framework\n✔ Callable & Future\n\n📚 JVM Internals\n✔ Heap vs. Stack vs. Metaspace\n✔ Garbage Collection algorithms\n✔ ClassLoaders\n✔ Reflection API\n\n📚 Design Patterns\n✔ Creational: Singleton, Factory, Builder\n✔ Behavioral: Strategy, Observer\n\n---\n\n🔥 Biggest Takeaway\n👉 Java is not about memorizing syntax.\n👉 It’s about mastering:\n✔ Problem-solving\n✔ Object-oriented design\n✔ Scalability\n✔ Maintainability\n\n🔹 Real-World Advice\n✔ Build projects from scratch\n✔ Read open-source code\n✔ Get comfortable with debugging\n✔ Keep learning and sharing continuously!\n",
  },
  {
    title: "Java Evolution: From Java 8 to Java 25",
    images: ["public/Java Imp images/img51.jpg"],
    description:
      "🚀 Java Evolution: From Java 8 to Java 25\n\nJava has continuously evolved over the years, introducing features that improve developer productivity, application performance, and scalability. Let's explore the major milestones that transformed modern Java development.\n\n📌 Java 8 (2014) – The Revolution\n\n🔹 Lambda Expressions → Functional programming made simple\n🔹 Streams API → Declarative data processing\n🔹 Optional → Better null handling\n🔹 New Date & Time API → Modern date management\n🔹 Default Methods → Enhanced interface capabilities\n\nJava 8 fundamentally changed how developers write code.\n\n📌 Java 17 (2021) – Enterprise Stability (LTS)\n\n🔹 Records → Concise immutable data classes\n🔹 Sealed Classes → Controlled inheritance\n🔹 Pattern Matching for instanceof → Cleaner type checks\n🔹 Strong Encapsulation → Improved security and reliability\n🔹 Long-Term Support (LTS) → Enterprise-ready stability\n\nJava 17 became the preferred choice for modern enterprise applications.\n\n📌 Java 21 (2023) – Concurrency Reimagined (LTS)\n\n🔹 Virtual Threads (Project Loom) → Massive scalability with lightweight threads\n🔹 Structured Concurrency → Better task management\n🔹 Record Patterns → Powerful data deconstruction\n🔹 Sequenced Collections → Improved collection APIs\n🔹 Pattern Matching for switch → More expressive code\n\nJava 21 enables highly scalable cloud-native applications.\n\n📌 Java 25 (Future Release)\n\n🔹 Enhanced Virtual Threads\n🔹 AI-Era Performance Optimizations\n🔹 Advanced Pattern Matching\n🔹 Better JVM Performance & Security\n🔹 Simpler Concurrent Programming\n\nJava continues evolving while maintaining backward compatibility.\n\n📌 The Java Journey\n\n1️⃣ Java 8 → Better Coding\n2️⃣ Java 17 → Better Design\n3️⃣ Java 21 → Better Scalability\n4️⃣ Java 25 → Better Performance & Innovation\n\nJava keeps getting faster, safer, and more developer-friendly without breaking existing applications. That's one reason it remains one of the most trusted programming languages for enterprise software.",
  },

  {
    title:
      "🚀 Day 33: The 30-Day Pattern-Based DSA Roadmap & Problem-Solving Framework",
    images: ["public/Java Imp images/img56.png"],
    description:
      '🚀 THE PROBLEM WITH GRINDING DSA\nSolving hundreds of random LeetCode problems leads to memorization rather than true problem-solving skill. When an interview question varies slightly from a memorized template, candidates often freeze. Success in technical interviews comes from recognizing underlying algorithmic patterns.\n\n🔹 THE 30-DAY PATTERN ROADMAP (150 PROBLEMS / 30 PATTERNS)\n📌 Days 1–5 (Foundations): Arrays, Two Pointers, Sliding Window, Prefix Sum, Binary Search.\n📌 Days 6–15 (Core Data Structures & Greedy): Linked List, Stack, Heap/Priority Queue, Interval Merging, Greedy Algorithms, Trees (DFS/BFS).\n📌 Days 16–25 (Advanced Paradigms): Backtracking, Graph Traversals (BFS/DFS), Union-Find (Disjoint Set Union), Dynamic Programming (1D/2D), Trie, Bit Manipulation.\n📌 Days 26–30 (Advanced Topics & Mocks): Advanced System/Algorithmic Patterns, Topological Sort, Segment Trees, Final Mock Interviews.\n\n🔹 THE 5-STEP PROBLEM-SOLVING FRAMEWORK\n1️⃣ Brute Force — Write a working naive solution first.\n2️⃣ Better Solution — Identify bottlenecks and reduce time/space complexity.\n3️⃣ Optimal Solution — Implement the most efficient algorithm.\n4️⃣ Pattern Recognition — Categorize the core pattern (e.g., Fast & Slow Pointers, Monotonic Stack).\n5️⃣ Complexity Analysis — Formally evaluate time ($O(N)$, $O(log N)$) and space complexity ($O(1)$, $O(N)$).\n\n🎯 KEY TAKEAWAY\nShift focus from total problem count to pattern mastery. Asking "why is the naive approach slow?" bridges the gap between basic brute force and optimal algorithmic intuition.',
  },
];

// Reusable Carousel sub-component to prevent cross-card index synchronization bugs
// const TopicCardImage = ({
//   topic
// }: {
//   topic: { title: string; image?: string; description?: string; images?: string[] }
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Normalize image fields into a guaranteed uniform array layout format
//   const items = Array.isArray(topic.images)
//     ? topic.images
//     : topic.image
//       ? [topic.image]
//       : [];

// const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
//   e.stopPropagation();
//   setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
// };

// const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
//   e.stopPropagation();
//   setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
// };

//   if (items.length === 0) return null;

//   return (
//     <Box
//       sx={{
//         overflow: "hidden",
//         backgroundColor: "#1e293b",
//         position: "relative",
//       }}
//     >
//       <CardMedia
//         component="img"
//         image={items[currentIndex]}
//         alt={`${topic.title} visual display ${currentIndex + 1}`}
//         className="topic-image"
//         sx={{
//           width: "100%",
//           height: "auto",
//           maxHeight: { xs: 300, sm: 420 },
//           objectFit: "contain",
//           transition: "transform 0.4s ease",
//           p: 2,
//         }}
//       />

//       {items.length > 1 && (
//         <>
//           {/* Left Arrow Controller */}
//           <IconButton
//             onClick={(e)=>{
//                 handlePrev(e)
//             }}
//             sx={{
//               position: "absolute",
//               left: 12,
//               top: "50%",
//               transform: "translateY(-50%)",
//               backgroundColor: "rgba(15, 23, 42, 0.6)",
//               color: "#38bdf8",
//               "&:hover": { backgroundColor: "rgba(15, 23, 42, 0.85)" },
//             }}
//           >
//             <ChevronLeftIcon />
//           </IconButton>

//           {/* Right Arrow Controller */}
//           <IconButton
//             onClick={(e)=>{
//                 handleNext(e)
//             }}
//             sx={{
//               position: "absolute",
//               right: 12,
//               top: "50%",
//               transform: "translateY(-50%)",
//               backgroundColor: "rgba(15, 23, 42, 0.6)",
//               color: "#38bdf8",
//               "&:hover": { backgroundColor: "rgba(15, 23, 42, 0.85)" },
//             }}
//           >
//             <ChevronRightIcon />
//           </IconButton>

//           {/* Bottom Pagination Tracker Indicators */}
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 12,
//               left: "50%",
//               transform: "translateX(-50%)",
//               display: "flex",
//               gap: 1,
//               backgroundColor: "rgba(15, 23, 42, 0.5)",
//               px: 1.5,
//               py: 0.6,
//               borderRadius: 4,
//             }}
//           >
//             {items.map((_: string, dotIdx: number) => (
//               <Box
//                 key={dotIdx}
//                 sx={{
//                   width: 7,
//                   height: 7,
//                   borderRadius: "50%",
//                   backgroundColor:
//                     dotIdx === currentIndex
//                       ? "#38bdf8"
//                       : "rgba(255, 255, 255, 0.35)",
//                   transition: "background-color 0.2s ease",
//                 }}
//               />
//             ))}
//           </Box>
//         </>
//       )}
//     </Box>
//   );
// };

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

// Reusable Carousel sub-component to prevent cross-card index synchronization bugs
const TopicCardImage = ({
  topic,
}: {
  topic: {
    title: string;
    image?: string;
    description?: string;
    images?: string[];
  };
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize image fields into a guaranteed uniform array layout format
  const items = Array.isArray(topic.images)
    ? topic.images
    : topic.image
      ? [topic.image]
      : [];
  const publicItems = items.map((item) => item.replace(/^public\//, "/"));

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (items.length === 0) return null;

  return (
    <Box
      sx={{
        overflow: "hidden",
        backgroundColor: "#eef2eb",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid rgba(35, 66, 50, 0.12)",
      }}
    >
      <CardMedia
        component="img"
        image={publicItems[currentIndex]}
        alt={`${topic.title} visual display ${currentIndex + 1}`}
        className="topic-image"
        sx={{
          width: "100%",
          height: "auto",
          // --- CLARITY & SIZE ENHANCEMENTS ---
          maxHeight: { xs: 500, sm: 800 }, // Generous height budget for clear reading
          objectFit: "contain",
          imageRendering: "high-quality", // Browser engine tuning for cleaner text pixels
          transition: "transform 0.4s ease",
          p: { xs: 1, sm: 2 }, // Gentle padding keeps text away from the absolute borders
        }}
      />

      {/* Social Media Style Action: Open Original High-Res Link */}
      <Button
        href={publicItems[currentIndex]}
        target="_blank"
        rel="noopener noreferrer"
        endIcon={<OpenInNewIcon sx={{ fontSize: "0.85rem !important" }} />}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          color: "#26745a",
          fontSize: "0.85rem",
          fontWeight: 600,
          textTransform: "none",
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          border: "1px solid rgba(35, 66, 50, 0.15)",
          boxShadow: "0 4px 16px rgba(31, 62, 45, 0.12)",
          "&:hover": {
            backgroundColor: "#ffffff",
            color: "#174b38",
            borderColor: "#26745a",
          },
        }}
      >
        View Full Size
      </Button>

      {items.length > 1 && (
        <>
          {/* Left Arrow Controller */}
          <IconButton
            onClick={(e) => {
              handlePrev(e);
            }}
            sx={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              color: "#26745a",
              boxShadow: "0 4px 14px rgba(31, 62, 45, 0.14)",
              "&:hover": { backgroundColor: "#ffffff" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {/* Right Arrow Controller */}
          <IconButton
            onClick={(e) => {
              handleNext(e);
            }}
            sx={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              color: "#26745a",
              boxShadow: "0 4px 14px rgba(31, 62, 45, 0.14)",
              "&:hover": { backgroundColor: "#ffffff" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* Bottom Pagination Tracker Indicators */}
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
              backgroundColor: "rgba(28, 43, 36, 0.72)",
              px: 1.5,
              py: 0.6,
              borderRadius: 4,
            }}
          >
            {items.map((_: string, dotIdx: number) => (
              <Box
                key={dotIdx}
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor:
                    dotIdx === currentIndex
                      ? "#f0bd68"
                      : "rgba(255, 255, 255, 0.35)",
                  transition: "background-color 0.2s ease",
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

// Sub-component for managing the Read More / Read Less description state per item
const ExpandableDescription = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Cutoff length for social-media teaser text
  const characterLimit = 150;
  const shouldTruncate = text.length > characterLimit;

  const displayOriginalText =
    isExpanded || !shouldTruncate
      ? text
      : `${text.substring(0, characterLimit)}...`;

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.7,
          whiteSpace: "pre-line",
          fontSize: { xs: "1.02rem", sm: "1.1rem", md: "1.15rem" },
          color: "#34483d",
          fontFamily: "var(--app-font)",
        }}
      >
        {displayOriginalText}
      </Typography>

      {shouldTruncate && (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            p: 0,
            mt: 1,
            textTransform: "none",
            fontWeight: 700,
            color: "#26745a",
            minWidth: "auto",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </Box>
  );
};

const topicsWithLabels = importantTopicsData.map((topic, index) => {
  const match = topic.description.match(/^\W*day\s*(\d+)/i);
  const label = match ? `Day ${match[1]}` : index === 0 ? "Day 1" : "Bonus";
  return { ...topic, label };
});

// Scroll only the given container (never the window) so `el` is visible in it
const keepVisibleInContainer = (
  container: HTMLElement | null,
  el: HTMLElement | null,
) => {
  if (!container || !el) return;
  const c = container.getBoundingClientRect();
  const e = el.getBoundingClientRect();
  if (e.top < c.top) container.scrollTop -= c.top - e.top;
  else if (e.bottom > c.bottom) container.scrollTop += e.bottom - c.bottom;
  if (e.left < c.left) container.scrollLeft -= c.left - e.left;
  else if (e.right > c.right) container.scrollLeft += e.right - c.right;
};

// const JavaImpTopicsPage = () => {
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         backgroundColor: "#f4f6f1",
//         backgroundImage:
//           "radial-gradient(circle at 50% 0%, rgba(203, 222, 205, 0.42) 0%, rgba(244, 246, 241, 0) 48%), linear-gradient(135deg, #f4f6f1 0%, #fbfcf9 100%)",
//         py: { xs: 2.5, md: 5 },
//         px: { xs: 1.5, sm: 2.5 },
//       }}
//     >
//       <Container maxWidth="xl">
//         {/* Top Sticky Header Section */}
//         <Box
//           sx={{
//             mb: 5,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexWrap: { xs: "wrap", sm: "nowrap" },
//             gap: 2,
//             background: "rgba(255, 255, 255, 0.94)",
//             p: 2,
//             borderRadius: 1,
//             border: "1px solid rgba(35, 66, 50, 0.14)",

//             // --- STICKY CORRECTIONS ---
//             position: "sticky",
//             top: "16px",
//             zIndex: 1100,
//             boxShadow: "0 8px 24px rgba(31, 62, 45, 0.09)",

//             // --- RESPONSIVE FLEX LAYOUT ---
//             flexDirection: "row",
//           }}
//         >
//           {/* Left Container: Separates Back button and Text details cleanly */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: { xs: 1.5, sm: 2.5 },
//               flexGrow: 1,
//             }}
//           >
//             <Button
//               variant="outlined"
//               startIcon={<ArrowBackIcon />}
//               onClick={() => navigate(-1)}
//               sx={{
//                 borderRadius: 1,
//                 textTransform: "none",
//                 borderColor: "rgba(35, 66, 50, 0.2)",
//                 color: "#58675f",
//                 fontWeight: 600,
//                 px: { xs: 1.5, sm: 2.5 }, // Compact on mobile, wider on desktop
//                 minWidth: "auto",
//                 whiteSpace: "nowrap",
//                 "&:hover": {
//                   borderColor: "#26745a",
//                   color: "#26745a",
//                   backgroundColor: "rgba(38, 116, 90, 0.06)",
//                 },
//               }}
//             >
//               Back
//             </Button>

//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <TerminalIcon
//                 sx={{ color: "#26745a", display: { xs: "none", md: "block" } }} // Hidden on mobile/tablet to save horizontal space
//               />
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 800,
//                   color: "#1c2b24",
//                   fontSize: { xs: "1.25rem", sm: "1.6rem", md: "1.85rem" }, // Fluid font sizes
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 Java Cheat Sheets
//               </Typography>
//             </Box>
//           </Box>

//           {/* Right Container: Context Badge */}
//           <Typography
//             variant="caption"
//             sx={{
//               backgroundColor: "#e7f1e9",
//               color: "#26745a",
//               px: 2,
//               py: 0.5,
//               borderRadius: 1,
//               fontWeight: 700,
//               letterSpacing: 1,
//               whiteSpace: "nowrap",
//               ml: { xs: "auto", sm: 0 }, // Pushes the badge to the right edge on mobile layout breaks
//             }}
//           >
//             CORE CONCEPTS
//           </Typography>
//         </Box>

//         {/* Vertical Stack Grid Layout */}
//         <Grid container spacing={{ xs: 3, md: 4 }}>
//           {importantTopicsData.map((topic, index) => (
//             <Grid size={{ xs: 12 }} key={index}>
//               <Card
//                 sx={{
//                   borderRadius: 1,
//                   background: "rgba(255, 255, 255, 0.96)",
//                   border: "1px solid rgba(35, 66, 50, 0.13)",
//                   boxShadow: "0 12px 32px rgba(31, 62, 45, 0.08)",
//                   overflow: "hidden",
//                   maxWidth: 900,
//                   mx: "auto",
//                   transition:
//                     "transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
//                   "&:hover": {
//                     transform: "translateY(-3px)",
//                     borderColor: "rgba(38, 116, 90, 0.38)",
//                     boxShadow: "0 18px 42px rgba(31, 62, 45, 0.13)",
//                     "& .topic-image": {
//                       transform: "scale(1.02)",
//                     },
//                   },
//                 }}
//               >
//                 <TopicCardImage topic={topic} />

//                 <CardContent
//                   sx={{
//                     p: { xs: 2.5, sm: 4, md: 4.5 },
//                     borderTop: "1px solid rgba(35, 66, 50, 0.1)",
//                   }}
//                 >
//                   <Typography
//                     variant="h5"
//                     sx={{
//                       fontWeight: 800,
//                       mb: 2,
//                       color: "#26745a",
//                       fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.85rem" },
//                     }}
//                   >
//                     {topic.title}
//                   </Typography>

//                   <ExpandableDescription text={topic.description} />
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

const JavaImpTopicsPage = () => {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1);
  const navRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const clickLockRef = useRef<number | null>(null);

  const scrollToDay = (day: number) => {
    setActiveDay(day);

    // Ignore the observer while the smooth scroll is running
    if (clickLockRef.current) window.clearTimeout(clickLockRef.current);
    clickLockRef.current = window.setTimeout(() => {
      clickLockRef.current = null;
    }, 1200);

    document.getElementById(`java-day-${day}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Highlight the sidebar item for the card currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (clickLockRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveDay(Number(entry.target.id.replace("java-day-", "")));
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 },
    );

    topicsWithLabels.forEach((_, index) => {
      const el = document.getElementById(`java-day-${index + 1}`);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      if (clickLockRef.current) window.clearTimeout(clickLockRef.current);
    };
  }, []);

  // Keep the active item visible inside the sidebar WITHOUT scrolling the page
  useEffect(() => {
    const btn = document.getElementById(`java-nav-day-${activeDay}`);
    keepVisibleInContainer(navRef.current, btn);
    keepVisibleInContainer(listRef.current, btn);
  }, [activeDay]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f1",
        backgroundImage:
          "radial-gradient(circle at 10% 0%, rgba(203, 222, 205, 0.42), transparent 34%), linear-gradient(135deg, #f4f6f1 0%, #fbfcf9 58%, #edf2eb 100%)",
        py: { xs: 2.5, md: 5 },
        px: { xs: 1.5, md: 3 },
      }}
    >
      <Container maxWidth="xl">
        {/* Sticky header */}
        <Box
          sx={{
            mb: { xs: 2.5, md: 4 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            background: "rgba(255, 255, 255, 0.94)",
            p: { xs: 1.5, sm: 2 },
            borderRadius: 1,
            border: "1px solid rgba(35, 66, 50, 0.14)",
            position: "sticky",
            top: { xs: 8, md: 16 },
            zIndex: 1100,
            boxShadow: "0 8px 24px rgba(31, 62, 45, 0.09)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2.5 },
              minWidth: 0,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 1,
                textTransform: "none",
                borderColor: "rgba(35, 66, 50, 0.2)",
                color: "#58675f",
                fontWeight: 600,
                px: { xs: 1, sm: 2.5 },
                minWidth: "auto",
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: "#26745a",
                  color: "#26745a",
                  backgroundColor: "rgba(38, 116, 90, 0.06)",
                },
              }}
            >
              Back
            </Button>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TerminalIcon
                sx={{ color: "#26745a", display: { xs: "none", sm: "block" } }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#1c2b24",
                  fontSize: { xs: "1.15rem", sm: "1.55rem", md: "1.8rem" },
                  whiteSpace: "nowrap",
                }}
              >
                Java Cheat Sheets
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="caption"
            sx={{
              backgroundColor: "#e7f1e9",
              color: "#26745a",
              px: { xs: 1, sm: 2 },
              py: 0.5,
              borderRadius: 1,
              fontWeight: 700,
              letterSpacing: 1,
              whiteSpace: "nowrap",
            }}
          >
            CORE CONCEPTS
          </Typography>
        </Box>

        {/* Sidebar + content layout */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "240px minmax(0, 1fr)" },
            gap: { xs: 2, md: 3 },
            alignItems: "start",
          }}
        >
          {/* Study days sidebar */}
          <Box
            component="nav"
            ref={navRef}
            aria-label="Study days"
            sx={{
              position: "sticky",
              top: { xs: 76, md: 104 },
              zIndex: { xs: 1000, md: "auto" },
              maxHeight: { md: "calc(100vh - 128px)" },
              overflowY: { md: "auto" },
              overflowX: "hidden",
              p: 1,
              borderRadius: 1,
              backgroundColor: "rgba(255, 255, 255, 0.92)",
              border: "1px solid rgba(35, 66, 50, 0.14)",
              boxShadow: "0 6px 20px rgba(31, 62, 45, 0.06)",
              scrollbarWidth: "thin",
            }}
          >
            <Typography
              sx={{
                display: { xs: "none", md: "block" },
                px: 1.25,
                py: 1,
                color: "#58675f",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              Study days
            </Typography>

            <Box
              ref={listRef}
              sx={{
                display: { xs: "flex", md: "block" },
                gap: 0.75,
                overflowX: { xs: "auto", md: "visible" },
                scrollbarWidth: "thin",
              }}
            >
              {topicsWithLabels.map((topic, index) => {
                const day = index + 1; // anchor id only
                const isActive = activeDay === day;

                return (
                  <Button
                    key={day}
                    id={`java-nav-day-${day}`}
                    onClick={() => scrollToDay(day)}
                    aria-current={isActive ? "page" : undefined}
                    title={topic.title}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      flexShrink: 0,
                      width: { xs: "auto", md: "100%" },
                      minWidth: { xs: 78, md: 0 },
                      px: 1.25,
                      py: 0.9,
                      borderRadius: 1.5,
                      textAlign: "left",
                      textTransform: "none",
                      color: isActive ? "#174b38" : "#58675f",
                      backgroundColor: isActive ? "#dcebe0" : "transparent",
                      borderLeft: {
                        xs: "none",
                        md: isActive
                          ? "3px solid #26745a"
                          : "3px solid transparent",
                      },
                      "&:hover": {
                        backgroundColor: isActive
                          ? "#cce2d2"
                          : "rgba(38, 116, 90, 0.08)",
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: isActive ? 800 : 700,
                        lineHeight: 1.2,
                      }}
                    >
                      {topic.label}
                    </Typography>
                    <Typography
                      component="span"
                      sx={{
                        display: { xs: "none", md: "block" },
                        width: "100%",
                        mt: 0.25,
                        fontSize: "0.74rem",
                        fontWeight: 500,
                        lineHeight: 1.3,
                        opacity: 0.8,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {topic.title}
                    </Typography>
                  </Button>
                );
              })}
            </Box>
          </Box>

          {/* Cards */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 3, md: 5 },
              minWidth: 0,
            }}
          >
            {topicsWithLabels.map((topic, index) => (
              <Card
                key={index}
                id={`java-day-${index + 1}`}
                sx={{
                  borderRadius: 1,
                  background: "rgba(255, 255, 255, 0.96)",
                  border: "1px solid rgba(35, 66, 50, 0.13)",
                  boxShadow: "0 12px 32px rgba(31, 62, 45, 0.08)",
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: 900,
                  mx: "auto",
                  scrollMarginTop: { xs: 150, md: 112 },
                  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    borderColor: "rgba(38, 116, 90, 0.38)",
                    boxShadow: "0 18px 42px rgba(31, 62, 45, 0.13)",
                  },
                }}
              >
                <TopicCardImage topic={topic} />

                <CardContent
                  sx={{
                    p: { xs: 2.5, sm: 4 },
                    borderTop: "1px solid rgba(35, 66, 50, 0.1)",
                  }}
                >
                  <Typography
                    sx={{
                      mb: 2,
                      color: "#26745a",
                      fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.85rem" },
                      fontWeight: 800,
                    }}
                  >
                    {topic.label}: {topic.title}
                  </Typography>

                  <ExpandableDescription text={topic.description} />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default JavaImpTopicsPage;
