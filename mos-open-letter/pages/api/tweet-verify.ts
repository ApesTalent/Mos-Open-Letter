import clientPromise from '../../lib/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

const connectToDatabase = async () => {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  return db
}

const verifyTweet = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query['query']
  const response = await fetch(
    `https://api.twitter.com/2/tweets/search/recent?query=1621510577737842688`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    }
  )

  response.json().then(async (r) => {
    let isVerified = false
    if (r.data) {
      r.data.forEach((tweet) => {
        if (
          tweet.text &&
          query &&
          tweet.text
            .toLowerCase()
            .includes(query.toLocaleString().substring(0, 50))
        ) {
          isVerified = true
        }
      })
    }

    if (isVerified) {
      const db = await connectToDatabase()
      await db.collection('signers').updateOne(
        { signature: query },
        {
          $set: {
            twitted: true,
          },
        }
      )
    }
    res.status(200).json({ isVerified })
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return verifyTweet(req, res)
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
