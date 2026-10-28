import { useMemo, useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Alert,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CodeIcon from "@mui/icons-material/Code";
import HistoryIcon from "@mui/icons-material/History";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

// Monaco Editor
import Editor from "@monaco-editor/react";
import { javaSolutions } from "./JavaQuestions/JavaSolutions";
import {
  javaQuestions,
  type QuestionItem,
} from "./JavaQuestions/JavaQuestions";
import { javaStreamsQuestions } from "../pages/JavaQuestions/javaStreamsPractice";
import { pythonQuestions } from "../pages/Python/PythonQuestions";
import { useNavigate } from "react-router-dom";
import { javaScriptQuestions } from "../pages/Java Scrpit/JavaScrpitQuestions";
import { auth, db } from "./SERVER/firebaseConfig";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import type { DayType } from "./Constants/DayType";

type LanguageType = "Java" | "Python" | "JavaScript";
type PracticeDay = DayType | "Java Streams";

const getExpectedOutput = (question: {
  inputs: string;
  expectedOutput?: string;
}) => {
  if (question.expectedOutput) return question.expectedOutput;

  const arrowIndex = question.inputs.lastIndexOf("→");
  if (arrowIndex >= 0) return question.inputs.slice(arrowIndex + 1).trim();

  return "Return the correct result for the supplied sample input.";
};
const days: DayType[] = [
  "Day 1",
  "Day 2",
  "Day 3",
  "Day 4",
  "Day 5",
  "Day 6",
  "Day 7",
  "Day 8",
  "Day 9",
  "Day 10",
  "Day 11",
  "Day 12",
  "Day 13",
  "Day 14",
  "Day 15",
  "Day 16",
  "Day 17",
  "Day 18",
  "Day 19",
  "Day 20",
  "Day 21",
  "Day 22",
  "Day 23",
  "Day 24",
  "Day 25",
  "Day 26",
  "Day 27",
  "Day 28",
  "Day 29",
  "Day 30",
  "Day 31",
  "Day 32",
  "Day 33",
  "Day 34",
  "Day 35",
  "Day 36",
  "Day 37",
  "Day 38",
  "Day 39",
  "Day 40",
  "Day 41",
  "Day 42",
  "Day 43",
  "Day 44",
  "Day 45",
];
const languages: LanguageType[] = ["Java", "Python", "JavaScript"];

type DifficultyType = "Easy" | "Medium" | "Hard";

const difficultyDays: Record<DifficultyType, DayType[]> = {
  Easy: [
    "Day 1",
    "Day 2",
    "Day 3",
    "Day 4",
    "Day 5",
    "Day 6",
    "Day 7",
    "Day 8",
    "Day 9",
    "Day 10",
    "Day 11",
    "Day 12",
    "Day 13",
    "Day 14",
    "Day 15",
  ],
  Medium: [
    "Day 16",
    "Day 17",
    "Day 18",
    "Day 19",
    "Day 20",
    "Day 21",
    "Day 22",
    "Day 23",
    "Day 24",
    "Day 25",
    "Day 26",
    "Day 27",
    "Day 28",
    "Day 29",
    "Day 30",
  ],
  Hard: [
    "Day 31",
    "Day 32",
    "Day 33",
    "Day 34",
    "Day 35",
    "Day 36",
    "Day 37",
    "Day 38",
    "Day 39",
    "Day 40",
    "Day 41",
    "Day 42",
    "Day 43",
    "Day 44",
    "Day 45",
  ],
};

const difficultyColors: Record<DifficultyType, string> = {
  Easy: "#2e7d32",
  Medium: "#e65100",
  Hard: "#c62828",
};

const createLanguageImage = (label: string, backgroundColor: string) => {
  const svg = `
  <svg width="500" height="200" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="200" rx="24" ry="24" fill="${backgroundColor}" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Inter, sans-serif" font-size="36" font-weight="700">${label}</text>
    <text x="50%" y="72%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="Inter, sans-serif" font-size="18" opacity="0.85">Daily coding challenge</text>
  </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const languageImages: Record<LanguageType, string> = {
  Java: createLanguageImage("Java", "#007396"),
  Python: createLanguageImage("Python", "#3776AB"),
  JavaScript: createLanguageImage("JavaScript", "#F7DF1E"),
};

const languageColors: Record<LanguageType, string> = {
  Java: "#007396",
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
};

const languageTemplates: Record<LanguageType, string> = {
  Java: `public class Main  {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello World");
    }
}`,
  Python: `# Write your code here
print("Hello World")`,
  JavaScript: `// Write your code here
console.log("Hello World");`,
};

const languageMonacoIds: Record<LanguageType, string> = {
  Java: "java",
  Python: "python",
  JavaScript: "javascript",
};

type PyodideRuntime = {
  runPythonAsync(code: string): Promise<unknown>;
};

type PyodideWindow = Window & {
  loadPyodide?: (options: { indexURL: string }) => Promise<PyodideRuntime>;
};

let pyodideLoadPromise: Promise<PyodideRuntime> | null = null;

const loadPyodideRuntime = (): Promise<PyodideRuntime> => {
  if (pyodideLoadPromise) return pyodideLoadPromise;

  pyodideLoadPromise = new Promise<void>((resolve, reject) => {
    const pyodideWindow = window as PyodideWindow;
    if (pyodideWindow.loadPyodide) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Could not load the Python engine."));
    document.head.appendChild(script);
  })
    .then(() => {
      const loadPyodide = (window as PyodideWindow).loadPyodide;
      if (!loadPyodide)
        throw new Error("The Python engine did not initialize.");
      return loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/",
      });
    })
    .catch((error: unknown) => {
      pyodideLoadPromise = null;
      throw error;
    });

  return pyodideLoadPromise;
};

interface Submission {
  language: LanguageType;
  day: PracticeDay;
  taskIndex: number;
  code: string;
  timestamp: string;
  executionOutput: string;
}

interface CompletedTask {
  language: LanguageType;
  day: PracticeDay;
  taskIndex: number;
  submissions: Submission[];
}

type SubmissionStatus = {
  severity: "info" | "success" | "error";
  message: string;
};

type Judge0Result = {
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  status?: {
    id?: number;
    description?: string;
  } | null;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const questionsByLanguage: Record<
  LanguageType,
  Record<DayType, QuestionItem[] | string[]>
> = {
  Java: javaQuestions,
  Python: pythonQuestions,
  JavaScript: javaScriptQuestions,
};

const dashboardStorageKey = "codeMasteryDashboardState";
const completedTasksStorageKey = "codeMasteryCompletedTasks";

type DashboardStorage = {
  selectedLanguage?: LanguageType;
  selectedDay?: DayType;
  selectedDifficulty?: DifficultyType | null;
  isStreamsMode?: boolean;
  drafts?: Record<string, string>;
};

type CompilerSession = {
  language: LanguageType;
  day: PracticeDay;
  taskIndex: number;
  code: string;
};

const readDashboardStorage = (): DashboardStorage => {
  if (typeof window === "undefined") return {};

  try {
    const parsed = JSON.parse(
      localStorage.getItem(dashboardStorageKey) || "{}",
    );
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const readCachedTasks = (): CompletedTask[] | null => {
  if (typeof window === "undefined") return null;

  try {
    const saved = localStorage.getItem(completedTasksStorageKey);
    return saved ? (JSON.parse(saved) as CompletedTask[]) : null;
  } catch {
    return null;
  }
};

let cachedTasks: CompletedTask[] | null = readCachedTasks();

const readCompilerSession = (): CompilerSession | null => {
  if (typeof window === "undefined") return null;

  try {
    const saved = sessionStorage.getItem("codeMasteryCompilerSession");
    return saved ? (JSON.parse(saved) as CompilerSession) : null;
  } catch {
    return null;
  }
};

const Dashboard = () => {
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
  const [hasSelectedDay, setHasSelectedDay] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(() => {
    const session = readCompilerSession();
    const saved = readDashboardStorage().selectedLanguage;
    return session && languages.includes(session.language)
      ? session.language
      : saved && languages.includes(saved)
        ? saved
        : "Java";
  });
  const [selectedDay, setSelectedDay] = useState<DayType>(() => {
    const session = readCompilerSession();
    const saved = readDashboardStorage().selectedDay;
    return session &&
      session.day !== "Java Streams" &&
      days.includes(session.day)
      ? session.day
      : saved && days.includes(saved)
        ? saved
        : "Day 1";
  });
  // const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>(() => {
  //   if (typeof window === "undefined") return [];
  //   const saved = localStorage.getItem("codeSubmissions");
  //   return saved ? JSON.parse(saved) : [];
  // });
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<DifficultyType | null>(
      () => readDashboardStorage().selectedDifficulty ?? null,
    );
  const [isRevisionMode, setIsRevisionMode] = useState(false);
  const [isStreamsMode, setIsStreamsMode] = useState(
    () =>
      readCompilerSession()?.day === "Java Streams" ||
      readDashboardStorage().isStreamsMode === true,
  );

  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>(
    cachedTasks ?? [], // use cache if available
  );
  const [loadingTasks, setLoadingTasks] = useState(cachedTasks === null);
  const [progressLoadError, setProgressLoadError] = useState(false);

  const [submissionCode, setSubmissionCode] = useState(
    () => readCompilerSession()?.code || "",
  );
  const [submissionOutput, setSubmissionOutput] = useState("");
  const [openSubmissionDialog, setOpenSubmissionDialog] = useState(
    () => readCompilerSession() !== null,
  );
  const [openHistoryDialog, setOpenHistoryDialog] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(
    () => {
      const session = readCompilerSession();
      return session?.taskIndex ?? null;
    },
  );
  const [currentQuestion, setCurrentQuestion] = useState<QuestionItem | string>(
    () => {
      const session = readCompilerSession();
      if (!session) return "";
      return session.day === "Java Streams"
        ? (javaStreamsQuestions[session.taskIndex] ?? "")
        : (questionsByLanguage[session.language][session.day][
            session.taskIndex
          ] ?? "");
    },
  );
  const [historySubmissions, setHistorySubmissions] = useState<Submission[]>(
    [],
  );
  const [tabValue, setTabValue] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus | null>(null);
  const currentPracticeDay: PracticeDay = isStreamsMode
    ? "Java Streams"
    : selectedDay;

  useEffect(() => {
    if (!openSubmissionDialog || currentTaskIndex === null) return;

    try {
      sessionStorage.setItem(
        "codeMasteryCompilerSession",
        JSON.stringify({
          language: selectedLanguage,
          day: currentPracticeDay,
          taskIndex: currentTaskIndex,
          code: submissionCode,
        } satisfies CompilerSession),
      );
    } catch {
      // Ignore storage errors so the compiler remains usable.
    }
  }, [
    openSubmissionDialog,
    currentTaskIndex,
    selectedLanguage,
    currentPracticeDay,
    submissionCode,
  ]);

  useEffect(() => {
    const saved = readDashboardStorage();
    const draftKey =
      currentTaskIndex === null
        ? null
        : `${selectedLanguage}_${currentPracticeDay}_${currentTaskIndex}`;

    try {
      localStorage.setItem(
        dashboardStorageKey,
        JSON.stringify({
          ...saved,
          selectedLanguage,
          selectedDay,
          selectedDifficulty,
          isStreamsMode,
          drafts: {
            ...saved.drafts,
            ...(draftKey ? { [draftKey]: submissionCode } : {}),
          },
        } satisfies DashboardStorage),
      );
    } catch {
      // Ignore storage errors so coding remains usable in restricted browsers.
    }
  }, [
    selectedLanguage,
    selectedDay,
    currentPracticeDay,
    selectedDifficulty,
    isStreamsMode,
    currentTaskIndex,
    submissionCode,
  ]);

  // Pyodide for Python execution
  const pyodideRef = useRef<PyodideRuntime | null>(null);

  // Load Pyodide for Python execution
  useEffect(() => {
    if (selectedLanguage === "Python" && !pyodideRef.current) {
      const loadPyodide = async () => {
        try {
          const pyodide = await loadPyodideRuntime();
          pyodideRef.current = pyodide;
        } catch (error) {
          console.error("Failed to load Pyodide:", error);
        }
      };
      loadPyodide();
    }
  }, [selectedLanguage]);

  // Save to localStorage
  // useEffect(() => {
  //   localStorage.setItem("codeSubmissions", JSON.stringify(completedTasks));
  // }, [completedTasks]);

  // useEffect(() => {
  //   const loadSubmissions = async () => {
  //     if (!auth.currentUser) {
  //       setLoadingTasks(false);
  //       return;
  //     }

  //     const q = query(
  //       collection(db, "users", auth.currentUser!.uid, "submissions"),
  //       orderBy("createdAt", "asc"),
  //     );
  //     const snap = await getDocs(q);
  //     const taskMap = new Map<string, CompletedTask>();
  //     snap.docs.forEach((docSnap) => {
  //       const sub = docSnap.data() as Submission & { createdAt: unknown };
  //       const key = `${sub.language}_${sub.day}_${sub.taskIndex}`;
  //       if (!taskMap.has(key)) {
  //         taskMap.set(key, {
  //           language: sub.language,
  //           day: sub.day,
  //           taskIndex: sub.taskIndex,
  //           submissions: [],
  //         });
  //       }
  //       taskMap.get(key)!.submissions.push(sub);
  //     });
  //     setCompletedTasks(Array.from(taskMap.values()));
  //     setLoadingTasks(false);
  //   };

  //   loadSubmissions();
  // }, []);

  useEffect(() => {
    const loadSubmissions = async () => {
      if (!auth.currentUser || cachedTasks !== null) {
        setLoadingTasks(false);
        return;
      }

      try {
        const q = query(
          collection(db, "users", auth.currentUser.uid, "submissions"),
          orderBy("createdAt", "asc"),
        );
        const snap = await getDocs(q);
        const taskMap = new Map<string, CompletedTask>();
        snap.docs.forEach((docSnap) => {
          const sub = docSnap.data() as Submission & { createdAt: unknown };
          const key = `${sub.language}_${sub.day}_${sub.taskIndex}`;
          if (!taskMap.has(key)) {
            taskMap.set(key, {
              language: sub.language,
              day: sub.day,
              taskIndex: sub.taskIndex,
              submissions: [],
            });
          }
          taskMap.get(key)!.submissions.push(sub);
        });

        const result = Array.from(taskMap.values());
        cachedTasks = result;
        setCompletedTasks(result);
      } catch (error) {
        console.error("Failed to load submission progress:", error);
        setProgressLoadError(true);
      } finally {
        setLoadingTasks(false);
      }
    };

    loadSubmissions();
  }, []);

  const tasks = useMemo(
    () =>
      isRevisionMode && selectedLanguage === "Java"
        ? Object.values(javaQuestions).flat()
        : isStreamsMode
          ? javaStreamsQuestions
          : questionsByLanguage[selectedLanguage][selectedDay],
    [isRevisionMode, isStreamsMode, selectedLanguage, selectedDay],
  );

  const isTaskCompleted = (taskIndex: number) => {
    return completedTasks.some(
      (task) =>
        task.language === selectedLanguage &&
        task.day === currentPracticeDay &&
        task.taskIndex === taskIndex &&
        task.submissions.length > 0,
    );
  };

  const getRevisionSubmission = (question: QuestionItem) => {
    const source = (
      Object.entries(javaQuestions) as [DayType, QuestionItem[]][]
    ).find(([, questions]) => questions.includes(question));

    if (!source) return null;

    const [day, questions] = source;
    const taskIndex = questions.indexOf(question);
    return (
      completedTasks
        .find(
          (task) =>
            task.language === "Java" &&
            task.day === day &&
            task.taskIndex === taskIndex,
        )
        ?.submissions.at(-1) ?? null
    );
  };

  const getTotalCompletedCount = (language: LanguageType) => {
    return completedTasks.filter((task) => task.language === language).length;
    // This is fine as-is since each unique day+taskIndex combo = 1 entry after fix
  };

  const closeCompiler = () => {
    if (isSubmitting) return;
    try {
      sessionStorage.removeItem("codeMasteryCompilerSession");
    } catch {
      // Ignore storage errors while closing the compiler.
    }
    setOpenSubmissionDialog(false);
    setCurrentTaskIndex(null);
    setSubmissionStatus(null);
  };

  const openCompiler = (taskIndex: number) => {
    setCurrentTaskIndex(taskIndex);

    // 1. Get the current task
    const currentTask = tasks[taskIndex];

    // 2. Pass the entire object or string to your state
    setCurrentQuestion(currentTask);

    setSubmissionCode(languageTemplates[selectedLanguage]);
    setSubmissionOutput("");
    setSubmissionStatus(null);
    setTabValue(0);
    setOpenSubmissionDialog(true);
  };

  const executeCode = async () => {
    setIsExecuting(true);
    let output = "";

    try {
      if (selectedLanguage === "JavaScript") {
        // Capture console.log output
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(
            args
              .map((arg) =>
                typeof arg === "object"
                  ? JSON.stringify(arg, null, 2)
                  : String(arg),
              )
              .join(" "),
          );
        };

        try {
          const result = new Function(submissionCode)();
          if (result !== undefined) logs.push(String(result));
        } finally {
          console.log = originalLog;
        }
        output = logs.join("\n") || "Code ran successfully (no output).";
      } else if (selectedLanguage === "Python") {
        // Check if Pyodide is still loading
        if (!pyodideRef.current) {
          output =
            "⏳ Python engine is still loading... Please wait 10 seconds and try again.";
        } else {
          const pyodide = pyodideRef.current;

          // Redirect stdout/stderr to capture print() output
          await pyodide.runPythonAsync(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
    `);

          try {
            await pyodide.runPythonAsync(submissionCode);

            const stdout = await pyodide.runPythonAsync(
              `sys.stdout.getvalue()`,
            );
            const stderr = await pyodide.runPythonAsync(
              `sys.stderr.getvalue()`,
            );

            output =
              String(stdout).trim() ||
              String(stderr).trim() ||
              "✅ Code ran successfully (no output)";
          } catch (err) {
            const stderr = await pyodide.runPythonAsync(
              `sys.stderr.getvalue()`,
            );
            output =
              String(stderr).trim() ||
              `❌ Error: ${err instanceof Error ? err.message : String(err)}`;
          } finally {
            // Reset stdout/stderr back to normal
            await pyodide.runPythonAsync(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
      `);
          }
        }
      } else if (selectedLanguage === "Java") {
        try {
          const encodeBase64 = (str: string) =>
            btoa(unescape(encodeURIComponent(str)));

          const decodeBase64 = (str: string) =>
            decodeURIComponent(escape(atob(str)));

          // Submit code
          const submitRes = await fetch(
            "https://ce.judge0.com/submissions?base64_encoded=true&wait=false",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                source_code: encodeBase64(submissionCode),
                language_id: 62, // Java
                stdin: "",
              }),
            },
          );

          if (!submitRes.ok) {
            throw new Error(`Judge0 submission failed (${submitRes.status}).`);
          }
          const submission = await submitRes.json();
          const token = submission.token as string | undefined;
          if (!token) {
            throw new Error(
              submission.message || "Judge0 did not return a submission token.",
            );
          }

          // Poll immediately, then back off to avoid adding display latency or
          // sending unnecessary requests while Judge0 is still compiling.
          let result = null;
          const pollingStartedAt = Date.now();

          while (Date.now() - pollingStartedAt < 30_000) {
            const res = await fetch(
              `https://ce.judge0.com/submissions/${token}?base64_encoded=true`,
            );

            if (!res.ok) {
              throw new Error(`Judge0 result request failed (${res.status}).`);
            }
            result = await res.json();

            if (result.status?.id >= 3) break;

            const elapsed = Date.now() - pollingStartedAt;
            const pollDelay = elapsed < 3_000 ? 500 : 1_000;
            await new Promise((resolve) => setTimeout(resolve, pollDelay));
          }

          if (result?.stdout) {
            output = decodeBase64(result.stdout);
          } else if (result?.stderr) {
            output = "❌ Error:\n" + decodeBase64(result.stderr);
          } else if (result?.compile_output) {
            output =
              "❌ Compile Error:\n" + decodeBase64(result.compile_output);
          } else {
            if (result?.status?.description === "Accepted") {
              output = "Code ran successfully (no output).";
            } else if (result?.status?.id >= 3) {
              output = `❌ Execution finished with status: ${result.status.description}.`;
            } else {
              output =
                "⏳ Judge0 is still processing this submission after 30 seconds. Wait before starting another run.";
            }
          }
        } catch (err) {
          output = `❌ ${err instanceof Error ? err.message : "Failed to connect to Judge0 API."}`;
        }
      }
    } catch (error: unknown) {
      output = `❌ Error: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }

    setSubmissionOutput(output);
    setIsExecuting(false);
    // setTabValue(2); // Switch to output tab
  };

  const submitCode = async () => {
    if (isSubmitting) return;
    if (!submissionCode.trim()) {
      setSubmissionStatus({
        severity: "error",
        message: "Please write some code.",
      });
      return;
    }

    const shouldRunJava = isJava && !submissionOutput.trim();
    setIsSubmitting(true);
    setSubmissionStatus({
      severity: "info",
      message: shouldRunJava ? "Running Java code..." : "Saving submission...",
    });

    try {
      let finalOutput = submissionOutput;
      if (shouldRunJava) {
        finalOutput = await runJavaOnJudge0(submissionCode);
        setSubmissionOutput(finalOutput);
      }

      if (!finalOutput.trim()) {
        throw new Error("Run your code first to generate output.");
      }
      if (isJava && finalOutput.startsWith("❌")) {
        throw new Error(
          "Your code has errors. Fix them and run again before submitting.",
        );
      }
      if (currentTaskIndex === null) {
        throw new Error("No challenge is selected for this submission.");
      }
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("Sign in before submitting your code.");

      const newSubmission: Submission = {
        language: selectedLanguage,
        day: currentPracticeDay,
        taskIndex: currentTaskIndex,
        code: submissionCode,
        timestamp: new Date().toLocaleString(),
        executionOutput: finalOutput,
      };

      setSubmissionStatus({
        severity: "info",
        message: "Saving submission...",
      });
      await addDoc(collection(db, "users", userId, "submissions"), {
        ...newSubmission,
        createdAt: serverTimestamp(),
      });

      setCompletedTasks((prev) => {
        const existing = prev.find(
          (task) =>
            task.language === selectedLanguage &&
            task.day === currentPracticeDay &&
            task.taskIndex === currentTaskIndex,
        );

        const updated = existing
          ? prev.map((task) =>
              task === existing
                ? { ...task, submissions: [...task.submissions, newSubmission] }
                : task,
            )
          : [
              ...prev,
              {
                language: selectedLanguage,
                day: currentPracticeDay,
                taskIndex: currentTaskIndex,
                submissions: [newSubmission],
              },
            ];

        cachedTasks = updated;
        return updated;
      });

      setSubmissionStatus({
        severity: "success",
        message: "Code submitted successfully.",
      });
    } catch (error) {
      setSubmissionStatus({
        severity: "error",
        message: error instanceof Error ? error.message : "Submission failed.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const viewSubmissionHistory = (taskIndex: number) => {
    const task = completedTasks.find(
      (t) =>
        t.language === selectedLanguage &&
        t.day === currentPracticeDay &&
        t.taskIndex === taskIndex,
    );
    setHistorySubmissions(task?.submissions || []);
    setOpenHistoryDialog(true);
  };

  const EXPLANATION_VIDEOS: Record<string, string[]> = {
    java: [
      "https://youtu.be/KLlXCFG5TnA",
      "https://youtu.be/1pkOgXD63yU",
      "https://youtu.be/3OamzN90kPg",
      "https://youtu.be/bNvIQI2wAjk",
      "https://youtu.be/5WZl3MMT0Eg",
      "https://youtu.be/lXVy6YWFcRM",
      "https://youtu.be/nIVW4P8b1VA",
      "https://youtu.be/U8XENwh8Oy8",
      "https://youtu.be/jzZsG8n2R9A",
      "https://youtu.be/UuiTKBwPgAo",
      "https://youtu.be/gVUrDV4tZfY",
      "https://youtu.be/5Km3utixwZs",
      "https://youtu.be/RyBM56RIWrM",
      "https://youtu.be/WnPLSRLSANE",
      "https://youtu.be/UcoN6UjAI64",
      "https://youtu.be/Y0lT9Fck7qI",
      "https://youtu.be/H9bfqozjoqs",
      "https://youtu.be/cjWnW0hdF1Y",
      "https://youtu.be/Ua0GhsJSlWM",
      "https://youtu.be/Sx9NNgInc3A",
      "https://youtu.be/GBKI9VSKdGg",
      "https://youtu.be/73r3KWiEvyk",
      "https://youtu.be/rWAJCfYYOvM",
      "https://youtu.be/6aEyTjOwlJU",
      "https://youtu.be/IlEsdxuD4lY",
      "https://youtu.be/Yan0cv2cLy8",
      "https://youtu.be/mQeF6bN8hMk",
      "https://youtu.be/EgI5nU9etnU",
      "https://youtu.be/s-VkcjHqkGI",
      "https://youtu.be/pV2kpPD66nE",
      "https://youtu.be/P6RZZMu_maU",
      "https://youtu.be/6kTZYvNNyps",
      "https://youtu.be/bXsUuownnoQ",
      "https://youtu.be/8f1XPm4WOUc",
      "https://youtu.be/A8NUOmlwOlM",
      "https://youtu.be/44H3cEC2fFM",
      "https://youtu.be/nONCGxWoUfM",
      "https://youtu.be/PaJxqZVPhbg",
      "https://youtu.be/FdzJmTCVyJU",
      "https://youtu.be/G0_I-ZF0S38",
      "https://youtu.be/gBTe7lFR3vc",
      "https://youtu.be/XIdigk956u0",
      "https://youtu.be/q5a5OiGbT6Q",
      "https://youtu.be/XVuQxVej6y8",
      "https://youtu.be/S5bfdUTrKLM",
      "https://youtu.be/T41rL0L3Pnw",
      "https://youtu.be/BJnMZNwUk1M",
      "https://youtu.be/fMSJSS7eO1w",
      "https://youtu.be/pfiQ_PS1g8E",
      "https://youtu.be/wiGpQwVHdE0",
      "https://youtu.be/gqXU1UyA8pk",
      "https://youtu.be/jSto0O4AJbM",
      "https://youtu.be/9UtInBqnCgA",
      "https://youtu.be/vzdNOK2oB2E",
      "https://youtu.be/WTzjTskDFMg",
      "https://youtu.be/jJXJ16kPFWg",
      "https://youtu.be/XYQecbcd6_c",
      "https://youtu.be/4RACzI5-du8",
      "https://youtu.be/B1k_sxOSgv8",
      "https://youtu.be/hTM3phVI6YQ",
      "https://youtu.be/vRbbcKXCxOw",
      "https://youtu.be/OnSn2XEQ4MY",
      "https://youtu.be/Hr5cWUld4vU",
      "https://youtu.be/6ZnyEApgFYg",
      "https://youtu.be/u4JAi2JJhI8",
      "https://youtu.be/E36O5SWp-LE",
      "https://youtu.be/ihj4IQGZ2zc",
      "https://youtu.be/s6ATEkipzow",
      "https://youtu.be/5LUXSvjmGCw",
      "https://youtu.be/gs2LMfuOR9k",
      "https://youtu.be/oobqoCJlHA0",
      "https://youtu.be/BTf05gs_8iU",
      "https://youtu.be/asbcE9mZz_U",
      "https://youtu.be/q5a5OiGbT6Q",
      "https://youtu.be/YPTqKIgVk-k",
      "https://youtu.be/itmhHWaHupI",
    ],
    python: [
      "https://youtu.be/xxx",
      "https://youtu.be/yyy",
      // ... your python videos
    ],
    javascript: [
      "https://youtu.be/aaa",
      "https://youtu.be/bbb",
      // ... your javascript videos
    ],
  };

  // 2. The function — takes the task index, opens the matching video
  const youtubeExplain = (
    e: React.MouseEvent<HTMLButtonElement>,
    taskIndex: number,
  ) => {
    e.preventDefault();
    const videos = EXPLANATION_VIDEOS[selectedLanguage.toLowerCase()];

    if (!videos) {
      console.warn(
        `No explanation videos found for language: ${selectedLanguage}`,
      );
      return;
    }

    const url = videos[taskIndex];
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      console.warn(`No video for ${selectedLanguage} task index: ${taskIndex}`);
    }
  };

  // solutions

  const [openSolutionDialog, setOpenSolutionDialog] = useState(false);
  const [currentSolution, setCurrentSolution] = useState<SolutionData | null>(
    null,
  );

  interface Approach {
    name: string;
    timeComplexity: string;
    spaceComplexity: string;
    explanation: string;
    code: string;
  }

  interface SolutionData {
    problem: string;
    link: string;
    approaches: Approach[]; // This is the key change
  }

  const openSolution = (taskIndex: number) => {
    if (selectedLanguage === "Java") {
      const question = tasks[taskIndex];
      const sol = Object.values(javaSolutions)
        .flat()
        .find(
          (solution) =>
            typeof question === "object" &&
            solution.problem === question.question,
        );
      setCurrentSolution(sol || null);
    } else {
      setCurrentSolution(null);
    }
    setCurrentQuestion(tasks[taskIndex]);
    setCurrentTaskIndex(taskIndex);
    setOpenSolutionDialog(true);
  };

  const navigate = useNavigate();

  const compilerIframeRef = useRef<HTMLIFrameElement | null>(null);
  const isJava = selectedLanguage === "Java";

  useEffect(() => {
    if (!openSubmissionDialog || selectedLanguage !== "Java") return;

    const handleMessage = (e: MessageEvent) => {
      if (!e.origin.includes("onecompiler.com")) return;

      let data: unknown = e.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data) as unknown;
        } catch {
          return;
        }
      }
      if (!isRecord(data)) return;

      console.log("OneCompiler message:", data); // remove once it works

      const files = Array.isArray(data.files) ? data.files : [];
      const firstFile = files[0];
      const fileContent = isRecord(firstFile) ? firstFile.content : undefined;
      const content = typeof fileContent === "string" ? fileContent : data.code;
      if (typeof content === "string") setSubmissionCode(content);

      const resultData = isRecord(data.result)
        ? data.result
        : isRecord(data.output)
          ? data.output
          : data;
      const stdout =
        typeof data.output === "string"
          ? data.output
          : (resultData.stdout ?? resultData.output);
      const stderr =
        resultData.stderr ?? resultData.exception ?? resultData.compile_output;

      if (stderr && String(stderr).trim()) {
        setSubmissionOutput("❌ Error:\n" + String(stderr).trim());
      } else if (typeof stdout === "string" && stdout.length > 0) {
        setSubmissionOutput(stdout);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [openSubmissionDialog, selectedLanguage]);

  const runJavaOnJudge0 = async (code: string): Promise<string> => {
    const enc = (s: string) => btoa(unescape(encodeURIComponent(s)));
    const dec = (s: string) => decodeURIComponent(escape(atob(s)));
    try {
      const res = await fetch(
        "https://ce.judge0.com/submissions?base64_encoded=true&wait=false",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source_code: enc(code),
            language_id: 62,
            stdin: "",
          }),
        },
      );
      if (!res.ok) throw new Error(`Judge0 failed (${res.status}).`);
      const submission = (await res.json()) as { token?: unknown };
      if (typeof submission.token !== "string") {
        throw new Error("Judge0 did not return a submission token.");
      }
      const token = submission.token;

      const startedAt = Date.now();
      let result: Judge0Result | null = null;
      while (Date.now() - startedAt < 30_000) {
        const r = await fetch(
          `https://ce.judge0.com/submissions/${token}?base64_encoded=true`,
        );
        if (!r.ok)
          throw new Error(`Judge0 result request failed (${r.status}).`);
        result = (await r.json()) as Judge0Result;
        if ((result.status?.id ?? 0) >= 3) break;
        await new Promise((resolve) => setTimeout(resolve, 700));
      }

      if (result?.stdout) return dec(result.stdout);
      if (result?.stderr) return "❌ Error:\n" + dec(result.stderr);
      if (result?.compile_output)
        return "❌ Compile Error:\n" + dec(result.compile_output);
      return "Code ran successfully (no output).";
    } catch (err) {
      return `❌ ${err instanceof Error ? err.message : "Judge0 error"}`;
    }
  };

  const handleCompilerLoad = () => {
    compilerIframeRef.current?.contentWindow?.postMessage(
      {
        eventType: "populateCode",
        language: "java",
        files: [{ name: "Main.java", content: submissionCode }],
      },
      "*",
    );
  };

  if (loadingTasks) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack>
          <Typography variant="h6">Loading your progress...</Typography>
          <LinearProgress sx={{ width: 200 }} />
        </Stack>
      </Box>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        background: "linear-gradient(180deg, #e8f3ff 0%, #ffffff 75%)",
      }}
    >
      <Box
        sx={{
          py: { xs: 3, md: 4 },
          px: { xs: 1.5, md: 0 },
          minHeight: "100vh",
        }}
      >
        <Stack spacing={3}>
          {progressLoadError && (
            <Alert severity="warning">
              Could not load saved progress. You can still continue practicing.
            </Alert>
          )}

          {/* Header */}
          {/* <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
               Code Mastery Challenge
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Learn programming languages with daily challenges
            </Typography>
          </Box> */}

          <Box
            sx={{
              display: "flex",
              flexWrap: { xs: "wrap", sm: "nowrap" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: { xs: 1, sm: 0 },
              mb: 1,
            }}
          >
            <Box sx={{ flex: 1, display: { xs: "none", sm: "block" } }} />

            <Box sx={{ textAlign: "center", flex: 1, minWidth: 0 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 0.5,
                  fontSize: { xs: "1.45rem", sm: "1.8rem" },
                }}
              >
                Code Mastery Challenge
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Learn programming languages with daily challenges
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                flex: 1,
                justifyContent: "flex-end",
                minWidth: { xs: "auto", sm: 0 },
              }}
            >
              <Tooltip title="Profile">
                <IconButton onClick={() => navigate("/profile")}>
                  <Avatar
                    sx={{
                      width: 34,
                      height: 34,
                      bgcolor: "#1565c0",
                      fontSize: 13,
                    }}
                  >
                    {(auth.currentUser?.displayName || "U")[0].toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton
                  onClick={() => signOut(auth).then(() => navigate("/auth"))}
                >
                  <LogoutIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          {/* Language Selection Cards */}
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 1.5, fontSize: "1rem" }}
            >
              Select Your Language
            </Typography>

            <Grid container spacing={1.5}>
              {languages.map((language) => (
                <Grid key={language} size={{ xs: 6, sm: 4, md: 3 }}>
                  <Card
                    onClick={() => {
                      setSelectedLanguage(language);
                      setSelectedDay("Day 1");
                      setSelectedDifficulty(null);
                      setHasSelectedLanguage(true);
                      setHasSelectedDay(false);
                      setIsRevisionMode(false);
                      setIsStreamsMode(false);
                    }}
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.35s ease",
                      transform:
                        selectedLanguage === language
                          ? "scale(1.03)"
                          : "scale(1)",
                      border:
                        selectedLanguage === language
                          ? `2px solid ${languageColors[language]}`
                          : "1px solid rgba(15, 23, 42, 0.12)",
                      boxShadow:
                        selectedLanguage === language
                          ? `0 16px 40px ${languageColors[language]}22`
                          : "0 10px 30px rgba(15, 23, 42, 0.06)",
                      overflow: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="76"
                      image={languageImages[language]}
                      alt={language}
                    />
                    <CardContent sx={{ p: "10px 12px !important" }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, mb: 0.5 }}
                      >
                        {language}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={
                            getTotalCompletedCount(language) > 0
                              ? Math.round(
                                  (getTotalCompletedCount(language) / 45) * 100,
                                )
                              : 0
                          }
                          sx={{ flex: 1, height: 6, borderRadius: 3 }}
                        />
                        <Typography variant="body2" sx={{ minWidth: "40px" }}>
                          {getTotalCompletedCount(language)}/15
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}

              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <Card
                  onClick={() => navigate("/learning")}
                  sx={{
                    cursor: "pointer",
                    height: "100%",
                    transition: "all 0.35s ease",
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="76"
                    image={createLanguageImage("Learning", "#5e35b1")}
                    alt="Learning"
                  />
                  <CardContent sx={{ p: "10px 12px !important" }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, mb: 0.5 }}
                    >
                      Learning Posts
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Java, Spring Boot, React, HTML/CSS
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* <LearningPosts /> */}

              {/* <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <Card
                  onClick={() => navigate("/JavaImpTopicsPage")}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                      borderColor: "primary.main",
                    },
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                    overflow: "hidden",
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(25, 118, 210, 0.02)",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      borderRadius: "50%",
                      p: 1.25,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MenuBookIcon
                      sx={{ fontSize: 24, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 0.25, fontSize: "0.8rem" }}
                  >
                    Java Important Topics
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1.3, fontSize: "0.7rem" }}
                  >
                    View core concepts, reference diagrams, and key interview
                    topics.
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <Card
                  onClick={() => navigate("/JavaImpQuestions")}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                      borderColor: "primary.main",
                    },
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                    overflow: "hidden",
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(25, 118, 210, 0.02)",
                    p: { xs: 1.5, sm: 2 },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      borderRadius: "50%",
                      p: 1,
                      mb: 0.75,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MenuBookIcon
                      sx={{ fontSize: 24, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 0.25, fontSize: "0.8rem" }}
                  >
                    Java Questions
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1.3, fontSize: "0.7rem" }}
                  >
                    covered topics on core java spring boot Hibernate and micro
                    services.
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <Card
                  onClick={() => navigate("/CompanyQuestions")}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                      borderColor: "primary.main",
                    },
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                    overflow: "hidden",
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(25, 118, 210, 0.02)",
                    p: { xs: 1.5, sm: 2 },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      borderRadius: "50%",
                      p: 1,
                      mb: 0.75,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MenuBookIcon
                      sx={{ fontSize: 24, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 0.25, fontSize: "0.8rem" }}
                  >
                    Questions Asked by Companies
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1.3, fontSize: "0.7rem" }}
                  >
                    Browse interview question PDFs by company.
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <Card
                  onClick={() => navigate("/ReactImpQuestions")}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                      borderColor: "primary.main",
                    },
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                    overflow: "hidden",
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(25, 118, 210, 0.02)",
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      borderRadius: "50%",
                      p: 1.25,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MenuBookIcon
                      sx={{ fontSize: 28, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 0.25 }}
                  >
                    React Questions
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1.3 }}
                  >
                    covered most asked interview questions.
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <Card
                  onClick={() => navigate("/SpringBootPage")}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                      borderColor: "primary.main",
                    },
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                    overflow: "hidden",
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(25, 118, 210, 0.02)",
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      borderRadius: "50%",
                      p: 1.25,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MenuBookIcon
                      sx={{ fontSize: 28, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 0.25 }}
                  >
                    Spring Boot
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1.3 }}
                  >
                    View core concepts, reference diagrams, and key interview
                    topics.
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <Card
                  onClick={() => navigate("/HtmlCss")}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                      borderColor: "primary.main",
                    },
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                    overflow: "hidden",
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(25, 118, 210, 0.02)",
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      borderRadius: "50%",
                      p: 1.25,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MenuBookIcon
                      sx={{ fontSize: 28, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 0.25 }}
                  >
                    HTML/JAVASCRPIT
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1.3 }}
                  >
                    View core concepts, reference diagrams
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <Card
                  onClick={() => navigate("/ReactPosts")}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                      borderColor: "primary.main",
                    },
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                    overflow: "hidden",
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(25, 118, 210, 0.02)",
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      borderRadius: "50%",
                      p: 1.25,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MenuBookIcon
                      sx={{ fontSize: 28, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 0.25 }}
                  >
                    REACT
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1.3 }}
                  >
                    View core concepts, reference diagrams
                  </Typography>
                </Card>
              </Grid> */}
              {/* <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <Card
                  onClick={() => navigate("/react-guide")}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                      borderColor: "primary.main",
                    },
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                    overflow: "hidden",
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(25, 118, 210, 0.02)",
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      borderRadius: "50%",
                      p: 1.25,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MenuBookIcon
                      sx={{ fontSize: 28, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 0.25 }}
                  >
                    React Guide
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1.3 }}
                  >
                    JavaScript, React, advanced patterns, and deployment roadmap
                  </Typography>
                </Card>
              </Grid>
              <Grid size={{ xs: 6, sm: 4, md: 3 }}>
                <Card
                  onClick={() => navigate("/JavaBackendGuide")}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.35s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                      borderColor: "primary.main",
                    },
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                    overflow: "hidden",
                    minHeight: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(25, 118, 210, 0.02)",
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      borderRadius: "50%",
                      p: 1.25,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MenuBookIcon
                      sx={{ fontSize: 28, color: "primary.main" }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 700, mb: 0.25 }}
                  >
                    Java Guide
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ lineHeight: 1.3 }}
                  >
                    Guide for basics of java and core java spring boot Hibernate
                    and micro services.
                  </Typography>
                </Card>
              </Grid> */}
            </Grid>
          </Box>

          {hasSelectedLanguage && (
            <>
              {/* Day Selection */}
              <Paper
                sx={{
                  p: { xs: 2, md: 2.5 },
                  borderRadius: 3,
                  backgroundColor: "rgba(255,255,255,0.95)",
                  boxShadow: "0 14px 40px rgba(15, 23, 42, 0.08)",
                  border: "1px solid rgba(145, 158, 171, 0.16)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 1.5, fontSize: "1rem" }}
                >
                  🎯 Select Difficulty
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                  {(["Easy", "Medium", "Hard"] as DifficultyType[]).map(
                    (diff) => (
                      <Chip
                        key={diff}
                        label={diff}
                        onClick={() => {
                          setIsRevisionMode(false);
                          setIsStreamsMode(false);
                          const nextDifficulty =
                            selectedDifficulty === diff ? null : diff;
                          setSelectedDifficulty(nextDifficulty);
                          setHasSelectedDay(false);
                          if (nextDifficulty) {
                            setSelectedDay(difficultyDays[nextDifficulty][0]);
                          }
                        }}
                        variant={
                          selectedDifficulty === diff ? "filled" : "outlined"
                        }
                        sx={{
                          fontSize: "13px",
                          fontWeight: 700,
                          cursor: "pointer",
                          height: 32,
                          ...(selectedDifficulty === diff && {
                            backgroundColor: difficultyColors[diff],
                            color: "#fff",
                          }),
                          ...(selectedDifficulty !== diff && {
                            borderColor: difficultyColors[diff],
                            color: difficultyColors[diff],
                          }),
                        }}
                      />
                    ),
                  )}
                  {selectedLanguage === "Java" && (
                    <Chip
                      label="Java Streams"
                      icon={<CodeIcon />}
                      onClick={() => {
                        setIsRevisionMode(false);
                        setIsStreamsMode(false);
                        try {
                          localStorage.setItem(
                            dashboardStorageKey,
                            JSON.stringify({
                              ...readDashboardStorage(),
                              isStreamsMode: false,
                            }),
                          );
                        } catch {
                          // Ignore storage errors while opening practice.
                        }
                        navigate("/java-streams-practice");
                      }}
                      variant="outlined"
                      sx={{ fontWeight: 700, cursor: "pointer", height: 32 }}
                    />
                  )}
                </Box>

                {selectedDifficulty && (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1.5, mt: 2, fontSize: "1rem" }}
                    >
                      📅 Select Day: {selectedLanguage}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {difficultyDays[selectedDifficulty].map((day) => (
                        <Chip
                          key={day}
                          label={day}
                          onClick={() => {
                            setSelectedDay(day);
                            setHasSelectedDay(true);
                            setIsRevisionMode(false);
                          }}
                          color={
                            selectedDay === day && hasSelectedDay
                              ? "primary"
                              : "default"
                          }
                          variant={
                            selectedDay === day && hasSelectedDay
                              ? "filled"
                              : "outlined"
                          }
                          icon={
                            selectedDay === day && hasSelectedDay ? (
                              <CheckCircleIcon />
                            ) : undefined
                          }
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: "pointer",
                            height: 32,
                            "& .MuiChip-label": { px: 1.5 },
                          }}
                        />
                      ))}
                      {selectedLanguage === "Java" && (
                        <Chip
                          label="Revision"
                          onClick={() => setIsRevisionMode(true)}
                          color={isRevisionMode ? "secondary" : "default"}
                          variant={isRevisionMode ? "filled" : "outlined"}
                          icon={isRevisionMode ? <HistoryIcon /> : undefined}
                          sx={{
                            fontSize: "13px",
                            fontWeight: 700,
                            cursor: "pointer",
                            height: 32,
                          }}
                        />
                      )}
                    </Box>
                  </>
                )}

                {isStreamsMode && (
                  <Button
                    component="a"
                    href="/pdfs/java-streams-pattern-playbook.pdf"
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    sx={{ mt: 2 }}
                  >
                    Open Streams pattern playbook
                  </Button>
                )}

                {(hasSelectedDay || isRevisionMode || isStreamsMode) && (
                  <Box sx={{ mt: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "text.secondary" }}
                      >
                        {isStreamsMode
                          ? "Java Streams Progress"
                          : "Today's Progress"}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {tasks.filter((_, i) => isTaskCompleted(i)).length}/
                        {tasks.length}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={
                        tasks.length
                          ? Math.round(
                              (tasks.filter((_, i) => isTaskCompleted(i))
                                .length /
                                tasks.length) *
                                100,
                            )
                          : 0
                      }
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          borderRadius: 5,
                          background: `linear-gradient(90deg, ${languageColors[selectedLanguage]}, #00bcd4)`,
                        },
                      }}
                    />
                  </Box>
                )}
              </Paper>

              {/* Content Layout */}
              {/* Questions Display */}
              {(hasSelectedDay || isRevisionMode || isStreamsMode) && (
                <Grid size={{ xs: 12 }}>
                  <Grid container spacing={1.5}>
                    {tasks.map((question, index) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={index}>
                        <Card
                          sx={{
                            borderRadius: 3,
                            transition: "all 0.3s ease",
                            border: isTaskCompleted(index)
                              ? `2px solid #4caf50`
                              : "1px solid rgba(15, 23, 42, 0.12)",
                            backgroundColor: isTaskCompleted(index)
                              ? "#f0fbf4"
                              : "#ffffff",
                            boxShadow: "0 12px 36px rgba(15, 23, 42, 0.06)",
                            "&:hover": {
                              boxShadow: "0 18px 42px rgba(15, 23, 42, 0.12)",
                              transform: "translateY(-4px)",
                            },
                          }}
                        >
                          <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Chip
                                label={`${isStreamsMode ? "Java Streams" : isRevisionMode ? "Revision" : selectedDay} - Q${index + 1}`}
                                size="small"
                                sx={{
                                  backgroundColor:
                                    languageColors[selectedLanguage],
                                  color: "#fff",
                                  fontWeight: "bold",
                                }}
                              />
                              {isTaskCompleted(index) && (
                                <CheckCircleIcon
                                  sx={{ color: "#4caf50", fontSize: "24px" }}
                                />
                              )}
                            </Box>

                            {/* Render Question Title */}
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 700,
                                fontSize: "1rem",
                                lineHeight: 1.5,
                              }}
                            >
                              {typeof question === "object"
                                ? question.question
                                : question}
                            </Typography>
                            <Box
                              component="details"
                              sx={{
                                mt: 1,
                                "& > summary": {
                                  cursor: "pointer",
                                  color: "primary.main",
                                  fontSize: "0.875rem",
                                  fontWeight: 700,
                                  py: 0.5,
                                },
                              }}
                            >
                              <Typography component="summary" variant="body2">
                                Show details and practice options
                              </Typography>
                              {typeof question === "object" &&
                                question.pattern && (
                                  <Chip
                                    label={question.pattern}
                                    size="small"
                                    variant="outlined"
                                    sx={{ mt: 1 }}
                                  />
                                )}
                              {typeof question === "object" &&
                                question.hint && (
                                  <details style={{ marginTop: 12 }}>
                                    <summary style={{ cursor: "pointer" }}>
                                      Show hint
                                    </summary>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{ mt: 0.75 }}
                                    >
                                      {question.hint}
                                    </Typography>
                                  </details>
                                )}
                              {typeof question === "object" &&
                                question.explanation && (
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5, lineHeight: 1.4 }}
                                  >
                                    {question.explanation}
                                  </Typography>
                                )}
                              {/* Added Input Display Section */}
                              {typeof question === "object" &&
                                question.inputs && (
                                  <Box
                                    sx={{
                                      mt: 1.5,
                                      p: 1,
                                      borderRadius: 1.5,
                                      backgroundColor: "#f8f9fa",
                                      border: "1px dashed rgba(0,0,0,0.12)",
                                    }}
                                  >
                                    <Typography>Sample Inputs:</Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.primary"
                                      sx={{
                                        fontFamily: "monospace",
                                        wordBreak: "break-all",
                                      }}
                                    >
                                      {question.inputs}
                                    </Typography>
                                  </Box>
                                )}
                              {typeof question === "object" &&
                                question.inputs && (
                                  <Box
                                    sx={{
                                      mt: 1,
                                      p: 1,
                                      borderRadius: 1.5,
                                      backgroundColor: "#f1f8ff",
                                      border:
                                        "1px dashed rgba(25, 118, 210, 0.24)",
                                    }}
                                  >
                                    <Typography>Expected Output:</Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.primary"
                                      sx={{
                                        fontFamily: "monospace",
                                        wordBreak: "break-all",
                                      }}
                                    >
                                      {getExpectedOutput(question)}
                                    </Typography>
                                  </Box>
                                )}

                              {isRevisionMode &&
                                typeof question === "object" && (
                                  <Box
                                    sx={{
                                      mt: 1.5,
                                      p: 1.5,
                                      borderRadius: 1.5,
                                      backgroundColor: "#fff8e1",
                                      border: "1px solid #ffe082",
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ fontWeight: 800, mb: 0.75 }}
                                    >
                                      Submission History
                                    </Typography>
                                    {(() => {
                                      const submission =
                                        getRevisionSubmission(question);

                                      return submission ? (
                                        <>
                                          <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 700, mb: 0.5 }}
                                          >
                                            Your latest submitted solution
                                          </Typography>
                                          <Box
                                            component="pre"
                                            sx={{
                                              m: 0,
                                              p: 1.25,
                                              backgroundColor: "#1e1e1e",
                                              color: "#d4d4d4",
                                              borderRadius: 1,
                                              overflowX: "auto",
                                              fontFamily: "monospace",
                                              fontSize: 12,
                                              whiteSpace: "pre-wrap",
                                            }}
                                          >
                                            {submission.code}
                                          </Box>
                                          <Typography
                                            variant="caption"
                                            sx={{
                                              display: "block",
                                              mt: 1,
                                              fontWeight: 700,
                                            }}
                                          >
                                            Submitted output
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              fontFamily: "monospace",
                                              whiteSpace: "pre-wrap",
                                            }}
                                          >
                                            {submission.executionOutput}
                                          </Typography>
                                        </>
                                      ) : (
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          No submitted solution yet. Click Code
                                          Now to practice.
                                        </Typography>
                                      );
                                    })()}
                                  </Box>
                                )}

                              <Stack
                                direction="row"
                                spacing={1}
                                sx={{ mt: 2, flexWrap: "wrap" }}
                              >
                                <Button
                                  fullWidth
                                  variant="contained"
                                  startIcon={<CodeIcon />}
                                  onClick={() => openCompiler(index)}
                                  sx={{
                                    flex: { xs: "1 1 100%", sm: 1 },
                                    minWidth: { xs: "100%", sm: 100 },
                                    fontSize: { xs: "0.78rem", sm: "0.82rem" },
                                    background: `linear-gradient(135deg, ${languageColors[selectedLanguage]}, #00bcd4)`,
                                  }}
                                >
                                  Code Now
                                </Button>
                                {!isRevisionMode && !isStreamsMode && (
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<LightbulbIcon />}
                                    sx={{
                                      flex: { xs: "1 1 100%", sm: 1 },
                                      minWidth: { xs: "100%", sm: 100 },
                                      fontSize: {
                                        xs: "0.78rem",
                                        sm: "0.82rem",
                                      },
                                      borderColor:
                                        selectedLanguage === "Java"
                                          ? languageColors[selectedLanguage]
                                          : undefined,
                                      color:
                                        selectedLanguage === "Java"
                                          ? languageColors[selectedLanguage]
                                          : undefined,
                                    }}
                                    onClick={() => openSolution(index)}
                                  >
                                    Solution
                                  </Button>
                                )}
                                {!isStreamsMode && (
                                  <Button
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                      flex: { xs: "1 1 100%", sm: 1 },
                                      minWidth: { xs: "100%", sm: 100 },
                                      fontSize: {
                                        xs: "0.78rem",
                                        sm: "0.82rem",
                                      },
                                    }}
                                    onClick={(e) => youtubeExplain(e, index)}
                                  >
                                    Explanation
                                  </Button>
                                )}
                              </Stack>
                              {isTaskCompleted(index) && (
                                <Button
                                  fullWidth
                                  variant="outlined"
                                  startIcon={<HistoryIcon />}
                                  onClick={() => viewSubmissionHistory(index)}
                                  sx={{ mt: 1 }}
                                >
                                  History
                                </Button>
                              )}
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              )}
            </>
          )}
        </Stack>
      </Box>

      {/* Code Submission Dialog */}
      <Dialog
        open={openSubmissionDialog}
        onClose={closeCompiler}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          💻 {selectedLanguage} Code Editor -{" "}
          {typeof currentQuestion === "object"
            ? currentQuestion.question
            : currentQuestion}
        </DialogTitle>
        <Box
          sx={{
            mx: 3,
            mb: 1,
            p: 2,
            borderRadius: 1.5,
            backgroundColor: "#f8f9fa",
            border: "1px solid rgba(15, 23, 42, 0.12)",
            maxHeight: 180,
            overflowY: "auto",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 0.5 }}>
            Question
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
            {typeof currentQuestion === "object"
              ? currentQuestion.question
              : currentQuestion}
          </Typography>
          {typeof currentQuestion === "object" &&
            currentQuestion.explanation && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, lineHeight: 1.5 }}
              >
                {currentQuestion.explanation}
              </Typography>
            )}
          {typeof currentQuestion === "object" && currentQuestion.inputs && (
            <Box
              sx={{
                mt: 1.5,
                p: 1,
                borderRadius: 1,
                backgroundColor: "#ffffff",
                border: "1px dashed rgba(0, 0, 0, 0.18)",
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                Sample Inputs
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.25,
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                }}
              >
                {currentQuestion.inputs}
              </Typography>
            </Box>
          )}
          {typeof currentQuestion === "object" && currentQuestion.inputs && (
            <Box
              sx={{
                mt: 1.5,
                p: 1,
                borderRadius: 1,
                backgroundColor: "#f1f8ff",
                border: "1px dashed rgba(25, 118, 210, 0.24)",
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                Expected Output
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.25,
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                }}
              >
                {getExpectedOutput(currentQuestion)}
              </Typography>
            </Box>
          )}
        </Box>
        {/* <DialogContent sx={{ pt: 2 }}>
          <Tabs
            value={tabValue}
            onChange={(_, val) => setTabValue(val)}
            sx={{ mb: 2 }}
          >
            <Tab label="📝 Code Editor" />
            <Tab label="🌐 Online Compiler" />
          </Tabs>

          {tabValue === 0 && (
            <Box>
              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={executeCode}
                  disabled={isExecuting}
                  sx={{
                    background: `linear-gradient(135deg, ${languageColors[selectedLanguage]}, #00bcd4)`,
                  }}
                >
                  {isExecuting ? "Running..." : "Run Code"}
                </Button>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ alignSelf: "center" }}
                >
                  {selectedLanguage === "Java"
                    ? "☁️ Runs on Judge0 cloud compiler"
                    : "Runs locally in browser"}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <Box
                  sx={{
                    flex: 1,
                    height: "400px",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <Editor
                    height="100%"
                    language={languageMonacoIds[selectedLanguage]}
                    value={submissionCode}
                    onChange={(value) => setSubmissionCode(value || "")}
                    theme="vs-light"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: "on",
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    height: "400px",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      backgroundColor: "#f0f0f0",
                      borderBottom: "1px solid #e0e0e0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>📤 Output</Typography>
                    {isExecuting && (
                      <Typography variant="caption" color="text.secondary">
                        Running...
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      p: 2,
                      backgroundColor: "#1e1e1e",
                      color: submissionOutput.startsWith("❌")
                        ? "#f44336"
                        : "#4caf50",
                      fontFamily: "monospace",
                      fontSize: "13px",
                      whiteSpace: "pre-wrap",
                      overflowY: "auto",
                    }}
                  >
                    {isExecuting
                      ? "⏳ Executing..."
                      : submissionOutput ||
                        "// Run your code to see output here"}
                  </Box>
                </Box>
              </Stack>
            </Box>
          )}
          {tabValue === 1 && (
            <Box>
              <iframe
                src={`https://onecompiler.com/embed/${selectedLanguage.toLowerCase()}?theme=dark`}
                width="100%"
                height="450px"
                style={{ border: "none", borderRadius: "8px" }}
                title="Online Compiler"
              />
            </Box>
          )}

           {tabValue === 2 && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Execution Output:
              </Typography>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                  minHeight: "200px",
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                  overflowY: "auto",
                }}
              >
                {submissionOutput || "No output yet. Run your code first."}
              </Box>
            </Box>
          )}
        </DialogContent> */}

        <DialogContent sx={{ pt: 2 }}>
          {isJava ? (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Write your code, click <b>Run</b> in the compiler, then press{" "}
                <b>Submit Code</b>.
              </Typography>
              <iframe
                ref={compilerIframeRef}
                key={`${selectedDay}-${currentTaskIndex}`}
                src="https://onecompiler.com/embed/java?theme=dark&listenToEvents=true&codeChangeEvent=true"
                width="100%"
                height="500px"
                style={{ border: "none", borderRadius: "8px" }}
                title="Java Online Compiler"
                onLoad={handleCompilerLoad}
              />
              <Box
                sx={{
                  mt: 1.5,
                  p: 1.5,
                  borderRadius: 1,
                  backgroundColor: "#1e1e1e",
                  color: submissionOutput.startsWith("❌")
                    ? "#f44336"
                    : "#4caf50",
                  fontFamily: "monospace",
                  fontSize: 13,
                  whiteSpace: "pre-wrap",
                  maxHeight: 150,
                  overflowY: "auto",
                }}
              >
                {submissionOutput || "// Run your code to capture the output"}
              </Box>
            </Box>
          ) : (
            <>
              <Tabs
                value={tabValue}
                onChange={(_, val) => setTabValue(val)}
                sx={{ mb: 2 }}
              >
                <Tab label="📝 Code Editor" />
                <Tab label="🌐 Online Compiler" />
              </Tabs>

              {/* Tab 1: Monaco Code Editor */}
              {tabValue === 0 && (
                <Box>
                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<PlayArrowIcon />}
                      onClick={executeCode}
                      disabled={isExecuting}
                      sx={{
                        background: `linear-gradient(135deg, ${languageColors[selectedLanguage]}, #00bcd4)`,
                      }}
                    >
                      {isExecuting ? "Running..." : "Run Code"}
                    </Button>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ alignSelf: "center" }}
                    >
                      Runs locally in browser
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Box
                      sx={{
                        flex: 1,
                        height: "400px",
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Editor
                        height="100%"
                        language={languageMonacoIds[selectedLanguage]}
                        value={submissionCode}
                        onChange={(value) => setSubmissionCode(value || "")}
                        theme="vs-light"
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        flex: 1,
                        height: "400px",
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          px: 2,
                          py: 1,
                          backgroundColor: "#f0f0f0",
                          borderBottom: "1px solid #e0e0e0",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>📤 Output</Typography>
                        {isExecuting && (
                          <Typography variant="caption" color="text.secondary">
                            Running...
                          </Typography>
                        )}
                      </Box>
                      <Box
                        sx={{
                          flex: 1,
                          p: 2,
                          backgroundColor: "#1e1e1e",
                          color: submissionOutput.startsWith("❌")
                            ? "#f44336"
                            : "#4caf50",
                          fontFamily: "monospace",
                          fontSize: "13px",
                          whiteSpace: "pre-wrap",
                          overflowY: "auto",
                        }}
                      >
                        {isExecuting
                          ? "⏳ Executing..."
                          : submissionOutput ||
                            "// Run your code to see output here"}
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              )}

              {/* Tab 2: Online Compiler */}
              {tabValue === 1 && (
                <Box>
                  <iframe
                    src={`https://onecompiler.com/embed/${selectedLanguage.toLowerCase()}?theme=dark`}
                    width="100%"
                    height="450px"
                    style={{ border: "none", borderRadius: "8px" }}
                    title="Online Compiler"
                  />
                </Box>
              )}
            </>
          )}
        </DialogContent>

        {submissionStatus && (
          <Box sx={{ px: 3, pb: 1 }} aria-live="polite">
            {isSubmitting && <LinearProgress />}
            <Alert
              severity={submissionStatus.severity}
              sx={{ mt: isSubmitting ? 1 : 0 }}
            >
              {submissionStatus.message}
            </Alert>
          </Box>
        )}

        <DialogActions>
          <Button onClick={closeCompiler} disabled={isSubmitting}>
            {submissionStatus?.severity === "success" ? "Close" : "Cancel"}
          </Button>
          <Button
            onClick={submitCode}
            variant="contained"
            color="success"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "✓ Submit Code"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Solution Dialog ── */}
      <Dialog
        open={openSolutionDialog}
        onClose={() => setOpenSolutionDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{ fontWeight: 700, borderBottom: "1px solid #e0e0e0", pb: 2 }}
        >
          <Typography variant="h6">
            💡 Solution —{" "}
            {typeof currentQuestion === "object"
              ? currentQuestion.question
              : currentQuestion}
          </Typography>{" "}
        </DialogTitle>
        <DialogContent sx={{ pt: 2, backgroundColor: "#f8f9fa" }}>
          {typeof currentQuestion === "object" && (
            <Paper
              elevation={0}
              sx={{
                mb: 3,
                p: 2,
                backgroundColor: "#ffffff",
                border: "1px solid rgba(25, 118, 210, 0.2)",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
                Interview Example
              </Typography>
              <Typography variant="body2" sx={{ mb: 1.5, lineHeight: 1.5 }}>
                {currentQuestion.explanation}
              </Typography>
              <Stack spacing={1}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800 }}>
                    Sample Input
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "monospace", wordBreak: "break-word" }}
                  >
                    {currentQuestion.inputs}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 800 }}>
                    Expected Output
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: "monospace", wordBreak: "break-word" }}
                  >
                    {getExpectedOutput(currentQuestion)}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          )}
          {selectedLanguage !== "Java" ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography color="text.secondary">
                Solutions are currently available for Java only. Python and
                JavaScript solutions coming soon!
              </Typography>
            </Box>
          ) : currentSolution ? (
            <Stack spacing={4} sx={{ mt: 1 }}>
              {/* 
          NEW: Map through the approaches array 
          This replaces the single block of code/complexity 
      */}
              {currentSolution.approaches.map((approach, index) => (
                <Stack
                  key={index}
                  spacing={2}
                  sx={{
                    pb: 4,
                    borderBottom:
                      index !== currentSolution.approaches.length - 1
                        ? "2px dashed #e0e0e0"
                        : "none",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: "#424242",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {index === currentSolution.approaches.length - 1
                      ? "🚀"
                      : "🐢"}{" "}
                    {approach.name}
                  </Typography>

                  {/* Complexity badges */}
                  <Stack direction="row" spacing={2}>
                    <Paper
                      elevation={0}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: "#e8f5e9",
                        border: "1px solid #a5d6a7",
                        flex: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: "#388e3c",
                          textTransform: "uppercase",
                        }}
                      >
                        Time
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 700,
                          color: "#2e7d32",
                          fontFamily: "monospace",
                        }}
                      >
                        {approach.timeComplexity}
                      </Typography>
                    </Paper>
                    <Paper
                      elevation={0}
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: "#e3f2fd",
                        border: "1px solid #90caf9",
                        flex: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: "#1565c0",
                          textTransform: "uppercase",
                        }}
                      >
                        Space
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 700,
                          color: "#0d47a1",
                          fontFamily: "monospace",
                        }}
                      >
                        {approach.spaceComplexity}
                      </Typography>
                    </Paper>
                  </Stack>

                  {/* Explanation */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: "#fff8e1",
                      border: "1px solid #ffe082",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ lineHeight: 1.6, color: "#424242" }}
                    >
                      <strong>Logic:</strong> {approach.explanation}
                    </Typography>
                  </Paper>

                  {/* Code block */}
                  <Paper
                    elevation={2}
                    sx={{ borderRadius: 2, overflow: "hidden" }}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        backgroundColor: "#333",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        sx={{ color: "#fff", fontWeight: 700, fontSize: 12 }}
                      >
                        {approach.name} Implementation
                      </Typography>
                      <Button
                        size="small"
                        sx={{ color: "#fff", fontSize: 10 }}
                        onClick={() =>
                          navigator.clipboard.writeText(approach.code)
                        }
                      >
                        Copy
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        backgroundColor: "#1e1e1e",
                        maxHeight: 300,
                        overflowY: "auto",
                        fontFamily: "monospace",
                        fontSize: 13,
                        color: "#d4d4d4",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {approach.code}
                    </Box>
                  </Paper>
                </Stack>
              ))}

              {/* NEW: Optional Link to NeetCode for video explanations */}
              {currentSolution.link && (
                <Button
                  href={currentSolution.link}
                  target="_blank"
                  variant="text"
                  sx={{ alignSelf: "center", color: "#1976d2" }}
                >
                  View detailed explanation on NeetCode.io
                </Button>
              )}
            </Stack>
          ) : (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography color="text.secondary">
                Solution not found.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid #e0e0e0", px: 3, py: 2 }}>
          <Button
            onClick={() => setOpenSolutionDialog(false)}
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* History Dialog */}
      <Dialog
        open={openHistoryDialog}
        onClose={() => setOpenHistoryDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{ fontWeight: 700, borderBottom: "1px solid #e0e0e0", pb: 2 }}
        >
          📚 Submission History
        </DialogTitle>
        <DialogContent sx={{ pt: 2, backgroundColor: "#f8f9fa" }}>
          {historySubmissions.length === 0 ? (
            <Typography>No submissions yet</Typography>
          ) : (
            <Stack spacing={3} sx={{ mt: 1 }}>
              {historySubmissions.map((submission, idx) => (
                <Paper
                  key={idx}
                  elevation={2}
                  sx={{ borderRadius: 2, overflow: "hidden" }}
                >
                  {/* Header */}
                  <Box
                    sx={{
                      px: 2,
                      py: 1.2,
                      backgroundColor: languageColors[selectedLanguage],
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{ color: "#fff", fontWeight: 700, fontSize: 14 }}
                    >
                      Submission #{idx + 1}
                    </Typography>
                    <Typography
                      sx={{ color: "rgba(255,255,255,0.85)", fontSize: 12 }}
                    >
                      🕒 {submission.timestamp}
                    </Typography>
                  </Box>

                  {/* Code Block */}
                  <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: "#555",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Code
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        p: 2,
                        backgroundColor: "#1e1e1e",
                        borderRadius: 1,
                        maxHeight: 220,
                        overflowY: "auto",
                        fontFamily: "'Fira Code', 'Courier New', monospace",
                        fontSize: 13,
                        color: "#d4d4d4",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        lineHeight: 1.7,
                      }}
                    >
                      {submission.code}
                    </Box>
                  </Box>

                  {/* Output Block */}
                  <Box sx={{ p: 2, backgroundColor: "#fff" }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: "#555",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Output
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        p: 1.5,
                        backgroundColor: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: 1,
                        fontFamily: "'Fira Code', 'Courier New', monospace",
                        fontSize: 13,
                        color: "#15803d",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {submission.executionOutput}
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ borderTop: "1px solid #e0e0e0", px: 3, py: 2 }}>
          <Button
            onClick={() => setOpenHistoryDialog(false)}
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
