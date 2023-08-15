import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register new user
// Assuming you have the required imports and configurations for Mongoose, bcrypt, and jwt.

export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;

  try {
    // Check if a user with the same enrollment number (enroll) already exists
    const oldUserEnroll = await UserModel.findOne({ enroll: req.body.enroll });

    if (oldUserEnroll) {
      return res.status(400).json({ message: "User with this enrollment number already exists." });
    }

    // Check if a user with the same username already exists
    const oldUserUsername = await UserModel.findOne({ username: req.body.username });

    if (oldUserUsername) {
      return res.status(400).json({ message: "Username is already taken. Please choose another one." });
    }

    // Create a new user document
    const newUser = new UserModel(req.body);

    // Save the new user to the database
    const user = await newUser.save();

    // Create and sign a JWT token for the newly registered user
    const token = jwt.sign(
      { enroll: user.enroll, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    // Send a response with the user details and the JWT token
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UserSchema and UserModel definitions remain the same as provided in the original code.

// Login User

// Changed
export const loginUser = async (req, res) => {
  const { enroll, password } = req.body;

  try {
    const user = await UserModel.findOne({ enroll: enroll });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { enroll: user.enroll, id: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
