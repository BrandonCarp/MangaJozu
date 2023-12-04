import {Request, Response} from 'express';
const express = require('express');
const router = express.Router();

router.get(`/`, (req: Request & {oidc: any}, res: Response) => {
  console.log(req.oidc.isAuthenticated());
  res.render(`index`, {title: `Express Demo`});
})

module.exports = router;


// Examples below route folder
// itemRoutes.js
// const express = require("express");
// const router = express.Router();

// const {
//     addItem,
//     getAllItems,
//     updateItem,
//     getItem,
// } = require("../controllers/itemController");

// router.post("/addItem", addItem);
// router.get("/getItems", getAllItems);
// router.put("/updateItem", updateItem);
// router.get("/getItem", getItem);

// module.exports = router;


// useRoutes.js
// const express = require("express");
// const {
//     registerUser,
//     getUsers,
//     deleteAllUsers,
//     loginUser,
//     updateUserAddress,
//     getCurrentUser,
// } = require("../controllers/userController");
// const router = express.Router();

// const auth = require("../middleware/auth");

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/getCurrentUser", auth, getCurrentUser);
// router.post("/updateAddress", auth, updateUserAddress);
// router.get("/allUsers", getUsers);
// router.delete("/delete", deleteAllUsers);

// module.exports = router;