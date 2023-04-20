import styled from 'styled-components';

export const Bio = styled.div`
  align-items: center;
  margin-bottom: 20px;
  

  h1 {
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
    margin-left: 5%;
  }

  img {
    margin-top: 10px;
    margin-bottom: 15px;
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  li {
    margin-bottom: 10px;
  }
`;

export const List = styled.li`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  padding: 20px;
  width: 1000px;
  margin-left: 5%;
  p {
    margin-bottom: 5px;
  }
`;

