// UserProfilePage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  Chip,
  Grid,
  Paper,
  Stack,
  LinearProgress,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CodeIcon from "@mui/icons-material/Code";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { User } from "firebase/auth";

interface Submission {
  language: string;
  day: string;
  taskIndex: number;
  code: string;
  executionOutput: string;
  timestamp: string;
  createdAt?: { seconds: number };
}

interface UserProfile {
  name: string;
  email: string;
  createdAt?: { seconds: number };
  totalSubmissions: number;
}

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  // Wait for Firebase auth to restore session
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        navigate("/auth");
        return;
      }
      setUser(u);
    });
    return unsub;
  }, [navigate]);

  // Fetch data once user is available
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) setProfile(userDoc.data() as UserProfile);

      const q = query(
        collection(db, "users", user.uid, "submissions"),
        orderBy("createdAt", "desc"),
      );
      const snap = await getDocs(q);
      const subs = snap.docs.map((d) => d.data() as Submission);
      setSubmissions(subs);
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  // Stats — count unique tasks (not number of submissions)
  const uniqueTasks = new Set(
    submissions.map((s) => `${s.language}_${s.day}_${s.taskIndex}`),
  ).size;
  const javaCount = new Set(
    submissions
      .filter((s) => s.language === "Java")
      .map((s) => `${s.day}_${s.taskIndex}`),
  ).size;
  const pythonCount = new Set(
    submissions
      .filter((s) => s.language === "Python")
      .map((s) => `${s.day}_${s.taskIndex}`),
  ).size;
  const jsCount = new Set(
    submissions
      .filter((s) => s.language === "JavaScript")
      .map((s) => `${s.day}_${s.taskIndex}`),
  ).size;
  const uniqueDays = new Set(submissions.map((s) => s.day)).size;

  const joinDate = profile?.createdAt
    ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const initials = (profile?.name || user?.displayName || "U")
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack>
          <Typography variant="h6">Loading your profile...</Typography>
          <LinearProgress sx={{ width: 200 }} />
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #e8f3ff 0%, #f5f5f5 60%)",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 3 }}
          variant="outlined"
        >
          Back to Dashboard
        </Button>

        {/* Profile Header Card */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            mb: 3,
            background:
              "linear-gradient(135deg, #1a237e 0%, #283593 50%, #1565c0 100%)",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.05)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -40,
              right: 80,
              width: 160,
              height: 160,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />

          <Stack>
            <Avatar
              sx={{
                width: 88,
                height: 88,
                fontSize: 32,
                fontWeight: 700,
                background: "linear-gradient(135deg, #42a5f5, #7e57c2)",
                border: "3px solid rgba(255,255,255,0.3)",
              }}
            >
              {initials}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                {profile?.name || user?.displayName || "Coder"}
              </Typography>
              <Typography sx={{ opacity: 0.75, mb: 1.5, fontSize: 15 }}>
                {profile?.email || user?.email}
              </Typography>
              <Stack>
                <Chip
                  icon={
                    <CalendarTodayIcon sx={{ fontSize: "14px !important" }} />
                  }
                  label={`Joined ${joinDate}`}
                  size="small"
                  sx={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontSize: 12,
                  }}
                />
                <Chip
                  icon={<CodeIcon sx={{ fontSize: "14px !important" }} />}
                  label={`${uniqueTasks} tasks completed`}
                  size="small"
                  sx={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    fontSize: 12,
                  }}
                />
              </Stack>
            </Box>

            <Button
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "rgba(255,255,255,0.4)",
                "&:hover": {
                  borderColor: "#fff",
                  background: "rgba(255,255,255,0.1)",
                },
              }}
            >
              Logout
            </Button>
          </Stack>
        </Paper>

        {/* Stats Row */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            {
              label: "Tasks Completed",
              value: uniqueTasks,
              icon: "✅",
              color: "#1565c0",
              bg: "#e3f2fd",
            },
            {
              label: "Days Practiced",
              value: uniqueDays,
              icon: "📅",
              color: "#2e7d32",
              bg: "#e8f5e9",
            },
            {
              label: "Java",
              value: javaCount,
              icon: "☕",
              color: "#007396",
              bg: "#e3f2fd",
            },
            {
              label: "Python",
              value: pythonCount,
              icon: "🐍",
              color: "#3776AB",
              bg: "#e8f4fd",
            },
            {
              label: "JavaScript",
              value: jsCount,
              icon: "⚡",
              color: "#c17900",
              bg: "#fffde7",
            },
          ].map((stat) => (
            <Grid key={stat.label} size={{ xs: 6, sm: 4, md: 2.4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  textAlign: "center",
                  border: "1px solid rgba(0,0,0,0.07)",
                  background: stat.bg,
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-2px)" },
                }}
              >
                <Typography sx={{ fontSize: 28, mb: 0.5 }}>
                  {stat.icon}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: stat.color }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Language Progress */}
        <Paper
          elevation={0}
          sx={{ p: 3, borderRadius: 3, border: "1px solid rgba(0,0,0,0.07)" }}
        >
          <Stack>
            <EmojiEventsIcon color="warning" />
            <Typography>Language Progress</Typography>
          </Stack>
          <Stack spacing={2}>
            {[
              { lang: "Java", count: javaCount, total: 15, color: "#007396" },
              {
                lang: "Python",
                count: pythonCount,
                total: 15,
                color: "#3776AB",
              },
              {
                lang: "JavaScript",
                count: jsCount,
                total: 15,
                color: "#c17900",
              },
            ].map(({ lang, count, total, color }) => (
              <Box key={lang}>
                <Stack>
                  <Typography>{lang}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {count}/{total} tasks
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={Math.min((count / total) * 100, 100)}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#e0e0e0",
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                      backgroundColor: color,
                    },
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserProfilePage;
