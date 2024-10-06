import { useQuery } from "@tanstack/react-query";

interface Options {
  headers: {
    Authorization: string;
  };
}

const getData = async <T>(token: string): Promise<T> => {
  const options: Options = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await fetch("/api/teams/my", options);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return await res.json();
};

export function useMyTeams<T>(token: string) {
  const { isPending, error, data, isFetching } = useQuery<T>({
    queryKey: ["fetchMyTeams"],
    queryFn: (): Promise<T> => getData<T>(token),
  });
  return { isPending, error, data, isFetching };
}
