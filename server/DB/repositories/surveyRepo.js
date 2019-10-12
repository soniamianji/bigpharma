const sqlite = require("sqlite3");

const db = new sqlite.Database("bigpharma.db");
// Enable foreign key constraints.
db.run("PRAGMA foreign_keys = ON");

db.run(`
	CREATE TABLE IF NOT EXISTS surveys (
        id INTEGER PRIMARY KEY,
        userId INTEGER,
        compoundId INTEGER,
        createdAt INTEGER,
        completed INTEGER DEFAULT 0,
        FOREIGN KEY(compoundId) REFERENCES compounds(id)
        FOREIGN KEY(userId) REFERENCES accounts(id) ON DELETE SET NULL 
	)
`);

exports.getAllSurveys = function(callback) {
  console.log("im here");
  const query = `
          SELECT * FROM surveys
      `;
  const values = [];

  db.all(query, values, function(error, surveys) {
    if (error) {
      console.log(error);
      callback(["databaseError"]);
    } else {
      callback([], surveys);
    }
  });
};

//get surveys by Id
exports.getSurveyById = function(surveyId, callback) {
  const query = `
    SELECT * FROM surveys WHERE id=? ORDER BY id`;
  const values = [surveyId];

  db.get(query, values, (err, survey) => {
    if (err) {
      callback(["databaseError"]);
    } else {
      callback([], survey);
    }
  });
};

//get surveys by user Id
exports.getSurveyByUserId = function(userId, callback) {
  console.log("im in get survey by user id ");
  const query = `
    SELECT * FROM surveys WHERE userId=? ORDER BY id`;
  const values = [userId];

  db.all(query, values, (err, surveys) => {
    if (err) {
      if (true) {
        callback(["userNotFound"]);
      }
    } else {
      callback([], surveys);
      console.log(surveys);
    }
  });
};

//get surveys by compound Id
exports.getSurveyByCompoundId = function(compoundId, callback) {
  const query = `
    SELECT * FROM surveys WHERE compoundId=? ORDER BY id`;
  const values = [compoundId];

  db.all(query, values, (err, surveys) => {
    if (err) {
      if (true) {
        callback(["CompoundNotFound"]);
      }
    } else {
      callback([], surveys);
    }
  });
};

//get surveys by completion status
exports.getSurveyByCompoundIdAndStatus = function(
  compoundId,
  status,
  callback
) {
  console.log("status", status);
  const query = `
    SELECT * FROM surveys WHERE compoundId=? AND completed =? ORDER BY id`;
  const values = [compoundId, status];

  db.all(query, values, (err, surveys) => {
    if (err) {
      callback(["databaseError"]);
    } else {
      callback([], surveys);
    }
  });
};

//create a new survey
exports.createSurvey = function(survey, callback) {
  const query = `
    INSERT INTO surveys (userId, compoundId, createdAt)
    VALUES
    (?, ?, ?)`;
  const values = [survey.userId, survey.compoundId, survey.createdAt];
  db.run(query, values, function(err) {
    if (err) {
      if (true) {
        callback(["compound or user NotFound"]);
      }
      callback(["databaseError"]);
      console.log(err);
    } else {
      callback([], this.lastID);
    }
  });
};

//Update survey
exports.updateSurveyById = function(id, callback) {
  const query = `
  UPDATE surveys SET completed = 1 WHERE id= ?`;
  const values = [id];

  db.run(query, values, function(error) {
    if (error) {
      console.log(error);
      callback(["databaseError"]);
    } else {
      const SurveyExisted = this.changes == 1;
      callback([], SurveyExisted);
    }
  });
};

//Delete observation by id
exports.deleteSurveyById = function(id, callback) {
  const query = `
		DELETE FROM surveys WHERE id = ?
	`;
  const values = [id];

  db.run(query, values, function(error) {
    if (error) {
      console.log(error);
      callback(["databaseError"]);
    } else {
      const surveyExisted = this.changes == 1;
      callback([], surveyExisted);
    }
  });
};
