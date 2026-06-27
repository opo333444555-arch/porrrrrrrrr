import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

async function fix() {
  const sql = neon(process.env.DATABASE_URL);
  try {
    console.log("Checking DB...");
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255)`;
    console.log("Fixed! Password column added.");
  } catch (err) {
    console.error(err);
  }
}
fix();
