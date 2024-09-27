import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Link } from "react-router-dom";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@/components/UserProvider";
import { useCountries } from "@/hooks/use-countries";
import { TeamTable } from "@/components/TeamsTable";
import { ChevronRight } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

type Team = {
  id: string;
  name: string;
  location: string;
};

export default function TeamsPage() {
  const { jwtToken, user } = useUser();
  console.log(jwtToken);
  const { isPending, data: publicTeams } = useFetch<Team[]>(
    "/api/teams/public",
    ["fetchPublicTeams"],
    jwtToken
  );
  const { isPending: isMyTeamsPending, data: myTeams } = useFetch<Team[]>(
    "/api/teams/my",
    ["fetchMyTeams", user?.email],
    jwtToken
  );
  console.log("pub team", publicTeams);
  console.log("my team", myTeams);
  const { data: countries, isPending: isCountryPending } =
    useCountries(jwtToken);

  if (isPending || isMyTeamsPending) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-full overflow-auto md:container mx-auto p-4 space-y-8 ">
      <div className="grid grid-cols-2 w-[195%] md:w-[100%] gap-2 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Public Teams</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] overflow-auto">
            {publicTeams?.length > 0 ? (
              <TeamTable teams={publicTeams} isPublic={true} />
            ) : (
              <p className="text-center text-muted-foreground">
                No public teams yet
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-start">
            <CardTitle>My Teams</CardTitle>
            <Button
              variant="outline"
              size="icon"
              className="text-xs h-5 w-14 !mt-0"
              asChild
            >
              <Link
                to="add"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Add
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="h-[400px] overflow-auto">
            {myTeams?.length > 0 ? (
              <TeamTable teams={myTeams} isPublic={false} />
            ) : (
              <p className="text-center text-muted-foreground">
                Add a team to get started
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
