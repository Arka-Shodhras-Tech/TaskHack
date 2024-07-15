import { db1 } from "../../db.js";

export const AddFeedback = async(req,res)=>{

    const { user, isInteractive, rating, feedbackmessage, date,type } = req.body;
    if (!user || !isInteractive || !rating || !feedbackmessage || !date || !type) {
      return res.json({ error: true,message:"All fields are required." });
    }
  
    try {
      const existingFeedback = await db1.collection("Feedbacks").findOne({
        user,
        date,
        type
      });
  
      if (existingFeedback) {
        return res.json({ message: "You have already submitted feedback today.",error:true });
      }
  
      const response = await db1.collection("Feedbacks").insertOne({
        user,
        isInteractive,
        rating,
        feedbackmessage,
        date,
        type
      });
  
      res.json({ message: "Feedback added successfully" ,error:false });
    } catch (error) {
      console.error("Error adding feedback:", error);
      res.status(500).json({ error: "Failed to add feedback" });
    }

}