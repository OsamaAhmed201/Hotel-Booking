import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App.tsx";

import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ThemeProviderContext } from "./contexts/ThemeContext.tsx";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProviderContext>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProviderContext>
  </StrictMode>
);
