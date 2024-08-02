import { db1 } from '../../db.js'
export const SelectProStmt = async (code, number, stmt, desc, res) => {
    try {
        const ps = await db1.collection("ProblemStatements").findOne({ Number: number })
        if (ps?._id) {


            
            if(ps.Users && ps.Users.length >=2){
                return res.json({error:"Problem Statement max limit reached"})

            }
            const updateps = await db1.collection("ProblemStatements").findOneAndUpdate({ Number: number }, { $push: { Users: code } })
            if (updateps?._id) {


                const team = await db1.collection("Teams").findOne({ TeamCode: parseInt(code) })
                if (team?.Team) {
                    const updateuser = await db1.collection("Teams").findOneAndUpdate({ TeamCode: parseInt(code) }, { $set: { PS: { Statement: stmt, Number: number, Desc: desc } } })
                    if (updateuser?._id) {
                        res.json({ message: "selected" })
                    } else {
                        await db1.collection("ProblemStatements").findOneAndUpdate({ Number: number }, { $pull: { Users: [code] } })
                    }
                }
                else {
                    res.json({ error: 'please create team' })
                }
            } else {
                res.json({ error: 'try again' })
            }
        } else {
            res.json({ error: 'statement not found' })
        }
    } catch (error) {
        console.log(error)
    }
}

export const UnSelectProStmt = async (code, number, res) => {
    try {
        const ps = await db1.collection("ProblemStatements").findOne({ Number: number })
        if (ps?._id) {
            const updateps = await db1.collection("ProblemStatements").findOneAndUpdate({ Number: number }, { $pull: { Users: code } })
            if (updateps?._id) {
                const updateuser = await db1.collection("Teams").findOneAndUpdate({ TeamCode: parseInt(code) }, { $unset: { PS: { Number: number } } })
                if (updateuser?._id) {
                    res.json({ message: "unslected" })
                }
            } else {
                res.json({ error: 'try again' })
            }
        } else {
            res.json({ error: 'statement not found' })
        }
    } catch (error) {
        console.log(error)
    }
}

export const PSSC = async (res) => {
    try {
        const pss = await db1.collection("ProblemStatements").findOne({ Statement: "Problem Satement" })
        res.json({ message: "insert sucessfully", data: pss })
    } catch (error) {
        console.log(error)
    }
}