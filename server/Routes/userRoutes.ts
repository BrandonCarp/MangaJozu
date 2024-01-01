import { checkAuth } from "../server";

const express = require('express');

const {
  createCustomer,
deleteUser,
updateUser
} = require('../controllers/createCustomer')


const router = express.router();

router.post("/createUser",  createCustomer)
router.post("/deleteUser", checkAuth, deleteUser)
router.post("/updateUser", checkAuth, updateUser)

module.exports = router;