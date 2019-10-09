const express = require("express");
const router = new express.Router();
const db = require("../DB/repositories/surveyRepo");
const checkAauth = require("../middleware/check-auth");
const hasTypes = require("./has-types");

//get surveys by id
router.get("/:id", checkAauth, (req, res, next) => {
  const surveyId = req.params.id;
  db.getSurveyById(surveyId, function(errors, survey) {
    if (errors.length == 0) {
      res.body = survey;
      next();
      // res.status(200).json(survey);
    } else if (errors.includes("databaseError")) {
    } else {
      res.status(500).end();
    }
  });
});

//get surveys by userid
router.get("/", checkAauth, (req, res, next) => {
  if (req.query.userId) {
    const userId = req.query.userId;
    db.getSurveyByUserId(userId, function(errors, surveys) {
      if (errors.length == 0) {
        res.body = surveys;
        next();
        // res.status(200).json(surveys);
      } else if (errors.includes("userNotFound")) {
        res.status(404).end();
      } else {
        res.status(500).end();
      }
    });

    //get surveys by compund Id
  } else if (req.query.compoundId) {
    const compoundId = req.query.compoundId;
    db.getSurveyByCompoundId(compoundId, function(errors, survey) {
      if (errors.length == 0) {
        res.body = survey;
        next();
        // res.status(200).json(survey);
      } else if (errors.includes("compoundNotFound")) {
      } else {
        res.status(500).end();
      }
    });
  }
  //get surveys by status
  else if (req.query.status) {
    const status = req.query.status;
    db.getSurveyByStatus(status, function(errors, survey) {
      if (errors.length == 0) {
        res.status(200).json(survey);
      } else {
        res.status(500).end();
      }
    });
  } else {
    //get all surveys
    db.getAllSurveys(function(errors, surveys) {
      if (errors.length == 0) {
        res.body = surveys;
        next();
        // res.status(200).json(surveys);
      } else {
        res.status(500).end();
      }
    });
  }
});

//create new Survey
router.post("/", checkAauth, (req, res) => {
  const survey = req.body;

  //check types of the body
  const surveyTypes = {
    userId: Number,
    compoundId: Number,
    createdAt: Number
  };
  if (!hasTypes(survey, surveyTypes)) {
    res.status(422).end();
    return;
  }

  const validationErrors = [];
  //check the date
  const nowTime = Date.parse(new Date());
  if (survey.createdAt < nowTime) {
    validationErrors.push("invalidDate");
  }
  if (0 < validationErrors.length) {
    res.status(400).json(validationErrors);
    return;
  }
  db.createSurvey(survey, function(errors, id) {
    if (errors.length == 0) {
      res.setHeader("Location", "/surveys/" + id);
      res.status(201).end();
    } else if (errors.includes("compound or user NotFound")) {
      res.status(400).json(errors);
    } else {
      res.status(500).end();
    }
  });
});

// Update surveys
router.put("/:id", checkAauth, (req, res) => {
  const surveyId = req.params.id;
  db.updateSurveyById(surveyId, function(errors, didExist) {
    if (errors.length == 0) {
      if (didExist) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } else {
      res.status(500).end();
    }
  });
});

//delete survey by Id
router.delete("/:id", checkAauth, (req, res) => {
  const id = req.params.id;
  db.deleteSurveyById(id, function(errors, surveyExisted) {
    if (errors.length == 0) {
      if (surveyExisted) {
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
