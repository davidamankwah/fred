import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//REGISTER for USER 

export const register = async (req, res) => {
  try {
    const {
      userName,
      emailAddress,
      password,
      profileImage,
      followers,
    } = req.body;

    // Check if the email address is missing or null
    if (!emailAddress) {
      return res.status(400).json({ error: "Email address is required" });
    }

    // Check if the email address already exists
    const existingUser = await User.findOne({ emailAddress });
    if (existingUser) {
      return res.status(400).json({ error: "Email address already in use" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      emailAddress,
      password: passwordHash,
      profileImage,
      followers,
      viewedProfile: Math.floor(Math.random() * 10000),
      impression: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: "Something went wrong during user registration." });
  }
};




export const login = async (req, res) => {
try {
  const { emailAddress, password } = req.body;
  const user = await User.findOne({ emailAddress: emailAddress });
  if (!user) return res.status(400).json({ msg: "User is not found. " }); //users not found

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid login details. " }); //invalid credentials
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  delete user.password;
  res.status(200).json({ token, user });
  
} catch (err) {
  res.status(500).json({ error: err.message });
}
};