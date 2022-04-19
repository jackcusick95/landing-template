const ZAPIER_TWITTER_WEBHOOK = process.env.NEXT_PUBLIC_TWITTER_WEBHOOK;

type PostTweet = {
  text: string;
};

export const postToTwitter = async ({
  text
}: PostTweet): Promise<string> => {
  const message = text;

  return fetch(ZAPIER_TWITTER_WEBHOOK as string, {
    method: "POST",
    body: JSON.stringify({ text: message }),
  }).then((r) => {
    if (r.ok) return r.json();
    return Promise.reject(r.text());
  });
};