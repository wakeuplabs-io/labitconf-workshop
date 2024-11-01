// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./errors.sol";
import "./interface.sol";

/**
 * @title LabitConfToken
 * @dev Simple ERC20 Token example, with an initial supply sent to the deployer
 */
contract LabitConfToken is ERC20, IErrors, Ownable, ILabitConfToken {
    uint256 public maxSupply = 1_000_000 * 10 ** decimals();

    /**
     * @dev Constructor that gives msg.sender all of the initial supply.
     */
    constructor() ERC20("LabitConfToken", "LCT24") Ownable(msg.sender) {}

    /// @inheritdoc ILabitConfToken
    function mint(address account, uint256 amount) public onlyOwner {
        if (totalSupply() + amount > maxSupply) {
            revert maxSupplyReached(maxSupply);
        }
        _mint(account, amount);
    }
}
