const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const YAML = require("yaml");

app.use(bodyParser.urlencoded({ extended: true }));
//if contenttype is Yaml modify the req.body
app.use(function(req, res, next) {
  var contype = req.headers["content-type"];
  if (!contype || contype.indexOf("application/x-yaml") == 0) {
    var data = "";
    req.on("data", function(chunk) {
      data += chunk;
    });
    req.on("end", function() {
      req.rawBody = data;
      req.body = YAML.parse(data);
      next();
    });
  } else if (
    !contype ||
    contype.indexOf("application/x-www-form-urlencoded") == 0
  ) {
    bodyParser.urlencoded({ extended: true }); // for parsing
    next();
  }
});

//json bodyparser
app.use(bodyParser.json());
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

// if the it accepts x-yaml modify the res.body
app.use(function(req, res, next) {
  //if request accpts YAML format
  if (req.accepts("application/x-yaml")) {
    //set the content-type to YAML
    res.setHeader("Content-Type", "application/x-yaml");
    //convert the jsonfile to yaml
    res.body = YAML.stringify(res.body);
    console.log(res.body);
    //send the response
    res.status(200).send(res.body);
  } else if (req.accepts("application/json")) {
    res.setHeader("Content-Type", "application/json");
    //send the response
    res.status(200).json(res.body);
  }
});

const port = 3000;

app.listen(port, () => console.log(`server is running on port ${port}`));
