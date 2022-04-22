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
            //    API CALL LOGIC HERE?
            } catch (err) {
                console.error(`Tweets error: ${err}`);
                res.status(401).json({
                message: "error",
                error: `Tweets error: ${err}`,
                });
                return;
            }

            default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);

    }
 }
