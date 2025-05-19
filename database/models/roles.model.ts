import mongoose, { Document } from "mongoose";
import { ROLES } from "../../src/utils/index.utils";

const { Schema, model, models } = mongoose;

type Role = keyof typeof ROLES;

interface IRole extends Document {
  name: Role;
}

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      enum: Object.values(ROLES),
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Role =
  (models.Role as mongoose.Model<IRole>) || model<IRole>("Role", roleSchema);
