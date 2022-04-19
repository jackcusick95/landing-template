import "../styles/globals.css";
import type { AppProps } from "next/app";
import WalletProvider from "../context/walletContextProvider";
import { Web3ReactProvider } from "@web3-react/core";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { QueryClient, QueryClientProvider } from "react-query";

const getLibrary = (
  provider: ExternalProvider | JsonRpcFetchFunc
): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <WalletProvider>
          <Component {...pageProps} />
        </WalletProvider>
      </Web3ReactProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
