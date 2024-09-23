import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { NavbarLinks } from "./NavbarLinks";
import { useUser } from "./UserProvider";
import { capitalizeFirstLetter } from "../utils/index.js";
import { SideDrawer } from "./SideDrawer.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar.js";

export default function Navbar() {
  const { user, isLoggedIn } = useUser();

  return (
    <nav className="shadow-sm py-3  ">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex sm:flex-row justify-between items-center">
        <div className="flex">
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-800">YEET</span>
          </Link>
        </div>
        <div className="hidden sm:flex md:ml-6  md:items-center">
          <NavbarLinks variant="horizontal" />
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
          <Button className="relative py-1 px-3 h-7 font-normal">
            Shop now
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              0
            </span>
          </Button>
        </div>
        <div className="-mr-2 flex items-center sm:hidden">
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserAvatar className="h-7 w-7 border-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => ""}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <SideDrawer
            trigger={
              <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                <Menu className="block h-6 w-6" />
              </button>
            }
          />
        </div>
      </div>
    </nav>
  );
}
