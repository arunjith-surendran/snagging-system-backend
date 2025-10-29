import dotenv from 'dotenv';

dotenv.config();

const config = {
  // Server Configuration
  port: process.env.PORT || 4000,

  // PostgreSQL Configuration
  postgres: {
    host: process.env.PGHOST || 'localhost',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'admin123',
    database: process.env.PGDATABASE || 'snagging_system',
    port: Number(process.env.PGPORT) || 5432,
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'defaultsecretkey',
    accessExpirationMinutes: Number(process.env.JWT_ACCESS_EXPIRATION_MINUTES) || 30,
    refreshExpirationDays: Number(process.env.JWT_REFRESH_EXPIRATION_DAYS) || 7,
  },

  tokenTypes: {
    ACCESS: 'access',
    REFRESH: 'refresh',
  },
};

export default config;
