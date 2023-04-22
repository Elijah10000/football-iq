import axios from "axios";
import type { AxiosResponse } from "axios";

export interface TeamData {
        id: number;
        name: string;
        logo: string;
        fixtures: number;
        goals: number;
        biggest: number;
        clean_sheet: number;
        failed_to_score: number;
        penalty: number;
        lineups: number;
        cards: number;
}

async function getTeamStatisticsById(id: number): Promise<AxiosResponse<TeamData>> {
    const response: AxiosResponse<TeamData> = await axios.get(
        'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
        {
            params: { league: id, season: '2022', team: id },
            headers: {
                'X-RapidAPI-Key': '3e93f54308mshcc56d624809a4a9p144a30jsn829d33d2f0e4',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        }
    );
    return response;
}
export const teamStatisticsApi = { getTeamStatisticsById };