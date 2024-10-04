import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useUser } from "./UserProvider";
import LoadingSpinner from "./LoadingSpinner";
import { useJoinTeam } from "@/hooks/use-join-team";
import { useLeaveTeam } from "@/hooks/use-leave-team";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type Team = {
  id: string;
  name: string;
  location: string;
};

interface Props {
  teams: Team[];
  isPublic: boolean;
}

export const TeamTable = ({ teams, isPublic }: Props) => {
  const { jwtToken } = useUser();
  const joinTeamMutation = useJoinTeam(jwtToken);
  const leaveTeamMutation = useLeaveTeam(jwtToken);

  const handleJoinTeam = (teamId: number) => () => {
    joinTeamMutation.mutate(teamId);
  };

  const handleLeaveTeam = (teamId: number) => () => {
    leaveTeamMutation.mutate(teamId);
  };

  if (joinTeamMutation.isPending) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollArea className="h-[400px] ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {teams?.map((team) => (
            <TableRow key={`${team.id}-${isPublic}`}>
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell>{team.location}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {isPublic ? (
                      <DropdownMenuItem onClick={handleJoinTeam(team.id)}>
                        Join Team
                      </DropdownMenuItem>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={handleLeaveTeam(team.id)}>
                          Leave Team
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
