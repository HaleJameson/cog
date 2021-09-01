import express from 'express';
const router = express.Router();

import * as usersController from '../controllers/usersController.js';

router.get("/",(req,res)=>{
    res.send("Users api endpoint");
});


router.put("/:id", usersController.updateUser); // Update User
router.delete("/:id", usersController.deleteUser); // Delete User
router.get("/:id", usersController.getUser); // Get User
router.get("/:id/follow", usersController.followUser); // Follow User
router.get("/:id/unfollow", usersController.unfollowUser); // Unfollow User

export default router;
