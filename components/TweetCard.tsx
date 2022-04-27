import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 1rem 0rem;
  /* margin-top: 1rem; */
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  border: 1px solid grey;
  background-color: rgba(0, 0, 0, 0.5);

  vertical-align: top;
`;

const RightTextContainer = styled.div`
  display: inline-flex;
  vertical-align: top;
  width: 80%;
`;

const BottomContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  text-align: left;
  width: 85%;
  margin-top: 1rem;

  @media screen and (max-width: 1150px) {
    width: 100%;
  }
`;

const TweetText = styled.div`
  display: column;
  color: white;
  font-size: 15px;
  text-align: left;
  margin: 0 auto;
  width: 100%;
  font-family: "Teko", "Prompt", sans-serif;
  line-height: 20px;
  @media screen and (max-width: 550px) {
    margin-left: 0.1rem;
  }
`;

const TweetContentContainer = styled.div`
  min-height: 4rem;
  margin: 0 auto;
`;

const WassieName = styled.p`
  display: inline-flex;
  color: white;
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  margin: 0 auto;
  margin-right: 5px;
  margin-bottom: 5px;
  font-family: "Teko", "Prompt", sans-serif;
`;

const TweetPhoto = styled.img`
  display: block;
  width: 95%;
  border-radius: 16px;
  margin-top: 20px;
`;

const Username = styled.p`
  display: inline-flex;
  color: rgb(83, 100, 113);
  font-size: 16px;
  text-align: left;
  margin: 0 auto;
  font-family: "Teko", "Prompt", sans-serif;
`;

const TimeStamp = styled.p`
  display: inline-flex;
  float: right;
  color: white;
  font-size: 13px;
  text-align: left;
  margin: 0 auto;
  font-family: "Teko", "Prompt", sans-serif;
`;

const Icon = styled.a`
  display: inline-flex;
  color: white;
  font-weight: 300;
  font-size: 13px;
  margin: 0 auto;
  margin-right: 10%;
  margin-top: 10px;
  font-family: "Teko", "Prompt", sans-serif;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  @media screen and (max-width: 920px) {
    font-size: 11px;
    margin-right: 5%;
  }
  @media screen and (max-width: 750px) {
    font-size: 13px;
    margin-right: 5%;
  }
  @media screen and (max-width: 550px) {
    font-size: 11px;
    margin-right: 5%;
  }
`;

const ShareIcon = styled.p`
  display: inline-flex;
  color: white;
  font-weight: 300;
  font-size: 13px;
  margin: 0 auto;
  margin-top: 10px;
  font-family: "Teko", "Prompt", sans-serif;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  @media screen and (max-width: 550px) {
    font-size: 12px;
    margin-right: 5%;
  }
`;

const Remove = styled.div`
  display: block;
  color: white;
  font-weight: 500;
  font-size: 13px;
  margin: 0 auto;
  border: 1px solid black;
  padding: 2px 0px;
  border-radius: 20px;
  margin-top: 4px;
  width: auto;
  font-family: "Teko", "Prompt", sans-serif;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 550px) {
    font-weight: 500;
    font-size: 12px;
  }
`;

const ClickedRemove = styled.p`
  display: block;
  color: white;
  font-weight: 500;
  font-size: 13px;
  margin: 0 auto;
  border: 1px solid black;
  padding: 2px 4px;
  border-radius: 20px;
  margin-top: 4px;
  font-family: "Teko", "Prompt", sans-serif;
  background-color: #ffcccb;
  &:hover {
    cursor: pointer;
  }
`;

const RemoveCount = styled.p`
  display: block;
  color: white;
  font-weight: 500;
  font-size: 15px;
  margin: 0 auto;
  margin-top: 4px;
  margin-left: 4px;
  font-family: "Teko", "Prompt", sans-serif;
`;

const TweetPfp = styled.img`
  display: inline-flex;
  color: white;
  background-color: white;
  padding: 0.6rem;
  margin-bottom: 0.5rem;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  @media screen and (max-width: 550px) {
    height: 3rem;
    width: 3rem;
  }
`;

const TweetPfpContainer = styled.div`
  display: inline-block;
  width: 15%;
  height: auto;
  margin-right: 0.5rem;
  @media screen and (max-width: 550px) {
    padding-right: 0rem;
    margin-right: 0.5rem;
  }
`;

const StyledLike = styled.img`
  display: inline-flex;
  color: white;
  margin-left: 0.4rem;
  height: 0.8rem;
  width: 0.8rem;
  margin-top: 4px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledShare = styled.img`
  display: inline-flex;
  color: white;
  margin-left: 0.2rem;
  height: 1rem;
  width: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

type TweetsResponse = {
  id: string;
  text: string;
  attachments?: any;
  url?: any;
  created_at: any;
};

type TweetProps = {
  tweets: TweetsResponse;
  allData: any;
  isWassie: boolean;
};

const TweetCard = ({ tweets, allData, isWassie }: TweetProps): JSX.Element => {
  const { text, created_at } = tweets || {};
  const filteredText = text.split(/\shttp?s/)[0].toString();
  const linkToTweet = `https://twitter.com/DankBankHQ/status/${tweets.id}`;
  const [removed, setRemoved] = useState(false);

  let timenow = Date.now() - Date.parse(created_at);

  if (timenow < 3600000) {
    setInterval(() => {
      timenow = Date.now() - Date.parse(created_at);
    }, 60000);
  }

  const timeFromNow = () => {
    if (timenow < 60000) {
      return "<1m";
    } else if (timenow < 3600000) {
      return Math.floor(timenow / 60000) + "m";
    } else if (timenow < 86400000) {
      return Math.floor(timenow / 3600000) + "h";
    } else {
      return Math.floor(timenow / 86400000) + "d";
    }
  };

  if (tweets.attachments) {
    const mediaArray = allData.includes.media;
    const mediaKey = mediaArray.filter((media: any) => {
      return media.media_key === tweets.attachments.media_keys[0];
    });

    tweets["url"] = mediaKey[0].url;
  }

  // USE  ONCE LIVE
  // const handleRemove = () => {
  //   if (!removed) {
  //     setRemoved(true);
  //   } else {
  //     setRemoved(false);
  //   }
  // };

  const handleRemove = () => {
    alert("You will be able to downvote after mint!");
    return;
  };

  const retweet = `https://twitter.com/intent/retweet?tweet_id=${tweets.id}`;
  const comment = `https://twitter.com/intent/tweet?in_reply_to=${tweets.id}`;
  const like = `https://twitter.com/intent/like?tweet_id=${tweets.id}`;

  return (
    // eslint-disable-next-line @next/next/link-passhref
    <Container>
      <TweetPfpContainer>
        <TweetPfp
          src={
            isWassie
              ? "/assets/fingerlessWassie.png"
              : "/assets/inversepfp.jpeg"
          }
        />
      </TweetPfpContainer>
      <RightTextContainer>
        <TweetText>
          <TweetContentContainer>
            <WassieName>
              {isWassie ? "WassieDao" : "smolting (wassie, verse)"}
            </WassieName>
            <Username>{isWassie ? "@WassieTweetDao" : "@inversebrah"}</Username>
            <TimeStamp>{timeFromNow()}</TimeStamp>
            <br />
            {filteredText}
            {tweets.url && (
              <>
                <br />
                <TweetPhoto src={tweets?.url} />
              </>
            )}
          </TweetContentContainer>
          <BottomContainer>
            <Icon href={comment} target="_blank">
              Comment
              <StyledLike src="/assets/whitecomment.png" />
            </Icon>
            <Icon href={like} target="_blank">
              Like
              <StyledLike src="/assets/whiteheart.png" />
            </Icon>
            <Icon href={retweet} target="_blank">
              Retweet
              <StyledLike src="/assets/whitert.png" />
            </Icon>
            {isWassie && (
              <ShareIcon onClick={handleRemove}>
                Downvote
                <StyledLike src="/assets/thumbsdown.png" />
              </ShareIcon>
            )}
          </BottomContainer>
        </TweetText>
      </RightTextContainer>
    </Container>
  );
};

export default TweetCard;
