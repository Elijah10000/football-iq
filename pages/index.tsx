import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { playersApi } from '../api/players'
import styled from 'styled-components'

type IHome = {
  players: any;
  team: any;
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
`;

export default function Home({ players, team }: IHome) {
  return (
    <Container>
      {players.map((item, i) => {

        return (
          <option key={i} value={item}>
            {item.name}
          </option>
        );
      })}
    </Container>

  )
}

export async function getServerSideProps(context: any) {
  const { data } = await playersApi.getPlayersBySquadId("33");
  console.log(data.response[0])
  return {
    props: {
      players: data.response[0].players,
      team: data.response[0].team
    }, // will be passed to the page component as props
  }
}



