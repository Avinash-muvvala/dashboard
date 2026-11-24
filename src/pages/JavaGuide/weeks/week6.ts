import { createTopicGuide } from "./createTopicGuide";

export const week6Topics = {
  "6-0": createTopicGuide(
    "Map associates unique keys with values. A key can be used to find its value, while different keys may refer to equal values. Map is not a subtype of Collection.",
    [
      "Keys are unique within a map.",
      "Values may be duplicated.",
      "Choose HashMap, TreeMap, or another implementation for the required ordering and concurrency behavior.",
    ],
    `Map<String, Integer> stock = new HashMap<>();
stock.put("notebook", 12);
int count = stock.getOrDefault("notebook", 0);`,
    "What must be unique in a Map?",
    [
      "Keys",
      "Values",
      "Both keys and values",
      "Neither keys nor values",
    ],
    0,
    "A key identifies one mapping; values are allowed to repeat.",
  ),
  "6-1": createTopicGuide(
    "HashMap is a hash-table-based Map implementation. It offers expected constant-time lookups for well-distributed keys, makes no iteration-order guarantee, and is not synchronized for concurrent writes.",
    [
      "Average get and put operations are O(1).",
      "Iteration order is unspecified.",
      "It permits one null key and null values, but is not thread-safe.",
    ],
    `Map<String, Integer> visits = new HashMap<>();
visits.put("home", 4);
visits.merge("home", 1, Integer::sum);`,
    "Which statement about HashMap iteration order is correct?",
    [
      "It is not guaranteed.",
      "It is always sorted by key.",
      "It always matches insertion order.",
      "It is always reverse insertion order.",
    ],
    0,
    "HashMap does not promise a stable or sorted iteration order.",
  ),
  "6-2": createTopicGuide(
    "TreeMap keeps mappings sorted by key using natural ordering or a Comparator. Its key-based operations are typically O(log n), making it useful when ordered traversal or range queries are required.",
    [
      "Entries iterate in key order.",
      "A Comparator can supply custom key ordering.",
      "Natural-order TreeMap keys must be mutually comparable.",
    ],
    `Map<Integer, String> ranks = new TreeMap<>();
ranks.put(3, "third");
ranks.put(1, "first");
System.out.println(ranks.keySet()); // [1, 3]`,
    "What is a common reason to choose TreeMap over HashMap?",
    [
      "The keys must be traversed in sorted order.",
      "The map must accept multiple identical keys.",
      "The map must be safe for concurrent writes.",
      "The map must preserve only insertion order.",
    ],
    0,
    "TreeMap maintains keys in sorted order, while HashMap provides no ordering guarantee.",
  ),
  "6-3": createTopicGuide(
    "HashMap uses a key's hash code to select a bucket and equals to distinguish keys that land in the same bucket. Resizing occurs as entries grow past the load threshold; Java can treeify heavily-collided buckets under suitable conditions.",
    [
      "Equal keys must have equal hash codes.",
      "Collisions are resolved by checking keys within a bucket.",
      "Changing a key in a way that affects equals or hashCode while stored can make it difficult to find.",
    ],
    `Map<String, Integer> counts = new HashMap<>();
counts.put("pear", 1);
counts.compute("pear", (key, oldValue) ->
    oldValue == null ? 1 : oldValue + 1);`,
    "What happens when two unequal keys have the same hash code?",
    [
      "They collide in a bucket and are distinguished with equals.",
      "One key is always discarded.",
      "The map stops accepting entries.",
      "The keys are automatically sorted.",
    ],
    0,
    "A hash collision is allowed; the map checks equality among entries sharing a bucket.",
  ),
  "6-4": createTopicGuide(
    "Queue models elements waiting for processing. FIFO is common, but priority-based queues may select by priority instead. The offer, poll, and peek methods are useful because they report capacity or emptiness without requiring exception-based control flow.",
    [
      "offer adds an element and reports success.",
      "poll removes and returns the head, or null when empty.",
      "peek observes the head without removing it.",
    ],
    `Queue<String> jobs = new ArrayDeque<>();
jobs.offer("email");
jobs.offer("report");
String nextJob = jobs.poll();`,
    "What does Queue.poll() do when the queue is empty?",
    [
      "Returns null",
      "Throws an exception in every implementation",
      "Creates a new element",
      "Returns the last inserted element",
    ],
    0,
    "The Queue contract says poll returns null when no head element is available.",
  ),
  "6-5": createTopicGuide(
    "Deque is a double-ended queue that supports insertion and removal at both ends. It can act as a queue or stack; ArrayDeque is usually a good general-purpose choice when null elements are not needed.",
    [
      "addFirst and addLast insert at either end.",
      "removeFirst and removeLast remove from either end.",
      "Deque can provide stack behavior without the legacy Stack class.",
    ],
    `Deque<String> history = new ArrayDeque<>();
history.push("home");
history.push("profile");
String current = history.pop();`,
    "Which structure allows insertion and removal at both ends?",
    ["Deque", "Set", "Map", "PriorityQueue only"],
    0,
    "Deque means double-ended queue and exposes operations for both ends.",
  ),
  "6-6": createTopicGuide(
    "Comparable defines a type's natural ordering through compareTo. Implementing it puts the default ordering rule on the type itself, so sorting can use that rule without a separate comparator.",
    [
      "The method is compareTo(other).",
      "The result is negative, zero, or positive to express ordering.",
      "Use a natural order that is consistent with equals when practical.",
    ],
    `class Score implements Comparable<Score> {
    final int value;
    Score(int value) { this.value = value; }
    public int compareTo(Score other) {
        return Integer.compare(value, other.value);
    }
}`,
    "Which method does Comparable require?",
    ["compareTo", "compare", "equalsTo", "sortBy"],
    0,
    "Comparable declares compareTo to define the object's natural ordering.",
  ),
  "6-7": createTopicGuide(
    "Comparator defines an ordering outside the compared class. It is useful when a type needs multiple sort orders or cannot be modified; comparator factories can compose rules for secondary fields.",
    [
      "The method is compare(left, right).",
      "Multiple Comparator instances can define different sort orders.",
      "Comparator.comparing makes property-based ordering concise.",
    ],
    `Comparator<String> byLength =
    Comparator.comparingInt(String::length);
List<String> names = new ArrayList<>(List.of("Ada", "Alexander"));
names.sort(byLength);`,
    "When is Comparator especially useful?",
    [
      "When defining an external or alternative ordering",
      "When preventing all sorting",
      "When replacing equals and hashCode",
      "When making a collection immutable",
    ],
    0,
    "A Comparator supplies sorting logic separately, including multiple possible orderings.",
  ),
  "6-8": createTopicGuide(
    "ConcurrentHashMap supports concurrent access without synchronizing every operation on the whole map. It is suited to shared mutable mappings, provides atomic methods such as compute and putIfAbsent, and does not allow null keys or values.",
    [
      "Concurrent updates are designed for multiple threads.",
      "Use atomic map methods for compound per-key updates.",
      "Null keys and null values are not permitted.",
    ],
    `ConcurrentMap<String, Long> totals = new ConcurrentHashMap<>();
totals.merge("orders", 1L, Long::sum);`,
    "Which operation is designed for an atomic per-key update?",
    [
      "ConcurrentMap.merge",
      "Read followed by an unsynchronized put",
      "Sorting the map after each write",
      "Wrapping the map in an ArrayList",
    ],
    0,
    "ConcurrentMap.merge performs the mapping update atomically for the key.",
  ),
};
