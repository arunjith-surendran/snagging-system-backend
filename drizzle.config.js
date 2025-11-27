"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const pg_connection_string_1 = require("pg-connection-string");
const envFile = path_1.default.resolve(process.cwd(), ".env.production");
dotenv_1.default.config({ path: envFile });
console.log(`✅ Loaded environment file for Drizzle: ${envFile}`);
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("❌ DATABASE_URL not found in .env.production");
}
const parsed = (0, pg_connection_string_1.parse)(databaseUrl);
exports.default = (0, drizzle_kit_1.defineConfig)({
    out: "./drizzle",
    schema: "./src/models/**/*.schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        host: parsed.host || "localhost",
        port: parsed.port ? Number(parsed.port) : 5432,
        user: parsed.user || "postgres",
        password: parsed.password || "",
        database: parsed.database || "Snagging_Tool",
        ssl: process.env.SSL_ENABLED === "true"
            ? { rejectUnauthorized: false }
            : false,
    },
});
//# sourceMappingURL=drizzle.config.js.map