# 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/1171422a-0ce4-4203-bcd4-d2d1941d198b)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started follow the steps below:

1. Clone this repo & install dependencies

```
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.


# im-pact-ful documentation

## Data Structures:

### Enums:
1. `PactStatus`: { Inactive, Active, Completed }

### Modifiers:
1. `onlyContributor()`: Ensure only a contributor can call the associated function.
2. `onlyOwner()`: Ensure only the owner can call the associated function.
3. `onlyPrivileged()`: Ensure only a privileged address can call the associated function.

### Structs:
1. `Participant`:
   - `participantAddress`: Address of the participant.
   - `isEligible`: A boolean to check if the participant is eligible.
   - `canClaim`: A boolean to check if the participant can claim.
   
2. `Pact`:
   - `title`: Title of the pact.
   - `description`: Description of the pact.
   - `numberOfParticipants`: Number of participants in the pact.
   - `duration`: Duration of the pact in seconds.
   - `startDate`: Timestamp when the pact starts.
   - `ante`: Deposit amount to join the pact.
   - `participants`: Array of participants.
   - `status`: Status of the pact (`PactStatus`).
   - `lastCheckInTimestamp`: Mapping of addresses to their last check-in timestamps.
   
3. `PactWithJoinable`:
   - `pact`: Pact.
   - `isJoinable`: A boolean to check if the pact is joinable.

---

## Public State Variables:

1. `owner`: Address of the contract owner.
2. `numContributors`: Number of contributors.
3. `totalBalance`: Total balance of the contract.
4. `endTime`: End time for the contract.
5. `contributions`: Mapping of addresses to their contributions.
6. `pacts`: Array of pacts.
7. `privilegedAddresses`: Mapping of addresses to their privilege status (true if privileged, false otherwise).

## Events:

1. `AnteDeposited(address indexed user, uint256 amount, uint256 pactId)`: Emitted when an ante is deposited.

2. `ProofSubmitted(address indexed participantAddress, uint256 indexed pactIndex, string ipfsHash)`: Emitted when a proof is submitted.
---

## Public Functions:

1. `createPact(string memory _title, string memory _description, uint256 _numberOfParticipants, uint256 _duration, uint256 _startDate, uint256 _ante) public payable returns(uint256)`
   - **Example Input**: `"Sample Pact", "This is a sample pact", 10, 864000, 1735700800, 5 ether`
   - **Expected Return**: Index of the created pact.

2. `joinPact(uint256 pactIndex) public payable`
   - **Example Input**: `3` (Assuming you want to join the pact at index 3).
   - **Expected Return**: None. State of the contract is updated.

3. `getPactDetails(uint256 pactIndex) public view returns (string memory title, string memory description, uint256 numberOfParticipants, uint256 activeParticipantsCount, uint256 duration, uint256 startDate, uint256 ante, PactStatus status, bool isJoinable)`
   - **Example Input**: `2`
   - **Expected Return**: Details of the pact at index 2 in the specified format.

4. `getParticipantAddress(uint256 pactIndex, uint256 participantIndex) public view returns (address)`
   - **Example Input**: `2, 5`
   - **Expected Return**: Address of the 6th participant in the 3rd pact.

5. `contribute() external payable`
   - **Example Input**: Transaction with `value = 2 ether`
   - **Expected Return**: None. State of the contract is updated.

6. `withdraw() external onlyContributor`
   - **Expected Return**: None. State of the contract is updated, and contributor receives their balance.

7. `updatePactStatus(uint256 pactIndex) public`
   - **Example Input**: `4`
   - **Expected Return**: None. State of the pact is updated.

8. `getPactStatus(uint256 pactIndex) public view returns (PactStatus)`
   - **Example Input**: `3`
   - **Expected Return**: Status of the pact at index 3 (`Inactive`, `Active`, or `Completed`).

9. `getCurrentTimestamp() public view returns (uint256)`
   - **Expected Return**: Current timestamp.

10. `getFulfillmentEstimate(uint256 pactIndex) public view returns (address[] memory, uint256[] memory)`
   - **Example Input**: `2`
   - **Expected Return**: Arrays of addresses of participants and their respective returns for the pact at index 2.

11. `claimFulfillment(uint256 pactIndex) public`
   - **Example Input**: `3`
   - **Expected Return**: None. Eligible participant claims their share from the pact at index 3.

12. `reclaimAnte(uint256 pactIndex) public`
   - **Example Input**: `5`
   - **Expected Return**: None. Participant reclaims their ante from the pact at index 5.

13. `submitProof(uint256 pactIndex, string memory ipfsHash) public`
    - Description: Function for a participant to submit proof for a pact.
    - **Example Input**: `3, "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"`
    - **Expected Return**: None. Proof is submitted for the pact at index 3 and an event is emitted.

14. `submitProof(uint256 pactIndex, string memory ipfsHash) public`
   - Description: Function for a participant to submit proof for a pact.
   - **Example Input**: `3, "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco"`
   - **Expected Return**: None. Proof is submitted for the pact at index 3 and an event is emitted.

15. `checkMissedCheckIn(uint256 pactIndex, address participant) external`
   - Description: Check if a participant has missed a check-in.
   - **Example Input**: `4, 0x4b20993Bc481177ec7E8f571ceCaE8A9e22C02db`
   - **Expected Return**: None. If the participant missed the check-in, their eligibility for the pact rewards is revoked.

16. `invalidateParticipant(uint256 pactIndex, address participant) external onlyPrivileged`
   - Description: Invalidate a participant from a pact, revoking their eligibility.
   - **Example Input**: `5, 0x4b20993Bc481177ec7E8f571ceCaE8A9e22C02db`
   - **Expected Return**: None. The participant's eligibility for the pact rewards is revoked.


17. `grantPrivilege(address _address) external onlyOwner`
   - Description: Grant privilege to an address, allowing them to invalidate participants.
   - **Example Input**: `0x4b20993Bc481177ec7E8f571ceCaE8A9e22C02db`
   - **Expected Return**: None. The given address is granted privileges.

18. `revokePrivilege(address _address) external onlyOwner`
   - Description: Revoke privilege from an address, removing their ability to invalidate participants.
   - **Example Input**: `0x4b20993Bc481177ec7E8f571ceCaE8A9e22C02db`
   - **Expected Return**: None. The given address has its privileges revoked.
