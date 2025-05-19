import { IUser } from "../../../database/models/index.models"; // Adjust path to your model

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
