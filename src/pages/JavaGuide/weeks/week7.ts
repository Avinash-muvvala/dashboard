import { createTopicGuide } from "./createTopicGuide";

export const week7Topics = {
  "7-0": createTopicGuide(
    "An exception is an object describing an abnormal condition. Java's try, catch, and finally constructs let code handle expected failures, recover when possible, and release resources without hiding the underlying problem.",
    [
      "Catch only failures the code can meaningfully handle.",
      "Use finally for cleanup when try-with-resources is not suitable.",
      "Do not swallow exceptions silently.",
    ],
    `try {
    int result = Integer.parseInt(input);
} catch (NumberFormatException exception) {
    System.out.println("Enter a whole number");
}`,
    "What is the main purpose of a catch block?",
    [
      "Handle a matching exception or provide a useful response.",
      "Make all exceptions impossible.",
      "Retry every statement automatically.",
      "Convert checked exceptions into errors.",
    ],
    0,
    "A catch block handles an exception type that may be thrown from its associated try block.",
  ),
  "7-1": createTopicGuide(
    "Checked exceptions are checked by the compiler and must be caught or declared. RuntimeException and its subclasses are unchecked; they often indicate invalid state or programming errors and do not require a throws declaration.",
    [
      "IOException is checked.",
      "NullPointerException is unchecked.",
      "A method can declare checked failures with throws.",
    ],
    `static String read(Path path) throws IOException {
    return Files.readString(path);
}`,
    "Which exception is checked?",
    ["IOException", "NullPointerException", "IllegalArgumentException", "IndexOutOfBoundsException"],
    0,
    "IOException is checked, so callers must catch it or declare it.",
  ),
  "7-2": createTopicGuide(
    "A custom exception represents a domain-specific failure with a meaningful name and message. Extend Exception for a checked exception or RuntimeException for an unchecked one, choosing based on whether callers should be required to handle it.",
    [
      "Use an exception name that communicates the failure.",
      "Preserve the cause when translating a lower-level failure.",
      "Avoid using exceptions for ordinary branching.",
    ],
    `class InsufficientFundsException extends RuntimeException {
    InsufficientFundsException(String message) {
        super(message);
    }
}`,
    "What should a custom exception communicate?",
    [
      "A specific application or domain failure",
      "That every method succeeded",
      "A collection's iteration order",
      "The JVM's current stack size",
    ],
    0,
    "A domain exception gives callers a clear type and message for a meaningful failure.",
  ),
  "7-3": createTopicGuide(
    "Exception chaining keeps a higher-level explanation while retaining the original cause. This lets application code add context without losing the low-level exception needed for diagnosis.",
    [
      "Use a constructor that accepts the cause.",
      "Keep the original exception available for logs and debugging.",
      "Translate exceptions at a meaningful abstraction boundary.",
    ],
    `try {
    repository.save(record);
} catch (SQLException cause) {
    throw new StorageException("Could not save record", cause);
}`,
    "Why preserve an exception's cause when wrapping it?",
    [
      "To retain the original failure details for diagnosis",
      "To make the original exception impossible to inspect",
      "To change the failure into a successful result",
      "To avoid creating a stack trace",
    ],
    0,
    "The cause retains the original exception and its stack trace for troubleshooting.",
  ),
  "7-4": createTopicGuide(
    "Try-with-resources closes resources that implement AutoCloseable when the block exits, including when an exception occurs. It is preferred for files, streams, and similar resources because cleanup is automatic.",
    [
      "Resources are declared in the try header.",
      "Resources close in reverse declaration order.",
      "The resource must implement AutoCloseable.",
    ],
    `try (BufferedReader reader = Files.newBufferedReader(path)) {
    return reader.readLine();
}`,
    "When does try-with-resources close its resources?",
    [
      "When the try block exits, including after an exception",
      "Only when close is called by another thread",
      "Only after the JVM shuts down",
      "Only when the block finishes without errors",
    ],
    0,
    "The language automatically closes each AutoCloseable resource as control leaves the block.",
  ),
  "7-5": createTopicGuide(
    "The JVM loads and verifies bytecode, manages runtime memory, and executes code through interpretation and just-in-time compilation. The JVM specification defines behavior while different implementations provide the runtime machinery.",
    [
      "The class loader loads class definitions.",
      "The bytecode verifier checks class-file safety constraints.",
      "The execution engine interprets or compiles bytecode.",
    ],
    `// Compile: javac Hello.java
// Run:     java Hello
public class Hello {
    public static void main(String[] args) {
        System.out.println("Runs on a JVM");
    }
}`,
    "What does the JVM execute after Java source compilation?",
    [
      "Java bytecode",
      "The original source text only",
      "A database schema",
      "Maven configuration",
    ],
    0,
    "The Java compiler produces bytecode, which a compatible JVM loads and executes.",
  ),
  "7-6": createTopicGuide(
    "Each thread has its own call stack for method frames and local variables. Objects are generally allocated in the heap and can be shared between threads; exact allocation optimizations are implementation details of the JVM.",
    [
      "Method calls create frames on a thread's stack.",
      "The heap stores objects that may be shared.",
      "A local reference can point to an object on the heap.",
    ],
    `void example() {
    int attempts = 3;                 // local value
    StringBuilder message = new StringBuilder(); // object reference
}`,
    "Which memory area stores a thread's method frames?",
    ["That thread's stack", "The class-file constant pool only", "The garbage collector", "The source directory"],
    0,
    "Each thread has a stack that holds its active method frames and local variables.",
  ),
  "7-7": createTopicGuide(
    "Garbage collection reclaims heap objects that are no longer reachable from live program references. Setting a variable to null does not force immediate collection; collection timing is managed by the JVM.",
    [
      "Reachability, not scope alone, determines whether an object can be reclaimed.",
      "Calling System.gc is only a request and is not guaranteed to run collection.",
      "Applications should close external resources explicitly rather than rely on GC.",
    ],
    `List<byte[]> buffers = new ArrayList<>();
buffers.add(new byte[1024]);
buffers.clear(); // the byte array may now be eligible for collection`,
    "What makes a heap object eligible for garbage collection?",
    [
      "It is no longer reachable from live references.",
      "Its class has a short name.",
      "It was created inside a method.",
      "The program calls System.gc once.",
    ],
    0,
    "The JVM can reclaim an object when no live reference can reach it.",
  ),
};
