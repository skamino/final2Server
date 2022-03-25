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
  .connect("mongodb+srv://skamino:#AsusWhite123@comp229-a2.pqjcv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));
// Passport middleware

const corsOptions = {
  origin: '*',
  credentials: true
}

app.use(passport.initialize());

app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})

// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", usersRouter);
app.use("/service", serviceRouter);
//app.use("/review", reviewRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
