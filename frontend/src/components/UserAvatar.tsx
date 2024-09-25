import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "./UserProvider";

export const UserAvatar = ({ className }: { className?: string }) => {
  const { user } = useUser();

  return (
    <Avatar className={`h-16 w-16 border-gray-200 ${className}`}>
      <AvatarImage src="/placeholder-avatar.jpg" alt={user?.username[0]} />
      <AvatarFallback>{user?.username[0]?.toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
