import Joi from "joi";
import { generalRoles } from "../../utils/index.utils";

const createRoleSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(50).required(),
  }),
};

const getRoleSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
};

const updateRoleSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),

  body: Joi.object({
    name: generalRoles.roleName.required(),
  }),
};

const deleteRoleSchema = {
  params: Joi.object({
    id: generalRoles.id.required(),
  }),
};

export { createRoleSchema, updateRoleSchema, getRoleSchema, deleteRoleSchema };
