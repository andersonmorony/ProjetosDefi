const TomateToken = artifacts.require("TomateToken");

module.exports = async function  (deployer) {
  await deployer.deploy(TomateToken, 10000000);
};
