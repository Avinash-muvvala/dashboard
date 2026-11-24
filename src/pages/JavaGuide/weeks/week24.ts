import { createTopicGuide } from "./createTopicGuide";

export const week24Topics = {
  "24-0": createTopicGuide(
    "A complete REST service defines resources, HTTP methods, request and response schemas, validation, persistence, and consistent error behavior. Design around resource-oriented URLs and document the contract so clients can use the API predictably.",
    [
      "Use HTTP methods and status codes according to their semantics.",
      "Validate input at the API boundary.",
      "Document schemas, errors, and important behavior.",
    ],
    `@PostMapping("/api/books")
ResponseEntity<BookResponse> create(
        @Valid @RequestBody CreateBookRequest request) {
    BookResponse created = service.create(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
}`,
    "What is a key quality of a well-designed REST API?",
    [
      "Its resource contract and HTTP behavior are predictable and documented.",
      "Every operation uses GET regardless of its effect.",
      "It exposes database tables without validation.",
      "It returns stack traces for all errors.",
    ],
    0,
    "A clear resource-oriented contract with meaningful HTTP semantics makes an API easier to use and maintain.",
  ),
  "24-1": createTopicGuide(
    "A capstone should protect identity and operations with appropriate authentication and authorization. Authentication establishes who is calling; authorization applies least-privilege rules to specific resources and actions.",
    [
      "Protect write and administrative operations explicitly.",
      "Store passwords using an adaptive password encoder if handling credentials.",
      "Test unauthenticated, permitted, and forbidden scenarios.",
    ],
    `@PreAuthorize("hasAuthority('book:write')")
public BookResponse updateBook(long id, UpdateBookRequest request) {
    return bookService.update(id, request);
}`,
    "What should a security test verify besides successful access?",
    [
      "That unauthenticated or unauthorized requests are rejected.",
      "That every role can perform every operation.",
      "That security filters are disabled.",
      "That credentials appear in application logs.",
    ],
    0,
    "Negative cases ensure the policy actually prevents access where it should.",
  ),
  "24-2": createTopicGuide(
    "A reliable project test suite balances fast unit tests with integration tests for critical wiring, database behavior, and API workflows. Test the most important user outcomes and failure paths rather than only the number of test methods.",
    [
      "Unit-test domain rules and edge cases.",
      "Integration-test important boundaries such as persistence and HTTP behavior.",
      "Keep tests deterministic and runnable in CI.",
    ],
    `@Test
void rejectsDuplicateBookIsbn() {
    assertThrows(DuplicateIsbnException.class,
        () -> service.create(requestWithIsbn(existingIsbn)));
}`,
    "What makes a capstone test suite useful?",
    [
      "It verifies important behavior and boundaries with repeatable tests.",
      "It contains the greatest possible number of trivial tests.",
      "It only tests private helper methods.",
      "It depends on production credentials.",
    ],
    0,
    "A useful suite gives confidence in key behavior and system boundaries while remaining repeatable.",
  ),
  "24-3": createTopicGuide(
    "Containerizing and deploying the capstone demonstrates how the service runs outside a developer workstation. Build a reproducible image, provide environment configuration at runtime, check health, and document a safe deployment and recovery process.",
    [
      "Use a small runtime image and avoid embedding secrets.",
      "Provide external configuration and health probes.",
      "Record how to build, run, deploy, and roll back the service.",
    ],
    `docker build -t library-api:local .
docker run --rm -p 8080:8080 `
    + `-e DATABASE_URL="jdbc:postgresql://host.docker.internal:5432/library" `
    + `library-api:local`,
    "Which practice keeps a container image reusable across environments?",
    [
      "Supply environment-specific settings at runtime.",
      "Bake production credentials into the image.",
      "Use a different hard-coded image for every developer.",
      "Remove health checks before deployment.",
    ],
    0,
    "Runtime configuration lets the same artifact be promoted between environments without rebuilding it with secrets.",
  ),
  "24-4": createTopicGuide(
    "Architecture and API documentation should help another developer understand the system, run it, and integrate with it. Include the major components, important design choices, setup and configuration, API examples, test commands, and known operational requirements.",
    [
      "Explain key components and why important trade-offs were chosen.",
      "Document required environment variables without publishing secret values.",
      "Keep API documentation aligned with the implementation.",
    ],
    `# Project documentation outline
1. Overview and architecture
2. Prerequisites and local setup
3. Configuration variables
4. API contract and examples
5. Test, build, and deployment steps`,
    "What is the purpose of documenting architecture and API usage?",
    [
      "Help users and maintainers understand, run, and integrate with the service.",
      "Replace all tests and source code.",
      "Publish secrets so deployments are easier.",
      "Guarantee that the architecture never changes.",
    ],
    0,
    "Useful documentation makes the service understandable and usable while recording important operational details.",
  ),
};
