import styled from 'styled-components';

export const Container = styled.div<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'background-color: black;'};
  overflow: hidden;
  height: 100vh;
`;

export const LogoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoginDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: -2%;
  margin-left: 1%;
`;

export const DropdownDiv = styled.div`
  max-width: 10%;
  margin-bottom: 3%;
`;

export const PlayersList = styled.ul`
  width: 100%;
  display: grid;
  justify-content: center;
  margin-left: 8%;


  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const Player = styled.li`	
  margin-bottom: 20px;
`;

export const PlayerStatsList = styled.ul`
  list-style-type: none;
  padding:0;
`;

export const TeamCrest = styled.div`
  display: flex;
  margin: 40px auto;
  img {
      width: 100px;
      height: 100px;
  }
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