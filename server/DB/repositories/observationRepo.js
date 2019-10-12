const sqlite = require("sqlite3");

const db = new sqlite.Database("bigpharma.db");
// Enable foreign key constraints.
db.run("PRAGMA foreign_keys = ON");
db.run(`
	CREATE TABLE IF NOT EXISTS observations (
        id INTEGER PRIMARY KEY,
        surveyId INTEGER,
        compoundId INTEGER,
        userId INTEGER ,
        entryTime INTEGER,
        effectId INTEGER,
        effectIntensity INTEGER,
        FOREIGN KEY(surveyId) REFERENCES surveys(id) ON DELETE CASCADE
        FOREIGN KEY(compoundId) REFERENCES compounds(id)
        FOREIGN KEY(effectId) REFERENCES effects(id)
        FOREIGN KEY(userId) REFERENCES accounts(id) ON DELETE SET NULL 
	)
`);

exports.getObservationsBySurveyId = function(surveyId, callback) {
  const query = `
		SELECT * FROM observations WHERE surveyId=? ORDER BY id
	`;
  const values = [surveyId];
  db.all(query, values, function(error, observations) {
    if (error) {
      //check foreignkey violation
      if (true) {
        callback(["compoundId Not Found"]);
      } else {
        callback(["databaseError"]);
      }
    } else {
      callback([], observations);
    }
  });
};

exports.getObservationsBySurveyIdAndCompoundId = function(
  surveyId,
  compoundId,
  callback
) {
  const query = `
		SELECT * FROM observations WHERE surveyId=? AND compoundId = ? ORDER BY id
	`;
  const values = [surveyId, compoundId];
  db.all(query, values, function(error, observations) {
    if (error) {
      //check foreignkey violation
      if (true) {
        callback(["compoundId Not Found"]);
      } else {
        callback(["databaseError"]);
      }
    } else {
      callback([], observations);
    }
  });
};

exports.getObservationsByCompoundId = function(compoundId, callback) {
  const query = `
		SELECT * FROM observations WHERE compoundId=? ORDER BY id
	`;
  const values = [compoundId];

  db.all(query, values, function(error, observation) {
    if (error) {
      //check foreignkey violation
      if (true) {
        callback(["compoundId Not Found"]);
      } else {
        callback(["databaseError"]);
      }
    } else {
      callback([], observation);
    }
  });
};

exports.getObsByCompoundAndUserId = function(compoundId, userId, callback) {
  const query = `
		SELECT * FROM observations WHERE compoundId=? AND userId=? ORDER BY id
	`;
  const values = [compoundId, userId];

  db.all(query, values, function(error, observation) {
    if (error) {
      callback(["databaseError"]);
    } else {
      callback([], observation);
    }
  });
};

//create obs
exports.createObservation = function(observation, callback) {
  const query = `INSERT INTO observations
			(surveyId, compoundId, userId, entryTime, effectId, effectIntensity)
		VALUES
      (?, ?, ?, ?, ?, ?)
      `;
  const values = [
    observation.surveyId,
    observation.compoundId,
    observation.userId,
    observation.entryTime,
    observation.effectId,
    observation.effectIntensity
  ];

  db.run(query, values, function(error) {
    if (error) {
      //check foreign key violation error.
      if (true) {
        callback(["account, user , survey or effect NotFound"]);
      }

      callback(["databaseError"]);
    } else {
      callback([], this.lastID);
    }
  });
};

//edit obs
exports.editObservationById = function(id, updatedobservation, callback) {
  const query = `
    UPDATE observations SET
    entryTime = ?,
    effectId = ?,
		effectIntensity = ?
		WHERE
			id = ?
	`;
  const values = [
    updatedobservation.entryTime,
    updatedobservation.effectId,
    updatedobservation.effectIntensity,
    id
  ];

  db.run(query, values, function(error) {
    if (error) {
      callback(["databaseError"]);
    } else {
      const observationExisted = this.changes == 1;
      callback([], observationExisted);
    }
  });
};

//get obs by id
exports.getObservationById = function(id, callback) {
  const query = `
		SELECT * FROM observations WHERE id = ?
	`;
  const values = [id];

  db.get(query, values, function(error, observation) {
    if (error) {
      callback(["databaseError"]);
    } else {
      callback([], observation);
    }
  });
};

//Delete observation by id
exports.deleteObservationById = function(id, callback) {
  const query = `
		DELETE FROM observations WHERE id = ?
	`;
  const values = [id];

  db.run(query, values, function(error) {
    if (error) {
      callback(["databaseError"]);
    } else {
      const observationExisted = this.changes == 1;
      callback([], observationExisted);
    }
  });
};
