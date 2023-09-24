pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract PiggyContract {
    address payable public owner;
    // bool public active;
    uint public numContributors;
    uint public totalBalance;
    uint public endTime;
    mapping(address => uint) public contributions;

    // Define the event
    event AnteDeposited(address indexed user, uint256 amount, uint256 pactId);

    enum PactStatus { Inactive, Active, Completed }

   
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

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    struct Participant {
        address payable participantAddress;
        bool isEligible;
        bool canClaim;
    }

    struct Pact {
        string title;
        string description;
        uint256 numberOfParticipants;
        uint256 duration; // in seconds, i.e., 10 days would be 864000
        uint256 startDate; // timestamp when the pact begins
        uint256 ante; // depositing amount required to join the pact
        Participant[] participants;
        PactStatus status;
        mapping(address => uint256) lastCheckInTimestamp;
    }


    struct PactWithJoinable {
        Pact pact;
        bool isJoinable;
    }



    // Array to keep track of all pacts
    Pact[] public pacts;

    function createPact(
        string memory _title,
        string memory _description,
        uint256 _numberOfParticipants,
        uint256 _duration,
        uint256 _startDate,
        uint256 _ante
    ) public payable returns(uint256) {
        require(_numberOfParticipants > 0, "Participants required");
        require(_duration > 0, "Duration should be greater than 0");
        require(_ante > 0, "Ante amount should be greater than 0");
        require(msg.value == _ante, "Must deposit the required ante amount");  // Ensure the creator deposits the ante

            // Push an empty pact into the storage array and get a reference to it
        Pact storage newPact = pacts.push();

        // Then populate its fields
        newPact.title = _title;
        newPact.description = _description;
        newPact.numberOfParticipants = _numberOfParticipants;
        newPact.duration = _duration;
        newPact.startDate = _startDate;
        newPact.ante = _ante;
        newPact.status = PactStatus.Inactive;

        // Directly push the participant into the storage array in the newly created Pact
        Participant memory newParticipant = Participant({
            participantAddress: payable(msg.sender),
            isEligible: true,
            canClaim: true 
        });
        newPact.participants.push(newParticipant);

        emit AnteDeposited(msg.sender, _ante, pacts.length - 1);
        return pacts.length - 1; // Return the index of the created pact
    }






    // Function to join an existing pact
    function joinPact(uint256 pactIndex) public payable {
        require(pactIndex < pacts.length, "Pact does not exist");
        require(pacts[pactIndex].participants.length < pacts[pactIndex].numberOfParticipants, "Pact is full");
        require(msg.value == pacts[pactIndex].ante, "Incorrect deposit amount");
        require(block.timestamp < pacts[pactIndex].startDate, "Pact start date has already passed");

        // Ensure that a participant cannot join the same pact twice
        for(uint256 i = 0; i < pacts[pactIndex].participants.length; i++) {
            require(pacts[pactIndex].participants[i].participantAddress != msg.sender, "Already a participant");
        }

        // Push the participant directly into the storage array in the selected Pact
        Participant storage newParticipant = pacts[pactIndex].participants.push();
        newParticipant.participantAddress = payable(msg.sender);
        newParticipant.isEligible = true;
        newParticipant.canClaim = true;

        // Auto update pact status after joining
        updatePactStatusAfterJoin(pactIndex);
    }


    // function getPactDetails(uint256 pactIndex) public view returns (PactWithJoinable memory) {
    //     require(pactIndex < pacts.length, "Pact does not exist");

    //     Pact memory pactDetails = pacts[pactIndex];

    //     // Update the status in the pactDetails
    //     pactDetails.status = computePactStatus(pactDetails);

    //     // Compute the joinable status
    //     bool joinable = computeIsJoinable(pactDetails);

    //     PactWithJoinable memory result = PactWithJoinable({
    //         pact: pactDetails,
    //         isJoinable: joinable
    //     });

    //     return result;
    // }

    function getPactDetails(uint256 pactIndex) public view returns (
        string memory title,
        string memory description,
        uint256 numberOfParticipants,
        uint256 activeParticipantsCount,
        uint256 duration,
        uint256 startDate,
        uint256 ante,
        PactStatus status,
        bool isJoinable
    ) {
        require(pactIndex < pacts.length, "Pact does not exist");

        Pact storage pactDetails = pacts[pactIndex];

        // Compute the count of actively enrolled participants
        uint256 count = 0;
        for (uint256 i = 0; i < pactDetails.participants.length; i++) {
            if (pactDetails.participants[i].isEligible) {
                count++;
            }
        }


        // Update the status in the pactDetails
        PactStatus currentStatus = computePactStatus(pactDetails);

        // Compute the joinable status
        bool joinable = computeIsJoinable(pactDetails);

        return (
            pactDetails.title,
            pactDetails.description,
            pactDetails.numberOfParticipants,
            count,
            pactDetails.duration,
            pactDetails.startDate,
            pactDetails.ante,
            currentStatus,
            joinable
        );
    }

    function getParticipantAddress(uint256 pactIndex, uint256 participantIndex) public view returns (address) {
        require(pactIndex < pacts.length, "Pact does not exist");
        require(participantIndex < pacts[pactIndex].numberOfParticipants, "Participant does not exist");

        return pacts[pactIndex].participants[participantIndex].participantAddress;
    }





    function contribute() external payable {
        // require(active, "PiggyBank is not active yet.");
        require(msg.value > 0, "Contribution amount must be greater than zero.");
    	
        contributions[msg.sender] += msg.value;
        totalBalance += msg.value;

        numContributors += 1;

    }


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

    function updatePactStatus(uint256 pactIndex) public {
        Pact storage pact = pacts[pactIndex];

        // If pact is already completed, no further checks are needed
        if(pact.status == PactStatus.Completed) return;

        if(pact.status == PactStatus.Inactive && block.timestamp >= pact.startDate && pact.participants.length == pact.numberOfParticipants) {
            pact.status = PactStatus.Active;
        }

        if(pact.status == PactStatus.Active && block.timestamp >= pact.startDate + pact.duration) {
            pact.status = PactStatus.Completed;

            // Logic to distribute funds among participants can be added here
        }
    }


    function getPactStatus(uint256 pactIndex) public view returns (PactStatus) {
        require(pactIndex < pacts.length, "Pact does not exist");
        Pact storage pact = pacts[pactIndex];

        return computePactStatus(pact);
    }

    function computePactStatus(Pact storage pact) internal view returns (PactStatus) {
        if(pact.status == PactStatus.Completed) {
            return PactStatus.Completed;
        }

        if(pact.status == PactStatus.Inactive && block.timestamp >= pact.startDate && pact.participants.length == pact.numberOfParticipants) {
            return PactStatus.Active;
        }

        if(pact.status == PactStatus.Active && block.timestamp >= pact.startDate + pact.duration) {
            return PactStatus.Completed;
        }

        return pact.status;
    }

    function computeIsJoinable(Pact storage pact) internal view returns (bool) {
        if (pact.status == PactStatus.Active || pact.status == PactStatus.Completed) {
            return false;
        }
        if (block.timestamp >= pact.startDate) {
            return false;
        }
        if (pact.participants.length >= pact.numberOfParticipants) {
            return false;
        }
        return true;
    }

    function updatePactStatusAfterJoin(uint256 pactIndex) internal {
        Pact storage pact = pacts[pactIndex];
        
        if(pact.status == PactStatus.Inactive && 
        block.timestamp < pact.startDate && 
        pact.participants.length == pact.numberOfParticipants) {
            pact.status = PactStatus.Active;
        }
    }

    function getCurrentTimestamp() public view returns (uint256) {
        return block.timestamp;
    }

    function getFulfillmentEstimate(uint256 pactIndex) public view returns (address[] memory, uint256[] memory) {
        require(pactIndex < pacts.length, "Pact does not exist");

        Pact storage selectedPact = pacts[pactIndex];

        uint256 numParticipants = selectedPact.participants.length;
        uint256 totalAnte = numParticipants * selectedPact.ante;

        // Placeholder for future eligibility check
        uint256 eligibleParticipantsCount = numParticipants; // For now, assume all are eligible

        // Amount each eligible participant would get
        uint256 individualReturn = totalAnte / eligibleParticipantsCount; 

        address[] memory participantsAddresses = new address[](eligibleParticipantsCount);
        uint256[] memory participantsReturns = new uint256[](eligibleParticipantsCount);

        uint256 j = 0;
        for (uint256 i = 0; i < numParticipants; i++) {
            // TODO: Add eligibility check here in future
            // If eligible, then:
            participantsAddresses[j] = selectedPact.participants[i].participantAddress;
            participantsReturns[j] = individualReturn;
            j++;
        }

        return (participantsAddresses, participantsReturns);
    }

    function claimFulfillment(uint256 pactIndex) public {
        require(pactIndex < pacts.length, "Pact does not exist");

        // 1. Update pact status
        updatePactStatus(pactIndex);
        
        Pact storage pactDetails = pacts[pactIndex];

        // 2. Check if the pact has completed
        require(pactDetails.status == PactStatus.Completed, "Pact is not completed yet");
        require(block.timestamp >= pactDetails.startDate + pactDetails.duration, "Pact duration has not yet ended");

        // 3. Identify the participant and ensure they're eligible
        bool isParticipant = false;
        uint256 participantIndex;
        for (uint256 i = 0; i < pactDetails.participants.length; i++) {
            if (pactDetails.participants[i].participantAddress == msg.sender) {
                participantIndex = i;
                isParticipant = true;
                break;
            }
        }
        require(isParticipant, "You are not a participant of this pact");
        require(pactDetails.participants[participantIndex].isEligible, "You are not eligible to claim");
        require(pactDetails.participants[participantIndex].canClaim, "You have already claimed your share");
        // 4. Compute the active participants and the payout
        uint256 activeParticipants = 0;
        for (uint256 i = 0; i < pactDetails.participants.length; i++) {
            if (pactDetails.participants[i].isEligible) {
                activeParticipants++;
            }
        }
        require(activeParticipants > 0, "No active participants left");
        uint256 payout = (pactDetails.ante * pactDetails.numberOfParticipants) / activeParticipants;

        // 5. Transfer the payout and mark the participant as having claimed
        payable(msg.sender).transfer(payout);
        pactDetails.participants[participantIndex].canClaim = false;
    }


    function reclaimAnte(uint256 pactIndex) public {
        require(pactIndex < pacts.length, "Pact does not exist");
        Pact storage pactDetails = pacts[pactIndex];

        // Only allow reclaims if pact is inactive and passed the start date
        require(pactDetails.status == PactStatus.Inactive, "Pact is not inactive");
        require(block.timestamp >= pactDetails.startDate, "Start date hasn't passed yet");
        require(pactDetails.participants.length < pactDetails.numberOfParticipants, "Pact has enough participants");

        // Find the participant requesting the reclaim
        bool isParticipant = false;
        for(uint i = 0; i < pactDetails.participants.length; i++) {
            if(pactDetails.participants[i].participantAddress == msg.sender) {
                isParticipant = true;
                // Check if the participant is eligible to reclaim
                require(pactDetails.participants[i].isEligible, "Participant is not eligible");
                // Mark the participant as not eligible to prevent double reclaiming
                pactDetails.participants[i].isEligible = false;
                break;
            }
        }

        require(isParticipant, "Sender is not a participant in the pact");

        // Transfer the ante back to the participant
        payable(msg.sender).transfer(pactDetails.ante);
    }

    event ProofSubmitted(
        address indexed participantAddress,
        uint256 indexed pactIndex,
        string ipfsHash
    );

    function submitProof(uint256 pactIndex, string memory ipfsHash) public {
        require(pactIndex < pacts.length, "Invalid pactIndex");
        
        Pact storage pactDetails = pacts[pactIndex];

        // Ensure the pact is active
        require(block.timestamp >= pactDetails.startDate, "Pact hasn't started yet");
        require(block.timestamp < pactDetails.startDate + pactDetails.duration, "Pact has already ended");

        bool isParticipant = false;
        for (uint256 i = 0; i < pactDetails.participants.length; i++) {
            if (pactDetails.participants[i].participantAddress == msg.sender) {
                isParticipant = true;
                break;
            }
        }
        
        require(isParticipant, "You are not a participant of this pact");

        pacts[pactIndex].lastCheckInTimestamp[msg.sender] = block.timestamp;

        // Emit the event
        emit ProofSubmitted(msg.sender, pactIndex, ipfsHash);
    }

    function checkMissedCheckIn(uint256 pactIndex, address participant) external {
        Pact storage pact = pacts[pactIndex];
        
        require(block.timestamp - pact.lastCheckInTimestamp[participant] > 1 days, "Check-in is still valid");
        
        // Finding the participant in the array (assuming you've the Participant struct set up)
        for (uint256 i = 0; i < pact.participants.length; i++) {
            if (pact.participants[i].participantAddress == participant) {
                pact.participants[i].isEligible = false;
                break;
            }
        }
    }

    function invalidateParticipant(uint256 pactIndex, address participant) external onlyPrivileged {
        Pact storage pact = pacts[pactIndex];

        // Finding the participant in the array
        for (uint256 i = 0; i < pact.participants.length; i++) {
            if (pact.participants[i].participantAddress == participant) {
                pact.participants[i].isEligible = false;
                break;
            }
        }
    }


    // For access control
    mapping(address => bool) private privilegedAddresses;   

    modifier onlyPrivileged() {
        require(privilegedAddresses[msg.sender], "Not authorized");
        _;
    }

    function grantPrivilege(address _address) external onlyOwner {
        privilegedAddresses[_address] = true;
    }

    function revokePrivilege(address _address) external onlyOwner {
        privilegedAddresses[_address] = false;
    }
}