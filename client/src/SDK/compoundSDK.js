const sendRequest = require("./sendRequest");
const YAML = require("yaml");

//get all compounds
module.exports.getAllCompounds = async function(callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("GET", "/compounds");
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let compounds = [];

  switch (response.status) {
    case 200:
      let yamlCompounds = await response.text();
      compounds = YAML.parse(yamlCompounds);
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown status code"];
  }

  callback(errors, compounds);
};

//get compound by id
module.exports.getCompoundById = async function(id, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("GET", "/compounds/" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let compound = null;

  switch (response.status) {
    case 200:
      let yamlCompound = await response.text();
      compound = YAML.parse(yamlCompound);

      break;

    case 404:
      errors = ["notFound"];
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors, compound);
};
