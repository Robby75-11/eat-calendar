import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        password,
        role,
      });

      alert("✅ Registrazione completata! Ora effettua il login.");
      navigate("/login"); // ti porta alla pagina di login
    } catch (err) {
      console.error("❌ Errore registrazione:", err);
      alert("Errore nella registrazione");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>📝 Registrati</h3>
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
      <div>
        <label>Ruolo</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
      <button type="submit">Registrati</button>
    </form>
  );
}

export default RegisterForm;
