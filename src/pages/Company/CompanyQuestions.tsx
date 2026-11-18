import { useEffect, useMemo, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import {
  Alert,
  Box,
  Button,
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

type CompanyInterviewItem = {
  id: string;
  title: string;
  subtitle: string;
  fileName: string;
  questionCount: number;
  startPage: number;
  endPage: number;
  number?: string;
  accent: string;
  tint: string;
  kind: "company";
};

type DocumentInterviewItem = {
  id: string;
  title: string;
  subtitle: string;
  fileName: string;
  number?: string;
  accent: string;
  tint: string;
  kind: "document";
};

type InterviewItem = CompanyInterviewItem | DocumentInterviewItem;

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

type CompanySection = {
  title: string;
  subtitle: string;
  questionCount: number;
  startPage: number;
  endPage: number;
};

const fallbackCompanySections: CompanySection[] = [
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

const normalizeCompanyHeading = (value: string) =>
  value
    .replace(/^[^A-Za-z0-9]+/, "")
    .replace(/\s+/g, " ")
    .replace(/[\u2013\u2014]/g, "-")
    .trim();

const COMPANY_NAME_WHITELIST = new Set([
  "Capgemini",
  "Honeywell",
  "Wissen",
  "EPAM",
  "Production Scenarios",
  "Deloitte",
  "Coforge",
  "Optum",
  "Accenture",
  "TCS",
  "Infosys",
  "Cognizant",
  "Microsoft",
  "Amazon",
  "Google",
  "Meta",
  "Uber",
  "PayPal",
  "Nagarro",
  "Persistent",
  "IBM",
  "Mphasis",
  "Hexaware",
  "Virtusa",
  "Tech Mahindra",
  "HCL",
  "LTIMindtree",
  "Mindtree",
  "JPMorgan",
  "Goldman Sachs",
  "Barclays",
  "Flipkart",
  "Myntra",
]);

const isLikelyCompanyHeading = (value: string) => {
  const cleaned = normalizeCompanyHeading(value);
  const lowered = cleaned.toLowerCase();

  if (!cleaned || cleaned.length < 3 || cleaned.length > 60) return false;

  if (COMPANY_NAME_WHITELIST.has(cleaned)) return true;

  const genericPatterns = [
    "java interview",
    "interview question",
    "interview questions",
    "questions and answers",
    "question bank",
    "company interview",
    "key areas",
    "page ",
    "experience",
    "round",
    "java ",
    "company",
  ];

  if (genericPatterns.some((pattern) => lowered.includes(pattern)))
    return false;
  if (
    /^(?:java|interview|questions|answers|round|experience|key areas|page|company)$/i.test(
      cleaned,
    )
  ) {
    return false;
  }
  if (/\d{4}/.test(cleaned) || /^\d/.test(cleaned)) return false;

  const looksLikeCompanyName =
    /^[A-Z][A-Za-z0-9&./()'-]*(?:\s+[A-Z][A-Za-z0-9&./()'-]*)+$/.test(
      cleaned,
    ) || /^[A-Z][A-Za-z0-9&./()'-]+$/.test(cleaned);

  return looksLikeCompanyName && /[A-Za-z]/.test(cleaned);
};

const extractCompanySectionsFromPdf = async (
  pdf: PDFDocumentProxy,
): Promise<CompanySection[]> => {
  const totalPages = pdf.numPages || 1;
  const detected: Array<{ title: string; startPage: number }> = [];
  const pageQuestionCounts: number[] = [];

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const pageItems = textContent.items as PdfTextItem[];
    const pageLines = pageItems
      .map((item) => item.str?.trim())
      .filter((line): line is string => Boolean(line));
    pageQuestionCounts[pageNumber] = extractPageQuestions(
      pageItems,
      pageNumber,
    ).length;

    const heading = pageLines.find((line) => isLikelyCompanyHeading(line));
    if (!heading) continue;

    const title = normalizeCompanyHeading(heading);
    if (!title) continue;
    detected.push({ title, startPage: pageNumber });
  }

  if (detected.length === 0) return fallbackCompanySections;

  const sections: CompanySection[] = [];
  detected.forEach((entry, index) => {
    const nextSection = detected[index + 1];
    const endPage = nextSection ? nextSection.startPage - 1 : totalPages;
    const questionCount = pageQuestionCounts
      .slice(entry.startPage, endPage + 1)
      .reduce((total, count) => total + count, 0);
    sections.push({
      title: entry.title,
      subtitle: "Java interview questions",
      questionCount,
      startPage: entry.startPage,
      endPage,
    });
  });

  return sections.filter((section) => section.endPage >= section.startPage);
};

const companyPdfName = "Java_Interview_Questions_By_Company.pdf";
const companyPdf =
  documents.find(
    (document) =>
      document.fileName.toLowerCase() === companyPdfName.toLowerCase(),
  ) ??
  documents.find((document) => /company/i.test(document.fileName)) ??
  null;

const accents = [
  { accent: "#c65b3b", tint: "#fff0e9" },
  { accent: "#27745e", tint: "#e8f4ee" },
  { accent: "#b1841e", tint: "#fff6dd" },
  { accent: "#39739a", tint: "#eaf3f9" },
];

const CompanyQuestions = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pdfPageCount, setPdfPageCount] = useState(0);
  const [pageWidth, setPageWidth] = useState(760);
  const [companySections, setCompanySections] = useState<CompanySection[]>(
    fallbackCompanySections,
  );
  const [questionResult, setQuestionResult] = useState<{
    key: string;
    questions: InterviewQuestion[];
    error?: string;
  } | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null,
  );
  const [answers, setAnswers] = useState<Record<string, SimpleInterviewAnswer>>(
    {},
  );
  const [answerErrors, setAnswerErrors] = useState<Record<string, string>>({});
  const [loadingAnswerId, setLoadingAnswerId] = useState<string | null>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const interviewItems = useMemo(
    () => [
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
        .filter((document) => document.fileName !== companyPdf?.fileName)
        .map((document, index) => ({
          id: `document-${document.fileName}`,
          title: document.title,
          subtitle: "PDF resource · questions and answers",
          fileName: document.fileName,
          ...accents[(index + 1) % accents.length],
          kind: "document" as const,
        })),
    ],
    [companySections],
  );

  const selectedItem = interviewItems.find((item) => item.id === selectedId);
  const selectedDocument = selectedItem
    ? documents.find((document) => document.fileName === selectedItem.fileName)
    : null;
  const pdfUrl = selectedDocument
    ? `${import.meta.env.BASE_URL}Company/${encodeURIComponent(selectedDocument.fileName)}`
    : null;

  const companyPdfUrl = companyPdf
    ? `${import.meta.env.BASE_URL}Company/${encodeURIComponent(companyPdf.fileName)}`
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
  const firstPage =
    selectedItem && selectedItem.kind === "company"
      ? selectedItem.startPage
      : 1;
  const lastPage =
    selectedItem && selectedItem.kind === "company"
      ? selectedItem.endPage
      : pdfPageCount || 1;
  const questionSetKey =
    selectedCompanyId && pdfUrl
      ? `${selectedCompanyId}:${pdfUrl}:${firstPage}-${lastPage}`
      : null;
  const activeQuestionResult =
    questionResult?.key === questionSetKey ? questionResult : null;
  const interviewQuestions = activeQuestionResult?.questions ?? [];
  const actualQuestionCount = interviewQuestions.length;
  const safeCurrentQuestionIndex =
    interviewQuestions.length === 0
      ? 0
      : Math.min(currentQuestionIndex, interviewQuestions.length - 1);
  const currentQuestion = interviewQuestions[safeCurrentQuestionIndex];
  const questionsLoading = Boolean(questionSetKey && !activeQuestionResult);
  const questionsError = activeQuestionResult?.error ?? "";
  const getItemQuestionCount = (item: InterviewItem) => {
    if (item.kind !== "company") return 0;
    if (selectedCompanyId === item.id && actualQuestionCount > 0) {
      return actualQuestionCount;
    }
    return item.questionCount;
  };
  const totalQuestions =
    selectedItem && selectedItem.kind === "company" && actualQuestionCount
      ? actualQuestionCount
      : companySections.reduce(
          (total, section) => total + section.questionCount,
          0,
        );
  const selectedCompanyIndex = visibleCompanies.findIndex(
    (item) => item.id === selectedId,
  );

  useEffect(() => {
    if (!companyPdf || !companyPdfUrl) {
      queueMicrotask(() => {
        setCompanySections(fallbackCompanySections);
      });
      return;
    }

    let cancelled = false;
    const loadingTask = pdfjs.getDocument({ url: companyPdfUrl });

    void (async () => {
      try {
        const pdf = await loadingTask.promise;
        const detectedSections = await extractCompanySectionsFromPdf(pdf);
        if (!cancelled) {
          queueMicrotask(() => {
            setCompanySections(detectedSections);
          });
        }
      } catch {
        if (!cancelled) {
          queueMicrotask(() => {
            setCompanySections(fallbackCompanySections);
          });
        }
      }
    })();

    return () => {
      cancelled = true;
      void loadingTask.destroy();
    };
  }, [companyPdfUrl]);

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
          queueMicrotask(() => {
            setQuestionResult({
              key: questionSetKey,
              questions: extractedQuestions,
            });
          });
        }
      } catch {
        if (!cancelled) {
          queueMicrotask(() => {
            setQuestionResult({
              key: questionSetKey,
              questions: [],
              error: "We couldn't read the questions from this PDF.",
            });
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
    setPdfPageCount(0);
    setCurrentQuestionIndex(0);
    setShowAllQuestions(false);
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
    if (interviewQuestions.length === 0) return;
    setCurrentQuestionIndex(
      Math.max(0, Math.min(index, interviewQuestions.length - 1)),
    );
    setExpandedQuestionId(null);
  };

  const renderInterviewCard = (item: InterviewItem) => {
    const selected = item.id === selectedId;

    return (
      <Box key={item.id} sx={{ width: "100%" }}>
        <Button
          fullWidth
          onClick={() => selectInterview(item)}
          aria-pressed={selected}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1.5,
            px: 1.5,
            py: 1.25,
            mb: 0.75,
            borderRadius: 1,
            border: selected
              ? `1px solid ${item.accent}`
              : "1px solid rgba(24, 56, 43, 0.08)",
            backgroundColor: selected ? item.tint : "#ffffff",
            color: "#173f34",
            textTransform: "none",
            boxShadow: selected ? "0 8px 20px rgba(22, 62, 45, 0.06)" : "none",
            transition: "all 180ms ease",
            "&:hover": {
              backgroundColor: selected ? item.tint : "#f4f8f4",
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1.25}
            sx={{ alignItems: "center", minWidth: 0 }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: 1,
                display: "grid",
                placeItems: "center",
                color: item.accent,
                backgroundColor: item.tint,
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {item.kind === "company" ? (
                <BusinessCenterOutlinedIcon fontSize="small" />
              ) : (
                <ArticleOutlinedIcon fontSize="small" />
              )}
            </Box>
            <Box sx={{ textAlign: "left", minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 750,
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.kind === "company" && getItemQuestionCount(item)
                  ? `${getItemQuestionCount(item)} questions`
                  : "PDF resource"}
              </Typography>
            </Box>
          </Stack>

          {item.number && (
            <Typography
              variant="caption"
              sx={{ color: item.accent, fontWeight: 800 }}
            >
              {item.number}
            </Typography>
          )}
        </Button>
      </Box>
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

        {selectedItem && pdfUrl ? (
          <Grid container spacing={2} sx={{ alignItems: "flex-start" }}>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Box
                sx={{
                  position: { xs: "relative", lg: "sticky" },
                  top: { lg: 16 },
                  height: { xs: "42vh", lg: "75vh" },
                  maxHeight: { xs: "42vh", lg: "75vh" },
                  overflowY: "auto",
                  pr: 0.5,
                  pb: 1,
                  scrollbarWidth: "thin",
                  scrollbarColor: "#a7b9aa transparent",
                  "&::-webkit-scrollbar": { width: 8 },
                  "&::-webkit-scrollbar-thumb": {
                    borderRadius: 8,
                    backgroundColor: "#a7b9aa",
                  },
                }}
              >
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
                        Questions Asked by Companies
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
                    sx={{ mb: 1.5 }}
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

                {visibleCompanies.length === 0 &&
                  visibleDocuments.length === 0 && (
                    <Box sx={{ py: 6, textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        sx={{ color: "#173f34", fontWeight: 750 }}
                      >
                        No matching interviews
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        Try another company name or clear your search.
                      </Typography>
                    </Box>
                  )}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, lg: 8 }}>
              <Box
                id="company-document-viewer"
                component="section"
                aria-labelledby="selected-interview-title"
                sx={{
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
                      sx={{
                        color: "#173f34",
                        fontWeight: 800,
                        lineHeight: 1.2,
                      }}
                    >
                      {selectedItem.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.4 }}
                    >
                      {selectedItem.subtitle}
                      {selectedItem.kind === "company" && actualQuestionCount
                        ? ` · ${actualQuestionCount} questions`
                        : selectedItem.kind === "company" &&
                            selectedItem.questionCount
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

                {selectedItem.kind === "document" && (
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
                      onLoadSuccess={({ numPages }) =>
                        setPdfPageCount(numPages)
                      }
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
                          This PDF could not be opened. Use “Open PDF” to try
                          your browser’s viewer.
                        </Typography>
                      }
                    >
                      <Stack
                        spacing={2}
                        sx={{ width: "100%", alignItems: "center" }}
                      >
                        {Array.from({ length: pdfPageCount }, (_, index) => (
                          <Page
                            key={`${selectedItem.fileName}-${index + 1}`}
                            pageNumber={index + 1}
                            width={pageWidth}
                            renderTextLayer
                            renderAnnotationLayer
                            loading={<CircularProgress sx={{ m: 8 }} />}
                            canvasBackground="#ffffff"
                            className="company-pdf-page"
                          />
                        ))}
                      </Stack>
                    </Document>
                  </Box>
                )}

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
                      selectedItem.kind !== "company" ||
                      selectedCompanyIndex <= 0
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
                    {selectedItem.kind === "document" && pdfPageCount > 0 && (
                      <Typography
                        variant="body2"
                        sx={{
                          minWidth: 112,
                          textAlign: "center",
                          fontWeight: 700,
                        }}
                      >
                        {pdfPageCount} pages · Scroll to read
                      </Typography>
                    )}
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
                    aria-label="Interview questions"
                    sx={{
                      p: { xs: 2, sm: 3 },
                      borderTop: "1px solid rgba(24, 56, 43, 0.1)",
                    }}
                  >
                    {!questionsLoading &&
                      !questionsError &&
                      interviewQuestions.length > 0 && (
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mb: 1.25, justifyContent: "space-between" }}
                        >
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ alignSelf: "center" }}
                          >
                            {interviewQuestions.length} questions
                          </Typography>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              setShowAllQuestions((showing) => !showing)
                            }
                            sx={{ textTransform: "none", whiteSpace: "nowrap" }}
                          >
                            {showAllQuestions
                              ? "Hide all questions"
                              : "Show all questions"}
                          </Button>
                        </Stack>
                      )}

                    {showAllQuestions &&
                      !questionsLoading &&
                      !questionsError &&
                      interviewQuestions.length > 0 && (
                        <Paper
                          variant="outlined"
                          aria-label="All company questions"
                          sx={{
                            mb: 1.25,
                            p: 1,
                            maxHeight: 340,
                            overflowY: "auto",
                            borderRadius: 1,
                            borderColor: "rgba(35, 66, 50, 0.16)",
                            boxShadow: "none",
                          }}
                        >
                          <Stack spacing={0.5}>
                            {interviewQuestions.map((question, index) => (
                              <Button
                                key={question.id}
                                fullWidth
                                variant={
                                  index === safeCurrentQuestionIndex
                                    ? "contained"
                                    : "text"
                                }
                                onClick={() => moveToQuestion(index)}
                                sx={{
                                  justifyContent: "flex-start",
                                  alignItems: "flex-start",
                                  gap: 1,
                                  px: 1.25,
                                  py: 1,
                                  color:
                                    index === safeCurrentQuestionIndex
                                      ? "#ffffff"
                                      : "#1c2b24",
                                  textAlign: "left",
                                  textTransform: "none",
                                  whiteSpace: "normal",
                                  lineHeight: 1.5,
                                  backgroundColor:
                                    index === safeCurrentQuestionIndex
                                      ? "#27745e"
                                      : "transparent",
                                  "&:hover": {
                                    backgroundColor:
                                      index === safeCurrentQuestionIndex
                                        ? "#1f604d"
                                        : "#f1f6f0",
                                  },
                                }}
                              >
                                <Box
                                  component="span"
                                  sx={{ flexShrink: 0, fontWeight: 800 }}
                                >
                                  {index + 1}.
                                </Box>
                                <Box component="span">{question.text}</Box>
                              </Button>
                            ))}
                          </Stack>
                        </Paper>
                      )}

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
                              Question {safeCurrentQuestionIndex + 1} of{" "}
                              {actualQuestionCount || interviewQuestions.length}
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
                              answers[currentQuestion.id]
                                ? "outlined"
                                : "contained"
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
                            onClick={() =>
                              void toggleSimpleAnswer(currentQuestion)
                            }
                            sx={{
                              flexShrink: 0,
                              alignSelf: { xs: "flex-start", sm: "center" },
                              whiteSpace: "nowrap",
                              textTransform: "none",
                              ...(answers[currentQuestion.id]
                                ? {}
                                : {
                                    backgroundColor: "#27745e",
                                    boxShadow: "none",
                                    "&:hover": {
                                      backgroundColor: "#1f604d",
                                      boxShadow: "none",
                                    },
                                  }),
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

                        <Collapse
                          in={expandedQuestionId === currentQuestion.id}
                        >
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
                                      {
                                        answers[currentQuestion.id]
                                          .interviewAnswer
                                      }
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
                                        sx={{
                                          color: "#9a671d",
                                          fontWeight: 800,
                                        }}
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
                                      borderTop:
                                        "1px solid rgba(35, 66, 50, 0.12)",
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
                      </Paper>
                    )}
                    {!questionsLoading &&
                      !questionsError &&
                      currentQuestion && (
                        <Paper
                          variant="outlined"
                          sx={{
                            mt: 1.25,
                            p: { xs: 1.5, sm: 2 },
                            borderRadius: 1,
                            borderColor: "rgba(35, 66, 50, 0.16)",
                            backgroundColor: "#f7faf6",
                            boxShadow: "none",
                          }}
                        >
                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1.25}
                            sx={{
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ fontWeight: 700 }}
                            >
                              Question {safeCurrentQuestionIndex + 1} of{" "}
                              {actualQuestionCount || interviewQuestions.length}
                              <Box
                                component="span"
                                sx={{ ml: 1, fontWeight: 400 }}
                              >
                                · No. {currentQuestion.number}
                              </Box>
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={1}
                              sx={{ width: { xs: "100%", sm: "auto" } }}
                            >
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<KeyboardArrowLeftIcon />}
                                disabled={
                                  safeCurrentQuestionIndex === 0 ||
                                  loadingAnswerId !== null
                                }
                                onClick={() =>
                                  moveToQuestion(safeCurrentQuestionIndex - 1)
                                }
                                sx={{
                                  flex: { xs: 1, sm: "0 0 auto" },
                                  textTransform: "none",
                                }}
                              >
                                Previous
                              </Button>
                              <Button
                                size="small"
                                variant="contained"
                                endIcon={<KeyboardArrowRightIcon />}
                                disabled={
                                  safeCurrentQuestionIndex >=
                                    interviewQuestions.length - 1 ||
                                  loadingAnswerId !== null
                                }
                                onClick={() =>
                                  moveToQuestion(safeCurrentQuestionIndex + 1)
                                }
                                sx={{
                                  flex: { xs: 1, sm: "0 0 auto" },
                                  textTransform: "none",
                                  whiteSpace: "nowrap",
                                  backgroundColor: "#27745e",
                                  boxShadow: "none",
                                  "&:hover": {
                                    backgroundColor: "#1f604d",
                                    boxShadow: "none",
                                  },
                                }}
                              >
                                Next question
                              </Button>
                            </Stack>
                          </Stack>
                        </Paper>
                      )}
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        ) : (
          <>
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
                    Questions Asked by Companies
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
                <Typography
                  variant="h6"
                  sx={{ color: "#173f34", fontWeight: 750 }}
                >
                  No matching interviews
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  Try another company name or clear your search.
                </Typography>
              </Box>
            )}
          </>
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
