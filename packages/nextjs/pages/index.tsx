import Link from "next/link";
import { getAccount } from "@wagmi/core";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const account = getAccount();

  return (
    <>
      {/* <NavLink href="/index-copy">Original Index</NavLink> */}
      <div className="flex items-center flex-col flex-grow pt-10">
        <h1>im-pact</h1>
        <p>financial and social based habit formation</p>
        {/* if wallet is already connected, then skip connect step */}
        <Link href={account.isConnected ? "/pact-actions" : "/connect"}>Create Your Pact</Link>
        {/* <Link href={"/pact-actions"}>Create Your Pact</Link> */}
      </div>
    </>
  );
};

export default Home;
