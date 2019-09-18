const rootPath = "http://localhost:3000";

let accessToken = null;

async function sendRequest(
  method,
  uri,
  body = null,
  contentType = "application/json"
) {
  let bodyToSend = "";
  const headers = new Headers();

  // Add the access token if signed in.
  if (accessToken != null) {
    headers.append("Authorization", "Bearer " + accessToken);
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

      default:
        alert("ERROR, unknown Content-Type to send body with.");
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

// function displayError(response) {
//   alert(`
// 		SDK has not been programmed to handle status code ${response.status}
// 		for the last request sent.
// 	`);
// }

module.exports.sendRequest = sendRequest;
