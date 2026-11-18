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
  38: [
    {
      question: "How can a protected route redirect an unauthenticated user?",
      answer:
        "A route guard can check authentication and render the requested page for signed-in users, or render React Router's `<Navigate>` to redirect others to a login route.",
    },
    {
      question:
        "What does BrowserRouter use to keep the URL and rendered page in sync?",
      answer:
        "BrowserRouter uses the browser's History API to update and respond to URLs while keeping navigation within the single-page application, without a full-page reload.",
    },
  ],
  39: [
    {
      question: "How do route definitions help organize an SPA?",
      answer:
        "Routes map URL paths to specific components, so the app can render the correct view for each page without full reloads.",
    },
    {
      question: "Why is a nested route useful in a dashboard app?",
      answer:
        "Nested routes let you reuse a parent layout while changing only the child content, such as users, settings, and profile pages under one shell.",
    },
  ],
  40: [
    {
      question: "What is a dynamic route in React Router?",
      answer:
        "A dynamic route contains parameters like `/users/:id`, allowing one route to match multiple URLs and render different data depending on the value.",
    },
    {
      question: "How do you read a route parameter?",
      answer:
        "Use the `useParams()` hook to pull values from the current URL, such as `const { id } = useParams()`.",
    },
  ],
  41: [
    {
      question: "Why is `async/await` helpful with API requests in React?",
      answer:
        "It makes asynchronous logic easier to read and reason about while waiting for a response and then updating state.",
    },
    {
      question: "What should happen when a fetch response is not OK?",
      answer:
        "Check `response.ok` and throw an error or set an error state so the UI can show a failure message instead of pretending the request succeeded.",
    },
  ],
  42: [
    {
      question: "When should you choose `fetch` over Axios?",
      answer:
        "Use `fetch` when you want a native browser API with no extra dependency. Choose Axios when you want cleaner request defaults, interceptors, and easier centralized configuration.",
    },
    {
      question: "What are Axios interceptors useful for?",
      answer:
        "They let you attach auth headers globally or handle token refresh and 401 responses in one place before requests or responses reach your components.",
    },
  ],
  43: [
    {
      question:
        "Why do React apps usually show a loading indicator during async work?",
      answer:
        "It tells the user that work is in progress and prevents confusion while waiting for data, form submission, or a redirect.",
    },
    {
      question: "Why is a `finally` block useful in async logic?",
      answer:
        "It guarantees cleanup work like setting `loading` back to false runs whether the request succeeds or fails.",
    },
  ],
  44: [
    {
      question: "How should a React app handle API failures?",
      answer:
        "Capture the error, store it in component state, render a helpful message, and offer a retry action when the situation makes sense.",
    },
    {
      question: "What is the difference between a 401 and a 403 error?",
      answer:
        "401 means the user is not authenticated or the token is invalid; 403 means the user is authenticated but does not have permission to access the resource.",
    },
  ],
  45: [
    {
      question: "What is a controlled form in React?",
      answer:
        "A controlled form stores each input value in state and updates it with `onChange`, so the UI and state stay synchronized.",
    },
    {
      question: "Why call `event.preventDefault()` on form submit?",
      answer:
        "It prevents the browser's default full-page reload and lets the app validate, send data, and update the interface in a controlled way.",
    },
  ],
  46: [
    {
      question: "What is the typical login flow in a React app?",
      answer:
        "A user submits credentials, the app validates them, sends a request to the backend, receives a token or session, and then navigates to a protected page.",
    },
    {
      question: "How do you redirect after a successful login?",
      answer:
        "Use `useNavigate()` from React Router and call `navigate('/dashboard')` or another route after the request succeeds.",
    },
  ],
  47: [
    {
      question: "What is a protected route?",
      answer:
        "A route guard that checks if a user is authenticated before rendering a page; unauthenticated users are redirected to the login page.",
    },
    {
      question:
        "Why does frontend protection not replace server-side authorization?",
      answer:
        "The UI can hide pages, but the backend must still validate tokens and permissions for every API request because users can bypass the frontend.",
    },
  ],
  48: [
    {
      question: "What is an access token used for?",
      answer:
        "An access token is a short-lived credential that proves a user is authenticated and allows the app to request protected backend resources.",
    },
    {
      question: "How do you send a JWT in an API request?",
      answer:
        "Add it to the `Authorization` header as `Bearer <token>`, usually via a shared request helper or an Axios interceptor.",
    },
  ],
  49: [
    {
      question: "Why do apps use refresh tokens?",
      answer:
        "A refresh token lets the app obtain a new access token without asking the user to log in again when the access token expires.",
    },
    {
      question: "What is refresh-token rotation?",
      answer:
        "It means the server issues a new refresh token when one is used and invalidates the old one, reducing the chance of token theft or replay.",
    },
  ],
  50: [
    {
      question: "What is REST API integration in React?",
      answer:
        "It is the process of sending HTTP requests to backend endpoints to fetch, create, update, or delete data and then rendering the results in the UI.",
    },
    {
      question:
        "Why is CORS important when React and Spring Boot run on different ports?",
      answer:
        "The browser blocks cross-origin requests unless the backend explicitly allows the frontend origin, so the server must allow the correct origin for development and production.",
    },
  ],
  51: [
    {
      question: "Why do developers use libraries like React Hook Form?",
      answer:
        "They simplify form state management, validation, and submission while reducing boilerplate code and unnecessary re-renders.",
    },
    {
      question: "What is schema validation?",
      answer:
        "Schema validation defines rules for a form or payload, such as required fields or email format, and checks the entire object before submission.",
    },
  ],
  52: [
    {
      question: "Why is form validation important before a submit call?",
      answer:
        "Validation prevents invalid data from reaching the backend, reduces API errors, and improves the user experience by surfacing issues early.",
    },
    {
      question:
        "What is the difference between client-side and server-side validation?",
      answer:
        "Client-side validation improves feedback and UX, while server-side validation protects the backend and enforces trusted rules that users cannot bypass.",
    },
  ],
  53: [
    {
      question: "What is an Error Boundary in React?",
      answer:
        "An Error Boundary is a component that catches rendering errors in its child tree and shows a fallback UI instead of crashing the entire application.",
    },
    {
      question: "Which methods are commonly used in Error Boundaries?",
      answer:
        "`getDerivedStateFromError()` updates state to render a fallback UI, and `componentDidCatch()` logs the error for debugging.",
    },
  ],
  54: [
    {
      question: "Why is lazy loading useful in a large React app?",
      answer:
        "It defers loading some components until they are needed, which reduces the initial bundle size and improves perceived performance.",
    },
    {
      question:
        "What is the relationship between lazy loading and code splitting?",
      answer:
        "Code splitting divides the bundle into smaller chunks; lazy loading loads those chunks only when a route or component is actually requested.",
    },
  ],
  55: [
    {
      question: "What does React code splitting accomplish?",
      answer:
        "It breaks large bundles into smaller chunks so the browser loads only what is needed when a user navigates to a part of the app.",
    },
    {
      question: "How does `Suspense` help with lazy-loaded components?",
      answer:
        "`Suspense` displays a fallback UI while the lazy-loaded module is being fetched and resolved.",
    },
  ],
  56: [
    {
      question: "How can `React.memo` improve performance?",
      answer:
        "It memoizes a component so React skips re-rendering when its props are unchanged, avoiding unnecessary work in stable UI trees.",
    },
    {
      question: "When should you be careful with memoization?",
      answer:
        "Memoization adds complexity and can hurt performance if overused on cheap components or values that change frequently; use it where the cost of render or recalculation is genuinely high.",
    },
  ],
  57: [
    {
      question: "What can you inspect in the React DevTools Components tab?",
      answer:
        "It shows the React component tree and lets you inspect component props, state, hooks, context, and relationships to parent and child components.",
    },
    {
      question:
        "How does the React DevTools Profiler help diagnose performance issues?",
      answer:
        "It records component renders and their durations, helping identify components that render often or take a long time to update.",
    },
    {
      question:
        "How is React DevTools different from the browser's Elements panel?",
      answer:
        "React DevTools inspects the React component tree and its props and state, while the Elements panel inspects the rendered DOM and CSS.",
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
