/* eslint-disable no-console */
import clientPromise from '../../lib/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

interface SignProps {
  ens: string
  createdAt: string
}

const connectToDatabase = async () => {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  return db
}

const deleteDuplicated = async () => {
  const db = await connectToDatabase()
  const duplicates = []
  await db
    .collection('signers')
    .aggregate(
      [
        {
          $match: {
            address: { $ne: '' }, // discard selection criteria
          },
        },
        {
          $group: {
            _id: { address: '$address' }, // can be grouped on multiple properties
            dups: { $addToSet: '$_id' },
            count: { $sum: 1 },
          },
        },
        {
          $match: {
            count: { $gt: 1 }, // Duplicates considered as count greater than one
          },
        },
      ],
      { allowDiskUse: true } // For faster processing if set is larger
    ) // You can display result until this and check duplicates
    .forEach(function (doc) {
      doc.dups.shift() // First element skipped for deleting
      doc.dups.forEach(function (dupId) {
        duplicates.push(dupId) // Getting all duplicate ids
      })
    })

  // If you want to Check all "_id" which you are deleting else print statement not needed
  // Remove all duplicates in one go
  await db.collection('signers').deleteMany({ _id: { $in: duplicates } })
}

const getSigners = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase()
  const isDuplicated = false
  if (isDuplicated) await deleteDuplicated()

  const pageNumber = Number(req.query['pageNumber'])
  const nPerPage = Number(req.query['pageSize'])

  const signers = await db
    .collection('signers')
    .find({})
    .sort({ createdAt: -1 })
    .skip(pageNumber > 0 ? pageNumber * nPerPage : 0)
    .limit(nPerPage)
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
