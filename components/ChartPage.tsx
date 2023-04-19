import { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

interface ChartData {
  label: string;
  value: number;
}

function ChartPage() {
  const [data, setData] = useState<ChartData[]>([]);
  const [chart, setChart] = useState<Chart | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/players', {
        headers: {
          'X-RapidAPI-Key': '3e93f54308mshcc56d624809a4a9p144a30jsn829d33d2f0e4',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
      });
      const data = await response.json();
      setData(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const chartObj = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: data.map((d) => d.label),
          datasets: [
            {
              label: 'Chart Data',
              data: data.map((d) => d.value),
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Chart Title',
            },
          },
        },
      });
      setChart(chartObj);
    }
  }, [chartRef, data]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
      {chart && <button onClick={() => chart.update()}>Update chart</button>}
    </div>
  );
}

export default ChartPage;
