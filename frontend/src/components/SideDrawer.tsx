import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CircleUserRound } from "lucide-react";
import { NavbarLinks } from "./NavbarLinks";
import { useUser } from "./UserProvider";
import { Link, useNavigate } from "react-router-dom";
import { useTriggerToast } from "@/hooks/use-trigger-toast";
import { AdminBadge } from "./AdminBadge";
import { NavbarLink } from "./NavbarLink";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function SideDrawer({
  trigger,
  side,
}: {
  trigger?: React.ReactNode;
  side?: "left" | "right";
}) {
  const { user, isAdmin, isLoggedIn, logout } = useUser();
  const navigate = useNavigate();
  const triggerToast = useTriggerToast();
  const [isStridesOpen, setIsStridesOpen] = React.useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = React.useState(false);

  const isHorizontal = false;

  const verticalStyles =
    "flex justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200";
  const horizontalStyles =
    "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition duration-150 ease-in-out inline-flex items-center";

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={side} className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <Link to="/">Strides</Link>
          </SheetTitle>
        </SheetHeader>
        <div className="pt-6 pb-3 space-y-1">
          {/* <NavbarLinks /> */}
          <>
            <SheetClose asChild>
              <NavbarLink
                to="/"
                className={`${!isHorizontal ? "block text-base" : "text-sm "}`}
              >
                Home
              </NavbarLink>
            </SheetClose>
            <NavbarLink
              to="/dashboard"
              className={`${!isHorizontal ? "block text-base" : "text-sm"}`}
            >
              Dashboard
            </NavbarLink>
            {isLoggedIn && (
              <SheetClose asChild>
                <NavbarLink
                  to="/teams"
                  className={`${!isHorizontal ? "block text-base" : "text-sm"}`}
                >
                  Teams
                </NavbarLink>
              </SheetClose>
            )}
            {isLoggedIn && (
              <div className={`${isHorizontal ? "relative" : ""}`}>
                <button
                  onClick={() => setIsTeamsOpen(!isTeamsOpen)}
                  className={`${
                    isHorizontal ? horizontalStyles : verticalStyles
                  }`}
                >
                  Teams
                  <ChevronDown
                    className={`${
                      !isHorizontal
                        ? `h-5 w-5 transform ${
                            isTeamsOpen ? "rotate-180" : ""
                          } transition-transform duration-200`
                        : "ml-1 h-4 w-4"
                    }`}
                  />
                </button>
                {isTeamsOpen && (
                  <div
                    className={`${
                      isHorizontal
                        ? "absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        : ""
                    }`}
                  >
                    <div className="pl-4 py-1">
                      <SheetClose asChild>
                        <NavbarLink to="/teams/add" className="block text-base">
                          Add Team
                        </NavbarLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <NavbarLink to="/teams" className="block text-base">
                          My Teams
                        </NavbarLink>
                      </SheetClose>
                    </div>
                  </div>
                )}
              </div>
            )}
            {isAdmin && (
              <SheetClose asChild>
                <NavbarLink
                  to="/admin"
                  className={`${!isHorizontal ? "block text-base" : "text-sm"}`}
                >
                  Admin
                </NavbarLink>
              </SheetClose>
            )}

            {isLoggedIn && (
              <div className={`${isHorizontal ? "relative" : ""}`}>
                <button
                  onClick={() => setisTeamsOpen(!isStridesOpen)}
                  className={`${
                    isHorizontal ? horizontalStyles : verticalStyles
                  }`}
                >
                  Strides
                  <ChevronDown
                    className={`${
                      !isHorizontal
                        ? `h-5 w-5 transform ${
                            isStridesOpen ? "rotate-180" : ""
                          } transition-transform duration-200`
                        : "ml-1 h-4 w-4"
                    }`}
                  />
                </button>
                {isStridesOpen && (
                  <div
                    className={`${
                      isHorizontal
                        ? "absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        : ""
                    }`}
                  >
                    <div className="pl-4 py-1">
                      <SheetClose asChild>
                        <NavbarLink
                          to="/strides/add"
                          className="block text-base"
                        >
                          Add Stride
                        </NavbarLink>
                      </SheetClose>
                      <SheetClose asChild>
                        <NavbarLink to="/strides" className="block text-base">
                          My Strides
                        </NavbarLink>
                      </SheetClose>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        </div>
        <SheetFooter className="mt-auto border-t border-gray-200 sm:flex-col-reverse ">
          {isLoggedIn && (
            <div className="flex items-center pt-8 pb-3 pl-2 ">
              <Link to="/profile" className="flex-shrink-0 mt-1">
                <CircleUserRound
                  size={44}
                  strokeWidth=""
                  className="text-gray-600"
                />
              </Link>
              <div className="ml-3 ">
                <div className="text-base font-medium text-gray-800">
                  {user?.username} <AdminBadge />
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {user?.email}
                </div>
              </div>
            </div>
          )}

          <SheetClose className="text-start">
            <div
              onClick={() => {
                navigate(`${isLoggedIn ? "/" : "/login"}`);
                if (isLoggedIn) {
                  triggerToast("logout");
                  logout();
                }
              }}
              className={`px-3 py-2 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition duration-150 ease-in-out text-base`}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </div>
          </SheetClose>
          {/* <Link
            to={"/dashboard"}
            className={` px-3 pt-2 py-2 mt-6 ml-0 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition duration-150 ease-in-out text-base`}
          >
            Shop now
          </Link> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
