//this is the main server file that starts the application
const http = require("http");
const app = require("./app");
const port = process.env.PORT || 4000;
const { initializeSocket } = require('./socket'); // path adjust karo agar folder alag hai

const server = http.createServer(app);

initializeSocket(server); // Initialize socket.io

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
