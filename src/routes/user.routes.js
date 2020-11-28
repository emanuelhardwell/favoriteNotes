/*  */
/*  */
const express = require("express");
const router = express.Router();

router.get("/user/signin", (req, res) => {
  res.send("Hola estas en signin");
});

router.get("/user/signup", (req, res) => {
  res.send("Hola estas en signup");
});

module.exports = router;
