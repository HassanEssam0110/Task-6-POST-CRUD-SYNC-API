import { Application, NextFunction, Request, Response } from "express";
import { globalErrorMW, notFoundMW } from "../middlewares/index.middlewares";
import config from "../config/config";

import postRouter from "./post/post.routes";
import authRotuer from "./auth/auth.routes";
import roleRouter from "./Role/role.routes";



const home = (_req: Request, res: Response, _next: NextFunction) => {
  res.send(` <h1 style="color: white; text-align: center; font-family: Arial, sans-serif; margin-top: 20%; background: linear-gradient(to right, #6a11cb, #2575fc); padding: 20px; border-radius: 10px;">
        🚀 Server is up and running Port: ${config.PORT} 🎉 </h1>`);
};

/**
 * @description Bootstraps the application with all the routes, middleware, and error handling functions.
 * @param {Application} app - The express application instance.
 * @returns {void} - Returns nothing, just sets up the application.
 */
const bootstrap = (app: Application) => {
  app.get("/", home);

  // routes
  app.use("/api/v1/posts", postRouter);
  app.use("/api/v1/auth", authRotuer);
  app.use("/api/v1/roles", roleRouter);

  // error middlewares
  app.use("/*splat", notFoundMW);
  app.use(globalErrorMW);
};

export default bootstrap;
