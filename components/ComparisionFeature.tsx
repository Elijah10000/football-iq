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
import { ChartContainer, PlayerBio, PlayerContainer } from 'styles/index'
import { ModalComponent } from 'components/Modal'
import { List, Bio } from 'styles/modal-stats-style'
import ChartPage from 'components/ChartPage';


const Dropdown = styled(Select) <{ isDarkMode?: boolean }>`
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : 'black')};
  background-color: ${({ isDarkMode }) => (isDarkMode ? 'black' : 'white')};
`;

const SDropdownDiv = styled(DropdownDiv)`
    width: 70%;
`;

const ComparisonFeature = () => {
    const { isDarkMode, setIsDarkMode } = useGlobalContext();
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [playerOneToCompare, setPlayerOneToCompare] = useState<PlayerData | undefined>();
    const [playerTwoToCompare, setPlayerTwoToCompare] = useState<PlayerData | undefined>();


    const [playerData, setPlayerData] = useState<PlayerData[]>([]);
    const [isPlayStatModalOpen, setIsPlayStatModalOpen] = useState(false);

    useEffect(() => {
        const fetchDefaultPlayers = async () => {
            const [playerOne, playerTwo] = await Promise.all([
                playersStatisticsApi.getStatisticsByPlayerId('283'),
                playersStatisticsApi.getStatisticsByPlayerId('19545'),
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

    const handlePlayer1Search = (value) => {
        setInputValue1(value);
    };

    const handlePlayer2Search = (value) => {
        setInputValue2(value);
    };

    const handlePlayer1SelectChange = (id: string) => {
        handlePlayerData(id, '1')
    };

    const handlePlayer2SelectChange = (id: string) => {
        handlePlayerData(id, '2')
    };

    const handlePlayerClick = async (id: number) => {
        try {
            const { data } = await playersStatisticsApi.getStatisticsByPlayerId(id.toString());
            const { data: data1 } = await playersStatisticsApi.getDataByPlayerId(id.toString());

            setPlayerData(
                data.response,
            );



            setIsPlayStatModalOpen(true);
        } catch (error) {
            console.log(error);
            setIsPlayStatModalOpen(false);
        }
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
        <Container isDarkMode={isDarkMode}>
            {isPlayStatModalOpen && (

                <ModalComponent isDarkMode={isDarkMode} isOpen={isPlayStatModalOpen} onRequestClose={() => setIsPlayStatModalOpen(false)}>

                    {playerData.map((player, index) => (
                        <Bio key={index}>

                            <PlayerContainer>

                                <PlayerBio>
                                    <h1>{player.player.name}</h1>
                                    <img src={player.player.photo} />
                                    <ul>
                                        <li><b>Age:</b> {player.player.age}</li>
                                        <li><b>Nationality:</b> {player.player.nationality}</li>
                                        <li><b>Team:</b> {player.statistics[0].team.name}</li>
                                        <li><b>Height:</b> {player.player.height}</li>
                                        <li><b>Weight:</b> {player.player.weight}</li>
                                        <li><b>Position:</b> {player.statistics[0].games.position}</li>
                                    </ul>
                                </PlayerBio>

                                <ChartContainer>
                                    <h1>Key Statistics (All Comps) </h1>
                                    <ChartPage playerId={player.player.id} />
                                </ChartContainer>

                            </PlayerContainer>

                            <ul>
                                <h1>Statistics:</h1>
                                {player.statistics.map((team, index) => (
                                    <List key={index}>
                                        <p><b>Team:</b> {team.team.name}</p>
                                        <p><b>Competition:</b> {team.league.name}</p>
                                        <p><b>Position:</b> {team.games.position}</p>
                                        <p><b>Rating:</b> {team.games.rating}</p>
                                        <p><b>Games:</b> {team.games.appearances}</p>
                                        <p><b>Minutes:</b> {team.games.minutes}</p>
                                        <p><b>Goals:</b> {team.goals.total}</p>
                                        <p><b>Assists:</b> {team.goals.assists}</p>
                                        <p><b>Shots:</b> {team.shots.total}</p>
                                        <p><b>Shots on target:</b> {team.shots.on}</p>
                                        <p><b>Passes:</b> {team.passes.total}</p>
                                        <p><b>Passing accuracy:</b> {team.passes.accuracy}</p>
                                        <p><b>Tackles:</b> {team.tackles.total}</p>
                                        <p><b>Blocks:</b> {team.tackles.blocks}</p>
                                        <p><b>Interceptions:</b> {team.tackles.interceptions}</p>
                                        <p><b>Duels:</b> {team.duels.total}</p>
                                        <p><b>Duels won:</b> {team.duels.won}</p>
                                        <p><b>Yellow cards:</b> {team.cards.yellow}</p>
                                        <p><b>Red cards:</b> {team.cards.red}</p>
                                        <p><b>Substitutes in:</b> {team.substitutes.in}</p>
                                        <p><b>Substitutes out:</b> {team.substitutes.out}</p>
                                        <p><b>Substitutes bench:</b> {team.substitutes.bench}</p>
                                        <p><b>Penalties scored:</b> {team.penalty.scored}</p>
                                        <p><b>Penalties missed:</b> {team.penalty.missed}</p>
                                        <p><b>Penalties saved:</b> {team.penalty.saved}</p>
                                        <p><b>Penalties conceded:</b> {team.penalty.conceded}</p>
                                        <p><b>Penalties won:</b> {team.penalty.won}</p>
                                        <p><b>Penalties committed:</b> {team.penalty.committed}</p>
                                        <p><b>Penalties success:</b> {team.penalty.success}</p>
                                        <p><b></b> {team.fouls.drawn}</p>
                                        <p><b>Fouls suffered:</b> {team.fouls.committed}</p>
                                    </List>
                                ))}
                            </ul>
                        </Bio>
                    ))}
                </ModalComponent>
            )}

            <ComparisonWord isDarkMode={isDarkMode}>
                <h3>Compare</h3>
            </ComparisonWord>
            <PlayerWrapper isDarkMode={isDarkMode}>
                <Player1 isDarkMode={isDarkMode}>
                    <h2>Select 1st field </h2>
                    <SDropdownDiv isDarkMode={isDarkMode}>
                        <Dropdown isDarkMode={isDarkMode}
                            options={players}
                            onInputChange={(value: string) => handlePlayer1Search(value)}
                            onChange={(value: Players) => handlePlayer1SelectChange(value.id)}
                            styles={customStyles}
                            value={inputValue1}
                            placeholder="Search"
                            menuIsOpen={inputValue1.length > 1}
                        />
                    </SDropdownDiv>

                    {playerOneToCompare && (

                        <div>
                            <BioGrid onClick={() => handlePlayerClick(playerOneToCompare.player.id.toString())}>
                                <img src={playerOneToCompare.player.photo} alt={playerOneToCompare.player.name} />
                            </BioGrid>

                            <StatsGrid isDarkMode={isDarkMode}>
                                <StatItem isDarkMode={isDarkMode}>
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

                <VersusDiv isDarkMode={isDarkMode}>
                    <h3>Vs.</h3>
                </VersusDiv>

                <Player2 isDarkMode={isDarkMode}>
                    <h2>Select 2nd field</h2>
                    <SDropdownDiv isDarkMode={isDarkMode}>
                        <Dropdown isDarkMode={isDarkMode}
                            options={players}
                            onInputChange={(value: string) => handlePlayer2Search(value)}
                            onChange={(value: Players) => handlePlayer2SelectChange(value.id)}
                            styles={customStyles}
                            value={inputValue2}
                            placeholder="Search"
                            menuIsOpen={inputValue2.length > 1}
                        />
                    </SDropdownDiv>

                    {playerTwoToCompare && (
                        <div>
                            <BioGrid onClick={() => handlePlayerClick(playerTwoToCompare.player.id.toString())}>
                                <img src={playerTwoToCompare.player.photo} alt={playerTwoToCompare.player.name} />
                            </BioGrid>

                            <StatsGrid isDarkMode={isDarkMode}>
                                <StatItem isDarkMode={isDarkMode}>
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
        </Container >
    )
};

export default ComparisonFeature;