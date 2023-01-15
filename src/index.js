import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import TokenProvider from "./context/AuthProvider";
import KeyProvider from "./context/KeyProvider";
import { themeOption } from "./theme/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeOption}>
    <BrowserRouter>
      <TokenProvider>
        <KeyProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </KeyProvider>
      </TokenProvider>
    </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
