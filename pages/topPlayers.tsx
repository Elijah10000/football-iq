import { useGlobalContext } from 'contexts/GlobalContext';
import { topPlayersApi } from '../api/topPlayers';
import React, { useState, useEffect } from 'react';
import Hamburger from 'components/hamburgerBar'
import { PlayerNumber, PlayerAppearances, PlayerAssists, PlayerBio, PlayerGoals, PlayerImage, PlayerInfo, PlayerName, PlayerTeam, TopPlayersDiv, TopPlayersTitle, LogoDiv, LeagueOptionButton, LeagueOptionsContainer } from 'styles/topPlayers-style'

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
    const [activeLeague, setActiveLeague] = useState<TopStats[]>();
    const { isDarkMode, setIsDarkMode } = useGlobalContext();
    const [selectedLeague, setSelectedLeague] = useState('39');

    useEffect(() => {
        const darkModeOn = localStorage.getItem("isDarkMode");
        if (darkModeOn === "true") {
            setIsDarkMode(true)
        } else {
            setIsDarkMode(false)

        }
    })

    const handlePlayerStats = async (leagueNumber) => {
        setActiveLeague(leagueNumber);
        setSelectedLeague(leagueNumber);

        try {
            const response = await topPlayersApi.getPlayerByTopStats(leagueNumber);
            const playerStatsData = response.data.response;
            setPlayerStatsData(playerStatsData);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handlePlayerStats("39");
    }, []);

    return (
        <TopPlayersDiv isDarkMode={isDarkMode}>
            <Hamburger />
            <LogoDiv isDarkMode={isDarkMode}>
                <h1>
                    <a href="/" style={{ color: isDarkMode ? "white" : "black" }}>
                        Football IQ 🧠
                    </a>
                </h1>
            </LogoDiv>
            <TopPlayersTitle isDarkMode={isDarkMode}>
                Top Players
                <LeagueOptionsContainer>
                    <LeagueOptionButton isDarkMode={isDarkMode} isSelected={selectedLeague === '39'} onClick={() => handlePlayerStats("39")} className={activeLeague === "39" ? "active" : ""} >Premier League</LeagueOptionButton>
                    <LeagueOptionButton isDarkMode={isDarkMode} isSelected={selectedLeague === '140'} onClick={() => handlePlayerStats("140")}>La Liga</LeagueOptionButton>
                    <LeagueOptionButton isDarkMode={isDarkMode} isSelected={selectedLeague === '78'} onClick={() => handlePlayerStats("78")}>Bundesliga</LeagueOptionButton>
                    <LeagueOptionButton isDarkMode={isDarkMode} isSelected={selectedLeague === '135'} onClick={() => handlePlayerStats("135")}>Serie A</LeagueOptionButton>
                    <LeagueOptionButton isDarkMode={isDarkMode} isSelected={selectedLeague === '61'} onClick={() => handlePlayerStats("61")}>Ligue 1</LeagueOptionButton>
                    <LeagueOptionButton isDarkMode={isDarkMode} isSelected={selectedLeague === '2'} onClick={() => handlePlayerStats("2")}>UCL</LeagueOptionButton>
                </LeagueOptionsContainer>
            </TopPlayersTitle>

            {playerStatsData &&
                playerStatsData.map((player: TopStats, index: number) => (
                    <div key={player.player.id}>
                        <PlayerBio isDarkMode={isDarkMode}>
                            <PlayerNumber isDarkMode={isDarkMode}>{index + 1 + "."}</PlayerNumber>
                            <PlayerImage src={player.player.photo} alt="" />
                            <PlayerInfo isDarkMode={isDarkMode}>
                                <PlayerName isDarkMode={isDarkMode}>{player.player.name}</PlayerName>
                                <PlayerTeam isDarkMode={isDarkMode}>{player.statistics[0].team.name}</PlayerTeam>
                                <PlayerAppearances isDarkMode={isDarkMode}>
                                    Appearances: {player.statistics[0].games.appearences}
                                </PlayerAppearances>
                                <PlayerGoals isDarkMode={isDarkMode}>Goals: {player.statistics[0].goals.total}</PlayerGoals>
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