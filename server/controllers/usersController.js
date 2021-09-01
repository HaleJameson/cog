import User from '../db/models/User.js';
import bcrypt from 'bcrypt';


// Update User
export const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            });

            //console.log(user);
            if (!user) {
                return res.status(404).json("Account not found");
            }


            res.status(200).json("Account updated");
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }


    } 

    else {
        return res.status(403).json("You can not update this account");
    }

};

// Delete User
export const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        
        try {
            await User.findByIdAndDelete({ _id: req.params.id});

            res.status(200).json("Account deleted successfully" );
        } catch (err) {
            return res.status(500).json(err);
        }


    } 

    else {
        return res.status(403).json("You can not delete this account");
    }


};


// Get User
export const getUser = async (req, res) => {
  
    try {
        const user = await User.findById({ _id: req.params.id});
        const {password, updatedAt, ...other} = user._doc;

        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }

};


// Follow User
export const followUser = async (req, res) => {
  
    if (req.body.userId !== req.params.id) {
        
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user || !currentUser) {
                return res.status(404).json("Could not find user");
            }

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne( {$push: {followers:req.body.userId} });
                await currentUser.updateOne( {$push: {following:req.params.id} });
                return res.status(200).json("User has been followed");
            } else {
                return res.status(403).json("You already follow this account");
            }


        } catch (err) {
            //console.log(err);
            return res.status(500).json(err);
        }


    } 

    else {
        return res.status(403).json("You can not follow yourself");
    }


};


// Unfollow User
export const unfollowUser = async (req, res) => {
  
    if (req.body.userId !== req.params.id) {
        
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user || !currentUser) {
                return res.status(403).json("Could not find user");
            }

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne( {$pull: {followers:req.body.userId} });
                await currentUser.updateOne( {$pull: {following:req.params.id} });
                return res.status(200).json("User has been unfollowed");
            } else {
                return res.status(403).json("You are not following this account");
            }


        } catch (err) {
            //console.log(err);
            return res.status(500).json(err);
        }


    } 

    else {
        return res.status(403).json("You can not unfollow yourself");
    }


};