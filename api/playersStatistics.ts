import axios from "axios";
import type { AxiosResponse } from "axios";

async function getStatisticsByTeamId(teamId: string, season: string, leagueIds: number[]): Promise<AxiosResponse<any>> {
    const response: AxiosResponse<any> = await axios.get(
        `https://api-football-v1.p.rapidapi.com/v3/players`,
        {
            params: {
                team: teamId,
                season: "2022",
                league: leagueIds.join(','),
            },
            headers: {
                'X-RapidAPI-Key': '3e93f54308mshcc56d624809a4a9p144a30jsn829d33d2f0e4',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        }
    );

    return response;
}

export const playersStatisticsApi = { getStatisticsByTeamId };