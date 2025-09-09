import mongoose from "mongoose";
const { Schema } = mongoose;

const tapeSchema = new Schema({
  name: { type: String, required: true },
  artist: String,
  genre: String,
  releaseDate: Date,
  fileUrl: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Tape", tapeSchema);
