import { createTopicGuide } from "./createTopicGuide";

export const week12Topics = {
  "12-0": createTopicGuide(
    "JPA is a persistence specification; Hibernate is a common provider that implements it. An entity maps a Java class to persistent data, while annotations such as @Entity, @Id, and @GeneratedValue describe its identity and mapping.",
    [
      "A JPA entity needs a primary key.",
      "Keep persistence entities separate from API DTOs when their responsibilities differ.",
      "The persistence provider translates entity operations into database interactions.",
    ],
    `@Entity
class Customer {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
}`,
    "How are JPA and Hibernate related?",
    [
      "JPA is a specification; Hibernate is one implementation.",
      "Hibernate is the specification and JPA is its database.",
      "They are both SQL databases.",
      "JPA is a Spring testing library.",
    ],
    0,
    "JPA defines persistence APIs and behavior; Hibernate is a provider that implements that specification.",
  ),
  "12-1": createTopicGuide(
    "JPA relationships model associations between entities. The owning side controls the foreign key or join table; in a bidirectional mapping, mappedBy identifies the inverse side. Relationship ownership and lifecycle should be designed deliberately.",
    [
      "@ManyToOne commonly stores a foreign key.",
      "mappedBy names the field on the owning side.",
      "Many-to-many mappings use a join table and may be better modeled with an explicit association entity when it has its own data.",
    ],
    `@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "customer_id")
private Customer customer;`,
    "In a bidirectional relationship, what does mappedBy identify?",
    [
      "The inverse side and the owning-side property name.",
      "The database password.",
      "The entity's primary-key generator.",
      "A custom SQL statement.",
    ],
    0,
    "mappedBy marks the non-owning side and points to the association property managed by the owning entity.",
  ),
  "12-2": createTopicGuide(
    "Spring Data JPA can derive queries from repository method names and also supports JPQL and native SQL queries. JPQL refers to entity types and their properties, while native SQL refers to database tables and columns.",
    [
      "Derived methods are convenient for straightforward predicates.",
      "JPQL queries entities rather than table names.",
      "Native queries can use database-specific SQL and should be used intentionally.",
    ],
    `interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(OrderStatus status);

    @Query("select o from Order o where o.total > :minimum")
    List<Order> above(@Param("minimum") BigDecimal minimum);
}`,
    "What does JPQL query?",
    [
      "Entity types and their mapped properties.",
      "Only physical table names.",
      "Java source files.",
      "HTTP routes.",
    ],
    0,
    "JPQL is expressed in terms of the persistence model's entities and fields.",
  ),
  "12-3": createTopicGuide(
    "Database migrations version schema changes as ordered, repeatable deployment steps. Flyway applies versioned SQL migrations; Liquibase represents changesets in supported formats. Keep migrations under source control and test both fresh installs and upgrades.",
    [
      "Migrations provide a reproducible schema history.",
      "Do not edit a migration that has already been applied in shared environments.",
      "Test migration order against the database versions used by the application.",
    ],
    `-- V2__create_customer_table.sql
CREATE TABLE customer (
    id BIGINT PRIMARY KEY,
    name VARCHAR(120) NOT NULL
);`,
    "Why should applied database migrations normally remain unchanged?",
    [
      "Existing environments may already have recorded and run them.",
      "SQL files cannot contain comments.",
      "The database refuses all later migrations.",
      "Migrations are only used by test code.",
    ],
    0,
    "Changing an already-applied migration makes schema history differ between environments; add a new migration instead.",
  ),
  "12-4": createTopicGuide(
    "The N+1 problem occurs when loading a list of parent records triggers an additional query for each parent's related data. Fetch joins, entity graphs, or batch fetching can reduce round trips; choose a strategy that avoids unexpectedly large result sets.",
    [
      "Inspect generated SQL and query counts to detect N+1 behavior.",
      "Use fetch joins or entity graphs for data needed by a specific use case.",
      "Avoid globally eager-fetching every association as a blanket fix.",
    ],
    `@EntityGraph(attributePaths = "items")
List<Order> findByStatus(OrderStatus status);`,
    "Why is an N+1 query pattern inefficient?",
    [
      "It can issue one initial query plus a query for each loaded parent.",
      "It always returns duplicate database rows.",
      "It prevents a transaction from starting.",
      "It removes all indexes from a table.",
    ],
    0,
    "The extra per-parent queries increase database round trips as the number of parent rows grows.",
  ),
};
