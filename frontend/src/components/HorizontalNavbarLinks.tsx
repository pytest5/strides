import React from "react";
import { NavbarLink } from "./NavbarLink";
import { useUser } from "./UserProvider";
import { DropDownStrideMenu } from "./DropDownStrideMenu";
import { DropDownTeamsMenu } from "./DropDownTeamsMenu";

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
      {/* {isLoggedIn && (
        <NavbarLink
          to="/strides/add"
          className={`${!isHorizontal ? "block text-base" : "text-sm"}`}
        >
          Stride
        </NavbarLink>
      )} */}
      {isLoggedIn && <DropDownTeamsMenu />}
      {isAdmin && (
        <NavbarLink
          to="admin"
          className={`${!isHorizontal ? "block text-base" : "text-sm"}`}
        >
          Admin
        </NavbarLink>
      )}
      {isLoggedIn && <DropDownStrideMenu />}
    </>
  );
};
