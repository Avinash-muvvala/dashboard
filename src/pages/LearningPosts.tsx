import { useMemo, useState, type ReactElement } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QuizIcon from "@mui/icons-material/Quiz";
import MapIcon from "@mui/icons-material/Map";
import BusinessIcon from "@mui/icons-material/Business";
import { useNavigate } from "react-router-dom";

type CategoryType =
  | "Java"
  | "Spring Boot"
  | "React"
  | "HTML/CSS"
  | "Database"
  | "Full Stack";
type PostKind = "Topics" | "Questions" | "Guide";

interface Post {
  title: string;
  description: string;
  category: CategoryType;
  kind: PostKind;
  route: string;
}

// ✅ Add / remove posts here only — the UI updates automatically.
const posts: Post[] = [
  {
    title: "Java Important Topics Posts",
    description: "Core concepts, reference diagrams and key interview topics.",
    category: "Java",
    kind: "Topics",
    route: "/JavaImpTopicsPage",
  },
  {
    title: "Spring Boot Posts",
    description: "Core concepts, reference diagrams and key interview topics.",
    category: "Spring Boot",
    kind: "Topics",
    route: "/SpringBootPage",
  },
  {
    title: "HTML / JavaScript Posts",
    description: "Core concepts and reference diagrams for HTML, CSS and JS.",
    category: "HTML/CSS",
    kind: "Topics",
    route: "/HtmlCss",
  },
  {
    title: "React Posts",
    description: "Core concepts and reference diagrams for React.",
    category: "React",
    kind: "Topics",
    route: "/ReactPosts",
  },
  // {
  //   title: "Java Questions",
  //   description:
  //     "Core Java, Spring Boot, Hibernate and microservices questions.",
  //   category: "Java",
  //   kind: "Questions",
  //   route: "/JavaImpQuestions",
  // },
  // {
  //   title: "React Questions",
  //   description: "The most frequently asked React interview questions.",
  //   category: "React",
  //   kind: "Questions",
  //   route: "/ReactImpQuestions",
  // },
  // {
  //   title: "Java Guide",
  //   description:
  //     "Java basics, core Java, Spring Boot, Hibernate and microservices.",
  //   category: "Java",
  //   kind: "Guide",
  //   route: "/JavaBackendGuide",
  // },

  // {
  //   title: "React Guide",
  //   description:
  //     "JavaScript, React, advanced patterns and a deployment roadmap.",
  //   category: "React",
  //   kind: "Guide",
  //   route: "/react-guide",
  // },
  // {
  //   title: "Questions Asked by Companies",
  //   description: "Browse interview question PDFs company by company.",
  //   category: "Full Stack",
  //   kind: "Questions",
  //   route: "/CompanyQuestions",
  // },
  {
    title: "SQL Interview Practice",
    description:
      "Write queries for common interview questions and get instant feedback.",
    category: "Database",
    kind: "Questions",
    route: "/sql-practice",
  },
];

const categories: ("All" | CategoryType)[] = [
  "All",
  "Java",
  "Spring Boot",
  "React",
  "HTML/CSS",
  "Database",
];

const categoryColors: Record<CategoryType, string> = {
  Java: "#007396",
  "Spring Boot": "#2e7d32",
  React: "#0277bd",
  "HTML/CSS": "#e65100",
  Database: "#6a1b9a",
  "Full Stack": "#0277bd",
};

const kindIcons: Record<PostKind, ReactElement> = {
  Topics: <MenuBookIcon fontSize="small" />,
  Questions: <QuizIcon fontSize="small" />,
  Guide: <MapIcon fontSize="small" />,
};

const LearningPosts = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<"All" | CategoryType>("All");
  const [search, setSearch] = useState("");

  const countFor = (c: "All" | CategoryType) =>
    c === "All" ? posts.length : posts.filter((p) => p.category === c).length;

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (!term ||
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)),
    );
  }, [category, search]);

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 0.5, fontSize: "1rem" }}
      >
        Learning Posts
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
        Pick a category, then open the post you need.
      </Typography>

      {/* Search */}
      <TextField
        size="small"
        fullWidth
        placeholder="Search posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 1.5, backgroundColor: "#fff", borderRadius: 1 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Category filter */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        {categories.map((c) => {
          const active = category === c;
          const color = c === "All" ? "#1565c0" : categoryColors[c];
          return (
            <Chip
              key={c}
              label={`${c} (${countFor(c)})`}
              onClick={() => setCategory(c)}
              variant={active ? "filled" : "outlined"}
              sx={{
                fontWeight: 700,
                height: 32,
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

      {/* Post cards */}
      {filtered.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No posts match your search. Try a different keyword or category.
        </Typography>
      ) : (
        <Grid container spacing={1.5}>
          {filtered.map((post) => {
            const color = categoryColors[post.category];
            return (
              <Grid key={post.route} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    borderLeft: `5px solid ${color}`,
                    border: "1px solid rgba(15, 23, 42, 0.12)",
                    borderLeftWidth: 5,
                    borderLeftColor: color,
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
                    transition: "box-shadow 0.2s ease",
                    "&:hover": {
                      boxShadow: "0 14px 32px rgba(15, 23, 42, 0.14)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(post.route)}
                    sx={{ height: "100%", alignItems: "flex-start" }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Chip
                          label={post.category}
                          size="small"
                          sx={{
                            backgroundColor: color,
                            color: "#fff",
                            fontWeight: 700,
                          }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            color: "text.secondary",
                          }}
                        >
                          {post.route === "/CompanyQuestions" ? (
                            <BusinessIcon fontSize="small" />
                          ) : (
                            kindIcons[post.kind]
                          )}
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 600 }}
                          >
                            {post.kind}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, mb: 0.5 }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.45 }}
                      >
                        {post.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default LearningPosts;
