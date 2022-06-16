/* eslint-disable @next/next/no-page-custom-font */
import styled from "styled-components";

const FooterContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0rem 0rem 0rem;
  border-top: 1px solid lightgrey;
  align-items: center;
  margin-top: 3rem;
`;

const ThirdRight = styled.div`
  position: relative;
`;

const BoxContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
`;

const SocialIcon = styled.img`
  display: inline-flex;
  height: 2.5rem;
  width: 2.5rem;
`;

const Copyright = styled.div`
  position: relative;
  display: flex;
  font-family: "Biennale", sans-serif;
  width: 100%;
  color: lightgrey;
  font-size: 13px;
  font-weight: 300;
  justify-content: flex-start;
  text-align: center;
`;

const Logo = styled.div`
  position: relative;
  display: flex;
  font-family: "Biennale", sans-serif;
  width: 100%;
  color: white;
  font-size: 25px;
  font-weight: 300;
  justify-content: center;
  text-align: center;
`;

export default function Footer(): JSX.Element {
  return (
    <>
      <FooterContainer>
        <ThirdRight>
          <BoxContainer>
            <Copyright>Copyright 2022</Copyright>
          </BoxContainer>
        </ThirdRight>
        <ThirdRight>
          <BoxContainer>
            <Logo>DOXKIT</Logo>
          </BoxContainer>
        </ThirdRight>
        <ThirdRight>
          <BoxContainer>
            <SocialIcon
              alt=""
              src="https://www.futureswap.com/images/Icon-Twitter-Gray.svg"
            />
            <SocialIcon
              alt=""
              src="https://www.futureswap.com/images/Icon-Discord-Gray.svg"
            />
          </BoxContainer>
        </ThirdRight>
      </FooterContainer>
    </>
  );
}
