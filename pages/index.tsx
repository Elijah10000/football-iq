/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React, { ReactNode } from 'react'
import { playersApi } from '../api/players'
import { leaguesApi } from 'api/leagues'
import { teamsApi } from 'api/teams'
import { playersStatisticsApi } from 'api/playersStatistics'
import { teamStatisticsApi } from 'api/teamStatistics'
import { Container, PlayersList, Player, LogoDiv, DropdownDiv, PlayerStatsList, TeamCrest, TeamImage, TeamName, PlayerStatsDiv, PlayerPhoto, ChartContainer, PlayerBio, PlayerContainer, PlayerName, TeamStats, Div1 } from 'styles/index'
import { useState, useEffect } from 'react'
import Select, { components } from 'react-select';
import { useGlobalContext } from 'contexts/GlobalContext';
import type { Team } from 'api/teams';
import type { TeamData } from 'api/teamStatistics';
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
    nationality: ReactNode
    height: ReactNode
    weight: ReactNode
    number: ReactNode
    id: number;
    name: string;
    age: number;
    photo: string;
  };
  statistics: {
    map(arg0: (team: any, index: any) => JSX.Element): React.ReactNode
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
  const [selectedLeague, setSelectedLeague] = useState<string>();
  const [selectedTeam, setSelectedTeam] = useState<team | undefined>(team);
  const [selectedPlayers, setSelectedPlayers] = useState<player[]>([])
  const [teams, setTeams] = useState<Team[]>();
  const [playerData, setPlayerData] = useState<PlayerData[]>([]);
  const [teamData, setTeamData] = useState<TeamData>([]);
  const [playerData1, setPlayerData1] = useState<PlayerData[]>([]);
  const [isPlayStatModalOpen, setIsPlayStatModalOpen] = useState(false);
  const [isTeamStatModalOpen, setIsTeamStatModalOpen] = useState(false);

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  const handleSelectChange = async (id: string) => {
    try {
      const { data } = await teamsApi.getTeamsByLeagueId(id);
      setTeams(data.response);
      setSelectedLeague(id)
      setSelectedTeam(undefined);
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


  const handleTeamLogoClick = async (teamId: string, leagueId: string) => {
    try {
      const { data } = await teamStatisticsApi.getTeamStatisticsById(teamId, leagueId);
      setTeamData(data.response);

      setIsTeamStatModalOpen(true);
    } catch (error) {
      console.log(error);
      setIsTeamStatModalOpen(false)
    }
  }

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

  console.log(teamData)

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
                      <li><b>Team:</b> {player.statistics[0].team.name}</li>
                      <li><b>Height:</b> {player.player.height}</li>
                      <li><b>Weight:</b> {player.player.weight}</li>
                      <li><b>Position:</b> {player.statistics[0].games.position}</li>
                    </ul>
                  </PlayerBio>

                  <ChartContainer>
                    <h1>Key Stats</h1>
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

        {isTeamStatModalOpen && (
          <ModalComponent isOpen={isTeamStatModalOpen} onRequestClose={() => setIsTeamStatModalOpen(false)}>
            <TeamStats>
              <img src={selectedTeam.logo} alt={selectedTeam.name} />
              <div>
                <h1>Key Statistics: </h1>
              </div>
              <div>
                <h3>Team:</h3> <p>{teamData.team.name}</p>
              </div>
              <div>
                <h3>Country:</h3> <p>{teamData.league.country}</p>
              </div>
              <div>
                <h3>League:</h3> <p>{teamData.league.name}</p>
              </div>
              <div>
                <h3>Current Form: </h3> <p>{teamData.form}</p>
              </div>
              <div>
                <h3>Games Played: </h3> <p>{teamData.fixtures.played.total}</p>
              </div>
              <div>
                <h3>Total Wins: </h3> <p>{teamData.fixtures.wins.total}</p>
              </div>
              <div>
                <h3>Total Loses: </h3> <p>{teamData.fixtures.loses.total}</p>
              </div>
              <div>
                <h3>Total Draws: </h3> <p>{teamData.fixtures.draws.total}</p>
              </div>
              <div>
                <h3>Total Goals Scored: </h3> <p>{teamData.goals.for.total.total}</p>
              </div>
              <div>
                <h3>Total Goals Conceded: </h3> <p>{teamData.goals.against.total.total}</p>
              </div>
              <div>
                <h3>Total Clean Sheets: </h3> <p>{teamData.clean_sheet.total}</p>
              </div>
              <div>
                <h3>Most Popular Formation: </h3> <p>{teamData.lineups[0].formation}</p> <p>{`(${teamData.lineups[0].played})`}</p>
              </div>
              <div>
                <h2>Extra Statistics: </h2>
              </div>
              <Div1>
              <div>
                <h3>Most Goals Against - Home:</h3> <p>{teamData.biggest.goals.against.home}</p>
              </div>
              <div>
                <h3>Most Goals Against - Away:</h3> <p>{teamData.biggest.goals.against.away}</p>
              </div>
              <div>
                <h3>Most Goals For - Home: </h3> <p>{teamData.biggest.goals.for.home}</p>
              </div>
              <div>
                <h3>Most Goals For - Away: </h3> <p>{teamData.biggest.goals.for.away}</p>
              </div>
              <div>
                <h3>Biggest Victory - Home: </h3> <p>{teamData.biggest.wins.home}</p>
              </div>
              <div>
                <h3>Biggest Victory - Away: </h3> <p>{teamData.biggest.wins.away}</p>
              </div>
              <div>
                <h3>Biggest Loss - Home: </h3> <p>{teamData.biggest.loses.home}</p>
              </div>
              <div>
                <h3>Biggest Loss - Away: </h3> <p>{teamData.biggest.loses.away}</p>
              </div>
              <div>
                <h3>Clean Sheets - Home </h3> <p>{teamData.clean_sheet.home}</p>
              </div>
              <div>
                <h3>Clean Sheets - Away: </h3> <p>{teamData.clean_sheet.away}</p>
              </div>
              <div>
                <h3>Failed to Score - Home: </h3> <p>{teamData.failed_to_score.home}</p>
              </div>
              <div>
                <h3>Failed to Score - Away: </h3> <p>{teamData.failed_to_score.away}</p>
              </div>
              <div>
                <h3>Failed to Score - Total: </h3> <p>{teamData.failed_to_score.total}</p>
              </div>
              <div>
                <h3>Goals Conceded Average - Home: </h3> <p>{teamData.goals.against.average.home}</p>
              </div>
              <div>
                <h3>Goals Conceded Average - Away: </h3> <p>{teamData.goals.against.average.away}</p>
              </div>
              <div>
                <h3>Goals Conceded Average - Total: </h3> <p>{teamData.goals.against.average.total}</p>
              </div>
              <div>
                <h3>Goals Conceded - Home: </h3> <p>{teamData.goals.against.total.home}</p>
              </div>
              <div>
                <h3>Goals Conceded - Away: </h3> <p>{teamData.goals.against.total.away}</p>
              </div>
              <div>
                <h3>Goals Scored Average - Home: </h3> <p>{teamData.goals.for.average.home}</p>
              </div>
              <div>
                <h3>Goals Scored Average - Away: </h3> <p>{teamData.goals.for.average.away}</p>
              </div>
              <div>
                <h3>Goals Scored Average - Total: </h3> <p>{teamData.goals.for.average.total}</p>
              </div>
              <div>
                <h3>Goals Scored - Home: </h3> <p>{teamData.goals.for.total.home}</p>
              </div>
              <div>
                <h3>Goals Scored - Away: </h3> <p>{teamData.goals.for.total.away}</p>
              </div>
              <div>
                <h3>Penalties: </h3> <p>{teamData.penalty.total}</p>
              </div>
              <div>
                <h3>Penalties Scored Percentage: </h3> <p>{teamData.penalty.scored.percentage}</p>
              </div>
              <div>
                <h3>Penalties Scored Total: </h3> <p>{teamData.penalty.scored.total}</p>
              </div>
              <div>
                <h3>Penalties missed Percentage: </h3> <p>{teamData.penalty.missed.percentage}</p>
              </div>
              <div>
                <h3>Penalties missed Total: </h3> <p>{teamData.penalty.missed.total}</p>
              </div>
              </Div1>
            </TeamStats>
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

      </LogoDiv>

      <TeamCrest>
        {selectedTeam && selectedLeague && (
          <>
            <img src={selectedTeam.logo} alt={selectedTeam.name} onClick={() => handleTeamLogoClick(selectedTeam.id.toString(), selectedLeague)} />
            <TeamName isDarkMode={isDarkMode}>{selectedTeam.name}</TeamName>
          </>
        )}
      </TeamCrest>

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
                <PlayerName>{`${player.name}`}</PlayerName>
              </PlayerStatsList>
            </Player>
          );
        }).sort()}
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
