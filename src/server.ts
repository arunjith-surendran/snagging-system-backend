import http from "http";
import app from "./app";
import config from "./config/config";

const server = http.createServer(app);

const startServer = () => {
  server.listen(config.port, () => {
    console.log(`🚀 Server is running on port ${config.port}`);
  });
};

export default startServer;
