export type SpringBootPracticeQuestion = {
  question: string;
  answer: string;
};

export const SpringBootPracticeQuestions: Record<
  number,
  SpringBootPracticeQuestion[]
> = {
  1: [
    {
      question: "What problem does Spring Boot solve?",
      answer:
        "Spring Boot reduces Spring configuration by providing auto-configuration, starter dependencies, embedded servers, and production-ready defaults.",
    },
  ],
  2: [
    {
      question: "What is a Spring Boot starter?",
      answer:
        "A starter is a dependency bundle that brings the libraries commonly required for a feature, such as web or data access, with compatible versions.",
    },
  ],
  76: [
    {
      question:
        "What is the difference between @Controller and @RestController?",
      answer:
        "@Controller usually returns a view, while @RestController combines @Controller and @ResponseBody so methods return response data directly.",
    },
  ],
  81: [
    {
      question: "What is dependency injection in Spring?",
      answer:
        "Dependency injection means Spring creates required objects and provides them to a class instead of the class constructing those dependencies itself.",
    },
  ],
  82: [
    {
      question: "Why is constructor injection recommended?",
      answer:
        "Constructor injection makes dependencies explicit, supports immutable fields, improves testability, and prevents partially initialized objects.",
    },
  ],
  83: [
    {
      question: "What is the purpose of @Service?",
      answer:
        "@Service marks a class as a service-layer Spring bean where business logic is commonly implemented.",
    },
  ],
  84: [
    {
      question: "What is the purpose of @Repository?",
      answer:
        "@Repository marks a persistence component and enables Spring's database exception translation for supported data access exceptions.",
    },
  ],
  85: [
    {
      question: "What does @Autowired do?",
      answer:
        "@Autowired asks Spring to resolve and inject a matching bean into a constructor, field, or setter.",
    },
  ],
  86: [
    {
      question: "What is Spring Boot Actuator?",
      answer:
        "Actuator provides production endpoints for monitoring and managing an application, including health, metrics, and environment information.",
    },
  ],
  87: [
    {
      question: "What is Spring Boot auto-configuration?",
      answer:
        "Auto-configuration conditionally configures beans based on the classpath, existing beans, and application properties.",
    },
  ],
  88: [
    {
      question: "What does @SpringBootApplication include?",
      answer:
        "It combines @Configuration, @EnableAutoConfiguration, and @ComponentScan.",
    },
  ],
  89: [
    {
      question: "How are profiles used in Spring Boot?",
      answer:
        "Profiles activate environment-specific beans and configuration, such as separate settings for development, testing, and production.",
    },
  ],
  90: [
    {
      question: "How do you read custom configuration in Spring Boot?",
      answer:
        "Use @Value for individual properties or @ConfigurationProperties for type-safe groups of related properties.",
    },
  ],
  91: [
    {
      question: "How should REST exceptions be handled globally?",
      answer:
        "Use @ControllerAdvice with @ExceptionHandler methods to return consistent error responses across controllers.",
    },
  ],
  92: [
    {
      question: "What is the purpose of ResponseEntity?",
      answer:
        "ResponseEntity lets a controller control the HTTP status, headers, and response body explicitly.",
    },
  ],
  93: [
    {
      question: "What is the difference between PUT and PATCH?",
      answer:
        "PUT generally replaces a resource representation, while PATCH applies a partial update to an existing resource.",
    },
  ],
  94: [
    {
      question: "How does validation work in a Spring Boot REST API?",
      answer:
        "Add Bean Validation annotations to request models and use @Valid or @Validated so invalid input is rejected consistently.",
    },
  ],
  95: [
    {
      question: "What is the N+1 query problem?",
      answer:
        "It occurs when one query loads parent records and an additional query runs for each parent, causing poor database performance.",
    },
  ],
  96: [
    {
      question: "What is the difference between lazy and eager loading?",
      answer:
        "Lazy loading fetches related data when accessed, while eager loading fetches it immediately with the owning entity.",
    },
  ],
  97: [
    {
      question: "What does @Transactional provide?",
      answer:
        "It defines a transaction boundary so related database operations can commit together or roll back when an error occurs.",
    },
  ],
  98: [
    {
      question: "What is Spring Security used for?",
      answer:
        "Spring Security provides authentication, authorization, protection against common attacks, and security integration for Spring applications.",
    },
  ],
  99: [
    {
      question:
        "What is the difference between authentication and authorization?",
      answer:
        "Authentication verifies who a user is, while authorization decides what that authenticated user is allowed to access.",
    },
  ],
  100: [
    {
      question: "How can a Spring Boot application be made production-ready?",
      answer:
        "Use externalized configuration, Actuator health checks, structured logging, metrics, secure secrets, graceful shutdown, and monitoring.",
    },
  ],
  101: [
    {
      question: "What is a service layer in a Spring application?",
      answer:
        "The service layer contains business rules and coordinates repositories or other services independently of web concerns.",
    },
  ],
  102: [
    {
      question: "Why use DTOs in REST APIs?",
      answer:
        "DTOs define a stable API contract, prevent exposing persistence entities directly, and allow request and response shapes to differ.",
    },
  ],
  103: [
    {
      question: "How should database transactions be tested?",
      answer:
        "Test both successful commits and failure rollbacks using an isolated test database or transaction-aware test setup.",
    },
  ],
  104: [
    {
      question: "What is optimistic locking?",
      answer:
        "Optimistic locking detects conflicting updates using a version value and rejects a stale update instead of silently overwriting newer data.",
    },
  ],
  105: [
    {
      question: "What is caching in Spring Boot?",
      answer:
        "Caching stores frequently used results so repeated requests can avoid expensive computation or database calls.",
    },
  ],
  106: [
    {
      question: "How can a Spring Boot application call another service?",
      answer:
        "It can use clients such as RestClient, WebClient, or an HTTP client abstraction with timeouts, retries, and error handling.",
    },
  ],
  107: [
    {
      question: "What is the purpose of integration testing?",
      answer:
        "Integration tests verify that multiple application parts work together, such as controllers, services, repositories, and a database.",
    },
  ],
  108: [
    {
      question: "How should logs be written in a Spring Boot application?",
      answer:
        "Use structured logging with useful context, appropriate levels, and no passwords, tokens, or other sensitive information.",
    },
  ],
  109: [
    {
      question: "How can Spring Boot API performance be improved?",
      answer:
        "Optimize database queries, use pagination, configure connection pools, cache carefully, reduce payload size, and measure before tuning.",
    },
  ],
  110: [
    {
      question:
        "What should be checked before deploying a Spring Boot service?",
      answer:
        "Check configuration, secrets, database migrations, health endpoints, logging, security, resource limits, tests, and rollback readiness.",
    },
  ],
  111: [
    {
      question:
        "What does CRUD stand for, and which HTTP methods commonly implement it?",
      answer:
        "CRUD means Create, Read, Update, and Delete. REST APIs commonly map these operations to POST, GET, PUT, and DELETE respectively.",
    },
    {
      question: "What role does JpaRepository play in CRUD operations?",
      answer:
        "JpaRepository provides ready-to-use persistence methods such as save, findById, findAll, and deleteById, so an application does not need to implement basic database operations itself.",
    },
  ],
  112: [
    {
      question: "What are Spring Data JPA finder methods?",
      answer:
        "Finder methods are repository methods whose names describe the query. Spring Data JPA parses the method name and derives the query automatically, for example findByNameContaining(String name).",
    },
    {
      question: "How can a finder method combine multiple conditions?",
      answer:
        "Use supported keywords such as And and Or in the method name, for example findByNameAndPrice or findByNameOrPrice.",
    },
  ],
  113: [
    {
      question:
        "How do you define a custom query in a Spring Data JPA repository?",
      answer:
        "Use the @Query annotation on a repository method. By default, the query is JPQL; set nativeQuery = true when the query should be database SQL.",
    },
    {
      question: "What annotations are needed for a repository update query?",
      answer:
        "Use @Modifying with @Query for an update or delete query, and execute it within an appropriate transaction.",
    },
  ],
  114: [
    {
      question: "What is JPQL, and what does it query?",
      answer:
        "JPQL is the Java Persistence Query Language. It queries JPA entity types and their fields rather than database tables and columns.",
    },
    {
      question: "Who translates JPQL into database SQL?",
      answer:
        "The JPA provider, such as Hibernate, translates JPQL into SQL appropriate for the configured database.",
    },
  ],
  115: [
    {
      question: "How do you declare a native query in Spring Data JPA?",
      answer:
        "Use @Query with nativeQuery = true. The query is then written in the database's SQL dialect and refers to table and column names.",
    },
    {
      question: "When should a native query be preferred over JPQL?",
      answer:
        "Use one when database-specific features, complex SQL, or a database-specific optimization is required. Prefer JPQL when its entity-based abstraction is sufficient.",
    },
  ],
  116: [
    {
      question: "How does Spring Data JPA pagination work?",
      answer:
        "Pass a Pageable value containing the zero-based page number, page size, and optional sort order to a repository method. The database returns only the requested slice of records.",
    },
    {
      question: "What extra information does Page provide compared with List?",
      answer:
        "Page contains the retrieved records plus pagination metadata, such as the total number of elements and total pages. List contains only the records returned for that query.",
    },
  ],
  117: [
    {
      question: "How can results be sorted with Spring Data JPA?",
      answer:
        'Pass a Sort value, such as Sort.by("price").descending(), or include sort information in a Pageable value.',
    },
    {
      question: "Can pagination and sorting be combined?",
      answer:
        "Yes. Pageable can include both page information and one or more sort orders, allowing the repository to return a sorted page of results.",
    },
  ],
  118: [
    {
      question:
        "What problem does the Spring Data JPA Specification API solve?",
      answer:
        "Specifications represent reusable, composable Criteria API predicates and are useful for queries with optional or dynamic filters.",
    },
    {
      question:
        "What is required to run Specification queries from a repository?",
      answer:
        "The repository should extend JpaSpecificationExecutor<EntityType>. Specifications can then be combined with and(), or(), and not(), and used with pagination through findAll(specification, pageable).",
    },
  ],
  119: [
    {
      question: "What does @OneToOne represent in JPA?",
      answer:
        "It maps a relationship where one entity record is associated with one record in another entity, such as a user and a profile.",
    },
    {
      question: "What are the owning side and mappedBy used for?",
      answer:
        "The owning side defines and manages the relationship, commonly through @JoinColumn. The inverse side uses mappedBy to refer to the owning entity's relationship property.",
    },
  ],
  120: [
    {
      question:
        "What does @OneToMany represent, and where is its foreign key usually stored?",
      answer:
        "It represents one parent associated with multiple child entities. In a relational model, the foreign key is normally stored in the child, or many-side, table.",
    },
    {
      question:
        "What does mappedBy mean in a bidirectional @OneToMany mapping?",
      answer:
        "It marks the inverse side and names the relationship property on the child entity that owns and manages the foreign key mapping.",
    },
  ],
  121: [
    {
      question: "What does @ManyToOne represent in JPA?",
      answer:
        "It represents multiple instances of one entity associated with a single instance of another, such as many orders belonging to one customer.",
    },
    {
      question: "Why is the @ManyToOne side commonly the owning side?",
      answer:
        "The many-side table usually contains the foreign key. Its relationship field, often configured with @JoinColumn, therefore controls the database relationship.",
    },
  ],
  122: [
    {
      question:
        "How is a @ManyToMany relationship represented in a relational database?",
      answer:
        "It is represented with an intermediate join table containing foreign keys to both related tables. @JoinTable can configure the table and its join columns.",
    },
    {
      question:
        "Why should CascadeType.REMOVE be used carefully with @ManyToMany?",
      answer:
        "Related records can be shared by multiple parent entities. Cascading a removal may delete a shared record that is still needed elsewhere.",
    },
  ],
  123: [
    {
      question: "What do JPA cascade types control?",
      answer:
        "They control whether persistence operations on a parent entity, such as persist, merge, or remove, are propagated to related entities.",
    },
    {
      question: "When is CascadeType.REMOVE appropriate?",
      answer:
        "Use it only when the child entity's lifecycle is truly owned by the parent and the child should not remain after the parent is deleted.",
    },
  ],
  124: [
    {
      question: "What is the difference between LAZY and EAGER fetching?",
      answer:
        "LAZY fetching loads related data when it is accessed; EAGER fetching loads it immediately with the owning entity.",
    },
    {
      question:
        "What are the JPA default fetch types for common relationships?",
      answer:
        "@ManyToOne and @OneToOne default to EAGER, while @OneToMany and @ManyToMany default to LAZY. Choose fetching based on the use case and fetch required data deliberately.",
    },
  ],
  125: [
    {
      question: "When does LazyInitializationException occur?",
      answer:
        "It occurs when code accesses an uninitialized lazy relationship after the Hibernate persistence context or session that could load it has closed.",
    },
    {
      question:
        "What are safer alternatives to changing a lazy relationship to EAGER?",
      answer:
        "Fetch the data needed for the specific use case with a JOIN FETCH query, @EntityGraph, DTO projection, or a correctly scoped transaction. Changing to EAGER globally can load unnecessary data.",
    },
  ],
  126: [
    {
      question: "What is the N+1 query problem?",
      answer:
        "One query loads a set of parent records, then accessing related data triggers an additional query for each parent, resulting in one plus N queries.",
    },
    {
      question: "How can you identify and reduce N+1 queries?",
      answer:
        "Inspect generated SQL or query metrics for repeated queries. Depending on the use case, use JOIN FETCH, @EntityGraph, DTO projections, or batch fetching.",
    },
  ],
  127: [
    {
      question: "What does @Transactional provide for JPA operations?",
      answer:
        "It defines a transaction boundary so related database operations can commit together or roll back on failure. It is commonly placed on service-layer methods that coordinate repository work.",
    },
    {
      question: "What is Hibernate dirty checking?",
      answer:
        "Within an active persistence context and transaction, Hibernate tracks managed entities and detects changes. It synchronizes those changes with the database during flush or commit without requiring an explicit save call for every update.",
    },
  ],
  128: [
    {
      question: "What is the purpose of @LastModifiedDate?",
      answer:
        "It automatically records when an audited entity was most recently changed, avoiding manual timestamp updates.",
    },
  ],
  129: [
    {
      question: "How does @Version prevent lost updates?",
      answer:
        "Hibernate includes the version value in the update condition and increments it after a successful update. If another transaction has changed the row, the stale version matches no row and the update is rejected.",
    },
  ],
  130: [
    {
      question: "What is a risk of holding a pessimistic lock for too long?",
      answer:
        "Long-held locks reduce throughput and can cause blocked requests, lock timeouts, or deadlocks.",
    },
  ],
  131: [
    {
      question: "What does EntityManager.merge() return?",
      answer:
        "It returns a managed instance containing the detached object's state. The object passed to merge remains detached.",
    },
  ],
  132: [
    {
      question: "Does EntityManager.flush() commit a transaction?",
      answer:
        "No. flush synchronizes pending persistence-context changes to the database, while commit completes the transaction and makes those changes permanent.",
    },
  ],
  133: [
    {
      question: "Why does dirty checking require a managed entity?",
      answer:
        "Hibernate tracks changes for entities associated with the active persistence context. Detached entities are no longer tracked, so their changes are not automatically synchronized.",
    },
  ],
  134: [
    {
      question: "What is the identity-map behavior of the first-level cache?",
      answer:
        "Within one persistence context, loading the same entity type and ID returns the same managed object instance rather than creating another instance or repeating the lookup.",
    },
  ],
  135: [
    {
      question:
        "What must be considered when enabling Hibernate's second-level cache?",
      answer:
        "Choose and configure a cache provider, select suitable concurrency strategies, and ensure cached data remains consistent with database updates.",
    },
  ],
  136: [
    {
      question: "What does Hibernate's Action Queue do?",
      answer:
        "It holds pending entity inserts, updates, and deletes and orders them for execution when the persistence context is flushed.",
    },
  ],
  137: [
    {
      question: "When are DTO projections useful for query optimization?",
      answer:
        "They are useful when a use case needs only selected fields, reducing unnecessary entity loading, database I/O, and memory use.",
    },
  ],
  138: [
    {
      question:
        "Why should a batch job periodically clear the persistence context?",
      answer:
        "Clearing detaches managed entities and releases first-level-cache memory, helping prevent memory growth when processing large datasets.",
    },
  ],
  139: [
    {
      question: "Why should uploaded files not be stored in a public web root?",
      answer:
        "Keeping uploads outside the public web root reduces the chance that untrusted files can be accessed or executed directly. Validate files and serve them through controlled access instead.",
    },
  ],
  140: [
    {
      question:
        "Which layer should coordinate business rules across repositories?",
      answer:
        "The service layer coordinates repositories and applies business rules, keeping controllers focused on HTTP concerns and repositories focused on persistence.",
    },
  ],
  141: [
    {
      question: "What is the purpose of a PasswordEncoder?",
      answer:
        "It securely hashes passwords for storage and verifies submitted passwords against stored hashes without keeping plaintext passwords.",
    },
  ],
  142: [
    {
      question: "What is the difference between HTTP 401 and 403?",
      answer:
        "HTTP 401 indicates that authentication is missing or invalid. HTTP 403 indicates the user is authenticated but lacks permission for the requested resource.",
    },
  ],
  143: [
    {
      question:
        "What is the role of AuthenticationProvider in Spring Security?",
      answer:
        "An AuthenticationProvider validates a particular kind of authentication request, such as checking user credentials through a UserDetailsService and PasswordEncoder.",
    },
  ],
  144: [
    {
      question:
        "How can an application replace Spring Security's generated default user?",
      answer:
        "Configure an application-specific user store, such as a UserDetailsService backed by a database, or define explicit in-memory users for a development setup.",
    },
    {
      question: "What should a custom SecurityFilterChain configure?",
      answer:
        "It should define which requests are public or protected and configure the authentication mechanisms and security protections required by the application.",
    },
  ],
  145: [
    {
      question:
        "What information does a Spring Security UserDetails object provide?",
      answer:
        "It supplies the username, encoded password, granted authorities, and account status flags that Spring Security needs during authentication and authorization.",
    },
    {
      question:
        "What should loadUserByUsername do when no matching user exists?",
      answer:
        "It should throw UsernameNotFoundException so the authentication provider can reject the login attempt.",
    },
  ],
  146: [
    {
      question:
        "How should an application check a raw password against a stored BCrypt hash?",
      answer:
        "Call PasswordEncoder.matches(rawPassword, encodedPassword). Do not encode the raw password again and compare strings, because BCrypt uses a new salt for each encoding.",
    },
    {
      question: "Why is BCrypt's work factor configurable?",
      answer:
        "It controls the computational cost of hashing. A higher cost makes password guessing more expensive, but should be tuned so legitimate authentication remains acceptably responsive.",
    },
  ],
  147: [
    {
      question:
        "How should passwords be handled during registration and login with BCryptPasswordEncoder?",
      answer:
        "During registration, encode the raw password with `encode()` before storing it. During login, pass the raw password and stored hash to `matches()` to verify the credentials.",
    },
    {
      question:
        "Why should BCrypt hashes not be compared with String.equals()?",
      answer:
        "BCrypt uses a unique salt for each hash, so encoding the same password again produces a different string. `matches()` verifies the raw password against the salt and hash already stored.",
    },
  ],
  148: [
    {
      question:
        "What is the request flow through Spring Security's filter chain?",
      answer:
        "A request passes from the servlet container through `DelegatingFilterProxy` to `FilterChainProxy`, which selects a matching `SecurityFilterChain` and applies its filters before the request can reach the controller.",
    },
    {
      question:
        "How does Spring Security select a SecurityFilterChain for a request?",
      answer:
        "`FilterChainProxy` evaluates the configured request matchers of the registered `SecurityFilterChain` beans and uses the first matching chain.",
    },
  ],
};
