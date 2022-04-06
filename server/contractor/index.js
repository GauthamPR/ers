const Web3 = require("web3");
const contract = require("truffle-contract");
const artifacts = require("../../build/contracts/ERS.json");

let web3;

if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

const ERS = contract(artifacts);
ERS.setProvider(web3.currentProvider);

module.exports = {
  deployContract: async function () {
    const ers = await ERS.deployed();
    const accounts = await web3.eth.getAccounts();
    return {
      ers,
      account: accounts[0]
    };
  },
};
