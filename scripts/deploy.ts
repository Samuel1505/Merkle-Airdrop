const { ethers } = require("hardhat");

async function main() {
    const tokenAddress = "0x5e17b14ADd6c386305A32928F985b29bbA34Eff5"; // Replace with actual ERC-20 contract address

    const merkleairdrop = await ethers.getContractFactory("MerkleAirdrop");
    const airdrop = await merkleairdrop.deploy(tokenAddress);
    
    await airdrop.deployed();
    console.log("MerkleAirdrop deployed to:", airdrop.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
