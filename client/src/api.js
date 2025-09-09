import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Sign up user
export const signupUser = async (userData) => {
  const res = await api.post("/users/signup", userData);
  return res.data;
};

// Log in user
export const loginUser = async (credentials) => {
  const res = await api.post("/users/login", credentials);
  return res.data;
};

// Get user by ID
export const getUserById = async (userId) => {
  const res = await api.get(`/users/${userId}`);
  return res.data;
};

// Get all tapes
export const getAllTapes = async () => {
  const res = await api.get("/tapes");
  return res.data;
};

// Add tape to user's inventory
export const collectTape = async (userId, tapeId) => {
  try {
    const res = await api.post(`/users/${userId}/collect`, { tapeId });
    return res.data; // returns updated user
  } catch (err) {
    console.error("collectTape API error:", err);
    throw err;
  }
};

// Put a tape up for trade
export const offerTrade = async (userId, tapeId) => {
  try {
    const res = await api.post("/trades", {
      offeredBy: userId,
      offeredTape: tapeId,
    });
    return res.data;
  } catch (err) {
    console.error("Error offering trade:", err);
    throw err;
  }
};

// Get all trades
export const getTrades = async () => {
  try {
    const res = await api.get("/trades");
    return res.data;
  } catch (err) {
    console.error("Error fetching trades:", err);
    throw err;
  }
};

// Respond to a trade (user B offering a tape in return)
export const respondToTrade = async (tradeId, userId, tapeId) => {
  try {
    const res = await api.post(`/trades/respond/${tradeId}`, {
      requestedBy: userId,
      requestedTape: tapeId,
    });
    return res.data;
  } catch (err) {
    console.error("respondToTrade API error:", err);
    throw err;
  }
};

// Confirm or reject a trade (user A)
export const confirmTrade = async (tradeId, accept) => {
  try {
    const res = await api.post(`/trades/confirm/${tradeId}`, { accept });
    return res.data;
  } catch (err) {
    console.error("Error confirming/rejecting trade:", err);
    throw err;
  }
};
