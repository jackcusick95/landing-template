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
     const { isWassie } = req.body;
     console.log(isWassie);

    switch (method) {
        case "GET":
            try {
              const requestUrl = `https://api.twitter.com/2/users/1386730528737529861/tweets?&expansions=attachments.media_keys&media.fields=media_key,type,url&tweet.fields=created_at`;

              const token = 'AAAAAAAAAAAAAAAAAAAAAEfQbgEAAAAAk6PDlVaJ%2FroOXdnauDU3kUWBUa0%3DANyIPUmnJeZmc20qkd8o481TQkyCqP8xprAMbl9WGJXem6jfa6';

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
            res.status(405).json(`Method ${method} Not Allowed`);
    }
 }
