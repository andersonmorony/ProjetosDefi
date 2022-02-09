// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./tomateToken.sol";

contract TomateSales is Ownable {

    using SafeMath for uint256;

    TomateToken public tokenContract;
    uint256 public initialPrice;
    uint256 public soldTokens;

    constructor(TomateToken _addressContract, uint256 _initialPrice){
        tokenContract = _addressContract;
        initialPrice = _initialPrice;
    }
    
    function buyTokens(uint256 _amount) public payable {
        require(msg.value == _amount.mul(initialPrice));
        require(tokenContract.transfer(msg.sender, _amount));
    }


}