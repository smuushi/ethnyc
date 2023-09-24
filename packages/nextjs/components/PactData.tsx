import { useAccount } from "wagmi";
import {
  // useScaffoldContract,
  useScaffoldContractRead, // useScaffoldEventHistory,
  // useScaffoldEventSubscriber
} from "~~/hooks/scaffold-eth";

export const PactData = ({ index }: { index: number }) => {
  const { data: data } = useScaffoldContractRead({
    contractName: "PiggyContract",
    functionName: "getPactDetails",
    args: [BigInt(index)],
  });

  if (!data) return null;

  return (
    <div className="pact-data">
      <h3>{data[0]}</h3>
      <div id="separator" />
      <div className="pact-bottom">
        <p className="pact-desc">{data[1]}</p>
        <div className="pact-time">
          <p>Start Date: {new Date(parseInt(data[5])).toLocaleString().split(",")[0]}</p>
          <p>Duration: {parseFloat(data[4]) / 86400} days</p>
        </div>
        <div className="pact-bottom-bottom">
          <p className="ante">{parseFloat(data[6]) / 10 ** 18} ETH</p>
          <p className="participation-count">
            {parseFloat(data[3])}/{parseFloat(data[2])}
          </p>
        </div>
      </div>
    </div>
  );
};
