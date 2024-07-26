import crypto from 'crypto';
import { db1 } from "../../db.js";
import { message } from "../message/message.js";

export const SignIn = async (req, resend, res) => {
    const { regd, password } = req.body;

    try {
        // Create a case-insensitive regex pattern for the registration number
        const user = await db1.collection('Hackathondata').findOne({ Reg_No: { $regex: new RegExp(`^${regd}$`, 'i') } });
        if (!user) {
            return res.json({ error: 'Invalid registration number.' });
        }

        if (!user.Password) {
            const crepassword = user.Name.slice(0, 1) + "@" + crypto.randomBytes(3).toString('hex');
            await resend.emails.send({
                from: 'Vedic Vision <hackathon@ast-admin.in>',
                to: [user.Gmail],
                subject: 'Vedic Vision Hackathon Web Login',
                html: await message.html(user.Name, crepassword, user.Reg_No),
            });

            await db1.collection('Hackathondata').findOneAndUpdate(
                { Reg_No: user.Reg_No },  
                { $set: { Password: crepassword } }
            )
            .then((details) => res.json({ message: "Password successfully sent to your mail", data: details }))
            .catch((e) => res.json({ errmsg: "Required fields", error: e }));
        } else if (user.Password === password) {
            res.status(200).json({ passmessage: "Login successful", data: user });
        } else {
            res.json({ passerror: "Incorrect password", data: "Data not found" });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during sign in' });
    }
}
