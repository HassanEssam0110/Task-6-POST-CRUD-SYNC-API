import Joi from "joi";
import { generalRoles } from "../../utils/index.utils";

const createPostSchema = {
  body: Joi.object({
    title: generalRoles.postTitle.required(),
    body: generalRoles.postBody.required(),
  }),
};

const updatePostSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
  body: Joi.object({
    title: generalRoles.postTitle.optional(),
    body: generalRoles.postBody.optional(),
  }),
};

const deletePostSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
};

const getPostSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
};

export { createPostSchema, updatePostSchema, deletePostSchema, getPostSchema };
