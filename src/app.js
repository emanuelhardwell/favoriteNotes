/*  */
/*  */
const express = require("express");
const path = require("path");
const session = require("express-session");
const exphbs = require("express-handlebars");
const morgan = require("morgan");
const methodOverride = require("method-override");

//initialize
const app = express();

//configs
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set(
  ".hbs",
  exphbs({
    defaultLayout: main,
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ",hbs");

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

//routes

// files static

// server listening
app.listen(app.get("port"), () => {
  console.log("server listening on port " + app.get("port"));
});
