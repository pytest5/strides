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

export function SideDrawer({
  trigger,
  side,
}: {
  trigger?: React.ReactNode;
  side?: "left" | "right";
}) {
  const { user, isLoggedIn, logout } = useUser();
  const navigate = useNavigate();
  const triggerToast = useTriggerToast();
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side={side} className="flex flex-col">
        <SheetHeader>
          <SheetTitle>
            <Link to="/">Yeet</Link>
          </SheetTitle>
        </SheetHeader>
        <div className="pt-6 pb-3 space-y-1">
          <NavbarLinks />
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
                  {user?.username}
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
          <Link
            to={"/dashboard"}
            className={` px-3 pt-2 py-2 mt-6 rounded-md font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition duration-150 ease-in-out text-base`}
          >
            Shop now
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
