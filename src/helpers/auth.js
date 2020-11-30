/*  */
/*  */

const helper = {};

helper.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("errorMessage", "No authentication credentials");
  res.redirect("/user/signin");
};

helper.isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  req.flash("errorMessage", "You have a session");
  res.redirect("/note");
};

module.exports = helper;
