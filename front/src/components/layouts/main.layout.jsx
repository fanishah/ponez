import React from "react";
import { Outlet } from "react-router";
import Navbar from "../navbar";

export default function MainLayout() {
  return (
    <div className="px-12">
      <Navbar />
      <Outlet />
    </div>
  );
}
