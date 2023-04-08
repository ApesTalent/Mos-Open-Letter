/* eslint-disable no-console */
import clientPromise from '../../lib/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

const connectToDatabase = async () => {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  return db
}

interface SignProps {
  ens: string
  createdAt: string
}

const getSigners = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase()

  const signers = await db
    .collection('signers')
    .find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .toArray()

  const uniques = Object.values(
    signers.reduce((a, c) => {
      a[c.address] = c
      return a
    }, {})
  )

  uniques.sort(
    (a: SignProps, b: SignProps) =>
      -(new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  )

  uniques.sort((a: SignProps, b: SignProps) => {
    if (a.ens != null) return -1
    else if (b.ens != null) return 1
    else return 1
  })

  res.status(200).json(signers)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return getSigners(req, res)
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
