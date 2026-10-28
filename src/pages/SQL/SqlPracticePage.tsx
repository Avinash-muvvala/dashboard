import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import {
  SCHEMA_TEXT,
  SEED_SQL,
  sqlQuestions,
  sqlTopics,
  type SqlDifficulty,
  type SqlQuestion,
} from "../SQL/SqlQuestions";

/* ───────────── sql.js (SQLite in the browser) ───────────── */

interface SqlDb {
  run(sql: string): void;
  exec(sql: string): { columns: string[]; values: unknown[][] }[];
  close(): void;
}
interface SqlJs {
  Database: new () => SqlDb;
}
interface QueryResult {
  columns: string[];
  rows: unknown[][];
}

const SQLJS_CDN = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0";
let sqlPromise: Promise<SqlJs> | null = null;

const loadSql = (): Promise<SqlJs> => {
  if (sqlPromise) return sqlPromise;
  sqlPromise = new Promise<SqlJs>((resolve, reject) => {
    const w = window as unknown as {
      initSqlJs?: (cfg: {
        locateFile: (file: string) => string;
      }) => Promise<SqlJs>;
    };
    const init = () =>
      w.initSqlJs!({ locateFile: (f) => `${SQLJS_CDN}/${f}` }).then(
        resolve,
        reject,
      );

    if (w.initSqlJs) {
      init();
      return;
    }
    const script = document.createElement("script");
    script.src = `${SQLJS_CDN}/sql-wasm.js`;
    script.onload = init;
    script.onerror = () => {
      sqlPromise = null;
      reject(new Error("Could not load the SQL engine. Check your internet."));
    };
    document.body.appendChild(script);
  });
  return sqlPromise;
};

// Every run uses a brand-new database, so one query can never affect another.
const runSql = (SQL: SqlJs, query: string): QueryResult => {
  // Remove comments first, otherwise the default "-- Write your query" line
  // would make every query look like it does not start with SELECT.
  const withoutComments = query
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/--.*$/gm, "")
    .trim();
  if (!/^(select|with)\b/i.test(withoutComments)) {
    throw new Error("Only SELECT queries are allowed in this practice.");
  }
  const db = new SQL.Database();
  try {
    db.run(SEED_SQL);
    const results = db.exec(query);
    const last = results[results.length - 1];
    return last
      ? { columns: last.columns, rows: last.values }
      : { columns: [], rows: [] };
  } finally {
    db.close();
  }
};

/* ───────────── answer checking ───────────── */

const norm = (v: unknown) =>
  v === null || v === undefined
    ? "NULL"
    : typeof v === "number"
      ? String(Math.round(v * 10000) / 10000)
      : String(v);

const rowKey = (row: unknown[]) => JSON.stringify(row.map(norm));

const compareResults = (
  expected: QueryResult,
  actual: QueryResult,
  orderMatters: boolean,
): { ok: boolean; message: string } => {
  if (expected.rows.length === 0 && actual.rows.length === 0) {
    return { ok: true, message: "Correct! Both queries return no rows." };
  }
  if (actual.rows.length === 0) {
    return { ok: false, message: "Your query returned no rows." };
  }
  if (actual.columns.length !== expected.columns.length) {
    return {
      ok: false,
      message: `Expected ${expected.columns.length} column(s) but your query returned ${actual.columns.length}.`,
    };
  }
  if (actual.rows.length !== expected.rows.length) {
    return {
      ok: false,
      message: `Expected ${expected.rows.length} row(s) but your query returned ${actual.rows.length}.`,
    };
  }

  const e = expected.rows.map(rowKey);
  const a = actual.rows.map(rowKey);
  const sameSet = [...e].sort().join("|") === [...a].sort().join("|");

  if (!sameSet) {
    return {
      ok: false,
      message:
        "The number of rows is right, but some values differ from the expected output.",
    };
  }
  if (orderMatters && !e.every((k, i) => k === a[i])) {
    return {
      ok: false,
      message: "Right rows, wrong order. Check your ORDER BY.",
    };
  }
  return {
    ok: true,
    message: "Correct! Your query returns the expected result.",
  };
};

/* ───────────── small UI helpers ───────────── */

const difficultyColors: Record<SqlDifficulty, string> = {
  Easy: "#2e7d32",
  Medium: "#e65100",
  Hard: "#c62828",
};

const solvedKey = "sqlPracticeSolved";
const readSolved = (): number[] => {
  try {
    return JSON.parse(localStorage.getItem(solvedKey) || "[]");
  } catch {
    return [];
  }
};

const ResultTable = ({ result }: { result: QueryResult }) => (
  <Box
    sx={{
      maxHeight: 220,
      overflow: "auto",
      border: "1px solid #e0e0e0",
      borderRadius: 1,
    }}
  >
    {result.columns.length === 0 ? (
      <Typography variant="body2" sx={{ p: 1.5 }} color="text.secondary">
        No rows returned.
      </Typography>
    ) : (
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {result.columns.map((c) => (
              <TableCell
                key={c}
                sx={{ fontWeight: 700, backgroundColor: "#f5f5f5" }}
              >
                {c}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {result.rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j} sx={{ fontFamily: "monospace" }}>
                  {cell === null ? "NULL" : String(cell)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </Box>
);

type Verdict = {
  status: "correct" | "wrong" | "error";
  message: string;
} | null;

/* ───────────── page ───────────── */

const SqlPracticePage = () => {
  const navigate = useNavigate();

  const [sql, setSql] = useState<SqlJs | null>(null);
  const [engineError, setEngineError] = useState("");

  const [selectedId, setSelectedId] = useState(sqlQuestions[0].id);
  const [filter, setFilter] = useState<SqlDifficulty | "All">("All");
  const [topic, setTopic] = useState<string>("All");
  const [unsolvedOnly, setUnsolvedOnly] = useState(false);
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const [solved, setSolved] = useState<number[]>(readSolved);

  const [result, setResult] = useState<QueryResult | null>(null);
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    loadSql()
      .then(setSql)
      .catch((e: Error) => setEngineError(e.message));
  }, []);

  const question: SqlQuestion = sqlQuestions.find((q) => q.id === selectedId)!;
  const code = drafts[selectedId] ?? "-- Write your SQL query here\n";

  const expected = useMemo(
    () => (sql ? runSql(sql, question.solution) : null),
    [sql, question],
  );

  const visibleQuestions = sqlQuestions.filter(
    (q) =>
      (filter === "All" || q.difficulty === filter) &&
      (topic === "All" || q.topic === topic) &&
      (!unsolvedOnly || !solved.includes(q.id) || q.id === selectedId),
  );

  const selectQuestion = (id: number) => {
    setSelectedId(id);
    setResult(null);
    setVerdict(null);
    setShowHint(false);
    setShowSolution(false);
  };

  // Next question in the current filtered list (wraps around)
  const goToNext = () => {
    const idx = visibleQuestions.findIndex((q) => q.id === selectedId);
    const next = visibleQuestions[(idx + 1) % visibleQuestions.length];
    if (next) selectQuestion(next.id);
  };

  const runQuery = () => {
    if (!sql) return;
    try {
      setResult(runSql(sql, code));
      setVerdict(null);
    } catch (err) {
      setResult(null);
      setVerdict({
        status: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  };

  const checkAnswer = () => {
    if (!sql || !expected) return;
    try {
      const actual = runSql(sql, code);
      setResult(actual);
      const { ok, message } = compareResults(
        expected,
        actual,
        !!question.orderMatters,
      );
      setVerdict({ status: ok ? "correct" : "wrong", message });

      if (ok && !solved.includes(question.id)) {
        const next = [...solved, question.id];
        setSolved(next);
        try {
          localStorage.setItem(solvedKey, JSON.stringify(next));
        } catch {
          /* ignore storage errors */
        }
      }
    } catch (err) {
      setResult(null);
      setVerdict({
        status: "error",
        message: err instanceof Error ? err.message : String(err),
      });
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ background: "linear-gradient(180deg, #e8f3ff 0%, #ffffff 75%)" }}
    >
      <Box
        sx={{
          py: { xs: 3, md: 4 },
          px: { xs: 1.5, md: 0 },
          minHeight: "100vh",
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Back
        </Button>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 0.5,
            fontSize: { xs: "1.45rem", sm: "1.8rem" },
          }}
        >
          SQL Interview Practice
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Write a query, then press Check Answer. Your result is compared with
          the expected result, so any correct approach passes.
        </Typography>

        {engineError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {engineError}
          </Alert>
        )}
        {!sql && !engineError && (
          <Stack direction="row" spacing={1}>
            <CircularProgress size={18} />
            <Typography variant="body2">Loading SQL engine...</Typography>
          </Stack>
        )}

        <Grid container spacing={2}>
          {/* ── Question list ── */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 2, borderRadius: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.5,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  Progress
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {solved.length}/{sqlQuestions.length}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(solved.length / sqlQuestions.length) * 100}
                sx={{ height: 8, borderRadius: 4, mb: 2 }}
              />

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {(["All", "Easy", "Medium", "Hard"] as const).map((d) => {
                  const color = d === "All" ? "#1565c0" : difficultyColors[d];
                  const active = filter === d;
                  return (
                    <Chip
                      key={d}
                      label={d}
                      onClick={() => setFilter(d)}
                      variant={active ? "filled" : "outlined"}
                      sx={{
                        fontWeight: 700,
                        borderColor: color,
                        color: active ? "#fff" : color,
                        backgroundColor: active ? color : "transparent",
                        "&:hover": {
                          backgroundColor: active ? color : `${color}14`,
                        },
                      }}
                    />
                  );
                })}
              </Box>

              <TextField
                select
                size="small"
                fullWidth
                label="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                sx={{ mb: 1.5 }}
              >
                <MenuItem value="All">All topics</MenuItem>
                {sqlTopics.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t} ({sqlQuestions.filter((q) => q.topic === t).length})
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
                  Showing {visibleQuestions.length} question(s)
                </Typography>
                <Chip
                  label="Unsolved only"
                  size="small"
                  onClick={() => setUnsolvedOnly((v) => !v)}
                  variant={unsolvedOnly ? "filled" : "outlined"}
                  color={unsolvedOnly ? "primary" : "default"}
                />
              </Box>

              <Stack
                spacing={1}
                sx={{
                  maxHeight: { xs: 320, md: "62vh" },
                  overflowY: "auto",
                  pr: 0.5,
                }}
              >
                {visibleQuestions.map((q) => (
                  <Paper
                    key={q.id}
                    variant="outlined"
                    onClick={() => selectQuestion(q.id)}
                    sx={{
                      p: 1.25,
                      cursor: "pointer",
                      borderRadius: 2,
                      borderColor:
                        q.id === selectedId ? "#1565c0" : "rgba(15,23,42,0.12)",
                      backgroundColor: q.id === selectedId ? "#e8f1ff" : "#fff",
                      "&:hover": { backgroundColor: "#f3f8ff" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, flex: 1 }}
                      >
                        {q.id}. {q.title}
                      </Typography>
                      {solved.includes(q.id) && (
                        <CheckCircleIcon
                          sx={{ color: "#4caf50", fontSize: 20 }}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: "flex", gap: 0.75, mt: 0.75 }}>
                      <Chip
                        label={q.difficulty}
                        size="small"
                        sx={{
                          backgroundColor: difficultyColors[q.difficulty],
                          color: "#fff",
                          fontWeight: 700,
                          height: 20,
                          fontSize: 11,
                        }}
                      />
                      <Chip
                        label={q.topic}
                        size="small"
                        variant="outlined"
                        sx={{ height: 20, fontSize: 11 }}
                      />
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* ── Question + editor ── */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: { xs: 2, md: 2.5 }, borderRadius: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1,
                  flexWrap: "wrap",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
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
              </Box>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderLeft: "4px solid #1565c0",
                  borderRadius: 1,
                  backgroundColor: "#f2f7fc",
                  color: "text.primary",
                  fontSize: { xs: "1rem", sm: "1.05rem" },
                  fontWeight: 600,
                  lineHeight: 1.75,
                }}
              >
                {question.description}
              </Typography>

              <Box
                sx={{
                  p: 1.25,
                  mb: 2,
                  borderRadius: 1.5,
                  backgroundColor: "#f8f9fa",
                  border: "1px dashed rgba(0,0,0,0.18)",
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 800 }}>
                  Tables
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}
                >
                  {SCHEMA_TEXT}
                </Typography>
              </Box>

              <Typography variant="caption" sx={{ fontWeight: 800 }}>
                Expected output
              </Typography>
              <Box sx={{ mb: 2, mt: 0.5 }}>
                {expected ? (
                  <ResultTable result={expected} />
                ) : (
                  <LinearProgress />
                )}
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ display: "block", fontWeight: 800, mb: 0.5 }}
                >
                  SQL query
                </Typography>
                <Box
                  sx={{
                    border: "1px solid #b8c5d6",
                    borderRadius: 1,
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
                  }}
                >
                  <Editor
                    height="200px"
                    language="sql"
                    theme="vs-light"
                    value={code}
                    onChange={(v) =>
                      setDrafts((d) => ({ ...d, [selectedId]: v ?? "" }))
                    }
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      scrollbar: {
                        vertical: "visible",
                        horizontal: "visible",
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10,
                      },
                    }}
                  />
                </Box>
              </Box>

              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 2, flexWrap: "wrap", rowGap: 1 }}
              >
                <Button
                  variant="outlined"
                  startIcon={<PlayArrowIcon />}
                  onClick={runQuery}
                  disabled={!sql}
                >
                  Run Query
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<TaskAltIcon />}
                  onClick={checkAnswer}
                  disabled={!sql}
                >
                  Check Answer
                </Button>
                <Button
                  variant="text"
                  startIcon={<LightbulbIcon />}
                  onClick={() => setShowHint((s) => !s)}
                >
                  Hint
                </Button>
                <Button
                  variant="text"
                  onClick={() => setShowSolution((s) => !s)}
                >
                  {showSolution ? "Hide solution" : "Show solution"}
                </Button>
                <Button
                  variant={verdict?.status === "correct" ? "contained" : "text"}
                  onClick={goToNext}
                  sx={{ ml: { sm: "auto" } }}
                >
                  Next question →
                </Button>
              </Stack>

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
                  <strong>
                    {verdict.status === "correct"
                      ? "✓ Correct. "
                      : verdict.status === "wrong"
                        ? "✗ Not quite. "
                        : "SQL error: "}
                  </strong>
                  {verdict.message}
                </Alert>
              )}

              {showHint && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  {question.hint}
                </Alert>
              )}

              {result && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" sx={{ fontWeight: 800 }}>
                    Your result
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <ResultTable result={result} />
                  </Box>
                </Box>
              )}

              {showSolution && (
                <Box
                  component="pre"
                  sx={{
                    m: 0,
                    p: 1.5,
                    backgroundColor: "#1e1e1e",
                    color: "#d4d4d4",
                    borderRadius: 1,
                    fontSize: 13,
                    whiteSpace: "pre-wrap",
                    fontFamily: "monospace",
                  }}
                >
                  {question.solution}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SqlPracticePage;
