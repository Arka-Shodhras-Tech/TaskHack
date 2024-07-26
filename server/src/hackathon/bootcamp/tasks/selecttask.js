import {db1} from '../../../db.js'
export const SelectTask = async (regd, task,marks, desc, day, res) => {
    try {
        const updatetask = await db1.collection("Hackathondata").findOneAndUpdate({ Reg_No: { $regex: new RegExp(`^${regd}$`, 'i')} }, { $push: { [`Tasks.${day}`]: { Task: task, Desc: desc,Marks:marks } } })
        if (updatetask) {
            res.json({message:"Selected",data:updatetask})
        }
    } catch (error) {
        console.log(error)
    }
}

export const UnSelectTask = async (regd, task, day, res) => {
    try {
        const updatetask = await db1.collection("Hackathondata").findOneAndUpdate({Reg_No: { $regex: new RegExp(`^${regd}$`, 'i')} }, { $pull: { [`Tasks.${day}`]: { Task: task } } })
        if (updatetask) {
            res.json({message:"Unselected",data:updatetask})
        }
    } catch (error) {
        console.log(error)
    }
}