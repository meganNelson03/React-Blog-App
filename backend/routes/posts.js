const router = require("express").Router();
const Post = require("../database/models/post.js");

// get all posts
router.get("/", (req, res) => {
    
    Post.find({}, (err, posts) => {
        if (err) {
            return "Error: Could Not Get All Posts - " + err;
        }
        console.log(posts[0].comments.content);
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

// create new post
router.post("/", (req, res) => {
    const date = new Date();
    Post.create({title: req.body.title, content: req.body.content, date: date, comments: [], likes: 0}, (err, newPost) => {
        if (err) {
            console.log("Error: Could Not Create New Post - " + err);
        }
        res.json(newPost);
    });
})



module.exports = router;