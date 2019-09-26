const sqlite = require("sqlite3");

const db = new sqlite.Database("bigpharma.db");
// Enable foreign key constraints.
db.run("PRAGMA foreign_keys = ON");

db.run(`
	CREATE TABLE IF NOT EXISTS compounds (
    id INTEGER PRIMARY KEY,
    compoundName TEXT,
		indicationName TEXT
	)
`);

exports.getAllCompounds = function(callback) {
  const query = `
          SELECT * FROM compounds ORDER BY id
      `;
  const values = [];

  db.all(query, values, function(error, compounds) {
    if (error) {
      console.log(error);
      callback(["databaseError"]);
    } else {
      callback([], compounds);
    }
  });
};

//getcompound by id
exports.getCompoundById = function(compoundId, callback) {
  const query = `
    SELECT * FROM compounds WHERE id=? ORDER BY id`;
  const values = [compoundId];

  db.get(query, values, (err, compound) => {
    if (err) {
      callback(["databaseError"]);
    } else {
      callback([], compound);
    }
  });
};
