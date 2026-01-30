// config/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        // 🔥 AUTO REGISTER
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id
            // role defaults to "customer"
          });
        }

        // 🔥 AUTO LOGIN
        return done(null, user);

      } catch (err) {
        return done(err, null);
      }
    }
  )
);
