import express, { NextFunction, Request, Response } from "express";
import prisma from "./prisma/client";
import { AxiosResponse } from "axios";
// const axios = require('axios');
import { OpenidRequest } from "express-openid-connect";
const { auth } = require('express-openid-connect');
require("dotenv").config();
const cors = require("cors");
const DEV_PORT = process.env.DEV_PORT || 7000;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
import routes from './Routes/routes'
import {handleAuthCallBack} from './controllers/userController'





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
app.use(auth(config));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.oidc.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/login')
  }
}

// Have to connect auth0 to my db while also deleting that user from auth0 when deleting from db!!

app.use('/', checkAuth, routes);

// app.get('/signup', async (req, res) => {
//   try {
//    res.send('SIGN UP woo !')
//   } catch (error) {
//     console.error(`Error during signup`, error)
//   }
// })

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
})

app.get('/callback', async (req, res) => {
     console.log(req.oidc)
     
try {
  const {auth0Id, userName, email} = req.oidc?.user || {};
if(!auth0Id) {
  console.log(`Unable to retrieve user sub from Auth0 Callback`);
  return res.status(500).send("Internal Server Error")
}
await handleAuthCallBack({ auth0Id, userName, email }, req, res);
} catch (error) {
      console.error(`Error`)
     }
 })

// router.get(`/`, async (req: Request, res: Response) => {
//   console.log(req.oidc.isAuthenticated());
//   if(req.oidc && req.oidc.user) {
//     console.log(req.oidc.user.sub)
//     const userInfo = await req.oidc.fetchUserInfo();
//     console.log(userInfo);
//     // const userId = req.oidc.user.sub;
//   }

 
// })




app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});



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

