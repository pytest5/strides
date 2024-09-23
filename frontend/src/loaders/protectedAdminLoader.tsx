import { useUser } from "@/components/UserProvider";
import React from "react";
import { Outlet, redirect, useNavigate } from "react-router";

export const protectedAdminLoader = () => {
  const jwt = localStorage.getItem("jwt");
  const token = JSON.parse(jwt as string);
  const { role } = JSON.parse(atob(token.split(".")[1]));
  console.log("role", role);
  if (role !== "admin") {
    return redirect("../");
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};
