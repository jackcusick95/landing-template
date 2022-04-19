import Head from "next/head";
import styled from "styled-components";
import { ethers } from "ethers";
import { useWalletContext } from "../context/walletContext";
import LoginButton from "../components/LoginButton";
import { useMutation } from "react-query";
import { postToTwitter } from "../api/twitter";
import { useState } from "react";

const HeroSection = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: rgb(34, 27, 71);
  padding: 1rem 10% 4rem 10%;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: auto;
  justify-content: space-between;
`;
const Logo = styled.div`
  display: flex;
  float: left;
  padding: 0rem;
`;

const LogoText = styled.div`
  color: white;
  font-size: 40px;
  font-family: "Press Start 2P";
  font-weight: normal;
  font-style: normal;
  margin: 1rem 0px;
  -webkit-font-smoothing: none;
`;

const MintSection = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 3rem;
  display: table;
  margin-top: 2rem;
`;

const MintButtonSection = styled.div`
  position: relative;
  display: flex;
  margin: 1.2rem auto;
  width: 270px !important;
  display: table;
`;

const MintText = styled.p`
  color: white;
  font-size: 20px;
  font-family: "Press Start 2P";
  font-weight: normal;
  font-style: normal;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  padding: 1rem 0rem;
`;

const MintButton = styled.p`
  text-shadow: rgb(0 0 0) -1px -1px 0px, rgb(0 0 0) 0px -1px 0px,
    rgb(0 0 0) 1px -1px 0px, rgb(0 0 0) 1px 0px 0px, rgb(0 0 0) 1px 1px 0px,
    rgb(0 0 0) 0px 1px 0px, rgb(0 0 0) -1px 1px 0px, rgb(0 0 0) -1px 0px 0px;
  border: 0.2rem solid rgb(0, 0, 0);
  border-radius: 1rem;
  font-family: "Press Start 2P";
  font-weight: normal;
  font-style: normal;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 1.2rem 0.5rem;
  width: 250px;
  height: auto;
  font-size: 1.1rem;
  color: rgb(255, 255, 255);
  background: #3cb371;
  animation: pulsate 3s ease-out infinite;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  @keyframes pulsate {
    0% {
      box-shadow: 0 0 0rem #ffd51f;
    }
    50% {
      box-shadow: 0 0 1.2rem #ffd51f;
    }
    100% {
      box-shadow: 0 0 0rem #ffd51f;
    }
  }
`;

const TweetButtonContainer = styled.div`
  position: relative;
  display: flex;
  float: right;
  margin-top: 1rem;
  width: 100px;
  height: 3rem;
  display: table;
`;

const TweetButton = styled.div`
  border-radius: 9999px;
  font-weight: 500;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 1rem 2rem;
  width: 100px;
  height: auto;
  font-size: 1.6rem;
  color: rgb(255, 255, 255);
  background-color: rgb(29, 155, 240);
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  padding: 1rem 0rem;
`;

const FormTweetContainer = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 60%;
  height: auto;
  border: 1px solid white;
  display: table;
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 10px 10px 0px 0px;
`;

const TweetPfp = styled.img`
  display: inline-block;
  color: white;
  margin-left: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  vertical-align: left;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  border: 1px solid black;
`;

const TweetInput = styled.input`
  float: right;
  color: white;
  right: 0;
  vertical-align: top;
  width: 70%;
  height: 8rem;
`;

const ThreeBoxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 20rem;
`;

const StyledLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  width: 20%;
  border: 1px solid white;
  background-color: black;
  padding-top: 3rem;
  color: white;
`;

const StyledRightBox = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  width: 20%;
  border: 1px solid white;
  background-color: black;
  padding-top: 3rem;
  color: white;
`;

const StyledMiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  width: 60%;
  background-color: lightgrey;
  padding-top: 3rem;
`;

export default function Home(): JSX.Element {
  const { login, active, signer, account } = useWalletContext();
  const [translatedText, setTranslatedText] = useState("");

  // console.log(active, signer, account);

  const isAddress = (value: string) => {
    try {
      return ethers.utils.getAddress(value);
    } catch {
      return false;
    }
  };

  const shortenAddress = (address: string, chars = 4) => {
    const parsed = isAddress(address);
    if (!parsed) {
      return `${address.substring(0, chars + 2)}...${address.substring(
        42 - chars
      )}`;
    }
    return `${parsed.substring(0, chars + 2)}...${parsed.substring(
      42 - chars
    )}`;
  };

  const shortAddress = shortenAddress(account);

  const { mutate: postNewTweet } = useMutation(postToTwitter);

  const handleTweet = () => {
    if (translatedText !== "") {
      postNewTweet({ text: translatedText });
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          media="screen"
          href="http://fonts.googleapis.com/css?family=Press+Start+2P"
          type="text/css"
        />
      </Head>
      <HeroSection>
        <Header>
          <Logo>
            <LogoText>WassieDao</LogoText>
          </Logo>
          <LoginButton
            active={active}
            onClick={login}
            shortenAddress={shortAddress}
          />
        </Header>
        <MintSection>
          <MintText>Mint is Live!</MintText>
        </MintSection>
        <MintButtonSection>
          <MintButton>Claim ur Smol</MintButton>
        </MintButtonSection>
        <MintSection>
          <MintText>Smols Minted: 0 / 7000</MintText>
        </MintSection>
        <FormTweetContainer>
          <TweetPfp src="/assets/pfp.jpeg" />
          <TweetInput
            value={translatedText}
            onChange={(newValue) => {
              const updatedText = newValue.target.value;
              setTranslatedText(updatedText);
            }}
            placeholder="tweet from..."
          />
          <TweetButtonContainer>
            <TweetButton onClick={handleTweet}>Tweet</TweetButton>
          </TweetButtonContainer>
        </FormTweetContainer>
        <ThreeBoxContainer>
          <StyledLeftBox>smolting images</StyledLeftBox>
          <StyledMiddleBox>tweets go here</StyledMiddleBox>
          <StyledRightBox>smolting images</StyledRightBox>
        </ThreeBoxContainer>
      </HeroSection>
    </>
  );
}
