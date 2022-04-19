import { createContext, Dispatch, SetStateAction, useContext } from "react";
import noop from "lodash/noop";
import { BigNumber, constants, ethers } from "ethers";

import { NATIVE_CURRENCY, NETWORK_TYPE } from "../utils/constants";

export type WalletContextType = {
  account: string;
  active: boolean;
  signer: ethers.Signer | undefined;
  provider: ethers.providers.Web3Provider | undefined;
  network?: NETWORK_TYPE;
  currency: NATIVE_CURRENCY;
  login: () => void;
  logout: () => void;
};

export const WalletContext = createContext<WalletContextType>({
  account: constants.AddressZero,
  active: false,
  signer: undefined,
  provider: undefined,
  network: undefined,
  currency: "ETH",
  login: () => noop(),
  logout: () => noop(),
});

export const useWalletContext = (): WalletContextType => {
  return useContext(WalletContext);
};
