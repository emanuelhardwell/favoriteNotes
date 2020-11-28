/*  */
/*  */
const express = require("express");
const router = express.Router();

router.get("/note/add", (req, res) => {
  res.render("notes/add");
});

router.post("/note/add", (req, res) => {
  const { title, description } = req.body;
  console.log(title, description); /*  */
  const errors = [];
  if (!title) {
    errors.push({ text: "Please write a title" });
  }
  if (!description) {
    errors.push({ text: "Please write a description" });
  }
  if (errors.length > 0) {
    res.render("notes/add", { errors, title, description });
  } else {
    res.send("OK");
  }
});

module.exports = router;
