import express from "express";
import {
  getUserInfoById,
  getUserFollowers,
  modifyFollowerStatus,
  searchUsers,
} from "../controller/user.js"
import { checkToken } from "../middleware/auth.js";

const router = express.Router();

// Get user information by ID
router.get("/:id", checkToken, getUserInfoById);

// Get user's friend list by ID
router.get("/:id/followers", checkToken, getUserFollowers);

// Add or remove a friend for a user
router.patch("/:id/:followerId", checkToken, modifyFollowerStatus);

// Search users by username
router.get('/search/:query',searchUsers);

export default router;
