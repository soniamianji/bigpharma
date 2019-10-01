const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//middleware
app.use(bodyParser.json());

//parse the yaml

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(cors({ exposedHeaders: ["Location"] }));

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
