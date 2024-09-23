import authService from "@/services/authService";
import React from "react";
import { Outlet } from "react-router";

interface User {
  user_id: number;
  username: string;
  role: string;
  email: string;
  created_at: string;
}

type Token = string;

interface DecodedToken {
  username: string;
  role: "admin" | "user" | "";
  email: string;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void;
  isLoggedIn: boolean;
}

export const UserContext = React.createContext<UserContextType>({
  user: {
    user_id: 0,
    username: "",
    role: "",
    email: "",
    created_at: "",
  },
  setUser: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const UserProvider = () => {
  const [user, setUser] = React.useState<User>({
    user_id: 0,
    username: "",
    role: "",
    email: "",
    created_at: "",
  });
  const [jwtToken, setJwtToken] = React.useState<Token>("");
  const [decodedToken, setDecodedToken] = React.useState<DecodedToken>({
    email: "",
    username: "",
    role: "",
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  // init token, decoded token
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt !== null && jwt !== "undefined") {
      setJwtToken(jwt);
      const decoded = JSON.parse(atob(jwt.split(".")[1]));
      setDecodedToken(decoded);
      setIsLoggedIn(true);
    }
  }, []);

  // init current user
  React.useEffect(() => {
    if (!jwtToken) return;
    const initCurrentUser = async () => {
      const user = await authService.getCurrentUser(
        decodedToken.email,
        jwtToken
      );
      if (user === undefined) {
        return console.error("Unable to fetch user");
      }
      setUser(user);
    };
    initCurrentUser();
  }, [decodedToken.email, jwtToken]);

  const logout = React.useCallback(() => {
    setUser({
      user_id: 0,
      username: "",
      role: "",
      email: "",
      created_at: "",
    });
    setIsLoggedIn(false);
    authService.logout();
  }, []);

  const value = React.useMemo(
    () => ({ user, setUser, logout, isLoggedIn, setIsLoggedIn, jwtToken }),
    [user, logout, jwtToken, isLoggedIn]
  );

  return (
    <UserContext.Provider value={value}>
      <Outlet />
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
