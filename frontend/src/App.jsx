import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/api/health")
      .then(res => res.json())
      .then(data => setStatus(data.status))
      .catch(() => setStatus("Backend not reachable"));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>SmartAI Campus Management</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;
