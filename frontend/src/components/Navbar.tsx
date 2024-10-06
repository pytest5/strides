import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useUser } from "./UserProvider";
import { capitalizeFirstLetter } from "../utils/index.js";
import SideDrawer from "./SideDrawer.js";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar.js";
import { AdminBadge } from "./AdminBadge.js";
import { HorizontalNavbarLinks } from "./HorizontalNavbarLinks.js";
import { useTriggerToast } from "@/hooks/use-trigger-toast.js";

export default function Navbar() {
  const { user, isLoggedIn, logout } = useUser();
  const triggerToast = useTriggerToast();

  return (
    <nav className="shadow-sm py-3  ">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex sm:flex-row justify-between items-center">
        <div className="flex">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-800">Strides</span>
          </Link>
        </div>
        <div className="hidden sm:flex md:ml-6  md:items-center">
          <HorizontalNavbarLinks variant="horizontal" />
        </div>
        <div className="hidden md:ml-6 sm:flex md:items-center space-x-2">
          <Button
            asChild
            variant="outline"
            className="py-1 px-3 h-7 font-normal"
          >
            {user?.username ? (
              <Link to="/profile">{capitalizeFirstLetter(user.username)}</Link>
            ) : (
              <Link to="login">Login</Link>
            )}
          </Button>
          <AdminBadge />
          {/* <Button className="relative py-1 px-3 h-7 font-normal">
            Shop now
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              0
            </span>
          </Button> */}
        </div>
        <div className="-mr-2 flex items-center sm:hidden">
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full space-x-1"
                >
                  {/* <div> */}
                  <UserAvatar className="h-7 w-7 border-2" />
                  <AdminBadge />
                  {/* </div> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="dashboard">Dashboard</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem asChild>
                  <Link to=''>Settings</Link>
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    triggerToast("logout");
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <SideDrawer
            trigger={
              <button className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <Menu className="block h-6 w-6" />
              </button>
            }
          />
        </div>
      </div>
    </nav>
  );
}
