import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import {
  javaStringQuestions,
  type JavaStringDifficulty,
} from "./javaStringPractice";

const difficultyColors: Record<JavaStringDifficulty, string> = {
  Easy: "#2e7d32",
  Medium: "#e65100",
  Hard: "#c62828",
};

const draftsStorageKey = "javaStringPracticeDrafts";
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

const starterCode = (questionId: number) => `import java.util.*;

public class Main {
    public static void main(String[] args) {
        String text = "hello";

        // Solve question ${questionId} here.
    }
}
`;

type JudgeResult = {
  stdout?: string | null;
  stderr?: string | null;
  compile_output?: string | null;
  status?: { id?: number; description?: string } | null;
};

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
  if (!response.ok) {
    throw new Error(`Java runner request failed (${response.status}).`);
  }

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

  return {
    compiled: result.status?.id === 3,
    output: result.stdout
      ? decodeBase64(result.stdout)
      : result.stderr
        ? decodeBase64(result.stderr)
        : result.compile_output
          ? decodeBase64(result.compile_output)
          : result.status?.description || "No output.",
  };
};

const JavaStringPracticePage = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(1);
  const [difficultyFilter, setDifficultyFilter] = useState<
    JavaStringDifficulty | "All"
  >("All");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [drafts, setDrafts] = useState<Record<number, string>>(readDrafts);
  const [showHint, setShowHint] = useState(false);
  const [output, setOutput] = useState("");
  const [runError, setRunError] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const question =
    javaStringQuestions.find((item) => item.id === selectedId) ??
    javaStringQuestions[0];
  const code = drafts[selectedId] ?? starterCode(selectedId);
  const categories = [
    ...new Set(javaStringQuestions.map((item) => item.category)),
  ];
  const visibleQuestions = javaStringQuestions.filter(
    (item) =>
      (difficultyFilter === "All" || item.difficulty === difficultyFilter) &&
      (categoryFilter === "All categories" || item.category === categoryFilter),
  );

  const selectQuestion = (id: number) => {
    setSelectedId(id);
    setShowHint(false);
    setOutput("");
    setRunError("");
  };

  const changeDifficulty = (difficulty: JavaStringDifficulty | "All") => {
    setDifficultyFilter(difficulty);
    const next = javaStringQuestions.find(
      (item) =>
        (difficulty === "All" || item.difficulty === difficulty) &&
        (categoryFilter === "All categories" ||
          item.category === categoryFilter),
    );
    if (next) selectQuestion(next.id);
  };

  const changeCategory = (category: string) => {
    setCategoryFilter(category);
    const next = javaStringQuestions.find(
      (item) =>
        (difficultyFilter === "All" || item.difficulty === difficultyFilter) &&
        (category === "All categories" || item.category === category),
    );
    if (next) selectQuestion(next.id);
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
    setRunError("");
    setOutput("");
    try {
      const result = await executeJava(code);
      setOutput(result.output);
      if (!result.compiled)
        setRunError("Java did not compile or run successfully.");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setRunError(message);
      setOutput(message);
    } finally {
      setIsRunning(false);
    }
  };

  const nextQuestion = () => {
    const currentIndex = visibleQuestions.findIndex(
      (item) => item.id === selectedId,
    );
    const next = visibleQuestions[(currentIndex + 1) % visibleQuestions.length];
    if (next) selectQuestion(next.id);
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
        Java String Practice
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {javaStringQuestions.length} string problems
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 1.5 }}>
              {(["All", "Easy", "Medium", "Hard"] as const).map(
                (difficulty) => {
                  const color =
                    difficulty === "All"
                      ? "#1565c0"
                      : difficultyColors[difficulty];
                  const count =
                    difficulty === "All"
                      ? javaStringQuestions.length
                      : javaStringQuestions.filter(
                          (item) => item.difficulty === difficulty,
                        ).length;
                  const active = difficultyFilter === difficulty;
                  return (
                    <Chip
                      key={difficulty}
                      label={`${difficulty} (${count})`}
                      onClick={() => changeDifficulty(difficulty)}
                      variant={active ? "filled" : "outlined"}
                      sx={{
                        fontWeight: 700,
                        borderColor: color,
                        color: active ? "#fff" : color,
                        backgroundColor: active ? color : "transparent",
                      }}
                    />
                  );
                },
              )}
            </Box>

            <TextField
              select
              size="small"
              fullWidth
              label="Category"
              value={categoryFilter}
              onChange={(event) => changeCategory(event.target.value)}
              sx={{ mb: 1.5 }}
            >
              <MenuItem value="All categories">All categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            <Typography variant="caption" color="text.secondary">
              {visibleQuestions.length} questions
            </Typography>
            <Stack
              spacing={1}
              sx={{
                mt: 1,
                maxHeight: { xs: 320, md: "68vh" },
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
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {item.id}. {item.title}
                  </Typography>
                  <Chip
                    label={item.difficulty}
                    size="small"
                    sx={{
                      mt: 0.75,
                      backgroundColor: difficultyColors[item.difficulty],
                      color: "#fff",
                      fontWeight: 700,
                    }}
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
                {question.id}. {question.title}
              </Typography>
              <Chip
                label={question.difficulty}
                size="small"
                sx={{
                  backgroundColor: difficultyColors[question.difficulty],
                  color: "#fff",
                  fontWeight: 700,
                }}
              />
              <Chip label={question.category} size="small" variant="outlined" />
            </Box>

            <Typography variant="body1" sx={{ mb: 1, lineHeight: 1.65 }}>
              {question.prompt}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1.5, fontFamily: "monospace" }}
            >
              {question.example}
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
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </Box>

            <Stack
              direction="row"
              spacing={1}
              sx={{ mb: 1.5, flexWrap: "wrap", rowGap: 1 }}
            >
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                onClick={runCode}
                disabled={isRunning}
              >
                {isRunning ? "Running..." : "Run Code"}
              </Button>
              <Button
                variant="text"
                startIcon={<LightbulbIcon />}
                onClick={() => setShowHint((current) => !current)}
              >
                {showHint ? "Hide hint" : "Hint"}
              </Button>
              <Button onClick={nextQuestion}>Next question</Button>
            </Stack>

            {showHint && (
              <Alert severity="info" sx={{ mb: 1.5 }}>
                {question.hint}
              </Alert>
            )}
            {runError && (
              <Alert severity="error" sx={{ mb: 1.5 }}>
                {runError}
              </Alert>
            )}

            <Paper
              variant="outlined"
              sx={{ overflow: "hidden", backgroundColor: "#111827" }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  px: 1.5,
                  py: 0.75,
                  color: "#f9fafb",
                  backgroundColor: "#1f2937",
                  fontWeight: 700,
                }}
              >
                Console
              </Typography>
              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: 1.5,
                  minHeight: 90,
                  maxHeight: 180,
                  overflow: "auto",
                  color: "#d1fae5",
                  fontFamily: "monospace",
                  fontSize: 13,
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                }}
              >
                {isRunning
                  ? "Running Java..."
                  : output || "Run your code to see output here."}
              </Box>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JavaStringPracticePage;
