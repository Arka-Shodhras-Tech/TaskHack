import { db1 } from "../../db.js";
export const checkUser = async (regd, res) => {
    await db1.collection('Hackathondata').findOne({ Reg_No: regd })
        .then((result) => {
            if (result?.Reg_No) {
                res.json({ auth: true, data: result })
            }
        })
        .catch((e) => console.log(e))
}