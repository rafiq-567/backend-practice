const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000;
// lBe8XdFRWKIIzv9v
const users = [
    { id: 1, name: 'sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'sabnoor', email: 'sabnoor@gmail.com' },
    { id: 3, name: 'sabiha', email: 'sabiha@gmail.com' }
]

app.use(cors())
app.use(express.json())



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        // await client.db('admin').command({ping:1})
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");

        app.get('/users', (req, res) => {
            res.send(users)
        })

        app.post('/users', (req, res) => {
            console.log('users post method')
            console.log(req.body)
            const newUser = req.body;
            newUser.id = users.length + 1;
            //add data to the database
            users.push(newUser)
            res.send(newUser)

        })


        app.delete('/delete/:id', (req, res) => {
            const id = req.params.id;
            console.log('to be deleted', id)
        })

    } finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('server is running')
})




app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})