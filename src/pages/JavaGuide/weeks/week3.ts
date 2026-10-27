export const week3Topics = {
  "3-0": {
    theory:
      "A class is a blueprint or template that defines the structure (fields/attributes) and behavior (methods) that its objects will have. An object is a specific instance of a class, created using the 'new' keyword, with its own actual values stored in memory. Classes model real-world entities — for example, a 'Car' class might define fields like color and speed, and methods like accelerate() or brake(). Each object created from a class gets its own separate copy of instance fields, but shares the same method definitions. Java also supports constructors (special methods used to initialize objects when they're created) and the 'this' keyword (used to refer to the current object's own fields, especially when parameter names shadow field names).",

    keyPoints: [
      "A class is a blueprint; an object is an actual instance created from that blueprint",
      "Fields (instance variables) hold an object's state/data",
      "Methods define an object's behavior",
      "Objects are created using the 'new' keyword, which allocates memory and calls a constructor",
      "Each object has its own copy of instance fields, but methods are shared across all objects",
      "A constructor is a special method (same name as the class, no return type) used to initialize new objects",
      "If no constructor is written, Java provides a default no-argument constructor automatically",
      "The 'this' keyword refers to the current object, often used to distinguish fields from parameters with the same name",
      "Multiple objects of the same class are independent of each other in memory",
    ],

    code: `// Defining a class
class Car {
    // Fields (instance variables)
    String color;
    int speed;

    // Constructor
    Car(String color, int speed) {
        this.color = color; // 'this.color' is the field, 'color' is the parameter
        this.speed = speed;
    }

    // Method (behavior)
    void accelerate() {
        speed += 10;
    }

    void displayInfo() {
        System.out.println("Color: " + color + ", Speed: " + speed);
    }
}

// Creating objects (instances) of the class
Car car1 = new Car("Red", 0);
Car car2 = new Car("Blue", 20);

car1.accelerate();
car1.displayInfo(); // Color: Red, Speed: 10

car2.accelerate();
car2.displayInfo(); // Color: Blue, Speed: 30

// Each object has its OWN copy of fields
System.out.println(car1.color); // Red
System.out.println(car2.color); // Blue (independent from car1)

// Default constructor (if none is written explicitly)
class Point {
    int x;
    int y;
    // No constructor written — Java provides:
    // Point() { } automatically
}

Point p = new Point();
System.out.println(p.x); // 0 (default value)
System.out.println(p.y); // 0 (default value)

// Multiple constructors (constructor overloading)
class Rectangle {
    int width;
    int height;

    Rectangle() {
        this.width = 1;
        this.height = 1;
    }

    Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    int area() {
        return width * height;
    }
}

Rectangle r1 = new Rectangle();          // uses default values
Rectangle r2 = new Rectangle(5, 10);     // uses given values

System.out.println(r1.area()); // 1
System.out.println(r2.area()); // 50

// 'this' keyword used to call another constructor
class Person {
    String name;
    int age;

    Person(String name) {
        this(name, 18); // calls the two-argument constructor below
    }

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

Person p1 = new Person("Alice");
System.out.println(p1.age); // 18 (default from constructor chaining)`,

    quizzes: [
      {
        question:
          "What is the relationship between a class and an object?",
        options: [
          "A class is an instance of an object",
          "A class is a blueprint, and an object is a specific instance created from that blueprint",
          "They are exactly the same thing with different names",
          "An object can exist without a class",
        ],
        correctIndex: 1,
        explanation:
          "A class defines the structure and behavior that its instances will have, while an object is an actual instance created in memory using that blueprint via the 'new' keyword.",
      },
      {
        question:
          "In the constructor 'Car(String color, int speed) { this.color = color; }', what does 'this.color' refer to?",
        options: [
          "The parameter passed into the constructor",
          "The instance field belonging to the current object, as opposed to the parameter",
          "A completely unrelated variable",
          "A static variable shared by all Car objects",
        ],
        correctIndex: 1,
        explanation:
          "'this.color' explicitly refers to the object's own field, distinguishing it from the constructor parameter 'color' which has the same name — this is a common pattern to avoid ambiguity.",
      },
      {
        question:
          "If two Car objects, car1 and car2, are created from the same class, what happens when you change car1's speed field?",
        options: [
          "car2's speed also changes, since they share the same class",
          "Only car1's speed changes — each object has its own independent copy of instance fields",
          "Both objects' speed fields are reset to 0",
          "A compile-time error occurs",
        ],
        correctIndex: 1,
        explanation:
          "Even though car1 and car2 are created from the same class, each object gets its own separate memory for instance fields, so modifying one object's field has no effect on another object's field.",
      },
      {
        question:
          "What happens if a class does not define any constructor at all?",
        options: [
          "The class fails to compile",
          "Java automatically provides a default no-argument constructor",
          "Objects of that class can never be created",
          "All fields become static automatically",
        ],
        correctIndex: 1,
        explanation:
          "If no constructor is explicitly written, Java automatically generates a default no-argument constructor that initializes fields to their default values (0, false, null, etc).",
      },
      {
        question:
          "In the Person class example, what does calling 'this(name, 18);' inside the one-argument constructor do?",
        options: [
          "It creates a brand new, separate Person object",
          "It calls another constructor in the same class, passing along the given arguments",
          "It causes a compile-time error since constructors can't call each other",
          "It refers to a static method named 'this'",
        ],
        correctIndex: 1,
        explanation:
          "Using 'this(...)' inside a constructor calls another constructor of the same class (constructor chaining), allowing you to reuse initialization logic instead of duplicating code.",
      },
      {
        question:
          "Which of the following is shared across all objects of a class, rather than being unique to each object?",
        options: [
          "Instance field values",
          "Method definitions (the code of the methods themselves)",
          "The memory address of each object",
          "The object's constructor call",
        ],
        correctIndex: 1,
        explanation:
          "While each object has its own separate copy of instance field values, the method definitions (the actual code) are defined once in the class and shared by every object created from it.",
      },
    ],
  },
  "3-1": {
    theory:
      "A constructor is a special block of code used to initialize a new object at the moment it's created with the 'new' keyword. Constructors look similar to methods but have no return type (not even void) and must share the exact same name as the class. If a class doesn't define any constructor, Java automatically supplies a default no-argument constructor that sets fields to their default values. Java also supports constructor overloading, where a class has multiple constructors with different parameter lists, giving flexibility in how objects are created. Constructors can call one another using 'this(...)' (constructor chaining), and can call a parent class's constructor using 'super(...)'.",

    keyPoints: [
      "A constructor has the same name as its class and no return type at all (not even void)",
      "Constructors run automatically once, at the moment an object is created with 'new'",
      "If no constructor is written, Java provides a default no-argument constructor automatically",
      "Once you write ANY constructor, Java no longer provides the default one for free",
      "Constructor overloading: a class can have multiple constructors with different parameter lists",
      "'this(...)' calls another constructor in the same class (must be the first line in the constructor)",
      "'super(...)' calls the parent class's constructor (also must be the first line)",
      "Constructors are typically used to set initial values for instance fields",
      "Unlike methods, constructors cannot be called directly on an existing object — only via 'new'",
    ],

    code: `// Basic constructor
class Book {
    String title;
    double price;

    // Constructor - same name as class, no return type
    Book(String title, double price) {
        this.title = title;
        this.price = price;
    }
}

Book b1 = new Book("Java Basics", 29.99);
System.out.println(b1.title); // Java Basics
System.out.println(b1.price); // 29.99

// No constructor written — Java provides a default one
class Point {
    int x;
    int y;
    // Java automatically adds: Point() { }
}

Point p = new Point();
System.out.println(p.x); // 0 (default value, since no custom constructor set it)

// IMPORTANT: once you write a constructor, the free default one disappears
class Item {
    String name;

    Item(String name) {
        this.name = name;
    }
}

// Item i = new Item(); // ERROR! No no-argument constructor exists anymore
Item i = new Item("Pen"); // must supply an argument now

// Constructor overloading
class Rectangle {
    int width;
    int height;

    // No-argument constructor
    Rectangle() {
        this.width = 1;
        this.height = 1;
    }

    // Single-argument constructor (square)
    Rectangle(int side) {
        this.width = side;
        this.height = side;
    }

    // Two-argument constructor
    Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    int area() {
        return width * height;
    }
}

Rectangle r1 = new Rectangle();      // 1 x 1
Rectangle r2 = new Rectangle(4);     // 4 x 4 (square)
Rectangle r3 = new Rectangle(3, 6);  // 3 x 6

System.out.println(r1.area()); // 1
System.out.println(r2.area()); // 16
System.out.println(r3.area()); // 18

// Constructor chaining using this(...)
class Person {
    String name;
    int age;

    Person() {
        this("Unknown", 0); // calls the constructor below
    }

    Person(String name) {
        this(name, 18); // calls the two-argument constructor below
    }

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

Person p1 = new Person();
System.out.println(p1.name + ", " + p1.age); // Unknown, 0

Person p2 = new Person("Alice");
System.out.println(p2.name + ", " + p2.age); // Alice, 18

// super(...) calling parent constructor
class Animal {
    String sound;

    Animal(String sound) {
        this.sound = sound;
    }
}

class Dog extends Animal {
    String breed;

    Dog(String breed) {
        super("Bark"); // must be the first line - calls Animal's constructor
        this.breed = breed;
    }
}

Dog d = new Dog("Labrador");
System.out.println(d.sound + ", " + d.breed); // Bark, Labrador`,

    quizzes: [
      {
        question:
          "Which of the following is a defining rule of a constructor in Java?",
        options: [
          "It must have the return type 'void'",
          "It must have the exact same name as the class and no return type at all",
          "It must be named 'construct'",
          "It must always take at least one parameter",
        ],
        correctIndex: 1,
        explanation:
          "A constructor is required to share the exact same name as its class and must not declare any return type, not even void — this is what distinguishes it from a regular method.",
      },
      {
        question:
          "What happens to Java's automatically provided default constructor once you write your own custom constructor in a class?",
        options: [
          "Nothing changes — the default constructor still exists alongside it",
          "The default no-argument constructor is no longer provided automatically",
          "Java throws a compile-time error immediately",
          "The custom constructor gets renamed automatically",
        ],
        correctIndex: 1,
        explanation:
          "Java only auto-generates the default no-argument constructor when a class defines no constructors at all. As soon as you write even one custom constructor, that free default one disappears.",
      },
      {
        question:
          "In the Rectangle example, which constructor runs when you write 'new Rectangle(4);'?",
        options: [
          "The no-argument constructor",
          "The single-argument constructor, treating it as a square",
          "The two-argument constructor",
          "This causes a compile-time error",
        ],
        correctIndex: 1,
        explanation:
          "Java matches the constructor call to the constructor whose parameter list fits — since only one integer argument is passed, it matches 'Rectangle(int side)', which sets both width and height to that value.",
      },
      {
        question:
          "What rule applies to using 'this(...)' or 'super(...)' inside a constructor?",
        options: [
          "It can appear anywhere within the constructor body",
          "It must be the very first statement in the constructor",
          "It can only be used in the default constructor",
          "It must be the last statement in the constructor",
        ],
        correctIndex: 1,
        explanation:
          "Both 'this(...)' and 'super(...)' must appear as the first line of a constructor, since Java needs to complete that chained initialization before running any other code in the current constructor.",
      },
      {
        question:
          "Given:\nPerson p2 = new Person(\"Alice\");\nusing the Person class from the example, what is the value of p2.age?",
        options: ["0", "18", "It causes a compile error", "It stays uninitialized"],
        correctIndex: 1,
        explanation:
          "The one-argument constructor calls 'this(name, 18)', chaining into the two-argument constructor with age fixed at 18, so p2.age ends up being 18.",
      },
      {
        question:
          "Why can't you call a constructor directly on an already-existing object, like 'myObject.Book(...)'?",
        options: [
          "Constructors are only invoked automatically via the 'new' keyword when creating an object",
          "Constructors are actually just regular methods that can be called anytime",
          "Java doesn't support constructors at all",
          "This is valid Java syntax and works fine",
        ],
        correctIndex: 0,
        explanation:
          "Constructors exist specifically to initialize a new object at the moment of creation, so they are only triggered by the 'new' keyword — they cannot be invoked separately like a normal method afterward.",
      },
    ],
  },
  "3-2": {
    theory:
      "Constructor chaining is the practice of calling one constructor from another within the same class (using 'this(...)') or calling a parent class's constructor from a subclass (using 'super(...)'). This avoids duplicating initialization code across multiple constructors — instead of repeating the same field-setting logic in every overloaded constructor, simpler constructors can delegate to a more complete one. Java enforces strict rules: 'this(...)' or 'super(...)' must be the very first statement in a constructor, and you cannot use both in the same constructor at the same time. If a constructor doesn't explicitly call 'super(...)', Java automatically inserts a call to the parent class's no-argument constructor as the first line.",

    keyPoints: [
      "Constructor chaining means one constructor calls another constructor",
      "this(...) calls another constructor in the SAME class",
      "super(...) calls a constructor in the PARENT class",
      "this(...) or super(...) must be the first statement in a constructor — no exceptions",
      "You cannot use both this(...) and super(...) in the same constructor",
      "If you don't write super(...) explicitly, Java automatically inserts a call to the parent's no-argument constructor",
      "Chaining reduces code duplication by letting constructors reuse each other's initialization logic",
      "If the parent class has no no-argument constructor, subclasses MUST explicitly call super(...) with matching arguments",
    ],

    code: `// this(...) chaining within the same class
class Person {
    String name;
    int age;
    String country;

    // Most complete constructor
    Person(String name, int age, String country) {
        this.name = name;
        this.age = age;
        this.country = country;
    }

    // Chains to the constructor above, filling in a default country
    Person(String name, int age) {
        this(name, age, "Unknown");
    }

    // Chains further down to the constructor above
    Person(String name) {
        this(name, 18);
    }
}

Person p1 = new Person("Alice");
System.out.println(p1.name + ", " + p1.age + ", " + p1.country);
// Alice, 18, Unknown

Person p2 = new Person("Bob", 25);
System.out.println(p2.name + ", " + p2.age + ", " + p2.country);
// Bob, 25, Unknown

// super(...) chaining to a parent class
class Animal {
    String sound;

    Animal(String sound) {
        this.sound = sound;
        System.out.println("Animal constructor called");
    }
}

class Dog extends Animal {
    String breed;

    Dog(String breed) {
        super("Bark"); // must be first line — calls Animal's constructor
        this.breed = breed;
        System.out.println("Dog constructor called");
    }
}

Dog d = new Dog("Labrador");
// Output:
// Animal constructor called
// Dog constructor called
System.out.println(d.sound + ", " + d.breed); // Bark, Labrador

// If super(...) is NOT written, Java inserts a call to the parent's no-arg constructor automatically
class Vehicle {
    Vehicle() {
        System.out.println("Vehicle created");
    }
}

class Car extends Vehicle {
    Car() {
        // Java automatically inserts super(); here as the first line
        System.out.println("Car created");
    }
}

Car c = new Car();
// Output:
// Vehicle created
// Car created

// ERROR CASE: if parent has no no-arg constructor, child MUST call super(...) explicitly
class Shape {
    Shape(String name) { // no no-argument constructor available
        System.out.println("Shape: " + name);
    }
}

class Circle extends Shape {
    Circle() {
        super("Circle"); // REQUIRED — without this, compile error occurs
        System.out.println("Circle created");
    }
}

Circle circ = new Circle();
// Output:
// Shape: Circle
// Circle created

// INVALID: cannot use both this(...) and super(...) together
class Example {
    Example() {
        // this(5);      // ERROR if both used together
        // super();      // Only ONE of these is allowed, and only as the first line
    }
}`,

    quizzes: [
      {
        question:
          "What is the main purpose of constructor chaining?",
        options: [
          "To make objects immutable",
          "To avoid duplicating initialization code by having constructors call each other",
          "To prevent a class from having more than one constructor",
          "To automatically generate getters and setters",
        ],
        correctIndex: 1,
        explanation:
          "Constructor chaining lets simpler constructors delegate to more complete ones (or to a parent constructor), so initialization logic is written once and reused instead of being duplicated across multiple constructors.",
      },
      {
        question:
          "What is the difference between this(...) and super(...) in constructor chaining?",
        options: [
          "They do the exact same thing and are interchangeable",
          "this(...) calls another constructor in the same class; super(...) calls the parent class's constructor",
          "this(...) calls the parent class's constructor; super(...) calls the same class's constructor",
          "Both can only be used in static methods",
        ],
        correctIndex: 1,
        explanation:
          "this(...) is used for chaining between constructors within the SAME class, while super(...) is specifically used to call a constructor defined in the PARENT class.",
      },
      {
        question:
          "Where must this(...) or super(...) appear within a constructor?",
        options: [
          "Anywhere in the constructor body",
          "As the very first statement in the constructor",
          "As the very last statement in the constructor",
          "They must appear together, one after the other",
        ],
        correctIndex: 1,
        explanation:
          "Java requires this(...) or super(...) to be the first statement in a constructor, since the chained initialization must complete before any other code in the current constructor runs.",
      },
      {
        question:
          "What does Java automatically do if a subclass constructor does NOT explicitly call super(...)?",
        options: [
          "The program fails to compile in every case",
          "Java automatically inserts a call to the parent class's no-argument constructor as the first line",
          "The parent class's fields are simply left uninitialized",
          "Java calls this(...) instead automatically",
        ],
        correctIndex: 1,
        explanation:
          "If a constructor doesn't explicitly chain to a parent constructor, Java automatically inserts an implicit call to the parent's no-argument constructor, ensuring the parent is still properly initialized.",
      },
      {
        question:
          "In the Shape/Circle example, why is 'super(\"Circle\")' required in the Circle constructor?",
        options: [
          "It isn't actually required — it's just a stylistic choice",
          "Because Shape has no no-argument constructor, so the child class must explicitly call the matching parent constructor",
          "Because Java doesn't allow inheritance without super()",
          "Because Circle doesn't have any fields of its own",
        ],
        correctIndex: 1,
        explanation:
          "Since the Shape class only defines a constructor that takes a String argument (no no-arg constructor exists), Java cannot auto-insert a default super() call — the subclass must explicitly provide matching arguments.",
      },
      {
        question:
          "Why is it invalid to use both this(...) and super(...) in the same constructor?",
        options: [
          "Because Java constructors can only have one line of code total",
          "Because only one chaining call is allowed as the required first statement, and both are competing for that same position",
          "Because this(...) and super(...) do not actually exist in Java",
          "It's actually valid, and both are commonly used together",
        ],
        correctIndex: 1,
        explanation:
          "Since both this(...) and super(...) must occupy the first statement of a constructor, only one of them can be used in a single constructor — you can never have both at once.",
      },
    ],
  },
  "3-3": {
    theory:
      "Encapsulation is the practice of bundling data (fields) and the methods that operate on that data together within a class, while restricting direct access to the internal state from outside the class. This is typically achieved by making fields 'private' and exposing controlled access through public 'getter' and 'setter' methods. Encapsulation protects an object's internal state from invalid or unintended modification, allows validation logic to be added when data is set, and lets the internal implementation change later without breaking code that uses the class. It's one of the four core pillars of object-oriented programming, alongside inheritance, polymorphism, and abstraction.",

    keyPoints: [
      "Encapsulation bundles fields and methods together and hides internal data from outside access",
      "Fields are typically declared 'private' so they cannot be accessed directly from outside the class",
      "Getter methods (e.g., getName()) provide read access to a private field",
      "Setter methods (e.g., setName(...)) provide controlled write access, often with validation",
      "Encapsulation protects data integrity by preventing invalid values from being set directly",
      "It allows internal implementation to change later without affecting external code that uses the class",
      "Encapsulation is one of the 4 pillars of OOP: Encapsulation, Inheritance, Polymorphism, Abstraction",
      "A class with fully private fields and public getters/setters is often called a 'JavaBean'",
      "Read-only fields can be created by providing only a getter, with no corresponding setter",
    ],

    code: `// WITHOUT encapsulation — fields are public, no protection
class BankAccountUnsafe {
    public double balance; // anyone can directly set this to anything!
}

BankAccountUnsafe unsafe = new BankAccountUnsafe();
unsafe.balance = -5000; // invalid, but nothing stops it
System.out.println(unsafe.balance); // -5000

// WITH encapsulation — fields are private, access controlled through methods
class BankAccount {
    private double balance; // cannot be accessed directly from outside

    public BankAccount(double initialBalance) {
        if (initialBalance >= 0) {
            this.balance = initialBalance;
        } else {
            this.balance = 0;
        }
    }

    // Getter — read access
    public double getBalance() {
        return balance;
    }

    // Setter — write access, with validation logic
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        } else {
            System.out.println("Deposit amount must be positive");
        }
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Invalid withdrawal amount");
        }
    }
}

BankAccount account = new BankAccount(1000);
account.deposit(500);
System.out.println(account.getBalance()); // 1500

account.withdraw(2000); // rejected — insufficient funds
System.out.println("Invalid withdrawal amount"); // printed by withdraw()
System.out.println(account.getBalance()); // 1500 (unchanged)

// account.balance = -999; // COMPILE ERROR — balance is private, inaccessible directly

// Standard getter/setter pattern (JavaBean style)
class Student {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age > 0) {
            this.age = age;
        } else {
            System.out.println("Age must be positive");
        }
    }
}

Student s = new Student();
s.setName("Ravi");
s.setAge(20);
System.out.println(s.getName() + " is " + s.getAge()); // Ravi is 20

s.setAge(-5); // rejected by validation logic
System.out.println(s.getAge()); // 20 (unchanged)

// Read-only field — only a getter, no setter
class Circle {
    private final double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double getRadius() {
        return radius;
    }
    // No setRadius() — radius cannot be changed after creation
}

Circle circle = new Circle(5.0);
System.out.println(circle.getRadius()); // 5.0
// circle.radius = 10; // COMPILE ERROR — private field, no setter available`,

    quizzes: [
      {
        question:
          "What is the main goal of encapsulation in object-oriented programming?",
        options: [
          "To make all fields and methods public for easy access",
          "To bundle data and behavior together while restricting direct access to internal state",
          "To eliminate the need for constructors",
          "To allow multiple classes to share the exact same fields",
        ],
        correctIndex: 1,
        explanation:
          "Encapsulation combines fields and the methods that operate on them into a single class, while hiding the internal data from direct outside access to protect data integrity.",
      },
      {
        question:
          "In a properly encapsulated class, how should fields typically be declared?",
        options: [
          "public, so any class can access them directly",
          "private, so they can only be accessed through public methods",
          "static, so they are shared across all instances",
          "final, so they can never be changed at all",
        ],
        correctIndex: 1,
        explanation:
          "Encapsulation typically involves declaring fields as private, forcing all outside access to go through controlled public getter and setter methods rather than direct field access.",
      },
      {
        question:
          "In the BankAccount example, why does the withdraw() method check 'amount <= balance' before subtracting?",
        options: [
          "To make the code run faster",
          "To validate the operation and protect the object's internal state from becoming invalid (like a negative balance)",
          "This check is unnecessary and has no real purpose",
          "Because Java requires this exact check syntax",
        ],
        correctIndex: 1,
        explanation:
          "This is a core benefit of encapsulation — the setter/method can validate incoming changes before applying them, preventing the object's internal state (balance) from becoming invalid, such as going negative.",
      },
      {
        question:
          "How can you create a 'read-only' field using encapsulation, as shown in the Circle example?",
        options: [
          "Make the field public and never assign it",
          "Provide only a getter method, with no corresponding setter method",
          "Provide only a setter method, with no getter",
          "Declare the field as 'protected' instead of private",
        ],
        correctIndex: 1,
        explanation:
          "By making a field private and providing only a getter (no setter), external code can read the value but has no way to modify it after the object is constructed, effectively making it read-only.",
      },
      {
        question:
          "What is a key long-term benefit of encapsulation regarding a class's internal implementation?",
        options: [
          "The internal implementation can be changed later without breaking external code that uses the class's public methods",
          "It prevents the class from ever being modified again",
          "It automatically makes the code run faster",
          "It removes the need for any methods in the class",
        ],
        correctIndex: 0,
        explanation:
          "Since external code interacts only through public getters/setters (not the fields directly), the internal implementation details can change freely as long as the public method signatures stay the same.",
      },
      {
        question:
          "Which of the following best describes the 'four pillars' of object-oriented programming?",
        options: [
          "Encapsulation, Inheritance, Polymorphism, Abstraction",
          "Loops, Arrays, Classes, Objects",
          "Constructors, Destructors, Getters, Setters",
          "Public, Private, Protected, Default",
        ],
        correctIndex: 0,
        explanation:
          "The four core pillars of OOP are Encapsulation (data hiding), Inheritance (reusing/extending classes), Polymorphism (many forms), and Abstraction (hiding implementation complexity).",
      },
    ],
  },
  "3-4": {
    theory:
      "Getters and setters are public methods used to read and modify the value of a class's private fields, forming the standard implementation technique behind encapsulation. A getter (usually named getFieldName()) returns the current value of a field, while a setter (usually named setFieldName(value)) updates it, often after validating the incoming value. For boolean fields, the getter convention changes slightly, using 'is' instead of 'get' (e.g., isActive() instead of getActive()). Using getters and setters instead of exposing fields directly gives you a single controlled entry point for reading and writing data, where you can add validation, logging, or computed logic at any time without changing how other code interacts with the class.",

    keyPoints: [
      "Getter: a public method that returns the value of a private field, named getFieldName()",
      "Setter: a public method that updates the value of a private field, named setFieldName(value)",
      "For boolean fields, the getter convention is isFieldName() instead of getFieldName()",
      "Setters are the ideal place to add validation logic before updating a field",
      "Getters can also compute and return derived values, not just raw stored fields",
      "Providing only a getter (no setter) makes a field effectively read-only from outside the class",
      "Providing only a setter (no getter) makes a field effectively write-only (less common)",
      "Getters and setters keep field access consistent even if the internal implementation changes later",
      "IDEs can auto-generate standard getters/setters, but custom logic is often added manually inside them",
    ],

    code: `// Basic getter and setter
class Employee {
    private String name;
    private double salary;

    // Getter for name
    public String getName() {
        return name;
    }

    // Setter for name
    public void setName(String name) {
        this.name = name;
    }

    // Getter for salary
    public double getSalary() {
        return salary;
    }

    // Setter for salary — with validation
    public void setSalary(double salary) {
        if (salary >= 0) {
            this.salary = salary;
        } else {
            System.out.println("Salary cannot be negative");
        }
    }
}

Employee emp = new Employee();
emp.setName("Priya");
emp.setSalary(50000);

System.out.println(emp.getName());   // Priya
System.out.println(emp.getSalary()); // 50000.0

emp.setSalary(-1000); // rejected by validation
System.out.println(emp.getSalary()); // 50000.0 (unchanged)

// Boolean getter convention: isFieldName() instead of getFieldName()
class Light {
    private boolean isOn;

    public boolean isOn() { // NOT getIsOn() or getOn()
        return isOn;
    }

    public void setOn(boolean isOn) {
        this.isOn = isOn;
    }
}

Light bulb = new Light();
bulb.setOn(true);
System.out.println(bulb.isOn()); // true

// Getter returning a COMPUTED value, not just a stored field
class Rectangle {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double getWidth() {
        return width;
    }

    public double getHeight() {
        return height;
    }

    // Computed getter — 'area' isn't a stored field, it's calculated on demand
    public double getArea() {
        return width * height;
    }
}

Rectangle rect = new Rectangle(4, 5);
System.out.println(rect.getArea()); // 20.0 (computed, not stored)

// Read-only field (getter only, no setter)
class User {
    private final String id; // assigned once, never changed

    public User(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }
    // No setId() — id cannot be modified after creation
}

User u = new User("USR-001");
System.out.println(u.getId()); // USR-001
// u.setId("USR-002"); // COMPILE ERROR — no such method exists

// Setter with more advanced validation logic
class Product {
    private String name;
    private double price;

    public void setPrice(double price) {
        if (price < 0) {
            System.out.println("Price cannot be negative. Setting to 0.");
            this.price = 0;
        } else if (price > 100000) {
            System.out.println("Price too high. Capping at 100000.");
            this.price = 100000;
        } else {
            this.price = price;
        }
    }

    public double getPrice() {
        return price;
    }
}

Product p = new Product();
p.setPrice(500000); // capped
System.out.println(p.getPrice()); // 100000.0`,

    quizzes: [
      {
        question:
          "What is the standard naming convention for a getter method that returns the value of a private field called 'age'?",
        options: ["age()", "fetchAge()", "getAge()", "returnAge()"],
        correctIndex: 2,
        explanation:
          "The standard Java naming convention for a getter is 'get' followed by the capitalized field name, so a field named 'age' should have a getter named getAge().",
      },
      {
        question:
          "What naming convention is used specifically for getter methods of boolean fields?",
        options: [
          "getFieldName(), same as any other type",
          "isFieldName(), using 'is' instead of 'get'",
          "hasFieldName(), using 'has' instead of 'get'",
          "checkFieldName()",
        ],
        correctIndex: 1,
        explanation:
          "For boolean fields, Java convention replaces 'get' with 'is', so a boolean field named 'isOn' would typically have a getter named isOn() rather than getIsOn().",
      },
      {
        question:
          "In the Product example, what happens when 'p.setPrice(500000);' is called?",
        options: [
          "The price is set directly to 500000",
          "The setter validates and caps the price at 100000 due to the validation logic inside it",
          "A compile-time error occurs",
          "The price becomes 0 automatically",
        ],
        correctIndex: 1,
        explanation:
          "The setPrice() setter contains validation logic that checks if the price exceeds 100000, and if so, caps it at that maximum value instead of allowing the excessive value to be stored directly.",
      },
      {
        question:
          "In the Rectangle example, why does getArea() not correspond to an actual stored field in the class?",
        options: [
          "This is a mistake — getters must always return a stored field directly",
          "Getters can return computed/derived values calculated on demand, not just raw stored fields",
          "Because 'area' is a keyword in Java and cannot be a field name",
          "Because Rectangle does not have a constructor",
        ],
        correctIndex: 1,
        explanation:
          "Getters aren't limited to just returning stored fields — they can also compute and return a derived value each time they're called, like calculating area from width and height on demand.",
      },
      {
        question:
          "How can you make a field 'read-only' from outside its class using getters and setters?",
        options: [
          "Provide both a getter and a setter",
          "Provide only a setter, and no getter",
          "Provide only a getter, and no setter",
          "Declare the field as public instead of private",
        ],
        correctIndex: 2,
        explanation:
          "By providing only a getter method and omitting any setter, external code can read the field's value through the getter but has no method available to modify it afterward.",
      },
      {
        question:
          "What is a key advantage of using getters and setters instead of directly accessing public fields?",
        options: [
          "It makes the code run significantly faster",
          "It provides a single controlled point where validation or logic can be added without changing how other code accesses the class",
          "It removes the need for constructors entirely",
          "It automatically makes all fields static",
        ],
        correctIndex: 1,
        explanation:
          "Getters and setters act as controlled access points, allowing validation, logging, or computed logic to be added or changed later, all without requiring changes to the external code that calls these methods.",
      },
    ],
  },
  "3-5": {
    theory:
      "The 'static' keyword in Java means something belongs to the class itself, not to any one object. A static field is shared by all objects — there is only one copy, no matter how many objects you create. A static method can be called directly using the class name, without creating an object first. Static members are loaded into memory once, when the class is first used, and they stay for the whole program. Static methods cannot use 'this' or access non-static (instance) fields directly, because they don't belong to any single object.",

    keyPoints: [
      "static means 'belongs to the class', not to any single object",
      "A static field is shared by all objects of that class — only one copy exists",
      "A static method can be called using the class name, like ClassName.methodName()",
      "You do NOT need to create an object to use static members",
      "Static members are loaded into memory only once, when the class is first used",
      "Static methods cannot use 'this' and cannot directly access non-static (instance) fields",
      "A common use of static is for counters, constants, and utility/helper methods",
      "'static final' is often used together to create constants (fixed values that never change)",
    ],

    code: `// Static field - shared by all objects
class Counter {
    static int count = 0; // shared by every object

    Counter() {
        count++; // increases the SAME shared value every time
    }
}

Counter c1 = new Counter();
Counter c2 = new Counter();
Counter c3 = new Counter();

System.out.println(Counter.count); // 3 (shared by all objects)

// Static method - called using class name, no object needed
class MathHelper {
    static int square(int num) {
        return num * num;
    }
}

System.out.println(MathHelper.square(5)); // 25 (no 'new' needed)

// Instance field vs static field - the difference
class Student {
    String name;       // instance field - each object has its own copy
    static String school = "ABC School"; // static field - shared by all

    Student(String name) {
        this.name = name;
    }
}

Student s1 = new Student("Ravi");
Student s2 = new Student("Priya");

System.out.println(s1.name);   // Ravi
System.out.println(s2.name);   // Priya
System.out.println(s1.school); // ABC School
System.out.println(s2.school); // ABC School (same value, shared)

Student.school = "XYZ School"; // change through class name
System.out.println(s1.school); // XYZ School (changed for everyone)

// static final - used to make constants
class Circle {
    static final double PI = 3.14159; // constant value, cannot change

    static double area(double radius) {
        return PI * radius * radius;
    }
}

System.out.println(Circle.PI);          // 3.14159
System.out.println(Circle.area(2));     // 12.56636

// Static method CANNOT access non-static fields directly
class Example {
    int instanceValue = 10; // non-static field
    static int staticValue = 20; // static field

    static void show() {
        System.out.println(staticValue); // OK - static can access static
        // System.out.println(instanceValue); // ERROR - cannot access non-static field here
    }
}`,

    quizzes: [
      {
        question:
          "What does the 'static' keyword mean when used on a field?",
        options: [
          "Each object gets its own separate copy of the field",
          "The field is shared by all objects — only one copy exists for the whole class",
          "The field cannot be changed at all",
          "The field only works inside constructors",
        ],
        correctIndex: 1,
        explanation:
          "A static field belongs to the class itself, not any single object. So no matter how many objects you make, they all share and see the same single copy of that field.",
      },
      {
        question:
          "How do you call a static method, using the MathHelper example?",
        options: [
          "You must create an object first, like 'new MathHelper().square(5)'",
          "You can call it directly using the class name, like 'MathHelper.square(5)'",
          "Static methods cannot be called at all",
          "You must use the 'this' keyword to call it",
        ],
        correctIndex: 1,
        explanation:
          "Static methods belong to the class, so they can be called directly using the class name (ClassName.methodName()) without needing to create any object first.",
      },
      {
        question:
          "Given:\nclass Counter {\n  static int count = 0;\n  Counter() { count++; }\n}\nCounter c1 = new Counter();\nCounter c2 = new Counter();\nWhat is Counter.count now?",
        options: ["0", "1", "2", "It gives an error"],
        correctIndex: 2,
        explanation:
          "Since 'count' is static, it is shared by all objects. Each time a new Counter object is made, the constructor runs and increases the SAME shared value, so after 2 objects, count becomes 2.",
      },
      {
        question:
          "Why can't a static method directly access a non-static (instance) field?",
        options: [
          "Because static methods run before the program even starts",
          "Because a static method belongs to the class, not to any particular object, so there is no specific object's field to access",
          "Because instance fields don't really exist in Java",
          "This is not true - static methods can always access instance fields",
        ],
        correctIndex: 1,
        explanation:
          "Instance fields belong to individual objects, but a static method is not tied to any single object. Since there's no specific object to refer to, the static method cannot know which object's field to use.",
      },
      {
        question:
          "What is 'static final' commonly used for, as shown with PI in the Circle example?",
        options: [
          "To create a value that changes often",
          "To create a constant - a fixed value that never changes",
          "To make a field private",
          "To create a temporary variable used only once",
        ],
        correctIndex: 1,
        explanation:
          "'static' makes it shared across the class, and 'final' means it cannot be changed after being set. Together, 'static final' is the standard way to create a true constant value.",
      },
      {
        question:
          "In the Student example, why does changing 'Student.school' affect the value seen through both s1.school and s2.school?",
        options: [
          "Because 'school' is a static field, so all objects share the exact same value",
          "Because 'name' and 'school' are actually the same field",
          "This is a mistake - it should not affect both objects",
          "Because static fields reset automatically when changed",
        ],
        correctIndex: 0,
        explanation:
          "Since 'school' is declared as static, there is only ONE shared copy of it for the whole class. Changing it once through Student.school changes the value that every object sees.",
      },
    ],
  },
  "3-6": {
    theory:
      "The 'final' keyword in Java means once it is declared it can't be changed. It can be used in three places: on a variable, on a method, and on a class. A final variable can only be given a value one time — after that, you cannot change it again. A final method cannot be overridden by a child class. A final class cannot be extended (no other class can inherit from it). 'final' is often used together with 'static' to make constants, and it is also a common way to make code safer by stopping unwanted changes.",

    keyPoints: [
      "final variable: value can be set only once, and cannot be changed after that",
      "final method: cannot be overridden (changed) by a subclass",
      "final class: cannot be extended - no other class can inherit from it",
      "A final variable must be given a value either at declaration or inside the constructor",
      "static final is commonly used together to create constants",
      "final helps make code safer by preventing accidental changes",
      "Example of a final class in Java itself: the String class is final",
      "A final variable holding an object can still have its object's internal data changed - only the reference itself cannot be changed",
    ],

    code: `// final variable - value can be set only once
final int MAX_SPEED = 120;
// MAX_SPEED = 150; // ERROR - cannot change a final variable

System.out.println(MAX_SPEED); // 120

// final variable set inside a constructor
class Car {
    final String chassisNumber; // must be set once, either here or in constructor

    Car(String chassisNumber) {
        this.chassisNumber = chassisNumber; // allowed - first and only time it's set
    }

    void changeNumber(String newNumber) {
        // this.chassisNumber = newNumber; // ERROR - cannot change final field again
    }
}

Car car = new Car("XYZ123");
System.out.println(car.chassisNumber); // XYZ123

// final method - cannot be overridden by child class
class Parent {
    final void showMessage() {
        System.out.println("This method cannot be changed");
    }
}

class Child extends Parent {
    // void showMessage() { // ERROR - cannot override a final method
    //     System.out.println("Trying to change it");
    // }
}

// final class - cannot be extended
final class Utility {
    static void helper() {
        System.out.println("Helper method");
    }
}

// class SubUtility extends Utility { } // ERROR - cannot extend a final class

// static final - used together to make constants
class Constants {
    static final double PI = 3.14159;
    static final String APP_NAME = "MyApp";
}

System.out.println(Constants.PI);      // 3.14159
System.out.println(Constants.APP_NAME); // MyApp

// final variable holding an object - reference cannot change, but object's data CAN change
class Point {
    int x;
    int y;

    Point(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

final Point p = new Point(1, 2);
p.x = 100; // ALLOWED - we are changing data INSIDE the object, not the reference
System.out.println(p.x); // 100

// p = new Point(5, 5); // ERROR - cannot make 'p' point to a different object`,

    quizzes: [
      {
        question:
          "What does a 'final' variable mean in Java?",
        options: [
          "The variable can be changed as many times as needed",
          "The variable's value can be set only once, and cannot be changed after that",
          "The variable is automatically shared by all objects",
          "The variable has no value at all",
        ],
        correctIndex: 1,
        explanation:
          "A final variable can only be given a value one single time. Once it is set (either at declaration or inside a constructor), trying to change it again causes a compile error.",
      },
      {
        question:
          "What happens if you try to override a 'final' method in a child class?",
        options: [
          "It works normally, just like any other method",
          "It causes a compile-time error, because final methods cannot be overridden",
          "The parent method gets deleted automatically",
          "The child class is deleted",
        ],
        correctIndex: 1,
        explanation:
          "A final method is locked and cannot be changed by any child class. If a subclass tries to override it, Java gives a compile-time error.",
      },
      {
        question:
          "What does it mean when a class is declared as 'final', like 'final class Utility'?",
        options: [
          "The class cannot have any methods",
          "The class cannot be extended - no other class can inherit from it",
          "The class can only have one object",
          "The class cannot have a constructor",
        ],
        correctIndex: 1,
        explanation:
          "A final class cannot be used as a parent class. No other class is allowed to extend it, meaning its behavior can never be changed through inheritance.",
      },
      {
        question:
          "Given:\nfinal Point p = new Point(1, 2);\np.x = 100;\nIs this allowed? Why?",
        options: [
          "No, because 'p' is final and cannot be changed at all",
          "Yes, because we are changing the data INSIDE the object, not making 'p' point to a different object",
          "No, this will delete the object",
          "Yes, but only if Point is also final",
        ],
        correctIndex: 1,
        explanation:
          "'final' only stops the variable 'p' from being reassigned to a different object. It does not lock the object's internal data - the fields inside the object can still be changed freely.",
      },
      {
        question:
          "Why is 'static final' commonly used together in Java?",
        options: [
          "To create a value that changes every time the program runs",
          "To create a true constant - one shared value across the class that can never be changed",
          "To make a field private",
          "This combination is not allowed in Java",
        ],
        correctIndex: 1,
        explanation:
          "'static' makes the field shared by the whole class (only one copy), and 'final' makes sure that copy's value can never change - together they create a proper constant.",
      },
      {
        question:
          "Where can a final instance variable be given its value?",
        options: [
          "Only inside a static method",
          "At declaration, or inside the constructor, but only one time total",
          "It can never be given a value",
          "Only inside a getter method",
        ],
        correctIndex: 1,
        explanation:
          "A final variable must be set exactly once - either directly where it is declared, or inside the constructor when the object is created. After that first assignment, it cannot be changed again.",
      },
    ],
  },
  "3-7": {
    theory:
      "An immutable object is an object whose data (state) cannot be changed after it is created. Once you make the object, its values stay the same forever - you cannot modify them. If you want a 'different' value, you must create a brand new object instead of changing the old one. The most well-known immutable class in Java is String. To make your own immutable class, you follow simple rules: make the class 'final', make all fields 'private' and 'final', do not provide any setter methods, and set all field values only once, inside the constructor. Immutable objects are safe to share, easy to understand, and are automatically thread-safe (safe when used by multiple threads at once).",

    keyPoints: [
      "An immutable object's data cannot change after it is created",
      "To get a 'new' value, you must create a new object - you cannot modify the old one",
      "String is the most common example of an immutable class in Java",
      "Rules to create your own immutable class: make the class final, fields private and final, no setters",
      "All field values must be set once, only inside the constructor",
      "If a field is an object (like an array or another class), return a COPY of it in the getter to keep it truly immutable",
      "Immutable objects are automatically safe to use across multiple threads (thread-safe)",
      "Immutable objects are easier to understand because their state never changes unexpectedly",
    ],

    code: `// String is immutable - every change creates a NEW object
String s1 = "Hello";
String s2 = s1.concat(" World");

System.out.println(s1); // Hello (unchanged - original object stays the same)
System.out.println(s2); // Hello World (a completely new String object)

// Common mistake - thinking String changes in place
String name = "Java";
name.concat(" Programming"); // this creates a new object, but it is thrown away
System.out.println(name); // Java (still the same - nothing was saved)

// Creating your own immutable class
final class Student { // step 1: class is final, cannot be extended
    private final String name; // step 2: fields are private and final
    private final int age;

    // step 3: values are set only once, inside the constructor
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // step 4: only getters, NO setters
    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}

Student s = new Student("Ravi", 20);
System.out.println(s.getName()); // Ravi
// s.setName("Kumar"); // ERROR - no setter method exists

// To get a "changed" version, you must create a NEW object
Student updated = new Student(s.getName(), 21); // new object with new age
System.out.println(updated.getAge()); // 21
System.out.println(s.getAge());       // 20 (original object is unchanged)

// Immutable class with an object field (array) - needs a copy to stay safe
final class Team {
    private final String[] players;

    public Team(String[] players) {
        this.players = players.clone(); // make a COPY, don't store the original reference
    }

    public String[] getPlayers() {
        return players.clone(); // return a COPY, so outside code cannot modify the real array
    }
}

String[] original = {"Alice", "Bob"};
Team team = new Team(original);

original[0] = "Changed"; // changing the outside array does NOT affect the Team object
System.out.println(team.getPlayers()[0]); // Alice (still safe, unaffected)

String[] playersCopy = team.getPlayers();
playersCopy[0] = "Hacked"; // changing the returned copy does NOT affect the real data inside Team
System.out.println(team.getPlayers()[0]); // Alice (still safe)`,

    quizzes: [
      {
        question:
          "What does it mean for an object to be 'immutable'?",
        options: [
          "Its data can be changed freely at any time",
          "Its data cannot be changed after the object is created",
          "It has no fields at all",
          "It can only be created once in the whole program",
        ],
        correctIndex: 1,
        explanation:
          "An immutable object's state (its field values) is fixed once the object is created. There is no way to change that data afterward - you must create a new object instead.",
      },
      {
        question:
          "Given:\nString name = \"Java\";\nname.concat(\" Programming\");\nSystem.out.println(name);\nWhat is printed?",
        options: ["Java", "Java Programming", "Programming", "An error occurs"],
        correctIndex: 0,
        explanation:
          "Since String is immutable, concat() creates a brand new String object instead of changing 'name'. But that new object is never saved back into 'name', so 'name' still prints the original value, Java.",
      },
      {
        question:
          "Which of these is NOT one of the standard rules for creating your own immutable class?",
        options: [
          "Make the class final",
          "Make all fields private and final",
          "Provide public setter methods for every field",
          "Set field values only once, inside the constructor",
        ],
        correctIndex: 2,
        explanation:
          "Immutable classes must NOT provide setter methods, since a setter would allow the field's value to be changed after creation, which breaks the whole idea of immutability.",
      },
      {
        question:
          "Why does the Team class use players.clone() instead of directly storing the array that was passed in?",
        options: [
          "clone() is required by Java and has no special reason",
          "To make a separate copy, so changes to the original array from outside cannot affect the Team object's real data",
          "To make the array bigger",
          "Arrays cannot be stored in classes without cloning",
        ],
        correctIndex: 1,
        explanation:
          "If Team stored the original array reference directly, changing the original array from outside would also change the data inside Team. Cloning makes an independent copy, keeping the object truly immutable.",
      },
      {
        question:
          "If you want a 'changed' version of an immutable object, what must you do?",
        options: [
          "Call a setter method to update the existing object",
          "Directly change the private field using reflection only",
          "Create a brand new object with the updated values",
          "It is impossible to ever get a changed version",
        ],
        correctIndex: 2,
        explanation:
          "Since immutable objects cannot be changed after creation, the only way to get different values is to create a completely new object, leaving the original object untouched.",
      },
      {
        question:
          "What is a key benefit of immutable objects when used with multiple threads?",
        options: [
          "They automatically run faster than mutable objects",
          "They are automatically thread-safe, since their data can never change after creation",
          "They use less memory than any other object",
          "They can only be used by one thread ever",
        ],
        correctIndex: 1,
        explanation:
          "Since immutable objects never change after they are created, multiple threads can read them at the same time without any risk of one thread seeing a partially-changed or corrupted value.",
      },
    ],
  },
};
