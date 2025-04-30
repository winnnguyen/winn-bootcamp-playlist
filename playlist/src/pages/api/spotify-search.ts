import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  if (typeof q !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid query parameter' });
  }

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID!;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${authString}`,
      },
      body: 'grant_type=client_credentials',
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const searchResponse = await fetch(
      `https://api.spotify.com/v1/search?type=track&limit=5&q=${encodeURIComponent(q)}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    const searchResults = await searchResponse.json();
    console.log('Client ID:', process.env.SPOTIFY_CLIENT_ID);
    console.log('Client Secret:', process.env.SPOTIFY_CLIENT_SECRET);
    return res.status(200).json(searchResults);
  } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch from Spotify' });
  }
}
