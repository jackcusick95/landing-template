import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next';

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

// eslint-disable-next-line import/no-anonymous-default-export
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
    await runMiddleware(req, res, cors);
      try {
        const { text } = req.body;
        console.log(text);
        const requestUrl = `https://api.twitter.com/2/tweets`;

        const token = process.env.NEXT_PUBLIC_TWITTER_ACCESS_TOKEN;


        const response = await fetch(requestUrl, {
          method: "POST",
          body: text,
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "v2CreateTweetJS",
            "Accept": "application/json",
            "Authorization": `${token}`,
            },
          });

          console.log(response);

        res.json({
          status: "success",
          data: await response.json(),
        });

        } catch (err) {
          console.error(`Tweets error: ${err}`);
          res.status(401).json({
          message: "error",
          error: `Tweets error: ${err}`,
        });
          return;
        }

 }