import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CodeIcon from "@mui/icons-material/Code";
import RouteIcon from "@mui/icons-material/Route";
import StorageIcon from "@mui/icons-material/Storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";

type PlanLength = 4 | 12 | 24;

type Phase = {
  id: number;
  title: string;
  summary: string;
  color: string;
  plan: Record<PlanLength, string>;
  objectives: string[];
  topics: string[];
  projects: string[];
  milestone: string;
  weeklySchedule?: { week: number; title: string; topics: string[] }[];
};

const phases: Phase[] = [
  {
    id: 1,
    title: "JavaScript Mastery",
    summary: "Build an unshakeable foundation for modern React.",
    color: "#f59e0b",
    plan: { 4: "Week 1", 12: "Weeks 1-3", 24: "Weeks 1-6" },
    objectives: [
      "Master ES6+ syntax and features",
      "Understand closures, scope, and the event loop",
      "Work fluently with arrays, objects, and destructuring",
      "Handle Promises, async/await, and modules",
    ],
    topics: [
      "let and const, arrow functions, template literals",
      "Default parameters and spread/rest operators",
      "Destructuring, map, filter, reduce, and object methods",
      "Optional chaining and nullish coalescing",
      "Callbacks, Promises, async/await, and Fetch API",
      "ES modules, npm, package.json, and Vite",
    ],
    projects: ["JavaScript task manager", "Async weather dashboard"],
    milestone: "Build both projects with clean JavaScript and responsive UI.",
    weeklySchedule: [
      {
        week: 1,
        title: "Modern JavaScript Syntax",
        topics: [
          "let and const",
          "Arrow functions",
          "Template literals",
          "Default parameters",
          "Spread and rest operators",
        ],
      },
      {
        week: 2,
        title: "Working with Data",
        topics: [
          "Destructuring arrays and objects",
          "Array methods: map, filter, and reduce",
          "Object methods",
          "Optional chaining",
          "Nullish coalescing",
        ],
      },
      {
        week: 3,
        title: "Functions, Scope, and Closures",
        topics: [
          "Function declarations and expressions",
          "Lexical scope",
          "Closures",
          "The this keyword",
          "Arrow functions and this",
        ],
      },
      {
        week: 4,
        title: "Asynchronous JavaScript",
        topics: [
          "Callbacks",
          "Promises",
          "async and await",
          "Error handling with try and catch",
          "Fetch API basics",
        ],
      },
      {
        week: 5,
        title: "Modules and Tooling",
        topics: [
          "ES modules and import/export",
          "npm basics",
          "package.json",
          "Vite project structure",
          "Organizing code into modules",
        ],
      },
      {
        week: 6,
        title: "Foundation Project and Review",
        topics: [
          "Build the JavaScript task manager",
          "Build the async weather dashboard",
          "Review all ES6+ concepts",
          "Refactor for readability",
          "Practice debugging and explain your code",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "React Fundamentals",
    summary: "Think in components and build interactive user interfaces.",
    color: "#06b6d4",
    plan: { 4: "Week 2", 12: "Weeks 4-6", 24: "Weeks 7-12" },
    objectives: [
      "Understand component-based architecture and JSX",
      "Master props, composition, and data flow",
      "Manage local state with hooks",
      "Build controlled forms and accessible interfaces",
    ],
    topics: [
      "Functional components, JSX, expressions, and fragments",
      "Props, prop types, composition, and lifting state up",
      "useState, useEffect, useRef, and the Rules of Hooks",
      "Event handling, controlled inputs, and form validation",
      "CSS Modules, styled components, and conditional styling",
      "Component structure, accessibility, and responsive design",
    ],
    projects: ["Task manager app", "Weather dashboard"],
    milestone:
      "Build both projects with reusable components and proper state flow.",
    weeklySchedule: [
      {
        week: 7,
        title: "Components and JSX",
        topics: [
          "Functional components",
          "JSX syntax and expressions",
          "Component composition",
          "Fragments and children",
          "Build a component-based page",
        ],
      },
      {
        week: 8,
        title: "Props and Data Flow",
        topics: [
          "Passing props",
          "Prop types and default values",
          "Lifting state up",
          "Prop drilling and component boundaries",
          "Reusable card and list components",
        ],
      },
      {
        week: 9,
        title: "State and Core Hooks",
        topics: [
          "useState hook",
          "useEffect hook",
          "useRef hook",
          "Rules of Hooks",
          "State updates and re-rendering",
        ],
      },
      {
        week: 10,
        title: "Events and Forms",
        topics: [
          "Event handling and SyntheticEvent",
          "Controlled components",
          "Form validation",
          "Handling multiple inputs",
          "Build the Task Manager form",
        ],
      },
      {
        week: 11,
        title: "Styling and Component Design",
        topics: [
          "CSS Modules",
          "Styled components",
          "Tailwind CSS",
          "CSS-in-JS",
          "Conditional styling and responsive layouts",
        ],
      },
      {
        week: 12,
        title: "React Fundamentals Projects",
        topics: [
          "Complete the Task Manager App",
          "Build the Weather Dashboard",
          "API integration and async state",
          "Error handling and conditional rendering",
          "Review component structure and responsive design",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Advanced React Patterns",
    summary: "Build production architecture with routing and shared state.",
    color: "#6366f1",
    plan: { 4: "Week 3", 12: "Weeks 7-9", 24: "Weeks 13-18" },
    objectives: [
      "Use advanced hooks for complex scenarios",
      "Implement global state with Context and reducers",
      "Build multi-page apps with React Router",
      "Apply reusable component and data-fetching patterns",
    ],
    topics: [
      "useContext, useReducer, useCallback, useMemo, and useId",
      "Custom hooks, Context API, Redux Toolkit, and Zustand",
      "Route configuration, dynamic routes, nested routes, and guards",
      "Compound components, render props, and controlled components",
      "TanStack Query, caching, Suspense, and optimistic updates",
      "Pagination, infinite scrolling, and complex async flows",
    ],
    projects: ["E-commerce store", "Real-time chat application"],
    milestone:
      "Complete an e-commerce store with auth, cart persistence, and checkout.",
    weeklySchedule: [
      {
        week: 13,
        title: "Advanced Hooks",
        topics: [
          "useContext and useReducer",
          "useCallback and useMemo",
          "useId and hook dependency arrays",
          "Custom hooks for reusable behavior",
          "Choosing the right hook for a problem",
        ],
      },
      {
        week: 14,
        title: "Global State Management",
        topics: [
          "Context API architecture",
          "Reducer-based state management",
          "Redux Toolkit fundamentals",
          "Zustand fundamentals",
          "When to use local, context, or global state",
        ],
      },
      {
        week: 15,
        title: "React Router",
        topics: [
          "Route configuration",
          "Dynamic routes",
          "Nested routes",
          "Protected routes",
          "Navigation guards and route-level layouts",
        ],
      },
      {
        week: 16,
        title: "Component Architecture Patterns",
        topics: [
          "Compound components",
          "Render props",
          "Higher-order components",
          "Controlled versus uncontrolled components",
          "Composition versus inheritance",
        ],
      },
      {
        week: 17,
        title: "Data Fetching and Async Flows",
        topics: [
          "TanStack Query and query caching",
          "SWR and request deduplication",
          "Suspense for data",
          "Optimistic updates",
          "Pagination and infinite scrolling",
        ],
      },
      {
        week: 18,
        title: "Advanced React Projects",
        topics: [
          "Build the E-commerce Store",
          "Add authentication and protected routes",
          "Implement cart persistence and checkout flow",
          "Build the Real-Time Chat Application",
          "Add WebSockets, typing indicators, message history, and presence",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Deployment and DevOps",
    summary: "Take React applications from local development to production.",
    color: "#10b981",
    plan: { 4: "Week 4", 12: "Weeks 10-12", 24: "Weeks 19-24" },
    objectives: [
      "Deploy applications to Vercel and Netlify",
      "Configure environment variables and preview deployments",
      "Add testing, accessibility, and performance checks",
      "Understand when a React app needs Next.js",
    ],
    topics: [
      "Vercel, Netlify, build commands, and environment variables",
      "GitHub Actions, CI/CD, and preview deployments",
      "React Testing Library and meaningful test coverage",
      "Performance budgets, code splitting, and Lighthouse",
      "Next.js pages, App Router, Server Components, SSR, and SSG",
      "SEO, MDX, accessibility, and production monitoring",
    ],
    projects: ["Portfolio website", "Full-stack dashboard"],
    milestone:
      "Deploy a portfolio with 80%+ test coverage and a Lighthouse score above 90.",
    weeklySchedule: [
      {
        week: 19,
        title: "Deployment Foundations",
        topics: [
          "Production builds and build commands",
          "Vercel deployment",
          "Netlify deployment",
          "Environment variables",
          "Preview deployments",
        ],
      },
      {
        week: 20,
        title: "Testing and CI/CD",
        topics: [
          "React Testing Library",
          "Component and user-flow tests",
          "GitHub Actions",
          "Automated build and test checks",
          "Deployment previews and release workflow",
        ],
      },
      {
        week: 21,
        title: "Performance and Accessibility",
        topics: [
          "Code splitting and lazy loading",
          "Performance budgets",
          "Lighthouse audits",
          "Keyboard navigation and semantic HTML",
          "Accessibility testing and fixes",
        ],
      },
      {
        week: 22,
        title: "Next.js for Production",
        topics: [
          "Next.js introduction",
          "Pages Router versus App Router",
          "Server Components",
          "SSR and SSG",
          "API routes and when to use Next.js",
        ],
      },
      {
        week: 23,
        title: "Portfolio and Full-Stack Projects",
        topics: [
          "Build the professional portfolio website",
          "Add MDX content, SEO, and contact form",
          "Build the full-stack dashboard",
          "Add charts, authentication, and performance checks",
          "Create comprehensive test coverage",
        ],
      },
      {
        week: 24,
        title: "Production Review and Launch",
        topics: [
          "Deploy the portfolio and dashboard",
          "Fix Lighthouse and accessibility issues",
          "Verify CI/CD and preview deployments",
          "Document projects and architecture decisions",
          "Complete the final production checklist",
        ],
      },
    ],
  },
];

const skills = [
  { icon: <CodeIcon />, label: "Modern JavaScript and React fundamentals" },
  {
    icon: <RouteIcon />,
    label: "Routing, reusable components, and app architecture",
  },
  {
    icon: <StorageIcon />,
    label: "State management and data-fetching patterns",
  },
  {
    icon: <CloudUploadIcon />,
    label: "Testing, deployment, performance, and accessibility",
  },
];

const planOptions: { value: PlanLength; label: string }[] = [
  { value: 4, label: "4 weeks" },
  { value: 12, label: "12 weeks" },
  { value: 24, label: "24 weeks" },
];

const ReactDeveloperRoadmap = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState<PlanLength>(24);
  const [completedPhases, setCompletedPhases] = useState<Set<number>>(
    new Set(),
  );

  const toggleComplete = (phaseId: number) => {
    setCompletedPhases((current) => {
      const next = new Set(current);
      if (next.has(phaseId)) next.delete(phaseId);
      else next.add(phaseId);
      return next;
    });
  };

  const progress = Math.round((completedPhases.size / phases.length) * 100);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f0fdfa 0%, #f8fafc 48%, #eef2ff 100%)",
        p: { xs: 2, md: 5 },
      }}
    >
      <Box
        sx={{
          maxWidth: 1160,
          mx: "auto",
          backgroundColor: "#ffffff",
          borderRadius: 4,
          boxShadow: "0 24px 80px rgba(15,23,42,0.12)",
          p: { xs: 2.5, md: 5 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            mb: 4,
          }}
        >
          <Chip
            label="React Developer Roadmap"
            sx={{
              color: "#0e7490",
              backgroundColor: "#cffafe",
              fontWeight: 800,
            }}
          />
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/Dashboard")}
            sx={{ textTransform: "none" }}
          >
            Back
          </Button>
        </Box>

        <Box sx={{ mb: 4, maxWidth: 760 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 850, color: "#0f172a", mb: 1 }}
          >
            From JavaScript basics to production-ready React applications
          </Typography>
          <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
            Four phases take you from a strong JavaScript foundation through
            React architecture, real projects, testing, and deployment.
          </Typography>
        </Box>

        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            { label: "Phases", value: phases.length },
            { label: "Plan", value: `${plan} weeks` },
            {
              label: "Completed",
              value: `${completedPhases.size}/${phases.length}`,
            },
            { label: "Progress", value: `${progress}%` },
          ].map((stat) => (
            <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
              <Box
                sx={{
                  p: 2,
                  textAlign: "center",
                  borderRadius: 3,
                  backgroundColor: "#f0fdfa",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ color: "#0e7490", fontWeight: 800 }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mb: 4 }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
          >
            <Typography variant="caption" color="text.secondary">
              Roadmap progress
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "#0e7490", fontWeight: 800 }}
            >
              {progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 7,
              borderRadius: 99,
              backgroundColor: "#ccfbf1",
              "& .MuiLinearProgress-bar": { backgroundColor: "#0e7490" },
            }}
          />
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Choose your pace
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The same four phases adapt to your available study time.
            </Typography>
          </Box>
          <Select
            size="small"
            value={plan}
            onChange={(event) =>
              setPlan(Number(event.target.value) as PlanLength)
            }
          >
            {planOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Grid container spacing={2} sx={{ mb: 5 }}>
          {phases.map((phase) => {
            const complete = completedPhases.has(phase.id);
            return (
              <Grid key={phase.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: "1px solid rgba(15,23,42,0.08)",
                    boxShadow: "none",
                    opacity: complete ? 0.75 : 1,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1.25,
                      }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          flexShrink: 0,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          color: complete ? "#fff" : phase.color,
                          backgroundColor: complete
                            ? phase.color
                            : `${phase.color}18`,
                          fontWeight: 800,
                        }}
                      >
                        {complete ? (
                          <CheckCircleIcon fontSize="small" />
                        ) : (
                          phase.id
                        )}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 800 }}
                        >
                          {phase.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {phase.plan[plan]}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid rgba(15,23,42,0.08)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1.5 }}
                      >
                        {phase.summary}
                      </Typography>
                      {plan === 24 && phase.weeklySchedule && (
                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="caption"
                            sx={{ fontWeight: 800, color: phase.color }}
                          >
                            24-WEEK LEARNING SCHEDULE
                          </Typography>
                          <List dense disablePadding>
                            {phase.weeklySchedule.map((week) => (
                              <ListItem
                                key={week.week}
                                disablePadding
                                sx={{
                                  display: "block",
                                  py: 0.75,
                                  pl: 1,
                                  borderLeft: `3px solid ${phase.color}55`,
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 800 }}
                                >
                                  Week {week.week}: {week.title}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {week.topics.join(" • ")}
                                </Typography>
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 800, color: phase.color }}
                      >
                        OBJECTIVES
                      </Typography>
                      <List dense disablePadding sx={{ mb: 1.5 }}>
                        {phase.objectives.map((item) => (
                          <ListItem key={item} disablePadding>
                            <ListItemText
                              primary={item}
                              slotProps={{
                                primary: { sx: { fontSize: "0.78rem" } },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 800, color: phase.color }}
                      >
                        TOPICS
                      </Typography>
                      <List dense disablePadding sx={{ mb: 1.5 }}>
                        {phase.topics.map((item) => (
                          <ListItem key={item} disablePadding>
                            <ListItemText
                              primary={item}
                              slotProps={{
                                primary: { sx: { fontSize: "0.78rem" } },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Typography
                        variant="caption"
                        sx={{ fontWeight: 800, color: phase.color }}
                      >
                        PROJECTS
                      </Typography>
                      <List dense disablePadding sx={{ mb: 1.5 }}>
                        {phase.projects.map((item) => (
                          <ListItem key={item} disablePadding>
                            <ListItemText
                              primary={item}
                              slotProps={{
                                primary: { sx: { fontSize: "0.78rem" } },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                      <Button
                        size="small"
                        onClick={() => toggleComplete(phase.id)}
                        startIcon={complete ? <CheckCircleIcon /> : undefined}
                        sx={{
                          color: phase.color,
                          textTransform: "none",
                          fontWeight: 800,
                        }}
                      >
                        {complete ? "Completed" : "Mark complete"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
          Skills you will build
        </Typography>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {skills.map((skill) => (
            <Grid key={skill.label} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: "none",
                  border: "1px solid rgba(15,23,42,0.08)",
                }}
              >
                <CardContent>
                  <Box sx={{ color: "#0e7490", mb: 1 }}>{skill.icon}</Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {skill.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mb: 1,
            p: { xs: 2.5, md: 3.5 },
            borderRadius: 3,
            backgroundColor: "#ecfeff",
            border: "1px solid #a5f3fc",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: "#155e75", mb: 2 }}
          >
            Your path forward
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                Career opportunities
              </Typography>
              <List dense disablePadding>
                {[
                  "React Developer",
                  "Frontend Developer",
                  "Full Stack Developer",
                  "UI Engineer",
                  "JavaScript Developer",
                  "Web Application Developer",
                ].map((role) => (
                  <ListItem key={role} disablePadding sx={{ py: 0.2 }}>
                    <ListItemText primary={role} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1 }}>
                Tips for success
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#164e63", lineHeight: 1.7 }}
              >
                Build projects instead of only watching tutorials. Read the
                official React documentation, understand JavaScript deeply,
                avoid chasing every library, contribute to open source, practice
                explaining your code, learn to read error messages, build a
                portfolio with three to five quality applications, and pair
                program when possible.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            Next steps
          </Typography>
          <List dense disablePadding>
            {[
              "Set up Node.js, VS Code, and Git",
              "Choose the 24-week pace and study consistently",
              "Bookmark the official React documentation",
              "Start Phase 1 and build something every week",
              "Commit to coding every day, even for 30 minutes",
            ].map((step) => (
              <ListItem key={step} disablePadding sx={{ py: 0.25 }}>
                <ListItemText primary={step} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default ReactDeveloperRoadmap;
