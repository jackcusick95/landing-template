/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import styled from "styled-components";
import Footer from "../components/Footer";
import LoginButton from "../components/LoginButton";
import Stats from "../components/Stats";

const HeroSection = styled.div`
  width: 100%;
  height: auto;
  background-image: url("https://www.futureswap.com/images/Graphic-Hero-Blur.jpg");
  background-color: #07071c;
  padding: 1rem 5% 1.5rem 5%;
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
  width: 7rem;
  height: 4rem;
  float: left;
  padding: 0rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  @media screen and (max-width: 550px) {
    position: relative;
    display: table;
    margin: 0 auto;
    float: none;
    width: 100%;
    padding-top: 0.5rem;
  }
`;

const LogoImg = styled.img`
  display: flex;
`;

const FirstSection = styled.div`
  position: relative;
  justify-content: space-between;
  margin-top: 3rem;
  padding: 3rem 0rem;
`;

const FirstLeft = styled.div`
  vertical-align: top;
  display: inline-flex;
  flex-direction: column;
  width: 40%;
  padding-right: 2.9rem;
`;

const FirstRight = styled.div`
  vertical-align: top;
  display: inline-flex;
  width: 60%;
`;

const MainHeader = styled.div`
  display: flex;
  font-family: "Biennale", sans-serif;
  width: 100%;
  color: #fff;
  font-size: 60px;
  font-weight: 500;
  line-height: 1.2;
`;
const MainSubHeader = styled.div`
  display: flex;
  width: 100%;
  color: lightgrey;
  font-size: 18px;
  font-weight: 300;
`;

const MainRightImage = styled.img`
  max-width: 100%;
  object-fit: cover;
  opacity: 0.7;
`;

const MainSocialIcons = styled.div`
  position: relative;
  display: flex;
  padding-top: 1rem;
  height: auto;
  align-items: baseline;
`;

const TwitterIcon = styled.img`
  display: inline-flex;
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 0.8rem;
`;
const DiscordIcon = styled.img`
  display: inline-flex;
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 0.8rem;
`;

const InstaIcon = styled.img`
  display: inline-flex;
  height: 2.5rem;
  width: 2.5rem;
`;

const SecondSection = styled.div`
  position: relative;
  margin-top: 3rem;
  padding: 3rem 10%;
`;

const HIWHeader = styled.div`
  display: flex;
  font-family: "Biennale", sans-serif;
  width: 100%;
  color: #fff;
  font-size: 60px;
  font-weight: 500;
  justify-content: center;
`;

const HIWSubHeader = styled.div`
  display: flex;
  font-family: "Biennale", sans-serif;
  width: 100%;
  color: #fff;
  font-size: 25px;
  font-weight: 300;
  justify-content: center;
  text-align: center;
`;

const ThirdSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem 4rem 3rem 4rem;
`;

const ThirdLeft = styled.div`
  position: relative;
  vertical-align: top;
  display: inline-flex;
  flex-direction: column;
  width: 45%;
  background-color: black;
  border-radius: 10px;
  padding: 1rem 1rem;
  margin-right: 2.5%;
  border: 2px solid #4ce4ff;
`;

const ThirdRight = styled.div`
  position: relative;
  vertical-align: top;
  display: inline-flex;
  flex-direction: column;
  width: 45%;
  background-color: black;
  border-radius: 10px;
  padding: 1rem 1rem;
  margin-left: 2.5%;
  border: 2px solid #4ce4ff;
`;

const VictimHeader = styled.div`
  position: relative;
  display: flex;
  font-family: "Biennale", sans-serif;
  width: 100%;
  color: #fff;
  font-size: 33px;
  font-weight: 500;
  justify-content: center;
  text-align: center;
`;
const VictimSubHeader = styled.div`
  display: flex;
  width: 100%;
  color: lightgrey;
  font-size: 18px;
  font-weight: 300;
  justify-content: center;
  text-align: center;
`;

const StatsHeader = styled.div`
  position: relative;
  display: flex;
  font-family: "Biennale", sans-serif;
  width: 100%;
  color: #fff;
  font-size: 33px;
  font-weight: 500;
  margin-top: 10rem;
  padding-left: 2rem;
  justify-content: center;
  text-align: center;
`;

const StatsSubHeader = styled.div`
  position: relative;
  display: flex;
  font-family: "Biennale", sans-serif;
  width: 100%;
  color: #fff;
  font-size: 33px;
  font-weight: 500;
  justify-content: flex-end;
  padding-right: 2rem;
`;

const ConnectButton = styled.div`
  position: relative;
  display: inline-flex;
  padding: 0rem;
  margin-left: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.div`
  border-radius: 100px;
  font-weight: 500;
  transition: box-shadow 0.3s ease-in-out 0s;
  font-family: "Biennale", sans-serif;
  padding: 8px 1.3rem;
  max-width: 265px;
  height: auto;
  font-size: 16px;
  color: #e553ec;
  border: 2px solid #e553ec;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const NFTHeader = styled.div`
  display: flex;
  font-family: "Biennale", sans-serif;
  width: 100%;
  color: #fff;
  font-size: 40px;
  font-weight: 500;
  justify-content: center;
  margin-top: 3rem;
`;

const TopDiagramHeader = styled.div`
  position: relative;
  display: flex;
  font-family: "Biennale", sans-serif;
  width: 100%;
  color: #fff;
  font-size: 23px;
  font-weight: 500;
  justify-content: center;
  text-align: center;
  margin-top: 1rem;
`;

const TopDiagramSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  padding: 3rem 4rem;
`;

const TopDiagramLeft = styled.div`
  position: relative;
  vertical-align: top;
  display: inline-flex;
  flex-direction: column;
  width: 45%;
  border-radius: 10px;
  padding: 1rem 1rem;
  margin-right: 2.5%;
`;

const TopDiagramRight = styled.div`
  position: relative;
  vertical-align: top;
  display: inline-flex;
  flex-direction: column;
  width: 45%;
  border-radius: 10px;
  padding: 1rem 1rem;
  margin-left: 2.5%;
`;

const TopDiagramImageRight = styled.img`
  display: flex;
  margin: 0 auto;
  height: 5rem;
  width: 5rem;
  border-radius: 10px;
  border: 2px solid #4ce4ff;
`;

const TopDiagramImageLeft = styled.img`
  display: flex;
  margin: 0 auto;
  height: 5rem;
  width: 5rem;
  border-radius: 10px;
  border: 2px solid #4ce4ff;
`;

const StyledLine = styled.hr`
  display: flex;
  border-top: 2px dotted white;
  width: 9rem;
  transform: rotate(90deg);
  margin-top: 5.5rem;
`;

const StyledInvertLineLeft = styled.hr`
  display: flex;
  border-top: 2px dotted white;
  width: 10rem;
  transform: rotate(60deg);
`;

const StyledInvertLineRight = styled.hr`
  display: flex;
  border-top: 2px dotted white;
  width: 10rem;
  transform: rotate(-60deg);
`;

const BottomLinesSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem 4rem;
`;

const BountySection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem 4rem 3rem 4rem;
  margin-top: 2rem;
`;

const BountyContainer = styled.div`
  position: relative;
  vertical-align: top;
  display: inline-flex;
  flex-direction: column;
  width: 40%;
  background-color: black;
  border-radius: 10px;
  padding: 1rem 1rem;
  border: 2px solid #edff4c;
`;

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>doxkit</title>
        <link
          href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </Head>
      <HeroSection>
        <Header>
          <Logo>
            <LogoImg alt="" src="/assets/logo1.jpg" />
            {/* <LogoText>DOXKIT</LogoText> */}
          </Logo>
          <LoginButton onClick={() => console.log("signing up")} />
        </Header>
        <FirstSection>
          <FirstLeft>
            <MainHeader>The Fight For A Safe Web3</MainHeader>
            <MainSubHeader>
              Whether victim to a hack, or looking to earn rewards exposing bad
              actors, doxkit serves as a bounty marketplace to fight for the
              future of crypto.
            </MainSubHeader>
            <MainSocialIcons>
              <div>
                <TwitterIcon alt="" src="/assets/twitter.svg" />
                <DiscordIcon alt="" src="/assets/discord.svg" />
                <InstaIcon alt="" src="/assets/insta.svg" />
              </div>
              <ConnectButton onClick={() => console.log("signing up")}>
                <StyledButton>Sign Up</StyledButton>
              </ConnectButton>
            </MainSocialIcons>
          </FirstLeft>
          <FirstRight>
            <MainRightImage
              alt=""
              src="https://www.futureswap.com/images/Graphic-Purple-Wave.svg"
            />
          </FirstRight>
        </FirstSection>
        <StatsHeader>Just in 2021....</StatsHeader>
        <Stats />
        <SecondSection>
          <HIWHeader>How it Works</HIWHeader>
          <HIWSubHeader>
            Whether victim to a hack, or looking to earn rewards exposing bad
            actors, doxkit serves as a bounty marketplace to fight fraud in the
            web3 space. Anyone who has been hacked can list a bounty, and anyone
            who holds a doxkit NFT can compete for the rewards.
          </HIWSubHeader>
          <NFTHeader>Doxkit NFT</NFTHeader>
          <HIWSubHeader>
            To be able to partake in bounties, you must own the doxkit NFT.
            There will be 10,000 available at mint. An owner of the Doxkit NFT
            will be able to connect their wallet to the live site and enter
            bounties and earn rewards. Mint date, cost and whitelist will be
            communicated through social chanels.
          </HIWSubHeader>
        </SecondSection>
        <TopDiagramSection>
          <TopDiagramLeft>
            <TopDiagramImageRight alt="" src="/assets/hacker.webp" />
            <TopDiagramHeader>MALICIOUS HACKER</TopDiagramHeader>
            <StyledLine />
          </TopDiagramLeft>
          <TopDiagramRight>
            <TopDiagramImageLeft alt="" src="/assets/nft.webp" />
            <TopDiagramHeader>DOXKIT NFT</TopDiagramHeader>
            <StyledLine />
          </TopDiagramRight>
        </TopDiagramSection>
        <ThirdSection>
          <ThirdLeft>
            <VictimHeader>VICTIM OF HACKER</VictimHeader>
            <VictimSubHeader>
              Whether victim to a hack, or looking to earn rewards exposing bad
              actors, doxkit serves as a bounty marketplace to fight for the
              future of crypto. Whether victim to a hack, or looking to earn
              rewards exposing bad actors, doxkit serves as a bounty marketplace
              to fight for the future of crypto.
            </VictimSubHeader>
          </ThirdLeft>
          <ThirdRight>
            <VictimHeader>BOUNTY HUNTER</VictimHeader>
            <VictimSubHeader>
              Whether victim to a hack, or looking to earn rewards exposing bad
              actors, doxkit serves as a bounty marketplace to fight for the
              future of crypto. Whether victim to a hack, or looking to earn
              rewards exposing bad actors, doxkit serves as a bounty marketplace
              to fight for the future of crypto.
            </VictimSubHeader>
          </ThirdRight>
        </ThirdSection>
        <BottomLinesSection>
          <TopDiagramLeft>
            <StyledInvertLineLeft />
          </TopDiagramLeft>
          <TopDiagramRight>
            <StyledInvertLineRight />
          </TopDiagramRight>
        </BottomLinesSection>
        <BountySection>
          <BountyContainer>
            <VictimHeader>BOUNTY</VictimHeader>
            <VictimSubHeader>OBJECTIVE: DOX</VictimSubHeader>
            <VictimSubHeader>REWARD: 0.5 ETH</VictimSubHeader>
          </BountyContainer>
        </BountySection>
        <SecondSection>
          <HIWSubHeader>
            Sign up below for early access to launch date and mint.
          </HIWSubHeader>
          <ButtonContainer>
            <LoginButton onClick={() => console.log("signing up")} />
          </ButtonContainer>
        </SecondSection>
        <Footer />
      </HeroSection>
    </>
  );
}
