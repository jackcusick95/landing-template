import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { constants } from "ethers";
import ReactGA from "react-ga";
import { WalletContext } from "./walletContext";
import { NETWORK_TYPE } from "../utils/constants";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

type WalletProviderProps = {
  children: JSX.Element;
};

export default function WalletProvider({
  children,
}: WalletProviderProps): JSX.Element {
  const { account, active, connector, activate, deactivate, library } =
    useWeb3React();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activatingConnector, setActivatingConnector] = useState<
    AbstractConnector | undefined
  >(undefined);

  const signer = library?.getSigner();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
      if (active) {
        setShowLoginModal(false);
      }
    }
  }, [activatingConnector, connector, active]);

  const injected = new InjectedConnector({
    supportedChainIds: [1],
  });

  const login = () => {
    ReactGA.event({
      category: "Login",
      action: "Metamask",
    });
    setActivatingConnector(injected);
    activate(injected);
  };

  const logout = () => deactivate();

  return (
    <WalletContext.Provider
      value={{
        account: account || constants.AddressZero,
        active,
        signer,
        provider: library,
        network: NETWORK_TYPE.ETHEREUM,
        currency: "ETH",
        login,
        logout,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
