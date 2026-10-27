import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  LinearProgress,
  Checkbox,
  Divider,
  TextField,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CodeIcon from "@mui/icons-material/Code";
import QuizIcon from "@mui/icons-material/Quiz";
import LinkIcon from "@mui/icons-material/Link";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import TerminalIcon from "@mui/icons-material/Terminal";
import FlagIcon from "@mui/icons-material/Flag";
import { useNavigate } from "react-router-dom";
import { topicGuides } from "./topicGuides";
import IndividualQuizCard from "./IndividualQuizCard";

// ─── Data ────────────────────────────────────────────────────────────────────

const weeklyPlan = [
  {
    week: 1,
    phase: "1A",
    title: "Java Fundamentals - Part 1",
    color: "#556FFF",
    days: "Mon – Fri",
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
    theoretical: [
      "What is the difference between primitive and wrapper classes in Java?",
    ],
    coding: [
      "Swap two numbers without using a third variable.",
      "Reverse a number.",
      "Check whether a number is palindrome.",
      "Find factorial of a number.",
      "Check whether a number is prime.",
      "Generate Fibonacci series.",
      "Find greatest among three numbers.",
      "Calculate sum of digits.",
      "Check Armstrong number.",
      "Print multiplication table.",
    ],
    resources: [
      {
        label: "Java Docs – Primitive Types",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html",
      },
      {
        label: "Oracle Java Tutorial – Control Flow",
        url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/flow.html",
      },
      {
        label: "String class deep-dive – Baeldung",
        url: "https://www.baeldung.com/java-string",
      },
    ],
  },
  {
    week: 2,
    phase: "1B",
    title: "Java Fundamentals - Part 2",
    color: "#4A60E6",
    days: "Mon – Fri",
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
    theoretical: [
      "Why is String immutable?",
      "Difference between && and & operators.",
      "Difference between String, StringBuilder and StringBuffer.",
    ],
    coding: [
      "Reverse an array.",
      "FizzBuzz Challenge.",
      "Find second largest element.",
      "Count vowels and consonants.",
      "Check anagram strings.",
      "Find duplicate characters.",
      "Find first non-repeating character.",
      "Reverse words in a sentence.",
      "Move zeros to end.",
      "Rotate array by K positions.",
    ],
    resources: [
      {
        label: "OOP Concepts – Oracle Docs",
        url: "https://docs.oracle.com/javase/tutorial/java/concepts/",
      },
      {
        label: "Abstract vs Interface – Baeldung",
        url: "https://www.baeldung.com/java-interface-vs-abstract-class",
      },
      {
        label: "Java Polymorphism – GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/polymorphism-in-java/",
      },
      {
        label: "Design Patterns intro – Refactoring Guru",
        url: "https://refactoring.guru/design-patterns/java",
      },
      {
        label: "Practice problems – LeetCode Easy Arrays",
        url: "https://leetcode.com/tag/array/",
      },
    ],
  },
  {
    week: 3,
    phase: "1C",
    title: "Object-Oriented Programming - Part 1",
    color: "#3F51CC",
    days: "Mon – Fri",
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
    theoretical: [
      "Can we override static methods?",
      "What is encapsulation?",
      "Difference between final, finally and finalize.",
    ],
    coding: [
      "Design Bank Account class.",
      "Student class with constructor overloading.",
      "Immutable Employee class.",
      "Library Management System.",
      "Calculator using method overloading.",
      "Product class with encapsulation.",
      "ATM Simulation.",
      "Book Management System.",
      "Static variable example.",
      "Employee Payroll System.",
    ],
    resources: [
      {
        label: "OOP Concepts – Oracle Docs",
        url: "https://docs.oracle.com/javase/tutorial/java/concepts/",
      },
      {
        label: "Classes and Objects – Oracle Docs",
        url: "https://docs.oracle.com/javase/tutorial/java/javaOO/",
      },
      {
        label: "Encapsulation in Java – Baeldung",
        url: "https://www.baeldung.com/java-encapsulation",
      },
      {
        label: "Java OOP Playlist – Telusko",
        url: "https://www.youtube.com/playlist?list=PLsyeobzWxl7pe_IiTfNyr55kwJPWbgxB5",
      },
      {
        label: "OOP Practice Problems – HackerRank Java",
        url: "https://www.hackerrank.com/domains/java",
      },
    ],
  },
  {
    week: 4,
    phase: "1D",
    title: "Object-Oriented Programming - Part 2",
    color: "#3442B3",
    days: "Mon – Fri",
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
    theoretical: [
      "Abstract Class vs Interface",
      "Runtime Polymorphism",
      "Composition vs Inheritance",
    ],
    coding: [
      "Shape abstraction example.",
      "Vehicle interface implementation.",
      "Animal hierarchy using polymorphism.",
      "Employee Management System.",
      "Payment gateway using interfaces.",
      "Notification service abstraction.",
      "Custom Comparator example.",
      "E-commerce cart design.",
      "Override equals/hashCode.",
      "Hospital Management System.",
    ],
    resources: [
      {
        label: "Inheritance and Polymorphism – Oracle Docs",
        url: "https://docs.oracle.com/javase/tutorial/java/IandI/",
      },
      {
        label: "Abstract Class vs Interface – Baeldung",
        url: "https://www.baeldung.com/java-interface-vs-abstract-class",
      },
      {
        label: "Java Polymorphism – GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/polymorphism-in-java/",
      },
      {
        label: "Design Patterns Introduction – Refactoring Guru",
        url: "https://refactoring.guru/design-patterns/java",
      },
      {
        label: "Java OOP Interview Questions & Practice – GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
      },
    ],
  },
  {
    week: 5,
    phase: "1E",
    title: "Collections Framework - Part 1",
    color: "#2F44B8",
    days: "Mon – Fri",
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
    theoretical: [
      "ArrayList vs LinkedList",
      "Why Generics?",
      "HashSet vs TreeSet",
    ],
    coding: [
      "Remove duplicates from ArrayList.",
      "Find common elements between lists.",
      "Array to ArrayList conversion.",
      "Frequency count in list.",
      "Sort collections.",
      "Missing number in array.",
      "Find duplicates.",
      "Custom generic class.",
      "Intersection of arrays.",
      "Student collection management.",
    ],
    resources: [
      {
        label: "Java Collections – Oracle Docs",
        url: "https://docs.oracle.com/javase/tutorial/collections/",
      },
      {
        label: "Java Collections Guide – Baeldung",
        url: "https://www.baeldung.com/java-collections",
      },
      {
        label: "Java Collections Playlist – Telusko",
        url: "https://www.youtube.com/@Telusko",
      },
      {
        label: "LeetCode Array & Hashing Problems",
        url: "https://leetcode.com/problem-list/array/",
      },
    ],
  },
  {
    week: 6,
    phase: "1F",
    title: "Collections Framework - Part 2",
    color: "#2739A0",
    days: "Mon – Fri",
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
    theoretical: [
      "How HashMap works internally?",
      "Comparable vs Comparator",
      "ConcurrentHashMap vs HashMap",
    ],
    coding: [
      "Word frequency counter.",
      "Student sorting using Comparator.",
      "Group anagrams.",
      "Top K frequent elements.",
      "Custom HashMap key.",
      "Contact management system.",
      "TreeMap sorting.",
      "Find first non-repeating character.",
      "LRU Cache implementation.",
      "Inventory Management using Maps.",
    ],
    resources: [
      {
        label: "HashMap Internals – Baeldung",
        url: "https://www.baeldung.com/java-hashmap",
      },
      {
        label: "Comparable vs Comparator – GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/comparable-vs-comparator-in-java/",
      },
      {
        label: "Collections Cheat Sheet",
        url: "https://github.com/in28minutes/java-cheat-sheet",
      },
      {
        label: "LeetCode HashMap Problems",
        url: "https://leetcode.com/tag/hash-table/",
      },
    ],
  },
  {
    week: 7,
    phase: "1G",
    title: "Exception Handling & JVM",
    color: "#23308A",
    days: "Mon – Fri",
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
    theoretical: [
      "Checked vs Unchecked Exceptions",
      "Heap vs Stack Memory",
      "How Garbage Collection works?",
    ],
    coding: [
      "File reader using try-with-resources.",
      "InvalidAgeException.",
      "BankException.",
      "CSV Reader.",
      "File Search Utility.",
      "Exception propagation example.",
      "Logger implementation.",
      "Multiple exception handling.",
      "File writer utility.",
      "Student file processor.",
    ],
    resources: [
      {
        label: "Java Exceptions – Oracle Docs",
        url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/",
      },
      {
        label: "JVM Architecture Explained",
        url: "https://www.baeldung.com/jvm-memory-model",
      },
      {
        label: "Java Memory Management",
        url: "https://www.geeksforgeeks.org/memory-management-in-java/",
      },
      {
        label: "Exception Handling Practice",
        url: "https://www.hackerrank.com/domains/java",
      },
    ],
  },
  {
    week: 8,
    phase: "1H",
    title: "Modern Java & Multithreading",
    color: "#1E2875",
    days: "Mon – Fri",
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
    theoretical: [
      "What is Optional?",
      "Functional Interface examples.",
      "Thread lifecycle in Java.",
    ],
    coding: [
      "Filter employees using Streams.",
      "Find duplicate elements using Streams.",
      "Convert names to uppercase.",
      "Group employees by department.",
      "Find highest salary employee.",
      "Producer Consumer example.",
      "Odd Even threads.",
      "Thread-safe counter.",
      "Sort employees using Streams.",
      "Use Optional to avoid NullPointerException.",
    ],
    resources: [
      {
        label: "Java Stream API – Baeldung",
        url: "https://www.baeldung.com/java-8-streams",
      },
      {
        label: "Optional Class – Oracle Docs",
        url: "https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html",
      },
      {
        label: "Java Multithreading – GeeksForGeeks",
        url: "https://www.geeksforgeeks.org/multithreading-in-java/",
      },
      {
        label: "LeetCode Streams Practice",
        url: "https://leetcode.com/tag/stream/",
      },
    ],
  },
  {
    week: 9,
    phase: "2",
    title: "Dev Environment & Tools",
    color: "#7B61FF",
    days: "Mon – Fri",
    topics: [
      "IntelliJ IDEA setup, navigation, debugging shortcuts",
      "Maven vs Gradle: Build lifecycle, dependency management, pom.xml",
      "Git workflows: init, clone, commit, push, branching, merging, PRs",
      "Docker basics: Why containers? Running a local DB container",
    ],
    theoretical: [
      "What is the difference between Maven and Gradle?",
      "Explain Git branching strategy (GitFlow vs trunk-based development).",
      "What problem does Docker solve for development teams?",
    ],
    coding: [
      "Create a Maven Spring Boot project from Spring Initializr and run it.",
      "Set up a PostgreSQL container using Docker and connect to it locally.",
      "Create a Git repo with main and develop branches, make a PR from feature branch.",
      "Create a multi-module Maven project.",
      "Build a simple Java application using Maven lifecycle commands.",
      "Resolve a merge conflict using Git.",
      "Create and use Git tags for releases.",
      "Containerize a simple Java application using Docker.",
      "Create a Docker Compose file for Java + PostgreSQL.",
      "Debug a Java application using IntelliJ breakpoints.",
    ],
    resources: [
      {
        label: "Spring Initializr",
        url: "https://start.spring.io/",
      },
      {
        label: "Maven in 5 minutes – Apache",
        url: "https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html",
      },
      {
        label: "Git branching – Atlassian",
        url: "https://www.atlassian.com/git/tutorials/using-branches",
      },
      {
        label: "Docker getting started",
        url: "https://docs.docker.com/get-started/",
      },
    ],
  },
  {
    week: 10,
    phase: "3",
    title: "Spring Core & Spring Boot",
    color: "#0EA5E9",
    days: "Mon – Fri",
    topics: [
      "Inversion of Control (IoC) container and Dependency Injection",
      "Spring Beans, Bean Scopes (Singleton, Prototype), ApplicationContext",
      "Spring Boot Auto-configuration (@SpringBootApplication breakdown)",
      "Profiles (@Profile) and externalized configuration (application.yml)",
    ],
    theoretical: [
      "What is Inversion of Control and why is it useful?",
      "Explain the difference between Singleton and Prototype bean scope.",
      "How does Spring Boot auto-configuration work under the hood?",
    ],
    coding: [
      "Build a service layer with @Service and inject it using @Autowired.",
      "Create separate application.yml profiles for dev and prod environments.",
      "Write a @Configuration class that manually defines a Spring Bean.",
      "Create a REST endpoint returning a static response.",
      "Implement constructor-based dependency injection.",
      "Create a custom Spring Bean and inject it.",
      "Use @Value to read configuration properties.",
      "Create multiple profiles and switch between them.",
      "Implement a layered architecture (Controller-Service-Repository).",
      "Build a simple Student Management API using Spring Boot.",
    ],
    resources: [
      {
        label: "Spring IoC – Official Docs",
        url: "https://docs.spring.io/spring-framework/docs/current/reference/html/core.html",
      },
      {
        label: "Spring Boot Reference",
        url: "https://docs.spring.io/spring-boot/docs/current/reference/html/",
      },
      {
        label: "Dependency Injection explained – Baeldung",
        url: "https://www.baeldung.com/spring-dependency-injection",
      },
      {
        label: "Spring Boot with application.yml",
        url: "https://www.baeldung.com/spring-yaml",
      },
    ],
  },
  {
    week: 11,
    phase: "4",
    title: "Building REST APIs",
    color: "#10B981",
    days: "Mon – Fri",
    topics: [
      "RESTful principles, @RestController, Routing, Request Mappings",
      "DTO Pattern (Data Transfer Objects) and Input Validation",
      "Global Exception Handling using @ControllerAdvice",
      "Interactive API documentation with Swagger UI / OpenAPI",
    ],
    theoretical: [
      "What are the 6 constraints of REST architecture?",
      "Why do we use DTOs instead of exposing entities directly?",
      "How does @ControllerAdvice work for global exception handling?",
    ],
    coding: [
      "Build a full CRUD REST API for a 'Product' resource.",
      "Add @Valid annotations and custom error messages to request DTOs.",
      "Set up Swagger UI and document all endpoints with descriptions.",
    ],
    resources: [
      {
        label: "REST API best practices – REST API Tutorial",
        url: "https://restfulapi.net/",
      },
      {
        label: "Spring MVC @RestController – Baeldung",
        url: "https://www.baeldung.com/spring-controller-vs-restcontroller",
      },
      {
        label: "Bean Validation – Hibernate Docs",
        url: "https://hibernate.org/validator/documentation/",
      },
      {
        label: "SpringDoc OpenAPI – GitHub",
        url: "https://github.com/springdoc/springdoc-openapi",
      },
    ],
  },
  {
    week: 12,
    phase: "5",
    title: "Data Persistence (Database Layer)",
    color: "#F59E0B",
    days: "Mon – Fri",
    topics: [
      "Spring Data JPA, Hibernate ORM, Mapping Entities (@Entity, @Id)",
      "Entity Relationships: @OneToMany, @ManyToOne, @ManyToMany",
      "Derived query methods and custom JPQL/Native queries",
      "Database schema versioning with Flyway or Liquibase",
      "Identifying and fixing the N+1 select problem",
    ],
    theoretical: [
      "What is the difference between JPA and Hibernate?",
      "Explain the N+1 problem and how to solve it using @EntityGraph or JOIN FETCH.",
      "When would you use @ManyToMany vs two @OneToMany relationships?",
    ],
    coding: [
      "Map a 'User' and 'Order' entity with a @OneToMany relationship.",
      "Write a custom JPQL query to find orders above a certain amount.",
      "Set up Flyway migrations to version your database schema changes.",
    ],
    resources: [
      {
        label: "Spring Data JPA – Baeldung",
        url: "https://www.baeldung.com/the-persistence-layer-with-spring-data-jpa",
      },
      {
        label: "Hibernate ORM Docs",
        url: "https://hibernate.org/orm/documentation/",
      },
      {
        label: "N+1 problem explained – Vlad Mihalcea",
        url: "https://vladmihalcea.com/n-plus-1-query-problem/",
      },
      {
        label: "Flyway migrations – Docs",
        url: "https://documentation.red-gate.com/fd",
      },
    ],
  },
  {
    week: 13,
    phase: "6",
    title: "Spring Security & Auth",
    color: "#EF4444",
    days: "Mon – Fri",
    topics: [
      "Architecture of the Spring Security Filter Chain",
      "Implementing JWT (JSON Web Token) Authentication Flow",
      "Role-Based Access Control (RBAC) using @PreAuthorize",
      "Conceptual understanding of OAuth2 and Social Logins",
    ],
    theoretical: [
      "Explain the Spring Security Filter Chain and where JWT fits in.",
      "What is the difference between Authentication and Authorization?",
      "When would you use OAuth2 instead of custom JWT auth?",
    ],
    coding: [
      "Implement JWT login and token refresh endpoint.",
      "Protect API routes with @PreAuthorize roles (ADMIN, USER).",
      "Write a custom UserDetailsService loading users from the database.",
    ],
    resources: [
      {
        label: "Spring Security Docs",
        url: "https://docs.spring.io/spring-security/reference/",
      },
      {
        label: "JWT Introduction – jwt.io",
        url: "https://jwt.io/introduction",
      },
      {
        label: "Spring Security JWT – Baeldung",
        url: "https://www.baeldung.com/spring-security-oauth-jwt",
      },
      { label: "OAuth2 explained simply", url: "https://www.oauth.com/" },
    ],
  },
  {
    week: 14,
    phase: "7",
    title: "Testing & Production Deployment",
    color: "#8B5CF6",
    days: "Mon – Fri",
    topics: [
      "Unit tests using JUnit 5 and mocking with Mockito",
      "Integration tests using @SpringBootTest and Testcontainers",
      "Dockerizing the Spring Boot app with a multi-stage Dockerfile",
      "Automating build and test pipeline using GitHub Actions (CI/CD)",
    ],
    theoretical: [
      "What is the difference between unit tests and integration tests?",
      "Why use Testcontainers instead of H2 for integration testing?",
      "Explain what a CI/CD pipeline does and why teams use it.",
    ],
    coding: [
      "Write JUnit 5 tests for a service class, mocking the repository with Mockito.",
      "Write a @SpringBootTest integration test that calls a real REST endpoint.",
      "Write a multi-stage Dockerfile and build a Docker image for the app.",
    ],
    resources: [
      {
        label: "JUnit 5 User Guide",
        url: "https://junit.org/junit5/docs/current/user-guide/",
      },
      { label: "Mockito Docs", url: "https://site.mockito.org/" },
      {
        label: "Testcontainers for Java",
        url: "https://testcontainers.com/guides/getting-started-with-testcontainers-for-java/",
      },
      {
        label: "GitHub Actions – Getting Started",
        url: "https://docs.github.com/en/actions/learn-github-actions",
      },
    ],
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "topics" | "theory" | "coding" | "resources" | "notes";
type PracticeLang = "java" | "python" | "javascript";

type PracticeTarget = {
  week: number;
  index: number;
  color: string;
  title: string;
  challenge: string;
};

const STARTER_CODE: Record<PracticeLang, string> = {
  java: `public class Main {
    public static void main(String[] args) {
        // Write your solution here

    }
}`,
  python: `# Write your solution here

def solve():
    pass

solve()`,
  javascript: `// Write your solution here
console.log("Hello, world!");`,
};

// Builds a reasonable "expected outcome" description from the challenge text
// itself, since each of the 100+ challenges doesn't have hand-authored
// sample I/O. Feel free to replace this with real test cases per problem.
const buildExpectedOutcome = (challenge: string) => {
  const clean = challenge.replace(/\.$/, "");
  return `Your program should correctly implement: "${clean}". It should compile/run without errors, handle basic edge cases (empty input, zero, negative numbers, etc. where relevant), and print a clear, correct result to the console for a few sample inputs you choose to test with.`;
};

// ─── Component ───────────────────────────────────────────────────────────────

const WeeklyStudyPlan = () => {
  const navigate = useNavigate();

  // ─── Topic Guide Panel ────────────────────────────────────────────────────────

  const TopicGuidePanel = ({
    guideKey,
    color,
  }: {
    guideKey: string;
    color: string;
    onComplete: () => void;
    completed: boolean;
  }) => {
    const guide = topicGuides[guideKey];
    const [open, setOpen] = useState(false);

    if (!guide) return null; // no guide yet for this topic

    return (
      <Box sx={{ mt: 0.5, ml: 3.5 }}>
        <Button
          size="small"
          onClick={() => setOpen((p) => !p)}
          sx={{
            fontSize: 11,
            textTransform: "none",
            color: open ? color : "text.secondary",
            px: 1,
            py: 0.25,
            minWidth: 0,
            fontWeight: 600,
            "&:hover": { backgroundColor: `${color}10` },
          }}
        >
          {open ? "▲ Hide Guide" : "▼ Read Guide"}
        </Button>

        {open && (
          <Box
            sx={{
              mt: 1,
              mb: 1.5,
              p: 2,
              borderRadius: 2,
              border: `1.5px solid ${color}30`,
              backgroundColor: `${color}05`,
            }}
          >
            {/* Theory */}
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color, display: "block", mb: 0.5 }}
            >
              📖 Theory
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 1.5 }}>
              {guide.theory}
            </Typography>

            {/* Key Points */}
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color, display: "block", mb: 0.5 }}
            >
              ✅ Key Points
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, mb: 1.5, mt: 0 }}>
              {guide.keyPoints.map((pt, i) => (
                <Typography
                  key={i}
                  component="li"
                  variant="body2"
                  sx={{ lineHeight: 1.7 }}
                >
                  {pt}
                </Typography>
              ))}
            </Box>

            {/* Code */}
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color, display: "block", mb: 0.5 }}
            >
              💻 Code Example
            </Typography>
            <Box
              component="pre"
              sx={{
                backgroundColor: "rgba(15,23,42,0.04)",
                borderRadius: 1.5,
                p: 1.5,
                fontSize: 12,
                fontFamily: "monospace",
                overflowX: "auto",
                lineHeight: 1.6,
                mb: 1.5,
                whiteSpace: "pre",
              }}
            >
              {guide.code}
            </Box>

            {/* Quiz */}
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color, display: "block", mb: 0.5 }}
            >
              ❓ Quick Quiz
            </Typography>

            {guide.quizzes?.map((quiz, index) => (
              <IndividualQuizCard
                key={index}
                quiz={quiz}
                index={index}
                color={color}
                onQuizComplete={(idx, wasCorrect) =>
                  console.log(`Quiz ${idx} correct: ${wasCorrect}`)
                }
              />
            ))}
          </Box>
        )}
      </Box>
    );
  };

  const loadStoredState = <T,>(key: string, fallback: T): T => {
    if (typeof window === "undefined") return fallback;

    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? (JSON.parse(storedValue) as T) : fallback;
    } catch {
      return fallback;
    }
  };

  const saveStoredState = <T,>(key: string, value: T) => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage errors so the UI still works.
    }
  };

  // checked topics per week: { "1-0": true, "1-2": true, ... }
  const [checkedTopics, setCheckedTopics] = useState<Record<string, boolean>>(
    () =>
      loadStoredState<Record<string, boolean>>(
        "weekly-study-checkedTopics",
        {},
      ),
  );
  // checked theoretical per week: { "1-0": true }
  const [checkedTheory, setCheckedTheory] = useState<Record<string, boolean>>(
    () =>
      loadStoredState<Record<string, boolean>>(
        "weekly-study-checkedTheory",
        {},
      ),
  );
  // checked coding per week
  const [checkedCoding, setCheckedCoding] = useState<Record<string, boolean>>(
    () =>
      loadStoredState<Record<string, boolean>>(
        "weekly-study-checkedCoding",
        {},
      ),
  );
  // notes per week
  const [notes, setNotes] = useState<Record<number, string>>(() =>
    loadStoredState<Record<number, string>>("weekly-study-notes", {}),
  );
  // active tab per week
  const [activeTabs, setActiveTabs] = useState<Record<number, TabKey>>(() =>
    loadStoredState<Record<number, TabKey>>("weekly-study-activeTabs", {}),
  );
  // expanded week
  const [expandedWeek, setExpandedWeek] = useState<number | false>(() =>
    loadStoredState<number | false>("weekly-study-expandedWeek", false),
  );

  useEffect(() => {
    saveStoredState("weekly-study-checkedTopics", checkedTopics);
  }, [checkedTopics]);

  useEffect(() => {
    saveStoredState("weekly-study-checkedTheory", checkedTheory);
  }, [checkedTheory]);

  useEffect(() => {
    saveStoredState("weekly-study-checkedCoding", checkedCoding);
  }, [checkedCoding]);

  useEffect(() => {
    saveStoredState("weekly-study-notes", notes);
  }, [notes]);

  useEffect(() => {
    saveStoredState("weekly-study-activeTabs", activeTabs);
  }, [activeTabs]);

  useEffect(() => {
    saveStoredState("weekly-study-expandedWeek", expandedWeek);
  }, [expandedWeek]);

  // ─── Practice / Compiler dialog state ──────────────────────────────────────
  const [practiceTarget, setPracticeTarget] = useState<PracticeTarget | null>(
    null,
  );
  const [practiceLang, setPracticeLang] = useState<PracticeLang>("java");
  const [practiceCode, setPracticeCode] = useState<string>(STARTER_CODE.java);
  const [practiceOutput, setPracticeOutput] = useState<string | null>(null);
  const [practiceRunning, setPracticeRunning] = useState(false);
  const [tabWarning, setTabWarning] = useState(false);

  // Reset the editor whenever a new challenge is opened, or the language changes
  // useEffect(() => {
  //   if (practiceTarget) {
  //     // setPracticeCode(STARTER_CODE[practiceLang]);
  //     // setPracticeOutput(null);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [practiceTarget, practiceLang]);

  const openPractice = (
    week: number,
    index: number,
    color: string,
    title: string,
    challenge: string,
  ) => {
    setPracticeLang("java");
    setPracticeLang("java");
    setPracticeCode(STARTER_CODE.java);
    setPracticeOutput(null);
    setTabWarning(false);
    setPracticeTarget({ week, index, color, title, challenge });

    // Hide the browser's tab bar / "+" new-tab button while practicing.
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {
        // Some browsers block this outside a direct click; fails silently.
      });
    }
  };

  const closePractice = () => {
    setPracticeTarget(null);
    setPracticeOutput(null);

    setTabWarning(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Watch for the user leaving fullscreen or switching tabs while a
  // practice challenge is open, and surface a warning overlay.
  useEffect(() => {
    if (!practiceTarget) return;

    const handleVisibilityChange = () => {
      if (document.hidden) setTabWarning(true);
    };
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setTabWarning(true);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [practiceTarget]);

  const returnToPractice = () => {
    setTabWarning(false);
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    }
  };

  const handleLanguageChange = (lang: PracticeLang) => {
    // Reset directly in the change handler that caused it, again avoiding
    // a setState-in-effect cascade.
    setPracticeLang(lang);
    setPracticeCode(STARTER_CODE[lang]);
    setPracticeOutput(null);
  };

  const handleRunCode = () => {
    setPracticeRunning(true);
    setPracticeOutput(null);
    // simulate compile/run latency
    setTimeout(() => {
      if (practiceLang === "javascript") {
        const logs: string[] = [];
        try {
          const fakeConsole = {
            log: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
          };
          const runner = new Function("console", practiceCode);
          runner(fakeConsole);
          setPracticeOutput(
            logs.length ? logs.join("\n") : "(program ran with no output)",
          );
        } catch (err) {
          setPracticeOutput(
            `Compilation/Runtime Error:\n${(err as Error).message}`,
          );
        }
      } else {
        // Java / Python: no server-side compiler wired up yet, so we
        // simulate the outcome and point the learner to a real compiler.
        setPracticeOutput(
          `✔ Syntax looks OK (simulated check).\n\nLive ${
            practiceLang === "java" ? "Java" : "Python"
          } execution isn't available in this in-app preview yet. ` +
            `Copy your code into your local IDE, or an online compiler such as ` +
            `${
              practiceLang === "java"
                ? "https://www.jdoodle.com/online-java-compiler/"
                : "https://www.python.org/shell/"
            }, to see the real output.`,
        );
      }
      setPracticeRunning(false);
    }, 500);
  };

  const toggleTopic = (key: string) =>
    setCheckedTopics((p) => ({ ...p, [key]: !p[key] }));

  const toggleTheory = (key: string) =>
    setCheckedTheory((p) => ({ ...p, [key]: !p[key] }));

  const toggleCoding = (key: string) =>
    setCheckedCoding((p) => ({ ...p, [key]: !p[key] }));

  const getTab = (week: number): TabKey => activeTabs[week] ?? "topics";
  const setTab = (week: number, tab: TabKey) =>
    setActiveTabs((p) => ({ ...p, [week]: tab }));

  // Overall progress across all topics
  const totalTopics = weeklyPlan.reduce((s, w) => s + w.topics.length, 0);
  const doneTopics = Object.values(checkedTopics).filter(Boolean).length;
  const overallProgress = Math.round((doneTopics / totalTopics) * 100);

  // Week-level topic progress
  const weekProgress = (week: number) => {
    const w = weeklyPlan.find((x) => x.week === week)!;
    const done = w.topics.filter(
      (_, i) => checkedTopics[`${week}-t-${i}`],
    ).length;
    return Math.round((done / w.topics.length) * 100);
  };

  const tabDefs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    {
      key: "topics",
      label: "Topics",
      icon: <MenuBookIcon sx={{ fontSize: 16 }} />,
    },
    {
      key: "theory",
      label: "Theory",
      icon: <QuizIcon sx={{ fontSize: 16 }} />,
    },
    {
      key: "coding",
      label: "Coding",
      icon: <CodeIcon sx={{ fontSize: 16 }} />,
    },
    {
      key: "resources",
      label: "Resources",
      icon: <LinkIcon sx={{ fontSize: 16 }} />,
    },
    {
      key: "notes",
      label: "Notes",
      icon: <NoteAltIcon sx={{ fontSize: 16 }} />,
    },
  ];

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
          maxWidth: 900,
          mx: "auto",
          backgroundColor: "#ffffff",
          borderRadius: 4,
          boxShadow: "0 24px 80px rgba(15,23,42,0.10)",
          p: { xs: 3, md: 5 },
        }}
      >
        {/* Back */}
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 3,
            borderRadius: "10px",
            textTransform: "none",
            borderColor: "divider",
            color: "text.secondary",
            fontWeight: 600,
            "&:hover": { borderColor: "primary.main", color: "primary.main" },
          }}
        >
          Back to Roadmap
        </Button>

        {/* Header */}
        <Chip
          label="10-Week Plan"
          size="small"
          sx={{
            mb: 1.5,
            backgroundColor: "rgba(85,111,255,0.10)",
            color: "#556FFF",
            fontWeight: 600,
            fontSize: 12,
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Weekly Study Plan
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 3, maxWidth: 620 }}
        >
          Work through each week at your own pace. Check off topics, answer
          theory questions, complete coding tasks, and keep notes — all in one
          place.
        </Typography>

        {/* Overall progress */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            background:
              "linear-gradient(135deg, rgba(85,111,255,0.06) 0%, rgba(16,185,129,0.06) 100%)",
            border: "1.5px solid rgba(85,111,255,0.12)",
            mb: 4,
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <EmojiEventsIcon sx={{ color: "#556FFF", fontSize: 32 }} />
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography>Overall topic progress</Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, color: "#556FFF" }}
              >
                {doneTopics}/{totalTopics} topics
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={overallProgress}
              sx={{
                height: 8,
                borderRadius: 99,
                backgroundColor: "rgba(85,111,255,0.12)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#556FFF",
                  borderRadius: 99,
                },
              }}
            />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#556FFF" }}>
            {overallProgress}%
          </Typography>
        </Box>

        {/* Week cards */}
        {weeklyPlan.map((w) => {
          const wp = weekProgress(w.week);
          const tab = getTab(w.week);

          return (
            <Accordion
              key={w.week}
              expanded={expandedWeek === w.week}
              onChange={(_, open) => setExpandedWeek(open ? w.week : false)}
              disableGutters
              elevation={0}
              sx={{
                mb: 2,
                borderRadius: "16px !important",
                border:
                  expandedWeek === w.week
                    ? `2px solid ${w.color}`
                    : "1.5px solid rgba(15,23,42,0.08)",
                overflow: "hidden",
                "&::before": { display: "none" },
                transition: "border .2s",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  px: 2.5,
                  py: 1,
                  "& .MuiAccordionSummary-content": {
                    alignItems: "center",
                    gap: 2,
                  },
                }}
              >
                {/* Week badge */}
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    backgroundColor: `${w.color}18`,
                    color: w.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  W{w.week}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {w.title}
                    </Typography>
                    <Chip
                      label={`Phase ${w.phase}`}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 11,
                        fontWeight: 600,
                        backgroundColor: `${w.color}18`,
                        color: w.color,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mt: 0.5,
                    }}
                  >
                    <LinearProgress
                      variant="determinate"
                      value={wp}
                      sx={{
                        width: 100,
                        height: 5,
                        borderRadius: 99,
                        backgroundColor: "rgba(15,23,42,0.08)",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: w.color,
                          borderRadius: 99,
                        },
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {wp}% topics done
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ px: 2.5, pb: 2.5, pt: 0 }}>
                <Divider sx={{ mb: 2 }} />

                {/* Tabs */}
                <Tabs
                  value={tab}
                  onChange={(_, v) => setTab(w.week, v)}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    mb: 2,
                    minHeight: 36,
                    "& .MuiTab-root": {
                      minHeight: 36,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: 13,
                      gap: 0.5,
                    },
                    "& .MuiTabs-indicator": { backgroundColor: w.color },
                    "& .Mui-selected": { color: `${w.color} !important` },
                  }}
                >
                  {tabDefs.map((t) => (
                    <Tab
                      key={t.key}
                      value={t.key}
                      label={t.label}
                      iconPosition="start"
                    />
                  ))}
                </Tabs>

                {/* ── Topics ── */}
                {tab === "topics" && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1.5, display: "block" }}
                    >
                      Check each topic once you've studied it.
                    </Typography>
                    <Grid container spacing={0.5}>
                      {w.topics.map((topic, i) => {
                        const key = `${w.week}-t-${i}`;
                        const guideKey = `${w.week}-${i}`;
                        return (
                          <Grid key={i} size={{ xs: 12 }}>
                            <Box
                              onClick={() => toggleTopic(key)}
                              sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 1,
                                p: 1,
                                borderRadius: 2,
                                cursor: "pointer",
                                "&:hover": {
                                  backgroundColor: "rgba(15,23,42,0.03)",
                                },
                              }}
                            >
                              {checkedTopics[key] ? (
                                <CheckCircleIcon
                                  sx={{
                                    color: w.color,
                                    fontSize: 20,
                                    mt: 0.1,
                                    flexShrink: 0,
                                  }}
                                />
                              ) : (
                                <RadioButtonUncheckedIcon
                                  sx={{
                                    color: "action.disabled",
                                    fontSize: 20,
                                    mt: 0.1,
                                    flexShrink: 0,
                                  }}
                                />
                              )}
                              <Typography
                                variant="body2"
                                sx={{
                                  color: checkedTopics[key]
                                    ? "text.disabled"
                                    : "text.primary",
                                  textDecoration: checkedTopics[key]
                                    ? "line-through"
                                    : "none",
                                  lineHeight: 1.5,
                                }}
                              >
                                {topic}
                              </Typography>
                            </Box>
                            <TopicGuidePanel
                              guideKey={guideKey}
                              color={w.color}
                              completed={!!checkedTopics[key]}
                              onComplete={() => toggleTopic(key)}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                )}

                {/* ── Theory ── */}
                {tab === "theory" && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1.5, display: "block" }}
                    >
                      Answer these in your own words. Check off once you can
                      explain them confidently.
                    </Typography>
                    {w.theoretical.map((q, i) => {
                      const key = `${w.week}-q-${i}`;
                      return (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                            p: 1.5,
                            mb: 1,
                            borderRadius: 2,
                            border: "1.5px solid",
                            borderColor: checkedTheory[key]
                              ? `${w.color}40`
                              : "rgba(15,23,42,0.08)",
                            backgroundColor: checkedTheory[key]
                              ? `${w.color}06`
                              : "transparent",
                            transition: "all .15s",
                          }}
                        >
                          <Checkbox
                            checked={!!checkedTheory[key]}
                            onChange={() => toggleTheory(key)}
                            size="small"
                            sx={{
                              p: 0,
                              color: "action.disabled",
                              "&.Mui-checked": { color: w.color },
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: checkedTheory[key]
                                ? "text.disabled"
                                : "text.primary",
                              textDecoration: checkedTheory[key]
                                ? "line-through"
                                : "none",
                              lineHeight: 1.6,
                            }}
                          >
                            {q}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                )}

                {/* ── Coding ── */}
                {tab === "coding" && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1.5, display: "block" }}
                    >
                      Complete each challenge in your IDE, or hit "Practice" to
                      try it right here.
                    </Typography>
                    {w.coding.map((challenge, i) => {
                      const key = `${w.week}-c-${i}`;
                      return (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                            p: 1.5,
                            mb: 1,
                            borderRadius: 2,
                            border: "1.5px solid",
                            borderColor: checkedCoding[key]
                              ? `${w.color}40`
                              : "rgba(15,23,42,0.08)",
                            backgroundColor: checkedCoding[key]
                              ? `${w.color}06`
                              : "transparent",
                            transition: "all .15s",
                          }}
                        >
                          <Checkbox
                            checked={!!checkedCoding[key]}
                            onChange={() => toggleCoding(key)}
                            size="small"
                            sx={{
                              p: 0,
                              color: "action.disabled",
                              "&.Mui-checked": { color: w.color },
                            }}
                          />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 0.5,
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <CodeIcon
                                  sx={{ fontSize: 15, color: w.color }}
                                />
                                <Typography
                                  variant="caption"
                                  sx={{ color: w.color, fontWeight: 700 }}
                                >
                                  Challenge {i + 1}
                                </Typography>
                              </Box>
                              <Button
                                size="small"
                                startIcon={
                                  <PlayArrowIcon sx={{ fontSize: 16 }} />
                                }
                                onClick={() =>
                                  openPractice(
                                    w.week,
                                    i,
                                    w.color,
                                    w.title,
                                    challenge,
                                  )
                                }
                                sx={{
                                  fontSize: 11,
                                  textTransform: "none",
                                  fontWeight: 700,
                                  color: w.color,
                                  border: `1.5px solid ${w.color}40`,
                                  borderRadius: 99,
                                  px: 1.25,
                                  py: 0.25,
                                  minWidth: 0,
                                  "&:hover": {
                                    backgroundColor: `${w.color}10`,
                                    borderColor: w.color,
                                  },
                                }}
                              >
                                Practice
                              </Button>
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{
                                color: checkedCoding[key]
                                  ? "text.disabled"
                                  : "text.primary",
                                textDecoration: checkedCoding[key]
                                  ? "line-through"
                                  : "none",
                                lineHeight: 1.6,
                              }}
                            >
                              {challenge}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}

                {/* ── Resources ── */}
                {tab === "resources" && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1.5, display: "block" }}
                    >
                      Curated reading and practice links for this week.
                    </Typography>
                    <Grid container spacing={1.5}>
                      {w.resources.map((r, i) => (
                        <Grid key={i} size={{ xs: 12, sm: 6 }}>
                          <Box
                            component="a"
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                              p: 1.5,
                              borderRadius: 2,
                              border: "1.5px solid rgba(15,23,42,0.08)",
                              textDecoration: "none",
                              color: "text.primary",
                              transition: "all .15s",
                              "&:hover": {
                                borderColor: w.color,
                                backgroundColor: `${w.color}06`,
                                transform: "translateY(-2px)",
                                boxShadow: "0 4px 16px rgba(15,23,42,0.06)",
                              },
                            }}
                          >
                            <LinkIcon
                              sx={{
                                color: w.color,
                                fontSize: 18,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500, lineHeight: 1.4 }}
                            >
                              {r.label}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}

                {/* ── Notes ── */}
                {tab === "notes" && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1.5, display: "block" }}
                    >
                      Write your own study notes, questions, or key takeaways
                      here.
                    </Typography>
                    <TextField
                      multiline
                      minRows={5}
                      fullWidth
                      placeholder="Type your notes here... e.g., key concepts, things to revisit, questions for later."
                      value={notes[w.week] ?? ""}
                      onChange={(e) =>
                        setNotes((p) => ({ ...p, [w.week]: e.target.value }))
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          fontSize: 14,
                          "&:hover fieldset": { borderColor: w.color },
                          "&.Mui-focused fieldset": { borderColor: w.color },
                        },
                      }}
                    />
                    {notes[w.week] && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, display: "block" }}
                      >
                        {notes[w.week].length} characters saved in session.
                      </Typography>
                    )}
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}

        {/* Bottom CTA */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Completed all weeks? Go back and mark phases done on the roadmap.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{
              px: 5,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 700,
              backgroundColor: "#556FFF",
              "&:hover": { backgroundColor: "#4055e0" },
            }}
          >
            Back to Roadmap
          </Button>
        </Box>
      </Box>

      {/* ─── Practice / Compiler Modal ───────────────────────────────────────
          A modal Dialog blocks interaction with the rest of the page (backdrop +
          focus trap), so the learner can't click away to another tab/section
          until they close it explicitly. It never opens a new browser tab. */}
      <Dialog
        open={!!practiceTarget}
        onClose={closePractice}
        fullWidth
        maxWidth="md"
        scroll="paper"
      >
        {practiceTarget && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                borderBottom: "1px solid rgba(15,23,42,0.08)",
                py: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "10px",
                    backgroundColor: `${practiceTarget.color}18`,
                    color: practiceTarget.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CodeIcon sx={{ fontSize: 18 }} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}
                  >
                    Practice: Challenge {practiceTarget.index + 1}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                  >
                    Week {practiceTarget.week} · {practiceTarget.title}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={closePractice} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ p: 0 }}>
              {tabWarning && (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 10,
                    backgroundColor: "rgba(15,23,42,0.92)",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    p: 4,
                    gap: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
                    You left the practice screen
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ maxWidth: 360, opacity: 0.85 }}
                  >
                    Stay on this screen and solve it yourself — no switching
                    tabs to look up the answer. Return to continue.
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={returnToPractice}
                    sx={{ textTransform: "none", fontWeight: 700, mt: 1 }}
                  >
                    Return to Practice
                  </Button>
                </Box>
              )}
              {/* Question details */}
              <Box
                sx={{ p: 2.5, borderBottom: "1px solid rgba(15,23,42,0.08)" }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: practiceTarget.color,
                    display: "block",
                    mb: 0.5,
                  }}
                >
                  📋 Question
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6, mb: 2 }}>
                  {practiceTarget.challenge}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: practiceTarget.color,
                    display: "block",
                    mb: 0.5,
                  }}
                >
                  🎯 Expected Outcome
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {buildExpectedOutcome(practiceTarget.challenge)}
                </Typography>
              </Box>

              {/* Compiler */}
              <Box sx={{ p: 2.5 }}>
                <Stack>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <TerminalIcon
                      sx={{ fontSize: 18, color: practiceTarget.color }}
                    />
                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                      Compiler
                    </Typography>
                  </Box>
                  <Select
                    size="small"
                    value={practiceLang}
                    onChange={(e) =>
                      handleLanguageChange(e.target.value as PracticeLang)
                    }
                    sx={{ fontSize: 13, height: 32, minWidth: 120 }}
                  >
                    <MenuItem value="java">Java</MenuItem>
                    <MenuItem value="python">Python</MenuItem>
                    <MenuItem value="javascript">JavaScript</MenuItem>
                  </Select>
                </Stack>

                <TextField
                  multiline
                  minRows={10}
                  maxRows={16}
                  fullWidth
                  value={practiceCode}
                  onChange={(e) => setPracticeCode(e.target.value)}
                  spellCheck={false}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      fontFamily: "monospace",
                      fontSize: 13,
                      backgroundColor: "#0f172a",
                      color: "#e2e8f0",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                      "&:hover fieldset": { borderColor: practiceTarget.color },
                      "&.Mui-focused fieldset": {
                        borderColor: practiceTarget.color,
                      },
                    },
                    "& textarea": { color: "#e2e8f0" },
                  }}
                />

                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 1.5 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<PlayArrowIcon />}
                    onClick={handleRunCode}
                    disabled={practiceRunning}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: 2,
                      backgroundColor: practiceTarget.color,
                      "&:hover": {
                        backgroundColor: practiceTarget.color,
                        opacity: 0.9,
                      },
                    }}
                  >
                    {practiceRunning ? "Running..." : "Run Code"}
                  </Button>
                </Box>

                {/* Output console */}
                {practiceOutput !== null && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: "rgba(15,23,42,0.04)",
                      border: "1px solid rgba(15,23,42,0.08)",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ fontWeight: 700, display: "block", mb: 0.5 }}
                    >
                      ▶ Output
                    </Typography>
                    <Box
                      component="pre"
                      sx={{
                        m: 0,
                        fontFamily: "monospace",
                        fontSize: 12.5,
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                      }}
                    >
                      {practiceOutput}
                    </Box>
                  </Box>
                )}
              </Box>
            </DialogContent>

            <DialogActions sx={{ px: 2.5, py: 1.5 }}>
              <Button
                onClick={() => {
                  toggleCoding(
                    `${practiceTarget.week}-c-${practiceTarget.index}`,
                  );
                  closePractice();
                }}
                startIcon={<FlagIcon sx={{ fontSize: 16 }} />}
                sx={{ textTransform: "none", fontWeight: 700 }}
              >
                Mark as Done & Close
              </Button>
              <Button
                onClick={closePractice}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default WeeklyStudyPlan;
