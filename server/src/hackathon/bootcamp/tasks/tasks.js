import { db1 } from "../../../db.js"

export const Tasks = async (res) => {
    try {
        const tasks = await db1.collection("Tasks").find().toArray()
        if (tasks.length > 0) {
            res.json(tasks)
        }
    } catch (error) {
        console.log(error)
    }
}

export const StudentTasks = async (res) => {
    try {
        const tasks = await db1.collection("Hackathondata").find({},{projection:{Password:0, ActivityMarks:0,InternalMarks:0, HackActivityMarks:0, HackInternalMarks:0}}).toArray()
        if (tasks.length > 0) {
            res.json(tasks)
        }
    } catch (error) {
        console.log(error)
    }
}