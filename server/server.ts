import express, { NextFunction, Request, Response } from "express";
import { AxiosResponse } from "axios";
const axios = require('axios');
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
require("dotenv").config();
const cors = require("cors");
const DEV_PORT = process.env.DEV_PORT || 7000;
const API_IDENTIFIER = process.env.API_IDENTIFIER;
const BASE_DOMAIN = process.env.BASE_DOMAIN;

const app = express();

const fetchManga = process.env.FETCH_MANGA;
const fetchBerserk = process.env.FETCH_BERSERK;


const checkJwt = auth({
  audience: `${API_IDENTIFIER}`,
  issuerBaseURL: `${BASE_DOMAIN}`,
  tokenSigningAlg: 'HS512',
});




app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);


app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

app.listen(DEV_PORT, () => {
  console.log(`Server working on on http://localhost:${DEV_PORT}`);
});

// Auth0 Testing 

// Private 
app.get('/api/private', checkJwt, function(req: Request, res: Response) {
  res.json({ message: `Testing Private Endpoint ^.^`})
})

// Scoped endpoint
const checkScopes = requiredScopes('read:messages');

app.get('/api/private-scoped', checkJwt, checkScopes, function(req: Request, res: Response) {
  res.json({
    message: `This is the private scoped endpoint ^.^`
  })
})
app.get("/api/home", (req: Request, res: Response) => {
  res.json({ message: "Backend Api Recieved" });
});








// Relocate below code soon
app.get(["/manga/search"], (req: Request, res: Response) => {
  axios.get(fetchManga)
    .then(function (Response: AxiosResponse) {
      res.send(Response.data)
      console.log(Response.data.data.title);
    }).catch(function (error: Error) {
      res.send(error);
      console.log(error);
    })
});

app.get(["/manga/berserk"], (req: Request, res: Response) => {
  axios.get(fetchBerserk)
    .then(function (Response: AxiosResponse) {
      res.send(Response.data)
      console.log(Response.data.data.title);
    }).catch(function (error: Error) {
      res.send(error);
      console.log(error);
    })
});

