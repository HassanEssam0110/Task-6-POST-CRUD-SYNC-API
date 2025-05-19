import { Router } from "express";
import * as middleware from "../../middlewares/index.middlewares";
import * as controller from "./post.controller";
import * as schema from "./post.schema";

import { ROLES } from "../../utils/index.utils";

const { Admin, Reviewer } = ROLES;

const postRouter: Router = Router();
postRouter.get(
  "/all",
  middleware.protect,
  middleware.allowTo([Admin, Reviewer]),
  controller.getAllPosts
);

postRouter
  .route("/")
  .get(controller.getPosts)
  .post(
    middleware.protect,
    middleware.allowTo([Admin]),
    middleware.validator(schema.createPostSchema),
    controller.createPosts
  );

postRouter
  .route("/:id")
  .get(middleware.validator(schema.getPostSchema), controller.getPost)
  .put(
    middleware.protect,
    middleware.allowTo([Admin]),
    middleware.validator(schema.updatePostSchema),
    controller.updatePosts
  )
  .delete(
    middleware.protect,
    middleware.allowTo([Admin]),
    middleware.validator(schema.deletePostSchema),
    controller.deletePosts
  );

postRouter.post(
  "/:id/approve",
  middleware.protect,
  middleware.allowTo([Reviewer]),
  controller.approvePost
);

export default postRouter;
