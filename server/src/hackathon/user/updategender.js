import { db1 } from "../../db.js";
export const UpdateGender = async (regd,gender, res) => {
    await db1.collection('Hackathondata').findOneAndUpdate({ Reg_No: regd },{$set:{Gender:gender}})
        .then((result) => {
            if (result?.Gender) {
                res.json(result)
            }
        })
        .catch((e) => console.log(e))
}