import { urlToHttpOptions } from "url";

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
  }).then((r) => {
    if (r.ok) return r.json();
    return Promise.reject(r.text());
  });
};

export const getAllTweets = async (): Promise<any> => {

  const endpointURL = "https://wassie-dao.vercel.app/api/requestTweets";

  const response = await fetch(endpointURL);

  console.log("Fetching all tweets");
  return response.json();
};

export const getAllInverseTweets = async (): Promise<any> => {

  const endpointURL = "https://wassie-dao.vercel.app/api/requestInverseTweets";

  const response = await fetch(endpointURL);

  console.log("Fetching all tweets");
  return response.json();
};

interface TextParams {
  text?: string;
}


// NEED TO GET THIS WORKING
export const postWasTweet = async ({text}: TextParams): Promise<any> => {

  const endpointURL = "http://localhost:3000/api/postWassieTweet";

  const token = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN;

  const response = await fetch(endpointURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "v2TweetLookupJS",
      "authorization": `Bearer ${token}`,
    },  
    body: JSON.stringify({
      text,
    })
  });

  console.log("Posting Tweet");

  return response.json();
};





