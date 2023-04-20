import { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import { playersStatisticsApi } from 'api/playersStatistics';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { PlayerData } from 'pages/index';
import { combinePlayerCompetitionData } from 'helpers/formatting';

ChartJS.register(ArcElement, Tooltip, Legend);
interface ChartData {
  label: string;
  value: number;
}

interface PlayerChartData {
  goals: number;
  fouls: number;
  shots: number;
  dribbles: number;
  bookings: number;
  sentOff: number;
}

interface ChartPageInterface {
  playerId: number
}

function ChartPage({ playerId }: ChartPageInterface) {
  const [playerData, setPlayerData] = useState<PlayerChartData | null>(null);
  const chartData = {
    labels: ['Goals', 'Fouls', 'Shots', 'Dribbles', 'Yellows', 'Reds'],
    datasets: [
      {
        label: ' ',
        data: playerData ? [playerData.goals, playerData.fouls, playerData.shots, playerData.dribbles, playerData.bookings, playerData.sentOff] : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    async function fetchData() {
      const { data } = await playersStatisticsApi.getDataByPlayerId(playerId.toString());
      setPlayerData(combinePlayerCompetitionData(data.response[0]));
    }

    fetchData();
  }, [playerId]);

  console.log(chartData)
  return (
    <div>
      <Doughnut data={chartData}/>
    </div>
  );
}
export default ChartPage;