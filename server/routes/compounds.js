const express = require("express");
const router = new express.Router();
const db = require("../DB/repositories/compoundRepo");

//get all compounds
router.get("/", (req, res, next) => {
  db.getAllCompounds(function(errors, compounds) {
    if (errors.length == 0) {
      res.body = compounds;
      next();
    } else {
      res.status(500).end();
    }
  });
});

// get compound by id
router.get("/:id", (req, res, next) => {
  const compoundId = req.params.id;
  db.getCompoundById(compoundId, function(errors, compound) {
    if (errors.length == 0) {
      res.body = compound;
      next();
      // res.status(200).json(compound);
    } else if (errors.includes("databaseError")) {
    } else {
      res.status(500).end();
    }
  });
});

module.exports = router;
