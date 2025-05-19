import bcrypt from "bcrypt";
import config from "../config/config";

const salt = Number(config.SALT_ROUNDS);
// if (isNaN(salt)) {
//   throw new Error("SALT_ROUNDS must be a number");
// }

const createHash = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const compareHash = async (
  password: string,
  encrypted: string
): Promise<boolean> => {
  const isValid = await bcrypt.compare(password, encrypted);
  return isValid;
};

export { createHash, compareHash };
