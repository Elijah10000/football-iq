import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { playersApi } from '../api/players'
import { leaguesApi } from 'api/leagues'
import styled from 'styled-components'
import { Container, PlayersList, Player, TeamCrest, PlayerStatsList, LogoDiv, LeagueTextDiv } from 'styles/index'
import { LeaguesList, LeagueStatsList, League, LeagueDiv, LeagueNames } from 'styles/index'
import { useState, useEffect } from 'react'
import AsyncSelect from 'react-select/async';

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

type IHome = {
  players: player[];
  team: team;
  leagues: league[];
}

export default function Home({ players, team, leagues }: IHome) {
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
                {`${league.league.name}`}
                  <img src={league.league.logo} />
                </LeagueNames>
                {/* {`Logo: ${league.league.logo}`}</li> */}
              </LeagueStatsList>
            </League>
          );
        })}
      </LeaguesList>

      </LeagueDiv>
      
    </Container>
  )
}

// export function Dropdown (){
//   const [items, setItems] = useState([]);
//   const [inputValue, setValue] = useState ([]);
//   const [selectedValue, setSelectedValue] = useState ([null]);

//   const handleInputChange = value => {
//     setValue(value);
//   };

//   const handleChange = value => {
//     setSelectedValue(value);
//   };

//   const fetchData = () => {
//     return  axios.get(`https://api-football-v1.p.rapidapi.com/v3/players/squads`).then(result => {
//       const res = result.data.data;
//       return res;
//     });
//   }
// }

export async function getServerSideProps(context: any) {
  const { data } = await playersApi.getPlayersBySquadId("49");
  const leagues = await leaguesApi.getLeagues();
  return {
    props: {
      players: data.response[0].players,
      team: data.response[0].team,
      leagues: leagues.data.response
    }, 
  }
}

