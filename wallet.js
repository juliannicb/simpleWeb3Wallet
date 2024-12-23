// Initialize wallet functionality
const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer;

// DOM elements
const connectWalletButton = document.getElementById("connectWallet");
const walletInfo = document.getElementById("walletInfo");
const addressSpan = document.getElementById("address");
const balanceSpan = document.getElementById("balance");
const recipientInput = document.getElementById("recipient");
const amountInput = document.getElementById("amount");
const sendEtherButton = document.getElementById("sendEther");
const statusParagraph = document.getElementById("status");

// Connect Wallet
connectWalletButton.addEventListener("click", async () => {
    try {
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        const address = await signer.getAddress();
        addressSpan.textContent = address;
        updateBalance(address);
        walletInfo.style.display = "block";
    } catch (error) {
        console.error("Error connecting to wallet:", error);
    }
});

// Update Balance
async function updateBalance(address) {
    try {
        const balance = await provider.getBalance(address);
        balanceSpan.textContent = ethers.utils.formatEther(balance);
    } catch (error) {
        console.error("Error fetching balance:", error);
    }
}

// Send Ether
sendEtherButton.addEventListener("click", async () => {
    const recipient = recipientInput.value;
    const amount = amountInput.value;
    if (!recipient || !amount) {
        statusParagraph.textContent = "Please enter a valid recipient and amount.";
        return;
    }
    try {
        const tx = await signer.sendTransaction({
            to: recipient,
            value: ethers.utils.parseEther(amount)
        });
        statusParagraph.textContent = `Transaction sent! Hash: ${tx.hash}`;
    } catch (error) {
        console.error("Error sending Ether:", error);
        statusParagraph.textContent = "Error sending Ether. Check console for details.";
    }
});
`;

// Write files
const fs = require('fs');
fs.writeFileSync('index.html', htmlContent);
fs.writeFileSync('wallet.js', jsContent);

console.log("Web3 Wallet files have been created.");
