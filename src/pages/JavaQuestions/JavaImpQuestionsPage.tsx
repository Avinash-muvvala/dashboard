import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const pdfMap: Record<string, { label: string; file: string }> = {
  CoreJava: { label: "Core Java", file: "/pdfs/Java_Interview_Questions.pdf" },
  DesignPatterns: {
    label: "Design Patterns",
    file: "/pdfs/DesginPatterns.pdf",
  },
  SpringBoot: { label: "Spring / Spring Boot", file: "/pdfs/SpringBoot.pdf" },
  Hibernate: {
    label: "Hibernate / JPA",
    file: "/pdfs/Java_Interview_Questions.pdf",
  },
  Microservices: {
    label: "Microservices",
    file: "/pdfs/Microservices_Interview_Questions_Organized.pdf",
  },
  SpringSecurity: {
    label: "SpringSecurity",
    file: "/pdfs/SpringSecurity.pdf",
  },
  Debugging: {
    label: "Debugging",
    file: "/pdfs/debugging.pdf",
  },
};
const JavaImpQuestionsPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const current = pdfMap[topic ?? ""] ?? null;

  if (!current)
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Topic not found.</Typography>
      </Box>
    );

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1.5,
          borderBottom: "1px solid rgba(15,23,42,0.1)",
        }}
      >
        <IconButton onClick={() => navigate("/JavaImpQuestions")} size="small">
          <ArrowBackIcon fontSize="small" />
        </IconButton>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {current.label}
        </Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <iframe
          src={current.file}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title={current.label}
        />
      </Box>
    </Box>
  );
};

export default JavaImpQuestionsPage;
