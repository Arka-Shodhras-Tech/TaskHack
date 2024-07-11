import { db1 } from "../../db.js";
import { message } from "../message/message.js";

export const CreateTeam = async (req, res, resend) => {
  const { team, gmail, phone, code, members, password } = req.params;

  try {
    const existingTeam = await db1.collection('Teams').findOne({ Team: team });
    if (existingTeam) {
      return res.json({ error: "Team name exists" });
    }
    const memberDetailsArray = members.split(',').map(detail => detail.trim());
    const students = await db1.collection("Hackathondata").find({
      Reg_No: { 
        $in: memberDetailsArray.map(regNo => new RegExp(`^${regNo}$`, 'i')) 
      }
    }).toArray();
    if (students.length !== memberDetailsArray.length) {
      const existingMembers = students.map(student => student.Reg_No);
      const missingMembers = memberDetailsArray.filter(member => !existingMembers.includes(member));
      return res.json({ error: "One or more registration numbers are invalid or not found in Hackathon Registrations", matchingNumbers:missingMembers });
    }
    const existingMembers = await db1.collection('Teams').find({ Members: { $in: memberDetailsArray } }).toArray();
    if (existingMembers.length > 0) {
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
    const newTeam = await db1.collection('Teams').insertOne({
      Team: team,
      Gmail: gmail,
      Phone: phone,
      TeamCode: parseInt(code),
      Members: memberDetailsArray,
      Password: password
    });

    if (newTeam.insertedId) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Vedic Vision <hackathon@ast-admin.in>',
          to: [gmail],
          subject: 'Your Team Login Details for Vedic Vision Hackathon',
          html: message.sendTeamLoginDetails(team, parseInt(code), password, memberDetailsArray),
        });

        if (error) {
          console.log("Error sending email:", error);
          return res.json({ message: "Team created but failed to send email", data: newTeam });
        }

        return res.json({ message: "Success", data: newTeam, emailStatus: "Email sent successfully" });
      } catch (emailError) {
        console.log("Email error:", emailError);
        return res.json({ message: "Team created but failed to send email", data: newTeam });
      }
    } else {
      res.json({ error: "Failed to create team" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
