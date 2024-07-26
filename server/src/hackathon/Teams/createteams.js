import { db1 } from "../../db.js";
import { message } from "../message/message.js";

export const CreateTeam = async (req, res, resend) => {
  const { team, gmail, phone, code, members, password } = req.params;
  try {
    const memberDetailsArray = members.split(',').map(detail => detail.trim().toUpperCase())
    const students = await db1.collection("Hackathondata").find({
      $expr: {
        $in: [
          { $replaceAll: { input: { $toUpper: { $replaceAll: { input: "$Reg_No", find: " ", replacement: "" } } }, find: " ", replacement: "" } },
          memberDetailsArray
        ]
      }
    }, { projection: { Password: 0 } }).toArray();
    if (students.length !== memberDetailsArray.length) {
      const existingMembers = students.map(student => student.Reg_No?.toUpperCase()?.trim());
      const missingMembers = memberDetailsArray.filter(member => !existingMembers.includes(member));
      console.log(missingMembers)
      return res.json({ error: "One or more registration numbers are invalid or not found in Hackathon Registrations", missingNumbers: missingMembers });
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
    const firstMember = students.find(student => student.Reg_No.toUpperCase() === memberDetailsArray[0]);
    const year = firstMember ? firstMember.Year : "others";
    if (!year) {
      return res.json({ error: "Could not determine the year from the first member's registration number" });
    }
    const existingTeamCode = await db1.collection('Teams').findOne({ TeamCode: parseInt(code) });
    if (typeof (existingTeamCode?.Team) === "string") {
      return res.json({ error: "TeamCode already taken by some one please take another one ", type: "already-taken" });
    }
    if (existingTeamCode) {
      await db1.collection('Teams').updateOne(
        { TeamCode: parseInt(code) },
        { $set: { Team: team, Gmail: gmail, Phone: phone, Members: memberDetailsArray, Password: password, Year: year } }
      );
      try {
        const { data, error } = await resend.emails.send({
          from: 'Vedic Vision <hackathon@ast-admin.in>',
          to: [gmail],
          subject: 'Your Team Login Details for Vedic Vision Hackathon',
          html: message.sendTeamLoginDetails(team, parseInt(code), password, memberDetailsArray),
        });

        if (error) {
          console.log("Error sending email:", error);
          return res.json({ message: "Team updated but failed to send email" });
        }
        return res.json({ message: "Success", emailStatus: "Email sent successfully" });
      } catch (emailError) {
        console.log("Email error:", emailError);
        return res.json({ message: "Team updated but failed to send email" });
      }
    } else {
      return res.json({ error: "TeamCode does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};