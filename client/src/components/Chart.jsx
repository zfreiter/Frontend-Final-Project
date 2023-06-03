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
        text: 'Chart.js Line Chart',
      },
    },
  };


export default function StockChart({name, symbol, range}) {
    const chartApiURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo`;
    let apiOn = true;
    let labels = [];
    let chartDataHigh = [];
    let chartDataLow = [];
    const GetTimeSeriesData = async () => {
        const response = await fetch(chartApiURL);
        const data = await response.json();
        let test1 = await data['Time Series (Daily)'];
        console.log(test1);

        for (const [key, value] of Object.entries(test1)) {
            let highVal = value['2. high'];
            let lowVal = value['3. low'];

            // add label
            labels.push(key);

            // add low
            chartDataHigh.push(highVal);

            // add high
            chartDataLow.push(Number(lowVal));
        }        

        labels = labels.slice(0, range);
        chartDataHigh = chartDataHigh.slice(0, range);
        chartDataLow = chartDataLow.slice(0, range);
        console.log('');
    }

    GetTimeSeriesData();
        
    let lineData = {
        labels,
        datasets: [
            {
                label: 'Highs',
                data: chartDataHigh,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Lows',
                data: chartDataLow,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
       ],
    };

    console.log(lineData);
    return (
    <>
        <Line options={options} data={lineData} />
    </>
    );
}