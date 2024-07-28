import { db1 } from "../../../db.js";

export const Tasks = async (res) => {
    try {
        const tasks = await db1.collection("Tasks").find({ "Tasks.Show": true,Show:true }).toArray();
        if (tasks.length > 0) {
            const filteredTasks = tasks.map(task => {
                return {
                    ...task,
                    Tasks: task.Tasks.filter(subTask => subTask.Show === true)
                };
            });
            res.json(filteredTasks);
        } else {
            res.status(404).json({ message: "No tasks found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const StudentTasks = async (res) => {
    try {
        const tasks = await db1.collection("Hackathondata").find().toArray()
        if (tasks.length > 0) {
            res.json(tasks)
        }
    } catch (error) {
        console.log(error)
    }
}