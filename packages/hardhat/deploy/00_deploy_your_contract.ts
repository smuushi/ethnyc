import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

// Import the contract artifact for "PiggyContract"
import PiggyContract from "../artifacts/contracts/PiggyContract.sol/PiggyContract.json";

/**
 * Deploys the "YourContract" and "PiggyContract" contracts using the deployer account.
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy "YourContract"
  await deploy("YourContract", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  // Deploy "PiggyContract"
  await deploy("PiggyContract", {
    from: deployer,
    args: [], // Modify the constructor arguments as needed
    log: true,
    autoMine: true,
  });

  // Get the deployed contracts
  const yourContract = await hre.ethers.getContract("YourContract", deployer);
  const piggyContract = await hre.ethers.getContract("PiggyContract", deployer);
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["YourContract"];
