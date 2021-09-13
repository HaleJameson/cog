import User from '../db/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Create New User
// Not used
export const createNewUser = async (req, res) => {

    try {
        // create hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create user JSON
        const newUser = new User({
            username: req.body.email,
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
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) { return res.status(404).json("User not found"); }


        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json("Wrong password");
        }

        const token = jwt.sign({ email: user.email, id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ result: user, token});

    } catch (err) {
        res.status(500).json("Something went wrong");
        console.log(err);
    }

};

export const registerUser = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) { return res.status(400).json("User already exists"); }

        if (password === confirmPassword ) return res.status(400).json("Passwords do not match");

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ username: email, email, password: hashedPassword, firstName, lastName, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id}, 'test', { expiresIn: '1h' });

        res.status(200).json({ result: result, token});

    }
    catch (err) {
        res.status(500).json("Something went wrong");
        console.log(err);
    }
}

