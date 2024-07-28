import { db1 } from "../../db.js";
export const UpdatePassword = async (req, res) => {
    const { regd, email, otp, password } = req.body;
    try {
        if (req.session[email] === otp) {
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
                return res.status(400).json({ error: 'Invalid registration number.' });
            }
            await db1.collection('Hackathondata').updateOne({
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
            }, { $set: { Password: password } })
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