const router = require("express").Router();

const User = require("../db/models/User");

const bcrypt = require("bcrypt");
const { MongoCursorInUseError } = require("mongodb");

router.get("/",(req,res)=>{
    res.send("Users api endpoint");
});


// update user
router.put("/:id", async (req, res) => {
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
                return res.status(403).json("Account not found");
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


});

// delete user
router.delete("/:id", async (req, res) => {
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


});

// Get user
router.get("/:id", async (req, res) => {
  
    try {
        const user = await User.findById({ _id: req.params.id});
        const {password, updatedAt, ...other} = user._doc;

        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }

});

// Follow User
router.get("/:id/follow", async (req, res) => {
  
    if (req.body.userId !== req.params.id) {
        
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user || !currentUser) {
                return res.status(403).json("Could not find user");
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


});

// Unfollow User
router.get("/:id/unfollow", async (req, res) => {
  
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


});

module.exports = router;