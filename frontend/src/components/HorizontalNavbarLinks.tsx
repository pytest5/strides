import React from "react";
import { NavbarLink } from "./NavbarLink";
import { ChevronDown } from "lucide-react";
import { NavbarAboutUs } from "./NavbarAboutUs";
import { useUser } from "./UserProvider";

export const HorizontalNavbarLinks = ({
  variant,
}: {
  variant?: "horizontal";
}) => {
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);
  const { isAdmin, isLoggedIn } = useUser();
  const isHorizontal = variant === "horizontal";

  const verticalStyles =
    "flex justify-between w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200";
  const horizontalStyles =
    "px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition duration-150 ease-in-out inline-flex items-center";
  return (
    <>
      <NavbarLink
        to="/"
        className={`${!isHorizontal ? "block text-base" : "text-sm "}`}
      >
        Home
      </NavbarLink>
      <NavbarLink
        to="/dashboard"
        className={`${!isHorizontal ? "block text-base" : "text-sm"}`}
      >
        Dashboard
      </NavbarLink>
      {isLoggedIn && (
        <NavbarLink
          to="/strides/add"
          className={`${!isHorizontal ? "block text-base" : "text-sm"}`}
        >
          Stride
        </NavbarLink>
      )}
      {isLoggedIn && (
        <NavbarLink
          to="/teams"
          className={`${!isHorizontal ? "block text-base" : "text-sm"}`}
        >
          Teams
        </NavbarLink>
      )}
      {isAdmin && (
        <NavbarLink
          to="admin"
          className={`${!isHorizontal ? "block text-base" : "text-sm"}`}
        >
          Admin
        </NavbarLink>
      )}
      <div className={`${isHorizontal ? "relative" : ""}`}>
        <button
          onClick={() => setIsAboutOpen(!isAboutOpen)}
          className={`${isHorizontal ? horizontalStyles : verticalStyles}`}
        >
          About
          <ChevronDown
            className={`${
              !isHorizontal
                ? `h-5 w-5 transform ${
                    isAboutOpen ? "rotate-180" : ""
                  } transition-transform duration-200`
                : "ml-1 h-4 w-4"
            }`}
          />
        </button>
        {isAboutOpen && (
          <div
            className={`${
              isHorizontal
                ? "absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                : ""
            }`}
          >
            <NavbarAboutUs className="py-1" />
          </div>
        )}
      </div>
    </>
  );
};
