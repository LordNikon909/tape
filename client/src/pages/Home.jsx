import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tape from "../components/Tape";
import { getAllTapes, collectTape } from "../api";

export default function Home({ user, setUser }) {
  const [tapes, setTapes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTapes() {
      try {
        const allTapes = await getAllTapes();
        setTapes(allTapes);
      } catch (err) {
        console.error("Failed to fetch tapes:", err);
      }
    }

    fetchTapes();
  }, []);

  const handleCollect = async (tapeId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const updatedUser = await collectTape(user._id, tapeId);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert(`You collected "${tapes.find(t => t._id === tapeId).name}"!`);
    } catch (err) {
      console.error("Failed to collect tape:", err);
      alert("Could not collect tape");
    }
  };

  return (
    <div>
      <h1>Tape Trader</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {tapes.map((tape) => (
          <Tape key={tape._id} tape={tape} user={user} onCollect={handleCollect} />
        ))}
      </div>
    </div>
  );
}
