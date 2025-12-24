const mongoose = require("mongoose");
function connectToDb() { //connects to the database
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);
    });
}
module.exports = connectToDb;