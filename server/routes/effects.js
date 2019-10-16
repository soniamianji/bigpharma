const express = require("express");
const router = new express.Router();
const db = require("../DB/repositories/effectRepo");

router.get("/", (req, res) => {
  db.getAlleffects(function(errors, effects) {
    if (errors.length == 0) {
      // res.body = effects;
      res.status(200).sendBack(effects);
    } else {
      res.status(500).end();
    }
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.getEffectById(id, function(errors, effect) {
    if (errors.length == 0) {
      res.status(200).sendBack(effect);
    } else {
      res.status(500).end();
    }
  });
});

module.exports = router;
