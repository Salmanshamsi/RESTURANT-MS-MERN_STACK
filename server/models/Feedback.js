import mongoose from "mongoose";
const feedback = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    discription: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);
const Feedback = mongoose.model("Feedback", feedback);
export default Feedback;
