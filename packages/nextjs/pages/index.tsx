import Link from "next/link";
import { getAccount } from "@wagmi/core";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const account = getAccount();

  return (
    <>
      {/* <NavLink href="/index-copy">Original Index</NavLink> */}
      <div className="landing-background">
        <div className="landing-container">
          <h1>im-pact</h1>
          <h2>Better returns on healthier habits</h2>
          <p>Create beneficial habits through social pacts and financial incentive</p>
          {/* if wallet is already connected, then skip connect step */}
          <Link href={account.isConnected ? "/pact-actions" : "/connect"}>Create Your Pact</Link>
          {/* <Link href={"/pact-actions"}>Create Your Pact</Link> */}
        </div>
      </div>
    </>
  );
};

export default Home;
