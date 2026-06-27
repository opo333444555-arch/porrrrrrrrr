import { getDb } from './db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { action, username, password, displayName } = req.body;
    
    // In a real app, this would use a real database with `getDb()`
    // const sql = getDb();
    
    if (action === 'register') {
      // await sql`INSERT INTO users (username, password, display_name) VALUES (${username}, ${password}, ${displayName})`;
      return res.status(200).json({ 
        success: true, 
        user: { username, displayName: displayName || username } 
      });
    } else if (action === 'login') {
      // const users = await sql`SELECT * FROM users WHERE username = ${username} AND password = ${password}`;
      // if (users.length > 0) ...
      return res.status(200).json({ 
        success: true, 
        user: { username, displayName: username } 
      });
    }
    
    res.status(400).json({ error: 'Invalid action' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
