import styled from 'styled-components';

export const TopPlayersDiv = styled.div<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'background-color: black;'};
  padding: 30px;
  display: grid;
  justify-content: center;
  overflow: hidden;

  @media (min-width: 365px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    max-width: 2024px;
    margin: 0 auto;
  }
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

  @media (min-width: 365px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 100%;
    height: 100%;
  }
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

export const PlayerName = styled.p<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const PlayerTeam = styled.p<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 15px;
`;

export const PlayerAppearances = styled.p<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  margin-bottom: 5px;
  font-size: 15px;
`;

export const PlayerGoals = styled.p<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  margin-bottom: 5px;
  font-size: 15px;
`;

export const PlayerAssists = styled.p<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  margin-bottom: 5px;
  font-size: 15px;
`;

export const TopPlayersTitle = styled.h1<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'color: white;'};
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 80px;
  grid-column: span 4;
  text-align: center;

  @media (min-width: 365px) {
    margin-bottom: 50px;
  }
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

export const LeagueOptionButton = styled.button<{ isDarkMode?: boolean }>`
  ${({ isDarkMode }) => isDarkMode && 'background-color: black; color: white;'};
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 5%;
  ${({ isSelected }) => isSelected && 'background-color: blue; color: white;'}

  &:hover {
    background-color: blue;
    color: white;
  }

  &.active {
    background-color: blue;
    color: white;
  }
`;

export const LeagueOptionsContainer = styled.div`
  flex-direction: column;
`;