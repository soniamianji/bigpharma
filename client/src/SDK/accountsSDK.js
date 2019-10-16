const sendRequest = require("./sendRequest");
const jwtDecode = require("jwt-decode");
const YAML = require("yaml");

const account = {
  id: "",
  email: "",
  username: "",
  accessToken: ""
};

//parse info localstorage
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
module.exports.userInfo = userInfo;

module.exports.getAccountById = async function(id, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("GET", "/accounts/" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let account = null;

  switch (response.status) {
    case 200:
      _account = await response.text();
      account = YAML.parse(_account);
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

  callback(errors, account);
};

module.exports.createAccount = async function(account, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("POST", "/accounts", account);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let id = -1;

  switch (response.status) {
    case 201:
      const locationHeader = response.headers.get("Location");
      id = parseInt(locationHeader.substr("/accounts/".length));
      break;

    case 400:
      _errors = await response.text();
      errors = YAML.parse(_errors);
      break;

    case 422:
      errors = ["invalidAccount"];
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors, id);
};

module.exports.logIn = async function(email, password, callback) {
  const bodyToSend = {
    email,
    password,
    grant_type: "password"
  };

  let response;

  try {
    response = await sendRequest.sendRequest(
      "POST",
      "/accounts/token",
      bodyToSend,
      "application/x-www-form-urlencoded"
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  let body;

  switch (response.status) {
    case 200:
      _body = await response.text();
      body = YAML.parse(_body);

      account.accessToken = body.access_token;
      const payload = jwtDecode(body.id_token);
      account.id = payload.id;
      account.email = payload.email;
      account.username = payload.username;
      account.idToken = payload;
      localStorage.setItem("userInfo", JSON.stringify(account));

      break;

    case 400:
      _body = await response.text();
      body = YAML.parse(_body);

      switch (body.error) {
        case "invalid_grant":
          errors = ["Incorrect email or password."];
          break;

        default:
          errors = [body.error];
      }
      break;
    case 401:
      body = await response.json();

      switch (body.error) {
        case "invalid_grant":
          errors = ["Incorrect password."];
          break;

        default:
          errors = ["unknownErrorGettingToken: " + body.error];
      }

      break;

    default:
      errors = response;
  }

  callback(errors, account);
};

module.exports.signOut = async function(callback) {
  account.accessToken = null;
  localStorage.removeItem("userInfo");
  callback();
};

module.exports.deleteAccountById = async function(id, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("DELETE", "/accounts/" + id);
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
      errors = ["unknown error" + erors];
  }

  callback(errors);
};

module.exports.updateAccountById = async function(id, username, callback) {
  let response;
  const bodyToSend = {
    username
  };

  try {
    response = await sendRequest.sendRequest(
      "PUT",
      "/accounts/" + id,
      bodyToSend
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  switch (response.status) {
    case 204:
      const updateduserInfo = JSON.parse(localStorage.getItem("userInfo"));
      updateduserInfo.username = bodyToSend.username;
      localStorage.setItem("userInfo", JSON.stringify(updateduserInfo));
      break;

    case 422:
      errors = ["invalidUsername"];
      break;
    case 400:
      errors = ["username must be at least 3 and at most 10 characters."];
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors);
};
