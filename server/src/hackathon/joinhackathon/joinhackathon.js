import { db1 } from "../../db.js";

export const JoinHackathon = async (req, res) => {
    const { teamCode, registrationNumber, password } = req.body;
const {ischeck} = req.query; 

    try {
        const team = await db1.collection("Teams").findOne({ TeamCode: parseInt(teamCode) });

        if (team) {
            const member = team.Members.find(member => member?.toUpperCase() === registrationNumber?.toUpperCase());

            if (member) {
                if (team.Password === password) {
                    // Exclude specific fields from Rounds
                    const filteredRounds = Object.entries(team.Rounds || {}).reduce((acc, [roundKey, roundValue]) => {
                        const { Marks, ...rest } = roundValue;
                        acc[roundKey] = rest;
                        return acc;
                    }, {});

                    // Create a new team object excluding the unwanted fields
                    const { HackActivityMarks, HackInternalMarks, ...filteredTeam } = team;
                    filteredTeam.Rounds = filteredRounds;
                    if(ischeck==="true"){
                        filteredTeam.Password = "no password for this"
                    }

                    res.send({ message: "Login successful", data: filteredTeam });
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
