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

  console.log(data ? data[5] : "", "this is date");

  if (!data) return <div className="[pact-data]"></div>;

  return (
    <div className="pact-data">
      <p>{data[0]}</p>
      <p>{data[1]}</p>
      <div>
        <p>Start Date: {new Date(parseInt(data[5])).toLocaleString().split(",")[0]}</p>
        <p>Duration: {parseFloat(data[4]) / 86400}</p>
      </div>
      <div>
        <p>
          {parseFloat(data[3])}/{parseFloat(data[2])}
        </p>
      </div>
    </div>
  );
};
