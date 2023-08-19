import express from "express";
import {
  AllCategories,
  CreateDish,
  UpdateDish,
  deleteDish,
  getDish,
} from "../controllers/Dish.js";
import singleUpload from "../middleware/Multer.js";
const router = express.Router();
router.post("/createDish", singleUpload, CreateDish);
router.get("/getDishes", getDish);
router.delete("/deleteDish", deleteDish);
router.put("/updateDish", singleUpload, UpdateDish);
router.get("/categories", AllCategories);
export default router;
