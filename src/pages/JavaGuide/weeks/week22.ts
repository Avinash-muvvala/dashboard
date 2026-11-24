import { createTopicGuide } from "./createTopicGuide";

export const week22Topics = {
  "22-0": createTopicGuide(
    "GitHub Actions workflows are YAML files that define events, jobs, and steps for automation. A workflow can check out the repository, configure a JDK, and run the project's normal build and test commands on pushes or pull requests.",
    [
      "Store workflow files under .github/workflows.",
      "Use explicit permissions and pin or update actions responsibly.",
      "Run the same build command locally and in CI where possible.",
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
      - run: ./mvnw verify`,
    "What does a GitHub Actions workflow define?",
    [
      "Automated events, jobs, and steps to run.",
      "A replacement for Java's type system.",
      "A database schema only.",
      "A Docker host's physical network wiring.",
    ],
    0,
    "Workflows configure automation triggered by repository events and consist of jobs and steps.",
  ),
  "22-1": createTopicGuide(
    "A build-and-test pipeline gives fast, repeatable feedback by checking out code, compiling it, running tests, and optionally producing a deployable artifact. Required checks can prevent a change from merging when validation fails.",
    [
      "Fail the pipeline when compilation or tests fail.",
      "Separate validation steps so failures are diagnosable.",
      "Build once and promote the same artifact through environments when feasible.",
    ],
    `steps:
  - run: ./mvnw -B clean verify
  - run: docker build -t app:\${{ github.sha }} .`,
    "What should happen when a required test fails in CI?",
    [
      "The pipeline should fail and report the failure.",
      "The failure should be hidden so deployment continues.",
      "The test should be deleted automatically.",
      "The source branch should be force-pushed.",
    ],
    0,
    "A CI pipeline must surface failed validation rather than presenting an invalid change as successful.",
  ),
  "22-2": createTopicGuide(
    "Image publishing builds and pushes a container image to a registry after the project passes its checks. Use immutable tags such as a commit SHA in addition to any friendly release tag, and authenticate with narrowly scoped credentials.",
    [
      "Publish only after required build and test steps succeed.",
      "Use immutable identifiers to trace an image to its source.",
      "Restrict registry credentials to the required repository and actions.",
    ],
    `- name: Build and push image
  uses: docker/build-push-action@v6
  with:
    push: true
    tags: registry.example/app:\${{ github.sha }}`,
    "Why tag a published image with a commit SHA?",
    [
      "To identify the exact source revision used to build the image.",
      "To make the image's contents change automatically.",
      "To grant all users registry access.",
      "To prevent tests from running.",
    ],
    0,
    "A commit-based tag provides traceability from a deployed image back to its source revision.",
  ),
  "22-3": createTopicGuide(
    "CI environment secrets hold sensitive values such as deployment credentials and should be referenced through the platform's secret mechanism. Limit access and token permissions, avoid printing secrets, and rotate credentials if exposure is suspected.",
    [
      "Use encrypted repository or environment secrets for sensitive values.",
      "Grant workflows only the permissions they need.",
      "Never echo credentials into logs or commit them to workflow files.",
    ],
    `env:
  REGISTRY_TOKEN: \${{ secrets.REGISTRY_TOKEN }}

# Do not print REGISTRY_TOKEN in a workflow step.`,
    "Where should a CI deployment credential be stored?",
    [
      "In the CI platform's protected secret store.",
      "As a plain value in the workflow YAML.",
      "In a public repository README.",
      "Inside the Docker image's source layer.",
    ],
    0,
    "Protected secret stores keep credentials out of the repository and provide controlled access.",
  ),
  "22-4": createTopicGuide(
    "Deployment fundamentals include configuring the runtime, applying compatible database migrations, monitoring health, and having a rollback or recovery plan. Separate deployment configuration from the built artifact and validate readiness before routing traffic.",
    [
      "Deploy a known, tested artifact rather than rebuilding ad hoc.",
      "Check health and logs after deployment.",
      "Plan for migration compatibility, rollback, and secret delivery.",
    ],
    `# A deployment handoff should specify:
artifact: registry.example/app:COMMIT_SHA
health-check: /actuator/health/readiness
required-config:
  - DATABASE_URL
  - DATABASE_USERNAME`,
    "Why should deployment use a tested, identifiable artifact?",
    [
      "It makes releases reproducible and helps trace incidents.",
      "It removes the need to monitor application health.",
      "It allows production secrets to be stored in source.",
      "It guarantees every deployment is bug-free.",
    ],
    0,
    "A known artifact improves reproducibility and provides a precise version to investigate or roll back.",
  ),
};
