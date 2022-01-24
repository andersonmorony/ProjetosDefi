const DappToken = artifacts.require("DappToken");

module.exports = async function (deployer) {
    await deployer.deploy(DappToken, 1000000);
};
