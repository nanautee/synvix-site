import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Community } from "./pages/Community";
import { Support } from "./pages/Support";
import { About } from "./pages/About";
import { HealthPage } from "./pages/HealthPage";
import { Store } from "./pages/Store";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/coming-soon" element={<Store />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/support/health" element={<HealthPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
