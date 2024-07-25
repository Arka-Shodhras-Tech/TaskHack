import { db1 } from "../../db.js";
export const checkUser = async (regd, res) => {
    try {
        await db1.collection('Hackathondata').findOne({ Reg_No:  { $regex: new RegExp(`^${regd}$`, 'i') }})
            .then((result) => {
                if (result?.Reg_No) {
                    res.json({ auth: true, data: result })
                }
            })
            .catch((e) => console.log(e))
    } catch (error) {

    }
}