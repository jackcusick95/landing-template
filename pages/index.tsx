/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import styled from "styled-components";
import { ethers } from "ethers";
import { useWalletContext } from "../context/walletContext";
import LoginButton from "../components/LoginButton";
import { useEffect, useState } from "react";
import TweetCard from "../components/TweetCard";
import { getTweets } from "../hooks/getTweets";
import postWassieTweet from "./api/postWassieTweet";
import { postWasTweet } from "../api/twitter";

const HeroSection = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: rgb(34, 27, 71);
  padding: 1rem 10% 4rem 10%;
  @media screen and (max-width: 550px) {
    padding: 1rem 3% 4rem 3%;
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: auto;
  justify-content: space-between;
  @media screen and (max-width: 550px) {
    display: table;
    float: none;
    justify-content: center;
  }
`;
const Logo = styled.div`
  display: flex;
  float: left;
  padding: 0rem;
  @media screen and (max-width: 550px) {
    position: relative;
    display: table;
    margin: 0 auto;
    float: none;
    width: 100%;
    padding-top: 0.5rem;
  }
`;

const LogoText = styled.div`
  color: white;
  font-size: 40px;
  font-family: "Press Start 2P";
  font-weight: normal;
  font-style: normal;
  margin: 1rem 0px;
  -webkit-font-smoothing: none;
  @media screen and (max-width: 550px) {
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    margin: 0 auto;
  }
`;

// const FileInput = styled.input`
//   display: flex;
// `;

const MintSection = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 3rem;
  display: table;
  margin-top: 2rem;
`;

const MintCountSection = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 100%;
  height: 3rem;
  display: table;
  margin-top: 0.2rem;
`;

const MintButtonSection = styled.div`
  position: relative;
  display: flex;
  margin: 1.2rem auto;
  max-width: 250px;
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
  @media screen and (max-width: 550px) {
    font-size: 18px;
  }
`;

const MintPriceText = styled.p`
  color: white;
  font-size: 15px;
  font-family: "Press Start 2P";
  font-weight: normal;
  font-style: normal;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  padding: 1rem 0rem 0rem 0rem;
  @media screen and (max-width: 550px) {
    font-size: 14px;
  }
`;

const MintedText = styled.p`
  color: white;
  font-size: 20px;
  font-family: "Press Start 2P";
  font-weight: normal;
  font-style: normal;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  padding: 0rem;
  @media screen and (max-width: 550px) {
    font-size: 14px;
  }
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
  padding: 1rem 1.5rem;
  max-width: 250px;
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
  @media screen and (max-width: 550px) {
    font-size: 0.9rem;
    padding: 1rem 0rem;
    width: 230px;
  }
`;

const TweetButtonContainer = styled.div`
  position: relative;
  display: flex;
  float: right;
  margin-top: 0.5rem;
  width: auto;
  height: 2rem;
  display: table;
`;

const TabsContainer = styled.div`
  position: relative;
  display: flex;
  float: left;
  margin-top: 2rem;
  margin-bottom: -2px;
  width: auto;
  height: 2.2rem;
  display: table;
  z-index: 110;
`;

const TweetButton = styled.button`
  border-radius: 9999px;
  font-family: "Press Start 2P";
  opacity: 0.5;
  font-weight: 500;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.8rem 1rem;
  width: auto;
  height: auto;
  font-size: 0.9rem;
  color: rgb(255, 255, 255);
  background-color: rgb(29, 155, 240);
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border: none;
  @media screen and (max-width: 950px) {
    font-size: 0.8rem;
    padding: 0.8rem 0.8rem;
  }
`;

const StyledTab = styled.div`
  font-weight: normal;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.4rem 1.5rem;
  opacity: 0.5;
  width: auto;
  height: auto;
  font-size: 0.6rem;
  font-family: "Press Start 2P";
  margin: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border: 1px solid rgb(255, 255, 255, 0.4);
  border-radius: 10px 10px 0px 0px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledActiveTab = styled.div`
  font-weight: normal;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.4rem 1.5rem;
  width: auto;
  height: auto;
  font-size: 0.6rem;
  font-family: "Press Start 2P";
  margin: 1rem;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border-top: 1px solid rgb(255, 255, 255, 0.4);
  border-right: 1px solid rgb(255, 255, 255, 0.4);
  border-left: 1px solid rgb(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px 10px 0px 0px;
  z-index: 100;
  &:hover {
    cursor: pointer;
  }
`;

const TweetActiveButton = styled.button`
  border-radius: 9999px;
  font-family: "Press Start 2P";
  opacity: 1;
  font-weight: 300;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.8rem 1rem;
  width: auto;
  height: auto;
  font-size: 0.9rem;
  color: rgb(255, 255, 255);
  background-color: rgb(29, 155, 240);
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border: none;
  @media screen and (max-width: 950px) {
    font-size: 0.8rem;
    padding: 0.8rem 0.8rem;
  }
`;

const TranslateButtonContainer = styled.div`
  position: relative;
  display: flex;
  float: right;
  margin-top: 0.5rem;
  margin-right: 1rem;
  width: auto;
  height: 2rem;
  display: table;
`;

const TranslateButton = styled.button`
  border-radius: 9999px;
  font-family: "Press Start 2P";
  opacity: 0.5;
  font-weight: 300;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.8rem 1rem;
  width: auto;
  height: auto;
  font-size: 0.9rem;
  color: rgb(255, 255, 255);
  background: #3cb371;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border: none;
  @media screen and (max-width: 950px) {
    font-size: 0.8rem;
    padding: 0.8rem 0.8rem;
  }
`;

const TranslateActiveButton = styled.button`
  border-radius: 9999px;
  font-family: "Press Start 2P";
  opacity: 1;
  font-weight: 300;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  width: auto;
  height: auto;
  color: rgb(255, 255, 255);
  background: #3cb371;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border: none;
  @media screen and (max-width: 950px) {
    font-size: 0.8rem;
    padding: 0.8rem 0.8rem;
  }
`;

const FormTweetContainer = styled.div`
  background-color: #b19cd970;
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 60%;
  height: auto;
  display: table;
  margin-top: 2rem;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 10px;
  @media screen and (max-width: 750px) {
    width: 90%;
  }
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const TweetPfpContainer = styled.div`
  display: inline-block;
  text-align: center;
  width: 20%;
  margin-bottom: 0.8rem;
  @media screen and (max-width: 950px) {
    margin-bottom: 2.5rem;
  }
`;

const TweetPfp = styled.img`
  display: inline-block;
  color: white;
  background-color: white;
  padding: 0.6rem;
  /* margin-left: 0.5rem; */
  margin-bottom: 0.5rem;
  text-align: center;
  vertical-align: left;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  @media screen and (max-width: 950px) {
    margin-left: 0rem;
    height: 4rem;
    width: 4rem;
  }
`;

const AttachmentIcon = styled.img`
  display: inline-block;
  color: white;
  margin-left: 0.5rem;
  margin-top: 0.3rem;
  text-align: center;
  vertical-align: left;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
`;

const WassieBackgroundOne = styled.img`
  position: absolute;
  top: 10rem;
  left: 5rem;
  text-align: center;
  vertical-align: left;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  transform: rotate(-10deg);
  opacity: 0.5;
  @media screen and (max-width: 950px) {
    left: 2rem;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const WassieBackgroundTwo = styled.img`
  position: absolute;
  top: 10rem;
  right: 5rem;
  text-align: center;
  vertical-align: left;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  transform: rotate(20deg);
  opacity: 0.5;
  @media screen and (max-width: 950px) {
    right: 2rem;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const WassieBackgroundThree = styled.img`
  position: absolute;
  top: 30rem;
  left: 5rem;
  text-align: center;
  vertical-align: left;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  transform: rotate(20deg);
  opacity: 0.5;
  @media screen and (max-width: 950px) {
    left: 2rem;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const WassieBackgroundFour = styled.img`
  position: absolute;
  top: 30rem;
  right: 5rem;
  text-align: center;
  vertical-align: left;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  transform: rotate(-10deg);
  opacity: 0.5;
  @media screen and (max-width: 950px) {
    right: 2rem;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const WassieBackgroundFive = styled.img`
  position: absolute;
  top: 50rem;
  left: 5rem;
  text-align: center;
  vertical-align: left;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  transform: rotate(-10deg);
  opacity: 0.5;
  @media screen and (max-width: 950px) {
    left: 2rem;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const WassieBackgroundSix = styled.img`
  position: absolute;
  top: 50rem;
  right: 5rem;
  text-align: center;
  vertical-align: left;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  transform: rotate(20deg);
  opacity: 0.5;
  @media screen and (max-width: 950px) {
    right: 2rem;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const WassieBackgroundSeven = styled.img`
  position: absolute;
  top: 70rem;
  left: 5rem;
  text-align: center;
  vertical-align: left;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  transform: rotate(20deg);
  opacity: 0.5;
  @media screen and (max-width: 950px) {
    left: 2rem;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const WassieBackgroundEight = styled.img`
  position: absolute;
  top: 70rem;
  right: 5rem;
  text-align: center;
  vertical-align: left;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  transform: rotate(-10deg);
  opacity: 0.5;
  @media screen and (max-width: 950px) {
    right: 2rem;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;
const WassieBackgroundNine = styled.img`
  position: absolute;
  top: 90rem;
  left: 5rem;
  text-align: center;
  vertical-align: left;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  transform: rotate(-10deg);
  opacity: 0.5;
  @media screen and (max-width: 950px) {
    left: 2rem;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const WassieBackgroundTen = styled.img`
  position: absolute;
  top: 90rem;
  right: 5rem;
  text-align: center;
  vertical-align: left;
  height: 10rem;
  width: 10rem;
  border-radius: 50%;
  transform: rotate(20deg);
  opacity: 0.5;
  @media screen and (max-width: 950px) {
    right: 2rem;
  }
  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const WassieCount = styled.div`
  color: white;
  display: block;
  font-family: "Press Start 2P";
  font-size: 12px;
  font-weight: 500;
  @media screen and (max-width: 950px) {
    margin-left: 0rem;
    font-size: 10px;
  }
`;

const WassieCountNum = styled.div`
  color: white;
  display: block;
  font-family: "Press Start 2P";
  font-size: 12px;
  font-weight: 500;
  margin-top: 10px;
  @media screen and (max-width: 550px) {
    margin-left: 0rem;
    font-size: 10px;
  }
`;

const TweetInput = styled.textarea`
  float: right;
  color: black;
  right: 0;
  font-size: 16px;
  vertical-align: top;
  width: 75%;
  height: 8rem;
  padding: 6px;
  resize: none;
  border-radius: 10px;
`;

const ThreeBoxContainer = styled.div`
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 60%;
  height: auto;
  display: table;
  @media screen and (max-width: 1000px) {
    width: 65%;
  }
  @media screen and (max-width: 750px) {
    width: 90%;
  }
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const StyledMiddleBox = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  padding-top: 0rem;
  height: auto;
  @media screen and (min-width: 550px) {
    height: 68rem;
    max-height: 95vh;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 100px;
      border: 1px solid #000;
      background-color: #b19cd9;
    }
    &::-webkit-scrollbar-track {
      border-radius: 100px;
      background-color: none;
    }
  }
`;

const StyledCharCount = styled.div`
  position: absolute;
  right: 1.7rem;
  top: 7.6rem;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  font-family: "Prompt";
  color: grey;
  height: 100%;
  width: auto;
`;

export default function Home(): JSX.Element {
  const { login, active, account } = useWalletContext();
  const [translatedText, setTranslatedText] = useState("");
  const [readyToTranslated, setReadyToTranslated] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [tweetsList, setTweetsList] = useState([]);
  const [allTweetData, setAllTweetData] = useState([]);
  const [wassieTweets, setWassieTweets] = useState(true);

  // const [tweetFile, setTweetFile] = useState<string | ArrayBuffer | null>("");

  useEffect(() => {
    if (translatedText.length > 0 && active) {
      setReadyToTranslated(true);
    }

    if (translatedText.length < 1 || !active) {
      setReadyToTranslated(false);
    }
  }, [active, translatedText]);

  useEffect(() => {
    if (isTranslated) {
      setReadyToTranslated(false);
    }

    if (isTranslated && translatedText.length < 1) {
      setIsTranslated(false);
    }
  }, [isTranslated, translatedText.length]);

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

  // const { mutate: postNewTweet } = useMutation(postToTwitter);

  // NEED TO GET THIS WORKING
  // const handleTweet = async () => {
  //   if (translatedText !== "" && translatedText.length < 280) {
  //     await postWasTweet({ text: translatedText });
  //     setTranslatedText("");
  //   }

  //   if (translatedText.length > 280) {
  //     alert("Exceeding Twitter's 280 char count");
  //     return;
  //   }
  // };

  const handleTweet = async () => {
    alert("You will be able to tweet after mint!");
    return;
  };

  // USE ONCE MINT BEGINS
  // const handleTranslate = () => {
  //   if (readyToTranslated && active) {
  //     // LOGIC FOR TRANSLATION GOES HERE

  //     setIsTranslated(true);
  //   }
  // };

  const handleTranslate = () => {
    alert("You will be able to translate after mint!");
    return;
  };

  const TWITTER_MAX_CHARS = 280;

  const { wassieTweetData, inverseData } = getTweets();

  useEffect(() => {
    if (wassieTweets && wassieTweetData) {
      const wassieData = wassieTweetData.data;
      setAllTweetData(wassieData);
      setTweetsList(wassieData.data);
    }
    if (!wassieTweets && inverseData) {
      const inversebraData = inverseData.data;
      setAllTweetData(inversebraData);
      setTweetsList(inversebraData.data);
    }
  }, [inverseData, wassieTweetData, wassieTweets]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap"
          rel="stylesheet"
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
        <WassieBackgroundOne src="/assets/fingerlessWassie.png" />
        <WassieBackgroundTwo src="/assets/fingerlessWassie.png" />
        <WassieBackgroundThree src="/assets/fingerlessWassie.png" />
        <WassieBackgroundFour src="/assets/fingerlessWassie.png" />
        <WassieBackgroundFive src="/assets/fingerlessWassie.png" />
        <WassieBackgroundSix src="/assets/fingerlessWassie.png" />
        <WassieBackgroundSeven src="/assets/fingerlessWassie.png" />
        <WassieBackgroundEight src="/assets/fingerlessWassie.png" />
        {/* <WassieBackgroundNine src="/assets/fingerlessWassie.png" />
        <WassieBackgroundTen src="/assets/fingerlessWassie.png" /> */}

        <MintSection>
          <MintText>Wen Mint?</MintText>
        </MintSection>
        <MintButtonSection>
          <MintButton>~ Thoon ~</MintButton>
        </MintButtonSection>
        <MintSection>
          <MintPriceText>Mint Price: 0.069 ETH</MintPriceText>
        </MintSection>
        <MintCountSection>
          <MintedText>Wassies Minted: 0 / 2222</MintedText>
        </MintCountSection>
        <FormTweetContainer>
          <TweetPfpContainer>
            <TweetPfp src="/assets/fingerlessWassie.png" />
            <WassieCount>Wassies</WassieCount>
            <WassieCountNum>0</WassieCountNum>
          </TweetPfpContainer>
          <TweetInput
            value={translatedText}
            onChange={(newValue) => {
              const updatedText = newValue.target.value;
              setTranslatedText(updatedText);
            }}
            placeholder="Tweet from @WassieTweetDao..."
          />
          <StyledCharCount id="tooManyChar">
            ({translatedText?.length || 0}/{TWITTER_MAX_CHARS})
          </StyledCharCount>
          {readyToTranslated ? (
            <>
              <TweetButtonContainer>
                <TweetActiveButton disabled={false} onClick={handleTweet}>
                  Tweet
                </TweetActiveButton>
              </TweetButtonContainer>
              <TranslateButtonContainer>
                <TranslateActiveButton
                  disabled={false}
                  onClick={handleTranslate}
                >
                  Translate
                </TranslateActiveButton>
              </TranslateButtonContainer>
            </>
          ) : (
            <>
              <TweetButtonContainer>
                <TweetButton disabled onClick={handleTweet}>
                  Tweet
                </TweetButton>
              </TweetButtonContainer>
              <TranslateButtonContainer>
                <TranslateButton disabled onClick={handleTranslate}>
                  Translate
                </TranslateButton>
              </TranslateButtonContainer>
            </>
          )}
        </FormTweetContainer>

        <ThreeBoxContainer>
          <TabsContainer>
            {wassieTweets ? (
              <>
                <StyledActiveTab onClick={() => setWassieTweets(true)}>
                  Recent Tweets
                </StyledActiveTab>
                <StyledTab onClick={() => setWassieTweets(false)}>
                  @inversebrah
                </StyledTab>
              </>
            ) : (
              <>
                <StyledTab onClick={() => setWassieTweets(true)}>
                  Recent Tweets
                </StyledTab>
                <StyledActiveTab onClick={() => setWassieTweets(false)}>
                  @inversebrah
                </StyledActiveTab>
              </>
            )}
          </TabsContainer>
          <StyledMiddleBox>
            {tweetsList?.map((tweets: any) => {
              return (
                <TweetCard
                  key={tweets.id}
                  isWassie={wassieTweets}
                  tweets={tweets}
                  allData={allTweetData}
                />
              );
            })}
          </StyledMiddleBox>
        </ThreeBoxContainer>
      </HeroSection>
    </>
  );
}
