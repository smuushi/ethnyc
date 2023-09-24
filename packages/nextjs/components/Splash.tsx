import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RainbowKitCustomConnectButton } from "./scaffold-eth";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getAccount } from "@wagmi/core";

const SplashPage = () => {
  const router = useRouter();
  const account = getAccount();

  useEffect(() => {
    if (account.isConnected) {
      router.push("/PactIndex");
    }
  }, [account, router]);

  return (
    <div className="landing-background">
      <div className="landing-container">
        <h1>im-pact-ful</h1>
        <h2>Better returns on healthier habits</h2>
        <p>Invest in yourself, and see dividends in health and wealth. Your pact, your gain!</p>
        {/* if wallet is already connected, then skip connect step */}
        {/* <Link href={account.isConnected ? "/pact-actions" : "/connect"}>Create Your Pact</Link> */}
        {/* <Link href={"/pact-actions"}>Create Your Pact</Link> */}
        {/* {account.isConnected ? <RainbowKitCustomConnectButton /> : <ConnectButton label="Get started" />} */}
        <Link
          className="iekbcc0 iekbcc9 ju367v73 ju367v7o ju367v9c ju367vn ju367vec ju367vex ju367v11 ju367v1c ju367v2b ju367v8o _12cbo8i3 ju367v8m _12cbo8i4 _12cbo8i6"
          href="/PactIndex"
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default SplashPage;
