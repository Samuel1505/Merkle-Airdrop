// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const MerkleAirdropModule = buildModule("MerkleAirdropModule", (m) => {

  const tokenAddress = "0x5e17b14ADd6c386305A32928F985b29bbA34Eff5";
 

  const airdrop = m.contract("MerkleAirdrop" , [tokenAddress]);

  return { airdrop };
});

export default MerkleAirdropModule;




// import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// const MerkleAirdropModule = buildModule("MerkleAirdropModule", (m) => {
//   const tokenAddress = "0x5e17b14ADd6c386305A32928F985b29bbA34Eff5"; // Replace with actual token address

//   // Pass the token address as a constructor argument
//   const airdrop = m.contract("MerkleAirdrop", [tokenAddress]);

//   return { airdrop };
// });

// export default MerkleAirdropModule;
