import { Router } from 'express';

import { createUser, deleteUser, updateUser } from '../controllers/userController';
import { checkAuth } from '../server';

const router = Router();


router.post("/createUser", createUser);
router.post("/deleteUser", checkAuth, deleteUser);
router.post("/updateUser", checkAuth, updateUser);

export default router;