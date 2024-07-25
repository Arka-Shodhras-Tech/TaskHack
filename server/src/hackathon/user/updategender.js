import { db1 } from "../../db.js";
export const UpdateGender = async (regd, gender, res) => {
    try {
        await db1.collection('Hackathondata').findOneAndUpdate({  Reg_No: { $regex: new RegExp(`^${regd}$`, 'i') }}, { $set: { Gender: gender } })
            .then((result) => {
                if (result?.Gender) {
                    res.json(result)
                }
            })
            .catch((e) => console.log(e))
    } catch (error) {

    }
}