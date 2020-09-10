const router = require ("express").Router({mergeParams: true});
const Comment = require("../database/models/comment.js");
const Post = require("../database/models/post.js");
const passport = require("../passport");

const isLoggedIn = function(req, res, next) {
    console.log(isLoggedIn);
    console.log(req);
    next();
}


// get comments on post
router.get("/", (req, res) => {
    console.log("getting comments on post...");
    console.log(req.params);
    Post.find({_id: req.params.id}).populate("comments").exec((err, post) => {
        if (err) {
            console.log("Error: Could Not Find Post Comments -" + err);
        } 
        
        //find and send comments back to UI
        res.json(post[0].comments);
    });
});

// create comment

router.post("/", (req, res) => {
    console.log("POSTING NEW COMMENT!!!!");
    console.log(req.params);

    Post.find({_id: req.params.id}, (err, post) => {
        if (err) {
            console.log("Error: Comments Route, Could Not Find Post  - " + err);
        }

        Comment.create({content: req.body.content, date: new Date()}, (err, newComment) => {
            if (err) {
                console.log("Error: Issue Creating Comment -" + err);
            }
            //save Comment
            console.log(post);
            post[0].comments.push(newComment);
            post[0].save();
            console.log("pushed new comment:")
            console.log(post[0].comments);
            res.json(newComment);
        });

    })
})

module.exports = router;