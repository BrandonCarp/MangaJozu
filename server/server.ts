import express, { NextFunction, Request, Response } from "express";
import prisma from "./prisma/client";
import { OpenidRequest } from "express-openid-connect";
import { createUser, deleteUser, updateUser } from "./controllers/userController";
import { fetchAnime} from "./controllers/mangaController";
require("dotenv").config();



const cors = require("cors");
const DEV_PORT = process.env.DEV_PORT || 7000;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const { auth } = require('express-openid-connect');


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


  
   export const app: express.Application = express();
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
  





// export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
//   if (req.oidc.isAuthenticated()) {
//     return next();
//   } else {
//     return res.redirect('/login')
//   }
// }

// User Validation + New User Creation
// app.get("/", async (req: Request, res: Response) => {
//   try {

//     const isAuthenticated = req.oidc.isAuthenticated();
    
//     if (isAuthenticated) {

//       const user  = req.oidc.user;


//       const existingUser = await prisma.customer.findUnique({
//         where: {
    

//           auth0Id: user?.sub, 
//         },
//       });

//       if (existingUser) {
    
//         console.log("User exists in the database:", existingUser);
//       } else {
//         const newUser = {
//           auth0Id: user?.sub,
//           userName: user?.nickname,
//           email: user?.name
//         }
       
//         await createUser(newUser);
       
//         console.log("User inserted into the database");
//       }
//     }

//     res.send(isAuthenticated ? req.oidc.user : "Not logged in");
//   } catch (error) {
//     console.error("Error handling request:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// Delete User Endpoint
app.get("/delete", async (req, res) => {
   try {
    const  auth0Id = await req.oidc.user?.sub;
    if (!auth0Id) {
      throw new Error("User not authenticated or missing auth0Id");
    }
           
       await deleteUser(auth0Id);

       res.send("User deleted successfully");
   } catch (error) {
    console.error("Error Deleting User", error);
    res.status(500).send("Internal Server Error");
   }
})



// general anime pages
app.get(["/anime"], async ( req: Request, res: Response) => {
  const pageNum = req.query.q as string | undefined;
  try {
    const animeResult = await fetchAnime(`https://api.jikan.moe/v4/anime?&limit=25&page=${pageNum}`);
    if (animeResult) {
      res.send(animeResult);
    } else {
      res.status(404).json({ error: 'Not Found', message: 'Resource not found' });
    }
  } catch (error) {
    console.error(`This is a /anime error:`, error);
    res.status(500).json({ error: 'Internal Server Error', message: 'An error occurred' });
  }
});



// anime search endpoint
app.get(["/anime/search"], async (req: Request, res: Response) => {
 const animeTitle = req.query.q as string | undefined;

 try{
  const animeResult = await fetchAnime(`https://api.jikan.moe/v4/anime?q=${animeTitle}`);
      res.send(animeResult)
 } catch (error) {
  console.error(`This is a /anime error:`, error);

}
});

// recommended anime endpoint
app.get(["/anime/recommend"], async (req: Request, res: Response) => {
 
  try{
   const animeResult = await fetchAnime(`https://api.jikan.moe/v4/recommendations/anime`);
       res.send(animeResult)
  } catch (error) {
   console.error(error)
  }
 });


//  top anime endpoint
 app.get(["/anime/top"], async (req: Request, res: Response) => {
 
  try{
   const animeResult = await fetchAnime(`https://api.jikan.moe/v4/top/anime`);
       res.send(animeResult)
  } catch (error) {
   console.error(error)
  }
 });


app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});


app.listen(DEV_PORT, () => {
  console.log(`Server working on on http://localhost:${DEV_PORT}`);
});


