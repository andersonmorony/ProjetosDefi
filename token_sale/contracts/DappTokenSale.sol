pragma solidity ^0.8.0;

import './DappToken.sol';

contract DappTokenSale{
    address owner;
    DappToken public tokenContract;
    uint256 public priceToken;

    constructor(DappToken _tokenContract, uint256 _priceToken){
        owner = msg.sender;
        tokenContract = _tokenContract;
        priceToken = _priceToken;
    }
}