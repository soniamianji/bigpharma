const express = require("express");
const router = new express.Router();
const db = require("../DB/repositories/accountRepo");
const bcrypt = require("bcrypt");
const hasTypes = require("./has-types");
const jwt = require("jsonwebtoken");
const checkAauth = require("../middleware/check-auth");

// Constants used for validation of resources.
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 9;
const MIN_PASSWORD_LENGTH = 6;

//this has to be saved as environmental variable
const secretTokenKey = "a secret phrase";

//User sign up _ creating a new account
router.post("/", (request, response, next) => {
  const account = request.body;
  // Check that the account contains all expected properties.
  const accountTypes = {
    email: String,
    username: String,
    password: String
  };

  if (!hasTypes(account, accountTypes)) {
    response.status(422).end();
    return;
  }

  // Validate the account.
  const validationErrors = [];

  if (account.username.length < USERNAME_MIN_LENGTH) {
    validationErrors.push("usernameTooShort");
  } else if (USERNAME_MAX_LENGTH < account.username.length) {
    validationErrors.push("usernameTooLong");
  }

  if (account.password.length < MIN_PASSWORD_LENGTH) {
    validationErrors.push("passwordTooShort");
  }

  if (0 < validationErrors.length) {
    response.status(400).json(validationErrors);
    return;
  }

  //hash the password
  bcrypt.hash(request.body.password, 10, (err, hash) => {
    if (err) {
      return response.status(500).json({
        error: err
      });
    } else {
      account.password = hash;
      // Try to create the account.
      db.createAccount(account, function(errors, id) {
        if (errors.length == 0) {
          response.setHeader("Location", "/accounts/" + id);
          response.status(201).json({ account });
          console.log(account);
        } else if (errors.includes("emial is taken.")) {
          response.status(400).json(errors);
        } else {
          response.status(500).end();
        }
      });
    }
  });
});

//login to the account
router.post("/login-session", (req, res) => {
  db.getAccountByEmail(req.body.email, (err, account) => {
    console.log(account);
    if (err.length == 0 && account) {
      //verify hashed password
      bcrypt.compare(req.body.password, account.password, function(
        err,
        result
      ) {
        if (result) {
          const access_token = jwt.sign({ id: account.id }, secretTokenKey, {
            expiresIn: "1h"
          });
          const id_token = jwt.sign(
            {
              email: account.email,
              username: account.username,
              id: account.id
            },
            secretTokenKey
          );
          res.status(200).json({
            message: "Auth Success.",
            id_token: id_token,
            access_token: access_token
          });
        } else {
          res.status(401).json({ message: "Auth failed." });
        }
      });
    } else if (!account) {
      res.status(401).json({ message: "Auth failed." });
    } else {
      res.status(500).end();
    }
  });
});

//get all the accounts
router.get("/", function(request, response) {
  db.getAllAccounts(function(errors, accounts) {
    if (errors.length == 0) {
      accounts.forEach(account => delete account.password);
      response.status(200).json(accounts);
    } else {
      response.status(500).end();
    }
  });
});

//get account by id
router.get("/:id", (req, res) => {
  const accountId = req.params.id;
  db.getAccountById(accountId, function(errors, accountId) {
    if (errors.length == 0) {
      res.status(200).json(accountId);
    } else if (errors.includes("databaseError")) {
    } else {
      res.status(500).end();
    }
  });
});

//update account
router.put("/:id", (req, res) => {
  const id = this.params.id;
  const username = req.body;

  const userNameType = {
    username: String
  };
  if (!hasTypes(username, userNameType)) {
    response.status(422).end();
    return;
  }

  if (username.length < USERNAME_MIN_LENGTH) {
    validationErrors.push("usernameTooShort");
  } else if (USERNAME_MAX_LENGTH < username.length) {
    validationErrors.push("usernameTooLong");
  }

  if (0 < validationErrors.length) {
    response.status(400).json(validationErrors);
    return;
  }

  db.updateAccountById(id, username, (errors, didExist) => {
    if (errors.length == 0) {
      if (didExist) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    } else {
      response.status(500).end();
    }
  });
});

//delete account
router.delete("/:id", (req, res) => {
  const accountId = req.params.id;
  db.deleteAccountsById(accountId, (errors, accountExisted) => {
    if (errors.length == 0) {
      if (accountExisted) {
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
