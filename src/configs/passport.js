/*  */
/*  */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const userFind = await User.findOne({ email: email });
      if (!userFind) {
        return done(null, false, { message: "User not found." });
      } else {
        const match = await userFind.matchPassword(password);
        if (match) {
          return done(null, userFind);
        } else {
          return done(null, false, { message: "Password incorrect." });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
