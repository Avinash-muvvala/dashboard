import { createTopicGuide } from "./createTopicGuide";

export const week23Topics = {
  "23-0": createTopicGuide(
    "Spring Boot Actuator exposes operational endpoints for health, metrics, and application information. Expose only the endpoints and details needed by operators, and protect sensitive endpoints with network controls and authentication.",
    [
      "Keep the endpoint surface minimal.",
      "Do not expose environment variables, configuration, or sensitive details publicly.",
      "Use health groups to distinguish liveness from readiness when appropriate.",
    ],
    `management:
  endpoints:
    web:
      exposure:
        include: health,info
  endpoint:
    health:
      probes:
        enabled: true`,
    "What should guide which Actuator endpoints are exposed?",
    [
      "Operational need and least exposure of sensitive information.",
      "A goal to publish every endpoint publicly.",
      "The number of Java classes in the project.",
      "The local developer's browser preference.",
    ],
    0,
    "Expose only useful endpoints and protect any operational information that should not be public.",
  ),
  "23-1": createTopicGuide(
    "Structured logging records event fields in a machine-readable format so log systems can filter and correlate activity. Include useful context such as a request ID, but omit credentials, tokens, and unnecessary personal data.",
    [
      "Use consistent fields and log levels.",
      "Include correlation IDs across related operations.",
      "Treat logs as sensitive operational data and avoid secrets.",
    ],
    `log.atInfo()
    .addKeyValue("requestId", requestId)
    .addKeyValue("orderId", orderId)
    .log("Order created");`,
    "Why add a request or correlation ID to structured logs?",
    [
      "To connect log events from the same request across components.",
      "To replace application authentication.",
      "To hide all error details from operators.",
      "To identify the database password.",
    ],
    0,
    "A correlation identifier helps operators trace related events across a request's execution path.",
  ),
  "23-2": createTopicGuide(
    "Metrics measure application behavior over time, such as request duration, error counts, and resource usage. Micrometer provides a vendor-neutral instrumentation facade; use bounded dimensions and avoid unique user or request IDs as metric labels.",
    [
      "Track service-level signals such as latency, traffic, errors, and saturation.",
      "High-cardinality tags can cause excessive storage and memory use.",
      "Choose names and units consistently.",
    ],
    `Timer.builder("orders.create.duration")
    .description("Time spent creating an order")
    .register(meterRegistry)
    .record(() -> orderService.create(request));`,
    "Why should metric labels have bounded cardinality?",
    [
      "To prevent an unbounded number of distinct time series.",
      "To make every metric value identical.",
      "To avoid collecting any operational data.",
      "To store passwords in metric names.",
    ],
    0,
    "Unique or unbounded labels can create huge numbers of time series and overload monitoring systems.",
  ),
  "23-3": createTopicGuide(
    "Health checks report whether an application process is alive and whether it is ready to serve traffic. Liveness should detect a process that needs restarting; readiness should account for dependencies needed to serve requests and can control traffic routing.",
    [
      "Do not make liveness depend on every remote service, which can cause restart cascades.",
      "Readiness should represent the application's ability to accept work.",
      "Keep probes fast and avoid exposing detailed internal state publicly.",
    ],
    `management.endpoint.health.probes.enabled=true

# Common probe paths:
# /actuator/health/liveness
# /actuator/health/readiness`,
    "What does a readiness check indicate?",
    [
      "Whether the instance is prepared to receive traffic.",
      "Whether the JVM has ever started.",
      "Whether all unit tests passed in CI.",
      "Whether a container image was signed.",
    ],
    0,
    "Readiness tells an orchestrator whether the instance should receive requests.",
  ),
  "23-4": createTopicGuide(
    "Caching can reduce repeated work and latency, but introduces consistency, invalidation, and memory trade-offs. Define what is cached, its expiration policy, and how updates invalidate or refresh entries; measure the effect rather than caching speculatively.",
    [
      "Use a cache key that uniquely represents the inputs to the result.",
      "Choose expiration and invalidation behavior based on freshness needs.",
      "Avoid caching sensitive user-specific data without careful isolation.",
    ],
    `@Cacheable(cacheNames = "catalog", key = "#category")
public List<Item> findItems(String category) {
    return repository.findByCategory(category);
}`,
    "What is a central concern when adding a cache?",
    [
      "Keeping cached data sufficiently fresh through expiration or invalidation.",
      "Ensuring the database is never updated.",
      "Making every cache entry permanent.",
      "Using the same key for unrelated inputs.",
    ],
    0,
    "A cache can serve stale data unless expiry and invalidation behavior are deliberately designed.",
  ),
  "23-5": createTopicGuide(
    "Graceful error handling returns stable, useful responses without exposing internal stack traces or secrets. Centralized exception handling can map known failures to appropriate HTTP status codes and a consistent error response; unexpected failures should be logged with safe diagnostic context.",
    [
      "Use appropriate 4xx responses for invalid or unauthorized requests.",
      "Avoid leaking stack traces, SQL, tokens, or internal implementation details.",
      "Return a consistent error structure and correlate it with safe logs.",
    ],
    `@RestControllerAdvice
class ApiExceptionHandler {
    @ExceptionHandler(OrderNotFoundException.class)
    ResponseEntity<ApiError> notFound(OrderNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiError("ORDER_NOT_FOUND"));
    }
}`,
    "What should a production API error response avoid?",
    [
      "Internal stack traces and sensitive implementation details.",
      "A stable error code.",
      "An appropriate HTTP status.",
      "A correlation identifier when useful.",
    ],
    0,
    "Detailed internals can expose sensitive information; return a safe public error while retaining diagnostic logs.",
  ),
};
