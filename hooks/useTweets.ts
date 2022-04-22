import { useQuery } from "react-query";
import { getAllTweets } from "../api/twitter";
import QUERY_CACHE from "../utils/query-cache";

type UseTweets= {
  tweets: any;
};

export function useTweets(): UseTweets {
  const { data } = useQuery(
    [QUERY_CACHE.ALL_TWEETS],
    getAllTweets,
    {
      retry: false,
      retryOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  return { tweets: data === undefined ? undefined : data[0] };
}