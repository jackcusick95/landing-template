/* eslint-disable @next/next/no-page-custom-font */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import WalletProvider from "../context/walletContextProvider";
import { Web3ReactProvider } from "@web3-react/core";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const getLibrary = (
  provider: ExternalProvider | JsonRpcFetchFunc
): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/s/pressstart2p/v12/e3t4euO8T-267oIAQAu6jDQyK3nYivNm4I81PZQ.woff2"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <WalletProvider>
            <Component {...pageProps} />
          </WalletProvider>
        </Web3ReactProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
