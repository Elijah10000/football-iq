/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { playersApi } from '../api/players'
import { leaguesApi } from 'api/leagues'
import { teamsApi } from 'api/teams'
import { playersStatisticsApi } from 'api/playersStatistics'
import { Container, PlayersList, Player, LogoDiv, DropdownDiv, PlayerStatsList, TeamCrest, TeamImage, TeamName, ClubTeamName, PlayerStatsDiv } from 'styles/index'
import { useState, useEffect } from 'react'
import Select, { components } from 'react-select';
import DarkMode from '../components/DarkMode';
import { useGlobalContext } from 'contexts/GlobalContext';
import type { Team } from 'api/teams';
import styled from 'styled-components'
import Hamburger from 'components/hamburgerBar'
import { ModalComponent } from 'components/Modal'

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
  const [isPlayStatModalOpen, setIsPlayStatModalOpen] = useState(false);
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  const handleSelectChange = async (id: string) => {
    try {
      const { data } = await teamsApi.getTeamsByLeagueId(id);
      console.log(data.response)
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
      setPlayerData(data.response)
      setIsPlayStatModalOpen(true);
    } catch (error) {
      console.log(error)
      setIsPlayStatModalOpen(false);
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

  console.log(playerData)

  return (
    <Container isDarkMode={isDarkMode}>
      <Hamburger />
      <PlayerStatsDiv>

        {isPlayStatModalOpen && (

          <ModalComponent isOpen={isPlayStatModalOpen} onRequestClose={() => setIsPlayStatModalOpen(false)}>
        {playerData.map((player, index) => (
        <div key={index}>
          <h2>{player.player.name}</h2>
          <p>Age: {player.player.age}</p>
          <p>Nationality: {player.player.nationality}</p>
          <h3>Statistics:</h3>
          <ul>
            <li>
              <p>Team: {player.statistics[player.statistics.length - 1].team.name}</p>
              <p>League: {player.statistics[player.statistics.length - 1].league.name}</p>
              <p>Position: {player.statistics[player.statistics.length - 1].games.position}</p>
              <p>Rating: {player.statistics[player.statistics.length - 1].games.rating}</p>
              <p>Games: {player.statistics[player.statistics.length - 1].games.appearances}</p>
              <p>Minutes: {player.statistics[player.statistics.length - 1].games.minutes}</p>
              <p>Goals: {player.statistics[player.statistics.length - 1].goals.total}</p>
              <p>Assists: {player.statistics[player.statistics.length - 1].goals.assists}</p>
              <p>Shots: {player.statistics[player.statistics.length - 1].shots.total}</p>
              <p>Shots on target: {player.statistics[player.statistics.length - 1].shots.on}</p>
              <p>Passes: {player.statistics[player.statistics.length - 1].passes.total}</p>
              <p>Passes accuracy: {player.statistics[player.statistics.length - 1].passes.accuracy}</p>
              <p>Tackles: {player.statistics[player.statistics.length - 1].tackles.total}</p>
              <p>Blocks: {player.statistics[player.statistics.length - 1].tackles.blocks}</p>
              <p>Interceptions: {player.statistics[player.statistics.length - 1].tackles.interceptions}</p>
              <p>Duels: {player.statistics[player.statistics.length - 1].duels.total}</p>
              <p>Duels won: {player.statistics[player.statistics.length - 1].duels.won}</p>
              <p>Yellow cards: {player.statistics[player.statistics.length - 1].cards.yellow}</p>
              <p>Red cards: {player.statistics[player.statistics.length - 1].cards.red}</p>
              <p>Fouls: {player.statistics[player.statistics.length - 1].fouls.drawn}</p>
              <p>Fouls suffered: {player.statistics[player.statistics.length - 1].fouls.committed}</p>
            </li>
          </ul>
        </div>
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
              <img src={player.photo} />
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
