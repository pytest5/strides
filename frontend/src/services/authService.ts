import React from "react";

interface User {
  user_id: number;
  username: string;
  role: string;
  email: string;
  created_at: string;
}

const signup = async (formData: {
  email: string;
  password: string;
  username: string;
}): Promise<void> => {
  const url = "/api/users/signup";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error signing up.", error.message);
    }
    console.error(error);
    throw new Error("Unexpected error occurred");
  }
};

const login = async (formData: {
  email: string;
  password: string;
}): Promise<string> => {
  const url = "/api/users/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("res not ok");
      throw new Error(`Response status: ${response.status}`);
    }
    const token = await response.json();
    return token;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error logging in.", error.message);
    }
    console.error(error);
    throw new Error("Unexpected error occurred");
  }
};

const getCurrentUser = async (email: string, token: string): Promise<User> => {
  try {
    const response = await fetch("/api/users/current", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Error fetching current user details from DB. Please check if user exists",
        error.message
      );
    }
    throw new Error("Unknown error occurred");
  }
};

const logout = () => {
  localStorage.removeItem("jwt");
};

const checkToken = () => {};

export default { login, logout, signup, checkToken, getCurrentUser };
