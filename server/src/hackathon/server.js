import cors from "cors";
import crypto from 'crypto';
import express from 'express';
import session from 'express-session';
import nodemailer from 'nodemailer';
import { db1 } from "../db.js";
import { AdminLogin } from "./admin/adminlogin.js";
import { AdminRegister } from "./admin/adminregister.js";
import { CheckHackathon } from "./hacthonday/checkhackathon.js";
import { EndHackathon } from "./hacthonday/hackathonend.js";
import { StartHackathon } from "./hacthonday/hackathonstart.js";
import { message } from "./message/message.js";
import { UploadStudents } from "./studentdata/uploadstudentdata.js";
import { initiateMulter } from "./uploadfile/uploadfile.js";
import { checkUser } from "./user/checkuser.js";
import { UpdateGender } from "./user/updategender.js";

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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/admin-signup', async (req, res) => {
    await AdminRegister(req.body, res);
})

app.post('/start-hackathon', async (req, res) => {
    await StartHackathon(req.body, res);
})

app.post('/end-hackathon', async (req, res) => {
    await EndHackathon(req.body, res);
})

app.post('/admin-signin', async (req, res) => {
    await AdminLogin(req.body, res);
})

app.post('/check-hackathon/:mail', async (req, res) => {
    await CheckHackathon(req.params.mail, res);
})

app.post('/upload-students', initiateMulter(), async (req, res) => {
    await UploadStudents(req.files, res);
})

app.post('/updategender/:regd/:gender', async (req, res) => {
    await UpdateGender(req.params.regd,req.params.gender, res);
})

app.post('/signup/:email/:name/:regd/:num/:year/:branch/:section', async (req, res) => {
    const user = await db1.collection('Hackathondata').findOne({ Reg_No: req.params.regd });
    if (user?.Reg_No) {
        res.json({ register: "already exist", data: user });
    }
    else {
        await db1.collection('Hackathondata').insertOne({ Gmail: req.params.email, Name: req.params.name, Number: req.params.num, Reg_No: req.params.regd, Year: req.params.year, Branch: req.params.branch, Section: req.params.section })
            .then((details) => {
                res.json({ message: "sucess", data: details });
            })
            .catch((e) => console.log(e))
    }
})

app.post('/signin', async (req, res) => {
    const { regd, password } = req.body;
    try {
        const user = await db1.collection('Hackathondata').findOne({ Reg_No: regd });
        if (!user) {
            return res.json({ error: 'Invalid registration number.' });
        }
        if (!user?.Password) {
            const crepassword = user?.Name.slice(0, 1) + "@" + crypto.randomBytes(3).toString('hex');
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user?.Gmail,
                subject: "vedic vision hacthon web login",
                html: await message.html(user?.Name, crepassword, user?.Reg_No),
            }) && await db1.collection('Hackathondata').findOneAndUpdate({ Reg_No: regd }, { $set: { Password: crepassword } })
                .then((details) => res.json({ message: "password sucessfully sent to your mail", data: details }))
                .catch((e) => res.json({ errmsg: "Required fileds", error: e }))
        }
        else if (user?.Password === password) {
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

app.post('/authuser/:regd',async(req,res)=>{
    await checkUser(req.params.regd,res)
})

app.post('/updatepasswordlink', async (req, res) => {
    const { regd } = req.body;
    try {
        const user = await db1.collection('Hackathondata').findOne({ Reg_No: regd });
        if (!user) {
            return res.json({ error: 'Invalid registration number.' });
        }
        if (user.Gmail) {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.Gmail,
                subject: "vedic vision hackathon web password update",
                html: await message.senlink(user?.Name, user?.Gmail),
            }).then(() => { return res.json({ message: "Update password link successfully sent to your email." }) })
                .catch((e) => console.log(e))
        } else {
            return res.json({ error: 'No email address found for this user.' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signin.' });
    }
});

app.post('/sendotp', async (req, res) => {
    const { regd } = req.body;
    try {
        const user = await db1.collection('Hackathondata').findOne({ Reg_No: regd });
        if (!user) {
            return res.json({ error: 'Invalid registration number.' });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        req.session[user?.Gmail] = otp
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user?.Gmail,
            subject: "Your OTP for Password Update",
            html: await message.otp(user?.Name, otp, user?.Gmail),
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP successfully sent to your email" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error sending OTP' });
    }
});

app.post('/updatepassword', async (req, res) => {
    const { regd, email, otp, password } = req.body;
    try {
        if (req.session[email] === otp) {
            const user = await db1.collection('Hackathondata').findOne({ Reg_No: regd });
            if (!user) {
                return res.status(400).json({ error: 'Invalid registration number.' });
            }
            await db1.collection('Hackathondata').updateOne({ Reg_No: regd }, { $set: { Password: password } })
                .then((details) => { res.status(200).json({ message: "Password successfully updated", data: details }); })
                .catch((e) => console.log(e))
        }
        else {
            return res.json({ error: 'otp incorrect' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error updating password' });
    }
});

app.get('/tasks', (req, res) => {
    const tasks = [
        { "title": "Task 1", "description": "solve task1" },
        { "title": "Task 2", "description": "Description for task 2" },
        { "title": "Task 2", "description": "Description for task 3" },
        { "title": "Task 2", "description": "Description for task 4" },
    ];
    res.json(tasks);
});

export default app