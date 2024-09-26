import React from "react";
import { Badge } from "./ui/badge";
import { ShieldCheck } from "lucide-react";
import { useUser } from "./UserProvider";

export const AdminBadge = () => {
  const { isAdmin } = useUser();
  return (
    <>
      {isAdmin && (
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <ShieldCheck className="w-3 h-3 mr-1" />
          <span className="hidden md:inline">Admin</span>
        </Badge>
      )}
    </>
  );
};
