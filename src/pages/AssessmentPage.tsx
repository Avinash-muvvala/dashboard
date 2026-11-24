import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ReplayIcon from "@mui/icons-material/Replay";
import { useNavigate } from "react-router-dom";
import {
  assessmentSkills,
  createAssessmentQuestions,
  getAssessmentQuestionCount,
  type AssessmentQuestion,
  type AssessmentSkill,
} from "./assessmentQuestions";
import { auth } from "./SERVER/firebaseConfig";

const roles = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full-stack Developer (MERN)",
  "Full-stack Developer (Java + React)",
  "QA Engineer",
  "Test Automation Engineer",
  "Manual Test Engineer",
  "Data Analyst",
] as const;

type TargetRole = (typeof roles)[number];

const roleSkills: Record<TargetRole, AssessmentSkill[]> = {
  "Software Engineer": assessmentSkills.filter(
    (skill) => skill !== "API Testing" && skill !== "Selenium",
  ),
  "Frontend Developer": ["JavaScript", "React"],
  "Backend Developer": ["Java", "Spring Boot", "Microservices", "SQL"],
  "Full-stack Developer (MERN)": ["JavaScript", "React"],
  "Full-stack Developer (Java + React)": [
    "Java",
    "Spring Boot",
    "Microservices",
    "SQL",
    "JavaScript",
    "React",
  ],
  "QA Engineer": ["API Testing", "Selenium", "SQL"],
  "Test Automation Engineer": [
    "API Testing",
    "Selenium",
    "Java",
    "JavaScript",
    "SQL",
  ],
  "Manual Test Engineer": ["API Testing", "JavaScript", "SQL"],
  "Data Analyst": ["SQL"],
};

const experienceOptions = [
  { value: 0, label: "Less than 1 year" },
  { value: 1, label: "1 year" },
  ...Array.from({ length: 8 }, (_, index) => ({
    value: index + 2,
    label: `${index + 2} years`,
  })),
  { value: 10, label: "10+ years" },
];

const AssessmentPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"profile" | "skills" | "test" | "complete">(
    "profile",
  );
  const [name, setName] = useState(
    auth.currentUser?.displayName?.trim() ||
      auth.currentUser?.email?.split("@")[0] ||
      "",
  );
  const [yearsOfExperience, setYearsOfExperience] = useState<number | "">("");
  const [selectedSkills, setSelectedSkills] = useState<AssessmentSkill[]>([]);
  const [role, setRole] = useState<TargetRole | "">("");
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<number[]>([]);
  const [error, setError] = useState("");

  const question = questions[currentQuestion];
  const availableSkills = role ? roleSkills[role] : [];
  const plannedQuestionCount = getAssessmentQuestionCount(selectedSkills);
  const progress = useMemo(
    () =>
      questions.length
        ? ((currentQuestion + 1) / questions.length) * 100
        : 0,
    [currentQuestion, questions.length],
  );

  const toggleSkill = (skill: AssessmentSkill) => {
    setSelectedSkills((previous) =>
      previous.includes(skill)
        ? previous.filter((item) => item !== skill)
        : [...previous, skill],
    );
    setError("");
  };

  const startTest = () => {
    if (!role) {
      setError("Choose the role you are preparing for.");
      return;
    }
    if (!selectedSkills.length) {
      setError("Choose at least one skill to build your test.");
      return;
    }
    if (plannedQuestionCount < 15) {
      setError(
        "Select enough skills to include at least 15 questions in your test.",
      );
      return;
    }
    if (yearsOfExperience === "") {
      setError("Select your years of experience.");
      setStep("profile");
      return;
    }

    const generatedQuestions = createAssessmentQuestions(
      selectedSkills,
      yearsOfExperience,
    );
    if (generatedQuestions.length !== plannedQuestionCount) {
      setError(
        `Only ${generatedQuestions.length} questions are available for this selection. Choose more skills to build a test with at least 15 questions.`,
      );
      return;
    }

    setQuestions(generatedQuestions);
    setCurrentQuestion(0);
    setAnswers({});
    setRevealedAnswers([]);
    setError("");
    setStep("test");
  };

  const toggleAnswer = (index: number) => {
    setRevealedAnswers((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index],
    );
  };

  const goToNextQuestion = () => {
    if (currentQuestion === questions.length - 1) {
      setStep("complete");
      return;
    }
    setCurrentQuestion((previous) => previous + 1);
  };

  const restartTest = () => {
    setStep("skills");
    setCurrentQuestion(0);
    setQuestions([]);
    setAnswers({});
    setRevealedAnswers([]);
  };

  const pageTitle =
    step === "test"
      ? "Your personalized test"
      : step === "complete"
        ? "Test complete"
        : "Build your test";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 2, sm: 4, md: 6 },
        background:
          "radial-gradient(ellipse at 8% 0%, rgba(183, 229, 205, 0.38), transparent 35%), radial-gradient(ellipse at 92% 5%, rgba(240, 189, 104, 0.16), transparent 30%)",
      }}
    >
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            if (step === "test" || step === "complete") {
              setStep("skills");
            } else if (step === "skills") {
              setStep("profile");
            } else {
              navigate("/");
            }
          }}
          sx={{ mb: 2 }}
        >
          {step === "profile" ? "Back to home" : "Back"}
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 4, md: 5 },
            borderRadius: { xs: 3, md: 4 },
            boxShadow: "0 18px 55px rgba(31, 62, 45, 0.09)",
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 800, letterSpacing: "0.12em" }}
          >
            PERSONALIZED SKILLS CHECK
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5, mb: 1 }}>
            {pageTitle}
          </Typography>
          {step !== "test" && step !== "complete" && (
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Tell us what you are working toward and we’ll choose questions
              that match your experience.
            </Typography>
          )}

          {step !== "test" && step !== "complete" && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ mb: 4, maxWidth: 390 }}
              aria-label={`Setup step ${step === "profile" ? 1 : 2} of 2`}
            >
              <Box
                sx={{
                  height: 5,
                  flex: 1,
                  borderRadius: 99,
                  bgcolor: "primary.main",
                }}
              />
              <Box
                sx={{
                  height: 5,
                  flex: 1,
                  borderRadius: 99,
                  bgcolor:
                    step === "skills" ? "primary.main" : "action.selected",
                }}
              />
            </Stack>
          )}

          {error && (
            <Alert
              severity="warning"
              sx={{ mb: 3 }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}

          {step === "profile" && (
            <Stack spacing={2.5}>
              <TextField
                label="Your name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setError("");
                }}
                autoComplete="name"
                fullWidth
                required
              />
              <TextField
                select
                label="Years of experience"
                value={yearsOfExperience}
                onChange={(event) => {
                  setYearsOfExperience(Number(event.target.value));
                  setError("");
                }}
                fullWidth
                required
              >
                <MenuItem value="" disabled>
                  Select your experience
                </MenuItem>
                {experienceOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={() => {
                  if (!name.trim()) {
                    setError("Enter your name to continue.");
                    return;
                  }
                  if (yearsOfExperience === "") {
                    setError("Select your years of experience to continue.");
                    return;
                  }
                  setError("");
                  setName(name.trim());
                  setStep("skills");
                }}
                sx={{ alignSelf: "flex-end", mt: 1 }}
              >
                Next
              </Button>
            </Stack>
          )}

          {step === "skills" && (
            <Stack spacing={3}>
              <TextField
                select
                label="Target role"
                value={role}
                onChange={(event) => {
                  const nextRole =
                    roles.find((item) => item === event.target.value) ?? "";
                  setRole(nextRole);
                  setSelectedSkills([]);
                  setError("");
                }}
                fullWidth
                required
              >
                <MenuItem value="" disabled>
                  Select a target role
                </MenuItem>
                {roles.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>

              <Box>
                <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 700 }}>
                  Choose skills for {role || "your target role"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                  Select one or more relevant skills. Questions start easy and
                  progress up to your experience level.
                </Typography>
                {role ? (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {availableSkills.map((skill) => {
                      const selected = selectedSkills.includes(skill);
                      return (
                        <Chip
                          key={skill}
                          label={skill}
                          clickable
                          color={selected ? "primary" : "default"}
                          variant={selected ? "filled" : "outlined"}
                          onClick={() => toggleSkill(skill)}
                          aria-pressed={selected}
                          sx={{ px: 0.5, py: 2.25, fontSize: "0.9rem" }}
                        />
                      );
                    })}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Select a target role to see its relevant skills.
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                  Your test will include {plannedQuestionCount} questions across{" "}
                  {plannedQuestionCount / 3} sections.
                </Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<LightbulbIcon />}
                onClick={startTest}
                sx={{ alignSelf: "flex-end", mt: 1 }}
              >
                Play {plannedQuestionCount}-question test
              </Button>
            </Stack>
          )}

          {step === "test" && question && (
            <Stack spacing={2.5}>
              <Box>
                <Stack
                  direction="row"
                  sx={{
                    mb: 1,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Question {currentQuestion + 1} of {questions.length}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  aria-label="Test progress"
                />
              </Box>

              <Card variant="outlined" sx={{ boxShadow: "none" }}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography variant="overline" color="text.secondary">
                    {role} · {name}
                  </Typography>
                  <Typography variant="h5" sx={{ mt: 0.5, mb: 1.5 }}>
                    {question.title}
                  </Typography>
                  <Typography sx={{ whiteSpace: "pre-line" }}>
                    {question.prompt}
                  </Typography>
                  {question.context && (
                    <Paper
                      variant="outlined"
                      sx={{
                        mt: 2,
                        p: 1.5,
                        bgcolor: "rgba(38, 116, 90, 0.035)",
                        whiteSpace: "pre-line",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                        Details
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {question.context}
                      </Typography>
                    </Paper>
                  )}
                </CardContent>
              </Card>

              <TextField
                label="Your answer"
                placeholder="Write down your approach or solution..."
                value={answers[currentQuestion] || ""}
                onChange={(event) =>
                  setAnswers((previous) => ({
                    ...previous,
                    [currentQuestion]: event.target.value,
                  }))
                }
                multiline
                minRows={4}
                fullWidth
              />

              {revealedAnswers.includes(currentQuestion) && (
                <Alert
                  severity="success"
                  icon={<CheckCircleIcon />}
                  sx={{ whiteSpace: "pre-line" }}
                >
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Suggested answer
                  </Typography>
                  {question.answer}
                </Alert>
              )}

              <Stack
                direction={{ xs: "column-reverse", sm: "row" }}
                spacing={1.5}
                sx={{ justifyContent: "space-between" }}
              >
                <Button
                  disabled={currentQuestion === 0}
                  onClick={() =>
                    setCurrentQuestion((previous) => Math.max(0, previous - 1))
                  }
                  startIcon={<ArrowBackIcon />}
                >
                  Previous
                </Button>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  sx={{ alignItems: { xs: "stretch", sm: "center" } }}
                >
                  <Button onClick={() => toggleAnswer(currentQuestion)}>
                    {revealedAnswers.includes(currentQuestion)
                      ? "Hide suggested answer"
                      : "Show suggested answer"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={goToNextQuestion}
                    endIcon={
                      currentQuestion === questions.length - 1 ? (
                        <CheckCircleIcon />
                      ) : (
                        <ArrowForwardIcon />
                      )
                    }
                  >
                    {currentQuestion === questions.length - 1
                      ? "Finish test"
                      : "Next question"}
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          )}

          {step === "complete" && (
            <Stack
              spacing={2}
              sx={{ py: { xs: 3, sm: 5 }, alignItems: "center" }}
            >
              <CheckCircleIcon color="success" sx={{ fontSize: 64 }} />
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Nice work, {name}!
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                You completed {questions.length} questions for {role} and
                answered {Object.values(answers).filter((answer) => answer.trim()).length}.
                Keep practicing to build your confidence.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ pt: 1 }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ReplayIcon />}
                  onClick={restartTest}
                >
                  Build another test
                </Button>
                <Button variant="contained" onClick={() => navigate("/")}>
                  Back to home
                </Button>
              </Stack>
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default AssessmentPage;
