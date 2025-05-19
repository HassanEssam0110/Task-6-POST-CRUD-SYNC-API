import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../../middlewares/async-handler.middleware";
import { Post } from "../../../database/models/index.models";

// 1. Create a new post
const createPosts = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { title, body } = req.body;
    const post = await Post.create({ title, body });
    if (!post) {
      return res.status(500).json({ message: "Failed to create post." });
    }
    return res.status(201).json({ message: "Post created successfully", post });
  }
);

// 2. Get all approved posts (public)
const getPosts = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const posts = await Post.find({ approved: true });
    res.status(200).json({ posts });
  }
);

// 3. Get all posts (Admin or Reviewer)
const getAllPosts = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const posts = await Post.find();
    res.status(200).json({ posts });
  }
);

// 4. Get a specific approved post by ID (public)
const getPost = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const post = await Post.findOne({ _id: id, approved: true });
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json({ post });
  }
);

// 5. Update a specific post (Admin only)
const updatePosts = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const post = await Post.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "Post updated successfully", post });
  }
);

// 6. Delete a specific post (Admin only)
const deletePosts = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({ _id: id });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(204).json();
  }
);

// 7. Approve a post (Reviewer only)
const approvePost = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      { approved: true },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res
      .status(200)
      .json({ message: "Post approved successfully", post });
  }
);

export {
  getPosts,
  getAllPosts,
  getPost,
  createPosts,
  updatePosts,
  deletePosts,
  approvePost,
};

/*
Implement the following endpoints (accessible only to logged-in users):
POST /posts: Create a new post.
GET /posts: Retrieve a list of all approved posts (public).
GET /posts/all: Retrieve a list of all posts (Admin, Reviewer).
GET /posts/:id: Retrieve a specific approved post by ID.
PUT /posts/:id: Update a specific post by ID.
DELETE /posts/:id: Delete a specific post by ID.
POST /posts/:id/approve: Approve a post (Review role).
*/
