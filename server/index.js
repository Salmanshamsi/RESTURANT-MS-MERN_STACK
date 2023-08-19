import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./routes/User.js";
import dishRoutes from "./routes/Dish.js";
import offerRoutes from "./routes/Offer.js";
import feedbackRoutes from "./routes/Feedback.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
cloudinary.v2.config({
  cloud_name: "dizikuakt",
  api_key: "951227695453944",
  api_secret: "Fr1ccq3WfRoUydXWWoKy5s7NaVk",
});
app.use("upload", express.static("upload"));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
app.use(cookieParser());
// app.use((req, res, next) => {
//   res.setHeader("Set-Cookie", "myCookie=value; Path=/; HttpOnly");
//   next();
// });

/* ROUTES */
app.use("/user", userRoutes);
app.use("/dish", dishRoutes);
app.use("/offer", offerRoutes);
app.use("/feedback", feedbackRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGODBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
