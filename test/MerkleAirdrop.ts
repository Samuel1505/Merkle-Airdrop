import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

describe("MerkleAirdrop", function () {
  let token: Contract;
  let airdrop: Contract;
  let owner: Signer, addr1: Signer, addr2: Signer;
  let merkleTree: MerkleTree;
  let merkleRoot: string;
  let proofs: Map<string, string[]> = new Map();

  before(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Generate Merkle Tree
    const recipients = [
      await addr1.getAddress(),
      await addr2.getAddress(),
    ];
    const leafNodes = recipients.map(addr => keccak256(addr));
    merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    merkleRoot = merkleTree.getHexRoot();

    recipients.forEach((addr, index) => {
      const proof = merkleTree.getHexProof(leafNodes[index]);
      proofs.set(addr, proof);
    });

    // Deploy ERC20 Token
    const Token = await ethers.getContractFactory("MyToken");
    token = await Token.deploy();
    await token.waitForDeployment();

    // Deploy Airdrop Contract with Token Address & Merkle Root
    const Airdrop = await ethers.getContractFactory("MerkleAirdrop");
    airdrop = await Airdrop.deploy(token.address, merkleRoot); // Pass Merkle root
    await airdrop.waitForDeployment();

    // Fund Airdrop Contract with tokens
    await token.transfer(airdrop.address, ethers.parseEther("1000"));
  });

  it("Should allow eligible users to claim the airdrop", async function () {
    const addr1Proof = proofs.get(await addr1.getAddress())!;
    await expect(airdrop.connect(addr1).claimAirdrop(ethers.parseEther("10"), addr1Proof))
      .to.emit(airdrop, "AirdropClaimed")
      .withArgs(await addr1.getAddress(), ethers.parseEther("10"));

    const balance = await token.balanceOf(await addr1.getAddress());
    expect(balance).to.equal(ethers.parseEther("10"));
  });

  it("Should not allow users to claim twice", async function () {
    const addr1Proof = proofs.get(await addr1.getAddress())!;
    await expect(airdrop.connect(addr1).claimAirdrop(ethers.parseEther("10"), addr1Proof))
      .to.be.revertedWith("Airdrop already claimed");
  });

  it("Should not allow ineligible users to claim", async function () {
    const fakeProof: string[] = [];
    await expect(airdrop.connect(owner).claimAirdrop(ethers.parseEther("10"), fakeProof))
      .to.be.revertedWith("Invalid proof");
  });
});
