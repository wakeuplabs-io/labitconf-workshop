// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title PaymentToken
 * @dev Simple ERC20 Token example, with an initial supply sent to the deployer
 */
contract PaymentToken is ERC20 {
    /**
     * @dev Constructor that gives msg.sender all of the initial supply.
     */
    constructor() ERC20("USDT Mock", "USDT") {}

    /**
     * @dev Mints new tokens for the given account.
     * @param account The address of the account to mint tokens for.
     * @param amount The amount of tokens to mint.
     */
    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }
}
