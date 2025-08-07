import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  author: IUser;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: { type: String, required: true, maxlength: 1000, trim: true },
  },
  { timestamps: true }
);

export const Post = mongoose.model<IPost>("Post", postSchema);
