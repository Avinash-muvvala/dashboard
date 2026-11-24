import { createTopicGuide } from "./createTopicGuide";

export const week5Topics = {
  "5-0": createTopicGuide(
    "Generics let classes, interfaces, and methods work with a chosen reference type while preserving compile-time type safety. A generic collection such as List<String> prevents callers from inserting an unrelated type and avoids casts when reading values.",
    [
      "Type parameters such as T are supplied by the caller.",
      "Generic types are checked at compile time.",
      "Java generics use reference types; use wrapper classes for primitives.",
    ],
    `class Box<T> {
    private final T value;
    Box(T value) { this.value = value; }
    T get() { return value; }
}

Box<String> box = new Box<>("Java");
String language = box.get();`,
    "What is a key benefit of using generics?",
    [
      "Compile-time type safety with fewer casts",
      "Automatic parallel execution",
      "Allowing primitive types as generic arguments",
      "Making every class immutable",
    ],
    0,
    "The compiler checks generic types and callers can use returned values without unsafe casts.",
  ),
  "5-1": createTopicGuide(
    "The Collections Framework provides interfaces, implementations, and algorithms for working with groups of objects. Program to interfaces such as List or Set, then select an implementation based on ordering, uniqueness, and performance needs. Map is part of the framework but is not a subtype of Collection.",
    [
      "Interfaces describe behavior; classes provide implementations.",
      "List, Set, and Queue are common Collection subinterfaces.",
      "Collections provides utility algorithms such as sorting.",
    ],
    `List<Integer> scores = new ArrayList<>();
scores.add(42);
scores.add(18);
Collections.sort(scores);`,
    "Which statement about Map is correct?",
    [
      "Map stores key-value pairs and does not extend Collection.",
      "Map is a subtype of List.",
      "Map stores only unique values.",
      "Map always sorts entries by key.",
    ],
    0,
    "Map models key-value associations and is a separate collection hierarchy from Collection.",
  ),
  "5-2": createTopicGuide(
    "List represents an ordered sequence that supports duplicates and positional access. Its common implementations include ArrayList and LinkedList; the interface lets code switch between them without changing its public contract.",
    [
      "Lists preserve element order.",
      "Duplicate elements are allowed.",
      "Use index-based methods such as get and set when positional access is needed.",
    ],
    `List<String> names = new ArrayList<>();
names.add("Maya");
names.add("Maya");
System.out.println(names.get(0));`,
    "Which behavior is guaranteed by the List interface?",
    [
      "Elements are unique.",
      "Elements are kept in sorted order.",
      "Elements have an order and duplicates are allowed.",
      "Elements are accessed only by key.",
    ],
    2,
    "List is an ordered collection that permits duplicates; it does not promise automatic sorting.",
  ),
  "5-3": createTopicGuide(
    "ArrayList is a resizable-array implementation of List. It provides fast indexed reads and appends efficiently on average, while inserting or removing near the beginning or middle may shift later elements.",
    [
      "Indexed reads are typically O(1).",
      "Appending is amortized O(1).",
      "Middle insertions and removals can require shifting elements.",
    ],
    `List<String> tasks = new ArrayList<>();
tasks.add("Plan");
tasks.add("Build");
String first = tasks.get(0);`,
    "Which operation is ArrayList especially efficient at?",
    [
      "Reading an element by index",
      "Inserting at the front without shifting",
      "Keeping all elements automatically sorted",
      "Concurrent updates without synchronization",
    ],
    0,
    "ArrayList uses an array internally, so it can access an element directly by index.",
  ),
  "5-4": createTopicGuide(
    "LinkedList is a doubly linked implementation of List and Deque. It is useful for operations at either end, but locating an element by index requires walking through nodes, and each node has extra link storage.",
    [
      "Each node links to its previous and next node.",
      "Adding or removing at an end is efficient.",
      "Indexed access is slower than ArrayList because traversal is required.",
    ],
    `Deque<String> tasks = new LinkedList<>();
tasks.addLast("Review");
tasks.addLast("Submit");
String next = tasks.removeFirst();`,
    "Why is LinkedList indexed access usually slower than ArrayList?",
    [
      "It must traverse nodes to reach the requested position.",
      "It sorts elements before every read.",
      "It copies the entire list for every lookup.",
      "It can only store strings.",
    ],
    0,
    "A linked list has no direct index-to-memory mapping, so it walks through nodes.",
  ),
  "5-5": createTopicGuide(
    "Set represents a collection with no duplicate elements. The Set interface itself does not promise a particular iteration order; the chosen implementation determines ordering and performance characteristics.",
    [
      "Adding an equal element does not create a second set entry.",
      "Set has no index-based access contract.",
      "Choose an implementation for hashing, insertion order, or sorted order.",
    ],
    `Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("java");
System.out.println(tags.size()); // 1`,
    "What does the Set interface guarantee?",
    [
      "No duplicate elements",
      "Insertion order in every implementation",
      "Sorted order in every implementation",
      "Access by numeric index",
    ],
    0,
    "Set models uniqueness, while iteration order depends on its concrete implementation.",
  ),
  "5-6": createTopicGuide(
    "HashSet uses hashing to store unique elements and does not guarantee iteration order. Correct equality behavior depends on implementing equals and hashCode consistently for custom element types.",
    [
      "Duplicate detection uses hashCode and equals.",
      "Iteration order is not guaranteed.",
      "It is not designed for unsynchronized concurrent mutation.",
    ],
    `Set<String> languages = new HashSet<>();
languages.add("Java");
languages.add("Kotlin");
languages.add("Java");`,
    "What should a custom class do when used as a HashSet element?",
    [
      "Implement equals and hashCode consistently.",
      "Implement only toString.",
      "Make every field static.",
      "Extend TreeSet.",
    ],
    0,
    "Hash-based collections use hashCode to find a bucket and equals to identify equal elements.",
  ),
  "5-7": createTopicGuide(
    "TreeSet stores unique elements in sorted order using their natural ordering or a supplied Comparator. Its tree-based operations are generally O(log n); elements must be mutually comparable under the selected ordering.",
    [
      "Iteration follows sorted order.",
      "The default ordering comes from Comparable.",
      "A Comparator can define a custom ordering.",
    ],
    `Set<Integer> scores = new TreeSet<>();
scores.add(30);
scores.add(10);
scores.add(20);
System.out.println(scores); // [10, 20, 30]`,
    "How does TreeSet order elements?",
    [
      "By natural ordering or a supplied Comparator",
      "By insertion order only",
      "By hash code only",
      "It never orders elements",
    ],
    0,
    "TreeSet uses a comparison rule to keep its elements sorted.",
  ),
};
