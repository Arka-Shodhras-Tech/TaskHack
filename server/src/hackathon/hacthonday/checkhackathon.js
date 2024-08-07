import { db1 } from "../../db.js";

export const CheckHackathon = async (data, res) => {
  try {
    const admin = await db1.collection('Hackathonadmin').findOne({ Gmail: data });
    if (!admin) {
      return res.json({ error: 'Invalid admin' });
    }

    if (admin) {
      return res.json({ start: true,data:admin?.Count, Routes:admin.Routes });
    } else {
      return res.json({ start: false,data:admin?.Count });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error during signin' });
  }
};
