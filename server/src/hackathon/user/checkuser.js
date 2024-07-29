import { db1 } from "../../db.js";

export const checkUser = async (regd, res) => {
    try {
        const result = await db1.collection('Hackathondata').findOne({
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

        if (result?.Reg_No) {
            const { ActivityMarks,InternalMarks, HackActivityMarks, HackInternalMarks,Password, Score,...safeData } = result; 
            res.json({ auth: true, data: safeData });
        } else {
            res.status(404).json({ auth: false, message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
