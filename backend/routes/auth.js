const router = require("express").Router();
const User = require("../database/models/user.js");
const passport = require("../passport");
const cors = require("cors");


router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.get("/google/posts",
    passport.authenticate("google"),
        (req, res) => {
            console.log("*****************")
            console.log("Successful auth");
            console.log(req.user);
            // Redirect to client-side home page after authentication
            res.redirect("http://localhost:3000/");
});

module.exports = router;