# bigpharma
Bigpharma is a prototype of an app that aim to standardize these experiences into a computable format unto which statistical models can be applied in order to curate the collective experience of these compounds and help the user stay informed in his/her decision-making process. Further it provides a means for the user to share his/her own experience and contribute back to the community, expanding the datasets and improving the accuracy of the statistical results, in essence improving the quality of information the user and the users peers rely on in their respective decision making process.


## Table of Contents
* [Architecture](#architecture)
* [DataBase](db)
* [REST API design](rest)
* [Backend Application](backend)
* [Frontend Application](front)
* [SDK](sdk)

<a name="architecture"></a>
## Architechture
The Bigpharma platform consist of three main components. The frontend application, the backend application and the database. See the figure no.1 below for the illustration of this layered system.
The frontend application communicates with the backend by sending HTTP requests. The backend application receives the https requests and depending on the request’s method (GET, POST, DELETE, PUT), the backend communicates with the database and take the necessary actions. Once the backend has carried out the requests, it sends back HTTP responses to the frontend application. The frontend application never communicates with the database directly.

<a name="db"></a>
## Database
Sqlite3 relational database is used to store and manage data the application which consists of 5 resources. Users, to store the users account information. Compounds, to store the information related to the pharmaceutical. Surveys to store userId, compoundId, time of creation in Unix timestamp format and the status of the survey which indicates whether the survey is completed or not. Every survey contains a set of observation, which is a set of data of every symptom and intensity of the symptoms that the users experienced. These data are stored in the observation table. The symptoms represented in the observations are also stored in Effects table.

<a name="rest"></a>
## REST API design

Headers | 
------------ | 
Create an account | 
Log in to an account | 
Get account by id |
Update account |
Delete account |
Get all compounds |
Get compounds by id |
Get all effects |
Get all observations by Id |
Get observations by compound Id |
Get all observations by user Id and compound Id |
Get observation by survey id |
Create observation |
Update observation |
Delete observation |
Get surveys |
Get surveys by id |
Get surveys by user id |
Get surveys by compound id |
Get surveys by status |
Create survey |
Update surveys |
Delete surveys |

Create an account | 
------------ | 
**Request HTTP/1.1**
POST/accounts
Request.body = email: String, username: String, password: String
Request.header = Accept: application/x-yaml, Content-Type: application/x-yaml | 
**Response HTTP/1.1**
If there are no errors Success status code 201 created
Location: /accounts/1
Content-Type: application/x-yaml
If the request is faulty status code 400 Bad request
Response.body = errors: validationErrors
If the type of the request.body wrong status code 422 unprocessable entity
Response.body = errors: invalidAccount
If there is an error with the server status code 500 Internal Server Error
Response.body = errors: backendError |

Login to an account | 
------------ | 
**Request HTTP/1.1**
POST/accounts/token
Request.body = email=soniamianji1%40gmail.com&password=tester&grant_type=password
Request.header = Accept: application/x-yaml, Content-Type: application/x-www-form-urlencoded |
**Response HTTP/1.1**
If there is no error Success code 200 OK
If the login information is invalid, Error status code 400 validation error
Response.body => errors: validationErrors
Content-type: application/x-yaml
Response.body => error: “Invalid_grant”
If there is a problem with the server Error status code 500 Internal Server Error
Response.body => errors: backendError |

Get account by id| 
------------ | 
**Request HTTP/1.1**
Get/accounts/:id
Request.header = Accept: application/x-yaml, Content-Type: application/x-yaml |
**Response HTTP/1.1**
If there is no error success code 200 OK
Response.body = id: Number username: String email:String Content-type: application/x-yaml
Update account by id - Authorization needed
If there is a problem with the server Error status code 500 Internal Server Error
Response.body => errors: backendError |

Update account by id - Authorization needed | 
------------ | 
**Request HTTP/1.1**
 PUT/accounts /:id
 Request.header = Accept: application/x-yaml
 **Response HTTP/1.1**
Content-Type = application/x-yaml
If there is no error Success code 204 No Content
If the type of the entered value is wrong Error status code 422 unacceptable entity
Response.body => errors: invalidUsername
If there is an error with the form validation Error status code 400 validation error
Response.body => errors: username must be at least 3 and at most 10 characters.
If the user is not authorized Error status code 401 Authorization error
Response.body => msg: “Auth Failed”
If the account to be updated not found Error status code 404 Not found
If there is an error with the server Error status code 500 Internal Server Error
Response.body => errors: backendError |

Delete account by id - Authorization needed |
------------ | 
**Request HTTP/1.1**
DELETE/accounts/:id
Request.header = Accept: application/x-yaml
**Response HTTP/1.1**
Content-Type = application/x-yaml
If there are no errors, then Success code 204 No Content
If the account to be deleted not found, then Error status code 404 Not found
If the user is not authorized Error status code 401 Authorization error
response.body => msg: Auth failed
If there is an error with the server Error status code 500 Internal Server Error
Response.body => errors: backendError |

Get all the compounds |
------------ | 
**Request HTTP/1.1 **
GET/compounds
Request.header = Accept: application/x-yaml
**Response HTTP/1.1 **
If there is no errors Success code 200 OK
Response.body = id: Number name: String indicatioName: String
Content-Type: application/x-yaml
If there is an error with the server Error status code 500 Internal Server Error
Response.body => errors: backendError |

Get compound by id |
------------ | 
**Request HTTP/1.1**
GET/compounds/:id
Request.header = Accept: application/x-yaml
**Response HTTP/1.1**
Get all effects
If there are no errors Success code 200 OK
Response.body => id:Number name:String indicatinName: String
Content-Type: application/x-yaml
If the compound with that Id was not found Error status code 404 Not found
If there is an error with the server Error status code 500 Internal Server Error
Response.body => errors: backendError
 
 Get all effects |
 ------------ |
Request HTTP/1.1 
GET/effects  
Request.header = Accept: application/x-yaml 
Response HTTP/1.1 
If there are no errors Success code 200 OK
Response.body => id:Number name:String indicatinName: String
Content-Type: application/x-yaml
If the compound with that Id was not found Error status code 404 Not found
If there is an error with the server Error status code 500 Internal Server Error
Response.body => errors: backendError
  
Get all effects |
------------ | 
**Request HTTP/1.1**
 GET/effects
 Request.header = Accept: application/x-yaml
 **Response HTTP/1.1**
 If there are no errors Success code 200 OK
 Response.body = id: Number, effectName: String
 Content-Type: application/x-yaml
 If there is an error with the server Error status code 500 Internal Server Error
 Response.body => errors: backendError |
 
 Get observations by compound id |
------------ | 
**Request HTTP/1.1**
GET/observations?compoundId=2
Request.header = Accept: application/x-yaml
**Response HTTP/1.1**
Response.body => id:Number userId:Number compoundId:Number entryTime:Number effectIntensity:Number 
Content-Type: application/x-yaml 
If the resource is not found Error status code 404 Not found 
If there is an error with the server Error status code 500 Internal Server Error 

Get all observations by user id and compound id |
------------ | 
**Request HTTP/1.1 **
GET /observations?compoundId= 2&userId=3  
Request.header = Accept: application/x-yaml
**Response HTTP/1.1 **
If there are no errors Success code 200 OK 
Response.body => id:Number userId:Number compoundId:Number entryTime:Number effectIntensity: Number 
Content-Type: application/x-yaml 
If the resource(s) not found then Error status code 404 Not found 
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError 

 Get observations by survey id  |
------------ |
Request HTTP/1.1 
GET/observations?surveyid=surveyId 
Request.header =  Accept: application/x-yaml
Response HTTP/1.1 
If there are no errors Success code 200 OK 
Response.body = id:Number userId:Number compoundId:Number entryTime:Number effectIntensity: Number 
Content-Type: application/x-yaml 
If the resource(s) is not found Error status code 404 Not found 
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError 

 
Create observation - Authorization needed |
------------ |
Request HTTP/1.1 
POST /observations 
Req.body => id:Number userId:Number compoundId:Number entryTime:Number effectIntensity: Number  Request.header = {Host: http://localhost:3000, Accept: application/x-yaml, Content-Type : application/xyaml 
Response HTTP/1.1 
If there are no errors Success code 201 Created 
Response.body = id:Number userId:Number compoundId:Number entryTime:Number effectIntensity: 
Number  
Location: /observations/2 
Content-Type: application/x-yaml 
If request is faulty Error status 400 Bad request 
Response.body = errors: "Please select an effect from the list" 
If the type of the inputs were wrong Error status 422 Unprocessable Entity |

Update observation -Authorization needed  |
------------ |
Request HTTP/1.1  
request.body = id:Number userId:Number compoundId:Number entryTime: Number effectIntensity:Number 
Request.header =Accept: application/x-yaml, Content-Type : application/ xyaml 
Response HTTP/1.1 
If there are no errors Success code 204 No content 
Content-Type: application/x-yaml 
If faulty request Error status 400 Bad request 
Response.body = errors: "Please select an effect from the list" 
If the type of the inputs were wrong Error status 422 Unprocessable Entity 
Response.body = errors: "Please select an effect from the list" 
If the user is not authorized Error status code 401 Authorization error Response.body = msg: Auth failed.  
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError 

Delete observation Authorization needed |
------------ |
Request HTTP/1.1 
DELETE/observations/:Id 
Request.header = Accept: application/x-yaml, Content-Type : application/ xyaml 
Response HTTP/1.1  
If there are no errors Success code 204 No content 
If the user is not authorized Error status code 401 Authorization error Response.body = msg: Auth failed.  
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError 

 Get surveys |
 ------------ |
Request HTTP/1.1 
GET/surveys 
Request.header = Accept: application/x-yaml 
Response HTTP/1.1 
If there are no errors Status code 200 OK 
Content-Type = application/x-yaml 
Response.body = id:Number compoundId:Number, userId:Number, completed: Number(0 or 1) 
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError 


Get surveys by id |
------------ |
Request HTTP/1.1 
GET/surveys/:id 
Request.header = Host: http://localhost:3000, Accept: application/x-yaml 
Response HTTP/1.1 
If there are no errors Status code 200 OK 
Content-Type = application/x-yaml 
Response.body = id:Number compoundId:Number, userId:Number, completed: Number(0 or 1) Location: /surveys/id 
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError 


Get surveys by user id  |
------------ |
Request HTTP/1.1 
GET/surveys?userId = userId 
Request.header = Host: http://localhost:3000, Accept: application/x-yaml  
Response HTTP/1.1 
Status code 200 OK 
Response.body = id:Number compoundId:Number, userId:Number, completed: Number(0 or 1) 
If the resource was not found Error status code 404 Not found 
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError 


Get surveys by compound id  |
------------ |
Request HTTP/1.1 
GET/compounds/:id 
Request.header = Accept: application/x-yaml  
Response HTTP/1.1 
If there are no errors Success status code 200 OK 
Response.body = id:Number compoundId:Number, userId:Number, completed: Number(0 or 1) 
If the resource was not found Error status code 404 Not found 
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError 

Get surveys by status |
------------ |
Request HTTP/1.1 
GET/surveys?completed=status 
Request.header = Accept: application/x-yaml 
Response HTTP/1.1 
If there are no errors Success status code 200 OK 
Response.body = id:Number compoundId:Number, userId:Number, completed: Number(0 or 1) 
If the resource was not found Error status code 404 Not found 
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError |

Create a survey -Authorization needed |
------------ |
Request HTTP/1.1 
POST/surveys 
Request.header = Accept: application/x-yaml, Content-Type: application/x-yaml 
Request.body => compoundId:Number, userId:Number, completed: Number(0 or 1) 
Response HTTP/1.1 
If there are no errors Success status 201 Created Location: /surveys/id 
Content-Type = application/x-yaml 
If the user is not authorized Error status code 401 Unauthorized  
Response.body => errors: Auth Failed 
If there are issues with the type of request.body Error status code 422 Unauthorized  
Response.body => errors: issues with the type of data 
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError 

 Update survey by id - Authorization needed |
 ------------ |
 Request HTTP/1.1 
PUT/surveys/:id 
Request.header = Host: http://localhost:3000, Accept: application/x-x-yaml, Content-Type: application/xyaml  
Request.body => id: Number compoundId: Number, userId: Number, completed: Number (1 or 0) 
Response HTTP/1.1 
If there are no errors Status code 204 No Content 
Content-Type = application/x-yaml 
If the user is not authorized Error status code 401 Unauthorized  
Response.body => errors: Auth Failed 
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError 

Delete survey by id - Authorization needed |
------------ |
Request HTTP/1.1 
DELETE/surveys/:id 
Request.header = Host: http://localhost:3000, Accept: application/x-yaml  
Response HTTP/1.1 
If there are no errors Status code 204 No Content 
Content-Type = application/x-yaml 
If the resource was not found Error status code 404 Not Found  
If the user is not authorized Error status code 401 Unauthorized  
Response.body => errors: Auth Failed 
If there is an error with the server Error status code 500 Internal Server Error Response.body => errors: backendError 

<a name="back"></a>
## Backend Application 
The backend application is built using Node.js and the express.js framework. Using Express router, resource routes are divided in the backend application. For each resource route, a DB repository is created that contain the necessary functions to communicate with the database.  
 
#### Running the application 
Nodemon npm package is used to watch the code changes on the backend, and the npm package concurrently is used to run the frontend and backend application concurrently. Running the command npm run dev initiate the backend and frontend application at the same time.  
 
##### Security 
When the user sign up the users password is hashed using the bcrypt library withits hash() function and then the hashed password is verified by using compare() function during login.  
 
##### Authentication and Authorization  
After user successfully logs in to their account, two tokens (accessToken and Id Token) are created using the “jsonwebtoken” library. The Id-token which contains id, username, and email address of the user is used in the frontend application to authenticate the user (to know to which account the user has logged in to) and the access token that contains the accountId will be sent back to the backend as proof of the user being signed in to the account. In the backend application, under the middleware folder, a function called check-Auth extracts the access token from the request header and verifies it. This function then, is passed as a second parameter to the resource routes that needs authorization.  If the verification of the token was successful then the request will be carried out, otherwise the user will get a response code of 401 which means the authorization has failed.  
 
##### Enabling CORS  
Initially the browser forbids the frontend application to communicate with the backend due to the same-origin-policy. To enable this communication the cors library is used.  
 
##### Support Multiple Data Formats 
In addition to JSON and www-form-urlencoded, YAML format is also supported. In the fronend application, the default of the requests content-type is set to YAML and before the request is sent, if the request contains body, the request.body is stringified to YAML with the help of the “yaml” NPM package. When the backend application receives a request one of the middleware functions,  checks the content-type header of the request, if the content-type is YAML , then the request.body is parsed and passed to the route functions. The parsing in this section is done with the help of the same NPM package used in the frontend application. In addition, to figure out in which format the response body should be sent back in, another middleware checks the accept header and if it accepts JSON then it sends the response in JSON otherwise it parses the response.body and sends it back in YAML.  
 
##### Third Party Authentication 
In addition to logging in to Bigpharma locally, the user is also able to use their google account to  log in to the application. To enable the communication between the frontend application and google an npm package called vue-google-oauth2 is used. After clicking “Login with Google” the user is presented with a pop-up page where they can sign-in to their google account, then the frontend application receives an Authorization code which is sent to the backend. The backend application, that makes use of the googleapis npm package, now can use that authorization code to send it back to google, if the user sign in was successful then the backend application receives an id token from google that contain user information such as google id, username, email, etc. 
After receiving the user data the backend application checks the database to see if a user with that googleId exists, if it doesn't then a new record with that google-id is created. Now, the idtoken and accessToken can be created and sent back to the frontend.  

<a name="front"></a>
## Frontend Application 
Frontend is built using Vuetify which is a Material UI Component Framework adapted for Vue applications. 
 
To create the charts in the frontend application, the chart.js library is used. 
 
#### Signup/login pages 
User can register and login to their account. User can also login using their google account.  
 
#### Profile Page 
On this page user can change their username and delete their account.  Further, they can see a list of all the surveys they have participated in. By clicking on each of the surveys they will be redirected to the surveys. On the profile page they can also delete the surveys that are not finalized.  
 
#### Nonmember-view compounds page 
A non-member visitor of the site will be able to see a list of the existing compounds, and by clicking any of the compounds, the results (the graph) of the ongoing trials is shown.  
 
#### Member view compound page 
The user who is authenticated in addition to viewing the compounds can also contribute to the survey. By clicking the contribute button, a new survey is created and they will be directed to the observation page.  
 
#### Observation page 
After clicking contribute, the user now can start logging their symptoms on the log observation page. On this page the user can create as many observation entries as they want, the observation boxes contain a time field, effects name (which can be selected from the options), and intensity. After the user submits the first observation, they can now edit, delete or add new observation entries. But the status of all the survey will remain uncompleted. After completing the survey the user can either finalize (by clicking finalize), meaning the status of the survey will set to completed. Once the user has finalized the survey, if the user goes to the compound page for the surveyed compound the user will see the graph has changed because it is now computed using the dataset of the finalized survey.  

<a name="sdk"></a>
## SDK
SDK is the acronym for “Software Development Kit”. The SDK brings together a group of tools that enable the programming of applications. This SDK is intended for maintenance and extension of the applications functionality.  
SDK functions are used in the frontend to communicate with the backend application. The SDK functions are separated by the resources and placed in SDK folder. Within this folder a file named “sendRequest” is created that exports a function which is responsible for appending the accessToken, and if the body available appending the content-type to the header. This function helps to prevent writing repetitive code. Every SDK function uses the sendRequest function to prepare the request and send it to the backend application. See below for the existing SDK functions in the frontend application.  
#### Accounts  
*	Create account (account, callback)  
*	Get account by id (id, callback)  
*	Login (email, password)  
*	Signout (callback)  
*	Get account by email (email, callback)  
*	Update account by id (id, username, callback)  
*	Delete account by id (id, callback)  
*	Google Authentication (authCode, callback)  
#### Surveys  
*	Get all surveys (callback)  
*	Get survey by id (id, callback)  
*	Get survey by UserId (userId, callback)  
*	Get survey by CompoundId (compoundid, callback)  
*	Get survey by Status (status, callback)  
*	Create Survey (survey, callback)  
*	Delete Survey by id (id, callback)  
*	Update Survey by id (id, callback) 
note: updating survey only updates the completion status, therefore no need to send in the updated survey object  
Compounds  
*	Get all compounds (callback)  
*	Get compound by id (id, callback)  
#### Observations  
* Get observation by survey Id (surveyId, callback)  
* Get observation by compound id (compoundid, callback)  
* Get observation by compound id AND user id (userId, compoundId, callback)  
* Create observation (observation, callback)  
* Edit observation by id (id, callback)  
* Get observation by id (id, callback)  
#### Effects  
* Get all effects (callback)  

