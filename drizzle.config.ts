import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/models/**/*.schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "admin123",
    database: process.env.PGDATABASE || "Snagging_Tool",

    // 🚨 Add this line to disable SSL
    ssl: false,
  },
});
