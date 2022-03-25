//the server file 
//Description: Initializes the server/mongo 
//By: Stephen Kamino
///Date: Mar 03 2022

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const usersRouter = require("./routes/api/users");
const serviceRouter = require("./routes/Service");
//const reviewRouter = require("./routes/Review");
const config = require("config");
const cors = require("cors");

const app = express();
// Body parser middleware
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
// DB Config
//const db = config.get("mongoURI");
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/FinalProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
// Passport middleware
app.use(passport.initialize());

app.use(cors());

// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", usersRouter);
app.use("/service", serviceRouter);
//app.use("/review", reviewRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
