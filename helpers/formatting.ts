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
    total: number;
    on: number;
}

interface CardsData {
    yellow: number;
    yellowred: number;
    red: number;
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
    past: number;
}

interface FoulsData {
    drawn: number;
    committed: number;
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
};

function combinePlayerCompetitionData(players: PlayerData) {
    let data = {};
    console.log(players);
    const { statistics } = players;

    const goals = statistics.map(statistic => statistic.goals);
    const fouls = statistics.map(statistic => statistic.fouls);
    const shots = statistics.map(statistic => statistic.shots);
    const dribbles = statistics.map(statistic => statistic.dribbles);
    const cards = statistics.map(statistic => statistic.cards);
    const passes = statistics.map(statistic => statistic.passes);
    const tackles = statistics.map(statistic => statistic.tackles);
    const duels = statistics.map(statistic => statistic.duels);
    const substitutes = statistics.map(statistic => statistic.substitutes);

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
            total: (accumulator.total ?? 0) + (currentValue.total ?? 0),
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

    const passesTotal = passes.reduce((accumulator, currentValue) => {
        return {
            total: accumulator.total + currentValue.total,
            key: (accumulator.key ?? 0) + (currentValue.key ?? 0),
            accuracy: (accumulator.accuracy ?? 0) + (currentValue.accuracy ?? 0),
        };
    });

    const tacklesTotal = tackles.reduce((accumulator, currentValue) => {
        return {
            total: accumulator.total + currentValue.total,
            blocks: (accumulator.blocks ?? 0) + (currentValue.blocks ?? 0),
            interceptions: (accumulator.interceptions ?? 0) + (currentValue.interceptions ?? 0),
        };
    });

    const duelsTotal = duels.reduce((accumulator, currentValue) => {
        return {
            won: (accumulator.won ?? 0) + (currentValue.won ?? 0),
            total: (accumulator.total ?? 0) + (currentValue.total ?? 0),
        };
    });

    const cardsTotal = cards.reduce((accumulator, currentValue) => {
        return {
            yellow: (accumulator.yellow ?? 0) + (currentValue.yellow ?? 0),
            yellowred: (accumulator.yellowred ?? 0) + (currentValue.yellowred ?? 0),
            red: (accumulator.red ?? 0) + (currentValue.red ?? 0),
        };
    });

    const substitutesTotal = substitutes.reduce((accumulator, currentValue) => {
        return {
            bench: (accumulator.bench ?? 0) + (currentValue.bench ?? 0),
            in: (accumulator.in ?? 0) + (currentValue.in ?? 0),
            out: (accumulator.out ?? 0) + (currentValue.out ?? 0),
        };
    });

    data =
    {
        goals: goalsTotal.total ?? 0,
        fouls: foulsTotal.committed ?? 0,
        shots: shotsTotal.on ?? 0,
        dribbles: dribblesTotal.success ?? 0,
        cards: cardsTotal.yellow ?? 0,
        passes: passesTotal.key ?? 0,
        tackles: tacklesTotal.total ?? 0,
        duels: duelsTotal.won ?? 0,
        substitutes: substitutesTotal.in ?? 0,
    };

    return data;
};
export { combinePlayerCompetitionData };
