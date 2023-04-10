import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [dropdown, setdropdown] = useState([]);
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
        const leagues = response.data.response.map((league: { name: any; league: { id: any } }) => ({
          label: league.name,
          value: league.league.id
        }));
        setdropdown(leagues);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSelectChange = (selectedOption: React.SetStateAction<null>) => {
    setSelectedLeague(selectedOption);
  };

  return (
    <div>
      <Select
        options={dropdown}
        value={selectedLeague}
        onChange={handleSelectChange}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
