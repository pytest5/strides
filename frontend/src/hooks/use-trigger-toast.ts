import React from "react";
import { toast } from "./use-toast";
import { capitalizeFirstLetter } from "@/utils";

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
  submit: {
    title: string;
    description: string;
  };
  c;
  alreadyInTeam: {
    title: string;
    description: string;
  };
  leaveTeam: {
    title: string;
    description: string;
  };
}

interface Options {
  type?: "destructive";
  data?: string;
  duration?: number;
}

capitalizeFirstLetter;

export const useTriggerToast = () => {
  const triggerToast = (
    variant:
      | "logout"
      | "login"
      | "signup"
      | "submit"
      | "alreadyInTeam"
      | "leaveTeam",
    options?: Options
  ) => {
    const { type, data, duration = 3000 } = options || {};
    const messages: Message = {
      logout: {
        title: "Logged out successfully",
        description: "See you next time!",
      },
      login: {
        title: "Signed in successfully",
        description: `Welcome back, ${capitalizeFirstLetter(data)}!`,
      },
      signup: {
        title: "Signed up successfully",
        description: `Welcome, ${capitalizeFirstLetter(data)}!`,
      },
      submit: {
        title: "Submitted successfully",
        description: "Your data has been saved!",
      },
      alreadyInTeam: {
        title: "Already in Team",
        description: `You're already a member of this team, ${data}.`,
      },
      leaveTeam: {
        title: "Left Team Successfully",
        description: `You have successfully left the team.`,
      },
    };
    setTimeout(() => {
      toast({
        variant: type === "destructive" ? "destructive" : undefined,
        title: messages[variant].title,
        description: messages[variant].description,
        duration,
      });
    }, 800);
  };

  return triggerToast;
};
