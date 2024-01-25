import express, { NextFunction, Request, Response } from "express";
require("dotenv").config();
const cors = require("cors");
const DEV_PORT = process.env.DEV_PORT || 7000;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const { auth } = require('express-openid-connect');


export  function createServer() {
  const config = {
    authRequired: false,
    auth0Logout: true,
    secret: `${CLIENT_SECRET}`,
    baseURL: `${process.env.BASEURL}`,
    clientID: 'EZ75F35tGfx6RNVNWXzQuyz0iai4t0Oa',
    issuerBaseURL: 'https://dev-7hi6cohckgtzdhik.us.auth0.com',
    authorizationParams: {
      response_type: 'code id_token',
      scope: 'openid profile', 
    },
  };
  
  
   const app: express.Application = express();
  // auth router attaches /login, /logout, and /callback routes to the baseURL
  app.use(auth(config));
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type"],
    })
  );
  
  app.set("view engine", "ejs");
  
  app.use(express.urlencoded({ extended: true }));
  
  return app
}

