import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'js-cookie';

type Data = {
  accessToken: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiY2VmNzcyZDItMWJiYi00OTExLTkzY2EtMzIwZGI5NmE1N2JjIiwiZmlyc3ROc21lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.mO5KPyFrtOE8dnFW9EdkUfe4fdIh6oqopeG9Np8AKgk'
    const refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoiY2VmNzcyZDItMWJiYi00OTExLTkzY2EtMzIwZGI5NmE1N2JjIiwiaWF0IjoxNTE2MjM5MDIyfQ.2TjMLJlvtyX-9hejo5K8H0xPVnRBx3hhDhcxY7MJiuk';

    res.setHeader("Set-Cookie", cookie.set(
      'x-refresh-token',
      refreshToken,
      {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60,
        sameSite: 'strict',
        path: '/',
        expires: new Date(0)
      }
    ) ?? '');

    res.setHeader("Set-Cookie", cookie.set(
      'x-auth-refresh-token',
      'jwt',
      {
        maxAge: 60 * 60,
        sameSite: 'strict',
        path: '/',
        expires: new Date(0)
      }
    ) ?? '');

    res.status(200);

    return res.json({ accessToken })
  }
}
