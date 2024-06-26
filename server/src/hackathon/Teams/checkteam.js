import { db1 } from "../../db.js"
export const checkTeam=async(code,res)=>{
    try {
        const existcode = await db1.collection("Teams").findOne({ TeamCode: parseInt(code) })
        if(existcode?._id){
            res.send({message:"user found",data:existcode})
        }
    } catch (error) {
        console.log(error)
    }
}

export const AllTeamCodes = async (res) => {
    const allteams = await db1.collection("Teams").find().toArray()
    if (allteams) {
        res.json(allteams)
    }
}