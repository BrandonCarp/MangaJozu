import { checkAuth } from "../server";

const express = require('express');

const {
  createUser,
deleteUser,
updateUser
} = require('../controllers/createCustomer')


const router = express.router();

router.post("/createUser",  createUser)
router.post("/deleteUser", checkAuth, deleteUser)
router.post("/updateUser", checkAuth, updateUser)

module.exports = router;