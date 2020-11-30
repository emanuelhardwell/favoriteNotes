/*  */
/*  */
const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const { isNotAuthenticated } = require("../helpers/auth");

router.get("/user/signup", isNotAuthenticated, (req, res) => {
  res.render("users/signup");
});

router.post("/user/signup", async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  let errors = [];
  if (name < 4) {
    errors.push({ text: "The name is empty" });
  }
  if (password != passwordConfirm) {
    errors.push({ text: "The password is not math" });
  }
  if (password < 5) {
    errors.push({ text: "The password is very small" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
      password,
      passwordConfirm,
    });
  } else {
    const searchEmail = await User.findOne({ email: email });
    if (searchEmail) {
      req.flash("errorMessage", "The email is already associated");
      res.redirect("/user/signup");
    }
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("successMessage", "You are registered successfully");
    res.redirect("/user/signin");
  }
});

router.get("/user/signin", isNotAuthenticated, (req, res) => {
  res.render("users/signin");
});

router.post(
  "/user/signin",
  passport.authenticate("local", {
    successRedirect: "/note",
    failureRedirect: "/user/signin",
    failureFlash: true,
  })
);

/* logout */
router.get("/user/logout", (req, res) => {
  req.logout();
  req.flash("successMessage", "You are logged out now.");
  res.redirect("/");
});

module.exports = router;
