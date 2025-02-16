import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./global.css";
import Home from "./pages/home.page.jsx";
import MainLayout from "./components/layouts/main.layout.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}></Route>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
