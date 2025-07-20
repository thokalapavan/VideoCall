// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage"; // ✅ Import the HomePage component

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />         {/* ✅ Homepage route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
