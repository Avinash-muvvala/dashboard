import { createTopicGuide } from "./createTopicGuide";

export const week18Topics = {
  "18-0": createTopicGuide(
    "A JWT is a compact token format often used to carry signed claims. A resource server must validate the signature and relevant claims such as issuer and expiry; a signed token's payload is not automatically encrypted.",
    [
      "Do not put passwords, secrets, or unnecessary personal data in readable claims.",
      "Validate signature, issuer, expiration, and audience when required.",
      "Use TLS and established security libraries for token handling.",
    ],
    `// Configure Spring Security to validate bearer JWTs
http.oauth2ResourceServer(resourceServer ->
    resourceServer.jwt(Customizer.withDefaults()));`,
    "What does a valid JWT signature prove?",
    [
      "The token was signed by a trusted key and has not been altered.",
      "The payload is secret from the token holder.",
      "The user is authorized for every endpoint.",
      "The token cannot expire.",
    ],
    0,
    "A signature supports integrity and issuer verification; it does not encrypt claims or grant universal permissions.",
  ),
  "18-1": createTopicGuide(
    "Access tokens are presented to resource servers to authorize requests and should generally be short-lived. Refresh tokens obtain replacement access tokens and require stronger protection, rotation or revocation controls, and careful storage.",
    [
      "Keep access-token lifetime limited to reduce exposure.",
      "Protect refresh tokens because they can mint new access tokens.",
      "Revoke or rotate refresh tokens according to the application's threat model.",
    ],
    `// Resource request
Authorization: Bearer <access-token>

// Refresh tokens belong only at the authorization server endpoint.`,
    "Which token is normally sent to a resource server for an API request?",
    [
      "Access token",
      "Refresh token",
      "ID token only",
      "Password reset token",
    ],
    0,
    "The access token is presented to the resource server; the refresh token is used to obtain new access credentials.",
  ),
  "18-2": createTopicGuide(
    "Role-based access control groups permissions into roles and assigns those roles to users. It simplifies common policies, but endpoints should still grant only the authorities required for each operation.",
    [
      "Roles should represent meaningful permission groupings.",
      "Do not assume every authenticated user has the same access.",
      "Use least privilege and verify both positive and negative cases.",
    ],
    `@PreAuthorize("hasAnyRole('ADMIN', 'SUPPORT')")
public void refundOrder(long orderId) {
    orderService.refund(orderId);
}`,
    "What is the main idea behind role-based access control?",
    [
      "Group permissions into roles and assign roles to identities.",
      "Give every authenticated user every permission.",
      "Encode authorization rules in URL names only.",
      "Replace authentication with database constraints.",
    ],
    0,
    "RBAC manages permissions through roles that can be assigned to users or other principals.",
  ),
  "18-3": createTopicGuide(
    "@PreAuthorize evaluates an expression before invoking a method and can check roles, authorities, or method arguments. Method security must be enabled, and rules should be tested through the Spring proxy rather than by directly constructing the class.",
    [
      "Enable method security in configuration.",
      "Use hasRole or hasAuthority consistently with granted authorities.",
      "Protect service operations as well as HTTP routes when appropriate.",
    ],
    `@EnableMethodSecurity
@Configuration
class MethodSecurityConfig {}`,
    "When is an @PreAuthorize expression evaluated?",
    [
      "Before the annotated method is invoked.",
      "After every database transaction commits.",
      "Only during application compilation.",
      "Only when the method throws an exception.",
    ],
    0,
    "Pre-authorization checks access before allowing the method invocation.",
  ),
  "18-4": createTopicGuide(
    "OAuth 2.0 delegates authorization through access tokens and defined flows. For browser-based user sign-in, OpenID Connect adds identity; modern authorization-code flows use PKCE to protect public clients. Prefer provider and framework support over inventing a protocol.",
    [
      "Use authorization code with PKCE for appropriate public clients.",
      "Validate issuer, audience, state, and nonce where applicable.",
      "OAuth access tokens and OpenID Connect ID tokens serve different purposes.",
    ],
    `http.oauth2Login(Customizer.withDefaults())
    .oauth2Client(Customizer.withDefaults());`,
    "What is PKCE used for in an authorization-code flow?",
    [
      "Protect the code exchange from interception by a malicious client.",
      "Encrypt every HTTP response body.",
      "Replace token signature validation.",
      "Store passwords in the browser.",
    ],
    0,
    "PKCE binds the authorization-code request to the client that initiated it, reducing code-interception risk.",
  ),
};
