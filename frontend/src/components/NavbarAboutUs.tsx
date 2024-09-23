import React from "react";
import { NavbarLink } from "./NavbarLink";

export const NavbarAboutUs = ({ className }: { className?: string }) => {
  return (
    <div className={`pl-4 ${className}`}>
      <NavbarLink to="/" className="block text-base">
        Our Team
      </NavbarLink>
      <NavbarLink to="/" className="block text-base">
        Our Mission
      </NavbarLink>
      <NavbarLink to="/" className="block text-base">
        Contact Us
      </NavbarLink>
    </div>
  );
};
