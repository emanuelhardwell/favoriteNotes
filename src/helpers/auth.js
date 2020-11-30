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

module.exports = helper;
