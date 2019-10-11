const express = require("express");
const router = new express.Router();
const db = require("../DB/repositories/effectRepo");

router.get("/", (req, res, next) => {
  db.getAlleffects(function(errors, effects) {
    if (errors.length == 0) {
      res.body = effects;
      next();
      // res.status(200).json(effects);
    } else {
      res.status(500).end();
    }
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  db.getEffectById(id, function(errors, effect) {
    if (errors.length == 0) {
      res.body = effect;
      next();
      // res.status(200).json(effects);
    } else {
      res.status(500).end();
    }
  });
});

module.exports = router;
