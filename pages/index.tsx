import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { playersApi } from '../api/players'
import styled from 'styled-components'
import { Container, PlayersList, Player, TeamCrest, PlayerStatsList } from 'styles/index'

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

type IHome = {
  players: player[];
  team: team;
}



export default function Home({ players, team }: IHome) {
  return (
    <Container>

      <TeamCrest>
        <img src={team.logo} alt="ff" />
      </TeamCrest>

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
    </Container>
  )
}

export async function getServerSideProps(context: any) {
  const { data } = await playersApi.getPlayersBySquadId("49");
  console.log(data.response[0])
  return {
    props: {
      players: data.response[0].players,
      team: data.response[0].team
    }, // will be passed to the page component as props
  }
}