import styled from 'styled-components';

export const TopPlayersDiv = styled.div <{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'background-color: black;'};
  padding: 30px;
  display: grid;
  justify-content: center;
  overflow: hidden;
`;

export const PlayerBio = styled.div<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: black;'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  max-width: 90%;
  grid-column: span 1;
  border: 2px solid #ccc;
  position: relative;
  height: 330px;
`;

export const PlayerImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 30px;
`;

export const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PlayerName = styled.p <{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const PlayerTeam = styled.p <{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  margin-bottom: 5px;
`;

export const PlayerAppearances = styled.p <{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  margin-bottom: 5px;
`;

export const PlayerGoals = styled.p <{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  margin-bottom: 5px;
`;

export const PlayerAssists = styled.p <{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  margin-bottom: 5px;
`;

export const TopPlayersTitle = styled.h1 <{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 50px;
  grid-column: span 4;
  text-align: center;
`;

export const PlayerNumber = styled.span <{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  position: absolute;
  top: 0;
  left: 0;
  font-size: 18px;
  margin: 10px;
`;

export const LogoDiv = styled.div<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  font-size: 20px;
  text-align: center;
  margin-bottom: 30px;
  grid-column: span 4;

  &:hover {
    opacity: 0.7;
  }
`;

export const LeagueTitle = styled.span`
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  border-bottom: 2px solid black;
`;

