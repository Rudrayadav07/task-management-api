const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      message: "Email already in use",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({
    message: "User registered successfully",
    userId: user._id,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
module.exports = { register, login };

// Step 1: Request se data nikalo
//         (name, email, password — req.body me hoga)
//              ↓
// Step 2: Email pehle se exist karta hai?
//         (DB me dhundo)
//              ↓
//         Agar haan → 409 bhejo → STOP
//         Agar nahi → aage jao
//              ↓
// Step 3: Password hash karo
//         (plain text kabhi save nahi karte)
//              ↓
// Step 4: Naya user banao + save karo
//         (DB me store karo)
//              ↓
// Step 5: Response bhejo
//         (201 + message + userId)
