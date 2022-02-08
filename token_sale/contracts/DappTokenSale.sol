pragma solidity >=0.4.22;

import './DappToken.sol';


contract DappTokenSale{
    address owner;
    DappToken public tokenContract;
    uint256 public priceToken;
    uint256 public tokenSold;

    event sell(address _buyer, uint256 _amount);

    constructor(DappToken _tokenContract, uint256 _priceToken){
        owner = msg.sender;
        tokenContract = _tokenContract;
        priceToken = _priceToken;
    }

    function mult(uint x, uint y) internal pure returns(uint z){
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _amountOfTokens) public payable{
        
        require(msg.value == mult(_amountOfTokens, priceToken));
        require(tokenContract.balanceOf(address(this)) >= _amountOfTokens);
        require(tokenContract.transfer(msg.sender, _amountOfTokens));

        tokenSold += _amountOfTokens;

        emit sell(msg.sender, _amountOfTokens);

    }

    function endSales() public{
        require(msg.sender == owner);
        require(tokenContract.transfer(owner, tokenContract.balanceOf(address(this))));

        selfdestruct(payable(address(owner)));
    }
}