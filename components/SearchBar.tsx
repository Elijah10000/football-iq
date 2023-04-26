import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function SearchBar()  {
    const [selectedOption, setSelectedOption] = useState(null);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://api-football-v1.p.rapidapi.com/v3/players/squads',
            headers: {
                'x-rapidapi-key': '3e93f54308mshcc56d624809a4a9p144a30jsn829d33d2f0e4',
                'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
            }
        })
        .then(response => setData(response.data.response))
        .catch(error => setError(error));
    }, []);
  
    // Create options for React Select component
    const options = data.map(item => ({ value: item.position, label: item.position }));
  
    // Filter data based on selected option
    const filteredData = selectedOption ? data.filter(item => item.position === selectedOption.value) : data;
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
      <div>
        <Select options={options} value={selectedOption} onChange={setSelectedOption} />
        <PlayerList data={filteredData} />
      </div>
    );
}

export default SearchBar;
