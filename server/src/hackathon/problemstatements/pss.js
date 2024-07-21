import { db1 } from "../../db.js";

export const PSS = async (req, res) => {
    const { teamcode } = req.query;

    try {
        let IdealFor;

        // Check if the teamcode is "admin"
        if (teamcode === "admin") {
            IdealFor = "admin"; // Special case for admin to fetch all problem statements
        } else {
            // Find the team using the provided team code
            const team = await db1.collection("Teams").findOne({ TeamCode: parseInt(teamcode) });

            if (team) {
                const year = team.Year;

            
                if (year == 2) {
                    IdealFor = "2";  
                } else {
                    IdealFor = "others";  
                }
            } else {
                return res.status(404).json({ message: "Team not found" });
            }
        }

        // Fetch problem statements based on IdealFor value
        let tasks;
        if (IdealFor === "2" || IdealFor === "admin") {
            tasks = await db1.collection("ProblemStatements").find({}).toArray();  
        } else {
            tasks = await db1.collection("ProblemStatements").find({ IdealFor }).toArray();  
        }

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
