const express = require("express");
const router = new express.Router();
const db = require("../DB/repositories/observationRepo");
const hasTypes = require("./has-types");
const checkAauth = require("../middleware/check-auth");

//get obs
router.get("/", (req, res) => {
  if (req.query.compoundId) {
    const compoundId = req.query.compoundId;
    db.getObservationsByCompoundId(compoundId, function(errors, observations) {
      if (observations) {
        res.status(200).sendBack(observations);
      } else if (errors.includes("compoundId Not Found")) {
        res.status(404).end();
      } else {
        res.status(500).end();
      }
    });

    // get observation by compound id and user id
  } else if (req.query.compoundId && req.query.userId) {
    compoundId = req.query.compoundId;
    userId = req.query.userId;
    db.getObsByCompoundAndUserId(compoundId, userId, function(
      errors,
      observations
    ) {
      if (errors.length == 0) {
        res.status(200).sendBack(observations);
      } else if (errors.includes("compoundId or userId Not Found")) {
        response.status(400).sendBack(errors);
      } else {
        res.status(500).end();
      }
    });
  } else if (req.query.surveyId) {
    const surveyId = req.query.surveyId;
    db.getObservationsBySurveyId(surveyId, function(errors, observations) {
      if (errors.length == 0) {
        res.status(200).sendBack(observations);
      } else if (errors.includes("databaseError")) {
      } else {
        res.status(500).end();
      }
    });
  } else if (req.query.surveyId && req.query.compoundId) {
    const surveyId = req.query.surveyId;
    const compoundId = req.query.compoundId;
    db.getObservationsBySurveyIdAndCompoundId(surveyId, compoundId, function(
      errors,
      observations
    ) {
      if (errors.length == 0) {
        res.status(200).sendBack(observations);
      } else if (errors.includes("databaseError")) {
      } else {
        res.status(500).end();
      }
    });
  }
});

//create new Observation
router.post("/", checkAauth, (req, res) => {
  const observation = req.body;

  // Check that the activity contains all expected properties.
  const observationTypes = {
    surveyId: Number,
    compoundId: Number,
    userId: Number,
    entryTime: Number,
    effectId: Number,
    effectName: String,
    effectIntensity: Number
  };
  if (observation.effectId == null) {
    res.status(422).end();
    return;
  }
  if (!hasTypes(observation, observationTypes)) {
    res.status(422).end();
    return;
  }

  //create the observation.
  db.createObservation(observation, function(errors, id) {
    if (errors.length == 0) {
      res.setHeader("Location", "/observations/" + id);
      res.status(201).end();
    } else if (errors.includes("account, user , survey or effect NotFound")) {
      res.status(400).end();
    } else {
      res.status(500).end();
    }
  });
});

//To update an observation based on observationId
router.put("/:id", checkAauth, function(req, res) {
  const id = req.params.id;
  const updatedObservation = req.body;

  //Check that the observation contains all expected properties.
  const observationTypes = {
    entryTime: Number,
    effectId: Number,
    effectIntensity: Number
  };

  if (!hasTypes(updatedObservation, observationTypes)) {
    res.status(422).end();
    return;
  }

  db.getObservationById(id, (errors, oldObservation) => {
    if (errors.length == 0) {
      // Try to update the observation.
      db.editObservationById(id, updatedObservation, function(errors) {
        if (errors.length == 0) {
          res.status(204).sendBack({ updatedObservation });
        } else {
          res.status(500).end();
        }
      });
    } else if (!oldObservation) {
      res.status(404).end();
      return;
    } else {
      res.status(500).end();
    }
  });
});

//get observation by id
router.get("/:id", checkAauth, (req, res) => {
  const id = req.params.id;
  db.getObservationById(id, (err, observation) => {
    if (err.length == 0) {
      if (observation) {
        res.status(200).sendBack(observation);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(500).end();
    }
  });
});

//delete obs by Id
router.delete("/:id", checkAauth, (req, res) => {
  const id = req.params.id;
  db.deleteObservationById(id, function(errors, observationExisted) {
    if (errors.length == 0) {
      if (observationExisted) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } else {
      res.status(500).end();
    }
  });
});

module.exports = router;
