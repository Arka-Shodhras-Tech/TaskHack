import { db1 } from "../../db.js";
export const UpdatePassword = async (req, res) => {
    const { regd, email, otp, password } = req.body;
    try {
        if (req.session[email] === otp) {
            const user = await db1.collection('Hackathondata').findOne({ Reg_No: { $regex: new RegExp(`^${regd}$`, 'i') }});
            if (!user) {
                return res.status(400).json({ error: 'Invalid registration number.' });
            }
            await db1.collection('Hackathondata').updateOne({Reg_No: { $regex: new RegExp(`^${regd}$`, 'i')} }, { $set: { Password: password } })
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
}