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
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);