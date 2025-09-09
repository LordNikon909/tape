import Trade from "../models/Trade.js";
import User from "../models/User.js";
import Tape from "../models/Tape.js";

// List all trades
export const getTrades = async (req, res) => {
  const trades = await Trade.find()
    .populate("offeredBy", "username")
    .populate("offeredTape", "name artist")
    .populate("requestedBy", "username")
    .populate("requestedTape", "name artist");
  res.json(trades);
};

// Offer a trade
export const offerTrade = async (req, res) => {
  const { offeredBy, offeredTape } = req.body;
  const trade = await Trade.create({ offeredBy, offeredTape, status: "pending" });
  res.json(trade);
};

// Respond to a trade
export const respondToTrade = async (req, res) => {
  try {
    const tradeId = req.params.id;
    const { requestedBy, requestedTape } = req.body;

    const trade = await Trade.findById(tradeId);
    if (!trade) return res.status(404).json({ message: "Trade not found" });

    if (trade.status !== "pending") {
      return res.status(400).json({ message: "Trade cannot be responded to" });
    }

    trade.requestedBy = requestedBy;
    trade.requestedTape = requestedTape;
    trade.status = "response_pending";

    await trade.save();
    res.json(trade);
  } catch (err) {
    console.error("respondToTrade error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Confirm or reject a trade (original owner)
export const confirmTrade = async (req, res) => {
  const tradeId = req.params.id;
  const { accept } = req.body; // boolean

  const trade = await Trade.findById(tradeId);
  if (!trade || trade.status !== "response_pending") {
    return res.status(400).json({ message: "Invalid trade or not awaiting confirmation" });
  }

  if (accept) {
    // Swap tapes between users
    const offeredUser = await User.findById(trade.offeredBy);
    const requestedUser = await User.findById(trade.requestedBy);
    const offeredTapeId = trade.offeredTape;
    const requestedTapeId = trade.requestedTape;

    // Remove/add tapes
    offeredUser.tapes = offeredUser.tapes.filter(id => !id.equals(offeredTapeId));
    offeredUser.tapes.push(requestedTapeId);
    await offeredUser.save();

    requestedUser.tapes = requestedUser.tapes.filter(id => !id.equals(requestedTapeId));
    requestedUser.tapes.push(offeredTapeId);
    await requestedUser.save();

    trade.status = "completed";
  } else {
    trade.status = "declined";
  }

  await trade.save();
  res.json(trade);
};
