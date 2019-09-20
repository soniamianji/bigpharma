const sendRequest = require("./sendRequest");
const jwtDecode = require("jwt-decode");

const account = {
  id: "",
  email: "",
  username: "",
  accessToken: ""
};

//parse info localstorage
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
module.exports.userInfo = userInfo;

//get all accounts
module.exports.getAllAccounts = async function(callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("GET", "/accounts");
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let accounts = [];

  switch (response.status) {
    case 200:
      accounts = await response.json();
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown status code"];
  }

  callback(errors, accounts);
};

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
      account = await response.json();
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
      errors = await response.json();
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
    password
  };

  let response;

  try {
    response = await sendRequest.sendRequest(
      "POST",
      "/accounts/login-session",
      bodyToSend,
      "application/json"
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  // let account = {
  //   id: -1,
  //   email: "",
  //   username: ""
  // };

  let body;

  switch (response.status) {
    case 200:
      body = await response.json();

      account.accessToken = body.access_token;

      const payload = jwtDecode(body.id_token);
      account.id = payload.id;
      account.email = payload.email;
      account.username = payload.username;
      account.idToken = payload;
      localStorage.setItem("userInfo", JSON.stringify(account));

      break;

    case 401:
      body = await response.json();

      switch (body.error) {
        case "invalid_grant":
          errors = ["Incorrect emai or password."];
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
  accessToken = null;
  localStorage.removeItem("userInfo");
  callback();
};

module.exports.deleteAccountById = async function(id, callback) {
  let response;

  try {
    response = await sendRequest("DELETE", "/accounts/" + id);
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
      errors = ["unknown error"];
  }

  callback(errors);
};
