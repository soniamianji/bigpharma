const express = require("express");
const router = new express.Router();
const { google } = require("googleapis");
// const db = require("../DB/repositories/googleAccountRepo");
const db = require("../DB/repositories/accountRepo");
const secretTokenKey = "a secret phrase";
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
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
      const tokens = res.tokens;
      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2({ version: "v2" });
      return oauth2.userinfo.get();
    })
    .then(userData => {
      console.log(userData.data);
      db.getAccountByGoogleId(userData.data.id, (err, id) => {
        if (!id) {
          const account = {
            username: null,
            email: null,
            password: null,
            googleId: userData.data.id
          };
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
              res.status(200).json({
                message: "Auth Success.",
                id_token: id_token,
                access_token: access_token
              });
            } else {
              console.log("problem creating account" + err);
              res.status(400).end();
            }
          });
        } else {
          console.log(id);
          const access_token = jwt.sign({ id: id }, secretTokenKey);
          const id_token = jwt.sign(
            {
              email: userData.data.email,
              username: userData.data.name,
              id: userData.data.id
            },
            secretTokenKey
          );
          res.status(200).json({
            message: "Auth Success.",
            id_token: id_token,
            access_token: access_token
          });
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
