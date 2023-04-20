/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { playersApi } from '../api/players'
import { leaguesApi } from 'api/leagues'
import { teamsApi } from 'api/teams'
import { playersStatisticsApi } from 'api/playersStatistics'
import { Container, PlayersList, Player, LogoDiv, DropdownDiv, PlayerStatsList, TeamCrest, TeamImage, TeamName, ClubTeamName, PlayerStatsDiv, PlayerPhoto, ChartContainer, PlayerBio, PlayerContainer } from 'styles/index'
import { useState, useEffect } from 'react'
import Select, { components } from 'react-select';
import DarkMode from '../components/DarkMode';
import { useGlobalContext } from 'contexts/GlobalContext';
import type { Team } from 'api/teams';
import styled from 'styled-components'
import Hamburger from 'components/hamburgerBar'
import { ModalComponent } from 'components/Modal'
import { List, Bio } from 'styles/modal-stats-style'
import ChartPage from 'components/ChartPage';

type team = {
  id: number;
  name: string;
  logo: string;
}

type player = {
  id: number,
  name: string;
  age: number,
  number: number,
  position: string;
  photo: string;
  team: string;
}

type league = {
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
  },

  country: {
    name: string,
    code?: string,
    flag?: string
  }
}

type PlayerData = {
  player: {
    id: number;
    name: string;
    age: number;
    photo: string;
  };
  statistics: {
    team: {
      id: number;
      name: string;
    };
    league: {
      id: number;
      name: string;
    };
    games: {
      appearences: number;
      lineups: number;
      minutes: number;
      number: number;
    };
    goals: {
      total: number;
      conceded: number;
      assists: number;
      saves: number;
    };
    cards: {
      yellow: number;
      red: number;
    };
  };
}

type IHome = {
  players: player[];
  team: team;
  leagues: league[];
}

type LeagueNames = {
  value: string;
  label: string;
  id: string;
}

const LeagueOptions: LeagueNames[] = [
  { value: 'Premier League', label: 'Premier League', id: '39' },
  { value: 'La Liga', label: 'La Liga', id: '140' },
  { value: 'Bundesliga', label: 'Bundesliga', id: '78' },
  { value: 'Serie A', label: 'Serie A', id: '135' },
  { value: 'Ligue 1', label: 'Ligue 1', id: '61' },
  { value: 'UCL', label: 'UCL', id: '2' }
];

const Dropdown = styled(Select) <{ isDarkMode?: boolean }>`
  color: ${({ isDarkMode }) => (isDarkMode ? 'white' : 'black')};
  background-color: ${({ isDarkMode }) => (isDarkMode ? 'black' : 'white')};
`;

export default function Home({ players, team, leagues }: IHome) {
  const { isDarkMode } = useGlobalContext();
  const [selectedLeague, setSelectedLeague] = useState<LeagueNames | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<team>(team);
  const [selectedPlayers, setSelectedPlayers] = useState<player[]>([])
  const [teams, setTeams] = useState<Team[]>();
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  const [playerData1, setPlayerData1] = useState<PlayerData[]>([]);
  const [isPlayStatModalOpen, setIsPlayStatModalOpen] = useState(false);
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  const handleSelectChange = async (id: string) => {
    try {
      const { data } = await teamsApi.getTeamsByLeagueId(id);
      setTeams(data.response);
    } catch (error) {
    }
  }

  const handleLogoClick = async (id: string) => {
    try {
      const { data } = await playersApi.getPlayersBySquadId(id);
      setTeams(undefined);
      setSelectedPlayers(data.response[0].players);
      setSelectedTeam(data.response[0].team)
    } catch (error) {
    }
  }

  const handlePlayerClick = async (id: number) => {
    try {
      const { data } = await playersStatisticsApi.getStatisticsByPlayerId(id.toString());
      const { data: data1 } = await playersStatisticsApi.getDataByPlayerId(id.toString());
  
      setPlayerData(
        data.response,
      );
  
      setPlayerData1(
        data1.response.data
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
      <Hamburger />
      <PlayerStatsDiv>

        {isPlayStatModalOpen && (

          <ModalComponent isOpen={isPlayStatModalOpen} onRequestClose={() => setIsPlayStatModalOpen(false)}>

            {playerData.map((player, index) => (
              <Bio key={index}>
               
                <PlayerContainer>

                  <PlayerBio>
                    <h1>{player.player.name}</h1>
                    <img src={player.player.photo} />
                    <ul>
                      <li><b>Age:</b> {player.player.age}</li>
                      <li><b>Nationality:</b> {player.player.nationality}</li>
                      <li><b>Height:</b> {player.player.height}</li>
                      <li><b>Weight:</b> {player.player.weight}</li>
                      <li><b>Position:</b> {player.statistics[0].games.position}</li>
                    </ul>
                  </PlayerBio>

                  <ChartContainer>
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
                      <p><b>Penalties commited:</b> {team.penalty.committed}</p>
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

      </PlayerStatsDiv>

      <LogoDiv>
        <div>
          <h1><a href="/" style={{ color: isDarkMode ? "white" : "black" }}>Football IQ 🧠</a></h1>
        </div>
        <DropdownDiv isDarkMode={isDarkMode}>
          <Dropdown options={LeagueOptions} onChange={(value: LeagueNames) => handleSelectChange(value.id)} isDarkMode={isDarkMode} styles={customStyles} />
        </DropdownDiv>

        {selectedTeam && !teams && (
          <TeamCrest>
            <img src={selectedTeam.logo} alt={selectedTeam.name} />
            <ClubTeamName isDarkMode={isDarkMode}>{selectedTeam.name}</ClubTeamName>
          </TeamCrest>
        )}

      </LogoDiv>

      {selectedLeague && (
        <h3>{selectedLeague.label}</h3>
      )}

      <PlayersList>
        {teams && teams?.length > 0 && teams.map((team: Team) => {
          return (
            <Player key={team.team.id}>
              <PlayerStatsList isDarkMode={isDarkMode}>
              </PlayerStatsList>
              <TeamName isDarkMode={isDarkMode}>{team.team.name}</TeamName>
              <TeamImage src={team.team.logo} onClick={() => handleLogoClick(team.team.id)} />
            </Player>
          );
        })}

        {!teams && selectedPlayers && selectedPlayers?.length > 0 && selectedPlayers.map((player: player) => {
          return (
            <Player key={player.id} onClick={() => handlePlayerClick(player.id)}>
              <PlayerPhoto src={player.photo} />
              <PlayerStatsList isDarkMode={isDarkMode}>
                <li>{`Name: ${player.name}`}</li>
                <li>{`Number:  ${player.number}`}</li>
                <li>{`Age:  ${player.age}`}</li>
                <li>{`Position: ${player.position}`}</li>
              </PlayerStatsList>
            </Player>
          );
        })}
      </PlayersList>
    </Container>
  )
}

export async function getServerSideProps(context: any) {
  const { data } = await playersApi.getPlayersBySquadId("49");
  const leagues = await leaguesApi.getLeagues();
  return {
    props: {
      players: data.response[0].players,
      leagues: leagues.data.response
    },
  }
}
