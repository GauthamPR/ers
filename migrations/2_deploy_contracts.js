let ERS = artifacts.require("./ERS.sol");

module.exports = function(deployer) {
  deployer.deploy(ERS);
};