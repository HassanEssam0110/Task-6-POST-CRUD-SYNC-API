import { Router } from "express";
import * as controller from "./auth.controller";
import * as middleware from "../../middlewares/index.middlewares";
import * as schema from "./auth.schema";

const authRotuer: Router = Router();

authRotuer.post("/signup",middleware.validator(schema.sigUpSchema), controller.signUp);
authRotuer.post("/login",middleware.validator(schema.loginSchema),  controller.login);
authRotuer.get("/me", middleware.protect, controller.getMe);
export default authRotuer;
