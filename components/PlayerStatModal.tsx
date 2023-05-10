import { useGlobalContext } from 'contexts/GlobalContext';
import { ModalComponent } from 'components/Modal'
import { ChartContainer, PlayerBio, PlayerContainer } from 'styles/index'
import { List, Bio } from 'styles/modal-stats-style'
import ChartPage from 'components/ChartPage';
import { PlayerData } from 'pages/index'

type PlayerStatModalProps = {
    clickedPlayerId: string;
    playerData: PlayerData[];
}

const PlayerStatModal = ({ playerData }: PlayerStatModalProps) => {
    const { isDarkMode } = useGlobalContext();


    return (
        <ModalComponent isDarkMode={isDarkMode} isOpen={isPlayerStatModalOpen} onRequestClose={() => setIsPlayerStatModalOpen(false)}>

            {playerData && playerData.map((player, index) => (
                <Bio key={index}>

                    <PlayerContainer>

                        <PlayerBio>
                            <h1>{player.player.name}</h1>
                            <img src={player.player.photo} />
                            <ul>
                                <li><b>Age:</b> {player.player.age}</li>
                                <li><b>Nationality:</b> {player.player.nationality}</li>
                                <li><b>Team:</b> {player.statistics[0].team.name}</li>
                                <li><b>Height:</b> {player.player.height}</li>
                                <li><b>Weight:</b> {player.player.weight}</li>
                                <li><b>Position:</b> {player.statistics[0].games.position}</li>
                            </ul>
                        </PlayerBio>

                        <ChartContainer>
                            <h1>Key Statistics (All Comps) </h1>
                            <ChartPage playerId={player.player.id} />
                        </ChartContainer>

                    </PlayerContainer>

                    <ul>
                        <h1>Statistics:</h1>
                        {player.statistics.map((team, index) => (
                            <List key={index}>
                                <p><b>Team:</b> {team.team.name}</p>
                                <p><b>Competition:</b> {team.league.name}</p>
                                <p><b>Position:</b> {team.games.position}</p>
                                <p><b>Rating:</b> {team.games.rating}</p>
                                <p><b>Games:</b> {team.games.appearances}</p>
                                <p><b>Minutes:</b> {team.games.minutes}</p>
                                <p><b>Goals:</b> {team.goals.total}</p>
                                <p><b>Assists:</b> {team.goals.assists}</p>
                                <p><b>Shots:</b> {team.shots.total}</p>
                                <p><b>Shots on target:</b> {team.shots.on}</p>
                                <p><b>Passes:</b> {team.passes.total}</p>
                                <p><b>Passing accuracy:</b> {team.passes.accuracy}</p>
                                <p><b>Tackles:</b> {team.tackles.total}</p>
                                <p><b>Blocks:</b> {team.tackles.blocks}</p>
                                <p><b>Interceptions:</b> {team.tackles.interceptions}</p>
                                <p><b>Duels:</b> {team.duels.total}</p>
                                <p><b>Duels won:</b> {team.duels.won}</p>
                                <p><b>Yellow cards:</b> {team.cards.yellow}</p>
                                <p><b>Red cards:</b> {team.cards.red}</p>
                                <p><b>Substitutes in:</b> {team.substitutes.in}</p>
                                <p><b>Substitutes out:</b> {team.substitutes.out}</p>
                                <p><b>Substitutes bench:</b> {team.substitutes.bench}</p>
                                <p><b>Penalties scored:</b> {team.penalty.scored}</p>
                                <p><b>Penalties missed:</b> {team.penalty.missed}</p>
                                <p><b>Penalties saved:</b> {team.penalty.saved}</p>
                                <p><b>Penalties conceded:</b> {team.penalty.conceded}</p>
                                <p><b>Penalties won:</b> {team.penalty.won}</p>
                                <p><b>Penalties committed:</b> {team.penalty.committed}</p>
                                <p><b>Penalties success:</b> {team.penalty.success}</p>
                                <p><b></b> {team.fouls.drawn}</p>
                                <p><b>Fouls suffered:</b> {team.fouls.committed}</p>
                            </List>
                        ))}
                    </ul>
                </Bio>
            ))}

            {!playerData && (
                <h1>Loading...</h1>
            )}
        </ModalComponent>
    )
}

export default PlayerStatModal