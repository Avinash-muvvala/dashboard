import { extractPostPracticeQuestions } from "../PostPracticeQuestions";
import { ReactTopics } from "./ReactTopicsData";

const additionalQuestions = {
  20: [
    {
      question: "What should you define before starting a React mini project?",
      answer:
        "Define the requirements, user interactions, features, data flow, and the components needed to deliver the experience.",
    },
    {
      question: "Where should shared state live in a component tree?",
      answer:
        "Place shared state in the closest common parent of the components that need to read or update it.",
    },
  ],
  22: [
    {
      question:
        "What is the single-responsibility principle for UI components?",
      answer:
        "Each component should have one focused purpose, such as capturing form input, displaying a task list, or rendering one task.",
    },
    {
      question:
        "How can a child component communicate an update to its parent?",
      answer:
        "The parent passes a callback function as a prop, and the child invokes it with the updated value or action.",
    },
  ],
  23: [
    {
      question: "Why are props treated as read-only in a child component?",
      answer:
        "Read-only props preserve predictable one-way data flow. A child requests changes through a callback rather than mutating data owned by its parent.",
    },
    {
      question:
        "When can callback props help avoid duplicated component logic?",
      answer:
        "A parent can provide one shared action as a callback, allowing reusable children to report events without owning or duplicating the parent-level update logic.",
    },
  ],
  24: [
    {
      question: "When should a state setter use a functional update?",
      answer:
        "Use a functional update when the next state depends on the previous state, so React applies the update to the latest pending value.",
    },
    {
      question: "How should an item be added to an array stored in state?",
      answer:
        "Return a new array, for example with `setItems(previous => [...previous, newItem])`, instead of mutating the existing array.",
    },
  ],
  25: [
    {
      question:
        "Why pass `onClick={handleClick}` instead of `onClick={handleClick()}?",
      answer:
        "Passing the function reference lets React call it when the event occurs. Calling it during render executes it immediately instead of on click.",
    },
    {
      question: "How can an event handler receive an item ID?",
      answer:
        "Wrap the call in a function, such as `onClick={() => handleDelete(item.id)}`, so the handler runs with that ID when clicked.",
    },
  ],
  26: [
    {
      question: "When should a controlled form validate its values?",
      answer:
        "Validation can run as fields change, when a field loses focus, or on submission. Choose timing that provides useful feedback without overwhelming the user.",
    },
    {
      question: "How can one change handler update several controlled fields?",
      answer:
        "Give each input a `name` and update the matching property in a state object while preserving the other fields, for example with a computed property and object spread.",
    },
  ],
  27: [
    {
      question: "Why can array-index keys cause bugs in a changing list?",
      answer:
        "After an insertion, deletion, or reorder, an index may refer to a different item. React can then associate component state with the wrong list item.",
    },
    {
      question: "What makes a good React list key?",
      answer:
        "A key should be unique among siblings and stable for the same item across renders, such as a persistent database or domain ID.",
    },
  ],
  28: [
    {
      question: "When should an effect return a cleanup function?",
      answer:
        "Return cleanup when an effect starts a resource that must be stopped or released, such as a timer, event listener, subscription, or connection.",
    },
    {
      question:
        "Why is a functional initializer useful when loading state from localStorage?",
      answer:
        "Passing an initializer function to `useState` avoids parsing localStorage again on every render; React evaluates it for the initial state.",
    },
  ],
  29: [
    {
      question:
        "Why are filtered results usually derived during render instead of stored in state?",
      answer:
        "They can be calculated from the source list and current filters. Deriving them avoids duplicated state that can become inconsistent when either input changes.",
    },
    {
      question: "How should a search comparison handle letter casing?",
      answer:
        "Normalize both the search text and the field value to the same case before comparing them, for example with `toLowerCase()`.",
    },
  ],
  30: [
    {
      question: "What should a refactor preserve?",
      answer:
        "A refactor should preserve the component's externally observable behavior while improving its structure, readability, or maintainability.",
    },
    {
      question: "When is extracting a custom hook useful during refactoring?",
      answer:
        "Extract a custom hook when stateful behavior or effects form a reusable, focused unit that can be shared independently of a component's presentation.",
    },
  ],
  31: [
    {
      question:
        "Does a custom hook share state between separate component calls?",
      answer:
        "No. Each call has its own hook state. To share state, the components need a common owner or a shared mechanism such as context.",
    },
    {
      question: "Can a custom hook call another custom hook conditionally?",
      answer:
        "No. Custom hooks must follow the Rules of Hooks and be called unconditionally at the top level of a component or another custom hook.",
    },
  ],
  32: [
    {
      question: "What makes a ref different from state for storing a timer ID?",
      answer:
        "A ref persists across renders without causing a render when `.current` changes, which suits timer IDs that do not affect displayed UI.",
    },
    {
      question: "How can a component focus an input with useRef?",
      answer:
        "Create a ref, attach it to the input with the `ref` prop, then call the input element's `focus()` method through `ref.current` in response to an event or effect.",
    },
  ],
  33: [
    {
      question:
        "What should be listed as dependencies of a useMemo calculation?",
      answer:
        "Include every reactive value used by the calculation so React can recompute the result when one of those values changes.",
    },
    {
      question: "Should useMemo be used for every calculation?",
      answer:
        "No. Use it when recomputation is measurably expensive or stable identity is useful; for cheap calculations, the extra memoization can add unnecessary complexity.",
    },
  ],
  34: [
    {
      question:
        "What happens if a value used by a useCallback function is omitted from its dependencies?",
      answer:
        "The callback can retain a stale value from an earlier render. Include reactive values the callback reads in its dependency list.",
    },
    {
      question:
        "Does useCallback prevent the component that defines it from rendering?",
      answer:
        "No. It preserves a function reference between renders when dependencies are unchanged; it does not prevent its owning component from rendering.",
    },
  ],
  35: [
    {
      question:
        "Why can changing a Context provider value re-render many consumers?",
      answer:
        "Consumers that read that context update when the provider value changes. Keeping unrelated state in separate contexts can limit unnecessary updates.",
    },
    {
      question:
        "When is context a reasonable alternative to passing props through several components?",
      answer:
        "Context is useful when many descendants need the same value across a component subtree and passing it through intermediate components would create excessive prop drilling.",
    },
  ],
  36: [
    {
      question: "When is passing props preferable to using Context?",
      answer:
        "Use props when data is needed by a child or a small number of nearby descendants. Explicit props make component dependencies clear and keep components easier to reuse.",
    },
    {
      question: "Why should Context be split by concern?",
      answer:
        "Separate contexts for unrelated values, such as authentication and theme, help limit which consumers update when a provider value changes.",
    },
  ],
  37: [
    {
      question: "How does server state differ from local UI state?",
      answer:
        "Local UI state is owned by the client interface, such as whether a modal is open. Server state comes from a remote source and needs asynchronous fetching, caching, and synchronization.",
    },
    {
      question: "When might an external state library be useful?",
      answer:
        "It can help when application-wide state is complex or widely shared and is difficult to manage cleanly with local state, props, or Context alone.",
    },
  ],
} satisfies Record<number, { question: string; answer: string }[]>;

export const ReactPracticeQuestions: Record<
  number,
  { question: string; answer: string }[]
> = Object.fromEntries(
  ReactTopics.map((topic, index) => {
    const day = index + 1;
    return [
      day,
      [
        ...extractPostPracticeQuestions(topic.description),
        ...(additionalQuestions[day as keyof typeof additionalQuestions] ?? []),
      ],
    ];
  }),
) as Record<number, { question: string; answer: string }[]>;
