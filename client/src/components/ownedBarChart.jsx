import Card from '@mui/material/Card';
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

// Used the basic outline shown in the documentation and modified it.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OwnedBarChart = () => {
  const currentStockInfo = useSelector((state) => state.currentStockInfo);
  const owned = useSelector((state) => state.owned);
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
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Market Value',
      },
    },

    maintainAspectRatio: false,
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
    <Card
      elevation={5}
      sx={{
        p: 2,
        ml: '46px',
        height: '310px',
        width: '920px',
      }}
    >
      <Bar options={options} data={data} />
    </Card>
  );
};

export default OwnedBarChart;
