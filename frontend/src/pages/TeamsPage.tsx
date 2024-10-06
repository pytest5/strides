"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@/components/UserProvider";
import { TeamTable } from "@/components/TeamsTable";
import LoadingSpinner from "@/components/LoadingSpinner";

type Team = {
  id: string;
  name: string;
  location: string;
};

export default function TeamsPage() {
  const { jwtToken, user } = useUser();
  const { isPending, data: publicTeams } = useFetch<Team[]>(
    "/api/teams/public",
    ["fetchPublicTeams"],
    { token: jwtToken }
  );

  const { isPending: isMyTeamsPending, data: myTeams } = useFetch<Team[]>(
    "/api/teams/my",
    ["fetchMyTeams", user?.email],
    { token: jwtToken }
  );

  if (!user || isPending || isMyTeamsPending || !jwtToken) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Teams</CardTitle>
          <Button asChild>
            <Link to="add">Add Team</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="myTeams" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="myTeams">My Teams</TabsTrigger>
              <TabsTrigger value="publicTeams">Public Teams</TabsTrigger>
            </TabsList>
            <TabsContent value="myTeams">
              <div className="h-full overflow-auto mt-4">
                {myTeams?.length > 0 ? (
                  <TeamTable teams={myTeams} isPublic={false} />
                ) : (
                  <p className="text-center text-muted-foreground">
                    Add a team to get started
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="publicTeams">
              <div className="h-full overflow-auto mt-4 rounded-md border">
                {publicTeams?.length > 0 ? (
                  <TeamTable teams={publicTeams} isPublic={true} />
                ) : (
                  <p className="text-center text-muted-foreground">
                    No public teams yet
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
