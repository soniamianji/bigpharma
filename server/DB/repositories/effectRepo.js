const sqlite = require("sqlite3");

const db = new sqlite.Database("bigpharma.db");
// Enable foreign key constraints.
db.run("PRAGMA foreign_keys = ON");

db.run(`
	CREATE TABLE IF NOT EXISTS effects (
        id INTEGER PRIMARY KEY,
        effectName TEXT
	)
`);

exports.getAlleffects = function(callback) {
  const query = `
          SELECT * FROM effects ORDER BY id
      `;
  const values = [];

  db.all(query, values, function(error, effects) {
    if (error) {
      console.log(error);
      callback(["databaseError"]);
    } else {
      callback([], effects);
    }
  });
};
