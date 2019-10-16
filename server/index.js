const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const YAML = require("yaml");

//json bodyparser
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

//if contenttype is Yaml modify the req.body
app.use(function(req, res, next) {
  var contype = req.headers["content-type"];
  if (!contype || contype.indexOf("application/x-yaml") === 0) {
    var data = "";
    req.on("data", function(chunk) {
      data += chunk;
    });
    req.on("end", function() {
      req.rawBody = data;
      req.body = YAML.parse(data);
      next();
    });
  } else {
    next();
  }
});

//modify response.body
app.use(function(req, res, next) {
  res.sendBack = function(resource) {
    if (req.accepts("application/json")) {
      res.setHeader("Content-Type", "application/json");
      //send the response
      res.json(resource);
    } else {
      // send the reponse in yaml format which is a default format,
      res.setHeader("Content-Type", "application/x-yaml");
      //convert the jsonfile to yaml
      res.body = YAML.stringify(resource);
      //send the response
      res.send(res.body);
    }
  };
  next();
});

//enable cors
app.use(cors({ exposedHeaders: ["Location"] }));

//redirects all the resource reqs to its own route
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

const google = require("./routes/google");
app.use("/google", google);

const port = 3000;

app.listen(port, () => console.log(`server is running on port ${port}`));
