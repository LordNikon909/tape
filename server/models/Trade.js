import mongoose from "mongoose";
const { Schema } = mongoose;

const tradeSchema = new Schema({
  offeredBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  offeredTape: { type: Schema.Types.ObjectId, ref: "Tape", required: true },

  requestedBy: { type: Schema.Types.ObjectId, ref: "User" }, // set when someone accepts
  requestedTape: { type: Schema.Types.ObjectId, ref: "Tape" }, // the tape requested in return

  status: {
    type: String,
    enum: ["pending", "response_pending", "completed", "cancelled"],
    default: "pending"
  },
}, { timestamps: true });

export default mongoose.model("Trade", tradeSchema);