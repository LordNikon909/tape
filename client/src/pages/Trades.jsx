import { useEffect, useState } from "react";
import { getTrades, respondToTrade, confirmTrade } from "../api";
import { getUserById } from "../api";

export default function Trades({ user }) {
  const [trades, setTrades] = useState([]);
  const [userTapes, setUserTapes] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [selectedTapeId, setSelectedTapeId] = useState("");

  // Fetch current user's tapes
  const fetchUserTapes = async () => {
    if (!user) return;
    try {
      const userData = await getUserById(user._id);
      setUserTapes(userData.tapes || []);
    } catch (err) {
      console.error("Failed to fetch user tapes:", err);
    }
  };

  // Fetch all trades
  const fetchTrades = async () => {
    const data = await getTrades();
    setTrades(data);
  };

  useEffect(() => {
    fetchUserTapes();
    fetchTrades();
  }, [user]);

  const openOfferModal = (trade) => {
    setSelectedTrade(trade);
    setSelectedTapeId(""); // Reset selection
  };

  const handleOfferSubmit = async () => {
    if (!selectedTapeId || !selectedTrade) return;

    try {
      await respondToTrade(selectedTrade._id, user._id, selectedTapeId);
      alert("Your tape has been offered for trade!");
      setSelectedTrade(null);
      fetchTrades();
    } catch (err) {
      console.error(err);
      alert("Failed to offer tape for trade.");
    }
  };

  const handleConfirm = async (trade, accept) => {
    try {
      await confirmTrade(trade._id, accept);
      fetchTrades();
    } catch (err) {
      console.error(err);
      alert("Failed to confirm trade.");
    }
  };

  return (
    <div>
      <h2>Trades</h2>

      <ul>
        {trades.map((t) => {
          const isOriginalOwner = t.offeredBy._id === user._id;
          const isCounterUser = t.requestedBy?._id === user._id;

          const originalOwner = t.offeredBy;
          const counterUser = t.requestedBy;
          const originalTape = t.offeredTape;
          const counterTape = t.requestedTape;

          return (
            <li key={t._id} style={{ marginBottom: "1rem" }}>
              {/* Pending: initial offer, no counter yet */}
              {t.status === "pending" && (
                <>
                  <strong>{originalOwner.username}</strong> offers{" "}
                  <em>{originalTape.name}</em>
                  {!isOriginalOwner && (
                    <button
                      onClick={() => openOfferModal(t)}
                      style={{ marginLeft: "1rem" }}
                    >
                      Offer Tape in Return
                    </button>
                  )}
                </>
              )}

              {/* Response pending: counter-offer exists */}
              {t.status === "response_pending" && (
                <>
                  <strong>{counterUser.username}</strong> offers{" "}
                  <em>{counterTape?.name}</em> in exchange for{" "}
                  <strong>{originalOwner.username}</strong>'s{" "}
                  <em>{originalTape?.name || "??"}</em>

                  {/* Only original owner can accept/reject the counter-offer */}
                  {isOriginalOwner && (
                    <>
                      <button
                        onClick={() => handleConfirm(t, true)}
                        style={{ marginLeft: "1rem" }}
                      >
                        Accept Trade
                      </button>
                      <button
                        onClick={() => handleConfirm(t, false)}
                        style={{ marginLeft: "0.5rem" }}
                      >
                        Reject Trade
                      </button>
                    </>
                  )}
                </>
              )}

              {/* Completed trades */}
              {t.status === "completed" && (
                <span>
                  <strong>{originalOwner.username}</strong> exchanged{" "}
                  <em>{originalTape.name}</em> for{" "}
                  <strong>{counterUser.username}</strong>'s{" "}
                  <em>{counterTape.name}</em>
                </span>
              )}

              {/* Cancelled trades */}
              {t.status === "cancelled" && <span> - Cancelled</span>}
            </li>
          );
        })}
      </ul>


      {/* Modal for offering tape */}
      {selectedTrade && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: "300px",
            }}
          >
            <h3>Offer a Tape in Return</h3>
            <p>
              You are responding to{" "}
              <strong>{selectedTrade.offeredBy.username}</strong>’s offer:{" "}
              <em>{selectedTrade.offeredTape.name}</em>
            </p>
            <select
              value={selectedTapeId}
              onChange={(e) => setSelectedTapeId(e.target.value)}
              style={{ width: "100%", marginBottom: "1rem" }}
            >
              <option value="">-- Select a tape --</option>
              {userTapes.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
            >
              <button onClick={() => setSelectedTrade(null)}>Cancel</button>
              <button onClick={handleOfferSubmit} disabled={!selectedTapeId}>
                Confirm Offer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
