import mongoose from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        min:2,
        max: 32,
        unique: true,

    },
    id: { 
        type: String,
        unique: true 
    },
    name: { type: String },
    firstName: { type: String },
    last: { type: String },
    email:{
        type: String,
        required: true,
        max:50,
        unique: true
    }, 
    password:{
        type:String,
        required: true, 
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
    }, 
    city: {
        type: String,
        max: 50
    }, 
    from: {
        type: String,
        max: 50
    }
},
{ timestamps: true }
);
export default mongoose.model("User", UserSchema);
//module.exports = mongoose.model("User", UserSchema);