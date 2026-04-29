const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000;


app.use(cors())

app.get('/', (req, res) => {
    res.send('server is running')
})

const users = [
    { id: 1, name: 'sabana', email: 'sabana@gmail.com' },
    { id: 2, name: 'sabnoor', email: 'sabnoor@gmail.com' },
    { id: 3, name: 'sabiha', email: 'sabiha@gmail.com' }
]

app.get('/users',(req,res)=>{
    res.send(users)
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})