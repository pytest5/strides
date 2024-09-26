import { useQuery } from "@tanstack/react-query";

interface Options {
  headers: {
    Authorization: string;
  };
}
const getData = async <T>(
  url: string,
  token?: string | undefined
): Promise<T> => {
  const options: Options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return await res.json();
};

export function useFetch<T>(
  url: string,
  identifier: string[],
  token?: string | undefined
) {
  const { isPending, error, data, isFetching } = useQuery<T>({
    queryKey: identifier,
    queryFn: () => getData<T>(url, token),
  });
  return { isPending, error, data, isFetching };
}
