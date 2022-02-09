const TomateToken = artifacts.require("TomateToken")

const { assert } = require("chai")

contract("TomateToken", async accounts => {
    
    const initialSupply = 10000000


    it("Should Deployed the contract", async () => {

        let tomateToken = await TomateToken.deployed(initialSupply)
        let balanceOf = await tomateToken.balanceOf(accounts[0])
        let Symbol = await tomateToken.symbol()
        
        assert.notEqual(tomateToken.address, "0x00", "Must to had a address")
        assert.equal(balanceOf, initialSupply, "Must have the same number of tokens")
        assert.equal(Symbol, "TMT", "Should have the symbol")
    })
    it("Should to do a transfer", async () => {
        const from = accounts[0]
        const to = accounts[1]

        let tomateToken = await TomateToken.deployed(initialSupply)
        await tomateToken.transfer(to, 10, {from: from})
        let balanceOfAccountTo = await tomateToken.balanceOf(to)

        assert.equal(balanceOfAccountTo.toNumber(), 10, "Should have the same balance after the transfer")

        try {
            await tomateToken.transfer(to, 20000000, {from: from})
        }catch(error){
            assert(error.message.indexOf("revert") >= 1, 'should not have amount enough')
        }
        

    })
})