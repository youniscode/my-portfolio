import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioPage from "./App.jsx";
import CoffeeHouse from "./pages/CoffeeHouse.jsx"; // <- you'll add this file
import "./index.css";
import PortfolioBuilder from "./pages/PortfolioBuilder.jsx";
import AiFormAssistant from "./pages/AiFormAssistant.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/coffee-house" element={<CoffeeHouse />} />
        <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
        <Route path="/ai-form-assistant" element={<AiFormAssistant />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
