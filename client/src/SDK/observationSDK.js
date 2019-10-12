const sendRequest = require("./sendRequest");
const YAML = require("yaml");

module.exports.getObservationsById = async function(id, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("GET", "/observations/" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let observations = null;

  switch (response.status) {
    case 200:
      let yamlObservations = await response.text();
      observations = YAML.parse(yamlObservations);
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

  callback(errors, observations);
};

module.exports.getObservationsByCompoundId = async function(
  compoundId,
  callback
) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "GET",
      "/observations?compoundId=" + compoundId
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let observations = null;

  switch (response.status) {
    case 200:
      let yamlObservations = await response.text();
      observations = YAML.parse(yamlObservations);
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

  callback(errors, observations);
};

module.exports.getObservationsBySurveyId = async function(surveyId, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "GET",
      "/observations?surveyId=" + surveyId
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let observations = null;

  switch (response.status) {
    case 200:
      let yamlObservations = await response.text();
      observations = YAML.parse(yamlObservations);
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

  callback(errors, observations);
};

module.exports.getObservationsBySurveyIdAndCompoundId = async function(
  surveyId,
  compoundId,
  callback
) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "GET",
      "/observations?surveyId=" + surveyId + "&compoundId=" + compoundId
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let observations = null;

  switch (response.status) {
    case 200:
      let yamlObservations = await response.text();
      observations = YAML.parse(yamlObservations);
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

  callback(errors, observations);
};

module.exports.getObservationsByUserIdAndCompoundId = async function(
  userId,
  compoundId,
  callback
) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "GET",
      "/observations?userId=" + userId + "&compoundId=" + compoundId
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let observations = null;

  switch (response.status) {
    case 200:
      let yamlObservations = await response.text();
      observations = YAML.parse(yamlObservations);
      // observations = await response.json();
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

  callback(errors, observations);
};

module.exports.createObservation = async function(observation, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "POST",
      "/observations",
      observation
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let id = -1;

  switch (response.status) {
    case 201:
      const locationHeader = response.headers.get("Location");
      id = parseInt(locationHeader.substr("/observations/".length));
      break;

    case 400:
      errors = await response.json();
      break;

    case 422:
      errors = ["You must select an effect to continue."];
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors, id);
};

module.exports.updateObservationById = async function(
  id,
  observation,
  callback
) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "PUT",
      "/observations/" + id,
      observation,
      "application/x-yaml"
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  switch (response.status) {
    case 204:
      break;

    case 400:
      errors = await response.json();
      break;

    case 422:
      errors = ["invalidObservation"];
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors);
};

module.exports.deleteObservationById = async function(id, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("DELETE", "/observations/" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  switch (response.status) {
    case 204:
      break;

    case 401:
      errors = await response.json();
      break;

    case 404:
      errors = ["notFound"];
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
      break;
  }

  callback(errors);
};
