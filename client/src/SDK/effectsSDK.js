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

module.exports.getEffectById = async function(id, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("GET", "/effects/" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let effect = [];

  switch (response.status) {
    case 200:
      let yamlEffect = await response.text();
      effect = YAML.parse(yamlEffect);
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown status code"];
  }

  callback(errors, effect);
};
