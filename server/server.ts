import express, { NextFunction, Request, Response } from "express";
import { AxiosResponse } from "axios";
import authApp from './middleware/auth';
// const axios = require('axios');



require("dotenv").config();
const cors = require("cors");
const DEV_PORT = process.env.DEV_PORT || 7000;



const app: express.Application = express();




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

app.use(authApp);

app.listen(DEV_PORT, () => {
  console.log(`Server working on on http://localhost:${DEV_PORT}`);
});




// Get user profile information - 
//  https://manage.auth0.com/dashboard/us/dev-7hi6cohckgtzdhik/applications/EZ75F35tGfx6RNVNWXzQuyz0iai4t0Oa/quickstart/express/steps/4
// app.get('/profile', auth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });







// Relocate below code soon


// app.get("/api/home", (req: Request, res: Response) => {
//   res.json({ message: "Backend Api Recieved" });
// });



// app.get(["/manga/search"], (req: Request, res: Response) => {
//   axios.get(fetchManga)
//     .then(function (Response: AxiosResponse) {
//       res.send(Response.data)
//       console.log(Response.data.data.title);
//     }).catch(function (error: Error) {
//       res.send(error);
//       console.log(error);
//     })
// });

// app.get(["/manga/berserk"], (req: Request, res: Response) => {
//   axios.get(fetchBerserk)
//     .then(function (Response: AxiosResponse) {
//       res.send(Response.data)
//       console.log(Response.data.data.title);
//     }).catch(function (error: Error) {
//       res.send(error);
//       console.log(error);
//     })
// });

