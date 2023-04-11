import React from 'react'
import { playersApi } from '../api/players'
import { leaguesApi } from 'api/leagues'
import { teamsApi } from 'api/teams'
import { statisticsApi } from 'api/statistics'
import { Container, PlayersList, Player, TeamCrest, LogoDiv, LeagueTextDiv, LeaguesList, LeagueStatsList, League, LeagueDiv, LoginDiv, DropdownDiv, PlayerStatsList } from 'styles/index'
import { useState, useEffect } from 'react'
import Select, { components } from 'react-select';
import DarkMode from '../components/DarkMode';
import { useGlobalContext } from 'contexts/GlobalContext';
import type { Team } from 'api/teams';
import styled from 'styled-components'
import ValueType from 'react-select';

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
  id: number;
  goals: number;
  assists: number;
}


type IHome = {
  players: player[];
  team: team;
  leagues: league[];
  statistics: statistics;
  Test: any;
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
  const [selectedPlayers, setSelectedPlayers] = useState<player[]>(players)
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
      console.log(error)
    }
  }


  const handleLogoClick = async (id: string) => {

    try {
      const { data } = await playersApi.getPlayersBySquadId(id);
      setTeams(undefined);
      setSelectedPlayers(data.response[0].players);
      setSelectedTeam(data.response[0].team)
    } catch (error) {
      console.log(error)
    }
  }
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? (isDarkMode ? '#424242' : '#E6E6E6') : (isDarkMode ? '#282828' : 'white'),
      color: state.isSelected ? (isDarkMode ? 'white' : 'black') : (isDarkMode ? 'white' : 'black'),
    }),
    control: (provided: any) => ({
      ...provided,
      backgroundColor: isDarkMode ? '#424242' : 'white',
      color: isDarkMode ? 'white' : 'black',
    }),
  };



  return (
    <Container isDarkMode={isDarkMode}>
      <DarkMode />
      <LoginDiv>
        <a href="login">Click here to login!</a>
      </LoginDiv>

      <LogoDiv>
        <div>
          <h1 style={{ borderBottom: '4px solid black' }}>
            Football IQ
          </h1>
        </div>
        <TeamCrest>
          <img src={selectedTeam.logo} alt="ff" />
        </TeamCrest>
      </LogoDiv>


      <DropdownDiv>
        <Dropdown options={LeagueOptions} onChange={(value: LeagueNames) => handleSelectChange(value.id)} isDarkMode={isDarkMode} styles={customStyles} />
      </DropdownDiv>

      {selectedLeague && (
        <h3>{selectedLeague.label}</h3>
      )}

      <PlayersList>

        {teams && teams?.length > 0 && teams.map((team: Team) => {
          return (
            <Player key={team.team.id}>
              <PlayerStatsList>
                <li>{`Team: ${team.team.id}`}</li>
                <li>{`Name: ${team.team.name}`}</li>
                <li>{`Country:  ${team.team.country}`}</li>
              </PlayerStatsList>

              <img src={team.team.logo} onClick={() => handleLogoClick(team.team.id)} />

            </Player>
          );

        })}

        {!teams && selectedPlayers && selectedPlayers?.length > 0 && selectedPlayers.map((player: player) => {
          return (
            <Player key={player.id}>
              <PlayerStatsList>
                <li>{`Name: ${player.name}`}</li>
                <li>{`Number:  ${player.number}`}</li>
                <li>{`Age:  ${player.age}`}</li>
                <li>{`Position: ${player.position}`}</li>
                <li>{`Club: ${selectedTeam.name}`}</li>
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
  const statistics = await statisticsApi.getStatisticsBySquadId("3", "2022", "49")
  console.log(statistics);
  return {
    props: {
      players: data.response[0].players,
      team: data.response[0].team,
      leagues: leagues.data.response,
      statistics: statistics.data.response
    },
  }
}