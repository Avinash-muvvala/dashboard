import { createTopicGuide } from "./createTopicGuide";

export const week9Topics = {
  "9-0": createTopicGuide(
    "An IDE combines source editing, project navigation, code completion, debugging, and build integration. IntelliJ IDEA can import Maven or Gradle projects, run tests, and inspect code; shortcuts and menus vary by operating system and keymap.",
    [
      "Open the project root so the IDE can detect its build files.",
      "Use breakpoints and the debugger to inspect runtime state.",
      "Keep IDE configuration separate from portable project configuration.",
    ],
    `// Debugging workflow
// 1. Set a breakpoint on the line to inspect.
// 2. Start the application with Debug.
// 3. Step over / into and inspect variables.`,
    "What is a breakpoint primarily used for?",
    [
      "Pause execution so you can inspect program state.",
      "Compile the project without a JDK.",
      "Automatically fix every test failure.",
      "Upload source code to a repository.",
    ],
    0,
    "A breakpoint pauses a running program at a chosen location for debugging.",
  ),
  "9-1": createTopicGuide(
    "Maven and Gradle automate dependency resolution, compilation, testing, and packaging. Maven conventionally declares project configuration in pom.xml; Gradle uses build scripts and supports a flexible task graph.",
    [
      "Both tools resolve declared dependencies.",
      "A build lifecycle groups common phases or tasks.",
      "Use the wrapper scripts so teammates share a consistent build-tool version.",
    ],
    `# Maven wrapper
./mvnw test

# Gradle wrapper
./gradlew test`,
    "Why use the Maven or Gradle wrapper?",
    [
      "It runs a project-pinned build-tool version.",
      "It replaces the JDK.",
      "It stores source files in a database.",
      "It skips dependency resolution.",
    ],
    0,
    "The wrapper selects a consistent build tool for the project without requiring a global installation.",
  ),
  "9-2": createTopicGuide(
    "Git records project history as commits and supports parallel work through branches. A pull request proposes changes for review and integration; small, focused commits and clear branch names make collaboration easier.",
    [
      "A commit records a snapshot and message.",
      "A branch is a movable line of development.",
      "Pull requests support review before changes are merged.",
    ],
    `git switch -c feature/add-search
git add .
git commit -m "Add search endpoint"
git push -u origin feature/add-search`,
    "What is the main purpose of a feature branch?",
    [
      "Isolate related work before it is integrated.",
      "Permanently replace the main branch.",
      "Store compiled Java bytecode only.",
      "Automatically approve a pull request.",
    ],
    0,
    "A feature branch lets work proceed independently until it is reviewed and merged.",
  ),
  "9-3": createTopicGuide(
    "Docker packages an application with its runtime dependencies into an image that can run as a container. Docker Compose describes related local services, such as a Java application and database, while persistent volumes keep database data beyond a container's lifetime.",
    [
      "An image is a template; a container is a running instance.",
      "Compose can define services, networks, and volumes.",
      "Use environment configuration rather than hard-coding database credentials.",
    ],
    `services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: app
      POSTGRES_PASSWORD: local-dev-only
    ports:
      - "5432:5432"`,
    "What is the difference between a Docker image and a container?",
    [
      "An image is a template; a container is a running instance.",
      "An image is a running process; a container is source code.",
      "They are names for the same object.",
      "A container is a database backup.",
    ],
    0,
    "A container is created from an image and runs its configured process.",
  ),
};
