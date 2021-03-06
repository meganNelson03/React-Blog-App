const router = require("express").Router();
const User = require("../database/models/user.js");
const passport = require("../passport");

// Login 
router.post("/login", 
            function(req, res, next) {
                console.log('routes/user.js, login, req.body: ');
                console.log(req.body)
                next();
            },
            passport.authenticate("local"),
            (req, res) => {
                console.log('Logging in', req.user);
                var userInfo = {
                    username: req.user.username
                };
                res.send(userInfo);
            }
);

// Signup 

router.post('/signup', (req, res) => {
    console.log('user signup');

    const { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})


// Get Current User
router.get('/', (req, res, next) => {
    console.log('===== Getting Current User!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

// Logout
router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        res.send({ msg: 'Logging out.' })
    } else {
        res.send({ msg: 'No user to log out.' })
    }
})

module.exports = router;
