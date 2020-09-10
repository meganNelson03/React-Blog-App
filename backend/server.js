require("dotenv").config();

const express = require("express"),
    bodyparser = require("body-parser"),
    session = require("express-session"),
    mongoose = require("mongoose"),
    dbConnection = require("./database"),
    cors = require("cors"),
    passport = require("./passport"),
    GoogleStrategy = require("passport-google-oauth2").Strategy,
    app = express();

const PORT = process.env.PORT;    

//......MODEL REQUIREMENTS...........   
const User = require("./database/models/user.js");
const Comment = require("./database/models/comment.js");
const Post = require("./database/models/post.js"); 


//......ROUTE REQs......
const postRouter = require("./routes/posts.js");
const userRouter = require("./routes/users.js");
const commentRouter = require("./routes/comments.js");
const authRouter = require("./routes/auth.js");

//......MIDDLEWARE.......
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

//......SESSION..........
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

//....PASSPORT CONFIG.....
app.use(passport.initialize());
app.use(passport.session());

//......ROUTES...........
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/posts/:id/comments", commentRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.redirect("/posts");
})

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}...`);
})