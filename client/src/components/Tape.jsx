// Tape.jsx
export default function Tape({ tape, onCollect, user, onTrade }) {
  const alreadyCollected = user?.tapes?.some(
    (userTape) =>
      (typeof userTape === "string" ? userTape : userTape._id) === tape._id
  );

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        width: "200px",
      }}
    >
      <h3>{tape.name}</h3>
      <p>by {tape.artist}</p>
      <p>🎹 {tape.genre}</p>
      <p>{new Date(tape.releaseDate).toLocaleDateString()}</p>

      {/* Collect button for browsing */}
      {onCollect && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!alreadyCollected) {
              onCollect(tape._id);
            }
          }}
          disabled={alreadyCollected}
          style={{ marginTop: "0.5rem", marginRight: "0.5rem" }}
        >
          {alreadyCollected ? "Collected" : "Collect"}
        </button>
      )}

      {/* Trade button for inventory */}
      {onTrade && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Are you sure you want to trade this tape?")) {
              onTrade(tape._id);
            }
          }}
          style={{ marginTop: "0.5rem" }}
        >
          Trade
        </button>
      )}
    </div>
  );
}
