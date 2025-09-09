import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Tapes from "./Tapes";

export default function Landing() {
  const [user, setUser] = useState(null); // null = not logged in

  if (!user) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Tape Trader</h1>
        <div style={{ display: "flex", gap: "2rem" }}>
          <LoginForm setUser={setUser} />
          <SignupForm setUser={setUser} />
        </div>
      </div>
    );
  }

  // User is logged in
  return (
    <div style={{ padding: "2rem" }}>
      <h1>{user.username}'s Tapes</h1>
      <Tapes userId={user._id} />
    </div>
  );
}
