import express from "express";
import Post from "../models/Post.js";
import { marked } from "marked";

const router = express.Router();

// Index
router.get("/", async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.render("index", { posts });
});

// New post form
router.get("/new", (req, res) => res.render("new"));

// Create post
router.post("/", async (req, res) => {
    const { title, body } = req.body;
    await Post.create({ title, body });
    res.redirect("/posts");
});

// Show single post
router.get("/:id", async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.renderedBody = marked(post.body);
    res.render("show", { post });
});

// Edit form
router.get("/:id/edit", async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render("edit", { post });
});

// Update post
router.put("/:id", async (req, res) => {
    const { title, body } = req.body;
    await Post.findByIdAndUpdate(req.params.id, { title, body });
    res.redirect(`/posts/${req.params.id}`);
});

// Delete post
router.delete("/:id", async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/posts");
});

export default router;
