import styled from "styled-components";

const ConnectButton = styled.div`
  display: flex;
  float: right;
  padding: 0rem;
  &:hover {
    cursor: pointer;
  }
`;

const StyledButton = styled.div`
  border-radius: 100px;
  font-weight: 600;
  transition: box-shadow 0.3s ease-in-out 0s;
  font-family: "Biennale", sans-serif;
  padding: 8px 1.3rem;
  margin-top: 15px;
  max-width: 265px;
  height: 40px;
  font-size: 16px;
  color: rgb(255, 255, 255);
  background: #e553ec;
`;

type LoginButtonProps = {
  onClick: () => void;
};

export default function LoginButton({
  onClick,
}: LoginButtonProps): JSX.Element {
  return (
    <ConnectButton onClick={onClick}>
      <StyledButton>Sign Up</StyledButton>
    </ConnectButton>
  );
}
