import styled from 'styled-components';

export const Container = styled.div<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'background-color: black;'};
  max-width: 100%;
  display: flex;
  flex-flow: row wrap;
`;

export const LogoDiv = styled.div`
display: flex;
align-items: center;
flex-direction: column;
margin-left: 35%;
`;

export const LoginDiv = styled.div`
 margin-left: 1%;
 margin-top: 1%;
`;

export const DropdownDiv = styled.div`
  margin-left: 38%;
  margin-top: 1%;
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

export const LeaguesList = styled.ul`
color: white;
display: grid;
grid-template-columns: 1fr 1fr 1fr;
margin-left: 8%;
`;

export const League = styled.li`
  margin-bottom: 20px;
`;

export const LeagueStatsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  color: black;
`;

export const LeagueDiv = styled.div`
  margin-top: 5%;
  margin-left: 7%;
`;

export const LeagueTextDiv = styled.div`
display: flex;
align-items: center;
margin: 0 auto;
flex-direction: column;
margin-bottom: 3%;
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

export const DarkDiv = styled.div`
  background-color: #1e1e1e;
  width: 100%;
  height: 100%;
  margin-top: 5%;
  margin-left: 7%;
  margin-bottom: 5%;
  padding: 5%;
  border-radius: 10px;
`;
