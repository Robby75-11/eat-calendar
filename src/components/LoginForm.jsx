import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      const token = response.data.token;
      const userId = response.data.userId;
      // salvo il token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      navigate("/");
    } catch (err) {
      console.error("❌ Errore login:", err);
      alert("Credenziali non valide");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>🔑 Login</h3>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Accedi</button>
      {/* link a registrazione */}
      <p style={{ marginTop: "10px" }}>
        Non hai un account? <Link to="/register">Registrati qui</Link>
      </p>
    </form>
  );
}

export default LoginForm;
