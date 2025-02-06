import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { leaveTeam } from "@/services/teamService";
import { useUser } from "@/components/UserProvider";
import { useTriggerToast } from "./use-trigger-toast";

interface Options {
  headers: {
    Authorization: string;
  };
}

export function useLeaveTeam<T>(token?: string | undefined) {
  const queryClient = useQueryClient();
  const triggerToast = useTriggerToast();

  const mutation = useMutation({
    mutationFn: (teamId: number) => leaveTeam(teamId, token),
    onError: (error, variables, context) => {
      console.log(error);
      triggerToast("alreadyInTeam", { type: "destructive" });
    },
    onSuccess: (data, variables, context) => {
      triggerToast("leaveTeam");
      queryClient.invalidateQueries(["fetchMyTeams"]);
    },
  });

  return mutation;
}
