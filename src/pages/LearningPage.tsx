import { Box, Button, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import LearningPosts from "./LearningPosts";

const LearningPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
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
          Back to dashboard
        </Button>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 0.5,
            fontSize: { xs: "1.45rem", sm: "1.8rem" },
          }}
        >
          Learning Posts
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Java, Spring Boot, React and HTML/CSS topics, questions and guides in
          one place.
        </Typography>

        <LearningPosts />
      </Box>
    </Container>
  );
};

export default LearningPage;
