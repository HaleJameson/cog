import express from 'express';
const router = express.Router();

import * as authController from '../controllers/authController.js';

/*
router.get("/register", async (req, res) => {
    res.send("Register api endpoint");
});
*/

router.post('/register', authController.registerUser); // Create/Register New User
router.post("/login", authController.loginUser); // Login User

export default router;