import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: String,
    text: String,
    creator: String,
    creator_id: ObjectId, 
    likeCount: {
        type: Number,
        default: 0
    }, 
    createdAt: {
        type: Date,
        default: new Date()
    }
});


export default mongoose.model("Post", PostSchema);