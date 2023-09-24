import { useEffect } from "react";
import { useRouter } from "next/router";
import { RainbowKitCustomConnectButton } from "./scaffold-eth";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getAccount } from "@wagmi/core";

const SplashPage = () => {
  const router = useRouter();
  const account = getAccount();

  useEffect(() => {
    if (account.isConnected) {
      router.push("/home");
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
        {account.isConnected ? <RainbowKitCustomConnectButton /> : <ConnectButton label="Get started" />}
      </div>
    </div>
  );
};

export default SplashPage;
