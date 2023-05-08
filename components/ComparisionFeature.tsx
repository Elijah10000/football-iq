import { useState, useEffect } from 'react'
import Select from 'react-select';
import styled from "styled-components";
import { DropdownDiv } from 'styles/index'
import { players } from 'data/players';
import type { Players } from 'data/players';
import { useGlobalContext } from 'contexts/GlobalContext';
import { playersStatisticsApi } from 'api/playersStatistics';
import { PlayerData } from 'pages/index';
import { Container, Player1, Player2, PlayerWrapper, ComparisonWord, VersusDiv, StatTitle, StatsGrid, StatItem, BioGrid } from 'styles/comparisionFeature-styles';

const Dropdown = styled(Select) <{ isDarkMode?: boolean }>`
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : 'black')};
  background-color: ${({ isDarkMode }) => (isDarkMode ? 'black' : 'white')};
`;

const SDropdownDiv = styled(DropdownDiv)`
    width: 70%;
`;

const ComparisonFeature = () => {
    const { isDarkMode, setIsDarkMode } = useGlobalContext();
    const [inputValue, setInputValue] = useState('');
    const [playerOneToCompare, setPlayerOneToCompare] = useState<PlayerData | undefined>();
    const [playerTwoToCompare, setPlayerTwoToCompare] = useState<PlayerData | undefined>();
  
    useEffect(() => {
      const fetchDefaultPlayers = async () => {
        const [playerOne, playerTwo] = await Promise.all([
          playersStatisticsApi.getStatisticsByPlayerId('19545'),
          playersStatisticsApi.getStatisticsByPlayerId('47380'),
        ]);
        setPlayerOneToCompare(playerOne.data.response[0]);
        setPlayerTwoToCompare(playerTwo.data.response[0]);
      };
      fetchDefaultPlayers();
    }, []);
  
    const handlePlayerData = async (id: string, playerNumber: string) => {
      const { data } = await playersStatisticsApi.getStatisticsByPlayerId(id);
      console.log(data);
  
      if (playerNumber === '1') {
        setPlayerOneToCompare(data.response[0])
      } else {
        setPlayerTwoToCompare(data.response[0])
  
      }
    }
  
    const handlePlayer1Search = () => {
      console.log("Player 1 Search");
    };
    const handlePlayer2Search = () => {
      console.log("Player 2 Search");
    };
  
    const handlePlayer1SelectChange = (id: string) => {
      handlePlayerData(id, '1')
      console.log("Player 1 Change");
    };
  
    const handlePlayer2SelectChange = (id: string) => {
      handlePlayerData(id, '2')
  
      console.log("Player 2 Change");
    };

    const customStyles = {
        control: (provided: any, state: { isDarkMode: any }) => ({
            ...provided,
            color: state.isDarkMode ? 'white' : 'black',
            backgroundColor: state.isDarkMode ? '#2b2b2b' : 'white',
            border: state.isDarkMode ? '1px solid white' : '1px solid black',
            boxShadow: state.isDarkMode ? 'none' : 'none',
            '&:hover': {
                borderColor: state.isDarkMode ? 'white' : 'black',
            }
        }),
        singleValue: (provided: any, state: { isDarkMode: any }) => ({
            ...provided,
            color: state.isDarkMode ? 'white' : 'black'
        }),
        placeholder: (provided: any, state: { isDarkMode: any }) => ({
            ...provided,
            color: state.isDarkMode ? 'white' : 'black'
        }),
        option: (provided: any, state: { isFocused: any; isDarkMode: any }) => ({
            ...provided,
            backgroundColor: state.isFocused && (state.isDarkMode ? 'black' : 'lightgray'),
            color: state.isDarkMode ? 'white' : 'black',
            '&:hover': {
                backgroundColor: state.isDarkMode ? 'white' : 'lightgray',
                color: state.isDarkMode ? 'white' : 'black'
            }
        })
    };

    return (
        <Container>
            <ComparisonWord>
                <h3>Compare</h3>
            </ComparisonWord>
            <PlayerWrapper>
                <Player1>
                    <h2>Select 1st field</h2>
                    <SDropdownDiv isDarkMode={isDarkMode}>
                        <Dropdown options={players} onInputChange={handlePlayer1Search} onChange={(value: Players) => handlePlayer1SelectChange(value.id)} styles={customStyles} value={inputValue} placeholder="Search" />
                    </SDropdownDiv>

                    {playerOneToCompare && (
                        <div>
                            <BioGrid>
                                <img src={playerOneToCompare.player.photo} alt={playerOneToCompare.player.name} />
                            </BioGrid>

                            <StatsGrid>
                                <StatItem>
                                    <StatTitle>Name: </StatTitle>
                                    {playerOneToCompare.player.name}
                                </StatItem>
                                <StatItem>
                                    <StatTitle>Age: </StatTitle>
                                    {playerOneToCompare.player.age}
                                </StatItem>
                                <StatItem>
                                    <StatTitle>Team: </StatTitle>
                                    {playerOneToCompare.statistics[0].team.name}
                                </StatItem>
                                <StatItem>
                                    <StatTitle>League: </StatTitle>
                                    {playerOneToCompare.statistics[0].league.name}
                                </StatItem>
                                <StatItem>
                                    <StatTitle>Appearances: </StatTitle>
                                    {playerOneToCompare.statistics[0].games.appearences}
                                </StatItem>
                                <StatItem>
                                    <StatTitle>Minutes: </StatTitle>
                                    {playerOneToCompare.statistics[0].games.minutes}
                                </StatItem>
                                <StatItem>
                                    <StatTitle>Goals: </StatTitle>
                                    {playerOneToCompare.statistics[0].goals.total}
                                </StatItem>
                                <StatItem>
                                    <StatTitle>Assists: </StatTitle>
                                    {playerOneToCompare.statistics[0].goals.assists}
                                </StatItem>
                                <StatItem>
                                    <StatTitle>Conceded: </StatTitle>
                                    {playerOneToCompare.statistics[0].goals.conceded}
                                </StatItem>
                                <StatItem>
                                    <StatTitle>Saves: </StatTitle>
                                    {playerOneToCompare.statistics[0].goals.saves}
                                </StatItem>
                                <StatItem>
                                    <StatTitle>Yellow Cards: </StatTitle>
                                    {playerOneToCompare.statistics[0].cards.yellow}
                                </StatItem>
                                <StatItem>
                                    <StatTitle>Red Cards: </StatTitle>
                                    {playerOneToCompare.statistics[0].cards.red}
                                </StatItem>
                            </StatsGrid>

                        </div>
                    )}
                </Player1>
                <VersusDiv>
                    <h3>Vs.</h3>
                </VersusDiv>
                <Player2>
                    <h2>Select 2nd field</h2>
                    <SDropdownDiv isDarkMode={isDarkMode}>
                        <Dropdown options={players} onInputChange={handlePlayer2Search} onChange={(value: Players) => handlePlayer2SelectChange(value.id)} styles={customStyles} value={inputValue} placeholder="Search" />
                    </SDropdownDiv>

                    {playerTwoToCompare && (
                         <div>
                         <BioGrid>
                             <img src={playerTwoToCompare.player.photo} alt={playerTwoToCompare.player.name} />
                         </BioGrid>

                         <StatsGrid>
                             <StatItem>
                                 <StatTitle>Name: </StatTitle>
                                 {playerTwoToCompare.player.name}
                             </StatItem>
                             <StatItem>
                                 <StatTitle>Age: </StatTitle>
                                 {playerTwoToCompare.player.age}
                             </StatItem>
                             <StatItem>
                                 <StatTitle>Team: </StatTitle>
                                 {playerTwoToCompare.statistics[0].team.name}
                             </StatItem>
                             <StatItem>
                                 <StatTitle>League: </StatTitle>
                                 {playerTwoToCompare.statistics[0].league.name}
                             </StatItem>
                             <StatItem>
                                 <StatTitle>Appearances: </StatTitle>
                                 {playerTwoToCompare.statistics[0].games.appearences}
                             </StatItem>
                             <StatItem>
                                 <StatTitle>Minutes: </StatTitle>
                                 {playerTwoToCompare.statistics[0].games.minutes}
                             </StatItem>
                             <StatItem>
                                 <StatTitle>Goals: </StatTitle>
                                 {playerTwoToCompare.statistics[0].goals.total}
                             </StatItem>
                             <StatItem>
                                 <StatTitle>Assists: </StatTitle>
                                 {playerTwoToCompare.statistics[0].goals.assists}
                             </StatItem>
                             <StatItem>
                                 <StatTitle>Conceded: </StatTitle>
                                 {playerTwoToCompare.statistics[0].goals.conceded}
                             </StatItem>
                             <StatItem>
                                 <StatTitle>Saves: </StatTitle>
                                 {playerTwoToCompare.statistics[0].goals.saves}
                             </StatItem>
                             <StatItem>
                                 <StatTitle>Yellow Cards: </StatTitle>
                                 {playerTwoToCompare.statistics[0].cards.yellow}
                             </StatItem>
                             <StatItem>
                                 <StatTitle>Red Cards: </StatTitle>
                                 {playerTwoToCompare.statistics[0].cards.red}
                             </StatItem>
                         </StatsGrid>

                     </div>
                    )}
                </Player2>
            </PlayerWrapper>
        </Container>
    )
};

export default ComparisonFeature;