import mongoose, { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  body: string;
  approved: boolean;
  originalId?: number;
}

const { Schema, model, models } = mongoose;

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    originalId: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Post =
  (models.Post as mongoose.Model<IPost>) || model<IPost>("Post", postSchema);
