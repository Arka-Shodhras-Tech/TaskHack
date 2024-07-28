import { db1 } from "../../db.js";
import { message } from "../message/message.js";
export const UpdatePasswordLink = async (req,resend,res) => {
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
        if (user.Gmail) {
            const { data, error } = await resend.emails.send({
                from: 'Vedic Vision <hackathon@ast-admin.in>',
                to: [user?.Gmail],
                subject: 'vedic vision hackathon web password update',
                html: await message.sendlink(user?.Name, user?.Gmail),
            });
            if (data) {
                res.status(200).json({ message: "OTP successfully sent to your email" });
            }
            if (error) {
                res.status(200).json({ message:error?.message });
            }
        } else {
            return res.json({ error: 'No email address found for this user.' });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signin.' });
    }
}