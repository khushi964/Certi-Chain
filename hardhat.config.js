// filepath: c:\Users\vedan\OneDrive\Desktop\hardhat starter\hardhat.config.js
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths:{
    sources:"./contracts",
    tests:"./test",
    cache:"./cache",
    artifacts:"./artifacts"
  },
  networks:{
    hardhat:{
      chainId:1337
    },
    sepolia:{
      url:"https://eth-sepolia.g.alchemy.com/v2/i8vTdh7UwXV2DwPo1MNBPYu_9T_i14h8",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  },
};