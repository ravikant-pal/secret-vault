import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import NotFound from "./components/pages/NotFound";
import { CssBaseline } from "@mui/material";
import Unauthorized from "./components/layout/Unauthorized";
import Keys from "./components/pages/Keys";
import Values from "./components/pages/Values";
import Auth from "./components/pages/Auth";

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* Home page */}

        {/* we want to protect these routes */}
        <Route path="/keys" element={<Keys />} />
        <Route path="/values" element={<Values />} />

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
