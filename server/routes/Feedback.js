import express from "express";
import {
  addFeedback,
  deleteFeedback,
  updateFeedback,
  getAllFeedback,
} from "../controllers/Feedback.js";
const router = express.Router();
router.post("/addOffer", addFeedback);
router.delete("/deleteOffer", deleteFeedback);
router.put("/updateOffer", updateFeedback);
router.get("/getAllOffer", getAllFeedback);
export default router;
