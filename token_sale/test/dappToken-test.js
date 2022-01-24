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
            assert.equal(res.logs[0].event, 'Transfer');
            assert.equal(res.logs[0].args._from, accounts[0]);
            assert.equal(res.logs[0].args._to, accounts[1]);
            assert.equal(res.logs[0].args._value, 1000);
        })
    })

    it('Should approval amount a to account b', async () => {
        let dappToken = await DappToken.deployed();
        let approvalCall = await dappToken.approve.call(accounts[1], 100, {from: accounts[0]})
        let approval = await dappToken.approve(accounts[1], 100, {from: accounts[0]})

        assert.equal(approvalCall, true)
        assert.equal(approval.logs[0].event, 'Approval');
        assert.equal(approval.logs[0].args._from, accounts[0]);
        assert.equal(approval.logs[0].args._spender, accounts[1]);
        assert.equal(approval.logs[0].args._value.toNumber(), 100);
    })

    it('Should allowance', async () => {
        let dappToken = await DappToken.deployed()
        await dappToken.approve(accounts[1], 100, {from: accounts[0]})
        let allowance = await dappToken.allowance(accounts[0], accounts[1])

        assert.equal(allowance.toNumber(), 100)

    })

})