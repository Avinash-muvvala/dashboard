import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { javaStreamsQuestions } from "./javaStreamsPractice";

const solvedStorageKey = "javaStreamsPracticeSolved";
const draftsStorageKey = "javaStreamsPracticeDrafts";

const readSolved = (): number[] => {
  try {
    return JSON.parse(
      localStorage.getItem(solvedStorageKey) || "[]",
    ) as number[];
  } catch {
    return [];
  }
};

const readDrafts = (): Record<number, string> => {
  try {
    return JSON.parse(localStorage.getItem(draftsStorageKey) || "{}") as Record<
      number,
      string
    >;
  } catch {
    return {};
  }
};

const starterCode = (questionNumber: number) => `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

class Employee {
    private final int id;
    private final String name;
    private final String dept;
    private final double salary;
    private final int age;

    Employee(int id, String name, String dept, double salary, int age) {
        this.id = id;
        this.name = name;
        this.dept = dept;
        this.salary = salary;
        this.age = age;
    }

    int getId() { return id; }
    String getName() { return name; }
    String getDept() { return dept; }
    double getSalary() { return salary; }
    int getAge() { return age; }
}

  class Student {
    private final String name;
    private final String gender;
    private final String department;
    private final String city;
    private final int rank;
    private final int marks;
    private final int age;

    Student(String name, String gender, String department, String city, int rank, int marks, int age) {
      this.name = name;
      this.gender = gender;
      this.department = department;
      this.city = city;
      this.rank = rank;
      this.marks = marks;
      this.age = age;
    }

    String getName() { return name; }
    String getGender() { return gender; }
    String getDepartment() { return department; }
    String getCity() { return city; }
    int getRank() { return rank; }
    int getMarks() { return marks; }
    int getAge() { return age; }

    @Override
    public String toString() { return name + " (" + department + ", rank=" + rank + ")"; }
  }

public class Main {
    public static void main(String[] args) {
        List<Employee> employees = Arrays.asList(
            new Employee(1, "Alice", "Engineering", 95000, 31),
            new Employee(2, "Bob", "Sales", 72000, 27),
            new Employee(3, "Cara", "Engineering", 110000, 38),
            new Employee(4, "David", "Sales", 68000, 42),
            new Employee(5, "Erin", "HR", 55000, 25)
        );
        List<String> words = Arrays.asList("stream", "java", "collector", "java");
        List<Student> students = Arrays.asList(
          new Student("Ajay", "male", "IT", "kkl", 2, 91, 21),
          new Student("Kiran", "male", "MECH", "knl", 3, 88, 22),
          new Student("Manoj", "male", "EEE", "bpl", 5, 77, 23),
          new Student("Haseena", "female", "IT", "kkl", 2, 95, 21),
          new Student("Uday", "male", "MECH", "bpl", 4, 82, 22)
        );
        List<Integer> numbers = Arrays.asList(1, 2, 3, 2, 4, 5, 1, 11, 12);
        List<String> strings = Arrays.asList("apple", "banana", "kiwi", "fig", "orange");

        // Solve question ${questionNumber} here.
    }
}
`;

type JudgeResult = {
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  status?: { id?: number; description?: string } | null;
};

type Verdict = {
  status: "correct" | "wrong" | "error";
  message: string;
} | null;

const encodeBase64 = (value: string) =>
  btoa(unescape(encodeURIComponent(value)));
const decodeBase64 = (value: string) => decodeURIComponent(escape(atob(value)));

const executeJava = async (code: string) => {
  const response = await fetch(
    "https://ce.judge0.com/submissions?base64_encoded=true&wait=false",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_code: encodeBase64(code),
        language_id: 62,
        stdin: "",
      }),
    },
  );
  if (!response.ok)
    throw new Error(`Java runner request failed (${response.status}).`);

  const submission = (await response.json()) as {
    token?: string;
    message?: string;
  };
  if (!submission.token) {
    throw new Error(
      submission.message || "Java runner did not return a job token.",
    );
  }

  const startedAt = Date.now();
  let result: JudgeResult | null = null;
  while (Date.now() - startedAt < 30_000) {
    const resultResponse = await fetch(
      `https://ce.judge0.com/submissions/${submission.token}?base64_encoded=true`,
    );
    if (!resultResponse.ok) {
      throw new Error(`Java result request failed (${resultResponse.status}).`);
    }
    result = (await resultResponse.json()) as JudgeResult;
    if ((result.status?.id ?? 0) >= 3) break;
    await new Promise((resolve) => setTimeout(resolve, 700));
  }

  if (!result || (result.status?.id ?? 0) < 3) {
    return {
      compiled: false,
      output: "Java is still processing this run. Try again in a moment.",
    };
  }

  const output = result.stdout
    ? decodeBase64(result.stdout)
    : result.stderr
      ? decodeBase64(result.stderr)
      : result.compile_output
        ? decodeBase64(result.compile_output)
        : "No output.";

  return {
    compiled: result.status?.id === 3,
    output,
  };
};

const JavaStreamsPracticePage = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);
  const [patternFilter, setPatternFilter] = useState("All patterns");
  const [unsolvedOnly, setUnsolvedOnly] = useState(false);
  const [drafts, setDrafts] = useState<Record<number, string>>(readDrafts);
  const [solved, setSolved] = useState<number[]>(readSolved);
  const [selectedPattern, setSelectedPattern] = useState("");
  const [selectedCollector, setSelectedCollector] = useState("");
  const [output, setOutput] = useState("");
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const question =
    javaStreamsQuestions.find((item) => item.id === selectedId) ??
    javaStreamsQuestions[0];
  const code = drafts[selectedId] ?? starterCode(selectedId);
  const patterns = useMemo(
    () => [...new Set(javaStreamsQuestions.map((item) => item.pattern ?? ""))],
    [],
  );
  const collectors = useMemo(
    () => [
      ...new Set(javaStreamsQuestions.map((item) => item.expectedCollector)),
    ],
    [],
  );
  const visibleQuestions = javaStreamsQuestions.filter(
    (item) =>
      (patternFilter === "All patterns" || item.pattern === patternFilter) &&
      (!unsolvedOnly || !solved.includes(item.id) || item.id === selectedId),
  );

  const selectQuestion = (id: number) => {
    setSelectedId(id);
    setSelectedPattern("");
    setSelectedCollector("");
    setOutput("");
    setVerdict(null);
    setShowHint(false);
    setShowAnswer(false);
  };

  const goToNext = () => {
    const currentIndex = visibleQuestions.findIndex(
      (item) => item.id === selectedId,
    );
    const nextQuestion =
      visibleQuestions[(currentIndex + 1) % visibleQuestions.length];
    if (nextQuestion) selectQuestion(nextQuestion.id);
  };

  const updateCode = (value: string) => {
    const nextDrafts = { ...drafts, [selectedId]: value };
    setDrafts(nextDrafts);
    try {
      localStorage.setItem(draftsStorageKey, JSON.stringify(nextDrafts));
    } catch {
      // Keep the editor usable when browser storage is unavailable.
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setVerdict(null);
    try {
      const result = await executeJava(code);
      setOutput(result.output);
      if (!result.compiled) {
        setVerdict({
          status: "error",
          message: "Java did not compile or run successfully.",
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setOutput(message);
      setVerdict({ status: "error", message });
    } finally {
      setIsRunning(false);
    }
  };

  const checkAnswer = async () => {
    if (
      selectedPattern !== question.pattern ||
      selectedCollector !== question.expectedCollector
    ) {
      setVerdict({
        status: "wrong",
        message: "The pattern or collector does not match the answer key.",
      });
      return;
    }

    if (code.trim() === starterCode(selectedId).trim()) {
      setVerdict({
        status: "wrong",
        message: "Add your Java solution before checking this question.",
      });
      return;
    }

    setIsRunning(true);
    setVerdict(null);
    try {
      const result = await executeJava(code);
      setOutput(result.output);
      if (!result.compiled) {
        setVerdict({
          status: "error",
          message:
            "The answer-key selections match, but the Java code did not compile successfully.",
        });
        return;
      }

      setVerdict({
        status: "correct",
        message:
          "Pattern and collector match, and the Java code compiled. This PDF does not include test cases, so the check cannot verify the algorithm's output.",
      });
      if (!solved.includes(question.id)) {
        const nextSolved = [...solved, question.id];
        setSolved(nextSolved);
        try {
          localStorage.setItem(solvedStorageKey, JSON.stringify(nextSolved));
        } catch {
          // Keep the current session usable when browser storage is unavailable.
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setOutput(message);
      setVerdict({ status: "error", message });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back to dashboard
      </Button>

      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        Java Streams Practice
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {javaStreamsQuestions.length} practice problems from the Streams
        question set.
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        Check Answer verifies the answer-key pattern and collector and checks
        that your Java code compiles. The practice set does not include expected
        outputs, so use Run Code to inspect your solution.
      </Alert>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.75,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Progress
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                {solved.length}/{javaStreamsQuestions.length}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(solved.length / javaStreamsQuestions.length) * 100}
              sx={{ height: 8, borderRadius: 4, mb: 2 }}
            />
            <TextField
              select
              size="small"
              fullWidth
              label="Pattern"
              value={patternFilter}
              onChange={(event) => setPatternFilter(event.target.value)}
              sx={{ mb: 1.5 }}
            >
              <MenuItem value="All patterns">All patterns</MenuItem>
              {patterns.map((pattern) => (
                <MenuItem key={pattern} value={pattern}>
                  {pattern}
                </MenuItem>
              ))}
            </TextField>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {visibleQuestions.length} questions
              </Typography>
              <Chip
                label="Unsolved only"
                size="small"
                onClick={() => setUnsolvedOnly((current) => !current)}
                variant={unsolvedOnly ? "filled" : "outlined"}
                color={unsolvedOnly ? "primary" : "default"}
              />
            </Box>
            <Stack
              spacing={1}
              sx={{
                maxHeight: { xs: 320, md: "65vh" },
                overflowY: "auto",
                pr: 0.5,
              }}
            >
              {visibleQuestions.map((item) => (
                <Paper
                  key={item.id}
                  variant="outlined"
                  onClick={() => selectQuestion(item.id)}
                  sx={{
                    p: 1.25,
                    cursor: "pointer",
                    borderColor:
                      item.id === selectedId ? "primary.main" : "divider",
                    backgroundColor:
                      item.id === selectedId
                        ? "action.selected"
                        : "background.paper",
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, flex: 1 }}
                    >
                      {item.id}. {item.question}
                    </Typography>
                    {solved.includes(item.id) && (
                      <CheckCircleIcon color="success" fontSize="small" />
                    )}
                  </Box>
                  <Chip
                    label={item.pattern}
                    size="small"
                    variant="outlined"
                    sx={{ mt: 0.75, maxWidth: "100%" }}
                  />
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
                mb: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, flex: 1 }}>
                Question {question.id}
              </Typography>
              <Chip label={question.pattern} size="small" color="primary" />
            </Box>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.65 }}>
              {question.question}
            </Typography>

            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,
                overflow: "hidden",
                mb: 1.5,
              }}
            >
              <Editor
                height="390px"
                language="java"
                theme="vs-light"
                value={code}
                onChange={(value) => updateCode(value ?? "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </Box>

            <Stack
              direction="row"
              spacing={1}
              sx={{ mb: 2, flexWrap: "wrap", rowGap: 1 }}
            >
              <Button
                variant="outlined"
                startIcon={<PlayArrowIcon />}
                onClick={runCode}
                disabled={isRunning}
              >
                {isRunning ? "Running..." : "Run Code"}
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<TaskAltIcon />}
                onClick={checkAnswer}
                disabled={isRunning}
              >
                Check Answer
              </Button>
              <Button
                variant="text"
                startIcon={<LightbulbIcon />}
                onClick={() => setShowHint((current) => !current)}
              >
                {showHint ? "Hide hint" : "Hint"}
              </Button>
              <Button
                variant="text"
                onClick={() => setShowAnswer((current) => !current)}
              >
                {showAnswer ? "Hide answer key" : "Show answer key"}
              </Button>
              <Button onClick={goToNext} sx={{ ml: { sm: "auto" } }}>
                Next question
              </Button>
            </Stack>

            <Grid container spacing={1.5} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Your pattern"
                  value={selectedPattern}
                  onChange={(event) => setSelectedPattern(event.target.value)}
                >
                  {patterns.map((pattern) => (
                    <MenuItem key={pattern} value={pattern}>
                      {pattern}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label="Your collector / approach"
                  value={selectedCollector}
                  onChange={(event) => setSelectedCollector(event.target.value)}
                >
                  {collectors.map((collector) => (
                    <MenuItem key={collector} value={collector}>
                      {collector}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {verdict && (
              <Alert
                severity={
                  verdict.status === "correct"
                    ? "success"
                    : verdict.status === "wrong"
                      ? "warning"
                      : "error"
                }
                sx={{ mb: 2 }}
              >
                {verdict.message}
              </Alert>
            )}
            {showHint && question.hint && (
              <Alert severity="info" sx={{ mb: 2 }}>
                {question.hint}
              </Alert>
            )}
            {output && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 800 }}>
                  Run output
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    m: 0,
                    mt: 0.5,
                    p: 1.5,
                    maxHeight: 220,
                    overflow: "auto",
                    borderRadius: 1,
                    backgroundColor: "#1e1e1e",
                    color: "#d4d4d4",
                    fontSize: 13,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {output}
                </Box>
              </Box>
            )}
            {showAnswer && (
              <Alert severity="success">
                <strong>Pattern:</strong> {question.pattern}
                <br />
                <strong>Answer key:</strong> {question.expectedCollector}
                {question.answerCode && (
                  <Box
                    component="pre"
                    sx={{
                      m: 0,
                      mt: 1,
                      p: 1.5,
                      overflowX: "auto",
                      borderRadius: 1,
                      backgroundColor: "rgba(0,0,0,0.06)",
                      fontFamily: "monospace",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {question.answerCode}
                  </Box>
                )}
                <br />
                <a
                  href="/pdfs/java-streams-pattern-playbook.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open the full pattern playbook
                </a>
              </Alert>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JavaStreamsPracticePage;
