import React from "react";
import { Outlet, redirect } from "react-router";

export const protectedAdminLoader = () => {
  const jwt = localStorage.getItem("jwt");
  if (jwt === null) return redirect("../");
  if (jwt !== null) {
    const { role } = JSON.parse(atob(jwt.split(".")[1]));
    if (role !== "admin") {
      return redirect("../");
    }
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};
