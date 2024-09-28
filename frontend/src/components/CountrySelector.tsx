import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import offlineCountries from "../data/countries.json";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;
import { useCountries } from "@/hooks/use-countries";
import { useUser } from "./UserProvider";
import LoadingSpinner from "./LoadingSpinner";

export const CountrySelector = ({ field, form }) => {
  const { jwtToken } = useUser();
  const { data: countries, error, isPending } = useCountries(jwtToken);

  const arrayOfCountriesObj = countries?.map(
    ({ id, name }: { id: number; name: string }) => ({
      id: id,
      label: name,
      value: id,
    })
  );

  const arrayOfOfflineCountriesObj = offlineCountries?.map(
    ({ id, name }: { id: number; name: string }) => ({
      id: id,
      label: name,
      value: id,
    })
  );

  // const arrayOfCountriesObj = [];
  console.log(countries);

  if (isPending || !arrayOfOfflineCountriesObj) {
    return <LoadingSpinner />;
  }

  return (
    <FormItem className="flex flex-col">
      <FormLabel>Country</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value
                ? arrayOfOfflineCountriesObj.find(
                    (country) => country.value === field.value
                  )?.label
                : "Select country"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {arrayOfCountriesObj.map((country) => (
                  <CommandItem
                    value={country.label}
                    key={country.value}
                    onSelect={() => {
                      form.setValue("country", country.value);
                      console.log(form.getValues()); // Check if the country is updated
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        country.value === field.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {country.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription>This is your country.</FormDescription>
      <FormMessage />
    </FormItem>
  );
};
