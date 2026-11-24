import { createTopicGuide } from "./createTopicGuide";

export const week8Topics = {
  "8-0": createTopicGuide(
    "A lambda expression is a concise implementation of a functional interface. It can capture local variables only when they are final or effectively final, keeping captured values stable.",
    [
      "The target type supplies the functional interface.",
      "Parameter types can often be inferred.",
      "Captured local variables must be final or effectively final.",
    ],
    `List<String> names = List.of("Ada", "Lin");
names.forEach(name -> System.out.println(name));`,
    "What does a lambda expression implement?",
    [
      "A functional interface's abstract method",
      "A new Java class file at runtime",
      "A database transaction",
      "A thread-safe collection",
    ],
    0,
    "A lambda provides an implementation for the single abstract method of its target functional interface.",
  ),
  "8-1": createTopicGuide(
    "A functional interface has exactly one abstract method, making it a target for lambdas and method references. It may still declare default and static methods; @FunctionalInterface asks the compiler to verify the contract.",
    [
      "Runnable and Predicate are common functional interfaces.",
      "Default and static methods do not add abstract-method obligations.",
      "@FunctionalInterface is an optional compile-time check.",
    ],
    `@FunctionalInterface
interface Converter<F, T> {
    T convert(F value);
}
Converter<String, Integer> parse = Integer::valueOf;`,
    "Can a functional interface contain a default method?",
    ["Yes; it still has one abstract method.", "No, it may contain only one method total.", "Only if it extends Thread.", "No, default methods are abstract."],
    0,
    "The rule counts abstract methods; default and static methods are allowed.",
  ),
  "8-2": createTopicGuide(
    "A method reference reuses an existing method as an implementation of a compatible functional interface. The compiler checks that the referenced method's parameters and return type fit the target.",
    [
      "ClassName::staticMethod references a static method.",
      "object::instanceMethod references a method on a particular object.",
      "ClassName::instanceMethod can reference an instance method on an input.",
    ],
    `List<String> names = List.of("ava", "lee");
names.stream()
    .map(String::toUpperCase)
    .forEach(System.out::println);`,
    "What does String::toUpperCase represent here?",
    [
      "A method reference that transforms each input string",
      "A constructor for a String subclass",
      "A static field on String",
      "A regular expression",
    ],
    0,
    "The method reference fits the mapping function and calls toUpperCase on each stream element.",
  ),
  "8-3": createTopicGuide(
    "The Stream API describes a pipeline over a data source. Intermediate operations such as filter and map are lazy; a terminal operation such as collect or forEach triggers evaluation. A stream does not store data or normally mutate its source.",
    [
      "A pipeline has a source, zero or more intermediate operations, and a terminal operation.",
      "Intermediate operations are lazy.",
      "A stream should generally be consumed only once.",
    ],
    `List<String> longNames = names.stream()
    .filter(name -> name.length() > 3)
    .map(String::toUpperCase)
    .toList();`,
    "When is a stream pipeline evaluated?",
    [
      "When a terminal operation is invoked",
      "As soon as the first intermediate operation is written",
      "Only when the source list is sorted",
      "When the JVM starts",
    ],
    0,
    "Intermediate operations are lazy; a terminal operation triggers pipeline evaluation.",
  ),
  "8-4": createTopicGuide(
    "Optional represents a value that may be absent and encourages callers to handle that absence explicitly. It is most useful as a return type; avoid calling get without checking, and use orElseGet when the fallback is expensive to create.",
    [
      "Optional.of rejects null; ofNullable accepts it.",
      "Use map and flatMap to transform present values.",
      "Optional is not a replacement for every nullable field or parameter.",
    ],
    `Optional<String> name = Optional.ofNullable(findName());
String displayName = name.orElse("Guest");`,
    "What does Optional.empty() represent?",
    [
      "An absent value",
      "A value containing null",
      "An empty string",
      "A failed compilation",
    ],
    0,
    "Optional.empty represents that no value is present.",
  ),
  "8-5": createTopicGuide(
    "A thread is an execution path within a process. Multiple threads can make progress concurrently, but shared mutable state requires coordination; for application tasks, executor services are generally easier to manage than creating unbounded threads manually.",
    [
      "Runnable describes a task without a return value.",
      "Starting a thread schedules its run method; calling run directly does not start a new thread.",
      "Executors manage task submission and thread reuse.",
    ],
    `ExecutorService pool = Executors.newFixedThreadPool(2);
pool.submit(() -> System.out.println("Task running"));
pool.shutdown();`,
    "What is the difference between calling start() and run() on a Thread?",
    [
      "start schedules a new thread; run is an ordinary method call.",
      "run creates a thread; start executes synchronously.",
      "They always behave identically.",
      "start is used only to terminate a thread.",
    ],
    0,
    "Thread.start initiates a separate execution path; directly invoking run executes on the current thread.",
  ),
  "8-6": createTopicGuide(
    "A Java thread moves through states such as NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED. These states describe the thread's lifecycle; RUNNABLE includes a thread that is ready to run or currently running.",
    [
      "A newly constructed thread is NEW.",
      "A thread waiting to acquire a monitor is BLOCKED.",
      "A terminated thread cannot be restarted.",
    ],
    `Thread worker = new Thread(() -> doWork());
System.out.println(worker.getState()); // NEW
worker.start();`,
    "What state is a thread in immediately after construction and before start()?",
    ["NEW", "RUNNABLE", "WAITING", "TERMINATED"],
    0,
    "A Thread object remains in NEW until start is called.",
  ),
  "8-7": createTopicGuide(
    "Synchronization coordinates access to shared mutable state. A synchronized block acquires an object's monitor, providing mutual exclusion and visibility guarantees; excessive or inconsistent locking can reduce throughput or cause deadlocks.",
    [
      "Protect the same shared state with a consistent locking strategy.",
      "Atomic classes can suit simple individual-variable updates.",
      "Keep synchronized sections short and avoid nested locks where possible.",
    ],
    `class Counter {
    private int value;
    synchronized void increment() { value++; }
    synchronized int get() { return value; }
}`,
    "What does synchronized provide for a shared critical section?",
    [
      "Mutual exclusion and memory visibility through the monitor",
      "Automatic parallel execution",
      "A guarantee that no exception can occur",
      "A separate JVM for each method",
    ],
    0,
    "A monitor permits only one thread at a time in the synchronized section and establishes visibility guarantees.",
  ),
};
