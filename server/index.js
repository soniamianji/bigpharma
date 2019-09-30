const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//middleware
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(cors({ exposedHeaders: ["Location"] }));
// app.use(function(request, response, next) {
//   // Allow client-side JS from the following websites to send requests to us:
//   // (not optimal, for better security, change * to the URI of your frontend)
//   response.setHeader("Access-Control-Allow-Origin", "*");

//   // Allow client-side JS to send requests with the following methods:
//   response.setHeader("Access-Control-Allow-Methods", "*");

//   // Allow client-side JS to send requests with the following headers:
//   // (needed for the Authorization and Content-Type headers)
//   response.setHeader("Access-Control-Allow-Headers", "*");

//   // Allow client-side JS to read the following headers in the response:
//   // (in addition to Cache-Control, Content-Language, Content-Type
//   // Expires, Last-Modified, Pragma).
//   // (needed for the Location header)
//   response.setHeader("Access-Control-Expose-Headers", "*");

//   next();
// });
app.get("/", function(request, response) {
  response.send("Hello, World");
});

const accounts = require("./routes/accounts");
app.use("/accounts", accounts);

const compounds = require("./routes/compounds");
app.use("/compounds", compounds);

const observations = require("./routes/observations");
app.use("/observations", observations);

const effects = require("./routes/effects");
app.use("/effects", effects);

const surveys = require("./routes/surveys");
app.use("/surveys", surveys);

const port = 3000;

app.listen(port, () => console.log(`server is running on port ${port}`));
