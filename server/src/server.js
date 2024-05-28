import cors from "cors";
import express from 'express';
import server1 from './ASTexams/server.js'
import server2 from './hackathon/server.js'
import { connectToDB, db } from './db.js';

const app = express()

app.use(express.json())
app.use(cors())
app.use(server1)
app.use(server2)

app.get('/', async (req, res) => {
    res.send('working');
})

connectToDB(() => {
    app.listen(9899, () => {
        console.log('server Running at port 9899')
    })
}
)
