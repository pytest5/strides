import { useQuery } from "@tanstack/react-query";

interface Options {
  headers: {
    Authorization: string;
  };
}

interface QueryOptions {
  token?: string | undefined;
  enabled?: boolean;
}

const getData = async <T>(
  url: string | undefined,
  token?: string | undefined
): Promise<T> => {
  const options: Options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if (!url) throw new Error("URL is undefined, cannot fetch data");

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return await res.json();
};

export function useFetch<T>(
  url: string | undefined,
  identifier: string[],
  { token = "", enabled = true }: QueryOptions = {}
) {
  const { isPending, error, data, isFetching } = useQuery<T>({
    queryKey: identifier,
    queryFn: () => getData<T>(url, token),
    enabled,
  });
  return { isPending, error, data, isFetching };
}
