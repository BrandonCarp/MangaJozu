// import {Request, Response} from 'express'
// const express = require('express');
// import { auth, requiresAuth } from './auth'
// import { OpenidRequest } from "express-openid-connect";

// const app = express();

// // Requires auth for specific routes
// app.use(
//   auth({
//     authRequired: false,
//   })
// );

// // Anyone can access the homepage
// app.get('/', (req: Request, res: Response) => {
//   res.send('<a href="/admin">Admin Section</a>');
// });

// // requiresAuth checks authentication.
// app.get('/admin', requiresAuth(), (req: Request, res: Response) =>
//   res.send(`Hello this is the admin section.`)
// );

// res.send(`Hello ${req.oidc.user.sub}, this is the admin section.`)


// https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#4-obtaining-access-tokens-to-call-external-apis