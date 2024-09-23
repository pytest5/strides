import React from "react";

export const FormWrapper = ({
  header,
  children,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex flex-col h-full items-center justify-start sm:justify-center bg-gray-100 px-4 ">
      <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-md">
        {header}
        {children}
      </div>
    </div>
  );
};
