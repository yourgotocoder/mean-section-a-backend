//Import your express package
const express = require("express");
//Import mongodb driver
const { MongoClient, ObjectId } = require("mongodb");
//Initialize one express instance
const server = express();

//Add one route for the server to listen to
server.use(express.json());

server.post("/add-todo", async (req, res) => {
    const { title } = req.body;
    console.log(title);
    const client = new MongoClient("mongodb+srv://cse:csesmit123@cluster0.udrw5uh.mongodb.net/?retryWrites=true&w=majority");
    await client.connect();
    const db = client.db("todo");
    const collection = db.collection("todo-items");
    await collection.insertOne({title: title});
    res.json({message: "Success"})
});

server.get("/todo-items", async (req, res) => {
    const client = new MongoClient("mongodb+srv://cse:csesmit123@cluster0.udrw5uh.mongodb.net/?retryWrites=true&w=majority");
    await client.connect();
    const db = client.db("todo");
    const collection = db.collection("todo-items");
    const data = await collection.find().toArray();
    res.json(data);
})

server.patch("/edit-todo", async (req, res) => {
    const { id, newTodoTitle } = req.body;
    console.log(id);
    const client = new MongoClient("mongodb+srv://cse:csesmit123@cluster0.udrw5uh.mongodb.net/?retryWrites=true&w=majority");
    await client.connect();
    const db = client.db("todo");
    const collection = db.collection("todo-items");
    await collection.findOneAndUpdate({_id: new ObjectId(id)}, {
        $set: {
            title: newTodoTitle
        }
    })
    res.json({message: "Success"})
})

server.get("/", (req, res) => {
    res.json({ message: "Hello from server"})
})

//Listen on port 3000
server.listen(3000, () => {
    console.log("Server started")
})