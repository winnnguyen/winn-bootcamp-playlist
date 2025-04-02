import { NextApiRequest, NextApiResponse } from 'next';
import { playlist } from '../../data/example_data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        res.status(200).json({ playlists: playlist });
    } else {
        // Future: support POST, PUT, DELETE,
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
