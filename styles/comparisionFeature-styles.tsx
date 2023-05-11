import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const ComparisonWord = styled.h3<{ isDarkMode?: boolean }>`
  font-size: 2rem;
  font-weight: 600;
  margin-top: 11%;

  h3 {
    border-bottom: 3px solid ${({ isDarkMode }) => (isDarkMode ? 'white' : 'black')};
    color: ${({ isDarkMode }) => (isDarkMode ? 'white' : 'black')};
    margin: 0;
    padding: 0;
  }
`;

export const PlayerWrapper = styled.div<{ isDarkMode?: boolean }>`
  position: relative;
  display: flex;
  border: 3px solid ${({ isDarkMode }) => isDarkMode ? 'white' : 'black'};
  border-radius: 20px;
  padding: 20px 100px;
  padding-bottom: 320px;
`;


export const Player1 = styled.div<{ isDarkMode?: boolean }>`
  width: 450px;
  height: 350px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.08);
  }

  h2 {
    margin-left: 13%;
    color: ${({ isDarkMode }) => isDarkMode ? 'white' : 'black'};
  }
`;

export const Player2 = styled.div<{ isDarkMode?: boolean }>`
  margin-left: 25rem;
  width: 450px;
  height: 350px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.08);
  }

  h2 {
    margin-left: 13%;
    color: ${({ isDarkMode }) => isDarkMode ? 'white' : 'black'};
  }
`;

export const VersusDiv = styled.div<{ isDarkMode?: boolean }>`
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 600;

  h3 {
    color: ${({ isDarkMode }) => isDarkMode ? 'white' : 'black'};
  }
`;

export const StatsGrid = styled.div <{ isDarkMode?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5%;
  margin-left: 3%;
  color: ${({ isDarkMode }) => isDarkMode ? 'white' : 'black'};
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