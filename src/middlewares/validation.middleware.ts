import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error.utils";
import { Schema } from "joi";

const keys: (keyof Request)[] = ["body", "query", "params", "headers"];

const validator = (schema: Partial<Record<keyof Request, Schema>>) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const errors: { label: string; message: string }[] = [];

    for (const key of keys) {
      if (schema[key]) {
        const { error } = schema[key]!.validate(req[key], {
          abortEarly: false,
        });
        if (error) {
          errors.push(
            ...error.details.map((err) => ({
              label:
                typeof err.context?.label === "string"
                  ? err.context.label
                  : String(key),
              message: err.message,
            }))
          );
        }
      }
    }

    return errors.length
      ? next(new AppError(422, "Validation Error", errors))
      : next();
  };
};

export { validator };
