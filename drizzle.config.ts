import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
import path from "path";
import { parse } from "pg-connection-string";

// 🧠 Always load production env for Drizzle
const envFile = path.resolve(process.cwd(), ".env.development");
dotenv.config({ path: envFile });
console.log(`✅ Loaded environment file for Drizzle: ${envFile}`);

// ✅ Ensure DATABASE_URL is available
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("❌ DATABASE_URL not found in .env.development");
}

// Parse safely
const parsed = parse(databaseUrl);

export default defineConfig({
  out: "./drizzle",
  schema: "./src/models/**/*.schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: parsed.host || "localhost",
    port: parsed.port ? Number(parsed.port) : 5432,
    user: parsed.user || "postgres",
    password: parsed.password || "",
    database: parsed.database || "Snagging_Tool",
    ssl:
      process.env.SSL_ENABLED === "true"
        ? { rejectUnauthorized: false }
        : false,
  },
});
