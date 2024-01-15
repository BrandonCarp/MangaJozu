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
import { userDetails } from "./middleware/interface";






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



//  Endpoints

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.oidc.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/login')
  }
}

 


// app.use('/', checkAuth, routes);


// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  console.log(req.oidc.isAuthenticated());
  const isAuthenticated = req.oidc.isAuthenticated();
  const response = isAuthenticated ? req.oidc.user : "Not logged in";
  res.send(response);
});
// dont touch above

// GO OVER BELOW AND UNDERSTAND

// ... middleware and configuration ...

app.get("/", async (req: Request, res: Response) => {
  try {
    console.log(req.oidc.isAuthenticated());
    const isAuthenticated = req.oidc.isAuthenticated();
    
    if (isAuthenticated) {
      // If authenticated, you can access user information from req.oidc.user
      const user  = req.oidc.user;

      // Assuming you have a 'users' table in your database
      // and you want to store or retrieve data based on the user
      const existingUser = await prisma.customer.findUnique({
        where: {
          // Adjust the condition based on your user data and database schema
          auth0Id: user.sub, // Assuming user ID is stored in 'sub'
        },
      });

      if (existingUser) {
        // User exists in the database, you can perform operations
        // or retrieve data associated with the user
        console.log("User exists in the database:", existingUser);
      } else {
        // User does not exist, you can insert the user into the database
        await prisma.customer.create({
          data:  {
            // Adjust the data fields based on your user schema
            auth0Id: user.sub,
            userName: user.nickname,
            // ... other user data ...
          },
        });
        console.log("User inserted into the database");
      }
    }

    res.send(isAuthenticated ? req.oidc.user : "Not logged in");
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  }
});

// // ... other routes and server setup ...


// // Middleware to check if the user is authenticated
// const checkAuth = (req: Request, res: Response, next: NextFunction) => {
//   if (req.oidc.isAuthenticated()) {
//     return next();
//   } else {
//     return res.redirect('/login');
//   }
// };

// // Route for the home page
// app.get("/", checkAuth, async (req: Request, res: Response) => {
//   try {
//     const isAuthenticated = req.oidc.isAuthenticated();
    
//     if (isAuthenticated) {
//       const user = req.oidc.user;

//       const existingUser = await prisma.user.findUnique({
//         where: {
//           id: user.sub,
//         },
//       });

//       if (existingUser) {
//         console.log("User exists in the database:", existingUser);
//       } else {
//         await prisma.user.create({
//           data: {
//             id: user.sub,
//             username: user.nickname,
//           },
//         });
//         console.log("User inserted into the database");
//       }
//     }

//     res.send(isAuthenticated ? req.oidc.user : "Not logged in");
//   } catch (error) {
//     console.error("Error handling request:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Route to display user profile (requires authentication)
// app.get("/profile", checkAuth, (req: Request, res: Response) => {
//   res.render("profile", { user: req.oidc.user });
// });

// // Route to handle user logout
// app.get("/logout", (req: Request, res: Response) => {
//   req.logout(); // Provided by express-openid-connect for logging out
//   res.redirect('/');
// });








// Dont touch below

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});



app.listen(DEV_PORT, () => {
  console.log(`Server working on on http://localhost:${DEV_PORT}`);
});







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

