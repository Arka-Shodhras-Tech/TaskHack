import { db1 } from "../db.js";
export const HtrTeamMiddlware = async (req, res, next) => {
    const { code, password } = req.headers;
    try {
        const admin = await db1.collection('Htrs').findOne({ HtrCode: code });
        if (!admin) {
            return res.send({ error: "something went wrong" })
        }
        if (admin?.Password=== password) {
            next()
        }
        else {
            return res.send({ error: "something went wrong" })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Error during signin' });
    }
}