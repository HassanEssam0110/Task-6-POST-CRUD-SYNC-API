import { Router } from "express";
import * as controller from "./role.controller";
import * as middleware from "../../middlewares/index.middlewares";
import { ROLES } from "../../utils/index.utils";

const { Admin } = ROLES;

const roleRouter: Router = Router();

roleRouter.use(middleware.protect, middleware.allowTo([Admin]));

roleRouter.route("/").get(controller.getRoles).post(controller.createRole);

roleRouter
  .route("/:id")
  .get(controller.getRole)
  .put(controller.updateRole)
  .delete(controller.deleteRole);

export default roleRouter;
