import cors from "cors";
import express from 'express';
import { connectToDB, db } from './db.js';
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    res.send("Ok continue");
})



  app.post('/signup/:email/:name/:num/:regd/:year/:branch/:section', async (req, res) => {
    await db.collection('Signup').insertOne({ Gmail: req.params.email, Name: req.params.name,Num: req.params.num , Reg_No: req.params.regd, Year: req.params.year, Branch: req.params.branch,section:req.params.sec})
        .then((details) => {
            res.json(details);
            console.log(result)


        })
        .catch((e) => console.log(e))
})
connectToDB(() => {
    app.listen(9889, () => {
        console.log('server Running at port 9889')
    })
}
)