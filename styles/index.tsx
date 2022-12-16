import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-flow: row wrap;
`;

export const PlayersList = styled.ul`
  color: white;
  width: 100%;
  display: grid;
  justify-content: center;
  flex-direction: row;
  grid-template-columns: 1fr 1fr;


  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const Player = styled.li`	
  margin-bottom: 20px;
`;

export const PlayerStatsList = styled.ul`
  list-style-type: none;
  padding:0;
`;

export const PlayerN = styled.p`
`;

export const TeamCrest = styled.div`
  margin: 40px auto;
  img {
      width: 100px;
      height: 100px;
  }
`;