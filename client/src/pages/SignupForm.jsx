import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api";

export default function SignupForm({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signupUser({ username, email, password });
      const user = response.data;

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="main-center">
      <form className='form' onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
