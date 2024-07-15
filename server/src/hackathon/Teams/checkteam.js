import { db1 } from "../../db.js"
export const checkTeam = async (code, password, res) => {
    try {
      const team = await db1.collection("Teams").findOne({ TeamCode: parseInt(code) });
      if (team) {
        if (team.Password === password) {
          res.send({ message: "Login successful", data: team });
        } else {
          res.send({ message: "Incorrect password", error: true });
        }
      } else {
        res.send({ message: "User not found", error: true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };


  export const AllTeamCodes = async (req, res) => {
    try {
      const allTeams = await db1.collection("Teams").find(
        {
          $or: [
            { Team: { $exists: false } },
            { Team: { $exists: true, $not: { $type: "string" } } }
          ]
        },
        {
          projection: { Password: 0 }
        }
      ).toArray();
      res.json(allTeams);
    } catch (error) {
      console.error("Error fetching teams:", error);
      res.json({ message: "Error fetching teams", error });
    }
  };
  
