import { Box } from '@mui/material';
import Search from '../components/search';
import SimpleAccordion from '../components/owned';

export default function Home() {
  const ownedData = [
    { name: 'AAPL', amount: 18.5 },
    { name: 'AMZN', amount: 6 },
    { name: 'GE', amount: 35 },
  ];

  const groupData = [
    [{ name: 'AAPL' }, { name: 'AMZN' }, { name: 'GE' }],
    [{ name: 'COST' }, { name: 'DIS' }],
    [{ name: 'TSLA' }, { name: 'NFLX' }, { name: 'GME' }, { name: 'META' }, { name: 'BB' }],
  ];

  const getStocks = [];
  ownedData.map((stock) => {
    getStocks.push(stock.name);
  });
  groupData.map((stock) => {
    stock.map((stock) => {
      getStocks.push(stock.name);
    });
  });

  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Search />
      <Box display={'flex'} flexDirection={'column'} m={3}>
        <SimpleAccordion title={'Owned Stocks'} data={ownedData} />
        {groupData.map((group, key) => (
          <SimpleAccordion key={key} title={`GROUP ${key + 1}`} data={group} />
        ))}
      </Box>
    </Box>
  );
}
