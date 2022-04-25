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
    const { method } = req;

    switch (method) {
        case "GET":
            try {
              const requestUrl = `https://api.twitter.com/2/users/1386730528737529861/tweets?&expansions=attachments.media_keys&media.fields=media_key,type,url&tweet.fields=created_at`;

              const token = 'AAAAAAAAAAAAAAAAAAAAAMmHDwEAAAAAneRsukx4oiUf%2BIBspcBYs%2BYXPVk%3DzB6Ge4u2yuSxWIO0LiELyG9l5inPmBJFLh2waWxlEjqzr7L4vf';

              const response = await fetch(requestUrl, {
                method: "GET",
                headers: {
                  "User-Agent": "v2TweetLookupJS",
                  "authorization": `Bearer ${token}`,
                },
              });

              res.json({
                status: "success",
                data: await response.json(),
              })

            } catch (err) {
                console.error(`Tweets error: ${err}`);
                res.status(401).json({
                message: "error",
                error: `Tweets error: ${err}`,
                });
            }

            default:
            // res.setHeader("Allow", ["GET"]);
            res.status(405).json(`Method ${method} Not Allowed`);
    }
 }
