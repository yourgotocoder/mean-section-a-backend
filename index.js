//Import your express package
const express = require("express");

//Initialize one express instance
const server = express();

//Add one route for the server to listen to
server.get("/", (req, res) => {
    res.json({ message: "Hello from server"})
})

//Listen on port 3000
server.listen(3000, () => {
    console.log("Server started")
})