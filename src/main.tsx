import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./index.css";
import App from "./App.tsx";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#26745a",
      light: "#68a98c",
      dark: "#174b38",
    },
    secondary: {
      main: "#d69237",
      light: "#f0bd68",
      dark: "#a5681f",
    },
    success: {
      main: "#348866",
    },
    background: {
      default: "#f4f6f1",
      paper: "#ffffff",
    },
    text: {
      primary: "#1c2b24",
      secondary: "#58675f",
    },
    divider: "rgba(35, 66, 50, 0.14)",
    action: {
      hover: "rgba(38, 116, 90, 0.06)",
      selected: "rgba(38, 116, 90, 0.1)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Manrope, "Segoe UI", sans-serif',
    fontSize: 14,
    h1: { fontSize: "2.1rem", lineHeight: 1.15, fontWeight: 800 },
    h2: { fontSize: "1.75rem", lineHeight: 1.2, fontWeight: 800 },
    h3: { fontSize: "1.5rem", lineHeight: 1.25, fontWeight: 800 },
    h4: { fontSize: "1.3rem", lineHeight: 1.3, fontWeight: 800 },
    h5: { fontSize: "1.15rem", lineHeight: 1.35, fontWeight: 700 },
    h6: { fontSize: "1rem", lineHeight: 1.4, fontWeight: 700 },
    body1: { fontSize: "0.9rem", lineHeight: 1.55 },
    body2: { fontSize: "0.82rem", lineHeight: 1.5 },
    subtitle1: { fontSize: "0.95rem", lineHeight: 1.45 },
    subtitle2: { fontSize: "0.82rem", lineHeight: 1.4 },
    caption: { fontSize: "0.72rem", lineHeight: 1.35 },
    button: { fontSize: "0.82rem", textTransform: "none", fontWeight: 700 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(circle at 12% 0%, rgba(203, 222, 205, 0.4), transparent 32%), radial-gradient(circle at 94% 22%, rgba(238, 218, 177, 0.24), transparent 28%), linear-gradient(180deg, #f4f6f1 0%, #f8f9f6 54%, #f1f4ef 100%)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingTop: 8,
          paddingBottom: 8,
          boxShadow: "none",
          transition:
            "background-color 160ms ease, border-color 160ms ease, color 160ms ease, transform 160ms ease",
          "&:hover": {
            boxShadow: "none",
            transform: "translateY(-1px)",
          },
          "&:focus-visible": {
            outline: "3px solid rgba(38, 116, 90, 0.35)",
            outlineOffset: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: "1px solid rgba(35, 66, 50, 0.12)",
          boxShadow: "0 3px 14px rgba(31, 62, 45, 0.055)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: "1px solid rgba(35, 66, 50, 0.12)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 700,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 10,
          border: "1px solid rgba(35, 66, 50, 0.12)",
          boxShadow: "0 18px 55px rgba(31, 62, 45, 0.16)",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          backgroundColor: "rgba(38, 116, 90, 0.12)",
        },
        bar: {
          borderRadius: 999,
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
