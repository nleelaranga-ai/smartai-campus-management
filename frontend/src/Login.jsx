import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    const res = await fetch(
      import.meta.env.VITE_API_URL + "/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      }
    );
    const data = await res.json();
    alert(data.msg || "Login success");
  };

  return (
    <div>
      <h2>Login</h2>
      <p>New here? <button onClick={() => navigate("/register")}>Create Account</button></p>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
