import { ENDPOINTS } from "../utils/endpoints";

const ZAPIER_TWITTER_WEBHOOK = process.env.NEXT_PUBLIC_TWITTER_WEBHOOK;

type PostTweet = {
  text: string;
  videoUrl: string | ArrayBuffer | null;
};

export const postToTwitter = async ({
  text, 
  videoUrl,
}: PostTweet): Promise<string> => {
  const message = text;

  return fetch(ZAPIER_TWITTER_WEBHOOK as string, {
    method: "POST",
    body: JSON.stringify({ text: message, video: videoUrl }),
    // headers: {
    // 'Access-Control-Allow-Headers': '*',
    // },
  }).then((r) => {
    if (r.ok) return r.json();
    return Promise.reject(r.text());
  });
};

export const getAllTweets = async () => {
  const response = await fetch(ENDPOINTS.TWEETS, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN}`,
    },
  });

  const fetchedTwitterList = await response.json();
  return fetchedTwitterList;
};
