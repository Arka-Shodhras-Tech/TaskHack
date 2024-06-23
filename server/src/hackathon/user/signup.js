import { db1 } from "../../db.js";
export const SignUp = async (req,res) => {
    try {
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
    } catch (error) {
        console.log(error)
    }
}