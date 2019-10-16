const express = require("express");
const router = new express.Router();
const { google } = require("googleapis");
const db = require("../DB/repositories/accountRepo");
const secretTokenKey = "a secret phrase";
const jwt = require("jsonwebtoken");

router.post("/", (req, res) => {
  console.log("hola");
  const code = req.body.code;
  const oauth2Client = new google.auth.OAuth2(
    "915574057626-gsaemb5fgstrn2fr3kf8h46r8oirmfau.apps.googleusercontent.com",
    "i8804cmoSWmpw5MHC0315yQE",
    "postmessage"
  );
  google.options({ auth: oauth2Client });

  oauth2Client
    .getToken(code)
    .then(res => {
      console.log("hola");
      const tokens = res.tokens;
      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2({ version: "v2" });
      return oauth2.userinfo.get();
    })
    .then(userData => {
      console.log("hola");
      console.log(userData.data);
      //check if user has already logged in with their googleAccount
      db.getAccountByGoogleId(userData.data.id, (err, account) => {
        if (!account) {
          const account = {
            username: null,
            email: null,
            password: null,
            googleId: userData.data.id
          };
          //if no account found then create a new account
          db.createAccount(account, (err, id) => {
            if (err.length == 0) {
              console.log(id);
              const access_token = jwt.sign({ id: id }, secretTokenKey);
              const id_token = jwt.sign(
                {
                  email: userData.data.email,
                  username: userData.data.name,
                  id: id
                },
                secretTokenKey
              );
              res.status(200).sendBack({
                message: "Auth Success.",
                id_token: id_token,
                access_token: access_token
              });
            } else {
              console.log("problem creating account" + err);
              res.status(400).end();
            }
          });
        } else if (account) {
          console.log(account);
          const access_token = jwt.sign({ id: account.id }, secretTokenKey);
          const id_token = jwt.sign(
            {
              email: userData.data.email,
              username: userData.data.name,
              id: account.id
            },
            secretTokenKey
          );
          res.status(200).sendBack({
            message: "Auth Success.",
            id_token: id_token,
            access_token: access_token
          });
        } else {
          res.status(500).end();
        }
      });
      //save google id in db
      //check if the user with this google id exist if not create a new one.
      //create the jwt for the user
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
