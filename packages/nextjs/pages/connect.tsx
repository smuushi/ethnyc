import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";

const Connect: NextPage = () => {
  return (
    <div className="flex items-center flex-col">
      <p>widget to connect to wallet</p>
      <ConnectButton />
    </div>
  );
};

export default Connect;
