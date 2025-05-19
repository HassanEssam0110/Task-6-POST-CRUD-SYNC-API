process.on("uncaughtException", (error: Error) => {
  const timestamp = new Date().toISOString();
  console.error(`
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Uncaught Exception! 
  Timestamp: ${timestamp}
  Process ID: ${process.pid}
  Error Name: ${error.name}
  Error Message: ${error.message}
  Stack Trace: ${error.stack}
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Shutting down application due to an unhandled exception...
      `);
  process.exit(1);
});

import app from "./src/app";
import config from "./src/config/config";
import connectDB from "./database/db-connect";

const { PORT, MONGO_DB_URI, NODE_ENV } = config;

/* Connect to the database */
connectDB(MONGO_DB_URI);

/* Start the server */
const server = app.listen(PORT, () => {
  console.log(`
=========================================
Server Started Successfully
Environment: ${NODE_ENV}
Server is running on port:${PORT}
=========================================
        `);
});

process.on("unhandledRejection", (err) => {
  const timestamp = new Date().toISOString();

  if (err instanceof Error) {
    console.error(`
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [Unhandled Rejection]
  Timestamp   : ${timestamp}
  Environment : ${NODE_ENV}
  Process ID  : ${process.pid}
  Error Name  : ${err.name}
  Error Message: ${err.message}
  Stack Trace :
  ${err.stack}
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
  } else {
    console.error(`
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [Unhandled Rejection]
  Timestamp   : ${timestamp}
  Environment : ${NODE_ENV}
  Process ID  : ${process.pid}
  Unexpected error: ${err}
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      `);
  }
  server.close(() => {
    console.error(
      `Server shutting down gracefully due to unhandled rejection...`
    );
    process.exit(1);
  });
});
