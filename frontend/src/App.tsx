import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import protectedLoader from "./loaders/protectedLoader.ts";
import ProfilePage from "./pages/ProfilePage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import SignUpPage from "./pages/SignupPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { UserProvider } from "./components/UserProvider.tsx";
import { protectedAdminLoader } from "./loaders/protectedAdminLoader.tsx";
import { StridesMap } from "./components/StridesMap.tsx";
import { Dashboard } from "./components/Dashboard.tsx";
import { ItemsBarChart } from "./components/dashboard/ItemsBarChart.tsx";
import AddStridesPage from "./pages/AddStridesPage.tsx";
import TeamsPage from "./pages/TeamsPage.tsx";
import AddTeamPage from "./pages/AddTeamPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "signup",
            element: <SignUpPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "map",
            element: <StridesMap />,
          },
          {
            loader: protectedLoader,
            children: [
              { path: "strides/add", element: <AddStridesPage /> },
              { path: "teams/add", element: <AddTeamPage /> },
              { path: "teams", element: <TeamsPage /> },
            ],
          },
          {
            loader: protectedAdminLoader, // TODO: CHANGE TO PROTECTED ADMIN LOADER
            children: [
              // { path: "admin", element: <AdminPage /> },
              { path: "admin", element: <AdminPage /> },
              // { path: "admin/profile", element: <ProfilePage /> },
            ],
          },
        ],
      },
      {
        loader: protectedLoader,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
