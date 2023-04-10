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
  { value: 'La Liga', label: 'La Liga', id: '39' },
  { value: 'Bundesliga', label: 'Bundesliga', id: '39' },
  { value: 'Serie A', label: 'Serie A', id: '39' },
  { value: 'Ligue 1', label: 'Ligue 1', id: '39' },
  { value: 'UCL', label: 'UCL', id: '39' }
];



// function Test()  {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   return (
//     <div className={isDarkMode ? 'dark-mode' : ''}>
//       <DarkMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
//       <h1>My TypeScript App</h1>
//       <p>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
//         tincidunt, nunc sed euismod ullamcorper, urna nulla lobortis velit, id
//         mollis purus ipsum at dolor. Aeqcqwefwqwwqfgq nean vitae enim sapien. Sed euismod
//         purus non eleifend pharetra. Sed a lacinia lorem, nec varius arcu.
//         Mauris sit amet mauris lectus. Ut scelerisque tortor in elit gravida,
//         non dignissim velit aliquam. Vivamus pharetra quam id eros suscipit,
//         sed maximus nibh congue.
//       </p>
//     </div>
//   );
// };



export default function Home({ players, team, leagues, statistics }: IHome) {
  const [selectedLeague, setSelectedLeague] = useState<LeagueNames | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<team>(team);
  const [selectedPlayers, setSelectedPlayers] = useState<player[]>(players)
  const [teams, setTeams] = useState<Team[]>();
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }
  const { isDarkMode } = useGlobalContext();

  const handleChange = async () => {
    try {
      const { data } = await teamsApi.getTeamsByLeagueId('39');
      console.log(data.response)
      setTeams(data.response);
      // Set State
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

  // console.log(selectedLeague);

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
        {/* <Select options={LeagueOptions} onChange={(selectedOption) => setSelectedLeague(selectedOption as unknown as league)} /> */}
        <Select options={LeagueOptions} onChange={handleChange} />

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

      <LeagueDiv>

        <LeagueTextDiv>
          <h1 style={{ borderBottom: '4px solid black' }}>
            Leagues
          </h1>
        </LeagueTextDiv>

        <LeaguesList>

          {leagues.map((league: league) => {
            const leaguesToReturn = [39, 78, 61, 135, 140, 2];

            if (!leaguesToReturn.includes(league.league.id)) return;

            return (
              <League key={league.league.id}>
                <LeagueStatsList>
                  <img src={league.league.logo} onClick={() => setSelectedLeague(league)} />
                </LeagueStatsList>
              </League>
            );
          })}
        </LeaguesList>

      </LeagueDiv>

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