import { db1 } from "../../db.js";

export const CreateTeam = async (req, res) => {
    const { team, gmail, phone, code, members, password } = req.params;

  try {

    // Check if the team name already exists
    const existingTeam = await db1.collection('Teams').findOne({ Team: team });
    if (existingTeam) {
      return res.json({ error: "Team name exists" });
    }

    // Split the members into an array of registration numbers
    const memberDetailsArray = members.split(',').map(detail => detail.trim());

    // Check if any registration number already exists in the database
    const existingMembers = await db1.collection('Teams').find({
      Members: { $in: memberDetailsArray }
    }).toArray();

    if (existingMembers.length > 0) {
      // Collect matching registration numbers
      const matchingNumbers = existingMembers.reduce((acc, team) => {
        team.Members.forEach(member => {
          if (memberDetailsArray.includes(member)) {
            acc.add(member);
          }
        });
        return acc;
      }, new Set());

      return res.json({ 
        error: "One or more registration numbers are already part of another team",
        matchingNumbers: Array.from(matchingNumbers)
      });
    }

    // Add the team to the database if all validations are passed
    const newTeam = await db1.collection('Teams').insertOne({
      Team: team,
      Gmail: gmail,
      Phone: phone,
      TeamCode: parseInt(code),
      Members: memberDetailsArray,
      Password: password
    });

    if (newTeam.insertedId) {
      res.json({ message: "Success", data: newTeam });
    } else {
      res.json({ error: "Failed to create team" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
