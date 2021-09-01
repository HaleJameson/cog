import User from '../db/models/User.js';
import bcrypt from 'bcrypt';


// Create New User
export const createNewUser = async (req, res) => {

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
};

export const loginUser = async (req, res) => {
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

};

