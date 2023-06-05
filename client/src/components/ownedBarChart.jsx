import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OwnedBarChart = () => {
  const currentStockInfo = useSelector((state) => state.auth.currentStockInfo);
  const owned = useSelector((state) => state.auth.owned);
  let stocks = [];
  if (currentStockInfo) {
    stocks = currentStockInfo.filter((stock) => {
      return owned.find((stocktwo) => {
        return stock.symbol === stocktwo.name;
      });
    });
  }

  const labels = [];
  const values = [];
  stocks.map((stock, key) => {
    labels.push(owned[key].name);
    values.push(parseInt((stock.regularMarketPrice * owned[key].amount).toFixed(2)));
    console.log('amount ', owned[key].name);
    console.log('price ', stock.symbol);
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Market Value',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Value in US dollar',
        data: values,
        backgroundColor: 'rgba(52, 245, 49, 0.5)',
      },
    ],
  };

  return (
    <Box ml={5} minHeight={'300px'} maxHeight={'300px'} minWidth={'800px'}>
      <Bar options={options} data={data} />
    </Box>
  );
};

export default OwnedBarChart;
