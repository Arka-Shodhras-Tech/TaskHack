import cors from "cors";
import express from 'express';
import { connectToDB, db } from './db.js'
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    res.send("Ok continue");
})



app.post('/signup/:email/:name/:num/:regd/:year/:branch/:section', async (req, res) => {
    await db.collection('Signup').insertOne({ Gmail: req.params.email, Name: req.params.name, Number: req.params.num, Reg_No: req.params.regd, Year: req.params.year, Branch: req.params.branch, section: req.params.sec })
        .then((details) => {
            res.json(details);
            console.log(result)
        })
        .catch((e) => console.log(e))
})




const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/sendPassword', async (req, res) => {
    const { regd } = req.body;

    try {
        const user = await db.collection('Signup').findOne({ Reg_No: regd });

        if (!user) {
            return res.status(400).json({ message: 'Registration number not found.' });
        }

        const generatedPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);
        await db.collection('Signup').updateOne({ Reg_No: regd }, { $set: { Password: hashedPassword } });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.Gmail,
            subject: 'Your Generated Password',
            text: `Your password is ${generatedPassword}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email.' });
            }
            res.status(200).json({ message: 'Password sent to your email.' });
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error sending password' });
    }
});

app.post('/signin', async (req, res) => {
    const { regd, password } = req.body;

    try {
        const user = await db.collection('Signup').findOne({ Reg_No: regd });

        if (!user) {
            return res.status(400).json({ message: 'Invalid registration number.' });
        }

        const validPassword = await bcrypt.compare(password, user.Password);
        if (validPassword) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(400).json({ message: 'Invalid registration number or password.' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signin' });
    }
});




connectToDB(() => {
    app.listen(9889, () => {
        console.log('server Running at port 9889')
    })
}
)