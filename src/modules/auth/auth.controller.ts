import { Request, Response, NextFunction } from "express";
import { IUser, User } from "../../../database/models/index.models";
import { asyncHandler } from "../../middlewares/index.middlewares";
import { AppError, compareHash, createToken } from "../../utils/index.utils";

/* ===> Functions  <=== */
const sendResponseWithToken = (
  res: Response,
  httpCode: number,
  msg: string,
  user: IUser
): Response => {
  const token = createToken({ id: user._id });
  return res.status(httpCode).json({ message: msg, token });
};

/* ===> Controllers  <=== */
const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, role } = req.body;
    // Check if user already exists
    const user = await User.findOne({ username });
    if (user) {
      return next(new AppError(409, "User already exists"));
    }

    const newUser = await User.create({ username, password, role });
    if (!newUser) {
      return next(new AppError(500, "Failed to create user"));
    }

    // SEND RESPONSE
    return sendResponseWithToken(
      res,
      201,
      "User created successfully",
      newUser
    );
  }
);

const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username }).select("+password");
    if (!user || !(await compareHash(password, user.password))) {
      return next(new AppError(401, "Invalid credentials"));
    }

    return sendResponseWithToken(res, 200, "Login successful", user);
  }
);


const getMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.user!;
    const user = await User.findById(_id);
    if (!user) {
      return next(new AppError(404, "User not found"));
    }
    res.status(200).json({ user });
  }
);

export { signUp, login, getMe };
