import Joi from "joi";
import { generalRoles } from "../../utils/index.utils";

const sigUpSchema = {
  body: Joi.object({
    username: generalRoles.username.required(),
    password: generalRoles.password.required(),
    repeatPassword: generalRoles.repeatPassword.required(),
    role: generalRoles.userRole,
  }),
};

const loginSchema = {
  body: Joi.object({
    username: generalRoles.username.required(),
    password: generalRoles.password.required(),
  }),
};
export { sigUpSchema, loginSchema };
