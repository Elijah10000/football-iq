import axios from "axios";
import type { AxiosResponse } from "axios";

async function getPlayersBySquadId(id: string): Promise<AxiosResponse<any>> {
    const response: AxiosResponse<any> = await axios.get(
        `https://api-football-v1.p.rapidapi.com/v3/players/squads`,
        {
            params: { team: '33' },
            headers: {
                'X-RapidAPI-Key': '3e93f54308mshcc56d624809a4a9p144a30jsn829d33d2f0e4',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        }
    );

    return response;
}

export const playersApi = {getPlayersBySquadId};


// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://api-football-v1.p.rapidapi.com/v3/players/squads',
//   params: {team: '33'},
//   headers: {
//     'X-RapidAPI-Key': '3e93f54308mshcc56d624809a4a9p144a30jsn829d33d2f0e4',
//     'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });