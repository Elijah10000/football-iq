import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { playersApi } from '../api/players'
import styled from 'styled-components'

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

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
`;

export default function Home({ players, team }: IHome) {
  return (
    <Container>
      {players.map((player: player, i: number) => {

        return (
          <div key={i} value={player.name}>
            {player.name}
            {player.number}
            {team.name}
            <img src={team.logo} alt="ff" />
          </div>
        );
      })}
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