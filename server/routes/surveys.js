const express = require("express");
const router = new express.Router();
const db = require("../DB/repositories/surveyRepo");
const checkAauth = require("../middleware/check-auth");

//get all surveys
router.get("/", function(request, response) {
  db.getAllSurveys(function(errors, surveys) {
    if (errors.length == 0) {
      response.status(200).json(surveys);
    } else {
      response.status(500).end();
    }
  });
});

//get surveys by id
router.get("/:id", (req, res) => {
  const surveyId = req.params.id;
  db.getSurveyById(surveyId, function(errors, survey) {
    if (errors.length == 0) {
      res.status(200).json(survey);
    } else if (errors.includes("databaseError")) {
    } else {
      res.status(500).end();
    }
  });
});

//get surveys by userid
router.get("/", (req, res) => {
  if (req.query.userId) {
    const userId = req.query.userId;
    db.getSurveyByUserId(userId, function(errors, survey) {
      if (errors.length == 0) {
        res.status(200).json(survey);
      } else if (errors.includes("userNotFound")) {
      } else {
        res.status(500).end();
      }
    });
  }
});

//get surveys by compoundId
router.get("/", (req, res) => {
  if (req.query.compoundId) {
    const compoundId = req.query.compoundId;
    db.getSurveyByCompoundId(compoundId, function(errors, survey) {
      if (errors.length == 0) {
        res.status(200).json(survey);
      } else if (errors.includes("compoundNotFound")) {
      } else {
        res.status(500).end();
      }
    });
  }
});

//get surveys by status
router.get("/", (req, res) => {
  if (req.query.status) {
    const status = req.query.status;
    db.getSurveyByCompoundId(status, function(errors, survey) {
      if (errors.length == 0) {
        res.status(200).json(survey);
      } else {
        res.status(500).end();
      }
    });
  }
});

//create new Survey
router.post("/", (req, res) => {
  const survey = req.body;
  db.createSurvey(survey, function(errors, id) {
    if (errors.length == 0) {
      res.setHeader("Location", "/surveys/" + id);
      res.status(201).end();
    } else if (errors.includes("account or user or effect NotFound")) {
      res.status(400).json(errors);
    } else {
      res.status(500).end();
    }
  });
});

// delete surveys
module.exports = router;
