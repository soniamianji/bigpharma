const express = require("express");
const router = new express.Router();
const db = require("../DB/repositories/accountRepo");
const bcrypt = require("bcrypt");
const hasTypes = require("./has-types");
const jwt = require("jsonwebtoken");
const checkAauth = require("../middleware/check-auth");

// Constants used for validation of resources.
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 10;
const MIN_PASSWORD_LENGTH = 6;

//this has to be saved as environmental variable
const secretTokenKey = "a secret phrase";

//salting the password
const saltRounds = 10;

//User sign up _ creating a new account
router.post("/", (request, response) => {
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
  if (account.email == "") {
    validationErrors.push("Please Enter your email Address.");
  } else if (account.username == "") {
    validationErrors.push("Please Enter your username.");
  } else if (account.username.length < USERNAME_MIN_LENGTH) {
    validationErrors.push("Username is too short.");
  } else if (USERNAME_MAX_LENGTH < account.username.length) {
    validationErrors.push("Username is too long.");
  }

  if (account.password.length < MIN_PASSWORD_LENGTH) {
    validationErrors.push("Please enter password with at least 6 characters.");
  }

  if (0 < validationErrors.length) {
    response.status(400).sendBack(validationErrors);
    return;
  }

  //hash the password
  bcrypt.hash(request.body.password, saltRounds, (err, hash) => {
    if (err) {
      return response.status(500).sendBack({
        error: err
      });
    } else {
      account.password = hash;
      // Try to create the account.
      db.createAccount(account, function(errors, id) {
        if (errors.length == 0) {
          response.setHeader("Location", "/accounts/" + id);
          response.status(201).sendBack({ id });

          console.log(account);
        } else if (errors.includes("emial is taken.")) {
          response.status(400).sendBack(errors);
        } else {
          response.status(500).end();
        }
      });
    }
  });
});

//login to the account
router.post("/token", (req, res) => {
  const grantInfo = req.body;

  // Check that grantInfo contains all expected properties.
  const grantInfoTypes = {
    email: String,
    password: String,
    grant_type: String
  };

  if (!hasTypes(grantInfo, grantInfoTypes)) {
    res.status(400).sendBack({ error: "invalid_request" });
    return;
  }
  // Check that the grant type is supported.
  if (grantInfo.grant_type != "password") {
    res.status(400).sendBack({ error: "unsupported_grant_type" });
    return;
  }

  db.getAccountByEmail(grantInfo.email, (err, account) => {
    if (err.includes("databaseError")) {
      res.status(500).end();
    } else if (!account) {
      res.status(400).sendBack({ error: "invalid_grant" });
    } else if (err.length == 0) {
      //verify hashed password
      bcrypt.compare(grantInfo.password, account.password, function(
        err,
        result
      ) {
        if (result) {
          const access_token = jwt.sign({ id: account.id }, secretTokenKey);
          const id_token = jwt.sign(
            {
              email: account.email,
              username: account.username,
              id: account.id
            },
            secretTokenKey
          );
          const body = {
            message: "Auth Success.",
            id_token: id_token,
            access_token: access_token
          };
          res.status(200).sendBack(body);
        } else {
          res.status(401).sendBack({ error: "invalid_grant" });
        }
      });
    } else {
      res.status(500).end();
    }
  });
});

//get account by id
router.get("/:id", checkAauth, (req, res) => {
  const accountId = req.params.id;
  db.getAccountById(accountId, function(errors, account) {
    if (errors.length == 0) {
      res.status(200).sendBack(account);
    } else {
      res.status(500).end();
    }
  });
});

//update account
router.put("/:id", checkAauth, (req, res) => {
  const id = req.params.id;
  const username = req.body;
  const userNameType = {
    username: String
  };
  const validationErrors = [];

  if (!hasTypes(username, userNameType)) {
    res.status(422).end();
    return;
  }

  if (username.length < USERNAME_MIN_LENGTH) {
    validationErrors.push("usernameTooShort");
  } else if (USERNAME_MAX_LENGTH < username.length) {
    validationErrors.push("usernameTooLong");
  }

  if (0 < validationErrors.length) {
    res.status(400).sendBack(validationErrors);
    return;
  }

  db.updateAccountById(id, username, function(errors, didExist) {
    if (errors.length == 0) {
      res.status(204).end();
    } else {
      res.status(500).end();
    }
  });
});

//delete account
router.delete("/:id", checkAauth, (req, res) => {
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
