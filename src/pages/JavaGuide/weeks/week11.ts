import { createTopicGuide } from "./createTopicGuide";

export const week11Topics = {
  "11-0": createTopicGuide(
    "REST is an architectural style for resources identified by URLs and manipulated through representations. In Spring MVC, @RestController exposes methods as HTTP endpoints, and request-mapping annotations connect routes and HTTP methods to those methods.",
    [
      "Use HTTP methods according to their intended semantics.",
      "Return appropriate status codes and resource representations.",
      "Keep controller methods focused on translating HTTP to application calls.",
    ],
    `@RestController
@RequestMapping("/api/products")
class ProductController {
    @GetMapping("/{id}")
    ProductDto find(@PathVariable long id) {
        return service.find(id);
    }
}`,
    "What does @RestController provide?",
    [
      "Controller behavior with response bodies written directly.",
      "Automatic database table creation only.",
      "A replacement for HTTP status codes.",
      "A thread per endpoint at startup.",
    ],
    0,
    "@RestController combines controller handling with response-body semantics for returned data.",
  ),
  "11-1": createTopicGuide(
    "A Data Transfer Object defines the request or response shape exposed by an API. Bean Validation annotations describe constraints, and @Valid asks Spring to validate a request object before the controller processes it.",
    [
      "DTOs decouple the public API from persistence entities.",
      "Use constraints such as @NotBlank and @Positive where appropriate.",
      "Return clear validation errors without exposing internal implementation details.",
    ],
    `record CreateProductRequest(
    @NotBlank String name,
    @Positive BigDecimal price
) {}

@PostMapping
ProductDto create(@Valid @RequestBody CreateProductRequest request) {
    return service.create(request);
}`,
    "Why validate an incoming DTO?",
    [
      "Reject invalid input at the API boundary.",
      "Skip all business rules.",
      "Make the request object a JPA entity.",
      "Convert every validation error into HTTP 200.",
    ],
    0,
    "Validation checks request constraints before invalid data reaches application logic.",
  ),
  "11-2": createTopicGuide(
    "@ControllerAdvice centralizes controller-related behavior across endpoints. Methods annotated with @ExceptionHandler can map known exceptions to consistent HTTP statuses and error response bodies.",
    [
      "Handle expected application errors explicitly.",
      "Use ResponseEntity or ProblemDetail to control status and body.",
      "Avoid returning stack traces or sensitive internals to clients.",
    ],
    `@RestControllerAdvice
class ApiErrors {
    @ExceptionHandler(ProductNotFoundException.class)
    ResponseEntity<ProblemDetail> notFound(ProductNotFoundException ex) {
        return ResponseEntity.notFound().build();
    }
}`,
    "What is a common purpose of @ControllerAdvice?",
    [
      "Apply shared exception handling across controllers.",
      "Create a database connection for each request.",
      "Generate DTOs from entity fields automatically.",
      "Disable HTTP status codes.",
    ],
    0,
    "@ControllerAdvice lets an application define cross-cutting controller behavior such as global exception handling.",
  ),
  "11-3": createTopicGuide(
    "OpenAPI is a language-independent description of an HTTP API. Tools such as springdoc-openapi can derive a specification from Spring endpoints and annotations, then provide interactive documentation for consumers and developers.",
    [
      "Document paths, operations, parameters, request bodies, and responses.",
      "Keep the generated contract aligned with actual API behavior.",
      "Do not expose protected operational details in public documentation.",
    ],
    `@Operation(summary = "Find a product")
@GetMapping("/{id}")
ProductDto find(@PathVariable long id) {
    return service.find(id);
}`,
    "What does an OpenAPI document describe?",
    [
      "An HTTP API's paths, operations, inputs, and responses.",
      "The JVM heap layout.",
      "A database's physical backup format.",
      "The Git history of an application.",
    ],
    0,
    "OpenAPI describes an API contract so tools and people can understand its operations and data.",
  ),
};
