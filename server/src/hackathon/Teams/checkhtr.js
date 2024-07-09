import { db1 } from "../../db.js";

export const checkHtr = async (code, res) => {
    try {
        const existCode = await db1.collection("Htrs").findOne({ HtrCode: code });

        if (existCode) {
            if (existCode.Status === "active") {
                res.send({ message: "Active HTR found", data: existCode });
            } else {
                res.status(403).send({ message: "HTR found but not active", data: existCode });
            }
        } else {
            res.status(404).send({ message: "No HTR found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error", error });
    }
};
