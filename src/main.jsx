import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";


const theme = createTheme({
    palette: {
        primary: {
            main: "#ACBED8",
            contrastText: "#000000",
        },
        secondary: {
            main: "#D78521",
            contrastText: "#FFFFFF",
        },
        background: {
            default: "#E8EBF7",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#000000",
            secondary: "#444444",
        },
    },
    typography: {
        h1: {
            fontSize: "2.5rem",
            fontWeight: 600,
        },
        button: {
            textTransform: "none",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                },
            },
        },
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </StrictMode>
);
