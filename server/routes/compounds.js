const express = require("express");
const router = new express.Router();
const db = require("../DB/repositories/compoundRepo");

//get all compounds
router.get("/", (req, res) => {
  db.getAllCompounds(function(errors, compounds) {
    if (errors.length == 0) {
      res.status(200).sendBack(compounds);
    } else {
      res.status(500).end();
    }
  });
});

// get compound by id
router.get("/:id", (req, res) => {
  const compoundId = req.params.id;
  db.getCompoundById(compoundId, function(errors, compound) {
    if (errors.length == 0) {
      res.status(200).sendBack(compound);
    } else if (errors.includes("databaseError")) {
    } else {
      res.status(500).end();
    }
  });
});

module.exports = router;
