const rootPath = "http://localhost:3000";

const yaml = require("js-yaml");

async function sendRequest(
  method,
  uri,
  body = null,
  contentType = "application/json"
) {
  let bodyToSend = "";
  const headers = new Headers();

  // let accessToken = null;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo && userInfo.accessToken !== null) {
    let accessToken = userInfo.accessToken;
    headers.append("Authorization", "Bearer " + accessToken);
    console.log("giving access");
  }

  // Add the body if available.
  if (body != null) {
    headers.append("Content-Type", contentType);

    switch (contentType) {
      case "application/json":
        bodyToSend = JSON.stringify(body);
        break;

      case "application/x-www-form-urlencoded":
        const data = new URLSearchParams();
        for (const key of Object.keys(body)) {
          data.append(key, body[key]);
        }
        bodyToSend = data.toString();
        break;

      case "application/x-yaml":
        // bodyToSend = yaml.load(req.body);
        bodyToSend = yaml.stringify(body);

        break;

      default:
        console.log("ERROR, unknown Content-Type to send body with.");
    }
  }

  try {
    const requestInit = {
      method,
      headers
    };

    if (bodyToSend != "") {
      requestInit.body = bodyToSend;
    }

    return await fetch(rootPath + uri, requestInit);
  } catch (error) {
    throw ["networkError"];
  }
}

module.exports.sendRequest = sendRequest;
