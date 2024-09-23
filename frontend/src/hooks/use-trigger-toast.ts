import React from "react";
import { toast } from "./use-toast";

interface Message {
  logout: {
    title: string;
    description: string;
  };
  login: {
    title: string;
    description: string;
  };
  signup: {
    title: string;
    description: string;
  };
}

export const useTriggerToast = () => {
  const triggerToast = (
    variant: "logout" | "login" | "signup",
    name?: string,
    duration: number = 2300
  ) => {
    const messages: Message = {
      logout: {
        title: "Logged out successfully",
        description: "See you next time!",
      },
      login: {
        title: "Signed in successfully",
        description: `Welcome back, ${name}!`,
      },
      signup: {
        title: "Signed up successfully",
        description: `Welcome, ${name}!`,
      },
    };
    setTimeout(() => {
      toast({
        title: messages[variant].title,
        description: messages[variant].description,
        duration,
      });
    }, 1000);
  };

  return triggerToast;
};
