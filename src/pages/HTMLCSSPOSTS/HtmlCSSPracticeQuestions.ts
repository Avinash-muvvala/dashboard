export type HtmlCSSPracticeQuestion = {
  question: string;
  answer: string;
};

export const HtmlCSSPracticeQuestions: Record<
  number,
  HtmlCSSPracticeQuestion[]
> = {
  1: [
    {
      question: "What is HTML used for?",
      answer:
        "HTML is used to create the structure and content of web pages. Browsers parse HTML and build the DOM from it.",
    },
  ],
  2: [
    {
      question: "What are the purposes of the html, head, and body elements?",
      answer:
        "The html element is the root, head contains metadata and linked resources, and body contains the visible page content.",
    },
  ],
  76: [
    {
      question:
        "What is the difference between localStorage and sessionStorage?",
      answer:
        "localStorage keeps data until it is removed, while sessionStorage keeps data only for the current browser tab session.",
    },
  ],
  81: [
    {
      question: "What is the DOM?",
      answer:
        "The DOM is a tree representation of an HTML document that JavaScript can read and modify.",
    },
  ],
  82: [
    {
      question: "Which methods can select elements from the DOM?",
      answer:
        "Common methods include getElementById, querySelector, querySelectorAll, and getElementsByClassName.",
    },
  ],
  83: [
    {
      question: "How can JavaScript change an element's content?",
      answer:
        "Use textContent for text or innerHTML when inserting trusted HTML markup.",
    },
  ],
  84: [
    {
      question: "How do you attach an event handler in JavaScript?",
      answer:
        "Use addEventListener with the event name and a callback function, for example element.addEventListener('click', handler).",
    },
  ],
  85: [
    {
      question: "What is event bubbling?",
      answer:
        "Event bubbling moves an event from the target element up through its ancestors. Event delegation uses this behavior to handle child events from a parent.",
    },
  ],
  86: [
    {
      question: "How can JavaScript read form values?",
      answer:
        "Read the value property of form controls or use FormData to collect values from a form submission.",
    },
  ],
  87: [
    {
      question: "What is the Fetch API used for?",
      answer:
        "The Fetch API makes HTTP requests and returns a Promise that resolves to a Response object.",
    },
  ],
  88: [
    {
      question: "What is a Promise?",
      answer:
        "A Promise represents the eventual success or failure of an asynchronous operation and can be handled with then and catch.",
    },
  ],
  89: [
    {
      question: "Why use async and await?",
      answer:
        "async and await make Promise-based asynchronous code easier to read and allow errors to be handled with try and catch.",
    },
  ],
  90: [
    {
      question: "What are the main steps in an API integration?",
      answer:
        "Build the request, send it with fetch, check the response, parse the data, update the UI, and handle failures.",
    },
  ],
  91: [
    {
      question: "How should asynchronous JavaScript errors be handled?",
      answer:
        "Use try and catch with async and await, check response.ok for HTTP failures, and show a useful fallback to the user.",
    },
  ],
  92: [
    {
      question: "What is dynamic UI rendering?",
      answer:
        "Dynamic UI rendering means creating or updating DOM content from application state or data instead of hardcoding every result.",
    },
  ],
  93: [
    {
      question: "What is template rendering?",
      answer:
        "Template rendering combines a reusable markup structure with data to produce consistent UI content.",
    },
  ],
  94: [
    {
      question: "How does pagination work?",
      answer:
        "Pagination splits a large collection into pages and uses the current page and page size to calculate which items to display.",
    },
  ],
  95: [
    {
      question: "How can a search or filter UI be implemented?",
      answer:
        "Store the input value, filter the source collection using that value, and render the filtered results.",
    },
  ],
  96: [
    {
      question: "Why are loading states important?",
      answer:
        "Loading states tell users that work is in progress and prevent confusing empty screens or duplicate actions.",
    },
  ],
  97: [
    {
      question: "What is frontend authentication?",
      answer:
        "Frontend authentication manages sign-in state and protected UI, but the server must still validate the user's identity and permissions.",
    },
  ],
  98: [
    {
      question: "What is a token used for?",
      answer:
        "A token represents an authenticated session and is sent with API requests so the server can identify the user.",
    },
  ],
  99: [
    {
      question: "How should frontend code make secure API calls?",
      answer:
        "Use HTTPS, avoid exposing secrets in browser code, send only necessary data, and rely on server-side authorization.",
    },
  ],
  100: [
    {
      question: "How can frontend performance be improved?",
      answer:
        "Reduce unnecessary rendering, optimize images, split large bundles, avoid expensive work on the main thread, and cache suitable data.",
    },
  ],
  101: [
    {
      question: "What should be planned before building a frontend project?",
      answer:
        "Define the user flow, data model, page structure, reusable components, responsive behavior, and error states before implementation.",
    },
  ],
  102: [
    {
      question: "What makes a task form accessible?",
      answer:
        "Use a label for each input, meaningful names, keyboard support, validation messages, and a clearly labelled submit button.",
    },
  ],
  103: [
    {
      question: "How should tasks be rendered from data?",
      answer:
        "Store tasks in an array, map over the array to create UI elements, and use a stable unique key for each task.",
    },
  ],
  104: [
    {
      question: "How can a task be updated or deleted?",
      answer:
        "Identify the task by its unique id, create a new array with the changed or removed item, and render the updated state.",
    },
  ],
  105: [
    {
      question: "How is task completion usually represented?",
      answer:
        "Store a boolean such as completed for each task and toggle it when the user marks the task complete.",
    },
  ],
  106: [
    {
      question: "How can tasks be saved in localStorage?",
      answer:
        "Serialize the task array with JSON.stringify when it changes and restore it with JSON.parse when the application starts.",
    },
  ],
  107: [
    {
      question: "How can tasks be searched and filtered together?",
      answer:
        "Apply the search condition and selected filters to the same source array before rendering the visible tasks.",
    },
  ],
  108: [
    {
      question: "Why are sorting and task statistics useful?",
      answer:
        "Sorting makes tasks easier to scan, while statistics summarize useful information such as total, completed, and remaining tasks.",
    },
  ],
  109: [
    {
      question: "What UI states should a task application handle?",
      answer:
        "Handle loading, empty, success, validation-error, and request-error states so users always understand what is happening.",
    },
  ],
  110: [
    {
      question: "What should be checked during a frontend project review?",
      answer:
        "Review functionality, accessibility, responsive behavior, error handling, performance, code reuse, and maintainability.",
    },
  ],
};
