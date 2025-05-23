import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "./UserProvider";
import LoadingSpinner from "./LoadingSpinner";

type ValueType = number | null;

interface Props {
  value: ValueType;
  setValue: (value: ValueType) => void;
  fetchTeamFn: (token: string) => FnReturnProps;
}

interface Team {
  value: number;
  label: string;
}

interface TeamData {
  team_id: number;
  team_name: string;
}

interface FnReturnProps {
  data: TeamData[] | undefined;
  isPending: boolean;
  error: Error | null;
  isFetching: boolean;
}

export function TeamComboBox({ value, setValue, fetchTeamFn }: Props) {
  const [open, setOpen] = React.useState(false);
  const { jwtToken } = useUser();
  const { data, isPending } = fetchTeamFn(jwtToken);

  if (isPending || !data) {
    return <LoadingSpinner />;
  }

  const teams: Team[] = data?.map(({ team_id, team_name }) => ({
    value: team_id,
    label: team_name,
  }));
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? teams.find((team) => team.value === Number(value))?.label
            : "Select team..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandInput
            // autoFocus={false}
            placeholder="Search team..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup>
              {teams?.map((team) => (
                <CommandItem
                  key={team.value}
                  // value={team.value?.toString()}
                  value={team.label?.toLowerCase()}
                  onSelect={(currentValue) => {
                    // setValue(+currentValue === value ? null : +currentValue);
                    const selectedTeam = teams.find(
                      (team) =>
                        team.label?.toLowerCase() === currentValue.toLowerCase()
                    );
                    setValue(selectedTeam ? selectedTeam.value : null); // Store team ID in `setValue
                    setOpen(false);
                  }}
                >
                  {team.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === team.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
