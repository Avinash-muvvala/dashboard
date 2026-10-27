// AuthPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const ERRORS: Record<string, string> = {
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Email or password is incorrect.",
  "auth/email-already-in-use":
    "This email already has an account. Try logging in.",
  "auth/weak-password": "Use at least 6 characters for your password.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/too-many-requests": "Too many attempts. Wait a minute and try again.",
  "auth/popup-closed-by-user": "Google sign-in was closed before finishing.",
};

const CODE_LINES = [
  'const goal = "become a developer";',
  "let streak = 0;",
  "",
  "while (learning) {",
  "  streak++;",
  "  skills.push(learnSomethingNew());",
  "}",
];

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const friendly = (err: unknown, fallback: string) => {
    const code = (err as { code?: string })?.code;
    return (code && ERRORS[code]) || fallback;
  };

  const createUserDoc = async (
    uid: string,
    displayName: string,
    mail: string,
  ) => {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      await setDoc(userRef, {
        name: displayName,
        email: mail,
        createdAt: serverTimestamp(),
        totalSubmissions: 0,
      });
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await updateProfile(result.user, { displayName: name });
        await createUserDoc(result.user.uid, name, email);
      }
      navigate("/");
    } catch (err) {
      setError(friendly(err, "Something went wrong. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      await createUserDoc(
        result.user.uid,
        result.user.displayName || "User",
        result.user.email || "",
      );
      navigate("/");
    } catch (err) {
      setError(friendly(err, "Google sign-in failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cm">
      <style>{css}</style>

      {/* Left: the one memorable moment — code typing itself out */}
      <aside className="cm-hero" aria-hidden="true">
        <div className="cm-brand">Code Mastery</div>

        <div className="cm-editor">
          <div className="cm-editor-bar">
            <span />
            <span />
            <span />
            <em>my-journey.js</em>
          </div>
          <pre>
            {CODE_LINES.map((line, i) => (
              <div
                className="cm-line"
                key={i}
                style={{ ["--i" as string]: i, ["--n" as string]: line.length }}
              >
                <b>{i + 1}</b>
                <code>{line || " "}</code>
              </div>
            ))}
            <div className="cm-cursor" />
          </pre>
        </div>

        <p className="cm-quote">
          Every expert was once a beginner who kept going. Write a little code
          today.
        </p>
      </aside>

      {/* Right: form */}
      <main className="cm-panel">
        <div className="cm-card">
          <h1>{isLogin ? "Welcome back" : "Create your account"}</h1>
          <p className="cm-sub">
            {isLogin
              ? "Log in and continue where you left off."
              : "Sign up and start your first lesson."}
          </p>

          <div className="cm-tabs" role="tablist">
            {["Login", "Sign Up"].map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={isLogin === (i === 0)}
                className={isLogin === (i === 0) ? "on" : ""}
                onClick={() => {
                  setIsLogin(i === 0);
                  setError("");
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleEmailAuth}>
            {!isLogin && (
              <div className="cm-field">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="cm-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="cm-field">
              <label htmlFor="password">Password</label>
              <div className="cm-pw">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <div className="cm-error" role="alert">
                {error}
              </div>
            )}

            <button type="submit" className="cm-primary" disabled={loading}>
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Log in"
                  : "Create account"}
            </button>
          </form>

          <div className="cm-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="cm-google"
            onClick={handleGoogle}
            disabled={loading}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </main>
    </div>
  );
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');

.cm {
  --ink: #0d1b2a;
  --ink-2: #14283d;
  --mint: #3ddc97;
  --amber: #ffb547;
  --paper: #f6f8fa;
  --line: #d9e0e7;
  --text: #16222e;
  --muted: #5b6b7a;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--text);
}
.cm *, .cm *::before, .cm *::after { box-sizing: border-box; }

/* ---------- Hero ---------- */
.cm-hero {
  background:
    radial-gradient(circle at 20% 15%, rgba(61,220,151,.12), transparent 45%),
    var(--ink);
  background-image:
    radial-gradient(circle at 20% 15%, rgba(61,220,151,.12), transparent 45%),
    radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px);
  background-size: auto, 22px 22px;
  color: #e8eef4;
  padding: 3rem clamp(1.5rem, 5vw, 4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
}
.cm-brand {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
  font-size: 1.35rem;
  letter-spacing: -.01em;
}
.cm-brand::before {
  content: '</>';
  display: inline-block;
  margin-right: .6rem;
  padding: .15rem .45rem;
  border-radius: 6px;
  background: var(--mint);
  color: var(--ink);
  font: 500 .95rem 'JetBrains Mono', monospace;
}
.cm-editor {
  background: var(--ink-2);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(0,0,0,.35);
  overflow: hidden;
  max-width: 520px;
}
.cm-editor-bar {
  display: flex; align-items: center; gap: 6px;
  padding: .65rem .9rem;
  background: rgba(0,0,0,.2);
}
.cm-editor-bar span { width: 10px; height: 10px; border-radius: 50%; background: #3b4d61; }
.cm-editor-bar span:nth-child(1) { background: #ff6b6b; }
.cm-editor-bar span:nth-child(2) { background: var(--amber); }
.cm-editor-bar span:nth-child(3) { background: var(--mint); }
.cm-editor-bar em {
  margin-left: .6rem; font: 400 .78rem 'JetBrains Mono', monospace;
  color: #8ba0b4; font-style: normal;
}
.cm-editor pre { margin: 0; padding: 1.1rem 1rem 1.3rem; position: relative; }
.cm-line {
  display: flex; gap: 1rem; height: 1.7em;
  font: 400 .88rem/1.7 'JetBrains Mono', monospace;
}
.cm-line b { width: 1.2rem; text-align: right; color: #4d6075; font-weight: 400; }
.cm-line code {
  font: inherit; color: var(--mint); white-space: pre; overflow: hidden;
  display: inline-block; width: 0;
  animation: cm-type calc(var(--n) * 38ms) steps(var(--n), end) forwards;
  animation-delay: calc(var(--i) * 0.55s + .3s);
}
.cm-cursor {
  position: absolute; left: 3.3rem; bottom: 1.2rem;
  width: 8px; height: 1.1em; background: var(--amber);
  animation: cm-blink 1s steps(1) infinite;
}
@keyframes cm-type { from { width: 0 } to { width: calc(var(--n) * 1ch) } }
@keyframes cm-blink { 50% { opacity: 0 } }

.cm-quote {
  margin: 0; max-width: 28rem;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: clamp(1.3rem, 2.2vw, 1.8rem);
  line-height: 1.3; font-weight: 500;
  color: #fff;
}

/* ---------- Form panel ---------- */
.cm-panel {
  background: var(--paper);
  display: flex; align-items: center; justify-content: center;
  padding: 2rem 1.25rem;
    background-image: radial-gradient(rgba(13,27,42,.06) 1px, transparent 1px);

}
.cm-card { width: 100%; max-width: 400px; }
.cm-card h1 {
  margin: 0;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-size: 2rem; font-weight: 700; letter-spacing: -.02em;
  color: var(--ink);
}
.cm-sub { margin: .4rem 0 1.5rem; color: var(--muted); font-size: .95rem; }

.cm-tabs {
  display: grid; grid-template-columns: 1fr 1fr;
  background: #e9eef3; border-radius: 10px; padding: 4px; margin-bottom: 1.4rem;
}
.cm-tabs button {
  border: 0; background: transparent; padding: .55rem 0; border-radius: 7px;
  font: 600 .9rem 'Inter', sans-serif; color: var(--muted); cursor: pointer;
  transition: background .2s, color .2s;
}
.cm-tabs button.on { background: #fff; color: var(--ink); box-shadow: 0 1px 3px rgba(13,27,42,.12); }

.cm-field { margin-bottom: 1rem; }
.cm-field label { display: block; margin-bottom: .35rem; font-size: .85rem; font-weight: 600; color: var(--text); }
.cm-field input {
  width: 100%; padding: .75rem .9rem; border-radius: 10px;
  border: 1.5px solid var(--line); background: #fff; color: var(--text);
  font: 400 .95rem 'Inter', sans-serif;
  transition: border-color .15s, box-shadow .15s;
}
.cm-field input::placeholder { color: #9aa8b5; }
.cm-field input:focus { outline: none; border-color: var(--ink); box-shadow: 0 0 0 3px rgba(61,220,151,.35); }

.cm-pw { position: relative; }
.cm-pw input { padding-right: 4.2rem; }
.cm-pw button {
  position: absolute; right: .4rem; top: 50%; transform: translateY(-50%);
  border: 0; background: none; padding: .35rem .5rem; border-radius: 6px;
  font: 600 .8rem 'Inter', sans-serif; color: var(--muted); cursor: pointer;
}
.cm-pw button:hover { color: var(--ink); }

.cm-error {
  margin-bottom: 1rem; padding: .7rem .9rem; border-radius: 10px;
  background: #fdecec; border: 1px solid #f5b5b5; color: #a02727; font-size: .88rem;
}

.cm-primary {
  width: 100%; padding: .85rem; border: 0; border-radius: 10px;
  background: var(--ink); color: #fff; font: 600 1rem 'Inter', sans-serif; cursor: pointer;
  transition: background .2s, transform .1s;
}
.cm-primary:hover:not(:disabled) { background: #1a3550; }
.cm-primary:active:not(:disabled) { transform: translateY(1px); }
.cm-primary:disabled, .cm-google:disabled { opacity: .6; cursor: not-allowed; }

.cm-divider { display: flex; align-items: center; gap: .8rem; margin: 1.3rem 0; color: #8696a5; font-size: .82rem; }
.cm-divider::before, .cm-divider::after { content: ''; flex: 1; height: 1px; background: var(--line); }

.cm-google {
  width: 100%; padding: .8rem; border-radius: 10px;
  border: 1.5px solid var(--line); background: #fff; color: var(--text);
  font: 600 .95rem 'Inter', sans-serif; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: .6rem;
  transition: border-color .2s;
}
.cm-google:hover:not(:disabled) { border-color: var(--ink); }

.cm button:focus-visible { outline: 3px solid var(--mint); outline-offset: 2px; }

/* ---------- Responsive ---------- */
@media (max-width: 860px) {
  .cm { grid-template-columns: 1fr; }
  .cm-hero { padding: 1.5rem 1.25rem; gap: 1.2rem; }
  .cm-editor, .cm-quote { display: none; }
  .cm-panel { align-items: flex-start; padding-top: 1.5rem; }
}

@media (prefers-reduced-motion: reduce) {
  .cm-line code { animation: none; width: calc(var(--n) * 1ch); }
  .cm-cursor { animation: none; }
}

.cm-panel {
  background:
    radial-gradient(circle at 90% 8%, rgba(61,220,151,.14), transparent 40%),
    var(--paper);
}
    .cm-card {
  background: #fff;
  padding: 2rem;
  border: 1px solid var(--line);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(13,27,42,.06);
}

`;

export default AuthPage;
