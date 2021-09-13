import { combineReducers } from "redux";

import posts from "./postsReducer.js";
import authReducer from "./authReducer.js";

export default combineReducers({ posts, authReducer });