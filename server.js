import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Routes
app.use("/posts", postRoutes);

app.get("/", (req, res) => res.redirect("/posts"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
