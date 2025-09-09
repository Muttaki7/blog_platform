import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }, // Markdown content
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Post", postSchema);
