# Merkle Airdrop Contract

## Overview
The `MerkleAirdrop` smart contract is designed to facilitate an airdrop of ERC-20 tokens. It allows eligible users to claim their tokens and provides an owner-only function to withdraw unclaimed tokens.

## Features
- **Airdrop Claiming:** Users can claim their airdrop tokens if they haven't already.
- **Owner Controls:** The contract owner can withdraw unclaimed tokens.
- **Security Measures:** Ensures each user can claim only once.

## Contract Address
Deployed on Ethereum: `0x78737186Cd1053774ab0F94929AA984c08E7E5cf`

## Prerequisites
- An Ethereum wallet (e.g., MetaMask)
- Some ETH for gas fees
- The ERC-20 token contract address

## Installation
Clone the repository and install dependencies:
```sh
npm install
```

## Deployment
Deploy the contract using Hardhat or Remix:
```solidity
constructor(address _token, uint256 _airdropAmount)
```
Example deployment:
```sh
npx hardhat run scripts/deploy.ts --network 
```

## Functions

### 1. `claimAirdrop()`
Allows users to claim their allocated tokens.
```solidity
function claimAirdrop() external;
```
- **Requirements:**
  - The user must not have claimed before.
  - The contract must have sufficient tokens.

### 2. `withdrawTokens(address to, uint256 amount)`
Allows the owner to withdraw unclaimed tokens.
```solidity
function withdrawTokens(address to, uint256 amount) external onlyOwner;
```
- **Requirements:**
  - Only callable by the contract owner.

## Events
```solidity
event AirdropClaimed(address indexed user, uint256 amount);
```
Triggers when a user successfully claims tokens.

## Security Considerations
- Ensure the contract is funded before launching the airdrop.
- Verify user eligibility using Merkle proofs if necessary.
- Use a multi-signature wallet for owner operations.



