import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Chip,
  LinearProgress,
  Collapse,
  IconButton,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import LockIcon from "@mui/icons-material/Lock";
import BugReportIcon from "@mui/icons-material/BugReport";
import CloudIcon from "@mui/icons-material/Cloud";
import ApiIcon from "@mui/icons-material/Api";
import { useNavigate } from "react-router-dom";

const phases = [
  {
    phase: "1A",
    topic: "Java Fundamentals - Part 1",
    weeks: "Week 1",
    color: "#556FFF",
    topics: [
     "Variables and Data Types",
      "Primitive vs Reference Types",
      "Operators and Expressions",
      "Type Casting",
      "Wrapper Classes",
      "Autoboxing and Unboxing",
      "Methods",
      "Parameters and Return Types",
    ],
  },
  {
    phase: "1B",
    topic: "Java Fundamentals - Part 2",
    weeks: "Week 2",
    color: "#4A60E6",
    topics: [
        "Strings",
      "StringBuilder",
      "StringBuffer",
      "Enums",
      "if/else",
      "switch-case",
      "Loops",
      "Arrays",
      "Multi-dimensional Arrays",
    ],
  },
  {
    phase: "1C",
    topic: "Object-Oriented Programming - Part 1",
    weeks: "Week 3",
    color: "#3F51CC",
    topics: [
      "Classes and Objects",
      "Constructors",
      "Constructor Chaining",
      "Encapsulation",
      "Getters and Setters",
      "Static Keyword",
      "Final Keyword",
      "Immutable Objects",
    ],
  },
  {
    phase: "1D",
    topic: "Object-Oriented Programming - Part 2",
    weeks: "Week 4",
    color: "#3442B3",
    topics: [
      "Inheritance",
      "Composition vs Inheritance",
      "Polymorphism",
      "Abstract Classes",
      "Interfaces",
      "Access Modifiers",
      "Object Class",
      "equals(), hashCode(), toString()",
    ],
  },
    {
    phase: "1E",
    topic: "Collections Framework - Part 1",
    weeks: "Week 5",
    color: "#3442B3",
    topics: [
      "Generics",
      "Collection Framework Overview",
      "List Interface",
      "ArrayList",
      "LinkedList",
      "Set Interface",
      "HashSet",
      "TreeSet",
    ],
  },
    {
    phase: "1F",
    topic: "Collections Framework - Part 2",
    weeks: "Week 6",
    color: "#3442B3",
    topics: [
        "Map Interface",
      "HashMap",
      "TreeMap",
      "HashMap Internals",
      "Queue",
      "Deque",
      "Comparable",
      "Comparator",
      "ConcurrentHashMap",
    ],
  },
    {
    phase: "1G",
    topic: "Exception Handling & JVM",
    weeks: "Week 7",
    color: "#3442B3",
    topics: [
      "Exception Handling",
      "Checked vs Unchecked Exceptions",
      "Custom Exceptions",
      "Exception Chaining",
      "Try-with-resources",
      "JVM Architecture",
      "Heap vs Stack",
      "Garbage Collection",
    ],
  },
    {
    phase: "1H",
    topic: "Object-Oriented Programming - Part 2",
    weeks: "Week 8",
    color: "#3442B3",
    topics: [
       "Lambda Expressions",
      "Functional Interfaces",
      "Method References",
      "Stream API",
      "Optional",
      "Multithreading Basics",
      "Thread Lifecycle",
      "Synchronization",
    ],
  },
  {
    phase: "2",
    topic: "Dev Environment & Tools",
    weeks: "Week 9",
    color: "#7B61FF",
    topics: [
      "IntelliJ IDEA setup, essential navigation, and debugging shortcuts",
      "Maven vs Gradle: Build lifecycle, dependency management, and pom.xml",
      "Git workflows: init, clone, commit, push, branching, merging, and PRs",
      "Docker basics: Why containers? Running a local DB container (PostgreSQL/MySQL)",
    ],
  },
  {
    phase: "3",
    topic: "Spring Core & Spring Boot",
    weeks: "Weeks 10",
    color: "#0EA5E9",
    topics: [
      "Inversion of Control (IoC) container and Dependency Injection (DI)",
      "Spring Beans, Bean Scopes (Singleton, Prototype), and ApplicationContext",
      "Spring Boot Auto-configuration magic (@SpringBootApplication breakdown)",
      "Profiles (@Profile) and externalized configuration (application.properties/yml)",
    ],
  },
  {
    phase: "4",
    topic: "Building REST APIs",
    weeks: "Weeks 11",
    color: "#10B981",
    topics: [
      "RESTful principles, Controllers (@RestController), Routing, and Request Mappings",
      "DTO Pattern (Data Transfer Objects) and Input Validation using Bean Validation annotations",
      "Global Exception Handling using @ControllerAdvice and @ExceptionHandler",
      "Interactive API documentation using Swagger UI / OpenAPI",
    ],
  },
  {
    phase: "5",
    topic: "Data Persistence (Database Layer)",
    weeks: "Weeks 12",
    color: "#F59E0B",
    topics: [
      "Spring Data JPA, Hibernate ORM, and Mapping Entities (@Entity, @Id)",
      "Defining Entity Relationships: @OneToMany, @ManyToOne, @ManyToMany",
      "Writing derived query methods and custom JPQL/Native queries",
      "Database schema versioning using Flyway or Liquibase migrations",
      "Identifying and fixing the N+1 select problem",
    ],
  },
  {
    phase: "6",
    topic: "Spring Security & Auth",
    weeks: "Week 13",
    color: "#EF4444",
    topics: [
      "Architecture of the Spring Security Filter Chain",
      "Implementing JWT (JSON Web Token) Authentication Flow",
      "Role-Based Access Control (RBAC) using @PreAuthorize",
      "Conceptual understanding of OAuth2 and Social Logins",
    ],
  },
  {
    phase: "7",
    topic: "Testing & Production Deployment",
    weeks: "Weeks 14",
    color: "#8B5CF6",
    topics: [
      "Writing unit tests using JUnit 5 and mocking dependencies with Mockito",
      "Writing slice/integration tests using @SpringBootTest and Testcontainers",
      "Dockerizing the Spring Boot application using a multi-stage Dockerfile",
      "Automating the build and test pipeline using GitHub Actions (CI/CD)",
    ],
  },
];

const skillCards = [
  {
    icon: <CodeIcon />,
    label: "Clean, object-oriented Java code and design patterns",
  },
  {
    icon: <ApiIcon />,
    label: "RESTful APIs with Spring Boot, validation and error handling",
  },
  {
    icon: <StorageIcon />,
    label: "Spring Data JPA, Hibernate, and database migrations",
  },
  {
    icon: <LockIcon />,
    label: "JWT auth, Spring Security, OAuth2 integration",
  },
  {
    icon: <BugReportIcon />,
    label: "Unit and integration testing with JUnit and Mockito",
  },
  {
    icon: <CloudIcon />,
    label: "Docker containers and cloud deployment pipelines",
  },
];

const JavaBackendGuide = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleExpand = (phase: string) =>
    setExpanded((prev) => (prev === phase ? null : phase));

  const toggleComplete = (phase: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(phase)) {
        next.delete(phase);
      } else {
        next.add(phase);
      }
      return next;
    });
  };

  const progress = Math.round((completed.size / phases.length) * 100);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        py: { xs: 4, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1120,
          mx: "auto",
          backgroundColor: "#ffffff",
          borderRadius: 4,
          boxShadow: "0 24px 80px rgba(15,23,42,0.10)",
          p: { xs: 3, md: 5 },
        }}
      >
        {/* Header Section - Back Button & Title on Right */}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          {/* Left: Chip Badge */}
          <Chip
            label="Spring Boot Roadmap"
            size="small"
            sx={{
              backgroundColor: "rgba(85,111,255,0.10)",
              color: "#556FFF",
              fontWeight: 600,
              fontSize: 12,
            }}
          />

          {/* Right: Title & Back Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginLeft: "auto",
            }}
          >
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 0 }}>
                Java Backend Guide
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
                whiteSpace: "nowrap",
                "&:hover": {
                  borderColor: "primary.main",
                  color: "primary.main",
                  backgroundColor: "action.hover",
                },
              }}
            >
              Back
            </Button>
          </Box>
        </Box>

        {/* Subtitle */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 680, lineHeight: 1.8 }}
          >
            From Java fundamentals to production-ready microservices. Expand
            each phase, explore topics, and mark phases complete as you
            progress.
          </Typography>
        </Box>

        {/* Stats Row */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            { label: "Total weeks", value: "12" },
            { label: "Phases", value: phases.length },
            { label: "Phases done", value: completed.size },
            { label: "Progress", value: `${progress}%` },
          ].map((s) => (
            <Grid key={s.label} size={{ xs: 6, sm: 4, md: 3 }}>
              <Box
                sx={{
                  backgroundColor: "rgba(85,111,255,0.05)",
                  borderRadius: 3,
                  p: 2,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "#556FFF" }}
                >
                  {s.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {s.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Progress Bar */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 0.5,
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Your progress
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "#556FFF" }}
            >
              {progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 6,
              borderRadius: 99,
              backgroundColor: "rgba(85,111,255,0.12)",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#556FFF",
                borderRadius: 99,
              },
            }}
          />
        </Box>

        <Divider sx={{ mb: 4, borderColor: "rgba(15,23,42,0.08)" }} />

        {/* Info Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            {
              title: "Who is this for?",
              items: [
                "Aspiring backend developers",
                "Frontend devs going full-stack",
                "Computer science students",
                "Developers switching to Java",
              ],
            },
            {
              title: "Prerequisites",
              items: [
                "Basic programming concepts",
                "HTTP & client-server model",
                "JDK installed locally",
                "Willingness to read docs",
              ],
            },
            {
              title: "What you'll gain",
              items: [
                "RESTful API design skills",
                "Spring Boot proficiency",
                "Auth & security patterns",
                "Docker & cloud deployment",
              ],
            },
          ].map((card) => (
            <Grid key={card.title} size={{ xs: 12, sm: 4, md: 3 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  height: "100%",
                  boxShadow: "none",
                  border: "1.5px solid rgba(15,23,42,0.08)",
                  transition: "transform .18s, box-shadow .18s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(15,23,42,0.07)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    {card.title}
                  </Typography>
                  <List dense disablePadding>
                    {card.items.map((item) => (
                      <ListItem key={item} disablePadding sx={{ py: 0.2 }}>
                        <ListItemText
                          primary={item}
                          slotProps={{
                            primary: {
                              style: { fontSize: 13, color: "inherit" },
                            },
                          }}
                          sx={{ color: "text.secondary" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Phase Schedule */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Phase Schedule
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Click any phase to expand details. Mark phases complete to track your
          progress.
        </Typography>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {phases.map((r) => {
            const isExpanded = expanded === r.phase;
            const isDone = completed.has(r.phase);

            return (
              <Grid key={r.phase} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "none",
                    border: isExpanded
                      ? `2px solid ${r.color}`
                      : "1.5px solid rgba(15,23,42,0.08)",
                    transition: "border .18s, transform .18s, box-shadow .18s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
                    },
                    opacity: isDone ? 0.75 : 1,
                  }}
                >
                  <CardContent sx={{ pb: "12px !important" }}>
                    {/* Phase Header */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        cursor: "pointer",
                      }}
                      onClick={() => toggleExpand(r.phase)}
                    >
                      <Box
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          backgroundColor: isDone ? r.color : `${r.color}18`,
                          color: isDone ? "#fff" : r.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 15,
                          flexShrink: 0,
                          transition: "background .2s, color .2s",
                        }}
                      >
                        {isDone ? (
                          <CheckCircleIcon sx={{ fontSize: 20 }} />
                        ) : (
                          r.phase
                        )}
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700 }}
                        >
                          {r.topic}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {r.topics.length} Topics • {r.weeks}
                        </Typography>
                      </Box>

                      <IconButton size="small" sx={{ color: "text.secondary" }}>
                        {isExpanded ? (
                          <ExpandLessIcon fontSize="small" />
                        ) : (
                          <ExpandMoreIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Box>

                    {/* Expandable Topics */}
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box
                        sx={{
                          mt: 1.5,
                          pt: 1.5,
                          borderTop: "1px solid rgba(15,23,42,0.07)",
                          pl: 0.5,
                        }}
                      >
                        <List dense disablePadding>
                          {r.topics.map((t) => (
                            <ListItem key={t} disablePadding sx={{ py: 0.3 }}>
                              <Box
                                sx={{
                                  width: 5,
                                  height: 5,
                                  borderRadius: "50%",
                                  backgroundColor: r.color,
                                  mr: 1.2,
                                  flexShrink: 0,
                                  mt: "1px",
                                }}
                              />
                              <ListItemText
                                primary={t}
                                slotProps={{
                                  primary: {
                                    style: { fontSize: 13, color: "inherit" },
                                  },
                                }}
                                sx={{ color: "text.secondary" }}
                              />
                            </ListItem>
                          ))}
                        </List>

                        <Tooltip
                          title={
                            isDone ? "Click to unmark" : "Mark as complete"
                          }
                        >
                          <Box
                            sx={{
                              mt: 2,
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button onClick={() => toggleComplete(r.phase)}>
                              {isDone ? "Completed" : "Mark Complete"}
                            </Button>
                          </Box>
                        </Tooltip>
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Skills You'll Build */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Skills you'll build
        </Typography>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {skillCards.map((s) => (
            <Grid key={s.label} size={{ xs: 12, sm: 4, md: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 3,
                  backgroundColor: "rgba(85,111,255,0.04)",
                  border: "1px solid rgba(85,111,255,0.10)",
                }}
              >
                <Box
                  sx={{
                    color: "#556FFF",
                    mt: 0.2,
                    "& svg": { fontSize: 20 },
                  }}
                >
                  {s.icon}
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {s.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* CTA */}
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            onClick={() => navigate("/study-plan")}
            variant="contained"
            size="large"
            sx={{
              px: 5,
              py: 1.6,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              backgroundColor: "#556FFF",
              boxShadow: "0 8px 20px rgba(85,111,255,0.20)",
              "&:hover": {
                backgroundColor: "#4055e0",
                boxShadow: "0 14px 32px rgba(85,111,255,0.28)",
                transform: "translateY(-2px)",
              },
              transition: "all .16s",
            }}
          >
            Start learning
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 5,
              py: 1.6,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
              borderColor: "rgba(85,111,255,0.4)",
              color: "#556FFF",
              "&:hover": {
                borderColor: "#556FFF",
                backgroundColor: "rgba(85,111,255,0.05)",
              },
              transition: "all .16s",
            }}
          >
            View resources
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JavaBackendGuide;
