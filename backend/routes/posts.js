const router = require("express").Router();
const Post = require("../database/models/post.js");

// get all posts
router.get("/", (req, res) => {
    
    Post.find({}, (err, posts) => {
        if (err) {
            return "Error: Could Not Get All Posts - " + err;
        }
        res.json(posts);
    });
});

// get specific post
router.get("/:id", (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            return "Error: Could Not Find Post - " + err;
        }
        res.json(post);
    })
});




module.exports = router;