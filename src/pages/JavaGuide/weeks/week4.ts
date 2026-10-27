export const week4Topics = {
 "4-0": {
    theory:
      "Inheritance means a child class gets (inherits) the properties (fields) and behaviors (methods) of a parent class. It is like a son getting some features from his father. The parent class is called the 'superclass' (or base class), and the child class is called the 'subclass' (or derived class). We use the keyword 'extends' to do inheritance. Java does NOT support multiple inheritance with classes - this means one child class cannot extend two parent classes at the same time. Java avoids this to prevent a problem called the 'Diamond Problem'. Instead, Java supports other useful types of inheritance: single inheritance, multilevel inheritance, and hierarchical inheritance.",

    keyPoints: [
      "Inheritance means a child class gets fields and methods from a parent class",
      "Parent class = superclass (or base class), Child class = subclass (or derived class)",
      "Keyword used: 'extends'",
      "Main benefit: code reusability - you don't need to write the same code again",
      "Java does NOT allow a class to extend two classes at the same time (no multiple inheritance with classes)",
      "Reason: to avoid the 'Diamond Problem' (explained below)",
      "Single inheritance: one child class inherits from one parent class",
      "Multilevel inheritance: a chain - grandparent to parent to child",
      "Hierarchical inheritance: one parent class, many child classes",
      "Java allows multiple inheritance only through interfaces, not through classes",
    ],

    code: `// SINGLE INHERITANCE - one child, one parent
class Animal {
    void eat() {
        System.out.println("This animal eats food");
    }
}

class Dog extends Animal { // Dog inherits from Animal
    void bark() {
        System.out.println("Dog barks");
    }
}

Dog d = new Dog();
d.eat();  // inherited from Animal
d.bark(); // Dog's own method


// THE DIAMOND PROBLEM - why Java does NOT allow multiple inheritance with classes

// Imagine this was allowed (this code does NOT actually compile in Java):
class A {
    void show() {
        System.out.println("A's show method");
    }
}

class B {
    void show() {
        System.out.println("B's show method");
    }
}

// class C extends A, B { } // NOT ALLOWED in Java!

// Problem: if class C could extend BOTH A and B,
// and we call c.show(), Java would get CONFUSED:
// Does it mean A's show() or B's show()?
// This confusion is called the DIAMOND PROBLEM.
// To avoid this confusion completely, Java simply does not allow
// a class to extend more than one class.


// MULTILEVEL INHERITANCE - a chain: grandparent -> parent -> child
class Grandparent {
    void oldMethod() {
        System.out.println("Grandparent method");
    }
}

class Parent extends Grandparent {
    void middleMethod() {
        System.out.println("Parent method");
    }
}

class Child extends Parent { // Child gets features from BOTH Parent and Grandparent
    void newMethod() {
        System.out.println("Child method");
    }
}

Child c = new Child();
c.oldMethod();    // from Grandparent
c.middleMethod(); // from Parent
c.newMethod();    // Child's own method


// HIERARCHICAL INHERITANCE - one parent, many children
class Vehicle {
    void start() {
        System.out.println("Vehicle starts");
    }
}

class Car extends Vehicle {
    void drive() {
        System.out.println("Car drives");
    }
}

class Bike extends Vehicle {
    void ride() {
        System.out.println("Bike rides");
    }
}

Car car = new Car();
car.start(); // inherited from Vehicle
car.drive();

Bike bike = new Bike();
bike.start(); // inherited from Vehicle (same parent, different child)
bike.ride();


// How Java DOES allow multiple inheritance - through INTERFACES only
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable { // OK! Multiple interfaces are allowed
    public void fly() {
        System.out.println("Duck flies");
    }
    public void swim() {
        System.out.println("Duck swims");
    }
}

Duck duck = new Duck();
duck.fly();
duck.swim();`,

    quizzes: [
      {
        question:
          "What is the simple meaning of inheritance in Java?",
        options: [
          "A child class gets the fields and methods of a parent class",
          "Two unrelated classes share the exact same name",
          "A class can only have one method",
          "All classes automatically become private",
        ],
        correctIndex: 0,
        explanation:
          "Inheritance means a child class (subclass) receives the properties and behaviors of a parent class (superclass), similar to how a child inherits features from a parent in real life.",
      },
      {
        question:
          "Which keyword is used in Java to create inheritance between classes?",
        options: ["implements", "extends", "inherits", "super"],
        correctIndex: 1,
        explanation:
          "The 'extends' keyword is used when a class wants to inherit from another class, for example: 'class Dog extends Animal'.",
      },
      {
        question:
          "Why does Java NOT allow a class to extend two classes at the same time (multiple inheritance)?",
        options: [
          "Because Java classes cannot have more than one method",
          "To avoid the Diamond Problem, where Java gets confused about which parent's method to use if both parents have a method with the same name",
          "Because Java does not support the 'extends' keyword",
          "Because two classes cannot exist in the same program",
        ],
        correctIndex: 1,
        explanation:
          "If a class could extend two parent classes that both have a method with the same name, Java would not know which version to use. This confusion is called the Diamond Problem, so Java avoids it by disallowing multiple class inheritance.",
      },
      {
        question:
          "In multilevel inheritance (Grandparent -> Parent -> Child), what methods can the Child class use?",
        options: [
          "Only its own methods",
          "Only the Parent's methods",
          "Its own methods, plus the Parent's methods, plus the Grandparent's methods",
          "Only the Grandparent's methods",
        ],
        correctIndex: 2,
        explanation:
          "In multilevel inheritance, features pass down through the chain. So the Child class gets its own methods, the Parent's methods, and even the Grandparent's methods, since Parent already inherited from Grandparent.",
      },
      {
        question:
          "What best describes hierarchical inheritance?",
        options: [
          "One parent class, many child classes inheriting from it separately",
          "A chain of classes: grandparent to parent to child",
          "One child class extending two parent classes",
          "A class inheriting from itself",
        ],
        correctIndex: 0,
        explanation:
          "Hierarchical inheritance means ONE parent class is extended by MULTIPLE child classes separately, like both Car and Bike extending the same Vehicle class, but Car and Bike are not related to each other.",
      },
      {
        question:
          "How does Java allow a class to have 'multiple inheritance'-like behavior, even though it doesn't allow extending two classes?",
        options: [
          "By using the 'extends' keyword twice",
          "By implementing multiple interfaces using the 'implements' keyword",
          "This is not possible in Java at all",
          "By creating two separate constructors",
        ],
        correctIndex: 1,
        explanation:
          "Java does not allow a class to extend two classes, but it DOES allow a class to implement multiple interfaces (using 'implements'), which gives similar flexibility without causing the Diamond Problem, since interfaces (before Java 8) had no method bodies.",
      },
    ],
  },
  "4-1": {
    theory:
      "Both inheritance and composition are ways to reuse code between classes, but they work differently. Inheritance means a class 'IS-A' type of another class (for example, Dog IS-A Animal). Composition means a class 'HAS-A' another class inside it as a field (for example, Car HAS-A Engine). In inheritance, the child class extends the parent class directly. In composition, one class simply creates an object of another class and uses it. Many experts say 'favor composition over inheritance', because composition is more flexible - you can easily change the inner object later, and it avoids problems that come from deep inheritance chains.",

    keyPoints: [
      "Inheritance = IS-A relationship (Dog IS-A Animal)",
      "Composition = HAS-A relationship (Car HAS-A Engine)",
      "Inheritance uses the 'extends' keyword",
      "Composition simply stores another class's object as a field",
      "Inheritance can only extend ONE class (no multiple inheritance)",
      "Composition can combine MANY objects easily inside one class",
      "Composition is more flexible - you can change the inner object at runtime",
      "Common advice: 'Favor composition over inheritance' when possible",
      "Inheritance can break easily if the parent class changes; composition is safer",
    ],

    code: `// INHERITANCE example - IS-A relationship
class Animal {
    void eat() {
        System.out.println("Animal eats");
    }
}

class Dog extends Animal { // Dog IS-A Animal
    void bark() {
        System.out.println("Dog barks");
    }
}

Dog dog = new Dog();
dog.eat();  // inherited
dog.bark(); // own method


// COMPOSITION example - HAS-A relationship
class Engine {
    void start() {
        System.out.println("Engine starts");
    }
}

class Car { // Car HAS-A Engine (Engine is a field inside Car)
    private Engine engine = new Engine(); // composition here

    void drive() {
        engine.start(); // Car uses Engine's method through the field
        System.out.println("Car is driving");
    }
}

Car car = new Car();
car.drive();
// Output:
// Engine starts
// Car is driving


// Why composition is more flexible - easy to change the inner object
class PetrolEngine {
    void start() {
        System.out.println("Petrol engine starts");
    }
}

class ElectricEngine {
    void start() {
        System.out.println("Electric engine starts");
    }
}

class Car2 {
    private PetrolEngine engine; // can be swapped for a different engine type easily

    Car2(PetrolEngine engine) {
        this.engine = engine;
    }

    void drive() {
        engine.start();
    }
}

Car2 myCar = new Car2(new PetrolEngine());
myCar.drive(); // Petrol engine starts


// Problem with deep inheritance chains (why composition can be safer)
class A {
    void method1() {
        System.out.println("A method1");
    }
}

class B extends A {
    void method2() {
        System.out.println("B method2");
    }
}

class C extends B { // C depends on both A and B
    void method3() {
        System.out.println("C method3");
    }
}

// If class A changes its code later, it can accidentally break B and C too,
// because they are tightly connected through inheritance.


// Composition version of the same idea - looser connection
class Helper {
    void doWork() {
        System.out.println("Helper does work");
    }
}

class Worker {
    private Helper helper = new Helper(); // Worker HAS-A Helper, not IS-A Helper

    void performTask() {
        helper.doWork(); // Worker just uses Helper, less tightly connected
        System.out.println("Worker performs task");
    }
}

Worker worker = new Worker();
worker.performTask();`,

    quizzes: [
      {
        question:
          "What relationship does inheritance represent?",
        options: [
          "HAS-A relationship",
          "IS-A relationship",
          "USES-A relationship",
          "No relationship at all",
        ],
        correctIndex: 1,
        explanation:
          "Inheritance means one class IS a type of another class, like 'Dog IS-A Animal'. That's why we use 'extends' to model this relationship.",
      },
      {
        question:
          "What relationship does composition represent?",
        options: [
          "IS-A relationship",
          "HAS-A relationship",
          "EXTENDS-A relationship",
          "None of these",
        ],
        correctIndex: 1,
        explanation:
          "Composition means one class HAS another class inside it as a field, like 'Car HAS-A Engine'. The Car class simply uses an Engine object, it does not become an Engine itself.",
      },
      {
        question:
          "In the Car example using composition, how does Car use the Engine's start() method?",
        options: [
          "By extending the Engine class",
          "By creating an Engine object as a field, and calling engine.start()",
          "Car cannot use Engine's methods at all",
          "By copying Engine's code directly into Car",
        ],
        correctIndex: 1,
        explanation:
          "In composition, Car creates an Engine object as a private field. Then Car simply calls engine.start() through that field, without needing to extend the Engine class.",
      },
      {
        question:
          "Why do many developers say 'favor composition over inheritance'?",
        options: [
          "Because composition is always faster to run",
          "Because composition is more flexible - you can easily swap or change the inner object without breaking things",
          "Because inheritance is not allowed in Java",
          "Because composition uses less memory always",
        ],
        correctIndex: 1,
        explanation:
          "Composition lets you change the inner object easily (like swapping PetrolEngine for ElectricEngine) without major changes. Inheritance is more rigid, and deep inheritance chains can break easily if the parent class changes.",
      },
      {
        question:
          "What is a common problem with deep inheritance chains, like class C extends B extends A?",
        options: [
          "They run faster than composition",
          "If class A changes, it can accidentally break class B and C too, since they are tightly connected",
          "They cannot compile at all",
          "There is no problem with deep inheritance chains",
        ],
        correctIndex: 1,
        explanation:
          "In a deep inheritance chain, child classes are tightly connected to their parent's code. If the parent class (A) changes something, it can unexpectedly break the child classes (B and C) that depend on it.",
      },
      {
        question:
          "Which of the following best shows composition (HAS-A), not inheritance (IS-A)?",
        options: [
          "class Bird extends Animal",
          "class Car { private Engine engine = new Engine(); }",
          "class Dog extends Animal",
          "class Square extends Shape",
        ],
        correctIndex: 1,
        explanation:
          "In 'class Car { private Engine engine = new Engine(); }', Car simply holds an Engine object as a field - this is composition (HAS-A). The other options all use 'extends', which is inheritance (IS-A).",
      },
    ],
  },
  "4-2": {
    theory:
      "Polymorphism means 'many forms'. In Java, it means the same method name can behave differently depending on the situation. There are two types of polymorphism in Java: compile-time polymorphism (also called method overloading) and runtime polymorphism (also called method overriding). Method overloading means having multiple methods with the SAME name but DIFFERENT parameters (different number or type of arguments) in the SAME class. Java decides which method to call at compile time, based on the arguments you pass. Method overriding means a child class provides its OWN version of a method that already exists in the parent class, with the EXACT same name and parameters. Java decides which version to run at runtime, based on the actual object type.",

    keyPoints: [
      "Polymorphism means 'many forms' - same method name, different behavior",
      "Two types: Method Overloading (compile-time) and Method Overriding (runtime)",
      "Overloading: same method name, different parameters, in the SAME class",
      "Overloading is decided at COMPILE time based on the arguments you pass",
      "Overriding: child class rewrites a parent method with the SAME name and SAME parameters",
      "Overriding is decided at RUNTIME based on the actual object type (not the reference type)",
      "Overriding requires inheritance (a parent-child relationship between classes)",
      "@Override annotation is commonly used above an overriding method (helps catch mistakes)",
      "Overriding lets a single reference variable behave differently depending on what object it actually holds",
    ],

    code: `// METHOD OVERLOADING (Compile-time Polymorphism)
// Same method name 'add', but different parameters
class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) { // different number of parameters
        return a + b + c;
    }

    double add(double a, double b) { // different type of parameters
        return a + b;
    }
}

Calculator calc = new Calculator();
System.out.println(calc.add(2, 3));       // 5 (calls int, int version)
System.out.println(calc.add(2, 3, 4));    // 9 (calls int, int, int version)
System.out.println(calc.add(2.5, 3.5));   // 6.0 (calls double, double version)

// Java decides WHICH method to call at COMPILE time, based on arguments given


// METHOD OVERRIDING (Runtime Polymorphism)
// Child class rewrites parent's method - SAME name, SAME parameters
class Animal {
    void makeSound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    @Override // helps catch mistakes, like wrong method name or parameters
    void makeSound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Cat meows");
    }
}

Animal a1 = new Dog(); // reference type: Animal, actual object: Dog
Animal a2 = new Cat(); // reference type: Animal, actual object: Cat

a1.makeSound(); // Dog barks (decided at RUNTIME, based on actual object)
a2.makeSound(); // Cat meows (decided at RUNTIME, based on actual object)

// Even though both a1 and a2 are typed as 'Animal',
// Java looks at the REAL object at runtime to decide which makeSound() to run.


// Overriding requires SAME name and SAME parameters (not just same name)
class Parent {
    void show(int x) {
        System.out.println("Parent show with int: " + x);
    }
}

class Child extends Parent {
    // This is OVERLOADING, not overriding, because parameters are different
    void show(String x) {
        System.out.println("Child show with String: " + x);
    }
}

Child child = new Child();
child.show(10);      // Parent show with int: 10 (inherited, not overridden)
child.show("Hello");  // Child show with String: Hello (Child's own overloaded method)


// Using super to call the parent's overridden version
class Bird {
    void fly() {
        System.out.println("Bird flies in the sky");
    }
}

class Eagle extends Bird {
    @Override
    void fly() {
        super.fly(); // calls the parent's original version first
        System.out.println("Eagle flies very high");
    }
}

Eagle eagle = new Eagle();
eagle.fly();
// Output:
// Bird flies in the sky
// Eagle flies very high`,

    quizzes: [
      {
        question:
          "What does the word 'polymorphism' mean in simple terms?",
        options: [
          "Only one form, never changing",
          "Many forms - the same method name can behave differently",
          "A class that cannot be inherited",
          "A field that cannot be changed",
        ],
        correctIndex: 1,
        explanation:
          "Polymorphism means 'many forms'. In Java, this means the same method name can do different things depending on how it is called or which object is using it.",
      },
      {
        question:
          "What is method overloading?",
        options: [
          "A child class rewriting a parent class's method with the same parameters",
          "Multiple methods with the SAME name but DIFFERENT parameters, inside the SAME class",
          "A method that runs only one time",
          "A method that cannot be called at all",
        ],
        correctIndex: 1,
        explanation:
          "Overloading means writing several methods with the same name in the same class, but each version takes a different number or type of parameters, so Java can tell them apart.",
      },
      {
        question:
          "When does Java decide which overloaded method to call?",
        options: [
          "At runtime, based on the actual object",
          "At compile time, based on the arguments you pass",
          "Randomly, each time the program runs",
          "Java cannot decide this at all",
        ],
        correctIndex: 1,
        explanation:
          "Overloading is resolved at compile time. Java looks at the number and type of arguments you pass in the method call, and matches it to the correct overloaded version.",
      },
      {
        question:
          "What is method overriding?",
        options: [
          "Writing many methods with different names in the same class",
          "A child class providing its OWN version of a method that already exists in the parent class, with the SAME name and parameters",
          "Deleting a parent class's method completely",
          "Creating a method with no parameters",
        ],
        correctIndex: 1,
        explanation:
          "Overriding happens when a child class rewrites a method it inherited from the parent, using the exact same method name and parameter list, to give its own specific behavior.",
      },
      {
        question:
          "Given:\nAnimal a1 = new Dog();\na1.makeSound();\nIf Dog overrides makeSound(), what gets printed?",
        options: [
          "Animal's version of makeSound() runs, because 'a1' is typed as Animal",
          "Dog's version of makeSound() runs, because Java checks the ACTUAL object at runtime",
          "Both versions run together",
          "This causes a compile-time error",
        ],
        correctIndex: 1,
        explanation:
          "Even though the reference type is Animal, Java looks at the real object stored in memory (a Dog) at runtime, and runs the Dog's overridden version of makeSound(). This is runtime polymorphism.",
      },
      {
        question:
          "In the Parent/Child 'show' example, why is 'child.show(\"Hello\")' considered OVERLOADING and not overriding?",
        options: [
          "Because the method name is different",
          "Because the parameter type is different (int vs String), so it's a completely separate method, not a rewritten version of the same one",
          "Because Child does not extend Parent",
          "Because overriding is not allowed in Java",
        ],
        correctIndex: 1,
        explanation:
          "Overriding requires the EXACT same method name AND same parameters as the parent method. Since Child's show(String x) has a different parameter type than Parent's show(int x), it is a brand new overloaded method, not an override.",
      },
      {
        question:
          "What is the purpose of using 'super.fly()' inside the Eagle class's overridden fly() method?",
        options: [
          "It deletes the parent's fly() method",
          "It calls the parent class's original version of the method before running the child's own code",
          "It causes an infinite loop",
          "It is required for all overridden methods",
        ],
        correctIndex: 1,
        explanation:
          "'super.fly()' lets the child class still run the parent's original method logic, in addition to adding its own new behavior, instead of completely replacing the parent's version.",
      },
    ],
  },
  "4-3": {
    theory:
      "An abstract class is a class that cannot be used to create an object directly. It is made using the 'abstract' keyword. An abstract class can have two kinds of methods: abstract methods (methods with no body, just the method name and parameters) and normal methods (methods with a full body, like usual). When a normal class extends an abstract class, it MUST provide the body for all abstract methods, otherwise that class must also be marked abstract. Abstract classes are useful when you want to give some common code to child classes, but also force each child class to write its own version of certain methods.",

    keyPoints: [
      "An abstract class is created using the 'abstract' keyword",
      "You CANNOT create an object of an abstract class directly using 'new'",
      "An abstract class CAN have a constructor, even though you cannot make an object of it directly",
      "Abstract method: has no body, only a name and parameters, ends with a semicolon",
      "Normal (concrete) method: has a full body, just like a regular method",
      "A child class that extends an abstract class MUST implement all abstract methods, or it must also be abstract",
      "Abstract classes can have fields, constructors, normal methods, AND abstract methods together",
      "Use abstract classes when you want to share common code, but still force children to do some parts themselves",
      "You CAN create a reference variable of an abstract type, and point it to a child object (like Animal a = new Dog())",
    ],

    code: `// Creating an abstract class
abstract class Animal {
    String name;

    // Constructor - abstract classes CAN have constructors
    Animal(String name) {
        this.name = name;
    }

    // Abstract method - NO body, just declaration
    abstract void makeSound();

    // Normal method - HAS a full body
    void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Animal a = new Animal("Test"); // ERROR - cannot create object of abstract class

// Child class MUST implement the abstract method
class Dog extends Animal {
    Dog(String name) {
        super(name); // call parent's constructor
    }

    @Override
    void makeSound() { // providing the body - REQUIRED
        System.out.println(name + " says Woof!");
    }
}

class Cat extends Animal {
    Cat(String name) {
        super(name);
    }

    @Override
    void makeSound() {
        System.out.println(name + " says Meow!");
    }
}

Dog dog = new Dog("Rex");
dog.makeSound(); // Rex says Woof!
dog.sleep();     // Rex is sleeping (inherited normal method)

Cat cat = new Cat("Whiskers");
cat.makeSound(); // Whiskers says Meow!


// Using an abstract type as a reference variable (polymorphism)
Animal a1 = new Dog("Buddy"); // reference type: Animal, actual object: Dog
a1.makeSound(); // Buddy says Woof!


// If a class does NOT implement all abstract methods, it must ALSO be abstract
abstract class Bird extends Animal {
    Bird(String name) {
        super(name);
    }
    // makeSound() is NOT implemented here, so Bird must stay abstract
}

class Sparrow extends Bird {
    Sparrow(String name) {
        super(name);
    }

    @Override
    void makeSound() { // Sparrow FINALLY implements it
        System.out.println(name + " chirps");
    }
}

Sparrow sparrow = new Sparrow("Tweety");
sparrow.makeSound(); // Tweety chirps


// An abstract class can have ZERO abstract methods too (still cannot be instantiated)
abstract class Shape {
    void display() {
        System.out.println("This is a shape");
    }
    // no abstract methods here at all, but Shape is still abstract because of the keyword
}

class Circle extends Shape {
    // no need to implement anything, since there are no abstract methods
}

Circle circle = new Circle();
circle.display(); // This is a shape`,

    quizzes: [
      {
        question:
          "Can you create an object directly from an abstract class using 'new'?",
        options: [
          "Yes, always",
          "No, an abstract class cannot be directly instantiated",
          "Only if it has no constructor",
          "Only if it has no fields",
        ],
        correctIndex: 1,
        explanation:
          "Abstract classes are meant to be extended by other classes, not used directly. Trying to write 'new Animal()' on an abstract class causes a compile-time error.",
      },
      {
        question:
          "What is an abstract method?",
        options: [
          "A method with a complete body, like a normal method",
          "A method with no body at all - only the name and parameters, ending with a semicolon",
          "A method that runs automatically when the class loads",
          "A method that can never be called",
        ],
        correctIndex: 1,
        explanation:
          "An abstract method only declares its name, return type, and parameters, with no body. Any class extending the abstract class must give that method a real body.",
      },
      {
        question:
          "What must happen if a regular (non-abstract) class extends an abstract class with abstract methods?",
        options: [
          "Nothing - the child class can just leave the abstract methods empty",
          "The child class MUST implement (write the body for) all abstract methods, or it must also be marked abstract",
          "The child class is not allowed to have any methods",
          "The abstract methods disappear automatically",
        ],
        correctIndex: 1,
        explanation:
          "A normal (non-abstract) class is required to provide bodies for every abstract method it inherits. If it doesn't do this, that class must also be declared abstract itself.",
      },
      {
        question:
          "Can an abstract class have a constructor, even though you can't create its object directly?",
        options: [
          "No, abstract classes cannot have constructors",
          "Yes, abstract classes can have constructors, which are called when a child object is created using super()",
          "Only if the class has zero fields",
          "Constructors are replaced by abstract methods",
        ],
        correctIndex: 1,
        explanation:
          "Abstract classes CAN have constructors. Even though you cannot make an object of the abstract class itself, its constructor still runs whenever a child class object is created, through super().",
      },
      {
        question:
          "Why would you use an abstract class instead of a normal class?",
        options: [
          "To make sure no class can ever inherit from it",
          "To share some common code with child classes, while forcing them to write their own version of specific methods",
          "To prevent the class from having any fields",
          "Abstract classes have no real purpose",
        ],
        correctIndex: 1,
        explanation:
          "Abstract classes let you provide shared, ready-to-use code (like the sleep() method) while still requiring each child class to define its own specific behavior for certain methods (like makeSound()).",
      },
      {
        question:
          "In the Shape/Circle example, why doesn't Circle need to implement any methods, even though Shape is abstract?",
        options: [
          "Because Circle is also abstract",
          "Because Shape has no abstract methods at all - it is only abstract because of the 'abstract' keyword itself, so there's nothing Circle is forced to implement",
          "Because display() is automatically removed",
          "This is not valid Java code",
        ],
        correctIndex: 1,
        explanation:
          "A class can be marked abstract even without having any abstract methods. In this case, Shape has only a normal method (display()), so any child class like Circle can extend it freely with no required implementations.",
      },
    ],
  },
 "4-4": {
    theory:
      "An interface is like a full blueprint that only tells WHAT a class must do, not HOW to do it. It is created using the 'interface' keyword. Before Java 8, an interface could only have abstract methods (no body at all) and 'public static final' constants. From Java 8 onwards, interfaces can also have 'default' methods (with a body) and 'static' methods (with a body). A class uses the 'implements' keyword to use an interface, and it MUST provide the body for all the interface's abstract methods. A big benefit of interfaces is that a class can implement MANY interfaces at the same time, which gives Java a safe way to have 'multiple inheritance' behavior without the Diamond Problem.",

    keyPoints: [
      "Interface is created using the 'interface' keyword",
      "All methods in an interface are 'public' and 'abstract' by default (before Java 8)",
      "All fields in an interface are automatically 'public static final' (constants)",
      "A class uses 'implements' keyword to use an interface",
      "A class MUST implement ALL abstract methods of an interface, or it must be declared abstract",
      "A class CAN implement MULTIPLE interfaces at the same time (this is how Java allows multiple inheritance safely)",
      "Since Java 8: interfaces can have 'default' methods (with a body) and 'static' methods (with a body)",
      "You CANNOT create an object of an interface directly using 'new'",
      "Interface vs abstract class: interface is 100% abstraction (mostly), abstract class can mix both abstract and normal methods",
    ],

    code: `// Creating a basic interface
interface Animal {
    void eat();  // public abstract by default - no body
    void sleep(); // public abstract by default - no body
}

// A class 'implements' the interface, and MUST provide bodies for all methods
class Dog implements Animal {
    @Override
    public void eat() { // must be public, since interface methods are public
        System.out.println("Dog eats food");
    }

    @Override
    public void sleep() {
        System.out.println("Dog sleeps");
    }
}

// Animal a = new Animal(); // ERROR - cannot create object of an interface directly

Dog dog = new Dog();
dog.eat();   // Dog eats food
dog.sleep(); // Dog sleeps

// Interface reference can point to the implementing class's object
Animal a1 = new Dog();
a1.eat(); // Dog eats food


// Fields in an interface are automatically public static final (constants)
interface Constants {
    int MAX_VALUE = 100; // automatically public static final, cannot be changed
}

class Test implements Constants {
    void show() {
        System.out.println(MAX_VALUE); // 100
        // MAX_VALUE = 200; // ERROR - it's final, cannot be changed
    }
}


// A class implementing MULTIPLE interfaces - Java's safe way of "multiple inheritance"
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable { // implementing TWO interfaces at once
    @Override
    public void fly() {
        System.out.println("Duck flies");
    }

    @Override
    public void swim() {
        System.out.println("Duck swims");
    }
}

Duck duck = new Duck();
duck.fly();  // Duck flies
duck.swim(); // Duck swims


// Java 8+ : default methods (WITH a body) inside an interface
interface Vehicle {
    void start(); // abstract, no body

    default void showInfo() { // default method - HAS a body
        System.out.println("This is a vehicle");
    }
}

class Car implements Vehicle {
    @Override
    public void start() {
        System.out.println("Car starts");
    }
    // showInfo() is NOT required, since it already has a default body
}

Car car = new Car();
car.start();    // Car starts
car.showInfo(); // This is a vehicle (using the default method, without writing it again)


// Java 8+ : static methods inside an interface (called using interface name)
interface MathOperations {
    static int square(int num) { // static method - HAS a body
        return num * num;
    }
}

System.out.println(MathOperations.square(5)); // 25 (called directly using interface name)`,

    quizzes: [
      {
        question:
          "What keyword is used to create an interface, and what keyword does a class use to use it?",
        options: [
          "'interface' to create it, 'extends' to use it",
          "'interface' to create it, 'implements' to use it",
          "'class' to create it, 'implements' to use it",
          "'abstract' to create it, 'extends' to use it",
        ],
        correctIndex: 1,
        explanation:
          "An interface is created using the 'interface' keyword, and a class uses the 'implements' keyword to say that it will provide the required behavior for that interface.",
      },
      {
        question:
          "What happens automatically to fields declared inside an interface?",
        options: [
          "They become private and cannot be used",
          "They automatically become public, static, and final (constants)",
          "They automatically become instance fields, one copy per object",
          "Interfaces cannot have fields at all",
        ],
        correctIndex: 1,
        explanation:
          "Any field written inside an interface is automatically treated as public, static, and final, meaning it behaves as a shared constant value that cannot be changed.",
      },
      {
        question:
          "Can a single class implement more than one interface at the same time in Java?",
        options: [
          "No, a class can only implement one interface",
          "Yes, a class can implement multiple interfaces at the same time",
          "Only abstract classes can do this",
          "Only if the interfaces have the same name",
        ],
        correctIndex: 1,
        explanation:
          "Unlike class inheritance, Java allows a single class to implement as many interfaces as needed, which is how Java achieves safe 'multiple inheritance'-like behavior without the Diamond Problem.",
      },
      {
        question:
          "What is a 'default method' in an interface, introduced in Java 8?",
        options: [
          "A method with no body, just like normal interface methods before Java 8",
          "A method that HAS a body, which implementing classes can use directly without rewriting it",
          "A method that can only be static",
          "A method that automatically deletes itself",
        ],
        correctIndex: 1,
        explanation:
          "A default method is written inside the interface with a full method body. Classes that implement the interface can use this method as-is, without being forced to write their own version.",
      },
      {
        question:
          "In the Vehicle/Car example, why doesn't the Car class need to write its own showInfo() method?",
        options: [
          "Because showInfo() is abstract, so it's optional",
          "Because showInfo() is a default method with its own body already provided in the interface",
          "Because Car does not implement Vehicle",
          "This is an error - Car must provide showInfo()",
        ],
        correctIndex: 1,
        explanation:
          "Since showInfo() is a default method (it already has a body written inside the Vehicle interface), any class implementing Vehicle can use it directly without needing to write it again.",
      },
      {
        question:
          "What is one key difference between an interface and an abstract class?",
        options: [
          "An interface can have normal methods with a body, but an abstract class cannot have any methods at all",
          "An interface is almost fully abstract by nature (with default/static methods as exceptions since Java 8), while an abstract class can freely mix abstract methods and full normal methods",
          "There is no difference between them at all",
          "Abstract classes cannot have constructors, but interfaces can",
        ],
        correctIndex: 1,
        explanation:
          "Traditionally an interface only declares WHAT must be done (mostly abstract methods), while an abstract class can mix abstract methods with fully implemented normal methods and even fields with constructors, giving more flexibility.",
      },
    ],
  },
  "4-5": {
    theory:
      "Access modifiers control WHO can see or use a class, field, method, or constructor. Java has four access modifiers: private, default (no keyword written), protected, and public. 'private' means only the SAME class can access it - nobody else can see it, not even a child class. 'default' (also called package-private) means only classes in the SAME package can access it - you don't write any keyword for this, it happens automatically when you write nothing. 'protected' means the SAME package can access it, PLUS child classes in a DIFFERENT package can also access it. 'public' means EVERYONE can access it, from anywhere - any class, any package.",

    keyPoints: [
      "private: only the SAME class can access it - most restrictive",
      "default (no keyword): only the SAME package can access it",
      "protected: SAME package + child classes (even in different packages) can access it",
      "public: EVERYONE can access it, from any class, any package - least restrictive",
      "Order from most restrictive to least restrictive: private -> default -> protected -> public",
      "Top-level classes can only be public or default (not private or protected)",
      "private fields are commonly used with public getters/setters (encapsulation)",
      "protected is mainly useful when you expect other packages to create child classes",
    ],

    code: `// PRIVATE - only the SAME class can access it
class BankAccount {
    private double balance = 1000; // only BankAccount class can see this

    private void showBalance() { // only BankAccount class can call this
        System.out.println("Balance: " + balance);
    }

    void useIt() {
        showBalance(); // OK - same class
    }
}

BankAccount acc = new BankAccount();
// acc.balance = 500;      // ERROR - private field, cannot access from outside
// acc.showBalance();      // ERROR - private method, cannot access from outside
acc.useIt(); // OK - useIt() is not private


// DEFAULT (no keyword) - only SAME package can access it
class Employee { // no keyword = default access
    int salary = 5000; // no keyword = default field

    void show() { // no keyword = default method
        System.out.println("Salary: " + salary);
    }
}

// Inside the SAME package, this works fine:
Employee emp = new Employee();
emp.show(); // OK - same package
System.out.println(emp.salary); // OK - same package

// From a DIFFERENT package, this would give an ERROR (cannot access default members)


// PROTECTED - SAME package + child classes in OTHER packages too
class Animal {
    protected String sound = "Some sound"; // protected field

    protected void makeSound() { // protected method
        System.out.println("Animal makes: " + sound);
    }
}

// Even in a DIFFERENT package, a CHILD class CAN access protected members:
class Dog extends Animal {
    void bark() {
        System.out.println(sound);  // OK - protected, accessible through inheritance
        makeSound();                // OK - protected, accessible through inheritance
    }
}

Dog dog = new Dog();
dog.bark(); // Animal makes: Some sound


// PUBLIC - accessible from ANYWHERE, any class, any package
public class Car {
    public String model = "Tesla"; // accessible everywhere

    public void drive() { // accessible everywhere
        System.out.println(model + " is driving");
    }
}

Car car = new Car();
System.out.println(car.model); // OK - accessible from anywhere
car.drive(); // OK - accessible from anywhere


// Common real-world pattern: private field + public getter/setter (encapsulation)
class Student {
    private String name; // private - hidden from outside

    public String getName() { // public - accessible from anywhere
        return name;
    }

    public void setName(String name) { // public - accessible from anywhere
        this.name = name;
    }
}

Student s = new Student();
s.setName("Ravi"); // OK - using public setter
System.out.println(s.getName()); // OK - using public getter
// s.name = "Kumar"; // ERROR - name is private, cannot access directly`,

    quizzes: [
      {
        question:
          "Which access modifier is the MOST restrictive, allowing access only from the SAME class?",
        options: ["public", "protected", "default", "private"],
        correctIndex: 3,
        explanation:
          "'private' is the most restrictive access modifier. A private field or method can only be accessed from inside the exact same class where it is declared - not even a child class can access it.",
      },
      {
        question:
          "What does 'default' access mean, when you write NO access modifier keyword at all?",
        options: [
          "Only the same class can access it",
          "Only classes in the SAME package can access it",
          "Everyone everywhere can access it",
          "No one can ever access it",
        ],
        correctIndex: 1,
        explanation:
          "When you write no access modifier keyword, Java applies 'default' (also called package-private) access, which means only classes within the SAME package can access that member.",
      },
      {
        question:
          "What makes 'protected' different from 'default' access?",
        options: [
          "protected is exactly the same as default, no difference",
          "protected also allows child classes in DIFFERENT packages to access it, while default does not",
          "protected is more restrictive than private",
          "protected only works with static fields",
        ],
        correctIndex: 1,
        explanation:
          "'default' only allows access within the same package. 'protected' extends this further - it also allows CHILD classes to access the member, even if that child class is in a completely different package.",
      },
      {
        question:
          "Which access modifier allows access from literally ANY class, in ANY package?",
        options: ["private", "default", "protected", "public"],
        correctIndex: 3,
        explanation:
          "'public' is the least restrictive access modifier. Anything marked public can be accessed from any class, in any package, anywhere in the program.",
      },
      {
        question:
          "In the Student example, why do we make 'name' private but 'getName()' and 'setName()' public?",
        options: [
          "This is a mistake, they should all be private",
          "To hide the actual data (encapsulation) while still allowing safe, controlled access through public methods",
          "Because private fields cannot have any methods at all",
          "Because Java requires all methods to be public",
        ],
        correctIndex: 1,
        explanation:
          "This is a common encapsulation pattern: keep the field private to protect it from direct outside access, but provide public getter/setter methods so other classes can still safely read or update it in a controlled way.",
      },
      {
        question:
          "What is the correct order of access modifiers, from MOST restrictive to LEAST restrictive?",
        options: [
          "public -> protected -> default -> private",
          "private -> default -> protected -> public",
          "default -> private -> public -> protected",
          "protected -> public -> private -> default",
        ],
        correctIndex: 1,
        explanation:
          "The order from most restrictive (fewest classes can access) to least restrictive (most classes can access) is: private, then default, then protected, then public.",
      },
    ],
  },
};
