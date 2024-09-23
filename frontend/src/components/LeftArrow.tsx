import React from "react";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

export const LeftArrow = ({ size }: { size: string | number }) => {
  return (
    <div className="pl-3 pt-3 lg:pl-6">
      <Link
        to="/"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-gray-200 text-gray-700 h-10 w-10"
      >
        <MdArrowBack size={size} />
      </Link>
    </div>
  );
};
