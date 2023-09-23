pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract PiggyContract {
    address payable public owner;
    // bool public active;
    uint public numContributors;
    uint public totalBalance;
    uint public endTime;
    mapping(address => uint) public contributions;

    modifier onlyContributor() {
        require(contributions[msg.sender] > 0, "Only the owner can call this function.");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
        // active = false;
        numContributors = 0;
        totalBalance = 0;
        endTime = 0;
    }

    function contribute() external payable {
        // require(active, "PiggyBank is not active yet.");
        require(msg.value > 0, "Contribution amount must be greater than zero.");
    	
        contributions[msg.sender] += msg.value;
        totalBalance += msg.value;
        numContributors += 1;
    }

    // function activate() external onlyOwner {
    //     require(!active, "PiggyBank is already active.");

    //     endTime = block.timestamp + 3 days;
    //     active = true;
    // }

    function withdraw() external onlyContributor {
        // require(active, "PiggyBank is not active yet.");
        require(block.timestamp >= endTime, "Waiting period has not ended.");

        uint256 contributorBalance = contributions[msg.sender];

        // owner.transfer(contributions[msg.sender]);
        // active = false;
        numContributors -= 1;
        contributions[msg.sender] -= contributorBalance; 
        totalBalance -= contributorBalance;
        endTime = 0;
        payable(msg.sender).transfer(contributorBalance);
    }
}