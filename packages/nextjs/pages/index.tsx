// import Link from "next/link";
// import { getAccount } from "@wagmi/core";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  // const account = getAccount();

  return (
    <>
      {/* <NavLink href="/index-copy">Original Index</NavLink> */}
      <div className="landing-container">
        <h1>im-pact-ful</h1>
        <h2>Better returns on healthier habits</h2>
        <p>Invest in yourself, and see dividends in health and wealth. Your pact, your gain!</p>
        {/* if wallet is already connected, then skip connect step */}
        {/* <Link href={account.isConnected ? "/pact-actions" : "/connect"}>Create Your Pact</Link> */}
        {/* <Link href={"/pact-actions"}>Create Your Pact</Link> */}
        {/* <ConnectButton label="Get started" /> */}
        <RainbowKitCustomConnectButton />
      </div>
    </>
  );
};

export default Home;
