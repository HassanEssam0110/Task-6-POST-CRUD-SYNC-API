import express from "express";
import morgan from "morgan";
import config from "./config/config";
import bootstrap from "./modules/bootstrap.modules";

const app = express();

// middlewares
app.use(express.json({ limit: "10kb" }));
if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
bootstrap(app);

export default app;
