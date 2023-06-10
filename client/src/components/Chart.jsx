//react
import React, { useState, useEffect } from 'react';
//redux
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Daily High vs Low Price (USD)',
    },
  },
};

const labels = ['test'];
const d1 = [20];
const d2 = [5];

export const lineData = {
  labels,
  datasets: [
    {
      label: 'Highs',
      data: d1,
      borderColor: 'rgb(0, 115, 23)',
      backgroundColor: 'rgba(0, 74, 15)',
    },
    {
      label: 'Lows',
      data: d2,
      borderColor: 'rgb(145, 0, 31)',
      backgroundColor: 'rgba(94, 0, 20)',
    },
  ],
};

export default function StockChart({ name, symbol, range }) {
  const [apiResult, setAPIResult] = useState();
  const token = useSelector((state) => state.token);
  // const serverUrl = `${
  //   window.location.href.split('5173')[0]
  // }3001/alphaVantage/timeseries?ticker=${symbol}`;
  const serverUrl = `https://frontend-final-project-topaz.vercel.app/alphaVantage/timeseries?ticker=${symbol}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  chartOptions.plugins.title.text = `${symbol} Daily High vs Low Price (USD)`;

  useEffect(() => {
    fetch(serverUrl, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAPIResult(data);
        let labels = [];
        let highs = [];
        let lows = [];
        for (const [key, value] of Object.entries(data['Time Series (Daily)'])) {
          let highValue = value['2. high'];
          let lowValue = value['3. low'];

          labels.push(key);
          highs.push(Number(highValue));
          lows.push(Number(lowValue));
        }

        labels = labels.slice(0, range);
        highs = highs.slice(0, range);
        lows = lows.slice(0, range);

        lineData.labels = labels.reverse();
        lineData.datasets[0].data = highs.reverse();
        lineData.datasets[1].data = lows.reverse();
      })
      .catch((err) => console.log('Error: ', err));
  }, []);

  return <>{apiResult ? <Line options={chartOptions} data={lineData} /> : <h4>Loading...</h4>}</>;
}
