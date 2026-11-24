import { createTopicGuide } from "./createTopicGuide";

export const week17Topics = {
  "17-0": createTopicGuide(
    "Spring Security's filter chain applies configured authentication and authorization processing to each request. Filters can extract credentials, establish a SecurityContext, and reject requests before controller code executes.",
    [
      "The filter chain runs before Spring MVC controller handling.",
      "Authentication filters establish a principal and authorities.",
      "The SecurityContext carries authentication for the current execution context.",
    ],
    `http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/public/**").permitAll()
    .anyRequest().authenticated());`,
    "When does the Spring Security filter chain typically process a web request?",
    [
      "Before the request reaches its controller.",
      "Only after the controller returns.",
      "Only while a database migration runs.",
      "Only when the server shuts down.",
    ],
    0,
    "Servlet security filters process the request before it is dispatched to the MVC controller.",
  ),
  "17-1": createTopicGuide(
    "Security configuration defines which requests are public, which require authentication, and how authentication mechanisms work. Prefer explicit request matchers and a SecurityFilterChain bean; avoid broad permit-all rules that accidentally expose protected operations.",
    [
      "Order specific matchers before broad catch-all rules.",
      "Default-deny or require authentication for routes not intended to be public.",
      "Test both allowed and denied access for important endpoints.",
    ],
    `http.authorizeHttpRequests(auth -> auth
    .requestMatchers(HttpMethod.GET, "/api/catalog/**").permitAll()
    .requestMatchers("/api/admin/**").hasRole("ADMIN")
    .anyRequest().authenticated());`,
    "Why should specific request matchers precede a catch-all rule?",
    [
      "The first matching rule can determine access before the general rule.",
      "Spring evaluates matchers alphabetically.",
      "Catch-all rules are ignored when listed last.",
      "Specific matchers are required to compile Java.",
    ],
    0,
    "Ordered matchers let a specific path receive its intended policy before the general fallback is applied.",
  ),
  "17-2": createTopicGuide(
    "Passwords should be stored as adaptive one-way hashes, not plaintext or reversible encryption. Spring Security's PasswordEncoder abstraction supports encoding and matching; BCrypt is a common choice, and work factors should be selected for the deployment environment.",
    [
      "Use encode when storing a new password.",
      "Use matches to compare a submitted password with its stored hash.",
      "Never log or return a raw password.",
    ],
    `PasswordEncoder encoder = new BCryptPasswordEncoder();
String storedHash = encoder.encode(rawPassword);
boolean matches = encoder.matches(rawPassword, storedHash);`,
    "How should an application verify a submitted password?",
    [
      "Use PasswordEncoder.matches against the stored hash.",
      "Decrypt the stored password.",
      "Compare the raw password to a logged value.",
      "Hash the password with a plain unsalted fast digest.",
    ],
    0,
    "PasswordEncoder.matches performs the supported comparison against an encoded password without recovering the original.",
  ),
  "17-3": createTopicGuide(
    "Authentication verifies a claimed identity and produces an authenticated principal. It can come from a session, credentials, or a validated token; the resulting identity and authorities are then used by authorization checks.",
    [
      "Authentication answers who the caller is.",
      "Successful authentication establishes an Authentication object.",
      "Invalid credentials should fail safely without revealing sensitive details.",
    ],
    `Authentication authentication =
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(username, password));
SecurityContextHolder.getContext().setAuthentication(authentication);`,
    "What question does authentication answer?",
    [
      "Who is the caller?",
      "Which database index is used?",
      "How many requests are cached?",
      "Which container image is deployed?",
    ],
    0,
    "Authentication verifies identity; authorization determines what that identity may do.",
  ),
  "17-4": createTopicGuide(
    "Authorization decides whether an authenticated identity has permission to access a resource or perform an operation. Spring Security supports request-level rules and method-level rules; both should follow least privilege.",
    [
      "Authorization evaluates roles, authorities, or custom policies.",
      "A role is commonly represented by an authority such as ROLE_ADMIN.",
      "Cover denied as well as permitted cases in security tests.",
    ],
    `@PreAuthorize("hasAuthority('invoice:read')")
public Invoice findInvoice(long id) {
    return repository.findById(id).orElseThrow();
}`,
    "What does authorization determine?",
    [
      "Whether an identity may perform a requested action.",
      "How a password is hashed.",
      "Whether a Java source file compiles.",
      "Which bean scope is selected.",
    ],
    0,
    "Authorization applies permissions to an already established identity.",
  ),
};
