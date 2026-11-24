import { createTopicGuide } from "./createTopicGuide";

export const week13Topics = {
  "13-0": createTopicGuide(
    "Spring Security processes requests through an ordered filter chain. Each filter can handle or delegate an authentication or authorization concern; security configuration determines which filters and rules apply.",
    [
      "Authentication establishes the caller's identity.",
      "Authorization checks whether that identity may perform an action.",
      "Order and matcher scope matter when configuring security rules.",
    ],
    `@Bean
SecurityFilterChain security(HttpSecurity http) throws Exception {
    return http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/health").permitAll()
            .anyRequest().authenticated())
        .build();
}`,
    "What is the role of the Spring Security filter chain?",
    [
      "Process web requests through configured security filters.",
      "Compile controller classes into bytecode.",
      "Create database tables from DTOs.",
      "Replace every Spring MVC interceptor.",
    ],
    0,
    "The filter chain applies configured security processing to incoming requests before they reach application handlers.",
  ),
  "13-1": createTopicGuide(
    "JWT authentication commonly involves validating a signed token on each request. A resource server verifies the token's signature, issuer, and applicable claims before creating an authenticated principal; token contents should not be treated as secret.",
    [
      "A signed JWT is typically readable by its holder; signing is not encryption.",
      "Validate issuer, signature, expiry, and intended audience where applicable.",
      "Prefer established Spring Security resource-server support to custom token parsing.",
    ],
    `http
    .oauth2ResourceServer(resourceServer ->
        resourceServer.jwt(Customizer.withDefaults()));`,
    "Does a signed JWT automatically hide its payload?",
    [
      "No; signing protects integrity, not confidentiality.",
      "Yes; every JWT is encrypted by default.",
      "Only when its payload contains roles.",
      "Only when sent over HTTP.",
    ],
    0,
    "A standard signed JWT can be decoded; TLS and careful claim design are still necessary.",
  ),
  "13-2": createTopicGuide(
    "Role-based access control assigns permissions through roles. Spring method security can enforce these rules close to service operations with annotations such as @PreAuthorize, complementing request-level endpoint rules.",
    [
      "Enable method security before using method authorization annotations.",
      "Apply authorization to the operation that protects the resource.",
      "Use least privilege and test both allowed and denied access.",
    ],
    `@PreAuthorize("hasRole('ADMIN')")
public void deleteAccount(long accountId) {
    repository.deleteById(accountId);
}`,
    "What does @PreAuthorize do?",
    [
      "Checks an authorization expression before a method is invoked.",
      "Encrypts method parameters.",
      "Creates a user session automatically.",
      "Runs only after the method returns.",
    ],
    0,
    "@PreAuthorize evaluates access rules before allowing the annotated method invocation.",
  ),
  "13-3": createTopicGuide(
    "OAuth 2.0 is an authorization framework that lets a client obtain limited access to a resource server. OpenID Connect adds an identity layer on top of OAuth 2.0; use a trusted provider and validate tokens instead of implementing protocol details yourself.",
    [
      "OAuth 2.0 access tokens authorize access to protected resources.",
      "OpenID Connect provides identity claims and an ID token.",
      "Social login relies on a configured identity provider and redirect flow.",
    ],
    `http
    .oauth2Login(Customizer.withDefaults());`,
    "What does OpenID Connect add to OAuth 2.0?",
    [
      "An identity layer for authenticating end users.",
      "A Java collection implementation.",
      "A replacement for TLS.",
      "A database migration format.",
    ],
    0,
    "OpenID Connect builds on OAuth 2.0 and adds standardized user identity information.",
  ),
};
