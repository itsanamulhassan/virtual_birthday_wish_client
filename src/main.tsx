import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LocaleProvider } from "./context/LocaleContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocaleProvider>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <App />
      </ThemeProvider>
    </LocaleProvider>
  </React.StrictMode>
);
