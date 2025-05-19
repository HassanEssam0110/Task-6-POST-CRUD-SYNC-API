import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "./index.middlewares";
import { AppError, verifyToken } from "../utils/index.utils";
import { User } from "../../database/models/index.models";

const validateToken = (token: string) => {
  try {
    const decoded = verifyToken(token);
    return { isValid: true, decoded };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return {
        isValid: false,
        decoded: null,
        message: "Token expired.",
      };
    }
    return {
      isValid: false,
      decoded: null,
      message: "Invalid token.",
    };
  }
};

/* ==> Middleware */

export const protect = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new AppError(401, "Unauthorized: No token found."));
    }

    // Validate token
    const { decoded, isValid, message } = validateToken(token);
    if (!isValid || !decoded) {
      return next(new AppError(401, `Unauthorized: ${message}`));
    }

    // Check if user exists
    const { id } = decoded as JwtPayload;
    const user = await User.findById(id).populate("role");
    if (!user) {
      return next(new AppError(401, "Unauthorized: User not found."));
    }

    // Attach user to request
    req.user = user;
    next();
  }
);

export const allowTo = (Roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user || !Roles.includes(req.user.role)) {
      return next(new AppError(403, "Access Denied: No role assigned"));
    }
    next();
  };
};
