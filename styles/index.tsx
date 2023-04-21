import styled from 'styled-components';

export const Container = styled.div<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'background-color: black;'};
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

export const LogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2%;

  div {
    &:hover h1 a {
      opacity: 0.7;
    }
  }
`;

export const LoginDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: -2%;
  margin-left: 1%;
`;


interface DropdownDivProps {
  isDarkMode?: boolean;
}

export const DropdownDiv = styled.div<DropdownDivProps>`
  background-color: ${({ isDarkMode }) => isDarkMode ? 'white' : 'white'};
  margin-bottom: 3%;
`;

export const TeamCrest = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
      width: 150px;
      height: 150px;
  }
`;

export const TeamName = styled.span<DropdownDivProps>`
  color: ${({ isDarkMode }) => isDarkMode ? 'white' : 'black'};
  padding-bottom: 12px;
  text-align: center;
`;

export const ClubTeamName = styled.span<DropdownDivProps>`
  color: ${({ isDarkMode }) => isDarkMode ? 'white' : 'black'};
  padding-bottom: 12px;
  text-align: center;
`;

export const TeamImage = styled.img`
  cursor: pointer;
`;

export const PlayersList = styled.ul`
  width: 100%;
  display: grid;
  justify-content: center;
  color: ${({ isDarkMode }) => isDarkMode ? 'black' : 'white'};


  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const Player = styled.li`	
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlayerStatsList = styled.ul<{ isDarkMode?: boolean }>`
  color: ${({ isDarkMode }) => isDarkMode ? 'white' : 'black'};
  list-style-type: circle;
  padding:0;
`;

export const StatisticsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: black;
`;

export const StatisticsStatsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: black;
`;

export const Statistics = styled.div`
  margin-top: 5%;
`;

export const PlayerData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-direction: column;
`;

export const PlayerPhoto = styled.img`
    border-radius: 50%;
`;

export const PlayerStatsDiv = styled.div`
`;

export const PlayerContainer = styled.div`
  display: flex;
`;

export const PlayerBio = styled.div`
  max-width: 30%;
  margin-left: 18%;

  h1 {
    text-align: center;
  }
`;

export const ChartContainer = styled.div`
  width: 30%;
  margin-left: 18%;
  margin-top: 0%;

h1 {
  text-align: center;
}
`;
