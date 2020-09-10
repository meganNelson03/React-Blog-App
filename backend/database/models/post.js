const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: Date,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    likes: Number
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;