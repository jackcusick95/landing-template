import Head from "next/head";
import styled from "styled-components";
import { ethers } from "ethers";
import { useWalletContext } from "../context/walletContext";
import LoginButton from "../components/LoginButton";
import { useMutation } from "react-query";
import { postToTwitter } from "../api/twitter";
import { useEffect, useState } from "react";
import TweetCard from "../components/TweetCard";

const HeroSection = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: rgb(34, 27, 71);
  padding: 1rem 10% 4rem 10%;
  @media screen and (max-width: 550px) {
    padding: 1rem 4% 4rem 4%;
  }
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
  margin-bottom: -3px;
  width: auto;
  height: 2rem;
  display: table;
  z-index: 100;
`;

const TweetButton = styled.button`
  border-radius: 9999px;
  opacity: 0.5;
  font-weight: 500;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.5rem 1rem;
  width: auto;
  height: auto;
  font-size: 1.2rem;
  color: rgb(255, 255, 255);
  background-color: rgb(29, 155, 240);
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border: none;
  @media screen and (max-width: 550px) {
    font-size: 1rem;
  }
`;

const StyledTab = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-weight: 500;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.3rem 1rem;
  width: auto;
  height: auto;
  font-size: 1rem;
  color: black;
  background-color: white;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border-left: 1px solid rgb(0, 0, 0);
  border-right: 1px solid rgb(0, 0, 0);
  border-top: 1px solid rgb(0, 0, 0);
  border-bottom: 1px solid white;
`;

const TweetActiveButton = styled.button`
  border-radius: 9999px;
  opacity: 1;
  font-weight: 500;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.5rem 1rem;
  width: auto;
  height: auto;
  font-size: 1.2rem;
  color: rgb(255, 255, 255);
  background-color: rgb(29, 155, 240);
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border: none;
  @media screen and (max-width: 550px) {
    font-size: 1rem;
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
  opacity: 0.5;
  font-weight: 500;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.5rem 1rem;
  width: auto;
  height: auto;
  font-size: 1.2rem;
  color: rgb(255, 255, 255);
  background: #3cb371;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border: none;
  @media screen and (max-width: 550px) {
    font-size: 1rem;
  }
`;

const TranslateActiveButton = styled.button`
  border-radius: 9999px;
  opacity: 1;
  font-weight: 500;
  transition: box-shadow 0.3s ease-in-out 0s;
  padding: 0.5rem 1rem;
  width: auto;
  height: auto;
  font-size: 1.2rem;
  color: rgb(255, 255, 255);
  background: #3cb371;
  text-align: center;
  vertical-align: middle;
  display: table-cell;
  border: none;
  @media screen and (max-width: 550px) {
    font-size: 1rem;
  }
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
  padding: 1rem 1rem 0rem 1rem;
  border-radius: 10px 10px 0px 0px;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const TweetPfpContainer = styled.div`
  display: inline-block;
  width: 25%;
  margin-bottom: 0.8rem;
  @media screen and (max-width: 550px) {
    margin-bottom: 2.5rem;
  }
`;

const TweetPfp = styled.img`
  display: inline-block;
  color: white;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  text-align: center;
  vertical-align: left;
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  @media screen and (max-width: 550px) {
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
  @media screen and (max-width: 550px) {
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
  @media screen and (max-width: 550px) {
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
  @media screen and (max-width: 550px) {
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
  @media screen and (max-width: 550px) {
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
  @media screen and (max-width: 550px) {
    display: none;
  }
`;

const WassieCount = styled.div`
  display: block;
  font-size: 16px;
  margin-left: 1.3rem;
  font-weight: 500;
  font-family: "Teko", "Prompt", sans-serif;
  @media screen and (max-width: 550px) {
    margin-left: 0rem;
    font-size: 14px;
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
  background-color: white;
  position: relative;
  display: flex;
  margin: 0 auto;
  width: 60%;
  height: auto;
  border: 1px solid white;
  display: table;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
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
  width: 100%;
  background-color: white;
  padding-top: 0rem;
  height: auto;
  border-top: 1px solid black;
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
  /* right: 0; */
`;

const FileInput = styled.input`
  display: flex;
`;
export default function Home(): JSX.Element {
  const { login, active, account } = useWalletContext();
  const [translatedText, setTranslatedText] = useState("");
  const [readyToTranslated, setReadyToTranslated] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [tweetFile, setTweetFile] = useState<string | ArrayBuffer | null>("");

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

  const { mutate: postNewTweet } = useMutation(postToTwitter);

  const handleTweet = () => {
    console.log(tweetFile);
    if (translatedText !== "") {
      postNewTweet({ text: translatedText, videoUrl: tweetFile });
    }
  };

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const photoUrl = fileReader.result;
      setTweetFile(photoUrl);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  };

  const handleTranslate = () => {
    if (readyToTranslated && active) {
      // LOGIC FOR TRANSLATION GOES HERE

      setIsTranslated(true);
    }
  };

  const TWITTER_MAX_CHARS = 280;

  const tweetsArray = [
    {
      id: "1338971066773905408",
      text: "Using Twitter data for academic research? Join our next livestream this Friday @ 9am PT on https://t.co/GrtBOXh5Y1!n n@SuhemParack will show how to get started with recent search &amp; filtered stream endpoints on the #TwitterAPI v2, the new Tweet payload, annotations, &amp; more. https://t.co/IraD2Z7wEg",
    },
    {
      id: "1338923691497959425",
      text: "Live now with @jessicagarson and @i_am_daniele! https://t.co/Y1AFzsTTxb",
    },
    {
      id: "1337498609819021312",
      text: "Thanks to everyone who tuned in today to make music with the #TwitterAPI!nnNext week on Twitch - @iamdaniele and @jessicagarson will show you how to integrate the #TwitterAPI and Google Sheets 📈. Tuesday, Dec 15th at 2pm ET. nnhttps://t.co/SQziic6eyp",
    },
    {
      id: "1337464482654793740",
      text: "We're live! Tune in! 🎶 https://t.co/FSYP4rJdHr",
    },
    {
      id: "1337122535188652033",
      text: "We want to hear what you think about our plans. As we continue to build our new product tracks, your feedback is essential to shaping the future of the Twitter API. Share your thoughts on this survey: https://t.co/dkIqFGPji7",
    },
  ];

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
        <WassieBackgroundOne src="/assets/fingerlessWassie.png" />
        <WassieBackgroundTwo src="/assets/fingerlessWassie.png" />
        <WassieBackgroundThree src="/assets/fingerlessWassie.png" />
        <WassieBackgroundFour src="/assets/fingerlessWassie.png" />
        <WassieBackgroundFive src="/assets/fingerlessWassie.png" />
        <WassieBackgroundSix src="/assets/fingerlessWassie.png" />
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
          <TweetPfpContainer>
            <TweetPfp src="/assets/pfp.jpeg" />
            <WassieCount>Wassies: 0</WassieCount>
          </TweetPfpContainer>
          <TweetInput
            value={translatedText}
            onChange={(newValue) => {
              const updatedText = newValue.target.value;
              setTranslatedText(updatedText);
              setReadyToTranslated(false);
              setIsTranslated(false);
            }}
            placeholder="Tweet from @WassieTweetDao..."
          />
          <StyledCharCount id="tooManyChar">
            ({translatedText?.length || 0}/{TWITTER_MAX_CHARS})
          </StyledCharCount>
          {/* <FileInput
            type="file"
            accept="image/*"
            id=""
            onChange={(e: any) => {
              handleFile(e);
            }}
          /> */}
          <TweetButtonContainer>
            {isTranslated ? (
              <TweetActiveButton disabled={false} onClick={handleTweet}>
                Tweet
              </TweetActiveButton>
            ) : (
              <TweetButton disabled onClick={handleTweet}>
                Tweet
              </TweetButton>
            )}
          </TweetButtonContainer>
          <TranslateButtonContainer>
            {readyToTranslated ? (
              <TranslateActiveButton disabled={false} onClick={handleTranslate}>
                Translate
              </TranslateActiveButton>
            ) : (
              <TranslateButton disabled onClick={handleTranslate}>
                Translate
              </TranslateButton>
            )}
          </TranslateButtonContainer>
          <TranslateButtonContainer>
            <AttachmentIcon src="/assets/attach.png" />
          </TranslateButtonContainer>
          <TabsContainer>
            <StyledTab>Recent Tweets</StyledTab>
          </TabsContainer>
        </FormTweetContainer>
        <ThreeBoxContainer>
          {/* <StyledLeftBox>smolting images</StyledLeftBox> */}
          <StyledMiddleBox>
            {tweetsArray?.map((tweets) => {
              return <TweetCard key={tweets.id} tweets={tweets} />;
            })}
          </StyledMiddleBox>
          {/* <StyledRightBox>smolting images</StyledRightBox> */}
        </ThreeBoxContainer>
      </HeroSection>
    </>
  );
}
