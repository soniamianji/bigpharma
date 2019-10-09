const sendRequest = require("./sendRequest");
const YAML = require("yaml");
//get all surveys
module.exports.getAllSurveys = async function(callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("GET", "/surveys");
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let surveys = [];

  switch (response.status) {
    case 200:
      let yamlSurveys = await response.text();
      surveys = YAML.parse(yamlSurveys);

      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown status code"];
  }

  callback(errors, accounts);
};

module.exports.getSurveyById = async function(id, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("GET", "/surveys/" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let survey = null;

  switch (response.status) {
    case 200:
      let yamlSurvey = await response.text();
      survey = YAML.parse(yamlSurvey);
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

  callback(errors, survey);
};

module.exports.getSurveyByUserId = async function(userId, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "GET",
      "/surveys?userId=" + userId
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let surveys = null;

  switch (response.status) {
    case 200:
      let yamlSurveys = await response.text();
      surveys = YAML.parse(yamlSurveys);
      break;

    case 404:
      errors = ["userNotFound"];
      break;

    case 401:
      errors = ["Authorization error"];
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors, surveys);
};

module.exports.getSurveyByCompoundId = async function(compoundId, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "GET",
      "/surveys?compoundId=" + compoundId
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let survey = null;

  switch (response.status) {
    case 200:
      let yamlSurvey = await response.text();
      survey = YAML.parse(yamlSurvey);
      break;

    case 404:
      errors = ["notFound"];
      break;

    case 401:
      errors = ["Authorization error"];
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors, survey);
};

module.exports.getSurveyByStatus = async function(status, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "GET",
      "/surveys?status=" + status
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let survey = null;

  switch (response.status) {
    case 200:
      let yamlSurvey = await response.text();
      survey = YAML.parse(yamlSurvey);
      break;

    case 404:
      errors = ["notFound"];
      break;

    case 401:
      errors = ["Authorization error"];
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors, survey);
};

module.exports.createSurvey = async function(survey, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("POST", "/surveys", survey);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let id = -1;

  switch (response.status) {
    case 201:
      const locationHeader = response.headers.get("Location");
      id = parseInt(locationHeader.substr("/surveys/".length));
      break;

    case 400:
      errors = await response.json();
      break;

    case 401:
      errors = ["You are not authorised."];
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors, id);
};

module.exports.updateSurveyById = async function(id, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("PUT", "/surveys/" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  switch (response.status) {
    case 204:
      break;

    case 404:
      errors = ["notFound"];
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = [response];
  }

  callback(errors);
};

module.exports.deleteSurveyById = async function(id, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("DELETE", "/surveys/" + id);
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
