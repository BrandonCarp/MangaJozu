import express, { NextFunction, Request, Response } from "express";
import { AxiosResponse } from "axios";
const axios = require('axios');
const { auth } = require('express-openid-connect');
require("dotenv").config();

const DEV_PORT = process.env.DEV_PORT || 7000;
const cors = require("cors");

const app = express();

const fetchManga = process.env.FETCH_MANGA;
const fetchBerserk = process.env.FETCH_BERSERK;



const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL:  process.env.ISSUER,
};

app.use(auth(config))

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

app.get("/api/home", (req: Request, res: Response) => {
  res.json({ message: "Backend Api Recieved" });
});


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

