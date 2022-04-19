import Head from "next/head";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import { useWalletContext } from "../context/walletContext";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

const ConnectButton = styled.div`
  display: flex;
  float: right;
  padding: 0rem;
  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.div`
  text-shadow: rgb(0 0 0) -1px -1px 0px, rgb(0 0 0) 0px -1px 0px,
    rgb(0 0 0) 1px -1px 0px, rgb(0 0 0) 1px 0px 0px, rgb(0 0 0) 1px 1px 0px,
    rgb(0 0 0) 0px 1px 0px, rgb(0 0 0) -1px 1px 0px, rgb(0 0 0) -1px 0px 0px;
  border: 0.2rem solid rgb(0, 0, 0);
  border-radius: 1rem;
  font-weight: 500;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.3rem 1rem;
  margin-top: 10px;
  width: 220px;
  height: 50px;
  font-size: 1.6rem;
  color: rgb(255, 255, 255);
  background: #3cb371;
`;

type LoginButtonProps = {
  active: boolean;
  shortenAddress: string;
  onClick: () => void;
};

export default function LoginButton({
  active,
  shortenAddress,
  onClick,
}: LoginButtonProps): JSX.Element {
  return (
    <ConnectButton onClick={onClick}>
      <StyledButton>{active ? shortenAddress : "Connect Wallet"}</StyledButton>
    </ConnectButton>
  );
}
