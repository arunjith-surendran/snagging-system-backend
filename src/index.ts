import app from "./app";
import routes from "./routes/routes";
import connection from "./db_connection/postgres/connection";
import errorMiddleware from "./middlewares/web_server/error-middleware";
import startServer from "./server";

// Setup API routes
routes(app);

// Connect to PostgreSQL
connection().connectToPostgres();

// Error middleware
app.use(errorMiddleware);

// Start schedule

// Start the server
startServer();
