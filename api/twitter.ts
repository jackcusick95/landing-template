import Cors from 'cors'
// import { ENDPOINTS } from '../endpoints';



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

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: any, res: any, fn:any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export const getAllTweets = async (): Promise<any> => {

  runMiddleware("GET", "hello", cors);
  
  const requestOptions = {
  method: 'GET',
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer AAAAAAAAAAAAAAAAAAAAAEfQbgEAAAAA4fyNL0MQgG3Id0yP5TPZ9d77yro%3DYz2YtFsXpxtSfRuUz9RdjRA8tjyUjk34MlzqccCNKikixmEPxi`,
  }
};

return fetch(`https://api.twitter.com/2/users/1516498451508477955/tweets`, requestOptions)
  // .then((response) => {
  //   if (response.ok) return response.json();
  // })
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
};



