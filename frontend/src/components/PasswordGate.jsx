import { useState, useEffect } from "react";

function PasswordGate({ children }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [allowed, setAllowed] = useState(false);

  const correctPassword = import.meta.env.VITE_SITE_PASSWORD;

  useEffect(() => {
    const savedAccess = sessionStorage.getItem("site-access");
    if (savedAccess === "granted") {
      setAllowed(true);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (input === correctPassword) {
      sessionStorage.setItem("site-access", "granted");
      setAllowed(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  }

  if (allowed) {
    return children;
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Protected Site</h1>
        <p style={styles.text}>Enter the password to access the website.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="password"
            placeholder="Enter password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Enter
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0b1020",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#11182d",
    color: "#ffffff",
    padding: "32px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    textAlign: "center",
  },
  title: {
    marginBottom: "12px",
  },
  text: {
    marginBottom: "20px",
    color: "#c7cede",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #2b3550",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#f6b73c",
    color: "#111",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    marginTop: "12px",
    color: "#ff7b7b",
  },
};

export default PasswordGate;