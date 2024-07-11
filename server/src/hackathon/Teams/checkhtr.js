import { db1 } from "../../db.js";

export const checkHtr = async (code, password, res) => {
    try {
      const htr = await db1.collection("Htrs").findOne({ HtrCode: code });
      if (htr) {
        if (htr.Password === password) {
          if (htr.Status === "active") {
            res.send({ message: "Login successful", data: htr });
          } else {
            res.send({ message: "HTR account is inactive", error: true });
          }
        } else {
          res.send({ message: "Incorrect password", error: true });
        }
      } else {
        res.send({ message: "HTR not found", error: true });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };
