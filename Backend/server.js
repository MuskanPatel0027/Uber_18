//this is the main server file that starts the application
const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routeRoutes = require("./routes/route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routeRoutes);


const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

































//this is the main server file that starts the application
// const http = require("http");
// const app = require("./app");
// const port = process.env.PORT || 3000;

// const server = http.createServer(app);

// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
