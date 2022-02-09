// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TomateToken is ERC20{

    constructor(uint256 _initialSupply) ERC20("Tomate", "TMT") {
        _mint(msg.sender, _initialSupply);
    }

}
