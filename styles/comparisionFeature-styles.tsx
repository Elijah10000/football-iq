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
  margin-top: 5%;

 h3 {
    border-bottom: 3px solid black;
}
`;

export const PlayerWrapper = styled.div`
  position: relative;
  display: flex;
  border: 3px solid black;
  border-radius: 20px;
  padding: 20px 100px;
  padding-bottom: 330px;
  
`;

export const Player1 = styled.div`
  width: 450px;
  height: 350px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.08);
  }

  h2 {
    margin-left: 13%;
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

export const StatsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5%;
  margin-left: 3%;
`;

export const StatItem = styled.div`
  flex-basis: calc(50% - 2rem);
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-basis: 100%;
    margin-right: 0;
  }
`;

export const StatTitle = styled.span`
  font-weight: bold;
`;

export const BioGrid = styled.div`

img {
  border-radius: 90px;
  margin-left: 17%;
  margin-top: 3%;
  transition: border 0.1s ease-in-out;

&:hover {
    border: 2px solid #0077ff;
    cursor: pointer;
  }
}
`;