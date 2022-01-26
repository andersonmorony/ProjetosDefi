const { assert } = require("chai");

var DappTokenSale = artifacts.require("DappTokenSale");

contract("DappTokenSale", function(accounts){
    let dappTokenSale;

    it('Should has a contract address', async () => {
        dappTokenSale = await DappTokenSale.deployed()
        assert.notEqual(dappTokenSale.address, '0x0', 'It has a address')
    })
    it('should have token Contract address', async() => {
        let tokenContract = dappTokenSale.tokenContract()

        assert.notEqual(tokenContract, '0x00', 'should has a address')
    })
    it('Should return the price token', async () => {
        let priceToken = await dappTokenSale.priceToken()

        assert.equal(priceToken, '1000000')
    })

});