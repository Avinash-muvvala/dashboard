export type SqlDifficulty = "Easy" | "Medium" | "Hard";

export interface SqlQuestion {
  id: number;
  title: string;
  topic: string;
  difficulty: SqlDifficulty;
  description: string;
  hint: string;
  /** Reference query. The user's result is compared with this query's result. */
  solution: string;
  /** true when the question asks for a specific ORDER BY */
  orderMatters?: boolean;
}

// Every run starts from a fresh in-memory database built from this script.
export const SEED_SQL = `
CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO departments VALUES
  (1,'Engineering'),(2,'Sales'),(3,'HR'),(4,'Marketing');

CREATE TABLE employees (
  id INTEGER PRIMARY KEY, name TEXT, salary INTEGER,
  department_id INTEGER, manager_id INTEGER, hire_date TEXT, job_title TEXT
);
INSERT INTO employees VALUES
  (1,'Alice',90000,1,7,'2019-01-15','Senior Engineer'),
  (2,'Bob',75000,1,1,'2020-03-10','Engineer'),
  (3,'Carol',75000,1,1,'2021-07-01','Engineer'),
  (4,'David',60000,2,7,'2018-05-20','Sales Manager'),
  (5,'Eve',55000,2,4,'2022-02-11','Sales Rep'),
  (6,'Frank',50000,3,7,'2020-09-30','HR Executive'),
  (7,'Grace',120000,1,NULL,'2017-11-05','CTO'),
  (8,'Heidi',65000,NULL,4,'2021-12-01','Consultant'),
  (9,'Ivan',45000,2,4,'2023-01-10','Sales Rep'),
  (10,'Judy',80000,1,7,'2022-06-15','Tech Lead');

CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT, city TEXT);
INSERT INTO customers VALUES
  (1,'Ann','ann@mail.com','Hyderabad'),
  (2,'Ben','ben@mail.com','Vijayawada'),
  (3,'Cara','cara@mail.com','Hyderabad'),
  (4,'Dev','dev@mail.com','Chennai'),
  (5,'Eli','ann@mail.com','Guntur'),
  (6,'Gus','gus@mail.com','Chennai');

CREATE TABLE orders (
  id INTEGER PRIMARY KEY, customer_id INTEGER, amount INTEGER,
  order_date TEXT, status TEXT
);
INSERT INTO orders VALUES
  (1,1,500,'2024-01-05','Delivered'),
  (2,1,300,'2024-02-10','Delivered'),
  (3,2,700,'2024-01-20','Delivered'),
  (4,3,150,'2024-03-15','Cancelled'),
  (5,3,250,'2024-03-20','Delivered'),
  (6,3,100,'2024-04-01','Pending'),
  (7,5,400,'2024-02-02','Delivered'),
  (8,2,1200,'2024-04-12','Delivered'),
  (9,6,90,'2024-04-15','Pending'),
  (10,1,650,'2024-05-03','Delivered');

CREATE TABLE products (
  id INTEGER PRIMARY KEY, name TEXT, category TEXT, price INTEGER, stock INTEGER
);
INSERT INTO products VALUES
  (1,'Laptop','Electronics',55000,15),
  (2,'Phone','Electronics',30000,40),
  (3,'Headphones','Electronics',2500,100),
  (4,'Desk','Furniture',8000,20),
  (5,'Chair','Furniture',4500,35),
  (6,'Notebook','Stationery',60,500),
  (7,'Pen','Stationery',10,1000),
  (8,'Backpack','Accessories',1800,0);

CREATE TABLE order_items (
  id INTEGER PRIMARY KEY, order_id INTEGER, product_id INTEGER, quantity INTEGER
);
INSERT INTO order_items VALUES
  (1,1,1,1),(2,1,3,1),(3,2,5,1),(4,3,2,1),(5,3,6,10),(6,4,7,20),(7,5,6,5),
  (8,5,3,1),(9,6,5,2),(10,7,4,1),(11,8,1,1),(12,8,2,1),(13,9,7,9),(14,10,2,1);

CREATE TABLE projects (id INTEGER PRIMARY KEY, name TEXT, department_id INTEGER, budget INTEGER);
INSERT INTO projects VALUES
  (1,'Website Revamp',1,500000),(2,'Mobile App',1,800000),(3,'Sales Drive',2,200000),
  (4,'Hiring Portal',3,150000),(5,'Brand Campaign',4,300000);

CREATE TABLE employee_projects (employee_id INTEGER, project_id INTEGER, hours INTEGER);
INSERT INTO employee_projects VALUES
  (1,1,120),(1,2,80),(2,1,100),(3,2,150),(7,2,40),(10,1,60),(4,3,90),(5,3,110),(9,3,70),(6,4,50);

CREATE TABLE monthly_sales (month TEXT, revenue INTEGER);
INSERT INTO monthly_sales VALUES
  ('2024-01',1200),('2024-02',1500),('2024-03',900),('2024-04',1800),('2024-05',2100),('2024-06',1700);

CREATE TABLE logins (id INTEGER PRIMARY KEY, user_id INTEGER, login_date TEXT);
INSERT INTO logins VALUES
  (1,1,'2024-05-01'),(2,1,'2024-05-02'),(3,1,'2024-05-03'),(4,1,'2024-05-05'),(5,1,'2024-05-06'),
  (6,2,'2024-05-01'),(7,2,'2024-05-02'),(8,2,'2024-05-03'),(9,2,'2024-05-04'),
  (10,3,'2024-05-02'),(11,3,'2024-05-10');
`;

export const SCHEMA_TEXT = `departments(id, name)
employees(id, name, salary, department_id, manager_id, hire_date, job_title)
customers(id, name, email, city)
orders(id, customer_id, amount, order_date, status)
products(id, name, category, price, stock)
order_items(id, order_id, product_id, quantity)
projects(id, name, department_id, budget)
employee_projects(employee_id, project_id, hours)
monthly_sales(month, revenue)
logins(id, user_id, login_date)`;

// ⚠️ Add new questions at the END of this array. Ids come from the array
// position, and solved progress is saved by id.
const rawQuestions: Omit<SqlQuestion, "id">[] = [
  {
    title: "List employee names and job titles",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description: "Return the name and job_title of every employee.",
    hint: "Select only the columns you need instead of *.",
    solution: "SELECT name, job_title FROM employees",
  },
  {
    title: "Employees earning more than 60000",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description:
      "Return the name and salary of every employee whose salary is greater than 60000.",
    hint: "Use WHERE with the > operator.",
    solution: "SELECT name, salary FROM employees WHERE salary > 60000",
  },
  {
    title: "Salary between 55000 and 80000",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description:
      "Return name and salary of employees whose salary is between 55000 and 80000, both values included.",
    hint: "BETWEEN includes both ends of the range.",
    solution:
      "SELECT name, salary FROM employees WHERE salary BETWEEN 55000 AND 80000",
  },
  {
    title: "Employees in department 1 or 2",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description: "Return the names of employees whose department_id is 1 or 2.",
    hint: "IN (1, 2) is shorter than writing two OR conditions.",
    solution: "SELECT name FROM employees WHERE department_id IN (1, 2)",
  },
  {
    title: "Names ending with the letter e",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description:
      "Return the names of employees whose name ends with the letter 'e'.",
    hint: "LIKE '%e' matches any text that ends with e.",
    solution: "SELECT name FROM employees WHERE name LIKE '%e'",
  },
  {
    title: "Employees without a department",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description:
      "Return the names of employees who are not assigned to any department.",
    hint: "NULL cannot be compared with =. Use IS NULL.",
    solution: "SELECT name FROM employees WHERE department_id IS NULL",
  },
  {
    title: "Employees without a manager",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description: "Return the names of employees who have no manager.",
    hint: "Same idea as the previous question: IS NULL on manager_id.",
    solution: "SELECT name FROM employees WHERE manager_id IS NULL",
  },
  {
    title: "Customers from Hyderabad or Chennai",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description:
      "Return the name and city of customers who live in Hyderabad or Chennai.",
    hint: "Use IN ('Hyderabad', 'Chennai').",
    solution:
      "SELECT name, city FROM customers WHERE city IN ('Hyderabad', 'Chennai')",
  },
  {
    title: "Distinct customer cities",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description:
      "Return each city that has at least one customer, without repeating cities.",
    hint: "DISTINCT removes duplicate rows.",
    solution: "SELECT DISTINCT city FROM customers",
  },
  {
    title: "Top 3 highest paid employees",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description:
      "Return name and salary of the 3 highest paid employees, highest salary first.",
    hint: "ORDER BY salary DESC, then LIMIT 3.",
    solution: "SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3",
    orderMatters: true,
  },
  {
    title: "Sort by salary, then by name",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description:
      "Return name and salary of all employees ordered by salary high to low. Employees with the same salary must be ordered by name A to Z.",
    hint: "ORDER BY accepts several columns, each with its own direction.",
    solution:
      "SELECT name, salary FROM employees ORDER BY salary DESC, name ASC",
    orderMatters: true,
  },
  {
    title: "Employees ranked 3rd to 5th by salary",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description:
      "Order employees by salary high to low (ties by name A to Z), skip the first 2 rows and return the next 3 as name and salary.",
    hint: "LIMIT 3 OFFSET 2 is how pagination works.",
    solution:
      "SELECT name, salary FROM employees ORDER BY salary DESC, name ASC LIMIT 3 OFFSET 2",
    orderMatters: true,
  },
  {
    title: "Cheap products that are in stock",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description:
      "Return name and price of products that cost less than 5000 and have stock greater than 0.",
    hint: "Combine both conditions with AND.",
    solution:
      "SELECT name, price FROM products WHERE price < 5000 AND stock > 0",
  },
  {
    title: "Orders that are not delivered",
    topic: "Filtering & Sorting",
    difficulty: "Easy",
    description:
      "Return id and status of every order whose status is not 'Delivered'.",
    hint: "Use <> (or !=) for not equal.",
    solution: "SELECT id, status FROM orders WHERE status <> 'Delivered'",
  },
  {
    title: "Count all employees",
    topic: "Aggregation",
    difficulty: "Easy",
    description: "Return the total number of employees.",
    hint: "COUNT(*) counts rows.",
    solution: "SELECT COUNT(*) FROM employees",
  },
  {
    title: "Count employees who have a manager",
    topic: "Aggregation",
    difficulty: "Easy",
    description: "Return how many employees have a manager.",
    hint: "COUNT(column) ignores NULL values, COUNT(*) does not.",
    solution: "SELECT COUNT(manager_id) FROM employees",
  },
  {
    title: "Salary statistics in one row",
    topic: "Aggregation",
    difficulty: "Easy",
    description:
      "Return in a single row: total salary, average salary, highest salary and lowest salary.",
    hint: "SUM, AVG, MAX and MIN can be used together.",
    solution:
      "SELECT SUM(salary), AVG(salary), MAX(salary), MIN(salary) FROM employees",
  },
  {
    title: "Employees per department_id",
    topic: "Aggregation",
    difficulty: "Easy",
    description:
      "Return each department_id with the number of employees in it. Employees without a department form their own group.",
    hint: "GROUP BY keeps NULL values together as one group.",
    solution:
      "SELECT department_id, COUNT(*) FROM employees GROUP BY department_id",
  },
  {
    title: "Find duplicate emails",
    topic: "Aggregation",
    difficulty: "Easy",
    description:
      "Return each email that appears more than once in customers, with how many times it appears.",
    hint: "GROUP BY email, then filter the groups with HAVING.",
    solution:
      "SELECT email, COUNT(*) FROM customers GROUP BY email HAVING COUNT(*) > 1",
  },
  {
    title: "Delivered revenue per customer",
    topic: "Aggregation",
    difficulty: "Easy",
    description:
      "Return customer_id and the total amount of their orders with status 'Delivered'.",
    hint: "WHERE filters rows before GROUP BY runs.",
    solution:
      "SELECT customer_id, SUM(amount) FROM orders WHERE status = 'Delivered' GROUP BY customer_id",
  },
  {
    title: "Customers with at least 2 orders",
    topic: "Aggregation",
    difficulty: "Easy",
    description:
      "Return customer_id and number of orders for customers who placed 2 or more orders.",
    hint: "HAVING filters groups after aggregation.",
    solution:
      "SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id HAVING COUNT(*) >= 2",
  },
  {
    title: "Departments with average salary above 60000",
    topic: "Aggregation",
    difficulty: "Medium",
    description:
      "Return department_id and average salary for departments whose average salary is above 60000. Ignore employees without a department.",
    hint: "Use WHERE for the NULL check and HAVING for the average.",
    solution:
      "SELECT department_id, AVG(salary) FROM employees WHERE department_id IS NOT NULL GROUP BY department_id HAVING AVG(salary) > 60000",
  },
  {
    title: "Number of orders per status",
    topic: "Aggregation",
    difficulty: "Easy",
    description:
      "Return each order status with the number of orders that have it.",
    hint: "GROUP BY status.",
    solution: "SELECT status, COUNT(*) FROM orders GROUP BY status",
  },
  {
    title: "Number of orders per month",
    topic: "Aggregation",
    difficulty: "Medium",
    description:
      "Return the month (format YYYY-MM) and the number of orders placed in that month.",
    hint: "strftime('%Y-%m', order_date) extracts year and month from a date.",
    solution:
      "SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) FROM orders GROUP BY month",
  },
  {
    title: "Highest salary per department",
    topic: "Aggregation",
    difficulty: "Easy",
    description:
      "Return department_id and the highest salary in that department. Ignore employees without a department.",
    hint: "MAX() with GROUP BY.",
    solution:
      "SELECT department_id, MAX(salary) FROM employees WHERE department_id IS NOT NULL GROUP BY department_id",
  },
  {
    title: "Total quantity sold per product",
    topic: "Aggregation",
    difficulty: "Easy",
    description:
      "Return product_id and the total quantity sold, from order_items.",
    hint: "SUM(quantity) grouped by product_id.",
    solution:
      "SELECT product_id, SUM(quantity) FROM order_items GROUP BY product_id",
  },
  {
    title: "Total stock per category",
    topic: "Aggregation",
    difficulty: "Easy",
    description:
      "Return each product category with the sum of stock of its products.",
    hint: "GROUP BY category.",
    solution: "SELECT category, SUM(stock) FROM products GROUP BY category",
  },
  {
    title: "Cities with more than one customer",
    topic: "Aggregation",
    difficulty: "Easy",
    description:
      "Return each city that has more than one customer, with the customer count.",
    hint: "GROUP BY city HAVING COUNT(*) > 1.",
    solution:
      "SELECT city, COUNT(*) FROM customers GROUP BY city HAVING COUNT(*) > 1",
  },
  {
    title: "Employees with their department names",
    topic: "Joins",
    difficulty: "Easy",
    description:
      "Return each employee's name with the name of their department. Employees without a department are not needed.",
    hint: "INNER JOIN on employees.department_id = departments.id.",
    solution:
      "SELECT e.name, d.name FROM employees e JOIN departments d ON e.department_id = d.id",
  },
  {
    title: "All employees, even without a department",
    topic: "Joins",
    difficulty: "Easy",
    description:
      "Return every employee's name with their department name. Employees with no department must still appear (department NULL).",
    hint: "LEFT JOIN keeps all rows from the left table.",
    solution:
      "SELECT e.name, d.name FROM employees e LEFT JOIN departments d ON e.department_id = d.id",
  },
  {
    title: "Departments with no employees",
    topic: "Joins",
    difficulty: "Easy",
    description: "Return the names of departments that have no employees.",
    hint: "LEFT JOIN employees and keep rows where the employee id IS NULL.",
    solution:
      "SELECT d.name FROM departments d LEFT JOIN employees e ON e.department_id = d.id WHERE e.id IS NULL",
  },
  {
    title: "Employee count per department (including empty)",
    topic: "Joins",
    difficulty: "Medium",
    description:
      "Return each department name with its number of employees. Departments with no employees must appear with 0.",
    hint: "LEFT JOIN from departments, then COUNT(e.id) so NULLs are not counted.",
    solution:
      "SELECT d.name, COUNT(e.id) FROM departments d LEFT JOIN employees e ON e.department_id = d.id GROUP BY d.id, d.name",
  },
  {
    title: "Customer names with their order amounts",
    topic: "Joins",
    difficulty: "Easy",
    description:
      "Return the customer name and the amount of each of their orders.",
    hint: "JOIN customers and orders on customer_id.",
    solution:
      "SELECT c.name, o.amount FROM customers c JOIN orders o ON o.customer_id = c.id",
  },
  {
    title: "Customers who never ordered (LEFT JOIN)",
    topic: "Joins",
    difficulty: "Easy",
    description:
      "Return the names of customers who have not placed any order, using a LEFT JOIN.",
    hint: "Keep rows where the order side is NULL.",
    solution:
      "SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL",
  },
  {
    title: "Total spent per customer, highest first",
    topic: "Joins",
    difficulty: "Medium",
    description:
      "Return each customer's name and the total of their orders, from highest to lowest total. Skip customers with no orders.",
    hint: "JOIN, GROUP BY customer, SUM(amount), ORDER BY the sum DESC.",
    solution:
      "SELECT c.name, SUM(o.amount) AS total FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id, c.name ORDER BY total DESC",
    orderMatters: true,
  },
  {
    title: "Order details across three tables",
    topic: "Joins",
    difficulty: "Medium",
    description:
      "Return order id, customer name, product name and quantity for every row of order_items.",
    hint: "Chain joins: order_items -> orders -> customers, and order_items -> products.",
    solution:
      "SELECT o.id, c.name, p.name, oi.quantity FROM order_items oi JOIN orders o ON oi.order_id = o.id JOIN customers c ON o.customer_id = c.id JOIN products p ON oi.product_id = p.id",
  },
  {
    title: "Products that were never sold",
    topic: "Joins",
    difficulty: "Medium",
    description:
      "Return the names of products that never appear in order_items.",
    hint: "LEFT JOIN order_items and filter where its id IS NULL.",
    solution:
      "SELECT p.name FROM products p LEFT JOIN order_items oi ON oi.product_id = p.id WHERE oi.id IS NULL",
  },
  {
    title: "Revenue by product category",
    topic: "Joins",
    difficulty: "Medium",
    description:
      "Return each product category with its revenue, where revenue = price x quantity from order_items.",
    hint: "Join order_items to products, then SUM(price * quantity) per category.",
    solution:
      "SELECT p.category, SUM(p.price * oi.quantity) FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.category",
  },
  {
    title: "Employees and the projects they work on",
    topic: "Joins",
    difficulty: "Medium",
    description:
      "Return the employee name and project name for every row in employee_projects.",
    hint: "employee_projects is a link table: join it to both employees and projects.",
    solution:
      "SELECT e.name, p.name FROM employee_projects ep JOIN employees e ON ep.employee_id = e.id JOIN projects p ON ep.project_id = p.id",
  },
  {
    title: "Projects with no employees",
    topic: "Joins",
    difficulty: "Medium",
    description: "Return the names of projects that have no employee assigned.",
    hint: "LEFT JOIN employee_projects and check for NULL.",
    solution:
      "SELECT p.name FROM projects p LEFT JOIN employee_projects ep ON ep.project_id = p.id WHERE ep.project_id IS NULL",
  },
  {
    title: "Employees not on any project",
    topic: "Joins",
    difficulty: "Medium",
    description:
      "Return the names of employees who are not assigned to any project.",
    hint: "LEFT JOIN from employees and look for NULL on the link table side.",
    solution:
      "SELECT e.name FROM employees e LEFT JOIN employee_projects ep ON ep.employee_id = e.id WHERE ep.employee_id IS NULL",
  },
  {
    title: "Total project hours per employee",
    topic: "Joins",
    difficulty: "Medium",
    description:
      "Return each employee's name with the total hours they logged across projects. Skip employees with no hours.",
    hint: "JOIN then SUM(hours) grouped by employee.",
    solution:
      "SELECT e.name, SUM(ep.hours) FROM employees e JOIN employee_projects ep ON ep.employee_id = e.id GROUP BY e.id, e.name",
  },
  {
    title: "Simulate a FULL OUTER JOIN",
    topic: "Joins",
    difficulty: "Hard",
    description:
      "Return department name and employee name for all matches, plus departments with no employees and employees with no department (use NULL where missing). Pretend FULL JOIN does not exist.",
    hint: "UNION a LEFT JOIN from departments with a LEFT JOIN from employees.",
    solution:
      "SELECT d.name, e.name FROM departments d LEFT JOIN employees e ON e.department_id = d.id UNION SELECT d.name, e.name FROM employees e LEFT JOIN departments d ON e.department_id = d.id",
  },
  {
    title: "Customers who never ordered (subquery)",
    topic: "Subqueries",
    difficulty: "Easy",
    description:
      "Return the names of customers who have not placed any order, using a subquery.",
    hint: "NOT IN (SELECT customer_id FROM orders).",
    solution:
      "SELECT name FROM customers WHERE id NOT IN (SELECT customer_id FROM orders)",
  },
  {
    title: "Employees earning above the company average",
    topic: "Subqueries",
    difficulty: "Medium",
    description:
      "Return name and salary of employees whose salary is above the average salary of all employees.",
    hint: "Put SELECT AVG(salary) in a subquery inside WHERE.",
    solution:
      "SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees)",
  },
  {
    title: "Second highest salary",
    topic: "Subqueries",
    difficulty: "Medium",
    description: "Return the second highest distinct salary (one value).",
    hint: "Find the MAX salary that is lower than the overall MAX.",
    solution:
      "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees)",
  },
  {
    title: "Third highest distinct salary",
    topic: "Subqueries",
    difficulty: "Medium",
    description: "Return the third highest distinct salary (one value).",
    hint: "SELECT DISTINCT salary, order descending, then LIMIT 1 OFFSET 2.",
    solution:
      "SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2",
  },
  {
    title: "Top earner in each department (correlated subquery)",
    topic: "Subqueries",
    difficulty: "Medium",
    description:
      "Return name and salary of the employee(s) earning the highest salary in their own department.",
    hint: "Compare each salary with MAX(salary) of the same department using a correlated subquery.",
    solution:
      "SELECT name, salary FROM employees e WHERE salary = (SELECT MAX(salary) FROM employees WHERE department_id = e.department_id)",
  },
  {
    title: "Customers with an order above 600",
    topic: "Subqueries",
    difficulty: "Medium",
    description:
      "Return the names of customers who have at least one order with amount greater than 600.",
    hint: "IN (SELECT customer_id FROM orders WHERE amount > 600).",
    solution:
      "SELECT name FROM customers WHERE id IN (SELECT customer_id FROM orders WHERE amount > 600)",
  },
  {
    title: "Customers who have ordered (EXISTS)",
    topic: "Subqueries",
    difficulty: "Medium",
    description:
      "Return the names of customers who have placed at least one order, using EXISTS.",
    hint: "EXISTS stops at the first match, so it is often faster than IN.",
    solution:
      "SELECT name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)",
  },
  {
    title: "Products priced above their category average",
    topic: "Subqueries",
    difficulty: "Medium",
    description:
      "Return name, category and price of products whose price is higher than the average price of their own category.",
    hint: "Correlated subquery: AVG(price) WHERE category = p.category.",
    solution:
      "SELECT name, category, price FROM products p WHERE price > (SELECT AVG(price) FROM products WHERE category = p.category)",
  },
  {
    title: "Departments paying above the company average",
    topic: "Subqueries",
    difficulty: "Medium",
    description:
      "Return the names of departments whose average salary is higher than the average salary of all employees.",
    hint: "Compare one subquery average (per department) with another (overall).",
    solution:
      "SELECT d.name FROM departments d WHERE (SELECT AVG(salary) FROM employees e WHERE e.department_id = d.id) > (SELECT AVG(salary) FROM employees)",
  },
  {
    title: "Orders above the customer's own average order",
    topic: "Subqueries",
    difficulty: "Hard",
    description:
      "Return id and amount of orders that are larger than the average order amount of the same customer.",
    hint: "Correlated subquery on customer_id.",
    solution:
      "SELECT id, amount FROM orders o WHERE amount > (SELECT AVG(amount) FROM orders WHERE customer_id = o.customer_id)",
  },
  {
    title: "Colleagues of Bob",
    topic: "Subqueries",
    difficulty: "Medium",
    description:
      "Return the names of the other employees who work in the same department as Bob (do not return Bob).",
    hint: "Find Bob's department_id in a subquery, then exclude Bob.",
    solution:
      "SELECT name FROM employees WHERE department_id = (SELECT department_id FROM employees WHERE name = 'Bob') AND name <> 'Bob'",
  },
  {
    title: "Customers spending more than the average customer",
    topic: "Subqueries",
    difficulty: "Hard",
    description:
      "Return customer_id and total spent for customers whose total is above the average of all customers' totals.",
    hint: "A subquery in HAVING that averages another grouped subquery.",
    solution:
      "SELECT customer_id, SUM(amount) FROM orders GROUP BY customer_id HAVING SUM(amount) > (SELECT AVG(t) FROM (SELECT SUM(amount) AS t FROM orders GROUP BY customer_id))",
  },
  {
    title: "Employee with manager name",
    topic: "Self Join",
    difficulty: "Medium",
    description:
      "Return each employee's name with their manager's name. Employees without a manager must still appear (manager NULL).",
    hint: "LEFT JOIN employees to itself: e.manager_id = m.id.",
    solution:
      "SELECT e.name, m.name FROM employees e LEFT JOIN employees m ON e.manager_id = m.id",
  },
  {
    title: "Employees who earn more than their manager",
    topic: "Self Join",
    difficulty: "Medium",
    description:
      "Return the names of employees whose salary is higher than their manager's salary.",
    hint: "Join the employees table to itself and compare salaries.",
    solution:
      "SELECT e.name FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary",
  },
  {
    title: "Managers with at least 2 direct reports",
    topic: "Self Join",
    difficulty: "Medium",
    description:
      "Return the manager's name and number of direct reports for managers who have 2 or more.",
    hint: "Join employees (reports) to employees (managers), GROUP BY manager, HAVING COUNT(*) >= 2.",
    solution:
      "SELECT m.name, COUNT(*) FROM employees e JOIN employees m ON e.manager_id = m.id GROUP BY m.id, m.name HAVING COUNT(*) >= 2",
  },
  {
    title: "Employees who manage nobody",
    topic: "Self Join",
    difficulty: "Medium",
    description:
      "Return the names of employees who are not the manager of anyone.",
    hint: "NOT IN breaks if the subquery returns a NULL. Filter manager_id IS NOT NULL inside it.",
    solution:
      "SELECT name FROM employees WHERE id NOT IN (SELECT manager_id FROM employees WHERE manager_id IS NOT NULL)",
  },
  {
    title: "Same department, same salary pairs",
    topic: "Self Join",
    difficulty: "Medium",
    description:
      "Return pairs of different employees (two names) who work in the same department and earn exactly the same salary. List each pair once.",
    hint: "Self join with a.id < b.id avoids mirrored duplicates.",
    solution:
      "SELECT a.name, b.name FROM employees a JOIN employees b ON a.department_id = b.department_id AND a.salary = b.salary AND a.id < b.id",
  },
  {
    title: "Hierarchy level of every employee",
    topic: "Self Join",
    difficulty: "Hard",
    description:
      "Return each employee's name and their level in the reporting hierarchy, where the person with no manager is level 1, their direct reports level 2, and so on.",
    hint: "WITH RECURSIVE: start with the top manager, then repeatedly join employees to the previous level.",
    solution:
      "WITH RECURSIVE h(id, name, level) AS ( SELECT id, name, 1 FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, h.level + 1 FROM employees e JOIN h ON e.manager_id = h.id) SELECT name, level FROM h",
  },
  {
    title: "Uppercase names and their length",
    topic: "Functions & CASE",
    difficulty: "Easy",
    description:
      "Return each employee's name in UPPERCASE together with the number of characters in the name.",
    hint: "UPPER() and LENGTH().",
    solution: "SELECT UPPER(name), LENGTH(name) FROM employees",
  },
  {
    title: "Extract the email domain",
    topic: "Functions & CASE",
    difficulty: "Medium",
    description:
      "Return each customer's email and the domain part (the text after the @ sign).",
    hint: "SUBSTR(email, INSTR(email, '@') + 1).",
    solution:
      "SELECT email, SUBSTR(email, INSTR(email, '@') + 1) FROM customers",
  },
  {
    title: "Employees hired in 2021 or later",
    topic: "Functions & CASE",
    difficulty: "Easy",
    description:
      "Return name and hire_date of employees hired on or after 2021-01-01.",
    hint: "ISO dates (YYYY-MM-DD) compare correctly as text.",
    solution:
      "SELECT name, hire_date FROM employees WHERE hire_date >= '2021-01-01'",
  },
  {
    title: "Hire year of each employee",
    topic: "Functions & CASE",
    difficulty: "Easy",
    description: "Return each employee's name and the year they were hired.",
    hint: "strftime('%Y', hire_date).",
    solution: "SELECT name, strftime('%Y', hire_date) FROM employees",
  },
  {
    title: "Employees hired per year",
    topic: "Functions & CASE",
    difficulty: "Medium",
    description:
      "Return each hire year with the number of employees hired in that year.",
    hint: "Group by strftime('%Y', hire_date).",
    solution:
      "SELECT strftime('%Y', hire_date) AS yr, COUNT(*) FROM employees GROUP BY yr",
  },
  {
    title: "Tenure in days",
    topic: "Functions & CASE",
    difficulty: "Medium",
    description:
      "Return each employee's name and the number of whole days between hire_date and 2024-12-31.",
    hint: "julianday() converts a date to a number, so you can subtract. CAST the result to INTEGER.",
    solution:
      "SELECT name, CAST(julianday('2024-12-31') - julianday(hire_date) AS INTEGER) FROM employees",
  },
  {
    title: "Salary bands with CASE",
    topic: "Functions & CASE",
    difficulty: "Medium",
    description:
      "Return name and a band: 'High' if salary is 100000 or more, 'Medium' if 60000 or more, otherwise 'Low'.",
    hint: "CASE WHEN ... THEN ... ELSE ... END, conditions are checked top to bottom.",
    solution:
      "SELECT name, CASE WHEN salary >= 100000 THEN 'High' WHEN salary >= 60000 THEN 'Medium' ELSE 'Low' END FROM employees",
  },
  {
    title: "Show 'None' when the manager is missing",
    topic: "Functions & CASE",
    difficulty: "Easy",
    description:
      "Return each employee's name and their manager_id as text, showing 'None' when there is no manager.",
    hint: "COALESCE returns its first non-NULL argument. CAST manager_id AS TEXT first.",
    solution:
      "SELECT name, COALESCE(CAST(manager_id AS TEXT), 'None') FROM employees",
  },
  {
    title: "Delivered vs not delivered in one row",
    topic: "Functions & CASE",
    difficulty: "Medium",
    description:
      "Return one row with two numbers: how many orders are 'Delivered' and how many are not.",
    hint: "Conditional aggregation: SUM(CASE WHEN ... THEN 1 ELSE 0 END).",
    solution:
      "SELECT SUM(CASE WHEN status = 'Delivered' THEN 1 ELSE 0 END), SUM(CASE WHEN status <> 'Delivered' THEN 1 ELSE 0 END) FROM orders",
  },
  {
    title: "Stock status labels",
    topic: "Functions & CASE",
    difficulty: "Easy",
    description:
      "Return product name and a label: 'Out of stock' if stock is 0, 'Low' if stock is below 50, otherwise 'Healthy'.",
    hint: "Use CASE with three branches.",
    solution:
      "SELECT name, CASE WHEN stock = 0 THEN 'Out of stock' WHEN stock < 50 THEN 'Low' ELSE 'Healthy' END FROM products",
  },
  {
    title: "Name and job title in one column",
    topic: "Functions & CASE",
    difficulty: "Easy",
    description:
      "Return one column per employee in the format: Name - Job Title (for example: Alice - Senior Engineer).",
    hint: "Concatenate text with ||.",
    solution: "SELECT name || ' - ' || job_title FROM employees",
  },
  {
    title: "Orders placed in March 2024",
    topic: "Functions & CASE",
    difficulty: "Easy",
    description: "Return the id and amount of all orders placed in March 2024.",
    hint: "Use a start date (inclusive) and an end date (exclusive) so it also works with timestamps.",
    solution:
      "SELECT id, amount FROM orders WHERE order_date >= '2024-03-01' AND order_date < '2024-04-01'",
  },
  {
    title: "Orders placed on weekends",
    topic: "Functions & CASE",
    difficulty: "Medium",
    description:
      "Return id and order_date of orders placed on a Saturday or Sunday.",
    hint: "strftime('%w', date) returns 0 for Sunday up to 6 for Saturday, as text.",
    solution:
      "SELECT id, order_date FROM orders WHERE strftime('%w', order_date) IN ('0', '6')",
  },
  {
    title: "All employee and customer names",
    topic: "Set Operations",
    difficulty: "Easy",
    description:
      "Return one list of names that contains every employee name and every customer name, without duplicates.",
    hint: "UNION removes duplicates, UNION ALL keeps them.",
    solution: "SELECT name FROM employees UNION SELECT name FROM customers",
  },
  {
    title: "Customers with both Delivered and Pending orders",
    topic: "Set Operations",
    difficulty: "Medium",
    description:
      "Return the customer_id of customers who have at least one 'Delivered' order and at least one 'Pending' order.",
    hint: "INTERSECT returns rows present in both queries.",
    solution:
      "SELECT customer_id FROM orders WHERE status = 'Delivered' INTERSECT SELECT customer_id FROM orders WHERE status = 'Pending'",
  },
  {
    title: "Customers who ordered but never cancelled",
    topic: "Set Operations",
    difficulty: "Medium",
    description:
      "Return the customer_id of customers who have orders but none of them is 'Cancelled'.",
    hint: "EXCEPT removes rows of the second query from the first.",
    solution:
      "SELECT DISTINCT customer_id FROM orders EXCEPT SELECT customer_id FROM orders WHERE status = 'Cancelled'",
  },
  {
    title: "Salary extremes with UNION ALL",
    topic: "Set Operations",
    difficulty: "Medium",
    description:
      "Return name and the label 'High' for employees earning more than 80000, plus name and the label 'Low' for employees earning less than 50000, in one result.",
    hint: "Two SELECTs with the same number of columns joined by UNION ALL.",
    solution:
      "SELECT name, 'High' FROM employees WHERE salary > 80000 UNION ALL SELECT name, 'Low' FROM employees WHERE salary < 50000",
  },
  {
    title: "Sold products with low stock",
    topic: "Set Operations",
    difficulty: "Medium",
    description:
      "Return the ids of products that have been sold (appear in order_items) and also have stock below 30.",
    hint: "INTERSECT between product_id from order_items and ids from products.",
    solution:
      "SELECT product_id FROM order_items INTERSECT SELECT id FROM products WHERE stock < 30",
  },
  {
    title: "Rank employees by salary",
    topic: "Window Functions",
    difficulty: "Medium",
    description:
      "Return name, salary and RANK by salary (highest salary = rank 1). Equal salaries share a rank and the next rank is skipped.",
    hint: "RANK() OVER (ORDER BY salary DESC).",
    solution:
      "SELECT name, salary, RANK() OVER (ORDER BY salary DESC) FROM employees",
  },
  {
    title: "Dense rank by salary",
    topic: "Window Functions",
    difficulty: "Medium",
    description:
      "Return name, salary and DENSE_RANK by salary (highest = 1). Equal salaries share a rank and no rank numbers are skipped.",
    hint: "DENSE_RANK never leaves gaps; RANK does.",
    solution:
      "SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) FROM employees",
  },
  {
    title: "Row number inside each department",
    topic: "Window Functions",
    difficulty: "Medium",
    description:
      "Return name, department_id and ROW_NUMBER within each department, ordering by salary high to low and then by name A to Z.",
    hint: "ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC, name).",
    solution:
      "SELECT name, department_id, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC, name) FROM employees",
  },
  {
    title: "Highest paid per department with RANK",
    topic: "Window Functions",
    difficulty: "Medium",
    description:
      "Return department_id, name and salary of the highest paid employee(s) in each department. Ignore employees without a department.",
    hint: "Compute RANK in a subquery, then keep rank = 1.",
    solution:
      "SELECT department_id, name, salary FROM ( SELECT department_id, name, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS r FROM employees WHERE department_id IS NOT NULL) WHERE r = 1",
  },
  {
    title: "Top 2 salaries in every department",
    topic: "Window Functions",
    difficulty: "Hard",
    description:
      "Return department_id, name and salary of employees who have one of the 2 highest distinct salaries in their department. Ignore employees without a department.",
    hint: "Use DENSE_RANK so ties do not push people out, and keep rank <= 2.",
    solution:
      "SELECT department_id, name, salary FROM ( SELECT department_id, name, salary, DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS r FROM employees WHERE department_id IS NOT NULL) WHERE r <= 2",
  },
  {
    title: "Rank employees within each department",
    topic: "Window Functions",
    difficulty: "Hard",
    description:
      "Return employee name, department name and salary rank inside the department (highest salary = 1). Employees with equal salary share the same rank and the next rank is skipped. Ignore employees without a department.",
    hint: "RANK() OVER (PARTITION BY department ORDER BY salary DESC). ROW_NUMBER would not share ranks.",
    solution:
      "SELECT e.name, d.name AS department, RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS salary_rank FROM employees e JOIN departments d ON e.department_id = d.id",
  },
  {
    title: "Running total of monthly revenue",
    topic: "Window Functions",
    difficulty: "Medium",
    description:
      "Return month, revenue and the running (cumulative) total of revenue ordered by month.",
    hint: "SUM(revenue) OVER (ORDER BY month).",
    solution:
      "SELECT month, revenue, SUM(revenue) OVER (ORDER BY month) FROM monthly_sales",
  },
  {
    title: "Month-over-month change",
    topic: "Window Functions",
    difficulty: "Medium",
    description:
      "Return month, revenue and the change compared to the previous month (NULL for the first month).",
    hint: "LAG(revenue) OVER (ORDER BY month) gives the previous row's value.",
    solution:
      "SELECT month, revenue, revenue - LAG(revenue) OVER (ORDER BY month) FROM monthly_sales",
  },
  {
    title: "Next month's revenue with LEAD",
    topic: "Window Functions",
    difficulty: "Medium",
    description:
      "Return month, revenue and the revenue of the following month (NULL for the last month).",
    hint: "LEAD looks forward, LAG looks backward.",
    solution:
      "SELECT month, revenue, LEAD(revenue) OVER (ORDER BY month) FROM monthly_sales",
  },
  {
    title: "3-month moving average",
    topic: "Window Functions",
    difficulty: "Hard",
    description:
      "Return month, revenue and the average revenue of the current month and the 2 months before it, ordered by month.",
    hint: "AVG(...) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW).",
    solution:
      "SELECT month, revenue, AVG(revenue) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) FROM monthly_sales",
  },
  {
    title: "Salary share within the department",
    topic: "Window Functions",
    difficulty: "Medium",
    description:
      "Return name, department_id and the employee's salary as a percentage of the total salary of their department, rounded to 2 decimals.",
    hint: "salary * 100.0 / SUM(salary) OVER (PARTITION BY department_id). Use 100.0 to avoid integer division.",
    solution:
      "SELECT name, department_id, ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY department_id), 2) FROM employees",
  },
  {
    title: "Difference from department average",
    topic: "Window Functions",
    difficulty: "Medium",
    description:
      "Return name, department_id and how much the salary is above or below the department's average salary, rounded to 2 decimals.",
    hint: "AVG(salary) OVER (PARTITION BY department_id).",
    solution:
      "SELECT name, department_id, ROUND(salary - AVG(salary) OVER (PARTITION BY department_id), 2) FROM employees",
  },
  {
    title: "Latest order per customer",
    topic: "Window Functions",
    difficulty: "Medium",
    description:
      "Return customer_id, order id and order_date of each customer's most recent order.",
    hint: "ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) = 1.",
    solution:
      "SELECT customer_id, id, order_date FROM ( SELECT customer_id, id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn FROM orders) WHERE rn = 1",
  },
  {
    title: "Salary quartiles with NTILE",
    topic: "Window Functions",
    difficulty: "Hard",
    description:
      "Split employees into 4 groups (quartiles) ordered by salary high to low, with ties broken by name A to Z. Return name, salary and the group number.",
    hint: "NTILE(4) OVER (ORDER BY salary DESC, name). With 10 rows the groups get 3, 3, 2 and 2 rows.",
    solution:
      "SELECT name, salary, NTILE(4) OVER (ORDER BY salary DESC, name) FROM employees",
  },
  {
    title: "Users with a 3+ day login streak",
    topic: "Advanced",
    difficulty: "Hard",
    description:
      "Return the user_id of users who logged in on 3 or more consecutive days at least once. Treat several logins on the same day as one.",
    hint: "Classic trick: login_date minus ROW_NUMBER() days is the same value for every date in a streak. Group by it.",
    solution:
      "WITH d AS (SELECT DISTINCT user_id, login_date FROM logins), g AS (SELECT user_id, login_date, date(login_date, '-' || ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) || ' day') AS grp FROM d) SELECT DISTINCT user_id FROM g GROUP BY user_id, grp HAVING COUNT(*) >= 3",
  },
  {
    title: "Users active on at least 3 distinct days",
    topic: "Advanced",
    difficulty: "Medium",
    description:
      "Return the user_id of users who logged in on at least 3 different days.",
    hint: "COUNT(DISTINCT login_date) in HAVING.",
    solution:
      "SELECT user_id FROM logins GROUP BY user_id HAVING COUNT(DISTINCT login_date) >= 3",
  },
  {
    title: "Days between consecutive logins",
    topic: "Advanced",
    difficulty: "Hard",
    description:
      "Return user_id, login_date and the number of days since that user's previous login (NULL for the first login).",
    hint: "LAG(login_date) OVER (PARTITION BY user_id ORDER BY login_date) and julianday() subtraction.",
    solution:
      "SELECT user_id, login_date, julianday(login_date) - julianday(LAG(login_date) OVER (PARTITION BY user_id ORDER BY login_date)) FROM logins",
  },
  {
    title: "Median salary",
    topic: "Advanced",
    difficulty: "Hard",
    description:
      "Return the median salary of all employees (one value). With an even number of rows, the median is the average of the two middle values.",
    hint: "SQLite has no MEDIAN. Order by salary and pick the middle one or two rows with LIMIT and OFFSET computed from COUNT(*).",
    solution:
      "SELECT AVG(salary) FROM ( SELECT salary FROM employees ORDER BY salary LIMIT 2 - (SELECT COUNT(*) FROM employees) % 2 OFFSET (SELECT (COUNT(*) - 1) / 2 FROM employees))",
  },
  {
    title: "Best-selling product in each category",
    topic: "Advanced",
    difficulty: "Hard",
    description:
      "Return category, product name and total quantity sold for the best-selling product (by total quantity) in each category.",
    hint: "Group by product first, then RANK over the sums per category. Window functions can wrap aggregates.",
    solution:
      "SELECT category, name, total FROM ( SELECT p.category, p.name, SUM(oi.quantity) AS total, RANK() OVER (PARTITION BY p.category ORDER BY SUM(oi.quantity) DESC) AS r FROM order_items oi JOIN products p ON p.id = oi.product_id GROUP BY p.id, p.category, p.name) WHERE r = 1",
  },
  {
    title: "Customers whose orders were all delivered",
    topic: "Advanced",
    difficulty: "Hard",
    description:
      "Return the names of customers who have at least one order and every one of their orders has status 'Delivered'.",
    hint: "HAVING SUM(CASE WHEN status <> 'Delivered' THEN 1 ELSE 0 END) = 0.",
    solution:
      "SELECT c.name FROM customers c JOIN orders o ON o.customer_id = c.id GROUP BY c.id, c.name HAVING SUM(CASE WHEN o.status <> 'Delivered' THEN 1 ELSE 0 END) = 0",
  },
  {
    title: "Department with the highest total salary",
    topic: "Advanced",
    difficulty: "Medium",
    description:
      "Return the name and total salary of the department with the highest total salary (return all departments if there is a tie).",
    hint: "Compare each department's SUM with the MAX of the sums.",
    solution:
      "SELECT d.name, SUM(e.salary) FROM departments d JOIN employees e ON e.department_id = d.id GROUP BY d.id, d.name HAVING SUM(e.salary) = (SELECT MAX(s) FROM ( SELECT SUM(salary) AS s FROM employees WHERE department_id IS NOT NULL GROUP BY department_id))",
  },
];

export const sqlQuestions: SqlQuestion[] = rawQuestions.map((q, i) => ({
  id: i + 1,
  ...q,
}));

export const sqlTopics: string[] = Array.from(
  new Set(sqlQuestions.map((q) => q.topic)),
);
