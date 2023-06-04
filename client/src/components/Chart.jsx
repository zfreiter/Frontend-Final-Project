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
    maintainAspectRatio: true
  };


export default function StockChart({name, symbol, range}) {
    const [allData, setallData] = useState(null);
    const [label, setLabels] = useState(null);
    const [highs, setHighs] = useState(null);
    const [lows, setLows] = useState(null);

    const chartApiURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo`;
    let apiOn = true;
    const labels = [];
    let chartDataHigh = [];
    let chartDataLow = [];

    const GetTimeSeriesData = async (labels, chartDataHigh, chartDataLow) => {
        try {
        const response = await fetch(chartApiURL);
        const data = await response.json();
        let test1 = await data['Time Series (Daily)'];
        console.log('Timer Series data', test1);

        for (const [key, value] of Object.entries(test1)) {
            let highVal = value['2. high'];
            let lowVal = value['3. low'];

            // add label
            labels.push(key);
            
            // add low
            chartDataHigh.push(highVal);
            
            // add high
            chartDataLow.push(lowVal);
        }        

        labels = labels.slice(0, range);
        
        chartDataHigh = chartDataHigh.slice(0, range);
        
        chartDataLow = chartDataLow.slice(0, range);

        setHighs(chartDataHigh);
        setLabels(labels);
        setLows(chartDataLow);
        setallData(test1);
        }
        catch (err) {
            console.log('Error', err);
        }
    }

    useEffect(() => {
        GetTimeSeriesData(labels, chartDataHigh, chartDataLow);
    }, []);

        
    console.log('Chart Data high after use efffect', chartDataHigh);


    let lineData = {
        label,
        datasets: [
            {
                label: 'Highs',
                data: highs,
                borderColor: 'rgb(0, 0, 0)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Lows',
                data: lows,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
       ],
    };

    console.log('chart data before chart render', allData);
    console.log('labels before chart render', label);
    console.log('line data chart render', lineData);
    return (
    <>
        {<Line options={options} data={lineData} />}
    </>
    );
}