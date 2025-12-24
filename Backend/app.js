const dotenv = require("dotenv");            
dotenv.config();  
const cors = require("cors");
const express = require('express');
const app = express();
const connectToDb = require("./DB/db");
const userRoutes = require("./routes/user.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectToDb();
app.use(cors());


app.get('/', (req,res) => {
    res.send("hello uber");
});

app.use('/users', userRoutes);

module.exports = app;
//