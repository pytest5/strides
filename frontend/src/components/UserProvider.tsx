import authService from "@/services/authService";
// import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Outlet } from "react-router";

export interface User {
  id: number;
  country_id: number;
  username: string;
  role: "admin" | "user" | "";
  email: string;
  created_at: string;
}

// type DecodedToken = Omit<User, "created_at"> & {
//   created_at?: string;
// };

type Jwt = string;

interface UserContextType {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  logout: () => void;
  initUser: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  jwtToken: string;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = React.createContext<UserContextType>({
  user: {
    id: 0,
    country_id: 0,
    username: "",
    role: "",
    email: "",
    created_at: "",
  },
  setUser: () => {},
  logout: () => {},
  initUser: () => {},
  isLoggedIn: false,
  isAdmin: false,
  jwtToken: "",
  setIsLoggedIn: () => {},
  setIsAdmin: () => {},
});

export const UserProvider = () => {
  // const queryClient = useQueryClient();
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [jwtToken, setJwtToken] = React.useState<Jwt | undefined>(undefined);
  // const [decodedToken, setDecodedToken] = React.useState<
  //   DecodedToken | undefined
  // >(undefined);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  const initUser = (decoded: User) => {
    const { role } = decoded;
    setUser(decoded);
    setIsLoggedIn(true);
    setIsAdmin(role === "admin");
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    if (jwt !== null && jwt !== "undefined") {
      const decoded = JSON.parse(atob(jwt.split(".")[1]));
      initUser(decoded);
      setJwtToken(jwt);
    }
  }, []);

  const logout = React.useCallback(() => {
    console.log("logging out");
    setUser(undefined);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setJwtToken("");
    localStorage.removeItem("jwt");
    // queryClient.invalidateQueries(["fetchPublicTeams"]);
    // queryClient.invalidateQueries(["fetchMyTeams"]);
    // queryClient.resetQueries(["fetchMyTeams"]);
    authService.logout();
  }, []);

  const value = React.useMemo(
    () => ({
      user,
      setUser,
      logout,
      initUser,
      isLoggedIn,
      setIsLoggedIn,
      jwtToken,
      setJwtToken,
      isAdmin,
      setIsAdmin,
    }),
    [user, logout, jwtToken, isLoggedIn, isAdmin]
  );

  console.log(value);

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
