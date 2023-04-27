import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [dropdown, setDropdown] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [searchValue, setSearchValue] = useState([]);


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
        const leagues = response.data.response.map((league) => ({
          label: league.name,
          value: league.league.id
        }));
        setDropdown(leagues);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // const handleSelectChange = (selectedOption) => {
  //   setSelectedLeague(selectedOption);
  //   axios({
  //     method: 'GET',
  //     url: `https://api-football-v1.p.rapidapi.com/v3/teams/`,
  //     headers: {
  //       'x-rapidapi-key': '3e93f54308mshcc56d624809a4a9p144a30jsn829d33d2f0e4',
  //       'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
  //     }
  //   })
  //   .then(response => {
  //     const clubs = response.data.response.map((club) => ({
  //       label: club.name,
  //       value: club.team.id
  //     }));
  //     setClubs(clubs);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // };

  const handleSelectChange = (selectedOption: string) => {
    console.log('Searchbar callback');
    console.log(selectedOption);
  };

  return (
    <div>
      <Select
        options={dropdown}
        value={selectedLeague}
        onChange={() => handleSelectChange}
      />
      {selectedLeague && (
        <div>
          <h3>Teams in {selectedLeague.label}</h3>
          <input type="text" placeholder="Search clubs..." onChange={(e) => setSearchValue(e.target.value)} />
          <Select
            options={teams.filter(team => team.league.id === selectedLeague.value && team.name.toLowerCase().includes(searchValue.toLowerCase()))}
            value={selectedTeam}
            onChange={handleTeamChange}
          />
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));