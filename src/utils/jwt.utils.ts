import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/config";

const { JWT_SECRET, JWT_EXPIRES_IN } = config;

const createToken = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN as unknown as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, JWT_SECRET);
};

export { createToken, verifyToken };
