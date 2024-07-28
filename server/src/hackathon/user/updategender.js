import { db1 } from "../../db.js";
import { message } from "../message/message.js";

export const UpdateGender = async (regd, gender, res) => {
    try {
        const result = await db1.collection('Hackathondata').findOneAndUpdate(
            {
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
            },
            { $set: { Gender: gender } },
            { returnOriginal: false } 
        );
        console.log(result);

        if (result) { 
            res.json({message:"success"});
        } else {
            res.json({ message: "Document not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
