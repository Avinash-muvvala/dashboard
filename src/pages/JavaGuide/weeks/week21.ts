import { createTopicGuide } from "./createTopicGuide";

export const week21Topics = {
  "21-0": createTopicGuide(
    "A Dockerfile describes how to build an image and how to start its main process. Keep the build reproducible, use a small trusted base image, run as a non-root user where practical, and avoid placing credentials in image layers.",
    [
      "COPY only required application files into the image.",
      "Use an exec-form ENTRYPOINT so the application receives container signals.",
      "Do not bake environment-specific secrets into image layers.",
    ],
    `FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/app.jar app.jar
USER 10001
ENTRYPOINT ["java", "-jar", "app.jar"]`,
    "What is the role of a Dockerfile?",
    [
      "Describe steps to build an image and configure its startup process.",
      "Store runtime passwords for every environment.",
      "Replace application source control.",
      "Automatically provide a database server.",
    ],
    0,
    "A Dockerfile is a build and startup recipe for producing an image.",
  ),
  "21-1": createTopicGuide(
    "A multi-stage build uses separate stages for compiling and running an application. Build tools and intermediate files stay in the builder stage, while the final image contains only the runtime and application artifact, reducing size and attack surface.",
    [
      "Name stages with FROM ... AS ... and copy only required artifacts.",
      "Use a JRE or runtime image for the final Java stage when suitable.",
      "Keep build and runtime versions compatible.",
    ],
    `FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src
COPY . .
RUN mvn -B package -DskipTests

FROM eclipse-temurin:21-jre
COPY --from=build /src/target/app.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]`,
    "Why use a multi-stage Docker build?",
    [
      "To leave compilers and build files out of the final runtime image.",
      "To run every build stage as a separate production service.",
      "To embed secrets in the image securely.",
      "To skip selecting a runtime environment.",
    ],
    0,
    "Only the required artifact is copied into the final stage, keeping build tooling out of the runtime image.",
  ),
  "21-2": createTopicGuide(
    "Docker Compose describes related services, networks, and volumes in one configuration so developers can run an application stack locally. Services can discover each other by service name, and persistent data should use an explicitly managed volume.",
    [
      "Define API and supporting services in a Compose file.",
      "Use service DNS names instead of localhost for container-to-container calls.",
      "Do not treat local Compose settings as production secret management.",
    ],
    `services:
  api:
    build: .
    environment:
      DATABASE_URL: jdbc:postgresql://db:5432/app
    depends_on:
      - db
  db:
    image: postgres:16`,
    "What does Docker Compose help define?",
    [
      "A set of related services and their local configuration.",
      "Java class inheritance.",
      "Database migrations only.",
      "The application's HTTP response schema.",
    ],
    0,
    "Compose brings multiple services and their networking/configuration together for a repeatable local environment.",
  ),
  "21-3": createTopicGuide(
    "Containers connected to the same Docker network can reach one another using service or container DNS names and the port on which the target process listens. The published host port is for access from outside the Docker network.",
    [
      "Use a service name such as db as the hostname inside a Compose network.",
      "localhost inside a container refers to that same container.",
      "Expose only the ports needed by other services or the host.",
    ],
    `# From the API container, connect to:
jdbc:postgresql://db:5432/app

# Host access may use a published mapping such as 5433:5432.`,
    "What does localhost refer to from inside a container?",
    [
      "That same container.",
      "Every container on the network.",
      "The Docker host in all configurations.",
      "The container named db.",
    ],
    0,
    "Each container has its own network namespace, so localhost points back to itself.",
  ),
  "21-4": createTopicGuide(
    "Application configuration should vary by environment through externalized properties, environment variables, or a secret manager rather than rebuilding the image. Keep safe defaults for local development and fail clearly when required production settings are absent.",
    [
      "Use profiles or external properties for environment-specific behavior.",
      "Keep credentials outside source code and container images.",
      "Validate required configuration during application startup.",
    ],
    `spring:
  datasource:
    url: \${DATABASE_URL}
    username: \${DATABASE_USERNAME}
    password: \${DATABASE_PASSWORD}`,
    "How should production-specific application configuration be supplied?",
    [
      "Externally at runtime, using environment configuration or a secret manager.",
      "Hard-coded into the Java source.",
      "Added to a public Docker image layer.",
      "Copied from a developer's personal workstation.",
    ],
    0,
    "External runtime configuration keeps the image reusable and secrets out of source and image layers.",
  ),
};
