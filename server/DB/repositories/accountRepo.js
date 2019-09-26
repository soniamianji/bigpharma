const sqlite = require("sqlite3");

const db = new sqlite.Database("bigpharma.db");
// Enable foreign key constraints.
db.run("PRAGMA foreign_keys = ON");

// Create the database tables if they don't exist.
db.run(`
	CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY,
        email TEXT,
		username TEXT,
		password TEXT,
		CONSTRAINT uniqueEmail UNIQUE(email)
	)
`);

exports.createAccount = function(account, callback) {
  const query = `
          INSERT INTO accounts
              (email, username, password)
          VALUES
              (?, ?, ?)
      `;
  const values = [account.email, account.username, account.password];

  db.run(query, values, function(error) {
    if (error) {
      if (
        error.message ==
        "SQLITE_CONSTRAINT: UNIQUE constraint failed: accounts.email"
      ) {
        callback(["emial is taken."]);
      } else {
        console.log(error);
        callback(["databaseError"]);
      }
    } else {
      callback([], this.lastID);
    }
  });
};

exports.getAccountById = function(id, callback) {
  const query = `
          SELECT * FROM accounts WHERE id = ?
      `;
  const values = [id];

  db.get(query, values, function(error, account) {
    if (error) {
      console.log(error);
      callback(["databaseError"]);
    } else {
      callback([], account);
    }
  });
};

exports.getAccountByEmail = function(email, callback) {
  const query = `
          SELECT * FROM accounts WHERE email = ?
      `;
  const values = [email];

  db.get(query, values, function(error, account) {
    if (error) {
      console.log(error);
      callback(["databaseError"]);
    } else {
      callback([], account);
    }
  });
};

exports.getAllAccounts = function(callback) {
  const query = `
          SELECT * FROM accounts ORDER BY id
      `;
  const values = [];

  db.all(query, values, function(error, accounts) {
    if (error) {
      console.log(error);
      callback(["databaseError"]);
    } else {
      callback([], accounts);
    }
  });
};

//update account
exports.updateAccountById = function(id, username, callback) {
  const query = `Update accounts SET username=? WHERE id = ? `;
  const values = [username, id];
  db.run(query, values, error => {
    if (error) {
      callback([error]);
    } else {
      const accountExisted = this.changes == 1;
      callback([], accountExisted);
    }
  });
};

//Delete account by id
exports.deleteAccountsById = function(id, callback) {
  const query = `
		DELETE FROM accounts WHERE id = ?
	`;
  const values = [id];
  console.log(values);
  db.run(query, values, function(error) {
    if (error) {
      console.log(error);
      callback(["databaseError"]);
    } else {
      const accountExisted = this.changes == 1;
      callback([], accountExisted);
    }
  });
};
