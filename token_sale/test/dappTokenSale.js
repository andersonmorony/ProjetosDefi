const { assert, should } = require("chai");

var DappTokenSale = artifacts.require("DappTokenSale");
var DappTokenInstance = artifacts.require("DappToken")

contract("DappTokenSale", function(accounts){
    
    let dappTokenSale;
    let tokenPrice = 1000000
    let amountOfToken = 10
    let admin = accounts[0]
    let amountToSale = 750000

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

    it('cannot buy if not have money enought', async() => {

        try{
            await dappTokenSale.buyTokens(amountOfToken, {from: accounts[1], value: 1})
        }catch(error){
            assert(error.message.indexOf("revert") >= 0)
        }
    })

    it('Should have a sold token', async() => {

        let dapptokenIntrance = await DappTokenInstance.deployed();
        await dapptokenIntrance.transfer(dappTokenSale.address, amountToSale, { from: admin})
        await dappTokenSale.buyTokens(amountOfToken, {from: accounts[1], value: amountOfToken * tokenPrice})

        let sold = await dappTokenSale.tokenSold()

        assert.equal(sold.toNumber(), amountOfToken, 'Should have a amountSold')
    })

    it('Should transfer 75% to token sale', async () => {
       let dapptokenIntrance = await DappTokenInstance.deployed();
    //    await dapptokenIntrance.transfer(dappTokenSale.address, amountToSale, { from: admin})
       let balanceToSale = await dapptokenIntrance.balanceOf(dappTokenSale.address)

       assert.isAbove(balanceToSale.toNumber(), 0)
    })
    it('Should return erro if not have tokens enough', async () => {
        try{
           await dappTokenSale.buyTokens(850000, {from: accounts[2], value:  850000 * tokenPrice})
           let balanceSold = await dappTokenSale.tokenSold()
           assert.isBelow(balanceSold.toNumber(), 750000)
        }catch(error){
            assert(error.message.indexOf("revert") >= 0, "Not have token enough")
        }

    })

    it('Should to do the transfer', async () => {
        let dapptokenIntrance = await DappTokenInstance.deployed();
        let balanceSale = await dapptokenIntrance.balanceOf(dappTokenSale.address)
        assert.isBelow(balanceSale.toNumber(), 750000)
    })



});