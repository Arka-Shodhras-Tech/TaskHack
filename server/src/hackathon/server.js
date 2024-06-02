import cors from "cors";
import crypto from 'crypto';
import express from 'express';
import nodemailer from 'nodemailer';
import { db } from '../db.js';
import { message } from "./message/message.js";
import session from 'express-session'

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.get('/hackathon', async (req, res) => {
    res.send("Ok hacthon");
})

app.use(session({
    secret: 'ast-team',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.get('/set-session', (req, res) => {
    req.session.user = { name: 'John Doe', age: 30 };
    res.send('Session data set');
});

app.get('/get-session', (req, res) => {
    if (req.session.user) {
        res.send(`User: ${req.session.user.name}, Age: ${req.session.user.age}`);
    } else {
        res.send('No session data found');
    }
});



app.post('/signup/:email/:name/:regd/:num/:year/:branch/:section', async (req, res) => {
    const user = await db.collection('Hackathondata').findOne({ Reg_No: req.params.regd });
    if (user?.Reg_No) {
        res.json({ register: "already exist", data: user });
    }
    else {
        await db.collection('Hackathondata').insertOne({ Gmail: req.params.email, Name: req.params.name, Number: req.params.num, Reg_No: req.params.regd, Year: req.params.year, Branch: req.params.branch, Section: req.params.section })
            .then((details) => {
                res.json({ message: "sucess", data: details });
            })
            .catch((e) => console.log(e))
    }
})


// app.get('/hackathon/register',async(req,res)=>{
//     const data=await db.collection('Signup').find().toArray()
//     console.log(data)
// })

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// const name="teja"
// console.log(name.slice(0,1))

app.get('/sendotp/:regd', async (req, res) => {
    try {
        const user = await db.collection('Hackathondata').findOne({ Reg_No: req.params.regd });
        if (!user) {
            return res.json({ error: 'Invalid registration number.' });
        }
        if (user?.Gmail) {
            const crepassword = crypto.randomBytes(4).toString('hex');
            req.session[user?.Gmail]=crepassword
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user?.Gmail,
                subject: "vedic vision hacthon web update password OTP",
                html: await message.html(user?.Name, crepassword, user?.Reg_No),
            })
                .then((details) => res.json({ message: "OTP sucessfully sent to your mail", data: details }))
                .catch((e) => res.json({ errmsg: "Required fileds", error: e }))
        }
    } catch (error) {
        res.status(500).json({ message: 'Error during signin' });
    }
});

app.get('/checkotp/:Gmail',async(req,res)=>{
    const mail=req.params.Gmail
    console.log(req.session[mail])
    res.json(req.session.OTP)
})


app.post('/signin', async (req, res) => {
    const { regd, password } = req.body;
    try {
        const user = await db.collection('Hackathondata').findOne({ Reg_No: regd });
        if (!user) {
            return res.json({ error: 'Invalid registration number.' });
        }
        if (!user.Password) {
            const crepassword = user?.Name.slice(0, 1) + "@" + crypto.randomBytes(3).toString('hex');
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user?.Gmail,
                subject: "vedic vision hacthon web login",
                html: await message.html(user?.Name, crepassword, user?.Reg_No),
            }) && await db.collection('Hackathondata').findOneAndUpdate({ Reg_No: regd }, { $set: { Password: crepassword } })
                .then((details) => res.json({ message: "password sucessfully sent to your mail", data: details }))
                .catch((e) => res.json({ errmsg: "Required fileds", error: e }))
        }
        if (user?.Password === password) {
            res.status(200).json({ passmessage: "login sucessfully", data: user })
        }
        else {
            res.json({ passerror: "incorrect password", data: "data not found" })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signin' });
    }
});


app.post('/updatepasswordlink', async (req, res) => {
    const { regd } = req.body;
    try {
        const user = await db.collection('Hackathondata').findOne({ Reg_No: regd });
        if (!user) {
            return res.json({ error: 'Invalid registration number.' });
        }
        const link = "www.google.com"
        if (user.Gmail) {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user?.Gmail,
                subject: "vedic vision hacthon web password update",
                html: await message.html(user?.Name, link, user?.Reg_No),
            })
                .then((details) => res.json({ message: "update password link sucessfully sent to your mail", data: details }))
                .catch((e) => res.json({ errmsg: "Required fileds", error: e }))
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signin' });
    }
});





export default app