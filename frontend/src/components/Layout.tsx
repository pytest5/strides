import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="flex flex-col h-full bg-gray-100  sm:gap-0">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
