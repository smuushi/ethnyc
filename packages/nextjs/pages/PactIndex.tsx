import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getAccount } from "@wagmi/core";
import { NextPage } from "next";
import { PactData } from "~~/components/PactData";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const PactIndex: NextPage = () => {
  const account = getAccount();

  return (
    <div className="pact-background">
      <div className="center-button">
        {account.isConnected ? <RainbowKitCustomConnectButton /> : <ConnectButton label="Connect your wallet" />}
        <a
          href="https://converse.xyz/dm/0x7C64C0B0A703d6b519191f866E0935d4eC2B86CC"
          target="_blank"
          rel="noopener noreferrer"
        >
          Talk to your im-pact-ful coach!
        </a>
        <Link href="/pact-actions">Create a pact</Link>
      </div>
      <div className="pact-index">
        <PactData index={0} />
        <PactData index={1} />
        <PactData index={2} />
        <PactData index={3} />
        <PactData index={4} />
        <PactData index={5} />
        <PactData index={6} />
        <PactData index={7} />
        <PactData index={8} />
        <PactData index={9} />
        <PactData index={10} />
        <PactData index={11} />
        <PactData index={12} />
        <PactData index={13} />
      </div>
    </div>
  );
};

export default PactIndex;
