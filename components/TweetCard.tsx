import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 1rem 0rem;
  width: 100%;
  border-bottom: 1px solid lightgrey;
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
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const TweetText = styled.p`
  display: column;
  color: black;
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

const TweetContentContainer = styled.p`
  min-height: 4rem;
  margin: 0 auto;
`;

const WassieName = styled.p`
  display: inline-flex;
  color: black;
  font-weight: 600;
  font-size: 16px;
  text-align: left;
  margin: 0 auto;
  margin-right: 5px;
  margin-bottom: 5px;
  font-family: "Teko", "Prompt", sans-serif;
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
  color: rgb(83, 100, 113);
  font-size: 13px;
  text-align: left;
  margin: 0 auto;
  font-family: "Teko", "Prompt", sans-serif;
`;

const Icon = styled.p`
  display: inline-flex;
  color: rgb(83, 100, 113);
  font-weight: 300;
  font-size: 13px;
  margin: 0 auto;
  margin-right: 10%;
  margin-top: 10px;
  font-family: "Teko", "Prompt", sans-serif;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 550px) {
    font-size: 12px;
    margin-right: 5%;
  }
`;

const ShareIcon = styled.p`
  display: inline-flex;
  color: rgb(83, 100, 113);
  font-weight: 300;
  font-size: 13px;
  margin: 0 auto;
  margin-top: 10px;
  font-family: "Teko", "Prompt", sans-serif;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 550px) {
    font-size: 12px;
    margin-right: 5%;
  }
`;

const Remove = styled.div`
  display: block;
  color: black;
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
  color: black;
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
  color: black;
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
  padding-right: 2rem;
  @media screen and (max-width: 550px) {
    padding-right: 0rem;
    margin-right: 0.5rem;
  }
`;

const StyledLike = styled.img`
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
};

type TweetProps = {
  tweets: TweetsResponse;
};

const TweetCard = ({ tweets }: TweetProps): JSX.Element => {
  const { text } = tweets || {};
  const [removed, setRemoved] = useState(false);

  //   console.log(id);

  const handleRemove = () => {
    if (!removed) {
      setRemoved(true);
    } else {
      setRemoved(false);
    }
  };

  return (
    // eslint-disable-next-line @next/next/link-passhref
    <Container>
      <TweetPfpContainer>
        <TweetPfp src="/assets/pfp.jpeg" />
        {removed ? (
          <ClickedRemove onClick={handleRemove}>Remove</ClickedRemove>
        ) : (
          <Remove onClick={handleRemove}>Remove</Remove>
        )}
        <RemoveCount>0/15</RemoveCount>
      </TweetPfpContainer>
      <RightTextContainer>
        <TweetText>
          <TweetContentContainer>
            <WassieName>WassieDao</WassieName>
            <Username>@WassieTweetDao</Username>
            <TimeStamp>17m</TimeStamp>
            <br />
            {text}
          </TweetContentContainer>
          <BottomContainer>
            <Icon>
              Comment
              <StyledLike src="/assets/comment.png" />
            </Icon>
            <Icon>
              Like
              <StyledLike src="/assets/like.png" />
            </Icon>
            <Icon>
              Retweet
              <StyledLike src="/assets/retweet.png" />
            </Icon>
            <ShareIcon>
              Share
              <StyledLike src="/assets/share.png" />
            </ShareIcon>
          </BottomContainer>
        </TweetText>
      </RightTextContainer>
    </Container>
  );
};

export default TweetCard;
