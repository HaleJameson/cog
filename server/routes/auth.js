const User = require("../db/models/User");

const router = require("express").Router();
const bcrypt = require("bcrypt");

router.get("/register", async (req, res) => {

    /*
    // Example of adding user within the code
    var newUser = new User({
        "username": "user",
        "email": "user@gmail.com",
        "password": "password"
    })
    console.log("Before saving user");
    await newUser.save();
    console.log("After saving user");
    */


    res.send("Register api endpoint");

});

// Post New Useer
router.post('/register', async (req, res) => {

    try {
        // create hashed password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create user JSON
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const user = newUser.save();
        res.status(200).send(newUser);
    } catch (err) {
        console.log(err);
        res.send();
    }
});

module.exports = router;