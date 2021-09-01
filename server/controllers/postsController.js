import PostMessage from '../db/models/Post.js';

export const getPosts = async (req, res) => {

    try {
        const postMessages = await PostMessage.find();


        res.status(200).json(postMessages);
    } catch (err) {
        console.log(err.message)
        res.status(404).json({message: err.message});
    }
};

export const createPost = async (req, res) => {
    const newPost = new PostMessage(req.body);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({message: error.message});

    }
}