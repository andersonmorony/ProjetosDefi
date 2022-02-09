const TomateToken = artifacts.require("TomateToken");
const TomateSales = artifacts.require("TomateSales");

module.exports = async function  (deployer) {
  await deployer.deploy(TomateToken, 10000000);
  await deployer.deploy(TomateSales, TomateToken.address, 30000);
};
