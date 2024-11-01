// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IMarketplace {
    /**
     * @dev Allows users to buy LabitConf tokens by sending payment tokens.
     * @param amount The number of LabitConf tokens to purchase.
     * @notice Reverts if the user does not have sufficient funds.
     */
    function buyTokens(uint256 amount) external;

    /**
     * @dev Allows the owner to withdraw payment tokens from the contract.
     * @notice Only the owner can call this function.
     */
    function withdraw() external;

    /**
     * @dev Allows the owner to set a new token price.
     * @param _tokenPrice The new price of the LabitConf token in the payment token.
     * @notice Only the owner can call this function.
     */
    function setTokenPrice(uint256 _tokenPrice) external;
}
