# Documentation

## Base URL https://american-elite-market-assignment.onrender.com/api

## Introduction

This assignment is from American Elite Market, a social network API developed using Node.js and MongoDB.

## How To Start Node.js Server

1. Clone the repository or download code from: https://github.com/pratik7262/American-Elite-Market-Assignment .
2. Navigate to the project directory: cd American-Elite-Market-Assignment.
3. Install dependencies: npm install then start the server: npm start.

## End Points

### AUTH End Points

#### 1. Register : /auth/register (Method : POST)

Use for create user. Send data in body using form

##### Body Format

         name: String,
         username: String,
         email: String,
         password: String,
         bio: String,
         image:file

#### Headers

        {
           "Content-Type": "application/json"
        }

#### 2. login : /auth/login (Method : POST)

Use for login user. Send data in body using form

##### Body Format

         username: String,
         password: String,
    Example

        {
            "email": "pratikshinde@example.com",
            "password":"1234567890"
        }

#### Headers

        {
           "Content-Type": "application/json"
        }
