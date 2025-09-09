import User from "../models/User.js";

// Sign Up
export const signup = async (req, res) => {
  console.log("Sign Up:", req.body);
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      tapes: user.tapes,
    });
  } catch (err) {
    console.error("Signup error:", err.message); // <-- log error
    res.status(500).json({ message: err.message });
  }
};

// Log In
export const login = async (req, res) => {
  console.log("Log In:", req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate("tapes");
    if (!user) {
      console.log("Login failed: user not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("User found:", user.email);
    console.log("Stored hash:", user.password);
    console.log("Entered password:", password);

    const isMatch = await user.matchPassword(password);
    console.log("Password match?", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      tapes: user.tapes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get user + tapes
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("tapes");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Collect a user's tape
export const collectUserTape = async (req, res) => {
  const { tapeId } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Prevent duplicates
    if (!user.tapes.includes(tapeId)) {
      user.tapes.push(tapeId);
      await user.save();
    }

    const populatedUser = await user.populate("tapes");
    res.json(populatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};