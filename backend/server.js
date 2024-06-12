//configure express
const express = require("express");
//configure dotenv
const dotenv = require("dotenv");
//configure cors
const cors = require('cors');
//configure monngodb
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
//configure port
//const port = 3000;
const port = 6002;


//routes
const authRouter = require('./routes/auth')
const userRouter = require("./routes/user")
const restaurantRouter = require("./routes/restaurant")

//initialize dotenv
dotenv.config();

//initialize firebase
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

//firebase

// Allow requests from all origins
const allowedOrigins = ['http://localhost:19000', 'http://localhost:19001', 'http://localhost:6002']; // Add your frontend URL here

app.use(cors({
  origin: allowedOrigins
}));

//setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.get("/", (req, res) => res.send("Hello World!"));

//Endpoints
app.use('/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/restaurant', restaurantRouter);



app.listen(process.env.PORT || port, () =>
  console.log(`Multivendor app listening on port ${process.env.PORT}!`)
);


//Your server setup (server.js) initializes Express, connects to MongoDB, initializes Firebase Admin SDK, and sets up routes. 



