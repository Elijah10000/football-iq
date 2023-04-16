import Chart from 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js';

const options: ChartOptions = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};

export async function fetchData() {
  const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/players');
  const data = await response.json();
  return data;
}

export async function createChart() {
  const data = await fetchData();
  const chartData = prepareData(data);

  const chart = new Chart('myChart', {
    type: 'line',
    data: chartData,
    options: options
  });
}

export function prepareData(data: any) {
  const chartData: ChartData = {
    labels: data.labels,
    datasets: [{
      label: 'Sales',
      data: data.sales,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return chartData;
}
