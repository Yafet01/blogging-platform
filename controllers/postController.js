import Blog from "../models/Post.js"; 
import errorHandler from "../middleware/error.js";

// Get all posts
// @route GET /api/posts
export const getPosts = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit);
        let posts = isNaN(limit) || limit <= 0 ? await Blog.find() : await Blog.find().limit(limit);

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

// Get single post
// @route GET /api/posts/:id
export const getPost = async (req, res, next) => {
    try {
        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: `Post with ID ${req.params.id} not found` });
        }
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

// Create new post
// @route POST /api/posts
export const createPost = async (req, res, next) => {
    try {
        const { title, content, category, tags } = req.body;
        if (!title || !content || !category || !tags) {
            return res.status(400).json({ message: "Please include all fields" });
        }

        const post = await Blog.create({ title, content, category, tags });
        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

// Update post
// @route PUT /api/posts/:id
export const updatePost = async (req, res, next) => {
    try {
        const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: `Post with ID ${req.params.id} not found` });
        }
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

// Delete post
// @route DELETE /api/posts/:id
export const deletePost = async (req, res, next) => {
    try {
        const post = await Blog.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: `Post with ID ${req.params.id} not found` });
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        next(error);
    }
};
