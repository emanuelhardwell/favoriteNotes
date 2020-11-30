/*  */
/*  */
const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { isAuthenticated } = require("../helpers/auth");

router.get("/note/add", isAuthenticated, (req, res) => {
  res.render("notes/add");
});

router.post("/note/add", isAuthenticated, async (req, res) => {
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
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("successMessage", "Note added successfully");
    res.redirect("/note");
  }
});

router.get("/note", isAuthenticated, async (req, res) => {
  /* try { */
  const noteList = await Note.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("notes/list", { noteList });
  /* } catch (error) {
    console.log(error);
  } */
});

router.get("/note/edit/:id", isAuthenticated, async (req, res) => {
  const noteEdit = await Note.findById(req.params.id).lean();
  res.render("notes/edit", { noteEdit });
});

router.put("/note/edit/:id", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    title,
    description,
  }).lean();
  req.flash("successMessage", "Note edited successfully");
  res.redirect("/note");
});

router.delete("/note/delete/:id", isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id).lean();
  req.flash("successMessage", "Note deleted successfully");
  res.redirect("/note");
});

module.exports = router;
