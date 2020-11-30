/*  */
/*  */
const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const passport = require("passport");

//initialize
const app = express();
require("./db");
require("./configs/passport");

//configs
app.set("port", process.env.PORT || 7000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./helpers/timeago"),
  })
);
app.set("view engine", ".hbs");

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json());

// middleware session
app.use(
  session({
    secret: "hardwell",
    resave: true,
    saveUninitialized: true,
  })
);

// middleware passport
app.use(passport.initialize());
app.use(passport.session());

// middleware flash
app.use(flash());

// global variables
app.use((req, res, next) => {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.errorMessage = req.flash("errorMessage");
  res.locals.error = req.flash("error"); /* este es de passport */
  res.locals.user =
    req.user || null; /* almacena la información del usuario autenticado */
  next(); /* siempre poner el next */
});

//routes
app.use(require("./routes/note.routes"));
app.use(require("./routes/route.routes"));
app.use(require("./routes/user.routes"));

// files static
app.use(express.static(path.join(__dirname, "public")));

//404
app.use((req, res) => {
  res.status(404).render("404");
});

// server listening
app.listen(app.get("port"), () => {
  console.log(
    "server listening on port ......................... " + app.get("port")
  );
});
