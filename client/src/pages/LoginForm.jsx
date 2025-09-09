import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const user = await loginUser({ email, password });

      setUser(user); // set the actual user
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="main-center">
      <form className='form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
