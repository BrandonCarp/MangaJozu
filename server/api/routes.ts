import {Request, Response} from 'express';
const express = require('express');
const router = express.Router();

router.get(`/`, (req: Request & {oidc: any}, res: Response) => {
  console.log(req.oidc.isAuthenticated());
  res.render(`index`, {title: `Express Demo`});
})

module.exports = router;