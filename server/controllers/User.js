import User from "../models/User.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import generateToken from "../utils/GenerateToken.js";
import Dish from "../models/Dish.js";
import Offer from "../models/Offer.js";
import getDataUri from "../middleware/DataUri.js";
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";

dotenv.config();
const Login = async (req, res) => {
  try {
    const { email, password } = req?.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "All data is required",
      });
    }
    const LoginUser = await User.findOne({ email });
    if (LoginUser) {
      const comparePassword = await bcrypt.compare(
        password,
        LoginUser?.password
      );
      if (comparePassword) {
        const token = generateToken(LoginUser);
        const { _id, name, email, role, createdAt, updatedAt, __v } = LoginUser;
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        return res.status(200).json({
          _id,
          name,
          email,
          role,
          createdAt,
          updatedAt,
          __v,
        });
      } else {
        res.status(404).json({
          message: "Invalid email or password",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};
const Signup = async (req, res) => {
  try {
    const file = req?.file;
    const { name, email, password, role } = req?.body;
    if (!email || !password || !role || !name || !file) {
      return res.status(401).json({
        message: "All data is required",
      });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(401).json({ message: "User already exist" });
    } else {
      const fileUri = getDataUri(file);
      const myCloud = await cloudinary.v2.uploader.upload(fileUri?.content);
      const convertPasswordIntoHash = await bcrypt.hash(password, 10);
      const userObj = {
        email,
        password: convertPasswordIntoHash,
        name,
        role,
        image: {
          public_id: myCloud?.public_id,
          url: myCloud?.url,
        },
        cart: [],
      };
      const newUser = await User.create(userObj);
      if (newUser) {
        const { _id, email, role, name } = newUser;
        const token = generateToken({ _id, email, name, role });
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        return res.status(200).json(newUser);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const GetAllUser = async (req, res) => {
  try {
    const allUser = await User.find({ role: "user" }).select("-password");
    if (allUser) {
      return res.status(200).json(allUser);
    }
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const GetAllAdmin = async (req, res) => {
  try {
    const allAdmin = await User.find({ role: "admin" }).select("-password");
    if (allAdmin) {
      return res.status(200).json(allAdmin);
    }
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getDashboardData = async (req, res) => {
  try {
    const allUserLength = await User.find({ role: "user" }).select("-password");
    const allAdmin = await User.find({ role: "admin" }).select("-password");
    const allDish = await Dish.find({});
    const allOffer = await Offer.find({});
    res
      .status(200)
      .json([
        allUserLength?.length,
        allDish?.length,
        allOffer?.length,
        allAdmin?.length,
      ]);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

const getUserDetail = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded?._id;
    const currentUser = await User.find({ _id: userId });
    return res.status(200).json(currentUser);
  } catch (ex) {
    res.status(400).json({ message: "Invalid token." });
  }
};

const Logout = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};
export {
  Login,
  Signup,
  GetAllUser,
  GetAllAdmin,
  getDashboardData,
  getUserDetail,
  Logout,
};
