import { db1 } from "../../db.js";

export const checkTechTeam = async (code, password, res) => {
    try {
      const ttm = await db1.collection("TechTeamMembers").findOne({ MemberID: code });
      if (ttm) {
        if (ttm.Password === password) {
            res.send({ message: "Login successful", data: ttm });
        } else {
          res.send({ message: "Incorrect password", error: true });
        }
      } else {
        res.send({ message: "Tech Team Member not found", error: true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };
