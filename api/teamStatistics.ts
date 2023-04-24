import axios from "axios";
import type { AxiosResponse } from "axios";
import type { TeamData } from "api/types/teamStatisticsTypes";

async function getTeamStatisticsById(team: string, league: string): Promise<AxiosResponse<any>> {
    const response: AxiosResponse<any> = await axios.get(
        'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
        {
            params: {
                league,
                season: '2022',
                team
            },
            headers: {
                'X-RapidAPI-Key': '3e93f54308mshcc56d624809a4a9p144a30jsn829d33d2f0e4',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        }
    );
    return response;
}
export const teamStatisticsApi = { getTeamStatisticsById };