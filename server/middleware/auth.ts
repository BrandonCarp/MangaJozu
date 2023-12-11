import { Request, Response } from 'express';
import { auth } from 'express-openid-connect';

const express = require('express');
const app = express();

const CLIENT_SECRET = process.env.CLIENT_SECRET;



const config = {
  authRequired: false,
  auth0Logout: true,
  secret: `${CLIENT_SECRET}`,
  baseURL: 'http://localhost:8080',
  clientID: 'EZ75F35tGfx6RNVNWXzQuyz0iai4t0Oa',
  issuerBaseURL: 'https://dev-7hi6cohckgtzdhik.us.auth0.com'
};


app.use(auth(config));

// auth router attaches /login, /logout, and /callback routes to the baseURL


// req.isAuthenticated is provided from the auth router
// app.get('/', (req: Request  , res: Response) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// app.get('/logout', (req: Request, res: Response) => {
//   req.logout(); // Clears the user's session
//   res.redirect('/'); // Redirect to the home page or another appropriate page
// });

export default  auth;