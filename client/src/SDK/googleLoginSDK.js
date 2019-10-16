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

module.exports.googleAuthentication = async function(authCode, callback) {
  let response;
  bodyTosend = {
    code: authCode,
    redirect_uri: "postmessage"
  };

  try {
    response = await sendRequest.sendRequest("POST", "/google", bodyTosend);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

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
        default:
          errors = [body.error];
      }
    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors, account);
};
