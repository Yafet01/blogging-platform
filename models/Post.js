import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true, lowercase: true, trim: true },
    category: { type: String, required: true, lowercase: true, trim: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
