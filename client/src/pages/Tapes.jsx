import { useEffect, useState } from "react";
import { getUserById, offerTrade } from "../api";
import Tape from "../components/Tape";

export default function Tapes({ user }) {
  const [tapes, setTapes] = useState([]);

  useEffect(() => {
    const fetchTapes = async () => {
      if (!user) return;
      try {
        const userData = await getUserById(user._id);
        setTapes(userData.tapes || []);
      } catch (err) {
        console.error("Error fetching user tapes:", err);
      }
    };
    fetchTapes();
  }, [user]);

  const handleTrade = async (tapeId) => {
    try {
      await offerTrade(user._id, tapeId);
      alert("Tape offered for trade!");
    } catch (err) {
      console.error("Failed to offer trade:", err);
      alert("Could not offer tape for trade");
    }
  };

  return (
    <div>
      <h1>{user.username}'s Collection</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {tapes.map((tape) => (
          <Tape key={tape._id} tape={tape} user={user} onTrade={handleTrade} />
        ))}
      </div>
    </div>
  );
}
