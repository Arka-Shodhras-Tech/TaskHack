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
    await db.collection('Signup').insertOne({ Gmail: req.params.email, Name: req.params.name,Num: req.params.num , Reg_No: req.params.regd, Year: req.params.year, Branch: req.params.branch,section:req.params.sec})
        .then((details) => {
            res.json(details);
            console.log(result)


        })
        .catch((e) => console.log(e))
})




users['123456'] = {
    email: 'user@example.com',
    password: '', // Password will be set when sending the generated password
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/sendPassword', async (req, res) => {
    const { regd } = req.body;
    const user = users[regd];

    if (!user) {
        return res.status(400).json({ message: 'Registration number not found.' });
    }

    const generatedPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    user.password = hashedPassword;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Your Generated Password',
        text: `Your password is ${generatedPassword}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error sending email.' });
        }
        res.status(200).json({ message: 'Password sent to your email.' });
    });
});

app.post('/signin', async (req, res) => {
    const { regd, password } = req.body;
    const user = users[regd];

    if (!user) {
        return res.status(400).json({ message: 'Invalid registration number or password.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(400).json({ message: 'Invalid registration number or password.' });
    }
});








connectToDB(() => {
    app.listen(9889, () => {
        console.log('server Running at port 9889')
    })
}
)