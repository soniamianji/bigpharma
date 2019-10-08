const express = require("express");
const router = new express.Router();
const db = require("../DB/repositories/observationRepo");
const hasTypes = require("./has-types");
const checkAauth = require("../middleware/check-auth");

//validate timestamps and check inputs not empty before populating the database

//get obs
router.get("/", checkAauth, (req, res) => {
  if (req.query.compoundId) {
    const compoundId = req.query.compoundId;
    db.getObservationsByCompoundId(compoundId, function(errors, observations) {
      if (observations) {
        res.status(200).json(observations);
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
        res.status(200).json(observations);
      } else if (errors.includes("compoundId or userId Not Found")) {
        response.status(400).json(errors);
      } else {
        res.status(500).end();
      }
    });
  } else if (req.query.surveyId) {
    const surveyId = req.query.surveyId;
    db.getObservationsBySurveyId(surveyId, function(errors, survey) {
      if (errors.length == 0) {
        res.status(200).json(survey);
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
  if (!hasTypes(observation, observationTypes)) {
    res.status(422).end();
    return;
  }
  if (
    observation.surveyId == "" ||
    observation.compoundId == "" ||
    observation.userId == "" ||
    observation.entryTime == "" ||
    observation.effectId == "" ||
    observation.effectName == "" ||
    observation.effectIntensity == ""
  ) {
    res.status(422).end();
    return;
  }
  //create the observation.
  db.createObservation(observation, function(errors, id) {
    if (errors.length == 0) {
      res.setHeader("Location", "/observations/" + id);
      res.status(201).end();
    } else if (errors.includes("account, user , survey or effect NotFound")) {
      res.status(400).json(errors);
    } else {
      res.status(500).end();
    }
  });
});

//To update an observation based on observationId
router.put("/:id", checkAauth, function(request, response) {
  const id = request.params.id;
  const updatedObservation = request.body;
  console.log(updatedObservation);

  //Check that the observation contains all expected properties.
  const observationTypes = {
    entryTime: Number,
    effectId: Number,
    effectName: String,
    effectIntensity: Number
  };

  if (!hasTypes(updatedObservation, observationTypes)) {
    response.status(422).end();
    return;
  }

  if (
    updatedObservation.entryTime == "" ||
    updatedObservation.effectId == "" ||
    updatedObservation.effectName == "" ||
    updatedObservation.effectIntensity == ""
  ) {
    response.status(422).end();
    return;
  }

  db.getObservationById(id, (errors, oldObservation) => {
    if (errors.length == 0) {
      // Try to update the observation.
      db.editObservationById(id, updatedObservation, function(errors) {
        if (errors.length == 0) {
          response.status(204).json({ updatedObservation });
        } else {
          response.status(500).end();
        }
      });
    } else if (!oldObservation) {
      response.status(404).end();
      return;
    } else {
      response.status(500).end();
    }
  });
});

//get observation by id
router.get("/:id", checkAauth, (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.getObservationById(id, (err, observation) => {
    if (err.length == 0) {
      if (observation) {
        res.status(200).json(observation);
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
