import { neon } from '@neondatabase/serverless';

// Singleton connection to Neon DB
// Usage: const sql = getDb(); await sql`SELECT * FROM users`;
export const getDb = () => {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL is not set');
  }
  return neon(dbUrl);
};

export default async function handler(req, res) {
  res.status(200).json({ message: "DB connection helper ready" });
}
