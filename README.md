# Documentation

## Hosted link https://american-elite-market-assignment.onrender.com/

## Introduction

This assignment is from American Elite Market, a social network API developed using Node.js and MongoDB.

## How To Start Node.js Server

1. Clone the repository or download code from: https://github.com/pratik7262/American-Elite-Market-Assignment .
2. Navigate to the project directory: cd American-Elite-Market-Assignment.
3. Install dependencies: npm install then start the server: npm start.

## Base URL

1. http://localhoast if you running api in system
2. https://american-elite-market-assignment.onrender.com/ If you using hosted api

## Endpoints

### AUTH Endpoints

#### 1. Register : api/auth/register (Method : POST)

Use for create user. Send data in body using form data

#### Headers

        {
           "Content-Type": "application/json"
        }

##### Body Format

         name: String,
         username: String,
         email: String,
         password: String,
         bio: String,
         image:file

#### 2. login : api/auth/login (Method : POST)

Use for login user. Send data in body using form

##### Headers

        {
           "Content-Type": "application/json"
        }

##### Body Format

         username: String,
         password: String,

    Example

        {
            "email": "pratikshinde@example.com",
            "password":"1234567890"
        }

#### 3. Update user : api/auth/update (Method : PATCH)

Use for updating user. Send updating fields in body as form data

##### Headers

        {
           "Content-Type": "application/json",
            token: //jwt token of user whose data is to be update
        }

##### Body Format

        {
                //Fields Which you want to update in form data
        }

#### 4. Delete user : api/auth/delete (Method : DELETE)

Use for Deleting user.

##### Headers

        {
           "Content-Type": "application/json",
            token: //jwt token of user whose account is to be delete
        }

##### Body Format

        {
                //Fields Which you want to update in form data
        }

### Follow Endpoints

#### 1. Follow or Unfollow User : api/follow/followunfollow/:id (Method : GET)

Use for follow or unfollow user. pass the \_id of user in URL at the place of :id whom do you want to follow.
Send JWT Token in headers as token field of a user who want to follow. No body required

##### Headers

        {
           "Content-Type": "application/json",
            token: //jwt token of user who wants to follow other user
        }

#### 2. Get Followers and Following of User : api/follow/getfollowerfollowing (Method : GET)

Use to get all followers and following list of user. Send jwt token of user whose follow information you need. No body required

##### Headers

        {
           "Content-Type": "application/json",
            token: //jwt token of user whose info you want
        }

### Post Endpoints

#### 1. Create Post /api/post/create (Method : POST)

Use this endpoint to create a post add jwt token in header of user who wants to create post and content in body in json format.

##### Headers

        {
           "Content-Type": "application/json",
            token: //jwt token of user who wants to post
        }

##### Body

        Format
        {
            "content":String
        }

        Example
        {
           "content":"First Post"
        }

#### 2. Get User's Posts : /api/post/getposts (Method : GET)

Use this endpoint to get post of particular user just send jwt token in header. No body require

##### Headers

        {
           "Content-Type": "application/json",
            token: //jwt token of user whose post you want to see
        }

#### 3. Get Posts of Usera Whom particular user follows : /api/post/getfollowedusersposts (Mrthod : GET)

Use this endpoint to get posts of users whom perticular user follows just send jwt token in header. No body require. No Body required

##### Headers

        {
           "Content-Type": "application/json",
            token: //jwt token of user whose following user's posts you want to see
        }

#### 4. Get All Posts : /api/post/getallposts (Mehod: GET)

Use this endpoint to get all posts ever created. No body or headers required

#### 5. Update particular post : /api/post/update/:id (Method : PATCH)

Use this endpoint to update particular post. Pass \_id of post instead of :id in URL and jwt token of user whose post is this in header

##### Headers

        {
           "Content-Type": "application/json",
            token: //jwt token of user whose post is to be update
        }

#### 6. Delete particular post : /api/post/update/:id (Method : PATCH)

Use this endpoint to update particular post. Pass \_id of post instead of :id in URL and jwt token of user whose post is this in header

##### Headers

        {
           "Content-Type": "application/json",
            token: //jwt token of user whose post is to be delete
        }

## Envoirment Variable

### Mongo URI

Replace the connection string as per your convenient or use mongodb+srv://webproject7262:23hWxoBCvGOhHjMI@cluster0.n3dlyuv.mongodb.net/aem1?retryWrites=true&w=majority This string to use sample data

Keep Other Variables same

## Visit My Portfolio[https://pratikshinde.in]
