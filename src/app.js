/*  */
/*  */
const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");

//initialize
const app = express();
require("./db");

//configs
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

//middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json());

// middleware PRO
app.use(
  session({
    secret: "hardwell",
    resave: true,
    saveUninitialized: true,
  })
);

// middleware flash
app.use(flash());

// global variables
app.use((req, res, next) => {
  res.locals.successMessage = req.flash("successMessage");
  res.locals.errorMessage = req.flash("errorMessage");
  next(); /* siempre poner el next */
});

//routes
app.use(require("./routes/note.routes"));
app.use(require("./routes/route.routes"));
app.use(require("./routes/user.routes"));

// files static
app.use(express.static(path.join(__dirname, "public")));

// server listening
app.listen(app.get("port"), () => {
  console.log(
    "server listening on port ......................... " + app.get("port")
  );
});
