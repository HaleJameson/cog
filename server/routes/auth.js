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
        // create hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create user JSON
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const user = newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json("User not found");
        }


        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(400).json("Wrong password");
        }

        else res.status(200).json("Successfully logged in:");
    } catch (err) {
        console.log(err);
    }

});

module.exports = router;