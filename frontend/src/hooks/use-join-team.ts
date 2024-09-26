import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { joinTeam } from "@/services/teamService";
import { useUser } from "@/components/UserProvider";
import { useTriggerToast } from "./use-trigger-toast";

interface Options {
  headers: {
    Authorization: string;
  };
}

export function useJoinTeam<T>(token?: string | undefined) {
  const queryClient = useQueryClient();
  const triggerToast = useTriggerToast();

  const mutation = useMutation({
    mutationFn: (teamId: number) => joinTeam(teamId, token),
    onError: (error, variables, context) => {
      triggerToast("alreadyInTeam", { type: "destructive" });
    },
    onSuccess: (data, variables, context) => {
      triggerToast("submit");
      queryClient.invalidateQueries(["fetchMyTeams"]);
    },
  });

  return mutation;
}
