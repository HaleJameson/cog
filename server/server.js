const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Middleware variables
const dotenv = require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

// Routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true},
    ()=>{
    console.log("Connected to CogDB");
    }
);


// Middleware 
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

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