/*  */
/*  */
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hola estas en index");
});

router.get("/home", (req, res) => {
  res.send("Hola estas en home");
});
router.get("/about", (req, res) => {
  res.send("Hola estas en about");
});

module.exports = router;
