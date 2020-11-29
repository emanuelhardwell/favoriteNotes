/*  */
/*  */
const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get("/note/add", (req, res) => {
  res.render("notes/add");
});

router.post("/note/add", async (req, res) => {
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
    /* crear nota */
    const newNote = new Note({ title, description });
    await newNote.save();
    res.redirect("/list");
  }
});

router.get("/list", async (req, res) => {
  try {
    const noteList = await Note.find();
  res.render('notes/list', { note: noteList.toObject(), });
  } catch (error) {
    
  }
  
});

module.exports = router;
