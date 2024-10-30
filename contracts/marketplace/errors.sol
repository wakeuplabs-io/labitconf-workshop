// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

interface IMarketplaceErrors {
    ///@notice Error thrown when user has not enougth payment tokens
    error InsuficientFunds(
        address paymentToken,
        uint256 balance,
        uint256 maxSupply
    );
}
