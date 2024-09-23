import React from "react";

export const FormHeader = ({
  children,
  subheader,
}: {
  children: React.ReactNode;
  subheader?: React.ReactNode;
}) => {
  return (
    <div className="text-center">
      <h2 className="mt-6 text-3xl font-bold text-gray-900">{children}</h2>
      <p className="mt-2 text-sm text-gray-600">{subheader}</p>
    </div>
  );
};
