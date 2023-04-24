interface TeamData {
    league: League;
    team: Team;
    form?: any;
    fixtures: Fixtures;
    goals: Goals;
    biggest: Biggest;
    clean_sheet: Played;
    failed_to_score: Played;
    penalty: Penalty;
    lineups: any[];
    cards: Cards;
}

interface Cards {
    yellow: Minute;
    red: Minute;
}

interface Penalty {
    scored: Scored;
    missed: Scored;
    total: number;
}

interface Scored {
    total: number;
    percentage: string;
}

interface Biggest {
    streak: Streak;
    wins: Wins;
    loses: Wins;
    goals: Goals2;
}

interface Goals2 {
    for: For2;
    against: For2;
}

interface For2 {
    home: number;
    away: number;
}

interface Wins {
    home?: any;
    away?: any;
}

interface Streak {
    wins: number;
    draws: number;
    loses: number;
}

interface Goals {
    for: For;
    against: For;
}

interface For {
    total: Played;
    average: Average;
    minute: Minute;
}

interface Minute {
    '0-15': _015;
    '16-30': _015;
    '31-45': _015;
    '46-60': _015;
    '61-75': _015;
    '76-90': _015;
    '91-105': _015;
    '106-120': _015;
}

interface _015 {
    total?: any;
    percentage?: any;
}

interface Average {
    home: string;
    away: string;
    total: string;
}

interface Fixtures {
    played: Played;
    wins: Played;
    draws: Played;
    loses: Played;
}

interface Played {
    home: number;
    away: number;
    total: number;
}

interface Team {
    id: number;
    name: string;
    logo: string;
}

interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag?: any;
    season: number;
}

export type { TeamData };