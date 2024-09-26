import { LoaderIcon } from "lucide-react";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full grid place-content-center">
      <LoaderIcon className="animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
