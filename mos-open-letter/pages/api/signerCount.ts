/* eslint-disable no-console */
import clientPromise from '../../lib/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

const connectToDatabase = async () => {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  return db
}

const getSigners = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase()

  // const count = await (await db.collection('signers').distinct("address")).length;

  const count = await db.collection('signers').count()

  res.status(200).json(count)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return await getSigners(req, res)
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
}
