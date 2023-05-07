import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const ComparisonWord = styled.h1`
  font-size: 2rem;
  font-weight: 600;

 h3 {
    border-bottom: 3px solid black;
}
`;

export const PlayerWrapper = styled.div`
  position: relative;
  display: flex;
  border: 3px solid black;
  border-radius: 20px;
  padding: 50px 150px;
  padding-bottom: 200px;
`;

export const Player1 = styled.div`
  width: 350px;
  height: 350px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  h2 {
    margin-left: 10%;
  }
`;

export const Player2 = styled(Player1)`
  margin-left: 25rem;
`;

export const VersusDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 600;
`;