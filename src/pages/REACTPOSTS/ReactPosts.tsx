import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TerminalIcon from "@mui/icons-material/Terminal";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { ReactTopics } from "./ReactTopicsData";
import { ReactPracticeQuestions } from "./ReactPracticeQuestions";

// Reusable Carousel sub-component to prevent cross-card index synchronization bugs
const TopicCardImage = ({
  topic,
}: {
  topic: {
    title: string;
    image?: string;
    description?: string;
    images?: string[];
  };
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Normalize image fields into a guaranteed uniform array layout format
  const items = Array.isArray(topic.images)
    ? topic.images
    : topic.image
      ? [topic.image]
      : [];
  const publicItems = items.map((item) => item.replace(/^public\//, "/"));

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (items.length === 0) return null;

  return (
    <Box
      sx={{
        overflow: "hidden",
        backgroundColor: "#eef2eb",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderBottom: "1px solid rgba(35, 66, 50, 0.12)",
      }}
    >
      <CardMedia
        component="img"
        image={publicItems[currentIndex]}
        alt={`${topic.title} visual display ${currentIndex + 1}`}
        className="topic-image"
        sx={{
          width: "100%",
          height: "auto",
          // --- CLARITY & SIZE ENHANCEMENTS ---
          maxHeight: { xs: 500, sm: 800 }, // Generous height budget for clear reading
          objectFit: "contain",
          imageRendering: "high-quality", // Browser engine tuning for cleaner text pixels
          transition: "transform 0.4s ease",
          p: { xs: 1, sm: 2 }, // Gentle padding keeps text away from the absolute borders
        }}
      />

      {/* Social Media Style Action: Open Original High-Res Link */}
      <Button
        href={publicItems[currentIndex]}
        target="_blank"
        rel="noopener noreferrer"
        endIcon={<OpenInNewIcon sx={{ fontSize: "0.85rem !important" }} />}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          backgroundColor: "rgba(255, 255, 255, 0.94)",
          color: "#26745a",
          fontSize: "0.85rem",
          fontWeight: 600,
          textTransform: "none",
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          border: "1px solid rgba(35, 66, 50, 0.15)",
          boxShadow: "0 4px 16px rgba(31, 62, 45, 0.12)",
          "&:hover": {
            backgroundColor: "#ffffff",
            color: "#174b38",
            borderColor: "#26745a",
          },
        }}
      >
        View Full Size
      </Button>

      {items.length > 1 && (
        <>
          {/* Left Arrow Controller */}
          <IconButton
            onClick={(e) => {
              handlePrev(e);
            }}
            sx={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              color: "#26745a",
              boxShadow: "0 4px 14px rgba(31, 62, 45, 0.14)",
              "&:hover": { backgroundColor: "#ffffff" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {/* Right Arrow Controller */}
          <IconButton
            onClick={(e) => {
              handleNext(e);
            }}
            sx={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.94)",
              color: "#26745a",
              boxShadow: "0 4px 14px rgba(31, 62, 45, 0.14)",
              "&:hover": { backgroundColor: "#ffffff" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>

          {/* Bottom Pagination Tracker Indicators */}
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
              backgroundColor: "rgba(28, 43, 36, 0.72)",
              px: 1.5,
              py: 0.6,
              borderRadius: 4,
            }}
          >
            {items.map((_: string, dotIdx: number) => (
              <Box
                key={dotIdx}
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor:
                    dotIdx === currentIndex
                      ? "#f0bd68"
                      : "rgba(255, 255, 255, 0.35)",
                  transition: "background-color 0.2s ease",
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

// Sub-component for managing the Read More / Read Less description state per item
const ExpandableDescription = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Cutoff length for social-media teaser text
  const characterLimit = 150;
  const shouldTruncate = text.length > characterLimit;

  const displayOriginalText =
    isExpanded || !shouldTruncate
      ? text
      : `${text.substring(0, characterLimit)}...`;

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          lineHeight: 1.7,
          whiteSpace: "pre-line",
          fontSize: { xs: "1.02rem", sm: "1.1rem", md: "1.15rem" },
          color: "#34483d",
          fontFamily: "var(--app-font)",
        }}
      >
        {displayOriginalText}
      </Typography>

      {shouldTruncate && (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{
            p: 0,
            mt: 1,
            textTransform: "none",
            fontWeight: 700,
            color: "#26745a",
            minWidth: "auto",
            fontSize: "1rem",
            "&:hover": {
              backgroundColor: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </Button>
      )}
    </Box>
  );
};

const ReactPosts = () => {
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(1);
  const [showPracticeQuestions, setShowPracticeQuestions] = useState(false);

  const scrollToDay = (day: number) => {
    setActiveDay(day);
    document.getElementById(`html-css-day-${day}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f1",
        backgroundImage:
          "radial-gradient(circle at 10% 0%, rgba(203, 222, 205, 0.42), transparent 34%), linear-gradient(135deg, #f4f6f1 0%, #fbfcf9 58%, #edf2eb 100%)",
        py: { xs: 2.5, md: 5 },
        px: { xs: 1.5, md: 3 },
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            mb: { xs: 2.5, md: 4 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: 2,
            background: "rgba(255, 255, 255, 0.94)",
            p: { xs: 1.5, sm: 2 },
            borderRadius: 1,
            border: "1px solid rgba(35, 66, 50, 0.14)",
            position: "sticky",
            top: { xs: 8, md: 16 },
            zIndex: 1100,
            boxShadow: "0 8px 24px rgba(31, 62, 45, 0.09)",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              backgroundColor: "#e7f1e9",
              color: "#26745a",
              px: { xs: 1, sm: 2 },
              py: 0.5,
              borderRadius: 1,
              fontWeight: 700,
              letterSpacing: 1,
              whiteSpace: "nowrap",
            }}
          >
            CONCEPTS
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2.5 },
              marginLeft: "auto",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<QuizOutlinedIcon />}
              onClick={() => setShowPracticeQuestions(true)}
              sx={{
                borderColor: "rgba(38, 116, 90, 0.38)",
                color: "#26745a",
                fontWeight: 700,
                whiteSpace: "nowrap",
                textTransform: "none",
              }}
            >
              Questions
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TerminalIcon
                sx={{ color: "#26745a", display: { xs: "none", sm: "block" } }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  color: "#1c2b24",
                  fontSize: { xs: "1.15rem", sm: "1.55rem", md: "1.8rem" },
                  whiteSpace: "nowrap",
                }}
              >
                REACT
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                backgroundColor: "#e7f1e9",
                color: "#26745a",
                fontWeight: 600,
                px: { xs: 1.25, sm: 2.5 },
                minWidth: "auto",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "#dcebe0",
                },
              }}
            >
              Back
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "220px minmax(0, 1fr)" },
            gap: { xs: 2, md: 3 },
            alignItems: "start",
          }}
        >
          <Box
            component="nav"
            aria-label="Study days"
            sx={{
              position: { md: "sticky" },
              top: { md: 104 },
              maxHeight: { md: "calc(100vh - 128px)" },
              overflowY: { md: "auto" },
              overflowX: "hidden",
              p: 1,
              borderRadius: 1,
              backgroundColor: "rgba(255, 255, 255, 0.84)",
              border: "1px solid rgba(35, 66, 50, 0.14)",
              boxShadow: "0 6px 20px rgba(31, 62, 45, 0.06)",
              scrollbarWidth: "thin",
            }}
          >
            <Typography
              sx={{
                px: 1.25,
                py: 1,
                color: "#58675f",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              Study days
            </Typography>
            <Box
              sx={{
                display: { xs: "flex", md: "block" },
                gap: 0.75,
                overflowX: { xs: "auto", md: "visible" },
                pb: { xs: 0.5, md: 0 },
              }}
            >
              {ReactTopics.map((_, index) => {
                const day = index + 1;

                return (
                  <Button
                    key={day}
                    onClick={() => scrollToDay(day)}
                    aria-current={activeDay === day ? "page" : undefined}
                    sx={{
                      justifyContent: "flex-start",
                      flexShrink: 0,
                      width: { xs: "auto", md: "100%" },
                      minWidth: { xs: 78, md: 0 },
                      px: 1.25,
                      py: 0.9,
                      borderRadius: 1.5,
                      color: activeDay === day ? "#174b38" : "#58675f",
                      backgroundColor:
                        activeDay === day ? "#dcebe0" : "transparent",
                      fontSize: "0.9rem",
                      fontWeight: activeDay === day ? 800 : 600,
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor:
                          activeDay === day
                            ? "#cce2d2"
                            : "rgba(38, 116, 90, 0.08)",
                      },
                    }}
                  >
                    Day {day}
                  </Button>
                );
              })}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 3, md: 5 },
            }}
          >
            {ReactTopics.map((topic, index) => (
              <Card
                key={index}
                id={`html-css-day-${index + 1}`}
                sx={{
                  borderRadius: 1,
                  background: "rgba(255, 255, 255, 0.96)",
                  border: "1px solid rgba(35, 66, 50, 0.13)",
                  boxShadow: "0 12px 32px rgba(31, 62, 45, 0.08)",
                  overflow: "hidden",
                  scrollMarginTop: { xs: 96, md: 112 },
                  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    borderColor: "rgba(38, 116, 90, 0.38)",
                    boxShadow: "0 18px 42px rgba(31, 62, 45, 0.13)",
                  },
                }}
              >
                <TopicCardImage topic={topic} />
                <CardContent
                  sx={{
                    p: { xs: 2.5, sm: 4 },
                    borderTop: "1px solid rgba(35, 66, 50, 0.1)",
                  }}
                >
                  <Typography
                    sx={{
                      mb: 2,
                      color: "#26745a",
                      fontSize: { xs: "1.4rem", sm: "1.7rem", md: "1.85rem" },
                      fontWeight: 800,
                    }}
                  >
                    Day {index + 1}: {topic.title}
                  </Typography>
                  <ExpandableDescription text={topic.description} />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
      <Dialog
        open={showPracticeQuestions}
        onClose={() => setShowPracticeQuestions(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            color: "#26745a",
            fontWeight: 800,
          }}
        >
          React Interview Questions
          <IconButton
            onClick={() => setShowPracticeQuestions(false)}
            aria-label="Close questions"
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {ReactTopics.map((topic, index) => {
            const questions = ReactPracticeQuestions[index + 1] ?? [];
            if (questions.length === 0) return null;

            return (
              <Box key={topic.title} sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#26745a", fontWeight: 800, mb: 1.5 }}
                >
                  Day {index + 1}: {topic.title}
                </Typography>
                {questions.map((item, questionIndex) => (
                  <Box key={`${item.question}-${questionIndex}`} sx={{ mb: 2 }}>
                    <Typography sx={{ color: "#1c2b24", fontWeight: 800 }}>
                      {questionIndex + 1}. {item.question}
                    </Typography>
                    <Typography sx={{ color: "#34483d", mt: 0.5 }}>
                      {item.answer}
                    </Typography>
                  </Box>
                ))}
                <Divider sx={{ mt: 2 }} />
              </Box>
            );
          })}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReactPosts;
