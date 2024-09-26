import React from "react";
import { NavbarLink } from "./NavbarLink";

export const NavbarAboutUs = ({ className }: { className?: string }) => {
  return (
    <div className={`pl-4 ${className}`}>
      <NavbarLink to="/strides/add" className="block text-base">
        Add strides
      </NavbarLink>
      <NavbarLink to="/strides" className="block text-base">
        My strides
      </NavbarLink>
      {/* <NavbarLink to="/" className="block text-base">
        Contact Us
      </NavbarLink> */}
    </div>
  );
};
