export type Players = {
    name: string;
    id: number;
    age: number;
    photo: string;
  };
  
  export type PlayerStatistics = {
    team: {
      id: number;
      name: string;
    };
    league: {
      id: number;
      name: string;
    };
    games: {
      appearences: number;
      lineups: number;
      minutes: number;
      number: number;
    };
    goals: {
      total: number;
      conceded: number;
      assists: number;
      saves: number;
    };
    cards: {
      yellow: number;
      red: number;
    };
};

const players: Player[] = [
    { id: 2273, name: "Kepa", label: "Kepa", value: "Kepa" },
    { id: 19012, name: "M. Bettinelli", label: "M. Bettinelli", value: "M. Bettinelli" },
    { id: 2986, name: "É. Mendy", label: "É. Mendy", value: "É. Mendy" },
    { id: 152955, name: "L. Bergström", label: "L. Bergström", value: "L. Bergström" },
    { id: 64167, name: "G. Słonina", label: "G. Słonina", value: "G. Słonina" },
    { id: 95, name: "B. Badiashile", label: "B. Badiashile", value: "B. Badiashile" },
    { id: 259, name: "Thiago Silva", label: "Thiago Silva", value: "Thiago Silva" },
    { id: 19720, name: "T. Chalobah", label: "T. Chalobah", value: "T. Chalobah" },
    { id: 2933, name: "B. Chilwell", label: "B. Chilwell", value: "B. Chilwell" },
    { id: 19545, name: "R. James", label: "R. James", value: "R. James" },
    { id: 318, name: "K. Koulibaly", label: "K. Koulibaly", value: "K. Koulibaly" },
    { id: 2280, name: "César Azpilicueta", label: "César Azpilicueta", value: "César Azpilicueta" },
    { id: 47380, name: "Marc Cucurella", label: "Marc Cucurella", value: "Marc Cucurella" },
    { id: 22094, name: "W. Fofana", label: "W. Fofana", value: "W. Fofana" },
    { id: 5996, name: "E. Fernández", label: "E. Fernández", value: "E. Fernández" },
    { id: 2290, name: "N. Kanté", label: "N. Kanté", value: "N. Kanté" },
    { id: 2291, name: "M. Kovačić", label: "M. Kovačić", value: "M. Kovačić" },
    { id: 17, name: "C. Pulišić", label: "C. Pulišić", value: "C. Pulišić" },
    { id: 1631, name: "H. Ziyech", label: "H. Ziyech", value: "H. Ziyech" },
    { id: 2287, name: "Jorginho", label: "Jorginho", value: "Jorginho" },
]

export { players }