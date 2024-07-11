import { db1 } from "../../db.js"

export const JoinHackathon = async (req, res) => {
    const { teamCode, registrationNumber, password } = req.body;

    try {
        const team = await db1.collection("Teams").findOne({ TeamCode: parseInt(teamCode) });

        if (team) {
          
            const member = team.Members.find(member => member === registrationNumber?.toLowerCase());

            if (member) {
                if (team.Password === password) {
                    res.send({ message: "Login successful", data: team });
                } else {
                    res.send({ message: "Incorrect password", error: true });
                }
            } else {
                res.send({ message: "Registration number not found in team members", error: true });
            }
        } else {
            res.send({ message: "Team not found", error: true });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};
