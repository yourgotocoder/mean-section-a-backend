//Import your express package
const express = require("express");
//Import mongodb driver
const { MongoClient } = require("mongodb");
//Initialize one express instance
const server = express();

//Add one route for the server to listen to
server.use(express.json());

server.post("/add-todo", async (req, res) => {
    const { title } = req.body;
    const client = new MongoClient("mongodb+srv://cse:csesmit123@cluster0.udrw5uh.mongodb.net/?retryWrites=true&w=majority");
    console.log(title);
    await client.connect();
    const db = client.db("todo");
    const collection = db.collection("todo-items");
    await collection.insertOne({title: title});
    res.json({message: "Success"})
})

server.get("/", (req, res) => {
    res.json({ message: "Hello from server"})
})

//Listen on port 3000
server.listen(3000, () => {
    console.log("Server started")
})