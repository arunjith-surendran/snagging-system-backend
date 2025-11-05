import dotenv from "dotenv";

// Load .env file before anything else
dotenv.config();

interface PostgresConfig {
  host: string;
  user: string;
  password: string;
  database: string;
  port: number;
}

interface JwtConfig {
  secret: string;
  accessExpirationMinutes: number;
  refreshExpirationDays: number;
}

interface AppConfig {
  port: number;
  postgres: PostgresConfig;
  jwt: JwtConfig;
  tokenTypes: {
    ACCESS: string;
    REFRESH: string;
  };
}

const config: AppConfig = {
  // 🌐 Server Configuration
  port: Number(process.env.PORT) || 5000,

  // 🐘 PostgreSQL Configuration
  postgres: {
    host: process.env.PGHOST || "localhost",
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "admin123",
    database: process.env.PGDATABASE || "Snagging_Tool",
    port: Number(process.env.PGPORT) || 5432,
  },

  // 🔐 JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || "defaultsecretkey", // ⚠️ always override in production
    accessExpirationMinutes:
      Number(process.env.JWT_ACCESS_EXPIRATION_MINUTES) || 7, // minutes
    refreshExpirationDays:
      Number(process.env.JWT_REFRESH_EXPIRATION_DAYS) || 7, // days
  },

  // 🪙 Token Types
  tokenTypes: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};

export default config;
