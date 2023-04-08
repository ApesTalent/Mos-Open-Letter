/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
import clientPromise from '../../lib/mongodb'
import sgMail from '@sendgrid/mail'
import client from '@sendgrid/client'
import Axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const connectToDatabase = async () => {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  return db
}

const API_KEY = process.env.SENDGRID_API_KEY

sgMail.setApiKey(API_KEY)

client.setApiKey(API_KEY)

const addToSuppressions = async (emailTo) => {
  const group_id = '16861'
  const headers = {
    'Content-Type': 'application/json',
  }

  const data = {
    recipient_emails: [emailTo],
  }

  client
    .request({
      url: `/v3/asm/groups/${group_id}/suppressions`,
      method: 'POST',
      headers: headers,
      body: data,
    })
    .then(([response]) => {
      console.log(response.statusCode)
      console.log(response.body)
    })
    .catch((error) => {
      console.error(error)
    })
}

const addToContacts = async (emailTo) => {
  const config = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  }

  const bodyParameters = {
    list_ids: ['cd852a3a-54f1-4526-8f67-dff9746c024d'],
    contacts: [{ email: emailTo }],
  }

  try {
    const axiosRes = await Axios.put(
      'https://api.sendgrid.com/v3/marketing/contacts',
      bodyParameters,
      config
    )
    console.log(axiosRes.status)
  } catch (err) {
    console.log(err)
  }
}

const sendMail = async (emailTo) => {
  const msg = {
    from: {
      email: 'mail@momentsofspace.com',
      name: 'Moments of Space',
    },
    to: emailTo,
    dynamic_template_data: {
      subject: 'Thank you for submitting a proposal',
      recipient_name: emailTo,
    },
    template_id: 'd-03ffb929607c478ca029d09c86d95e95',
    html: 'Thank you',
  }

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode)
    })
    .catch((error) => {
      console.error(error)
    })
}

const addEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.from == 'interface') {
    const db = await connectToDatabase()
    const isExist = await db
      .collection('proposals')
      .find({ address: req.body.address })
      .count()
    if (isExist) {
      console.log('Email address already exists')
    }
    if (req.body.alarm) {
      addToContacts(req.body.address)
    } else {
      addToSuppressions(req.body.address)
    }

    sendMail(req.body.address)
    await db.collection('proposals').insertOne({
      address: req.body.address,
      proposal: req.body.proposal,
      alarm: req.body.alarm,
      path: req.body.path,
      createdAt: new Date(),
    })

    res.status(201).json(true)
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      return addEmail(req, res)
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
}
