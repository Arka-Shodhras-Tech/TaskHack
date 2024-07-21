import { db1 } from "../../db.js";
export const UpdateTechTeamMemberStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await db1.collection('TechTeamMembers').updateOne({ MemberID: id }, { $set: { Status: status } })
            .then(() => {
                res.json({ message: "Success" });
            })
            .catch((e) => {
                console.log(e);
                res.status(500).json({ message: "Error", error: e });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error", error });
    }
};


export const AllTechTeamMembers = async (res) => {
  try {
    const allTechTeamMembers = await db1
      .collection("TechTeamMembers")
      .find({}, { projection: { Password: 0 } })
      .toArray();
    if (allTechTeamMembers) {
      res.json(allTechTeamMembers);
    }
  } catch (error) {
    console.error("Error fetching tech team members:", error);
    res.json({ error: "Internal Server Error" });
  }
};


