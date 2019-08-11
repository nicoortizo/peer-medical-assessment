# Peer Medical BE Assessment
RESTful API that would allow an application to manage users and
articles.
## Running Locally

#### Prerequisites
* [Git](https://git-scm.com/downloads)
* [Node JS](https://nodejs.org/en/)
* [Mongo DB](https://www.mongodb.com)


#### 1. Clone the repo and install dependencies
```bash
git https://github.com/nicoortizo/peer-medical-assessment.git 
cd peer-medical-assesment
npm install
```

#### 2. Modify the .env file
Modify in /config folder .env files , one for test enviroment and other for dev enviroment.
Set enviroments variables:

PORT: port server

MONGODB_URL= url to connect mongodb

JWT_SECRET=secret used to generate token


#### 3. Startup your MongoDB
Usually this is just: `mongod` on the command line.

#### 4. Start the server
```bash
npm run start
```

To run in development mode setting dev.env with  :
```bash
npm run  dev
```

To run in development mode where code is run via [nodemon](https://nodemon.io) and setting dev.env :
```bash
npm run devmon
```

To run unit tests via [mocha](https://mochajs.org/) and setting test.env :
```bash
npm run test
```
### Api Endpoints
#### Get Token
In order to simulete a real scenario this method generate a dummy JWT token to use then in others endpoints
* **URL**
[GET] /getaccesstoken

#### Create User
* **URL**
[POST] /users
* **Header**
[{"key":"Authorization","value":"Bearer [TOKEN]""}]
* **Request**
```js
{
	"name":string,
	"avatar":string 
}
```
* **Response**
HTTP STATUS CODE: 201
```js
{
    "user": {
        "_id": ObjectId,
        "name": string,
        "avatar": string,
        "createdAt": date,
        "updatedAt": date,
        "__v": 0
    }
}
```

#### Create Article
* **URL**
[POST] /articles
* **Header**
[{"key":"Authorization","value":"Bearer [TOKEN]""}]
* **Body Request**
```js
{
	"userId":ObjectId,
	"title":string,
	"text":srting,
	"tags": Array<string>
}
```
* **Response**
HTTP STATUS CODE: 201
```js
{
    "tags": [
        "articulouno",
        "first",
        "second"
    ],
    "_id": ObjectId,
    "userId": ObjectId,
    "title": "string,
    "text": "string,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
}
```
#### Update Article
* **URL**
[PATCH] /articles/[OBJECTID]
* **Header**
[{"key":"Authorization","value":"Bearer [TOKEN]""}]
* **Body Request**
```js
{
	"userId":ObjectId,
	"title":string,
	"text":srting,
	"tags": Array<string>
}
```
* **Response**
HTTP STATUS CODE: 200
```js
{
    "tags": [],
    "_id": ObjectId,
    "userId": ObjectId,
    "title": "string,
    "text": "string,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
}
```

#### Delete Article
* **URL**
[PATCH] /articles/[OBJECTID]
* **Header**
[{"key":"Authorization","value":"Bearer [TOKEN]""}]
* **Response**
HTTP STATUS CODE: 200
```js
{
    "tags": [
        "articulouno",
        "first",
        "second"
    ],
    "_id": ObjectId,
    "userId": ObjectId,
    "title": "string,
    "text": "string,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
}
```

#### Get Articles
* **URL**
[GET] /articles?tags=[TAG,[TAG]..]
* **Header**
[{"key":"Authorization","value":"Bearer [TOKEN]""}]
* **Response**
HTTP STATUS CODE: 200
```js
[{
    "tags": [],
    "_id": ObjectId,
    "userId": ObjectId,
    "title": "string,
    "text": "string,
    "createdAt": Date,
    "updatedAt": Date,
    "__v": 0
}]
```
