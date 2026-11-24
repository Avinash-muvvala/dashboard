import { createTopicGuide } from "./createTopicGuide";

export const week20Topics = {
  "20-0": createTopicGuide(
    "Spring Boot integration tests load real application components so the test can verify that configuration, dependency injection, and collaborating layers work together. Use @SpringBootTest for broad application-context tests, and prefer narrower tests when a full context is not needed.",
    [
      "@SpringBootTest creates an application context for the test.",
      "Use test-specific configuration and data so results are repeatable.",
      "Keep a focused unit-test suite in addition to slower integration tests.",
    ],
    `@SpringBootTest
class OrderServiceIntegrationTest {
    @Autowired OrderService orderService;

    @Test
    void createsAnOrder() {
        assertNotNull(orderService.create(sampleRequest()));
    }
}`,
    "What does a Spring Boot integration test primarily verify?",
    [
      "That multiple configured application components work together.",
      "Only the syntax of a Java method.",
      "The production server's public IP address.",
      "That every possible input has been tested.",
    ],
    0,
    "Integration tests exercise collaboration between components and their application configuration.",
  ),
  "20-1": createTopicGuide(
    "Testcontainers starts disposable instances of services such as databases for tests. This lets tests use the same database engine as production instead of relying on an in-memory substitute with potentially different SQL and behavior.",
    [
      "Containers are started for the test lifecycle and cleaned up.",
      "Pin an appropriate image version for repeatable test environments.",
      "The test environment needs a working container runtime.",
    ],
    `@Testcontainers
class RepositoryIntegrationTest {
    @Container
    static PostgreSQLContainer<?> database =
        new PostgreSQLContainer<>("postgres:16");
}`,
    "Why use Testcontainers for a database integration test?",
    [
      "To test against a real database engine in a disposable environment.",
      "To avoid executing SQL during the test.",
      "To replace every unit test with a container.",
      "To deploy the database to production.",
    ],
    0,
    "A disposable real database catches differences that an in-memory substitute may not reproduce.",
  ),
  "20-2": createTopicGuide(
    "Database integration tests verify persistence behavior against a database, including mappings, constraints, queries, and migrations. Isolate test data and use the production database engine where practical to avoid false confidence from different dialects.",
    [
      "Run schema migrations as part of the test setup when appropriate.",
      "Use unique or isolated test data to prevent order-dependent failures.",
      "Test transaction and constraint behavior that matters to the application.",
    ],
    `@DataJpaTest
class OrderRepositoryTest {
    @Autowired OrderRepository repository;

    @Test
    void findsOrdersByStatus() {
        assertTrue(repository.findByStatus(NEW).isEmpty());
    }
}`,
    "What should a database integration test help validate?",
    [
      "Persistence mappings and queries against a database.",
      "Only the visual layout of the application.",
      "That production data is copied into test runs.",
      "That the compiler can find a main method.",
    ],
    0,
    "Database tests exercise persistence behavior such as mappings, queries, and constraints.",
  ),
  "20-3": createTopicGuide(
    "API integration tests send requests through the web layer and verify status codes, response bodies, validation, and relevant interactions. MockMvc tests run without a live server; full end-to-end tests may use a running application and HTTP client.",
    [
      "Check both successful responses and expected error cases.",
      "Verify request validation and serialization at the API boundary.",
      "Avoid relying on shared external services for routine tests.",
    ],
    `mockMvc.perform(post("/api/orders")
        .contentType(MediaType.APPLICATION_JSON)
        .content(invalidOrderJson()))
    .andExpect(status().isBadRequest());`,
    "What is a useful API integration test assertion?",
    [
      "The HTTP status and response behavior for a representative request.",
      "The private field order inside a controller.",
      "The database administrator's password.",
      "The exact time the test machine boots.",
    ],
    0,
    "API tests should verify observable HTTP behavior such as status, payload, and validation responses.",
  ),
  "20-4": createTopicGuide(
    "Spring test slices load a focused part of the application, such as MVC or JPA, to make tests faster and clearer than loading the full context. Use @WebMvcTest for the MVC layer and @DataJpaTest for repositories, adding mocks or test database configuration as needed.",
    [
      "@WebMvcTest focuses on controllers and MVC configuration.",
      "@DataJpaTest focuses on JPA repositories and persistence setup.",
      "@SpringBootTest is appropriate when broader wiring needs verification.",
    ],
    `@WebMvcTest(OrderController.class)
class OrderControllerTest {
    @Autowired MockMvc mockMvc;
    @MockBean OrderService orderService;
}`,
    "Which test annotation is designed to focus on the MVC layer?",
    [
      "@WebMvcTest",
      "@DataJpaTest",
      "@SpringBootTest only",
      "@Testcontainers only",
    ],
    0,
    "@WebMvcTest loads a focused MVC slice for controller and web-layer testing.",
  ),
};
