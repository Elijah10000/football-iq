import { Statistics } from "styles";

type PlayerData = {
    player: {
        id: number;
        name: string;
        age: number;
        photo: string;
    };
    statistics: Statistics[];
}

interface TeamData {
    id: number;
    name: string;
    logo: string;
}

interface LeagueData {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
    season: number;
}

interface GamesData {
    appearences: number;
    lineups: number;
    minutes: number;
    number: number | null;
    position: string;
    rating: string | null;
    captain: boolean;
}

interface SubstitutesData {
    in: number;
    out: number;
    bench: number;
}

interface ShotsData {
    total: number | null;
    on: number;
}

interface GoalsData {
    total: number;
    conceded: number;
    assists: number;
    saves: number | null;
}

interface PassesData {
    total: number;
    key: number;
    accuracy: number;
}

interface TacklesData {
    total: number;
    blocks: number | null;
    interceptions: number;
}

interface DuelsData {
    total: number;
    won: number;
}

interface DribblesData {
    attempts: number;
    success: number;
    past: number | null;
}

interface FoulsData {
    drawn: number;
    committed: number;
}

interface CardsData {
    yellow: number;
    yellowred: number;
    red: number;
}

interface PenaltyData {
    won: number | null;
    commited: number | null;
    scored: number;
    missed: number;
    saved: number | null;
}

interface Statistics {
    team: TeamData;
    league: LeagueData;
    games: GamesData;
    substitutes: SubstitutesData;
    shots: ShotsData;
    goals: GoalsData;
    passes: PassesData;
    tackles: TacklesData;
    duels: DuelsData;
    dribbles: DribblesData;
    fouls: FoulsData;
    cards: CardsData;
    penalty: PenaltyData;
}

function combinePlayerCompetitionData(players: PlayerData) {
    console.log(players);
    const { statistics } = players;

    const goals = statistics.map(statistic => statistic.goals);
    const fouls = statistics.map(statistic => statistic.fouls);
    const shots = statistics.map(statistic => statistic.shots);
    const dribbles = statistics.map(statistic => statistic.dribbles);
    const cards = statistics.map(statistic => statistic.cards);
    const appearences = statistics.map(statistic => statistic.team);


    const goalsTotal = goals.reduce((accumulator, currentValue) => {
        return {
            total: accumulator.total + currentValue.total,
            conceded: (accumulator.conceded ?? 0) + (currentValue.conceded ?? 0),
            assists: (accumulator.assists ?? 0) + (currentValue.assists ?? 0),
            saves: (accumulator.saves ?? 0) + (currentValue.saves ?? 0)
        };
    });

    const foulsTotal = fouls.reduce((accumulator, currentValue) => {
        return {
            drawn: accumulator.drawn + currentValue.drawn,
            committed: (accumulator.committed ?? 0) + (currentValue.committed ?? 0),
        };
    });

    const shotsTotal = shots.reduce((accumulator, currentValue) => {
        return {
            total: accumulator.total ?? 0 + (currentValue.total ?? 0),
            on: (accumulator.on ?? 0) + (currentValue.on ?? 0),
        };
    });

    const dribblesTotal = dribbles.reduce((accumulator, currentValue) => {
        return {
            attempts: accumulator.attempts + currentValue.attempts,
            success: (accumulator.success ?? 0) + (currentValue.success ?? 0),
            past: (accumulator.past ?? 0) + (currentValue.past ?? 0),
        };
    });

    const cardsTotal = cards.reduce((accumulator, currentValue) => {
        return {
            yellow: accumulator.yellow + currentValue.yellow,
            yellowred: (accumulator.yellowred ?? 0) + (currentValue.yellowred ?? 0),
            red: (accumulator.red ?? 0) + (currentValue.red ?? 0),
        };
    });

    const appearencesTotal = appearences.reduce((accumulator, currentValue) => {
        return {
            appearences: accumulator.appearences + currentValue.appearences,
            lineups: (accumulator.lineups ?? 0) + (currentValue.lineups ?? 0),
        };
    });

    const data =
    {
        goals: goalsTotal.total ?? 0,
        fouls: foulsTotal.committed ?? 0,
        shots: shotsTotal.total ?? 0,
        dribbles: dribblesTotal.success ?? 0,
        bookings: cardsTotal.yellow ?? 0,
        sentOff: cardsTotal.red ?? 0,
    }

    return data;


}

export { combinePlayerCompetitionData }