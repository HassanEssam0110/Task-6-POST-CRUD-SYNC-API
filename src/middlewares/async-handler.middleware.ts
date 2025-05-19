import { NextFunction, Request, Response } from "express";

/**
 * A middleware to wrap async functions to handle errors.
 *
 * This function takes an asynchronous function and returns a new function
 * that wraps the original function and catches any rejected promises,
 * passing any errors to the next middleware in the stack.
 *
 * @param {Function} fn - The asynchronous function to wrap.
 * @returns {Function} A new function that executes the async function
 * and handles any errors.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);
};
