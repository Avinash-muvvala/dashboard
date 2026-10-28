// App.tsx — Add these routes (merge with your existing router)
// Install deps first:
//   npm install firebase

import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./pages/SERVER/firebaseConfig";

const AuthPage = lazy(() => import("./pages/SERVER/AuthPage"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const UserProfilePage = lazy(() => import("./pages/SERVER/UserProfilePage"));
const JavaImpTopicsPage = lazy(
  () => import("./pages/JavaQuestions/JavaImpTopics"),
);
const SpringBootPage = lazy(() => import("./pages/SpringBootPosts/SpringBoot"));
const JavaGuidePage = lazy(
  () => import("./pages/JavaQuestions/JavaImpQuestionsPage"),
);
const HtmlCss = lazy(() => import("./pages/HTMLCSSPOSTS/HtmlCss"));
const JavaImpQuestions = lazy(
  () => import("./pages/JavaQuestions/JavaImpQuestions"),
);
const JavaImpQuestionsPage = lazy(
  () => import("./pages/JavaQuestions/JavaImpQuestionsPage"),
);
const JavaBackendGuide = lazy(
  () => import("./pages/JavaGuide/JavaBackendGuide"),
);
const WeeklyStudyPlan = lazy(
  () => import("./pages/JavaGuide/WeeklyStudyPlan "),
);
const ReactDeveloperRoadmap = lazy(
  () => import("./pages/ReactGuide/ReactDeveloperRoadmap"),
);
const ReactImpQuestions = lazy(
  () => import("./pages/ReactQuestions/ReactImpQuestions"),
);
const ReactImpQuestionsPage = lazy(
  () => import("./pages/ReactQuestions/ReactImpQuestionsPage"),
);
const ReactPosts = lazy(() => import("./pages/REACTPOSTS/ReactPosts"));
const CompanyQuestions = lazy(() => import("./pages/Company/CompanyQuestions"));
const LearningPage = lazy(() => import("./pages/LearningPage"));
const SqlPracticePage = lazy(() => import("./pages/SQL/SqlPracticePage"));
const JavaStreamsPracticePage = lazy(
  () => import("./pages/JavaQuestions/JavaStreamsPracticePage"),
);

// ─── Auth Guard ───────────────────────────────────────────────────────────────
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | "loading">("loading");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  if (user === "loading") return null; // or a spinner
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

// ─── App ──────────────────────────────────────────────────────────────────────
const App = () => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <Routes>
        {/* Public */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/JavaImpTopicsPage"
          element={
            <ProtectedRoute>
              <JavaImpTopicsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SpringBootPage"
          element={
            <ProtectedRoute>
              <SpringBootPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/JavaImpQuestions"
          element={
            <ProtectedRoute>
              <JavaImpQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/CompanyQuestions"
          element={
            <ProtectedRoute>
              <CompanyQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/JavaImpQuestionsPage/:topic"
          element={
            <ProtectedRoute>
              <JavaImpQuestionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ReactImpQuestions"
          element={
            <ProtectedRoute>
              <ReactImpQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ReactImpQuestionsPage/:topic"
          element={
            <ProtectedRoute>
              <ReactImpQuestionsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/HtmlCss"
          element={
            <ProtectedRoute>
              <HtmlCss />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ReactPosts"
          element={
            <ProtectedRoute>
              <ReactPosts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/JavaQuestions/:topic"
          element={
            <ProtectedRoute>
              <JavaGuidePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/JavaBackendGuide"
          element={
            <ProtectedRoute>
              <JavaBackendGuide />
            </ProtectedRoute>
          }
        />

        <Route
          path="/react-guide"
          element={
            <ProtectedRoute>
              <ReactDeveloperRoadmap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ReactGuide"
          element={<Navigate to="/react-guide" replace />}
        />

        <Route
          path="/study-plan"
          element={
            <ProtectedRoute>
              <WeeklyStudyPlan />
            </ProtectedRoute>
          }
        />

        <Route path="/learning" element={<LearningPage />} />

        <Route path="/sql-practice" element={<SqlPracticePage />} />

        <Route
          path="/java-streams-practice"
          element={
            <ProtectedRoute>
              <JavaStreamsPracticePage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
