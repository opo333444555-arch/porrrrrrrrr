import { getDb } from './db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { action, username, password, displayName } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const sql = getDb();
    
    if (action === 'register') {
      // Check if user exists
      const existing = await sql`SELECT id FROM users WHERE username = ${username}`;
      if (existing.length > 0) {
        return res.status(400).json({ error: 'Username already exists' });
      }

      // Insert new user
      const result = await sql`
        INSERT INTO users (username, password, display_name) 
        VALUES (${username}, ${password}, ${displayName || username})
        RETURNING id, username, display_name
      `;
      
      const user = result[0];
      
      // Initialize empty user_data
      await sql`INSERT INTO user_data (user_id, data_json) VALUES (${user.id}, '{}'::jsonb)`;

      return res.status(200).json({ 
        success: true, 
        user: { id: user.id, username: user.username, displayName: user.display_name } 
      });
      
    } else if (action === 'login') {
      const users = await sql`SELECT id, username, display_name FROM users WHERE username = ${username} AND password = ${password}`;
      
      if (users.length > 0) {
        const user = users[0];
        return res.status(200).json({ 
          success: true, 
          user: { id: user.id, username: user.username, displayName: user.display_name } 
        });
      } else {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    }
    
    res.status(400).json({ error: 'Invalid action' });
  } catch (err) {
    console.error('Auth API Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
