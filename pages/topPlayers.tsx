import { useGlobalContext } from 'contexts/GlobalContext';
import { topPlayersApi } from '../api/topPlayers';
import React, { useState, useEffect } from 'react';
import Hamburger from 'components/hamburgerBar'
import { PlayerNumber, PlayerAppearances, PlayerAssists, PlayerBio, PlayerGoals, PlayerImage, PlayerInfo, PlayerName, PlayerTeam, TopPlayersDiv, TopPlayersTitle, LogoDiv } from 'styles/topPlayers-style'

type TopStats = {
    player: {
        id: number;
        name: string;
        photo: string;
    };
    statistics: {
        team: {
            name: string;
        };
        games: {
            appearences: number;
        };
        goals: {
            total: number;
            assists: number;
        };
    };
}


interface MainProps {
    stats: TopStats[];
}

export default function MainProps({ stats }: MainProps) {
    const [playerStatsData, setPlayerStatsData] = useState<TopStats[]>();
    const { isDarkMode, setIsDarkMode } = useGlobalContext();

    useEffect(() => {
        const darkModeOn = localStorage.getItem("isDarkMode");
        if (darkModeOn === "true") {
            setIsDarkMode(true)
        } else {
            setIsDarkMode(false)

        }
    })

    const handlePlayerStats = async (leagueNumbers: string[]) => {
        try {
          const responses = await Promise.all(
            leagueNumbers.map((leagueNumber) =>
              topPlayersApi.getPlayerByTopStats(leagueNumber)
            )
          );
          const playerStatsData = responses.map((response) => response.data.response);
          setPlayerStatsData(playerStatsData.flat());
        } catch (error) {
          console.log(error);
        }
      };
      
      useEffect(() => {
        handlePlayerStats(["39", "140", "78", "135", "61", "2"]);
      }, []);
      

    return (
        <TopPlayersDiv isDarkMode={isDarkMode}>
            <Hamburger />

            <LogoDiv isDarkMode={isDarkMode}>
                <h1><a href="/" style={{ color: isDarkMode ? "white" : "black" }}>Football IQ 🧠</a></h1>
            </LogoDiv>

            <TopPlayersTitle isDarkMode={isDarkMode}>
                Top Players
            </TopPlayersTitle>
            {playerStatsData && playerStatsData.map((player: TopStats, index: number) => (
                <div key={player.player.id}>

                    <PlayerBio isDarkMode={isDarkMode}>
                        <PlayerNumber isDarkMode={isDarkMode}>
                            {index + 1 + "."}
                        </PlayerNumber>
                        <PlayerImage src={player.player.photo} alt="" />
                        <PlayerInfo isDarkMode={isDarkMode}>
                            <PlayerName isDarkMode={isDarkMode}>{player.player.name}</PlayerName>
                            <PlayerTeam isDarkMode={isDarkMode}>{player.statistics[0].team.name}</PlayerTeam>
                            <PlayerAppearances isDarkMode={isDarkMode}>
                                Appearances: {player.statistics[0].games.appearences}
                            </PlayerAppearances>
                            <PlayerGoals isDarkMode={isDarkMode}>
                                Goals: {player.statistics[0].goals.total}
                            </PlayerGoals>
                            <PlayerAssists isDarkMode={isDarkMode}>
                                Assists: {player.statistics[0].goals.assists}
                            </PlayerAssists>
                        </PlayerInfo>
                    </PlayerBio>
                </div>
            ))}

        </TopPlayersDiv>
    );
};

