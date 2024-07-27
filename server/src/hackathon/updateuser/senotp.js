import { db1 } from "../../db.js";
import { message } from "../message/message.js";
export const SendOtp = async (req, resend, res) => {
    const { regd } = req.body;
    try {
        const user = await db1.collection('Hackathondata').findOne({
            $expr: {
                $eq: [
                    {
                        $replaceAll: {
                            input: {
                                $toUpper: {
                                    $replaceAll: { input: "$Reg_No", find: " ", replacement: "" }
                                }
                            },
                            find: " ",
                            replacement: ""
                        }
                    },
                    regd.toUpperCase().replace(/\s+/g, '')
                ]
            }
        });
        if (!user) {
            return res.json({ error: 'Invalid registration number.' });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        req.session[user?.Gmail] = otp
        const { data, error } = await resend.emails.send({
            from: 'Vedic Vision <hackathon@ast-admin.in>',
            to: [user?.Gmail],
            subject: 'Your OTP for Password Update',
            html: await message.otp(user?.Name, otp, user?.Gmail),
        });
        if (data) {
            res.status(200).json({ message: "OTP successfully sent to your email" });
        }
        if (error) {
            res.status(200).json({ message: error?.message });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Error sending OTP' });
    }
}