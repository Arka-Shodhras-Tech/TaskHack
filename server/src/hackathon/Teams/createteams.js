import { db1 } from "../../db.js";
export const CreateTeam = async (req, res) => {
    try {
        await db1.collection('Teams').findOneAndUpdate({TeamCode: parseInt(req.params.code)},{$set:{ Team: req.params.team, Gmail: req.params.gmail, Phone: req.params.phone,Members:req.params.members, Password: req.params.password }})
            .then((details) => {
                if(details?._id){
                    res.json({ message: "sucess", data: details });
                }
            })
            .catch((e) => console.log(e))
    } catch (error) {
        console.log(error)
    }
}