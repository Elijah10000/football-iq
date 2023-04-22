import axios from "axios";
import type { AxiosResponse } from "axios";

export interface Team {
    logo: string | undefined;
    id: Key | null | undefined;
    name: ReactNode;
    team: {
        id: number;
        name: string;
        code: string;
        country: string;
        founded: number;
        national: boolean;
        logo: string;
    };
    venue: {
        id: number;
        name: string;
        address: string;
        city: string;
        capacity: number;
        surface: string;
        image: string;
    };
}

async function getTeamsByLeagueId(league: string): Promise<AxiosResponse<Team[]>> {
    const response: AxiosResponse<Team[]> = await axios.get(
        `https://api-football-v1.p.rapidapi.com/v3/teams/`,
        {
            params: { league: league.toString(), season: '2022' },

            headers: {
                'X-RapidAPI-Key': '3e93f54308mshcc56d624809a4a9p144a30jsn829d33d2f0e4',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        }
    );

    return response;
}

export const teamsApi = { getTeamsByLeagueId };