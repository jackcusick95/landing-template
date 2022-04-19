import React, { useState, Dispatch, SetStateAction } from "react";
import { Modal } from "react-bootstrap";
import styled, { keyframes } from "styled-components";
import { AbstractConnector } from "@web3-react/abstract-connector";
import ReactGA from "react-ga";
import { InjectedConnector } from "@web3-react/injected-connector";

const Container = styled.div`
  padding-bottom: 1.5rem;
  background-color: #fff;
  border-radius: 1rem;
  border: 2px #000 solid;
  overflow-x: hidden;
`;

const Header = styled.div`
  text-align: center;
  display: inline;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-bottom: 2px #000 solid;
`;

const Heading = styled.h1`
  font-family: "Teko", "Prompt", sans-serif;
  font-size: 30px;
  font-weight: bold;
  margin-left: 50%;
  margin: 0;
`;

const Body = styled.div`
  padding: 20px 20px 0 20px;
  text-align: center;
`;

const SubHeading = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0;
`;

const WalletSelectMessageContent = styled(SubHeading)`
  font-weight: normal;
`;

const StyledText = styled.p`
  font-size: 14px;
`;

const ErrorText = styled(StyledText)`
  color: #ff6666;
  margin-bottom: 0;
  line-height: 1.5rem;
  min-height: 3rem;
`;

const StyledButton = styled.div`
  position: absolute;
  right: 10px;
  padding: 5px;
  & :hover {
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const ButtonContainer = styled(ButtonsContainer)`
  margin: 2rem 0;
`;

const KeyFrames = keyframes`
  0%
  {
    background-position: 100%;
  }
  100%
  {
    background-position: 0;
  }
`;

const LoadingBarContainer = styled.div`
  width: 100%;
  height: 5px;
  overflow: hidden;
`;

const LoadingBar = styled.span`
  display: block;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    #e553ec,
    #1022dc 17%,
    #5c52e9 34%,
    #01feff 51%,
    #e553ec 68%,
    #1022dc 85%,
    #5c52e9
  );
  background-size: 300% 100%;
  animation: ${KeyFrames} 2s linear infinite;
`;

const RelativeContainer = styled.div`
  position: relative;
`;

const StyledLoginButton = styled.div`
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

type WalletSelectProps = {
  show: boolean;
  onClose: () => void;
  connector: AbstractConnector | undefined;
  activatingConnector: AbstractConnector | undefined;
  setActivatingConnector: Dispatch<
    SetStateAction<AbstractConnector | undefined>
  >;
  activate: (connector: AbstractConnector) => void;
};

const LoginModal = ({
  show,
  onClose,
  connector,
  activatingConnector,
  setActivatingConnector,
  activate,
}: WalletSelectProps): JSX.Element => {
  const [error, setError] = useState<string | undefined>();
  const [emailSelected, setEmailSelected] = useState<boolean>(false);
  const activating =
    activatingConnector !== undefined && connector !== activatingConnector;
  const signInLabel = "Sign In with MetaMask";

  const injected = new InjectedConnector({
    supportedChainIds: [1],
  });

  const handleMetaMaskLogin = () => {
    ReactGA.event({
      category: "Login",
      action: "Metamask",
    });
    setActivatingConnector(injected);
    activate(injected);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setError("");
        onClose();
      }}
      centered
      animation={false}
      aria-labelledby="wallet-select-modal"
    >
      <Modal.Body>
        <Container>
          <LoadingBarContainer>
            {activating && <LoadingBar />}
          </LoadingBarContainer>
          <Header>
            <Heading>Sign In</Heading>
            <StyledButton
              onClick={() => {
                setError("");
                onClose();
              }}
            >
              {/* <img width="25px" src="/assets/x.svg" alt="" /> */}
            </StyledButton>
          </Header>
          <Body>
            <>
              <SubHeading>
                Enter your email to receive a sign in link
              </SubHeading>
              <StyledText>
                If this is your first time, it will create a new account
              </StyledText>
            </>
            <StyledText>
              By signing in you agree to our
              <a target="_blank" href="/assets/terms.pdf">
                {" "}
                Terms & Conditions
              </a>
            </StyledText>
            {error && <ErrorText>{error}</ErrorText>}
          </Body>
          <ButtonsContainer>
            {!emailSelected && (
              <>
                <ButtonContainer>
                  <StyledLoginButton onClick={handleMetaMaskLogin}>
                    {signInLabel}
                  </StyledLoginButton>
                </ButtonContainer>
                <SubHeading>― or ―</SubHeading>
              </>
            )}
          </ButtonsContainer>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
