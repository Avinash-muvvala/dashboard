import { createTopicGuide } from "./createTopicGuide";

export const week19Topics = {
  "19-0": createTopicGuide(
    "JUnit 5 tests use annotations such as @Test and assertions to verify behavior. A focused unit test arranges inputs, invokes the operation, and asserts an observable result; parameterized tests can reuse a case structure with multiple inputs.",
    [
      "@BeforeEach prepares state for each test when needed.",
      "Use assertEquals, assertTrue, and assertThrows to express expectations.",
      "Keep a test focused on one behavior and readable failure messages.",
    ],
    `@Test
void rejectsNegativeQuantity() {
    assertThrows(IllegalArgumentException.class,
        () -> cart.add("book", -1));
}`,
    "What does assertThrows verify?",
    [
      "That the action throws the expected exception type.",
      "That a method always returns null.",
      "That a test is skipped.",
      "That a dependency is constructed by Spring.",
    ],
    0,
    "assertThrows passes when the supplied action throws an exception assignable to the expected type.",
  ),
  "19-1": createTopicGuide(
    "Mockito creates test doubles for dependencies. Tests can stub a collaborator's response with when/thenReturn and verify important interactions; avoid verifying incidental implementation details that make tests brittle.",
    [
      "Stub a dependency when its behavior must be controlled.",
      "Verify interactions only when they are part of the behavior being tested.",
      "Use the Mockito extension or Spring test integration consistently.",
    ],
    `when(repository.findById(7L)).thenReturn(Optional.of(order));
Order result = service.find(7L);
assertEquals(order, result);
verify(repository).findById(7L);`,
    "What does Mockito's verify(repository).save(...) check?",
    [
      "That the expected interaction occurred.",
      "That the repository connected to production.",
      "That all database tables are sorted.",
      "That the test method was compiled twice.",
    ],
    0,
    "Mockito verification checks whether a collaborator was called with the expected arguments.",
  ),
  "19-2": createTopicGuide(
    "A test fixture is the setup data and objects needed to express a test scenario. Small builders or factory methods can reduce repeated setup while keeping each test's important inputs visible.",
    [
      "Keep fixtures deterministic and minimal.",
      "Prefer named builders when objects have many fields.",
      "Avoid shared mutable fixture state between tests.",
    ],
    `Order order = anOrder()
    .withStatus(OrderStatus.NEW)
    .withLine("book", 2)
    .build();`,
    "Why use a test fixture builder?",
    [
      "To make repeated test setup clear and reusable.",
      "To share mutable state between all tests.",
      "To replace assertions.",
      "To execute production deployments.",
    ],
    0,
    "A builder can express scenario setup clearly and reduce duplicated object construction.",
  ),
  "19-3": createTopicGuide(
    "Assertions state the expected outcome of a test. Use assertions that identify the behavior under test and include useful messages when they improve diagnosis; assertThrows is appropriate for expected failure behavior.",
    [
      "Assert externally observable results.",
      "Avoid asserting irrelevant private implementation details.",
      "Use grouped assertions only when collecting multiple related failures is useful.",
    ],
    `assertAll(
    () -> assertEquals("Ada", result.name()),
    () -> assertEquals(3, result.orders().size())
);`,
    "What should an assertion communicate?",
    [
      "The expected result of the behavior under test.",
      "The order in which the JVM loads classes.",
      "A replacement for input validation.",
      "A Docker image tag.",
    ],
    0,
    "Assertions compare actual behavior with the expectation that defines the test.",
  ),
  "19-4": createTopicGuide(
    "Mocking replaces a collaborator with a controlled test double. It isolates a unit from external systems, but excessive mocking can couple tests to implementation; use a real lightweight object or fake when that gives clearer, more reliable tests.",
    [
      "Mock boundaries such as repositories, gateways, or external clients.",
      "Do not mock simple value objects without a reason.",
      "Use integration tests to verify wiring and collaboration with real infrastructure.",
    ],
    `PaymentGateway gateway = mock(PaymentGateway.class);
when(gateway.charge(any())).thenReturn(ChargeResult.approved());
CheckoutService service = new CheckoutService(gateway);`,
    "When is mocking a dependency useful?",
    [
      "When isolating a unit from a collaborator or external side effect.",
      "When testing that a real database starts successfully.",
      "When every object in the test must be fake.",
      "When asserting a UI color.",
    ],
    0,
    "A mock controls a collaborator so a unit's behavior can be tested independently.",
  ),
};
