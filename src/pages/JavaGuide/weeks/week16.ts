import { createTopicGuide } from "./createTopicGuide";

export const week16Topics = {
  "16-0": createTopicGuide(
    "Spring Data derives simple queries from repository method names such as findByStatus. The method name must follow supported keywords and property paths; for complex queries, prefer an explicit @Query or a custom repository implementation.",
    [
      "The method name refers to entity properties, not database columns.",
      "Derived methods support predicates, sorting, and limiting keywords.",
      "Keep very long derived names readable by switching to an explicit query.",
    ],
    `List<Order> findByStatusAndCreatedAtAfter(
    OrderStatus status, Instant start);`,
    "What does a derived repository query use to build its predicate?",
    [
      "The repository method name and entity property names.",
      "The name of a controller route.",
      "The order of fields in a YAML file.",
      "The Java package name only.",
    ],
    0,
    "Spring Data parses supported method-name keywords and property paths to create the query.",
  ),
  "16-1": createTopicGuide(
    "JPQL queries the entity model using entity names and properties, then the persistence provider translates the query to SQL. It is portable across databases when it avoids provider-specific extensions.",
    [
      "JPQL uses entity and property names.",
      "The provider translates JPQL to database SQL.",
      "Use parameters instead of concatenating untrusted values into query strings.",
    ],
    `@Query("select o from Order o where o.status = :status")
List<Order> findByStatus(@Param("status") OrderStatus status);`,
    "Which names appear in a JPQL query?",
    [
      "Entity names and mapped properties.",
      "Only physical table and column names.",
      "Controller class and method names.",
      "Build-tool task names.",
    ],
    0,
    "JPQL is expressed against the JPA entity model, not directly against relational table names.",
  ),
  "16-2": createTopicGuide(
    "A native query is written in the database's SQL dialect and targets tables and columns. It can use database-specific features or complex SQL, but it is less portable and must remain aligned with the actual schema.",
    [
      "Use native SQL for a concrete database-specific requirement.",
      "Bind parameters rather than building SQL with string concatenation.",
      "Consider mapping and pagination behavior when returning entities or projections.",
    ],
    `@Query(value = "select * from orders where status = :status",
       nativeQuery = true)
List<Order> findNative(@Param("status") String status);`,
    "What is a trade-off of using a native SQL query?",
    [
      "It can use database-specific SQL but is less portable.",
      "It cannot accept parameters.",
      "It always loads every table.",
      "It bypasses the database entirely.",
    ],
    0,
    "Native SQL enables database-specific features at the cost of greater coupling to that database and schema.",
  ),
  "16-3": createTopicGuide(
    "Flyway tracks schema changes as ordered versioned migrations, commonly named V1__description.sql. Applied migrations are recorded in a schema history table; create a new migration for later changes instead of editing migrations already shared.",
    [
      "Versioned scripts are applied in order.",
      "Migration history is stored in the target database.",
      "Test migrations against both a fresh database and an upgraded schema.",
    ],
    `-- V3__add_order_status.sql
ALTER TABLE orders
    ADD COLUMN status VARCHAR(30) NOT NULL DEFAULT 'NEW';`,
    "What should you do when a schema change is needed after a migration was applied?",
    [
      "Add a new versioned migration.",
      "Silently edit the applied migration.",
      "Delete the schema history table.",
      "Run the same migration repeatedly by hand.",
    ],
    0,
    "A new migration preserves the recorded history and applies the change consistently to every environment.",
  ),
  "16-4": createTopicGuide(
    "Liquibase records schema changes as changesets identified by author and ID, commonly in XML, YAML, JSON, or SQL changelogs. It tracks executed changesets and supports preconditions and rollback definitions when configured.",
    [
      "A changeset is a uniquely identified unit of schema change.",
      "Changelogs can be expressed in multiple supported formats.",
      "Review generated SQL and test changesets before production deployment.",
    ],
    `databaseChangeLog:
  - changeSet:
      id: 3
      author: team
      changes:
        - addColumn:
            tableName: orders
            columns:
              - column:
                  name: status
                  type: varchar(30)`,
    "How does Liquibase identify a changeset?",
    [
      "By its id and author within the changelog.",
      "By the current Git username only.",
      "By a database query's result count.",
      "By its file size.",
    ],
    0,
    "Liquibase uses a changeset's identity, including its id and author, to track whether it has run.",
  ),
  "16-5": createTopicGuide(
    "N+1 occurs when one query loads a group of entities and another query runs for each entity to fetch an association. Detect it through SQL logs or query metrics, then use an entity graph, fetch join, batch fetching, or a projection appropriate to the use case.",
    [
      "The extra query count grows with the number of loaded parents.",
      "Fetching everything eagerly can create large joins and duplicate rows.",
      "Verify the fix by measuring the SQL query count.",
    ],
    `@Query("select distinct o from Order o join fetch o.items")
List<Order> findAllWithItems();`,
    "How can a fetch join help with an N+1 query?",
    [
      "It fetches the association with the parent query.",
      "It disables all SQL queries.",
      "It creates one query per child.",
      "It changes the database schema automatically.",
    ],
    0,
    "A fetch join retrieves the selected association as part of the parent query, reducing per-parent lookups.",
  ),
};
