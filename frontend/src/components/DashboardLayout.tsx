import React from "react";
import { Outlet } from "react-router";
import { DashboardNavbar } from "./DashboardNavbar";

export const DashboardLayout = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
