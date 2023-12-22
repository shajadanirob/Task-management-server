const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const port = process.env.PORT || 5000

app.use(cors({
    origin: [
      'http://localhost:5173',
    ],
  }))
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ul0jqdv.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    
    const TaskCollection = client.db('TaskManagement').collection('allTask')



    app.post('/allTask',async(req,res) =>{
        const AllData = req.body;
        const result = await TaskCollection.insertOne(AllData);
        res.send(result)
    })
    
    app.get('/allTask' , async(req,res) =>{
        const result = await TaskCollection.find().toArray()
        res.send(result)
    })
    app.get('/allTask/:userEmail',async (req,res)=>{
        const userEmail = req.params.userEmail
        const result = await TaskCollection.find({userEmail:userEmail}).toArray()
        res.send(result)
    })


    // app.get("/allTask/:userEmail", (req, res) => {
    //     const userEmail = req.params.email; // Assuming you are filtering tasks by user email
    //     // Retrieve tasks for the specific user
    //     const userTasks = tasks.filter((task) => task.email === userEmail);
    //     res.json(userTasks);
    // });
    
    // app.put("/updateTaskOrder/:userEmail", (req, res) => {
    //     const userEmail = req.params.email;
    //     const updatedTaskOrder = req.body.tasks;
    
    //     // Update the task order in your database or in-memory store
    //     // For simplicity, we'll update the order in the local 'tasks' array
    //     tasks = updatedTaskOrder.map((taskId) => tasks.find((task) => task._id === taskId));
    
    //     res.json({ message: "Task order updated successfully" });
    // });

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get("/", (req, res) => {
    res.send("Task-management server is running");
  });
  app.listen(port, () => {
    console.log(`Task-management server is running port ${port}`);
  });
  