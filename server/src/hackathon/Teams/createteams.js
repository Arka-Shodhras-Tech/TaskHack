import { db1 } from "../../db.js";
export const CreateTeam=async(req,res)=>{
    const user = await db1.collection('Hackathondata').findOne({ Team: req.params.team });
    if (user?.Team) {
        res.json({ team: "already exist", data: user });
    }
    else {
        await db1.collection('Hackathondata').insertOne({ Team: req.params.team, Gmail: req.params.gmail, Phone: req.params.phone, Code: req.params.code })
            .then((details) => {
                res.json({ message: "sucess", data: details });
            })
            .catch((e) => console.log(e))
    }
}