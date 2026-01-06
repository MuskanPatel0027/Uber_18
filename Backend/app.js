const dotenv = require("dotenv");            
dotenv.config();  
const cors = require("cors");
const express = require('express');
const app = express();
const connectToDb = require("./DB/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const cookieParser = require("cookie-parser");

connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.get('/', (req,res) => {
    res.send("hello uber");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;
//