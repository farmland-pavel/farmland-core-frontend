import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    setTimeout(() => {
      res.status(200).json({})
    }, 2000)
  }

  if (req.method === 'GET') {
    setTimeout(() => {
      res.status(403).json({})
    }, 2000)
  }
}
