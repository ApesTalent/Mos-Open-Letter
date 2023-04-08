/* eslint-disable no-console */
import clientPromise from '../../lib/mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import Axios from 'axios'
import signMessages from '../../lib/signMessage'
import { hashMessage } from '@ethersproject/hash'
import { ethers } from 'ethers'

const connectToDatabase = async () => {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  return db
}

const addGalxe = async (address) => {
  const items = [address]
  const axiosRes = await Axios.post(
    'https://graphigo.prd.galaxy.eco/query',
    {
      operationName: 'credentialItems',
      query: `
      mutation credentialItems($credId: ID!, $operation: Operation!, $items: [String!]!) 
        { 
          credentialItems(input: { 
            credId: $credId 
            operation: $operation 
            items: $items 
          }) 
          { 
            name 
          } 
        }
      `,
      variables: {
        // Make sure this is string type as int might cause overflow
        credId: process.env.OAT_CREDID,
        operation: 'APPEND',
        items: items,
      },
    },
    {
      headers: {
        'access-token': process.env.OAT_ACCESS_TOKEN,
      },
    }
  )

  return axiosRes.data
}

const checkSignature = async (address, sign) => {
  const verifySigner = await ethers.utils.recoverAddress(
    hashMessage(signMessages),
    sign
  )
  if (address === verifySigner) return true
  else return false
}

const addSigner = async (req: NextApiRequest, res: NextApiResponse) => {
  if (
    req.headers.from == 'interface' &&
    req.body.address &&
    req.body.signature &&
    (await checkSignature(req.body.address, req.body.signature))
  ) {
    const db = await connectToDatabase()
    const isExist = await db
      .collection('signers')
      .find({ address: req.body.address })
      .count()
    if (isExist > 0) {
      await db.collection('signers').updateOne(
        { address: req.body.address },
        {
          $set: {
            signature: req.body.signature,
            ens: req.body.ens,
          },
        }
      )
    } else {
      await db.collection('signers').insertOne({
        address: req.body.address,
        signature: req.body.signature,
        ens: req.body.ens,
        pinned: false,
        createdAt: new Date(),
      })
    }

    addGalxe(req.body.address)

    res.status(201).json(true)
  }
}

const getSigner = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase()
  const signer = await db
    .collection('signers')
    .find({ address: req.query['address'] })
    .toArray()
  if (signer.length > 0) {
    const counts = await db
      .collection('signers')
      .find({ _id: { $gte: signer[0]._id } })
      .count()

    if (!counts) {
      signer[0].index = 1
    } else {
      signer[0].index = counts + 1
    }

    res.status(200).json(signer[0])
  } else res.status(201).json(false)
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return addSigner(req, res)
    case 'GET':
      return getSigner(req, res)
    default:
      res.setHeader('Allow', ['POST', 'GET'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
}
