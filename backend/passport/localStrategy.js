const User = require('../database/models/user');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;


const strategy = new LocalStrategy(
	{
		usernameField: 'username' 
	},
	function(username, password, done) {
		User.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
)

const googleStrategy = new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: "/auth/google/posts",
	passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, done) {


	console.log("MADE GOOGLE REQ");
	console.log(profile);
    
    User.findOne({googleId: profile.id}, (err, user) => {
        if (err) {
            done(err);
        }

        if (!user) {
            user = new User({
				username: profile.displayName,
				googleId: profile.id,
				email: profile.email,
                comments: []
            })

            user.save(err => {
                if (err) console.log(err);
                return done(err, user);
            })
        } else {
			console.log("ALL IS WELL, " + user);
            return done(err, user);
        }
    });

});


module.exports = { strategy, googleStrategy };