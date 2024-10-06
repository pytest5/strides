import { useQuery } from "@tanstack/react-query";

interface Options {
  headers: {
    Authorization: string;
  };
}

const getData = async <T>(token?: string | undefined): Promise<T> => {
  const options: Options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await fetch("/api/teams/admin", options);
  console.log(res);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return await res.json();
};

export function useAllTeams<T>(token?: string | undefined) {
  const { isPending, error, data, isFetching } = useQuery<T>({
    queryKey: ["fetchTeamsForAdmin"],
    queryFn: (): Promise<T> => getData<T>(token),
  });
  return { isPending, error, data, isFetching };
}
