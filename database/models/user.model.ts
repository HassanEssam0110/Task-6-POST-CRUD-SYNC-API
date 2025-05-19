import mongoose, { Document } from "mongoose";
import { createHash, ROLES } from "../../src/utils/index.utils";

const { Schema, model, models } = mongoose;

type Role = (typeof ROLES)[keyof typeof ROLES];

export interface IUser extends Document {
  username: string;
  password: string;
  role: Role;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.Reviewer,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if changed
  this.password = await createHash(this.password);
  next();
});

export const User =
  (models.User as mongoose.Model<IUser>) || model<IUser>("User", userSchema);
