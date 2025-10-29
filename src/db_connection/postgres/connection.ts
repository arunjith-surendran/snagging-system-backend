import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import config from '../../config/config';

// Create a PostgreSQL connection pool
const pool = new Pool({
  host: config.postgres.host,
  user: config.postgres.user,
  password: config.postgres.password,
  database: config.postgres.database,
  port: config.postgres.port,
});

// Create Drizzle ORM instance
const db = drizzle(pool);

export default function connection() {
  async function connectToPostgres() {
    try {
      const client = await pool.connect();
      console.info('✅ Connected to PostgreSQL!');
      client.release();
    } catch (err) {
      console.error('❌ PostgreSQL connection error:', err);
      setTimeout(connectToPostgres, 5000); // retry every 5s
    }
  }

  pool.on('error', (err: any) => {
    console.error('⚠️ Unexpected PostgreSQL error:', err);
  });

  return {
    connectToPostgres,
    pool,
    db, 
  };
}

export { pool, db };
