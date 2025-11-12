import dotenv from "dotenv";
import path from "path";

// 🔒 Always load production env for deployment
const envFile = path.resolve(process.cwd(), ".env.production");

dotenv.config({ path: envFile });

console.log(`✅ Loaded environment file: ${envFile}`);
interface AppConfig {
  port: number;
  databaseUrl: string;
  sslEnabled: boolean;
  jwt: {
    secret: string;
    accessExpirationMinutes: number;
    refreshExpirationDays: number;
  };
}

const config: AppConfig = {
  port: Number(process.env.PORT) || 5000,
  databaseUrl: process.env.DATABASE_URL || "",
  sslEnabled:
    String(process.env.SSL_ENABLED).trim().toLowerCase() === "true",
  jwt: {
    secret: process.env.JWT_SECRET || "defaultsecretkey",
    accessExpirationMinutes:
      Number(process.env.JWT_ACCESS_EXPIRATION_MINUTES) || 70,
    refreshExpirationDays:
      Number(process.env.JWT_REFRESH_EXPIRATION_DAYS) || 70,
  },
};

export default config;
