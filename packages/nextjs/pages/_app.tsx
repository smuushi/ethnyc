import { useEffect } from "react";
// import { useState } from "react";
import type { AppProps } from "next/app";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
// import { lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { getAccount } from "@wagmi/core";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
// import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";
// import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/Connect.css";
import "~~/styles/Landing.css";
import "~~/styles/_reset.css";
import "~~/styles/globals.css";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  // const [isDarkTheme, setIsDarkTheme] = useState(true);
  // const { isDarkMode } = useDarkMode();
  const account = getAccount();

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  // useEffect(() => {
  //   setIsDarkTheme(isDarkMode);
  // }, [isDarkMode]);

  return (
    <WagmiConfig config={wagmiConfig}>
      <NextNProgress />
      <RainbowKitProvider
        chains={appChains.chains}
        avatar={BlockieAvatar}
        theme={darkTheme({
          accentColor: "#f6f6f6",
          accentColorForeground: "#121212",
          borderRadius: "medium",
        })}
      >
        <div className={account.isConnected ? "auth-bg" : "landing-background"}>
          <Header />
          <main className="relative flex flex-col flex-1">
            <Component {...pageProps} />
          </main>
          {/* <Footer /> */}
        </div>
        <Toaster />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
