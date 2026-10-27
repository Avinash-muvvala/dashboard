import { useNavigate } from "react-router-dom";
import { Box, Card, Typography, Chip, Button, Grid } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const topics = [
  {
    title: "ReactJs",
    subtitle: "Repeated Questions",
    description: "react",
    tags: ["Most"],
    icon: <CodeIcon sx={{ fontSize: 20, color: "#0284c7" }} />,
    iconBg: "rgba(2, 132, 199, 0.08)",
    tagBg: "rgba(2, 132, 199, 0.06)",
    tagColor: "#38bdf8",
    route: "/ReactImpQuestionsPage/ReactJs",
  },
  {
    title: "HTML & CSS & JavaScrpit",
    subtitle: "HTML & CSS & JavaScrpit",
    description: "HTML & CSS & JavaScrpit",
    tags: ["Most"],
    icon: <CodeIcon sx={{ fontSize: 20, color: "#0284c7" }} />,
    iconBg: "rgba(2, 132, 199, 0.08)",
    tagBg: "rgba(2, 132, 199, 0.06)",
    tagColor: "#38bdf8",
    route: "/ReactImpQuestionsPage/HTML",
  },
];

const ReactImpQuestions = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxW: "1280px", margin: "0 auto" }}>
      {/* Action Header bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, letterSpacing: "-0.02em", mb: 0.5 }}
          >
            React Important Questions
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", opacity: 0.8 }}
          >
            Select a core domain path to start studying
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/Dashboard")}
          sx={{
            borderRadius: "10px",
            textTransform: "none",
            borderColor: "divider",
            color: "text.secondary",
            fontWeight: 600,
            px: 2.5,
            py: 1,
            "&:hover": {
              borderColor: "primary.main",
              color: "primary.main",
              backgroundColor: "action.hover",
            },
          }}
        >
          Back to Dashboard
        </Button>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 2, fontWeight: 600 }}
        >
          Back
        </Button>
      </Box>

      {/* Topics Grid */}
      <Grid container spacing={3}>
        {topics.map((topic) => (
          <Grid
            size={{ xs: 12, md: 6 }}
            key={topic.title}
            sx={{ display: "flex" }}
          >
            <Card
              onClick={() => navigate(topic.route)}
              sx={{
                width: "100%",
                cursor: "pointer",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
                borderRadius: "16px",
                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                backgroundColor: "background.paper",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  borderColor: "primary.main",
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 20px -10px rgba(0,0,0,0.15)",
                },
              }}
            >
              <Box>
                {/* Header Section */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: "12px",
                      backgroundColor: topic.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {topic.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {topic.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        display: "block",
                        mt: 0.25,
                      }}
                    >
                      {topic.subtitle}
                    </Typography>
                  </Box>
                </Box>

                {/* Description Text */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    mb: 3,
                    lineHeight: 1.6,
                    minHeight: "48px", // Keeps text boxes visually aligned
                  }}
                >
                  {topic.description}
                </Typography>
              </Box>

              {/* Tags Container */}
              <Box
                sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: "auto" }}
              >
                {topic.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: topic.tagBg,
                      color: topic.tagColor,
                      fontWeight: 600,
                      fontSize: "11px",
                      borderRadius: "6px",
                      height: 24,
                      border: "none",
                    }}
                  />
                ))}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ReactImpQuestions;
