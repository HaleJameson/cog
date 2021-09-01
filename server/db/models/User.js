const mongoose = require("mongoose");


// User Schema
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min:2,
        max: 32,
        unique: true,

    },
    email:{
        type: String,
        required: true,
        max:50,
        unique: true
    }, 
    password:{
        type:String,
        required: true, 
        min:6
    },
    profilePicture:{
        type: String,
        default:""
    },
    followers:{
        type: Array,
        default:[]
    },
    following:{
        type: Array,
        default:[]
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    desc:{
        type: String,
        max: 50
    }, city: {
        type: String,
        max: 50
    }, from: {
        type: String,
        max: 50
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);