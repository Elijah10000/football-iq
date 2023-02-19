import { playersApi } from '../api/players'
import { leaguesApi } from 'api/leagues'
import { statisticsApi } from 'api/statistics'
import { Container, PlayersList, Player, TeamCrest, PlayerStatsList, LogoDiv, LeagueTextDiv, LeaguesList, LeagueStatsList, League, LeagueDiv, LeagueNames, StatisticsList, StatisticsStatsList, Statistics } from 'styles/index'
import { useEffect, useState } from 'react'
import React from 'react';
import Select from "react-dropdown-select";
import 'react-dropdown/style.css';
import axios from 'axios'



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
}

const options = [];


export default function Home({ players, team, leagues, statistics }: IHome) {
  const [stats] = useState<statistics | null>(null);
  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }
  console.log(statistics);

  const App = () => {
    const [league1, setLeague1] = useState(options);
    const [selectedLeague, setSelectedLeague] = useState(null);
  
    useEffect(() => {
      axios({
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
        headers: {
          'x-rapidapi-key': '3e93f54308mshcc56d624809a4a9p144a30jsn829d33d2f0e4',
          'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
      })
        .then(response => {
          const leagues = response.data.response.map(league => ({
            label: league.name,
            value: league.league.id
          }));
          setLeague1(leagues);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    const handleSelectChange = selectedOption => {
      setSelectedLeague(selectedOption);
    };
  
    return (
      <div>
        <Select
          options={league1}
          value={selectedLeague}
          onChange={handleSelectChange}
        />
      </div>
    );
  };
  

  return (
    <Container>
      <LogoDiv>
        <div>
          <h1 style={{ borderBottom: '4px solid black' }}>
            Football IQ
          </h1>
        </div>
        <TeamCrest>
          <img src={team.logo} alt="ff" />
        </TeamCrest>
      </LogoDiv>

      <a href="login">Click here to login!</a>



      <Select options={options} onChange={() => console.log('values')} />

      <PlayersList>
        {players.map((player: player) => {
          return (
            <Player key={player.id}>
              <PlayerStatsList>
                <li>{`Name: ${player.name}`}</li>
                <li>{`Number:  ${player.number}`}</li>
                <li>{`Age:  ${player.age}`}</li>
                <li>{`Position: ${player.position}`}</li>
                <li>{`Club: ${team.name}`}</li>
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
                  <LeagueNames>
                    <button onClick={buttonHandler} className="button" name="button 1">
                      {`${league.league.name}`}
                    </button>

                    <img src={league.league.logo} />
                  </LeagueNames>
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
