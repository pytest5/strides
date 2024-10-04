import { LoaderIcon } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

const LoadingSpinner = ({ className }: Props) => {
  return (
    <div className="w-full h-full grid place-content-center">
      <LoaderIcon className={`animate-spin ${className}`} />
    </div>
  );
};

export default LoadingSpinner;
