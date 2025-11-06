import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfolioPage from "./App.jsx";
import CoffeeHouse from "./projects/coffee-house/CoffeeHouse.jsx"; // <- you'll add this file
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/coffee-house" element={<CoffeeHouse />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
