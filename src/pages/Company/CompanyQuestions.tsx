import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Collapse,
  Container,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SearchIcon from "@mui/icons-material/Search";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useNavigate } from "react-router-dom";
import documents from "virtual:company-questions";
import "./CompanyQuestions.css";
import {
  generateSimpleInterviewAnswer,
  type SimpleInterviewAnswer,
} from "./companyQuestionAnswers";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

type InterviewItem = {
  id: string;
  title: string;
  subtitle: string;
  fileName: string;
  questionCount?: number;
  startPage?: number;
  endPage?: number;
  number?: string;
  accent: string;
  tint: string;
  kind: "company" | "document";
};

type InterviewQuestion = {
  id: string;
  number: string;
  text: string;
};

type PdfTextItem = {
  str?: string;
  transform?: number[];
};

const extractPageQuestions = (
  items: PdfTextItem[],
  pageNumber: number,
): InterviewQuestion[] => {
  const positionedItems: { x: number; y: number; text: string }[] = [];

  items.forEach((item) => {
    const text = item.str?.trim();
    const x = item.transform?.[4];
    const y = item.transform?.[5];
    if (!text || x === undefined || y === undefined) return;

    positionedItems.push({ x, y, text });
  });

  positionedItems.sort(
    (first, second) => second.y - first.y || first.x - second.x,
  );

  const groupedLines: {
    baseline: number;
    items: { x: number; text: string }[];
  }[] = [];
  positionedItems.forEach((item) => {
    let line = groupedLines.at(-1);
    if (!line || line.baseline - item.y > 3) {
      line = { baseline: item.y, items: [] };
      groupedLines.push(line);
    }
    line.items.push({ x: item.x, text: item.text });
  });

  const lines = groupedLines.map((line) =>
    line.items
      .sort((first, second) => first.x - second.x)
      .map((item) => item.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim(),
  );
  const questions: InterviewQuestion[] = [];
  let currentQuestion: InterviewQuestion | null = null;

  const saveCurrentQuestion = () => {
    if (currentQuestion && currentQuestion.text.length > 8) {
      questions.push(currentQuestion);
    }
    currentQuestion = null;
  };

  lines.forEach((line) => {
    if (!line || /^(?:KEY AREAS|COMPANY \d+)/i.test(line)) return;
    if (/^\d{1,3}\s+Qs?$/i.test(line)) return;

    const questionMatch = line.match(/^(\d{1,3})[.)]?\s+(.+)$/);
    if (questionMatch) {
      saveCurrentQuestion();
      currentQuestion = {
        id: `${pageNumber}-${questionMatch[1]}`,
        number: questionMatch[1],
        text: questionMatch[2],
      };
      return;
    }

    const isSectionHeading =
      line.length < 64 &&
      /^[A-Z0-9 &/(),.-]+$/.test(line) &&
      /[A-Z]/.test(line);
    if (currentQuestion && !isSectionHeading) {
      currentQuestion.text = `${currentQuestion.text} ${line}`;
    }
  });

  saveCurrentQuestion();
  return questions;
};

const companyPdfName = "Java_Interview_Questions_By_Company.pdf";
const companyPdf = documents.find(
  (document) => document.fileName === companyPdfName,
);

const companySections = [
  {
    title: "Capgemini",
    subtitle: "Java Backend Interview",
    questionCount: 32,
    startPage: 2,
    endPage: 3,
  },
  {
    title: "Honeywell",
    subtitle: "Java Interview · shared by Jashu Kumar",
    questionCount: 75,
    startPage: 4,
    endPage: 6,
  },
  {
    title: "Wissen",
    subtitle: "Java Backend · 13 years of experience",
    questionCount: 12,
    startPage: 7,
    endPage: 7,
  },
  {
    title: "EPAM",
    subtitle: "Java Developer Interview",
    questionCount: 19,
    startPage: 8,
    endPage: 8,
  },
  {
    title: "Production Scenarios",
    subtitle: "Java First Round · 2026",
    questionCount: 20,
    startPage: 9,
    endPage: 10,
  },
  {
    title: "Deloitte",
    subtitle: "Java Developer · Technical Round",
    questionCount: 17,
    startPage: 11,
    endPage: 11,
  },
  {
    title: "Coforge",
    subtitle: "Senior Java / Spring Boot",
    questionCount: 29,
    startPage: 12,
    endPage: 13,
  },
  {
    title: "Optum",
    subtitle: "Java Interview Questions",
    questionCount: 29,
    startPage: 14,
    endPage: 15,
  },
];

const accents = [
  { accent: "#c65b3b", tint: "#fff0e9" },
  { accent: "#27745e", tint: "#e8f4ee" },
  { accent: "#b1841e", tint: "#fff6dd" },
  { accent: "#39739a", tint: "#eaf3f9" },
];

const interviewItems: InterviewItem[] = [
  ...(companyPdf
    ? companySections.map((section, index) => ({
        ...section,
        id: `company-${section.title}`,
        fileName: companyPdf.fileName,
        number: String(index + 1).padStart(2, "0"),
        ...accents[index % accents.length],
        kind: "company" as const,
      }))
    : []),
  ...documents
    .filter((document) => document.fileName !== companyPdfName)
    .map((document, index) => ({
      id: `document-${document.fileName}`,
      title: document.title,
      subtitle: "PDF resource · questions and answers",
      fileName: document.fileName,
      ...accents[(index + 1) % accents.length],
      kind: "document" as const,
    })),
];

const CompanyQuestions = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pdfPageCount, setPdfPageCount] = useState(0);
  const [pageWidth, setPageWidth] = useState(760);
  const [questionResult, setQuestionResult] = useState<{
    key: string;
    questions: InterviewQuestion[];
    error?: string;
  } | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null,
  );
  const [answers, setAnswers] = useState<Record<string, SimpleInterviewAnswer>>(
    {},
  );
  const [answerErrors, setAnswerErrors] = useState<Record<string, string>>({});
  const [loadingAnswerId, setLoadingAnswerId] = useState<string | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const selectedItem = interviewItems.find((item) => item.id === selectedId);
  const selectedDocument = selectedItem
    ? documents.find((document) => document.fileName === selectedItem.fileName)
    : null;
  const pdfUrl = selectedDocument
    ? `${import.meta.env.BASE_URL}Company/${encodeURIComponent(selectedDocument.fileName)}`
    : null;
  const selectedCompanyId =
    selectedItem?.kind === "company" ? selectedItem.id : null;
  const searchValue = search.trim().toLowerCase();
  const visibleCompanies = interviewItems.filter(
    (item) =>
      item.kind === "company" &&
      `${item.title} ${item.subtitle}`.toLowerCase().includes(searchValue),
  );
  const visibleDocuments = interviewItems.filter(
    (item) =>
      item.kind === "document" &&
      `${item.title} ${item.fileName}`.toLowerCase().includes(searchValue),
  );
  const firstPage = selectedItem?.startPage ?? 1;
  const lastPage = selectedItem?.endPage ?? (pdfPageCount || 1);
  const questionSetKey =
    selectedCompanyId && pdfUrl
      ? `${selectedCompanyId}:${pdfUrl}:${firstPage}-${lastPage}`
      : null;
  const activeQuestionResult =
    questionResult?.key === questionSetKey ? questionResult : null;
  const interviewQuestions = activeQuestionResult?.questions ?? [];
  const currentQuestion = interviewQuestions[currentQuestionIndex];
  const questionsLoading = Boolean(questionSetKey && !activeQuestionResult);
  const questionsError = activeQuestionResult?.error ?? "";
  const displayedPage = Math.max(firstPage, Math.min(currentPage, lastPage));
  const totalQuestions = companySections.reduce(
    (total, section) => total + section.questionCount,
    0,
  );
  const selectedCompanyIndex = visibleCompanies.findIndex(
    (item) => item.id === selectedId,
  );

  useEffect(() => {
    if (!selectedId) return;

    document
      .getElementById("company-document-viewer")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedId]);

  useEffect(() => {
    if (!questionSetKey || !pdfUrl) return;

    let cancelled = false;
    const loadingTask = pdfjs.getDocument({ url: pdfUrl });

    void (async () => {
      try {
        const pdf = await loadingTask.promise;
        const extractedQuestions: InterviewQuestion[] = [];

        for (
          let pageNumber = firstPage;
          pageNumber <= lastPage;
          pageNumber += 1
        ) {
          const page = await pdf.getPage(pageNumber);
          const textContent = await page.getTextContent();
          extractedQuestions.push(
            ...extractPageQuestions(
              textContent.items as PdfTextItem[],
              pageNumber,
            ),
          );
        }

        if (!cancelled) {
          setQuestionResult({
            key: questionSetKey,
            questions: extractedQuestions,
          });
        }
      } catch {
        if (!cancelled) {
          setQuestionResult({
            key: questionSetKey,
            questions: [],
            error: "We couldn't read the questions from this PDF.",
          });
        }
      }
    })();

    return () => {
      cancelled = true;
      void loadingTask.destroy();
    };
  }, [questionSetKey, pdfUrl, firstPage, lastPage]);

  useEffect(() => {
    const element = viewerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setPageWidth(
          Math.max(260, Math.min(entry.contentRect.width - 32, 920)),
        );
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [selectedId]);

  const selectInterview = (item: InterviewItem) => {
    setSelectedId(item.id);
    setCurrentPage(item.startPage ?? 1);
    setPdfPageCount(0);
    setCurrentQuestionIndex(0);
    setExpandedQuestionId(null);
  };

  const changeCompany = (direction: -1 | 1) => {
    const nextItem = visibleCompanies[selectedCompanyIndex + direction];
    if (nextItem) selectInterview(nextItem);
  };

  const toggleSimpleAnswer = async (question: InterviewQuestion) => {
    if (answers[question.id]) {
      setExpandedQuestionId((currentId) =>
        currentId === question.id ? null : question.id,
      );
      return;
    }

    setExpandedQuestionId(question.id);
    setLoadingAnswerId(question.id);
    setAnswerErrors((currentErrors) => ({
      ...currentErrors,
      [question.id]: "",
    }));

    try {
      const answer = await generateSimpleInterviewAnswer(question.text, {
        context: selectedItem
          ? `${selectedItem.title} – ${selectedItem.subtitle}`
          : undefined,
        // text appears as it streams in
        onPartial: (partial) =>
          setAnswers((current) => ({ ...current, [question.id]: partial })),
        // background fact-check corrected something, so swap it in silently
        onImproved: (improved) =>
          setAnswers((current) => ({ ...current, [question.id]: improved })),
      });
      setAnswers((current) => ({ ...current, [question.id]: answer }));
    } catch (error) {
      // remove any half-streamed answer so it isn't shown as complete
      setAnswers((current) => {
        const next = { ...current };
        delete next[question.id];
        return next;
      });
      console.error("Gemini interview answer request failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Firebase AI error";
      const isAppCheckError = /app check|attestation/i.test(errorMessage);
      const displayError = isAppCheckError
        ? "Firebase rejected the App Check token. Register the debug token shown in this browser's console under Firebase Console > App Check > Apps > Manage debug tokens for this web app, then reload."
        : `Couldn't create an answer: ${errorMessage}`;
      setAnswerErrors((currentErrors) => ({
        ...currentErrors,
        [question.id]: displayError,
      }));
    } finally {
      setLoadingAnswerId(null);
    }
  };

  //   useEffect(() => {
  //     const nextQuestion = interviewQuestions[currentQuestionIndex + 1];
  //     if (nextQuestion && currentQuestion && answers[currentQuestion.id]) {
  //       prefetchInterviewAnswer(nextQuestion.text, {
  //         context: selectedItem
  //           ? `${selectedItem.title} – ${selectedItem.subtitle}`
  //           : undefined,
  //       });
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [currentQuestionIndex, answers]);

  // useEffect(() => {
  //   void runGeminiDiagnostics();
  // }, []);

  const moveToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    setExpandedQuestionId(null);
  };

  const renderInterviewCard = (item: InterviewItem) => {
    const selected = item.id === selectedId;

    return (
      <Grid key={item.id} size={{ xs: 12, sm: 6, lg: 4 }}>
        <Card
          variant="outlined"
          sx={{
            height: "100%",
            minHeight: 172,
            borderWidth: selected ? 2 : 1,
            borderColor: selected ? item.accent : "rgba(24, 56, 43, 0.13)",
            backgroundColor: selected ? item.tint : "#ffffff",
            borderRadius: 1,
            transition:
              "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
            animation: "interview-rise 420ms ease both",
            animationDelay: `${Math.min(Number(item.number ?? 1), 8) * 35}ms`,
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 12px 28px rgba(22, 62, 45, 0.1)",
            },
            "&:focus-within": {
              outline: `3px solid ${item.accent}55`,
              outlineOffset: 2,
            },
          }}
        >
          <CardActionArea
            onClick={() => selectInterview(item)}
            aria-pressed={selected}
            sx={{ height: "100%" }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 2.25 } }}>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "flex-start" }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    flexShrink: 0,
                    borderRadius: 1.5,
                    display: "grid",
                    placeItems: "center",
                    color: item.accent,
                    backgroundColor: item.tint,
                  }}
                >
                  {item.kind === "company" ? (
                    <BusinessCenterOutlinedIcon />
                  ) : (
                    <ArticleOutlinedIcon />
                  )}
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 750,
                        lineHeight: 1.25,
                      }}
                    >
                      {item.title}
                    </Typography>
                    {item.number && (
                      <Typography
                        variant="caption"
                        sx={{ color: item.accent, fontWeight: 800 }}
                      >
                        {item.number}
                      </Typography>
                    )}
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, minHeight: 40, lineHeight: 1.45 }}
                  >
                    {item.subtitle}
                  </Typography>
                </Box>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  mt: 2,
                  pt: 1.25,
                  borderTop: "1px solid rgba(24, 56, 43, 0.1)",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: item.accent, fontWeight: 750 }}
                >
                  {item.questionCount
                    ? `${item.questionCount} questions`
                    : "Open PDF resource"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.startPage && item.endPage
                    ? item.startPage === item.endPage
                      ? `Page ${item.startPage}`
                      : `Pages ${item.startPage}-${item.endPage}`
                    : "View document"}
                </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 85% 0%, rgba(231, 173, 74, 0.13), transparent 28%), #f5f7f2",
        "@media (prefers-reduced-motion: reduce)": {
          "& *, & *::before, & *::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            scrollBehavior: "auto !important",
            transitionDuration: "0.01ms !important",
          },
        },
        "@keyframes interview-rise": {
          from: { opacity: 0, transform: "translateY(10px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3.5, lg: 5 } }}>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 3,
            flexWrap: "wrap",
            p: { xs: 2.5, sm: 3.5, lg: 4.5 },
            mb: { xs: 2.5, sm: 3.5 },
            color: "#ffffff",
            background:
              "linear-gradient(112deg, #173f34 0%, #216d56 72%, #36765a 100%)",
            borderRadius: 1,
            border: "1px solid rgba(255,255,255,0.16)",
            boxShadow: "0 18px 42px rgba(27, 75, 57, 0.18)",
            "&::after": {
              content: '""',
              position: "absolute",
              width: 220,
              height: 220,
              right: { xs: -110, sm: 80 },
              top: -140,
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "50%",
              boxShadow:
                "0 0 0 28px rgba(255,255,255,0.035), 0 0 0 58px rgba(255,255,255,0.025)",
              pointerEvents: "none",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
            <Typography
              variant="overline"
              sx={{
                color: "#d9e99a",
                fontWeight: 800,
                letterSpacing: "0.08em",
              }}
            >
              JAVA INTERVIEW BANK
            </Typography>
            <Typography
              variant="h3"
              sx={{
                mt: 0.25,
                fontSize: { xs: "1.8rem", sm: "2.35rem" },
                fontWeight: 800,
                lineHeight: 1.12,
              }}
            >
              Get ready for the room.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "rgba(255,255,255,0.78)", mt: 1, maxWidth: 580 }}
            >
              Real interview sets, organized by company, with answers and
              reference PDFs close at hand.
            </Typography>
            <Button
              endIcon={<ArrowDownwardIcon />}
              onClick={() =>
                document
                  .getElementById("company-list-heading")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              sx={{
                mt: 1.5,
                color: "#ffffff",
                textTransform: "none",
                border: "1px solid rgba(255,255,255,0.34)",
                borderRadius: 1,
                px: 1.5,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              Browse interviews
            </Button>
          </Box>
          <Stack
            direction="row"
            spacing={{ xs: 2, sm: 3 }}
            sx={{
              position: "relative",
              zIndex: 1,
              pr: { sm: 2 },
              p: { xs: 1.5, sm: 2 },
              borderRadius: 1,
              border: "1px solid rgba(255,255,255,0.16)",
              backgroundColor: "rgba(9, 43, 32, 0.18)",
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "#e2ef9e", fontWeight: 800 }}
              >
                {companyPdf ? companySections.length : 0}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.75)" }}
              >
                interview sets
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "#f2bd62", fontWeight: 800 }}
              >
                {totalQuestions}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.75)" }}
              >
                questions
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            mb: 2.5,
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#173f34" }}>
              Pick your next interview
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.25 }}
            >
              {interviewItems.length} study paths from your Company folder
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <TextField
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Find a company or PDF"
              size="small"
              fullWidth
              slotProps={{
                htmlInput: { "aria-label": "Find a company or PDF" },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                width: { xs: "100%", sm: 280 },
                backgroundColor: "#ffffff",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  "&.Mui-focused fieldset": {
                    borderColor: "#27745e",
                    borderWidth: 2,
                  },
                },
              }}
            />
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/")}
              sx={{
                textTransform: "none",
                flexShrink: 0,
                display: { xs: "none", sm: "inline-flex" },
              }}
            >
              Dashboard
            </Button>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Back
            </Button>
          </Stack>
        </Stack>

        {visibleCompanies.length > 0 && (
          <Box
            component="section"
            aria-labelledby="company-list-heading"
            sx={{ mb: 3.5 }}
          >
            <Stack
              direction="row"
              sx={{
                mb: 1.25,
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Typography
                id="company-list-heading"
                variant="h6"
                sx={{ color: "#173f34", fontWeight: 800 }}
              >
                Company interview sets
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {visibleCompanies.length} available
              </Typography>
            </Stack>
            <Grid container spacing={{ xs: 1.25, sm: 1.75 }}>
              {visibleCompanies.map(renderInterviewCard)}
            </Grid>
          </Box>
        )}

        {visibleDocuments.length > 0 && (
          <Box
            component="section"
            aria-labelledby="pdf-list-heading"
            sx={{ mb: 3.5 }}
          >
            <Stack
              direction="row"
              sx={{
                mb: 1.25,
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Typography
                id="pdf-list-heading"
                variant="h6"
                sx={{ color: "#173f34", fontWeight: 800 }}
              >
                More PDF resources
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Added from the Company folder
              </Typography>
            </Stack>
            <Grid container spacing={{ xs: 1.25, sm: 1.75 }}>
              {visibleDocuments.map(renderInterviewCard)}
            </Grid>
          </Box>
        )}

        {visibleCompanies.length === 0 && visibleDocuments.length === 0 && (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: "#173f34", fontWeight: 750 }}>
              No matching interviews
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Try another company name or clear your search.
            </Typography>
          </Box>
        )}

        {selectedItem && pdfUrl && (
          <Box
            id="company-document-viewer"
            component="section"
            aria-labelledby="selected-interview-title"
            sx={{
              mt: 4,
              scrollMarginTop: 20,
              overflow: "hidden",
              border: "1px solid rgba(24, 56, 43, 0.13)",
              borderRadius: 1,
              backgroundColor: "#ffffff",
              boxShadow: "0 20px 56px rgba(24, 56, 43, 0.12)",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                p: { xs: 2, sm: 2.5 },
                borderBottom: "1px solid rgba(24, 56, 43, 0.1)",
                alignItems: { xs: "stretch", sm: "center" },
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: selectedItem.accent,
                    fontWeight: 800,
                    lineHeight: 1.5,
                  }}
                >
                  {selectedItem.kind === "company"
                    ? "COMPANY INTERVIEW"
                    : "PDF RESOURCE"}
                </Typography>
                <Typography
                  id="selected-interview-title"
                  variant="h5"
                  sx={{ color: "#173f34", fontWeight: 800, lineHeight: 1.2 }}
                >
                  {selectedItem.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.4 }}
                >
                  {selectedItem.subtitle}
                  {selectedItem.questionCount
                    ? ` · ${selectedItem.questionCount} questions`
                    : ""}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  onClick={() => setSelectedId(null)}
                  sx={{ textTransform: "none" }}
                >
                  All interviews
                </Button>
                <Button
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  endIcon={<OpenInNewIcon />}
                  sx={{
                    textTransform: "none",
                    bgcolor: "#216d56",
                    whiteSpace: "nowrap",
                  }}
                >
                  Open PDF
                </Button>
              </Stack>
            </Stack>

            <Box
              ref={viewerRef}
              sx={{
                minHeight: { xs: 360, sm: 520 },
                maxHeight: "78vh",
                overflow: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                p: { xs: 1.5, sm: 3 },
                backgroundColor: "#e9eee8",
              }}
            >
              <Document
                key={selectedItem.fileName}
                file={pdfUrl}
                onLoadSuccess={({ numPages }) => setPdfPageCount(numPages)}
                loading={
                  <Stack
                    spacing={1.5}
                    sx={{ py: 8, color: "#27745e", alignItems: "center" }}
                  >
                    <CircularProgress color="inherit" />
                    <Typography variant="body2">
                      Opening interview pages...
                    </Typography>
                  </Stack>
                }
                error={
                  <Typography color="error" sx={{ py: 8 }}>
                    This PDF could not be opened. Use “Open PDF” to try your
                    browser’s viewer.
                  </Typography>
                }
              >
                <Page
                  pageNumber={displayedPage}
                  width={pageWidth}
                  renderTextLayer
                  renderAnnotationLayer
                  loading={<CircularProgress sx={{ m: 8 }} />}
                  canvasBackground="#ffffff"
                  className="company-pdf-page"
                />
              </Document>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.25}
              sx={{
                p: { xs: 1.5, sm: 2 },
                borderTop: "1px solid rgba(24, 56, 43, 0.1)",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                startIcon={<KeyboardArrowLeftIcon />}
                onClick={() => changeCompany(-1)}
                disabled={
                  selectedItem.kind !== "company" || selectedCompanyIndex <= 0
                }
                sx={{
                  textTransform: "none",
                  alignSelf: { xs: "stretch", sm: "auto" },
                }}
              >
                Previous interview
              </Button>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <Button
                  aria-label="Previous PDF page"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(firstPage, page - 1))
                  }
                  disabled={displayedPage <= firstPage}
                  sx={{ minWidth: 40 }}
                >
                  <KeyboardArrowLeftIcon />
                </Button>
                <Typography
                  variant="body2"
                  sx={{ minWidth: 112, textAlign: "center", fontWeight: 700 }}
                >
                  Page {displayedPage} of {lastPage}
                </Typography>
                <Button
                  aria-label="Next PDF page"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(lastPage, page + 1))
                  }
                  disabled={displayedPage >= lastPage}
                  sx={{ minWidth: 40 }}
                >
                  <KeyboardArrowRightIcon />
                </Button>
              </Stack>
              <Button
                endIcon={<KeyboardArrowRightIcon />}
                onClick={() => changeCompany(1)}
                disabled={
                  selectedItem.kind !== "company" ||
                  selectedCompanyIndex < 0 ||
                  selectedCompanyIndex >= visibleCompanies.length - 1
                }
                sx={{
                  textTransform: "none",
                  alignSelf: { xs: "stretch", sm: "auto" },
                }}
              >
                Next interview
              </Button>
            </Stack>

            {selectedItem.kind === "company" && (
              <Box
                component="section"
                aria-labelledby="interview-questions-heading"
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderTop: "1px solid rgba(24, 56, 43, 0.1)",
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Typography
                    id="interview-questions-heading"
                    variant="h6"
                    sx={{ color: "#173f34", fontWeight: 800 }}
                  >
                    Interview questions
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ask Gemini for a short, beginner-friendly explanation of any
                    question.
                  </Typography>
                </Box>

                {questionsLoading ? (
                  <Stack
                    direction="row"
                    spacing={1.25}
                    sx={{ py: 2, alignItems: "center" }}
                  >
                    <CircularProgress size={20} />
                    <Typography variant="body2" color="text.secondary">
                      Reading questions from the PDF...
                    </Typography>
                  </Stack>
                ) : questionsError ? (
                  <Alert severity="warning">{questionsError}</Alert>
                ) : !currentQuestion ? (
                  <Typography variant="body2" color="text.secondary">
                    No numbered questions were found in this company's PDF
                    pages.
                  </Typography>
                ) : (
                  <Paper
                    variant="outlined"
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      borderRadius: 1,
                      borderColor: "rgba(35, 66, 50, 0.16)",
                      boxShadow: "none",
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      sx={{
                        alignItems: { xs: "stretch", sm: "center" },
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="overline"
                          sx={{ color: "#26745a", fontWeight: 800 }}
                        >
                          Question {currentQuestionIndex + 1} of{" "}
                          {interviewQuestions.length}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            mt: 0.5,
                            color: "#1c2b24",
                            fontWeight: 700,
                            lineHeight: 1.55,
                          }}
                        >
                          {currentQuestion.text}
                        </Typography>
                      </Box>
                      <Button
                        size="small"
                        variant={
                          answers[currentQuestion.id] ? "text" : "outlined"
                        }
                        startIcon={
                          loadingAnswerId === currentQuestion.id ? (
                            <CircularProgress size={14} />
                          ) : (
                            <AutoAwesomeIcon fontSize="small" />
                          )
                        }
                        disabled={loadingAnswerId !== null}
                        aria-expanded={
                          expandedQuestionId === currentQuestion.id
                        }
                        onClick={() => void toggleSimpleAnswer(currentQuestion)}
                        sx={{
                          flexShrink: 0,
                          alignSelf: { xs: "flex-start", sm: "center" },
                          whiteSpace: "nowrap",
                          textTransform: "none",
                        }}
                      >
                        {answers[currentQuestion.id]
                          ? expandedQuestionId === currentQuestion.id
                            ? "Hide answer"
                            : "Show answer"
                          : loadingAnswerId === currentQuestion.id
                            ? "Writing answer..."
                            : "Show simple answer"}
                      </Button>
                    </Stack>

                    <Collapse in={expandedQuestionId === currentQuestion.id}>
                      {(answers[currentQuestion.id] ||
                        answerErrors[currentQuestion.id] ||
                        loadingAnswerId === currentQuestion.id) && (
                        <Box
                          sx={{
                            mt: 2,
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: 1,
                            backgroundColor: "#f1f6f0",
                          }}
                        >
                          {loadingAnswerId === currentQuestion.id && (
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ alignItems: "center" }}
                            >
                              <CircularProgress size={16} />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Writing a simple explanation...
                              </Typography>
                            </Stack>
                          )}
                          {answers[currentQuestion.id] && (
                            <Stack spacing={2}>
                              <Box
                                sx={{
                                  p: { xs: 1.5, sm: 2 },
                                  borderLeft: "3px solid #26745a",
                                  borderRadius: "0 6px 6px 0",
                                  backgroundColor: "#ffffff",
                                }}
                              >
                                <Typography
                                  variant="overline"
                                  sx={{
                                    color: "#26745a",
                                    fontWeight: 800,
                                  }}
                                >
                                  Interview-ready answer
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    mt: 0.5,
                                    color: "#1c2b24",
                                    fontWeight: 650,
                                    lineHeight: 1.7,
                                  }}
                                >
                                  {answers[currentQuestion.id].interviewAnswer}
                                </Typography>
                              </Box>

                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  sx={{ color: "#26745a", fontWeight: 800 }}
                                >
                                  In simple words
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mt: 0.35,
                                    color: "#34483d",
                                    lineHeight: 1.7,
                                  }}
                                >
                                  {
                                    answers[currentQuestion.id]
                                      .simpleExplanation
                                  }
                                </Typography>
                              </Box>

                              {answers[currentQuestion.id].example && (
                                <Box
                                  sx={{
                                    p: { xs: 1.5, sm: 2 },
                                    borderRadius: 1,
                                    backgroundColor: "#fff8e9",
                                  }}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    sx={{ color: "#9a671d", fontWeight: 800 }}
                                  >
                                    Example
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      mt: 0.35,
                                      color: "#493c2a",
                                      lineHeight: 1.7,
                                    }}
                                  >
                                    {answers[currentQuestion.id].example}
                                  </Typography>
                                </Box>
                              )}

                              <Box
                                sx={{
                                  pt: 1.25,
                                  borderTop: "1px solid rgba(35, 66, 50, 0.12)",
                                }}
                              >
                                <Typography
                                  variant="subtitle2"
                                  sx={{ color: "#26745a", fontWeight: 800 }}
                                >
                                  Key takeaway
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mt: 0.35,
                                    color: "#34483d",
                                    lineHeight: 1.7,
                                  }}
                                >
                                  {answers[currentQuestion.id].keyTakeaway}
                                </Typography>
                              </Box>
                            </Stack>
                          )}
                          {answerErrors[currentQuestion.id] && (
                            <Alert severity="warning" sx={{ py: 0 }}>
                              {answerErrors[currentQuestion.id]}
                            </Alert>
                          )}
                        </Box>
                      )}
                    </Collapse>

                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        mt: 2,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        size="small"
                        startIcon={<KeyboardArrowLeftIcon />}
                        disabled={
                          currentQuestionIndex === 0 || loadingAnswerId !== null
                        }
                        onClick={() => moveToQuestion(currentQuestionIndex - 1)}
                        sx={{ textTransform: "none" }}
                      >
                        Previous
                      </Button>
                      <Typography variant="caption" color="text.secondary">
                        {currentQuestion.number} · {currentQuestionIndex + 1}/
                        {interviewQuestions.length}
                      </Typography>
                      <Button
                        size="small"
                        endIcon={<KeyboardArrowRightIcon />}
                        disabled={
                          currentQuestionIndex >=
                            interviewQuestions.length - 1 ||
                          loadingAnswerId !== null
                        }
                        onClick={() => moveToQuestion(currentQuestionIndex + 1)}
                        sx={{ textTransform: "none" }}
                      >
                        Next question
                      </Button>
                    </Stack>
                  </Paper>
                )}
              </Box>
            )}
          </Box>
        )}

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{
            mt: 1,
            textTransform: "none",
            display: { xs: "inline-flex", sm: "none" },
          }}
        >
          Back to dashboard
        </Button>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Back
        </Button>
      </Container>
    </Box>
  );
};

export default CompanyQuestions;
