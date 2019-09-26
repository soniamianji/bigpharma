const express = require("express");
const router = new express.Router();
const db = require("../DB/repositories/effectRepo");

router.get("/", (req, res) => {
  db.getAlleffects(function(errors, effects) {
    if (errors.length == 0) {
      res.status(200).json(effects);
    } else {
      res.status(500).end();
    }
  });
});

module.exports = router;
