const DappToken = artifacts.require("DappToken")

const { expect, should } = require("chai");
var chai = require("chai")

contract("Token", async accounts => {

    it('Set the total supply upon deployed', async () => {
        let dappToken = await DappToken.deployed();
        let totalSupply = await dappToken.tokenAmount();

        expect(totalSupply.toNumber()).to.equal(1000000)
    })

    it('Should have error if the total supply not be 1M', async () =>{
        let dappToken = await DappToken.deployed();
        let totalSupply = await dappToken.tokenAmount();

        should(totalSupply.toNumber()).not.equal(800000)
    })

})