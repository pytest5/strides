import { useQuery } from "@tanstack/react-query";

export function useFetch(url: string, identifier: string) {
  const getData = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return await res.json();
  };

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: [identifier],
    queryFn: getData,
  });

  return { isLoading, error, data, isFetching };
}
