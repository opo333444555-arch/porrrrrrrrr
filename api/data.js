import { getDb } from './db.js';

export default async function handler(req, res) {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized: Missing User ID' });
  }

  try {
    const sql = getDb();

    if (req.method === 'GET') {
      // Load user data
      const result = await sql`SELECT data_json FROM user_data WHERE user_id = ${userId}`;
      if (result.length > 0) {
        return res.status(200).json({ success: true, data: result[0].data_json });
      } else {
        return res.status(200).json({ success: true, data: {} });
      }
      
    } else if (req.method === 'POST') {
      // Save user data
      const { data } = req.body;
      
      if (!data) {
        return res.status(400).json({ error: 'Missing data payload' });
      }

      await sql`
        INSERT INTO user_data (user_id, data_json) 
        VALUES (${userId}, ${data}::jsonb)
        ON CONFLICT (user_id) DO UPDATE 
        SET data_json = EXCLUDED.data_json, updated_at = CURRENT_TIMESTAMP
      `;
      
      return res.status(200).json({ success: true });
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (err) {
    console.error('Data API Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
