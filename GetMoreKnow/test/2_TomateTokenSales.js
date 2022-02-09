const TomateSales = artifacts.require("TomateSales")
const TomateToken = artifacts.require("TomateToken")

const { assert } = require("chai")

contract("TomateSales", async accounts => {
    let tomateSales
    let tomateToken
    let initialPrice

    before(async () => {
        tomateSales = await TomateSales.deployed();
        tomateToken = await TomateToken.deployed();
    })

    describe('Sell', async () => {
        it('Should have a address', async () => {

            let balance = await tomateToken.balanceOf(accounts[0])
            initialPrice = await tomateSales.initialPrice()
            initialPrice = initialPrice.toNumber()
            assert(tomateSales.address, "Should have a address here")
            assert.equal(initialPrice, 30000,  "Not have the same value")
            assert.equal(balance.toNumber(), 10000000, "Should have a address here")
        })

        it('Transfer 75% to the contract sales', async() => {
            await tomateToken.transfer(tomateSales.address, 7500000)
            let balanceSales = await tomateToken.balanceOf(tomateSales.address)
            let balanceOwner = await tomateToken.balanceOf(accounts[0])

            assert.equal(balanceSales, 7500000)
            assert.equal(balanceOwner, 2500000)
        })

        it('Buy some tokens', async () => {
            await tomateSales.buyTokens(10, {from: accounts[1], value: 10 * initialPrice})
            let balance = await tomateToken.balanceOf(accounts[1])

            assert.equal(balance, 10 , 'Must have some tokens')

        })
        it('Must have a validation to price and value', async() => {
            try{
                await tomateSales.buyTokens(10, {from: accounts[1], value: 1})
                assert.fail();
            }catch(error){
                assert(error.message.indexOf('revert') >= 1 , "haven't value enough")
            }
        })

    })
})