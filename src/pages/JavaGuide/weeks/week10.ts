import { createTopicGuide } from "./createTopicGuide";

export const week10Topics = {
  "10-0": createTopicGuide(
    "Inversion of Control means an application delegates object creation and lifecycle management to a container. Dependency Injection is a way to implement IoC by supplying a class's dependencies from outside, preferably through its constructor.",
    [
      "IoC describes who controls object creation.",
      "DI provides required collaborators to an object.",
      "Constructor injection makes required dependencies explicit and testable.",
    ],
    `@Service
class OrderService {
    private final OrderRepository repository;
    OrderService(OrderRepository repository) {
        this.repository = repository;
    }
}`,
    "How does dependency injection reduce coupling?",
    [
      "A class receives an abstraction instead of constructing a concrete dependency itself.",
      "It forces every class to use static fields.",
      "It removes all dependencies from the application.",
      "It makes object creation happen in controllers only.",
    ],
    0,
    "Providing dependencies externally lets implementations be replaced and makes classes easier to test.",
  ),
  "10-1": createTopicGuide(
    "A Spring bean is an object managed by the ApplicationContext. The default singleton scope means one bean instance per bean definition per application context; prototype creates a new instance when requested, while web scopes are tied to web lifecycles.",
    [
      "@Component and its stereotypes are discovered by component scanning.",
      "@Bean declares a bean from a configuration method.",
      "Singleton scope does not automatically make mutable bean state thread-safe.",
    ],
    `@Configuration
class AppConfig {
    @Bean
    Clock applicationClock() {
        return Clock.systemUTC();
    }
}`,
    "What does Spring's singleton scope mean?",
    [
      "One bean instance per bean definition in an ApplicationContext.",
      "One instance for the entire distributed system.",
      "A new instance on every method call.",
      "The bean cannot have dependencies.",
    ],
    0,
    "Spring singleton scope is scoped to a bean definition and its container, not a JVM-wide guarantee across all applications.",
  ),
  "10-2": createTopicGuide(
    "Spring Boot auto-configuration conditionally creates useful beans based on the classpath, existing beans, and configuration properties. @SpringBootApplication combines configuration, auto-configuration, and component scanning; user-defined beans can replace many defaults.",
    [
      "Auto-configuration is conditional, not unconditional magic.",
      "Starters bring in common dependencies that enable features.",
      "The condition evaluation report helps explain why configuration matched.",
    ],
    `@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`,
    "What commonly influences Spring Boot auto-configuration?",
    [
      "Classpath contents, existing beans, and configuration properties.",
      "Only the name of the main class.",
      "The Git branch name.",
      "The order in which source files appear in a folder.",
    ],
    0,
    "Auto-configuration conditions use available classes, beans, and environment settings to choose defaults.",
  ),
  "10-3": createTopicGuide(
    "Spring profiles allow environment-specific beans and settings to be activated without changing source code. Externalized configuration can come from properties or YAML and can be overridden by environment variables or command-line arguments according to Spring Boot's property precedence.",
    [
      "Activate a profile with spring.profiles.active or deployment configuration.",
      "Use profiles for environment differences, not as a substitute for secure secret handling.",
      "@ConfigurationProperties binds related settings to a typed object.",
    ],
    `# application-prod.yml
spring:
  datasource:
    url: \${DATABASE_URL}

# Run with: java -jar app.jar --spring.profiles.active=prod`,
    "Why use a Spring profile?",
    [
      "To activate environment-specific configuration or beans.",
      "To compile one source file at a time.",
      "To automatically encrypt every property.",
      "To replace dependency injection.",
    ],
    0,
    "Profiles select configuration and beans appropriate to environments such as development or production.",
  ),
};
