const sendRequest = require("./sendRequest");

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
    response = await sendRequest("POST", "/accounts", account);
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
      "application/x-www-form-urlencoded"
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let account = {
    id: -1,
    email: ""
  };

  let body;

  switch (response.status) {
    case 200:
      body = await response.json();

      accessToken = body.access_token;

      const payload = jwtDecode(body.id_token);
      account.id = payload.sub;
      account.email = payload.preferred_email;

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
