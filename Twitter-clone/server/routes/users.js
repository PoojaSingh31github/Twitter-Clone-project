import express from 'express';
import { deleteUser, follow, getAllUsers, getUser, unfollow, update } from "../controllers/user.js";
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

//Update user
router.put("/:id", verifyToken, update);
//Get User
router.get("/find/:id", getUser);
// get all user
router.get("/findall", getAllUsers);
//Delete User
router.delete("/:id", verifyToken, deleteUser);
// Follow
router.put("/follow/:id", verifyToken, follow)
//unfollow
router.put("/unfollow/:id", verifyToken, unfollow)


export default router;