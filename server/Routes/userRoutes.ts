import { checkAuth } from "../server";

const express = require('express');

const {
  createUser,
  handleAuthCallBack,
deleteUser,
updateUser
} = require('../controllers/createCustomer')
// Notes
// Think of remaining needed additions on backend / store ? Comments ? 
// Run tests ie: JEST
const router = express.Router();

router.post("/callback", handleAuthCallBack)
router.post("/createUser",  createUser)
router.post("/deleteUser", checkAuth, deleteUser)
router.post("/updateUser", checkAuth, updateUser)

module.exports = router;