const DappToken = artifacts.require("DappToken")

const { expect, should, assert } = require("chai");

contract("Token", async accounts => {

    it('Initial information about the contract', async () => {
        let dappToken = await DappToken.deployed();
        let name = await dappToken.name();
        let symbol = await dappToken.symbol();
        let currentVersion = await dappToken.currentVersion();

        expect(name).to.equal("DApp Token", 'Tha name of Dapp Token should be "DApp token"')
        expect(symbol).to.equal("DAPP", 'Tha symbol of Dapp Token should be "DAPP"')
        expect(currentVersion).to.equal("DApp Token v1.0", 'Tha currentVersion of Dapp Token should be "DApp Token v1.0"')
    })

    it('Set the total supply upon deployed', async () => {
        let dappToken = await DappToken.deployed();
        let totalSupply = await dappToken.totalSupply();

        expect(totalSupply.toNumber()).to.equal(1000000)
    })

    it('Should have error if the total supply not be 1M', async () =>{
        let dappToken = await DappToken.deployed();
        let totalSupply = await dappToken.totalSupply();

        should(totalSupply.toNumber()).not.equal(800000)
    })

    it('not have enough balance', async () => {
        let dappToken = await DappToken.deployed(100000)
        let transfer;
        try{
            transfer = await dappToken.transfer(accounts[1], 9000000, { from: accounts[0]})
        } catch{
            assert.isNotOk(transfer);
        }

    })

    it('Should do the transfer', async () => {
        let dappToken = await DappToken.deployed(10000);
        let transfer = await dappToken.transfer(accounts[1], 1000, {from: accounts[0]});

        let balanceAccount1 = await dappToken.balanceOf(accounts[1]);
        let balanceAccount2 = await dappToken.balanceOf(accounts[0]);

        expect(balanceAccount1.toNumber()).to.equal(1000);
        expect(balanceAccount2.toNumber()).to.equal(999000);


    })

    it('Should return true', async () => {
        let dappToken = await DappToken.deployed(10000)
        let transfer = await dappToken.transfer.call(accounts[1], 10000, { from : accounts[0]})

        assert.equal(transfer, true);
    })

    it('should see the events', async () => {
        let dappToken = await DappToken.deployed();
        await dappToken.transfer(accounts[1], 1000, {from: accounts[0]})
        .then(function(res){
            should(res.logs.length).equal(1);
            should(res.logs[0].event).equal('Transfer');
            should(res.logs[0].args._from).equal(accounts[0]);
            should(res.logs[0].args._to).equal(accounts[1]);
            should(res.logs[0].args._value).equal(1000);
        })
        

    })

})