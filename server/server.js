import express from 'express';
const app = express();
const port = process.env.PORT || 5000;

// Middleware variables
import dotenv from 'dotenv'; 
dotenv.config({ path: "./config.env" });
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';


// API Routes
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';



// Page Routes
import postsRoute from './routes/posts.js';


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true},
    ()=>{
    console.log("Connected to CogDB");
    }
);


// Middleware 
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);


app.get('/', (req, res) => {
  res.send("Welcome to Cog");
});

// get driver connection
//const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  /*
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  */
  console.log(`Cog server is running on port: ${port}`);
});