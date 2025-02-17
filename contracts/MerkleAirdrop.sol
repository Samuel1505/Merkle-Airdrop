// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// 0x78737186Cd1053774ab0F94929AA984c08E7E5cf

contract MerkleAirdrop {
    address public owner;
    IERC20 public token;
    mapping(address => bool) public hasClaimed;
    uint256 public airdropAmount;

    event AirdropClaimed(address indexed user, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor(address _token, uint256) {
        owner = msg.sender;
        token = IERC20(_token);
       
    }

    function claimAirdrop() external {
        require(!hasClaimed[msg.sender], "Airdrop already claimed");
        hasClaimed[msg.sender] = true;
        require(token.transfer(msg.sender, airdropAmount), "Token transfer failed");
        emit AirdropClaimed(msg.sender, airdropAmount);
    }

    function withdrawTokens(address to, uint256 amount) external onlyOwner {
        require(token.transfer(to, amount), "Withdrawal failed");
    }

}


//     function claimAirdrop() external {
//         require(!hasClaimed[msg.sender], "Airdrop already claimed");

//         hasClaimed[msg.sender] = true;
//         require(token.transfer(msg.sender, airdropAmount), "Token transfer failed");

//         emit AirdropClaimed(msg.sender, airdropAmount);
//     }

//     function withdrawTokens(address to, uint256 amount) external onlyOwner {
//         require(token.transfer(to, amount), "Withdrawal failed");
//     }
// }
