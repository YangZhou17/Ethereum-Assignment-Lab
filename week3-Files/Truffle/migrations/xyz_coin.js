const XYZCoin = artifacts.require("../contracts/XYZCoin.sol");

module.exports = function (deployer) {
  deployer.deploy(XYZCoin);
};