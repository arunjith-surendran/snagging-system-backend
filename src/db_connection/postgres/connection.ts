import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import config from "../../config/config";

const pool = new Pool({
  connectionString: config.databaseUrl,
  ...(config.sslEnabled
    ? { ssl: { rejectUnauthorized: false } } // for Neon, RDS, etc.
    : {}), // disable SSL for local
});

const db = drizzle(pool);

export default function connection() {
  async function connectToPostgres() {
    try {
      const client = await pool.connect();
      console.info(
        `✅ Connected to PostgreSQL! (SSL: ${config.sslEnabled ? "ON" : "OFF"})`
      );
      client.release();
    } catch (err) {
      console.error("❌ PostgreSQL connection error:", err);
      setTimeout(connectToPostgres, 5000);
    }
  }

  pool.on("error", (err) => {
    console.error("⚠️ Unexpected PostgreSQL error:", err);
  });

  return {
    connectToPostgres,
    pool,
    db,
  };
}

export { pool, db };
