import { createTopicGuide } from "./createTopicGuide";

export const week15Topics = {
  "15-0": createTopicGuide(
    "A one-to-many association models one parent related to multiple child entities. In a relational database, the foreign key is commonly stored on the many side, so the child's @ManyToOne field usually owns the relationship.",
    [
      "Use @OneToMany on the parent collection.",
      "The child-side @ManyToOne commonly owns the foreign key.",
      "Keep both sides synchronized in helper methods for bidirectional mappings.",
    ],
    `@OneToMany(mappedBy = "customer")
private List<Order> orders = new ArrayList<>();

@ManyToOne
private Customer customer;`,
    "In a typical one-to-many JPA mapping, where is the foreign key stored?",
    [
      "On the many side, represented by the child's @ManyToOne.",
      "In every parent row as a list of child IDs.",
      "Only in Java memory.",
      "In the primary-key sequence table.",
    ],
    0,
    "A relational foreign key is commonly stored in the child table, making the many side the owning side.",
  ),
  "15-1": createTopicGuide(
    "Many-to-one means many child records can refer to one parent record. It is usually the owning side because its table contains the foreign-key column; use lazy loading when related data is not always needed.",
    [
      "The association uses @ManyToOne.",
      "@JoinColumn can name the foreign-key column.",
      "A foreign-key constraint keeps the database relationship valid.",
    ],
    `@ManyToOne(fetch = FetchType.LAZY, optional = false)
@JoinColumn(name = "department_id")
private Department department;`,
    "What does a many-to-one relationship represent?",
    [
      "Many records can reference the same related record.",
      "One row contains every row in the database.",
      "Every record must have a unique parent table.",
      "A relationship with no foreign key or join table.",
    ],
    0,
    "Multiple child rows can store the same parent foreign-key value.",
  ),
  "15-2": createTopicGuide(
    "Many-to-many relates multiple records on each side and is commonly stored through a join table. If the association needs attributes such as enrollment date or quantity, model the join table as its own entity instead of a bare many-to-many mapping.",
    [
      "@ManyToMany describes the association in the object model.",
      "@JoinTable configures the relational join table.",
      "An explicit association entity is clearer when the link has its own fields or lifecycle.",
    ],
    `@ManyToMany
@JoinTable(name = "student_course",
    joinColumns = @JoinColumn(name = "student_id"),
    inverseJoinColumns = @JoinColumn(name = "course_id"))
private Set<Course> courses = new HashSet<>();`,
    "When is an explicit association entity preferable to @ManyToMany?",
    [
      "When the relationship itself has attributes or behavior.",
      "Whenever the entities have different class names.",
      "Only when there is no database.",
      "When a foreign key is not allowed.",
    ],
    0,
    "A link entity can store relationship-specific data and make ownership and lifecycle clearer.",
  ),
  "15-3": createTopicGuide(
    "Cascade settings propagate selected persistence operations from one entity to associated entities. They do not mean that every association should be deleted together; choose cascade types according to ownership and lifecycle, and use orphan removal only when disassociation should delete the child.",
    [
      "CascadeType.PERSIST propagates persistence.",
      "CascadeType.REMOVE propagates deletion and needs particular care.",
      "Cascade and fetch strategy solve different problems.",
    ],
    `@OneToMany(
    mappedBy = "order",
    cascade = CascadeType.PERSIST,
    orphanRemoval = true)
private List<OrderLine> lines = new ArrayList<>();`,
    "What does a cascade option control?",
    [
      "Whether selected persistence operations propagate to related entities.",
      "Whether a relationship is loaded lazily.",
      "Whether SQL queries are sorted.",
      "Whether an entity has a primary key.",
    ],
    0,
    "Cascade controls propagation of lifecycle operations; fetching controls when related data is loaded.",
  ),
  "15-4": createTopicGuide(
    "Fetch strategy determines when related data is loaded. Lazy fetching defers loading until access, while eager fetching requests the association with its owner; query-specific fetch joins or entity graphs are often safer than making every association eager.",
    [
      "Lazy associations can trigger queries when accessed.",
      "Eager loading can retrieve more data than a use case needs.",
      "Use entity graphs or fetch joins for intentional query-specific loading.",
    ],
    `@EntityGraph(attributePaths = "items")
Optional<Order> findWithItemsById(Long id);`,
    "What is the goal of lazy fetching?",
    [
      "Defer loading an association until it is accessed.",
      "Never load the association.",
      "Load every association immediately.",
      "Cache the association permanently.",
    ],
    0,
    "Lazy fetching postpones loading related data until application code accesses it.",
  ),
};
