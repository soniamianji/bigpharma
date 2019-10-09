const sendRequest = require("./sendRequest");
const YAML = require("yaml");
//get all effects

module.exports.getAllEffects = async function(callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("GET", "/effects");
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let effects = [];

  switch (response.status) {
    case 200:
      let yamlEffects = await response.text();
      effects = YAML.parse(yamlEffects);
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown status code"];
  }

  callback(errors, effects);
};
