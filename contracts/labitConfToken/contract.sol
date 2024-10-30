// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./errors.sol";

/**
 * @title LabitConfToken
 * @dev Simple ERC20 Token example, with an initial supply sent to the deployer
 */
contract LabitConfToken is ERC20, IErrors, Ownable {
    uint256 public constant maxSupply = 1_000_000 * 10 ** 18;

    /**
     * @dev Constructor that gives msg.sender all of the initial supply.
     */
    constructor() ERC20("LabitConfToken", "LCT24") Ownable(msg.sender) {}

    /**
     * @dev Mints new tokens for the given account.
     * @param account The address of the account to mint tokens for.
     * @param amount The amount of tokens to mint.
     */
    function mint(address account, uint256 amount) public onlyOwner {
        if (totalSupply() + amount > maxSupply) {
            revert maxSupplyReached(maxSupply);
        }
        _mint(account, amount);
    }
}
