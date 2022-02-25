import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  accessToken: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    console.log('ccc')
    setTimeout(() => {
      const accessToken = '2eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiY2VmNzcyZDItMWJiYi00OTExLTkzY2EtMzIwZGI5NmE1N2JjIiwiZmlyc3ROc21lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.mO5KPyFrtOE8dnFW9EdkUfe4fdIh6oqopeG9Np8AKgk'

      res.status(200);
  
      res.json({ accessToken })
    }, 2000)
  }
}
