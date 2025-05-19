import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.utils";
import config from "../config/config";

const isProd: boolean = config.NODE_ENV === "production";

// ?====> Functions <====
const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.httpCode).json({
    status: err.status,
    statusCode: err.httpCode,
    message: err.message,
    errors: err.errors,
    isOperational: err.isOperational,
    stack: err.stack, // Show stack only in dev mode
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.httpCode).json({
      status: err.status,
      statusCode: err.httpCode,
      message: err.message,
      errors: err.errors || undefined,
    });
  } else {
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Something went wrong",
    });
  }
};

// ?====> Middlewares <====

/**
 * Middleware to handle requests for routes that are not found.
 *
 * This middleware function creates a new AppError with a 404 status code
 * and a message indicating that the requested route does not exist.
 * It then passes this error to the next middleware in the stack.
 *
 * @param {Request} _req - Express request object (unused).
 * @param {Response} _res - Express response object (unused).
 * @param {NextFunction} next - Express next middleware function.
 */

const notFoundMW = (_req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(404, "Oops! The route you're looking for doesn't exist."));
};

/**
 * Global Error Handling Middleware
 *
 * This middleware function handles any errors thrown in the application.
 * It sets a default HTTP status code and status if not provided by the error,
 * and sends an appropriate error response based on the environment.
 *
 * In production mode, it sends a generic error message for non-operational
 * errors, while in development mode, it includes the error stack for debugging.
 *
 * @param {AppError} err - The error object containing details about the error.
 * @param {Request} _req - Express request object (unused).
 * @param {Response} res - Express response object.
 * @param {NextFunction} _next - Express next middleware function (unused).
 */

const globalErrorMW = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // SET DEFAULTS
  err.httpCode = err.httpCode || 500;
  err.status = err.status || "error";
  if (!err.errors?.length) err.errors = undefined;

  // SEND RESPONSE
  if (isProd) sendErrorProd(err, res);
  else sendErrorDev(err, res);
};

export { notFoundMW, globalErrorMW };
