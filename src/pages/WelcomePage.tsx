import { signOut } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CodeIcon from "@mui/icons-material/Code";
import DescriptionIcon from "@mui/icons-material/Description";
import LogoutIcon from "@mui/icons-material/Logout";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import { auth } from "./SERVER/firebaseConfig";

const codingPracticeSites = [
  { name: "CodingBat (Java)", href: "https://codingbat.com/java" },
  { name: "Coderbyte", href: "https://coderbyte.com/challenges" },
  { name: "Codewars", href: "https://www.codewars.com/dashboard" },
  { name: "LeetCode", href: "https://leetcode.com/" },
  { name: "Exercism", href: "https://exercism.org/" },
  { name: "HackerRank", href: "https://www.hackerrank.com/" },
  { name: "HackerEarth", href: "https://www.hackerearth.com/" },
  { name: "CodeChef", href: "https://www.codechef.com/" },
  {
    name: "GeeksforGeeks",
    href: "https://www.geeksforgeeks.org/practice/",
  },
  { name: "Codeforces", href: "https://codeforces.com/" },
  { name: "AtCoder", href: "https://atcoder.jp/" },
  { name: "Project Euler", href: "https://projecteuler.net/" },
];

const WelcomePage = () => {
  const navigate = useNavigate();
  const [signOutError, setSignOutError] = useState("");
  const user = auth.currentUser;
  const name =
    user?.displayName?.trim() || user?.email?.split("@")[0] || "there";

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/auth");
    } catch (error) {
      console.error("Sign out failed:", error);
      setSignOutError("Could not sign out. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 2, sm: 4, md: 6 },
        background:
          "radial-gradient(ellipse at 12% 0%, rgba(183, 229, 205, 0.45), transparent 36%), radial-gradient(ellipse at 92% 8%, rgba(240, 189, 104, 0.2), transparent 30%)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          component="header"
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            mb: { xs: 3, sm: 5 },
          }}
        >
          <Typography variant="h6" sx={{ letterSpacing: "-0.03em" }}>
            Code Mastery
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            sx={{ ml: "auto", flexShrink: 0, alignItems: "center" }}
          >
            <Tooltip title="View profile" arrow>
              <IconButton
                aria-label="View profile"
                onClick={() => navigate("/profile")}
                sx={{ p: 0, borderRadius: "50%" }}
              >
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    bgcolor: "primary.main",
                    fontWeight: 700,
                  }}
                >
                  {name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sign out" arrow>
              <IconButton
                aria-label="Sign out"
                onClick={handleSignOut}
                sx={{ color: "text.secondary" }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {signOutError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {signOutError}
          </Alert>
        )}

        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            p: { xs: 3, sm: 5, md: 7 },
            mb: { xs: 3, sm: 5 },
            borderRadius: { xs: 3, md: 4 },
            color: "#fff",
            background:
              "linear-gradient(120deg, #173f34 0%, #205b45 58%, #2f7658 100%)",
            boxShadow: "0 24px 60px rgba(23, 63, 52, 0.2)",
            "&::after": {
              content: '""',
              position: "absolute",
              width: 320,
              height: 320,
              right: { xs: -180, sm: -70 },
              top: -170,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.16)",
              boxShadow:
                "0 0 0 38px rgba(255,255,255,0.035), 0 0 0 78px rgba(255,255,255,0.025)",
              pointerEvents: "none",
            },
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: "#c5e8d1", fontWeight: 800, letterSpacing: "0.12em" }}
          >
            YOUR NEXT CHAPTER STARTS HERE
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{
              position: "relative",
              zIndex: 1,
              mt: 1,
              maxWidth: 700,
              color: "#fff",
              fontSize: { xs: "2.1rem", sm: "2.8rem", md: "3.5rem" },
              lineHeight: 1.12,
            }}
          >
            Welcome, {name}.
            <br />
            What would you like to do today?
          </Typography>
          <Typography
            sx={{
              position: "relative",
              zIndex: 1,
              mt: 2,
              maxWidth: 620,
              color: "rgba(255,255,255,0.78)",
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
            }}
          >
            Build your skills at your own pace. Choose a learning path or take
            on a personalized skills test.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          <Card
            sx={{
              height: "100%",
              transition: "transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 38px rgba(31, 62, 45, 0.13)",
              },
            }}
          >
            <CardActionArea
              onClick={() => navigate("/assessment")}
              sx={{ height: "100%", p: { xs: 2.5, sm: 3.5 } }}
            >
              <CardContent sx={{ p: "0 !important" }}>
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 54,
                    height: 54,
                    mb: 2.5,
                    borderRadius: 2,
                    color: "primary.dark",
                    bgcolor: "rgba(38, 116, 90, 0.1)",
                  }}
                >
                  <CodeIcon />
                </Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Test your potential
                </Typography>
                <Typography color="text.secondary">
                  Choose your experience, role, and skills to get a tailored set
                  of interview questions.
                </Typography>
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{ mt: 2.5, alignItems: "center" }}
                >
                  <Typography color="primary.main" sx={{ fontWeight: 700 }}>
                    Set up your test
                  </Typography>
                  <ArrowForwardIcon color="primary" fontSize="small" />
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card
            sx={{
              height: "100%",
              transition: "transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 38px rgba(31, 62, 45, 0.13)",
              },
            }}
          >
            <CardActionArea
              onClick={() => navigate("/learning")}
              sx={{ height: "100%", p: { xs: 2.5, sm: 3.5 } }}
            >
              <CardContent sx={{ p: "0 !important" }}>
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 54,
                    height: 54,
                    mb: 2.5,
                    borderRadius: 2,
                    color: "#9b651e",
                    bgcolor: "rgba(214, 146, 55, 0.14)",
                  }}
                >
                  <AutoStoriesIcon />
                </Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Explore learning
                </Typography>
                <Typography color="text.secondary">
                  Browse practical lessons, interview guides, and topic-by-topic
                  learning posts.
                </Typography>
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{ mt: 2.5, alignItems: "center" }}
                >
                  <Typography color="primary.main" sx={{ fontWeight: 700 }}>
                    Browse learning
                  </Typography>
                  <ArrowForwardIcon color="primary" fontSize="small" />
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card
            sx={{
              height: "100%",
              transition: "transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 38px rgba(31, 62, 45, 0.13)",
              },
            }}
          >
            <CardActionArea
              onClick={() => navigate("/practice")}
              sx={{ height: "100%", p: { xs: 2.5, sm: 3.5 } }}
            >
              <CardContent sx={{ p: "0 !important" }}>
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 54,
                    height: 54,
                    mb: 2.5,
                    borderRadius: 2,
                    color: "primary.dark",
                    bgcolor: "rgba(38, 116, 90, 0.1)",
                  }}
                >
                  <PlayArrowIcon />
                </Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Coding practice
                </Typography>
                <Typography color="text.secondary">
                  Practice daily coding challenges in Java, Python, and
                  JavaScript and track your progress.
                </Typography>
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{ mt: 2.5, alignItems: "center" }}
                >
                  <Typography color="primary.main" sx={{ fontWeight: 700 }}>
                    Open practice dashboard
                  </Typography>
                  <ArrowForwardIcon color="primary" fontSize="small" />
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card
            sx={{
              height: "100%",
              transition: "transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 38px rgba(31, 62, 45, 0.13)",
              },
            }}
          >
            <CardActionArea
              onClick={() => navigate("/resume-builder")}
              sx={{ height: "100%", p: { xs: 2.5, sm: 3.5 } }}
            >
              <CardContent sx={{ p: "0 !important" }}>
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 54,
                    height: 54,
                    mb: 2.5,
                    borderRadius: 2,
                    color: "primary.dark",
                    bgcolor: "rgba(38, 116, 90, 0.1)",
                  }}
                >
                  <DescriptionIcon />
                </Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  Create your resume
                </Typography>
                <Typography color="text.secondary">
                  Build a polished resume, preview templates, and get feedback
                  before downloading.
                </Typography>
                <Stack
                  direction="row"
                  spacing={0.75}
                  sx={{ mt: 2.5, alignItems: "center" }}
                >
                  <Typography color="primary.main" sx={{ fontWeight: 700 }}>
                    Build your resume
                  </Typography>
                  <ArrowForwardIcon color="primary" fontSize="small" />
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card
            sx={{
              height: "100%",
              transition: "transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 18px 38px rgba(31, 62, 45, 0.13)",
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 54,
                  height: 54,
                  mb: 2.5,
                  borderRadius: 2,
                  color: "primary.dark",
                  bgcolor: "rgba(38, 116, 90, 0.1)",
                }}
              >
                <CodeIcon />
              </Box>
              <Typography variant="h5" sx={{ mb: 1 }}>
                More coding practice sites
              </Typography>
              <Typography color="text.secondary">
                Explore challenges, learn new languages, and prepare for coding
                interviews on these platforms.
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 1,
                  mt: 2.5,
                }}
              >
                {codingPracticeSites.map((site) => (
                  <Typography
                    key={site.name}
                    component="a"
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                    sx={{
                      color: "primary.dark",
                      fontWeight: 700,
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                      "&:focus-visible": {
                        outline: "2px solid",
                        outlineColor: "primary.main",
                        outlineOffset: 2,
                        borderRadius: 0.5,
                      },
                    }}
                  >
                    {site.name}
                  </Typography>
                ))}
              </Box>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 2 }}
              >
                External sites open in a new tab.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default WelcomePage;
