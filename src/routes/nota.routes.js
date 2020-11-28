/*  */
/*  */
const express = require("express");
const router = express.Router();

router.get("/nota", (req, res) => {
    res.send("Hola estas en NOTAS");
  });

module.exports = router;
