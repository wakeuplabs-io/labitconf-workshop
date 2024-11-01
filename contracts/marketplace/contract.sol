// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../labitConfToken/contract.sol";
import "./errors.sol";
import "./interface.sol";

/**
 * @title TokenMarketplace
 * @dev A marketplace contract that allows users to purchase LabitConf tokens with a specified payment token.
 */
contract Marketplace is Ownable, IMarketplaceErrors, IMarketplace {
    LabitConfToken public labitConfToken;
    address public paymentToken;
    uint256 public tokenPrice;

    /**
     * @dev Initializes the contract with a payment token address and the token price.
     * @param _paymentToken The address of the ERC20 payment token.
     * @param _tokenPrice The price of the LabitConf token in the payment token.
     */
    constructor(
        address _paymentToken,
        uint256 _tokenPrice
    ) Ownable(msg.sender) {
        labitConfToken = new LabitConfToken();
        paymentToken = _paymentToken;
        tokenPrice = _tokenPrice;
    }

    /// @inheritdoc IMarketplace
    function buyTokens(uint256 amount) external {
        uint256 tokenBalance = IERC20(paymentToken).balanceOf(msg.sender);
        if (tokenBalance < amount) {
            revert InsuficientFunds(paymentToken, tokenBalance, amount);
        }

        uint256 tokenCost = amount *
            tokenPrice *
            10 ** ERC20(paymentToken).decimals();
        IERC20(paymentToken).transferFrom(msg.sender, address(this), tokenCost);

        LabitConfToken(labitConfToken).mint(msg.sender, amount);
    }

    /// @inheritdoc IMarketplace
    function withdraw() external onlyOwner {
        uint256 balance = IERC20(paymentToken).balanceOf(address(this));
        IERC20(paymentToken).transfer(msg.sender, balance);
    }

    /// @inheritdoc IMarketplace
    function setTokenPrice(uint256 _tokenPrice) external onlyOwner {
        tokenPrice = _tokenPrice;
    }
}
