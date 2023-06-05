import React, { useState, useEffect } from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Daily High vs Lows',
    },
  },
};

const labels = ["test"];
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


export default function StockChart({name, symbol, range}) {
    const [apiResult, setAPIResult] = useState();
    const chartApiURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo`;

    useEffect(() => {
      fetch(chartApiURL)
      .then(response => {return response.json()})
      .then(data => {
        setAPIResult(data);
        let labels = [];
        let highs = [];
        let lows = [];
        for (const [key, value] of Object.entries(data["Time Series (Daily)"])) {
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
      .catch(err => console.log('Error: ', err));
    },[]);

    return (<>{apiResult ? <Line options={options} data={lineData} /> : <h4>Loading...</h4>}</>);
}