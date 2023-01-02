import { NextApiRequest, NextApiResponse } from 'next';

const {
  SECRET_TOKEN = 'token'
} = process.env;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== SECRET_TOKEN) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  try {
    await res.revalidate('/');
    res.status(200).json({ revalidated: true });
  } catch (err) {
    res.status(500).send('Error revalidating');
  }
}

