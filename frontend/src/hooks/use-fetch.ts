import { useQuery } from "@tanstack/react-query";

export function useFetch(url: string, identifier: string) {
  const getData = async () => {
    const res = await fetch(url);
    return await res.json();
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [`total-strides-stats-${identifier}`],
    queryFn: getData,
  });

  return { isPending, error, data, isFetching };
}
