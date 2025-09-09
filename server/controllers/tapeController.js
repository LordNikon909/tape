import Tape from "../models/Tape.js";

// Get all tapes
export const getAllTapes = async (req, res) => {
  try {
    const tapes = await Tape.find().populate("owner", "username email");
    res.json(tapes);
  } catch (err) {
    console.error("Failed to fetch tapes:", err);
    res.status(500).json({ message: "Server error" });
  }
};
