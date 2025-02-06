import express from "express";
import User from "../Schema/userSchema.js";
import jwt from "jsonwebtoken";
import { JWTEXPIRE, JWTSECRET } from "../config/serverConfig.js";
import bcrypt from "bcrypt";
import { authenticateToken } from "../validator/tokenValidation.js";

const userRouter = express.Router();

//signup user
userRouter.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    //check user already exists or not based on email
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //create new user
    const newUser = new User({
      username: username,
      email: email,
      password: password,
      address: address,
    });

    await newUser.save();

    return res
      .status(200)
      .json({
        message: "User created successfully",
        data: newUser,
        success: true,
        error: {},
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Interval server error",
        data: {},
        success: false,
        error: error,
      });
  }
});

//signIn user
userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //check username exists or not
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials " });
    }

    const isvalidated = await bcrypt.compare(password, existingUser.password);
    if (isvalidated) {
      const payload = [
        {
          username: existingUser.username,
          role: existingUser.role,
          id: existingUser._id,
        },
      ];
      const token = jwt.sign({ payload }, JWTSECRET, { expiresIn: JWTEXPIRE });
      res.status(200).json({
        id: existingUser._id,
        role: existingUser.role,
        token: token,
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials " });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error });
  }
});

//get user details
userRouter.get("/getuserinformation", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update address
userRouter.put("/updateaddress", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address });
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default userRouter;
