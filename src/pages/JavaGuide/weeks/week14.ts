import { createTopicGuide } from "./createTopicGuide";

export const week14Topics = {
  "14-0": createTopicGuide(
    "A unit test checks a small unit of behavior in isolation. JUnit 5 supplies test and assertion APIs, while Mockito can provide test doubles for dependencies such as repositories so a service can be tested without a database.",
    [
      "Test observable behavior rather than private implementation details.",
      "Keep tests deterministic and independent.",
      "Mock external collaborators, not the class whose behavior is under test.",
    ],
    `@Test
void calculatesTotal() {
    assertEquals(12, pricingService.total(List.of(5, 7)));
}`,
    "What is the main goal of a unit test?",
    [
      "Verify one unit's behavior in isolation.",
      "Measure production traffic.",
      "Replace all integration tests.",
      "Deploy the application.",
    ],
    0,
    "A unit test focuses on a small behavior and controls its collaborators.",
  ),
  "14-1": createTopicGuide(
    "An integration test checks that multiple application components work together. @SpringBootTest can load the application context; Testcontainers can provide disposable real services such as a database for tests that need realistic behavior.",
    [
      "Integration tests exercise component boundaries and configuration.",
      "Use Testcontainers when database-specific behavior matters.",
      "Keep the test environment isolated and clean up resources.",
    ],
    `@SpringBootTest
@Testcontainers
class OrderRepositoryTest {
    @Container
    static PostgreSQLContainer<?> db =
        new PostgreSQLContainer<>("postgres:16");
}`,
    "Why might a team use Testcontainers for a database integration test?",
    [
      "To test against a real database engine in an isolated container.",
      "To mock every SQL query.",
      "To avoid starting any database.",
      "To generate production data automatically.",
    ],
    0,
    "Testcontainers can start a disposable instance of the database engine so tests exercise realistic database behavior.",
  ),
  "14-2": createTopicGuide(
    "A multi-stage Docker build separates compilation from the final runtime image. The build stage can include compilers and caches, while the final stage copies only the application artifact and required runtime, reducing image size and unnecessary tools.",
    [
      "Use a build stage for compilation and dependency resolution.",
      "Copy the built artifact into a smaller runtime stage.",
      "Run as a non-root user when practical and keep base images maintained.",
    ],
    `FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY target/app.jar app.jar

FROM eclipse-temurin:21-jre
COPY --from=build /app/app.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]`,
    "What is a benefit of a multi-stage Docker build?",
    [
      "Build tools can be excluded from the final runtime image.",
      "It removes the need to test the application.",
      "It stores secrets safely inside image layers.",
      "It combines all services into one process.",
    ],
    0,
    "Only artifacts copied from the build stage are included in the final image, keeping build-only tools out.",
  ),
  "14-3": createTopicGuide(
    "A CI pipeline automatically builds and tests changes so problems are found before integration or release. GitHub Actions expresses workflows as YAML jobs and steps; secrets should be stored in the platform's secret store and never printed in logs.",
    [
      "Run the same build and test commands used by developers.",
      "Use separate workflow steps for checkout, setup, tests, and packaging.",
      "Restrict secret access and avoid exposing credentials in output.",
    ],
    `name: Java CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: "21"
      - run: ./mvnw test`,
    "What should a basic CI workflow do before publishing an artifact?",
    [
      "Build the project and run its tests.",
      "Skip tests whenever code changes.",
      "Commit credentials into the repository.",
      "Delete the source branch.",
    ],
    0,
    "A basic CI job provides fast feedback by building and testing the change before publishing.",
  ),
};
