import React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NavbarLink = ({ to, children, className, onClick }: Props) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-2 sm:px-2 md:px-3 rounded-md text-s font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-200 transition duration-150 ease-in-out ${className}`}
    >
      {children}
    </Link>
  );
};
