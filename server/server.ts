import express, {NextFunction, Request, Response} from "express";
require("dotenv").config();

const DEV_PORT = process.env.DEV_PORT || 7000;
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));


app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
  next()
})

app.listen(DEV_PORT, () => {
  console.log(`Application is listening on http://localhost:${DEV_PORT}`)
})