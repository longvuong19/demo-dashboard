import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

export const getRegister = async (req, res) => {
  try {
    const { name, occupation, email, password, country, phoneNumber } =
      req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      occupation,
      email,
      password: passwordHash,
      country,
      phoneNumber,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email: email });
    if (!userDoc) return res.status(400).json({ message: "User not found!" });

    const isMatchPassword = await bcrypt.compareSync(
      password,
      userDoc.password
    );
    if (!isMatchPassword)
      return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET);
    delete userDoc.password;
    res.status(200).json({ token, userDoc });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
