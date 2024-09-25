import React from "react";
import { fakeAuthProvider } from "../components/fakeAuthProvider";
import { redirect } from "react-router-dom";

export default async function protectedLoader() {
  const jwt = localStorage.getItem("jwt");
  if (jwt === "undefined" || jwt === null) {
    return redirect("/");
  }

  if (jwt !== null) {
    const token = jwt;
    if (!token) {
      console.log("not authenticated");
      return redirect("/");
    }
    console.log("authenticated");
    return token;
  }
  return null;
}
