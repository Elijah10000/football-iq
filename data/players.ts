export type Players = {
  name: string;
  age: number;
  photo: string;
};

export type PlayerStatistics = {
  team: {
    name: string;
  };
  league: {
    name: string;
  };
  games: {
    appearences: number;
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
  { id: 2986, name: "É. Mendy", label: "É. Mendy", value: "É. Mendy" },
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
  { id: 2288, name: "M. Mount", label: "M. Mount", value: "M. Mount" },
  { id: 2289, name: "K. Havertz", label: "K. Havertz", value: "K. Havertz" },
  { id: 283, name: "T. Alexander-Arnold", label: "T. Alexander-Arnold", value: "T. Alexander-Arnold" },
  { id: 290, name: "V. Van Dijk", label: "V. Van Dijk", value: "V. Van Dijk" },
  { id: 280, name: "Alisson", label: "Alisson", value: "Alisson" },
  { id: 306, name: "Mohamed Salah", label: "Mohamed Salah", value: "Mohamed Salah" },
  { id: 154, name: "L. Messi", label: "L. Messi", value: "L. Messi" },
  { id: 278, name: "K. Mbappé", label: "K. Mbappé", value: "K. Mbappé" },
  { id: 276, name: "Neymar", label: "Neymar", value: "Neymar" },
  { id: 521, name: "R. Lewandowski", label: "R. Lewandowski", value: "R. Lewandowski" },
  { id: 730, name: "T. Courtois", label: "T. Courtois", value: "T. Courtois" },
  { id: 759, name: "K. Benzema", label: "K. Benzema", value: "K. Benzema" },
  { id: 2296, name: "E. Hazard", label: "E. Hazard", value: "E. Hazard" },
  { id: 762, name: "Vinícius Júnior", label: "Vinícius Júnior", value: "Vinícius Júnior" },
  { id: 129718, name: "J. Bellingham", label: "J. Bellingham", value: "J. Bellingham" },
  { id: 22236, name: "Rafael Leão", label: "Rafael Leão", value: "Rafael Leão" },
  { id: 2295, name: "O. Giroud", label: "O. Giroud", value: "O. Giroud" },
  { id: 2780, name: "V. Osimhen", label: "V. Osimhen", value: "V. Osimhen" },
  { id: 483, name: "K. Kvaratskhelia", label: "K. Kvaratskhelia", value: "K. Kvaratskhelia" },
  { id: 907, name: "R. Lukaku", label: "R. Lukaku", value: "R. Lukaku" },
]

export { players }