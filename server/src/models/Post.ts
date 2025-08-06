import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPost extends Document {
  author: Types.ObjectId;
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
