import { createTheme } from "@mui/material";

export const theme = (darkMode: boolean) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",       
        contrastText: "#fff",
      },
      secondary: {
        main: "#3252DF",
      },
      background: {
        default: darkMode ? "#121212" : "#ffffff",
        paper: darkMode ? "#1e1e1e" : "#f5f5f5",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
        secondary: darkMode ? "#bbbbbb" : "#666666",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: "thin",
            scrollbarColor: "#B0BEC5 #F5F5F5",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: darkMode ? "#2c2c2c" : "#F5F5F5",
            },
            "&::-webkit-scrollbar-thumb": {
              background: darkMode ? "#555" : "#B0BEC5",
              borderRadius: "4px",
            },
            backgroundColor: darkMode ? "#121212" : "#ffffff",
            color: darkMode ? "#ffffff" : "#000000",
            transition: "all 0.3s ease-in-out",
          },
        },
      },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  });
