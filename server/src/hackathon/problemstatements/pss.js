import { db1 } from "../../db.js";

export const PSS = async (res) => {
    try {
        const tasks = await db1.collection("ProblemStatements").find().toArray();

        const filteredTasks = tasks.map(task => {
            if (task.Desc && (!task.Users || task.Users.length < 2)) {
                const { Users, ...rest } = task;
                return rest;
            }
            return task;
        });

        if (filteredTasks.length > 0) {
            res.json(filteredTasks);
        } else {
            res.json({ message: "No problem statements available" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
