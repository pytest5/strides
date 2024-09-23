import { toast } from "@/hooks/use-toast";

export const capitalizeFirstLetter = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};
