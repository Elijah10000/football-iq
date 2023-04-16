/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { playersApi } from '../api/players'
import { leaguesApi } from 'api/leagues'
import { teamsApi } from 'api/teams'
import { playersStatisticsApi } from 'api/playersStatistics'
import { Container, PlayersList, Player, LogoDiv, DropdownDiv, PlayerStatsList, TeamCrest, TeamImage, TeamName, ClubTeamName } from 'styles/index'
import { useState, useEffect } from 'react'
import Select, { components } from 'react-select';
import DarkMode from '../components/DarkMode';
import { useGlobalContext } from 'contexts/GlobalContext';
import type { Team } from 'api/teams';
import styled from 'styled-components'
import Hamburger from 'components/hamburgerBar'


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

type statistics = {
  TeamId: string;
  season: string;
  leagueIds: number[];
}


type IHome = {
  players: player[];
  team: team;
  leagues: league[];
  statistics: statistics;
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

export default function Home({ players, team, leagues, statistics }: IHome) {
  const { isDarkMode } = useGlobalContext();
  const [selectedLeague, setSelectedLeague] = useState<LeagueNames | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<team>(team);
  const [selectedPlayers, setSelectedPlayers] = useState<player[]>([])
  const [teams, setTeams] = useState<Team[]>();
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
       {/* <PlayersStatisticsApi /> */}

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
            <Player key={player.id}>
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
  const leagueIds = [39, 140, 78, 135, 61, 2];
  const response = await playersStatisticsApi.getStatisticsByTeamId("49", "2022", leagueIds);
    console.log(JSON.stringify(response.data));

  return {
    props: {
      players: data.response[0].players,
      leagues: leagues.data.response,
    },
  }
}
