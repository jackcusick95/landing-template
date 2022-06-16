/* eslint-disable @next/next/no-page-custom-font */
import styled from "styled-components";

const ThirdSection = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 2rem 2rem 10rem 2rem;
`;

const ThirdLeft = styled.div`
  position: relative;
  vertical-align: top;
  display: inline-flex;
  flex-direction: column;
  width: 30%;
  background-color: black;
  border-radius: 10px;
  padding: 1rem 1rem;
  border: 2px solid #e553ec;
`;

const ThirdMiddle = styled.div`
  position: relative;
  vertical-align: top;
  display: inline-flex;
  flex-direction: column;
  width: 30%;
  background-color: black;
  border-radius: 10px;
  padding: 1rem 1rem;
  margin-left: 3%;
  border: 2px solid #4ce4ff;
`;

const ThirdRight = styled.div`
  position: relative;
  vertical-align: top;
  display: inline-flex;
  flex-direction: column;
  width: 30%;
  background-color: black;
  border-radius: 10px;
  padding: 1rem 1rem;
  margin-left: 3%;
  border: 2px solid #edff4c;
`;

const VictimHeader = styled.div`
  position: relative;
  display: flex;
  font-family: "Biennale", sans-serif;
  width: 100%;
  color: lightgrey;
  font-size: 20px;
  font-weight: 300;
  justify-content: center;
  text-align: center;
`;
const VictimSubHeader = styled.div`
  display: flex;
  width: 100%;
  color: #fff;
  font-size: 28px;
  font-weight: 500;
  justify-content: center;
  text-align: center;
`;

export default function Stats(): JSX.Element {
  return (
    <>
      <ThirdSection>
        <ThirdLeft>
          <VictimHeader>Crypto Stolen</VictimHeader>
          <VictimSubHeader>$4 Billion</VictimSubHeader>
        </ThirdLeft>
        <ThirdMiddle>
          <VictimHeader>Discords Hacked</VictimHeader>
          <VictimSubHeader>200,000</VictimSubHeader>
        </ThirdMiddle>
        <ThirdRight>
          <VictimHeader>Smart Contracts Hacked</VictimHeader>
          <VictimSubHeader>5%</VictimSubHeader>
        </ThirdRight>
      </ThirdSection>
    </>
  );
}
