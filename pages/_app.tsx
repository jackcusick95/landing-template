import "../styles/globals.css";
import type { AppProps } from "next/app";
import WalletProvider from "../context/walletContextProvider";
import { Web3ReactProvider } from "@web3-react/core";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";

const getLibrary = (
  provider: ExternalProvider | JsonRpcFetchFunc
): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
