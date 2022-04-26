
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

  //  NEED TO UPDATE
  // const endpointURL = "http://localhost:3000/api/requestTweets";
  const endpointURL = "https://wassie-dao.vercel.app/api/requestTweets";


  const response = await fetch(endpointURL, {
    method: "GET",
  });

  console.log("Fetching all tweets")

  return response.json();
};

export const getAllInverseTweets = async (): Promise<any> => {

  //  NEED TO UPDATE
  // const endpointURL = "http://localhost:3000/api/requestInverseTweets";
   const endpointURL = "https://wassie-dao.vercel.app/api/requestInverseTweets";


  const response = await fetch(endpointURL, {
    method: "GET",
  });

  console.log("Fetching all tweets")

  return response.json();
};




