import { toast } from "./use-toast";
import { capitalizeFirstLetter } from "@/utils";

interface Message {
  title: string;
  description: string;
}

interface Messages {
  logout: Message;
  login: Message;
  signup: Message;
  submit: Message;
  alreadyInTeam: Message;
  leaveTeam: Message;
  locationError: Message;
  locationNotSupported: Message;
  locationDenied: Message;
  locationObtained: Message;
  gettingLocation: Message;
  formLocationError: Message;
}

interface Options {
  type?: "destructive";
  data?: string | { latitude: number; longitude: number };
  duration?: number;
}

export const useTriggerToast = () => {
  const triggerToast = (variant: keyof Messages, options?: Options) => {
    const { type, data, duration = 3000 } = options || {};
    const messages: Messages = {
      logout: {
        title: "Logged out successfully",
        description: "See you next time!",
      },
      login: {
        title: "Signed in successfully",
        description: `Welcome back, ${capitalizeFirstLetter(data)}!`,
      },
      signup: {
        title: "Account Created",
        description: `Welcome, ${capitalizeFirstLetter(
          data
        )}! Please sign in to start using your account.`,
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
      formLocationError: {
        title: "Form location error",
        description: `Unable to get location for form submission.`,
      },
      locationError: {
        title: "Location error",
        description: `Unable to obtain location.`,
      },
      locationObtained: {
        title: "Location obtained",
        description: `${data}`,
      },
      locationNotSupported: {
        title: "Location not supported",
        description: `Geolocation services not supported on this browser.`,
      },
      locationDenied: {
        title: "Location permissions not granted",
        description: `Geolocation services permissions not granted by user.`,
      },
      gettingLocation: {
        title: "Getting location",
        description: `Looking for your current location... `,
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
