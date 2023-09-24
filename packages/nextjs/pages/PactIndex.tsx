import { NextPage } from "next";
import { PactData } from "~~/components/PactData";

const PactIndex: NextPage = () => {
  return (
    <div className="pact-index">
      <PactData index={0} />
      <PactData index={1} />
      <PactData index={2} />
      <PactData index={3} />
      <PactData index={4} />
    </div>
  );
};

export default PactIndex;
