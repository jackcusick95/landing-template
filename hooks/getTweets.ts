import { useQuery } from "react-query";
import { getAllInverseTweets, getAllTweets } from "../api/twitter";
import QUERY_CACHE from "../utils/query-cache";

type UseTweetResp = {
  wassieTweetData: any;
  inverseData: any;
};


export function getTweets(): UseTweetResp {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data: wassieTweetData } = useQuery([QUERY_CACHE.ALL_TWEETS], () =>
          getAllTweets(),
          {
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: false,
          }
        );

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data: inverseData } = useQuery([QUERY_CACHE.ALL_INVERSE_TWEETS], () =>
          getAllInverseTweets(),
          {
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
          }
        );

  return {
    wassieTweetData,
    inverseData,
  };
}