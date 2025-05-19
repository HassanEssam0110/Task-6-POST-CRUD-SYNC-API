import Joi, { CustomHelpers } from "joi";
import { Types } from "mongoose";
import { ROLES } from "./roles-system.utils";

const validId = (val: string, helpers: CustomHelpers): unknown => {
  if (Types.ObjectId.isValid(val)) return val;
  return helpers.error("any.invalid");
};

const generalRoles = {
  // ?===> id validation
  id: Joi.string().custom(validId).trim().messages({
    "string.base": "ID must be a string.",
    "string.empty": "ID cannot be empty.",
    "any.invalid": "Invalid ID format.",
  }),

  // ?====> System Roles
  roleName: Joi.string().min(3).max(75).trim().messages({
    "string.base": "Role name must be a string.",
    "string.empty": "Role name is required.",
    "string.min": "Role name must be at least 3 characters long.",
    "string.max": "Role name must not exceed 75 characters.",
    "any.required": "Role name is required.",
  }),

  // ?====> user
  username: Joi.string().min(5).max(55).trim().messages({
    "string.base": "Username must be a string.",
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 5 characters long.",
    "string.max": "Username must not exceed 55 characters.",
    "any.required": "Username is required.",
  }),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .trim()
    .messages({
      "string.base": "Password must be a string.",
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
      "string.pattern.base":
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.",
    }),
  repeatPassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "Password and confirm password must match.",
    "any.required": "Confirm password is required.",
  }),

  userRole: Joi.string()
    .valid(...Object.values(ROLES))
    .messages({
      "any.required": "User role is required.",
      "any.only": `User role must be one of: ${Object.values(ROLES).join(
        ", "
      )}.`,
      "string.base": "User role must be a string.",
    }),

  // ?====> post
  postTitle: Joi.string().min(3).max(100).trim().messages({
    "string.base": "Title must be a text.",
    "string.empty": "Title is required.",
    "string.min": "Title must be at least 3 character long.",
    "string.max": "Title must not exceed 100 characters.",
    "any.required": "Title is required.",
  }),
  postBody: Joi.string().min(3).max(200).trim().messages({
    "string.base": "Body must be a text.",
    "string.empty": "Body is required.",
    "string.min": "Body must be at least 3 character long.",
    "string.max": "Body must not exceed 200 characters.",
    "any.required": "Body is required.",
  }),
};

export { generalRoles };
