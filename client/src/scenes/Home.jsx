import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Search from '../components/search';
import SimpleAccordion from '../components/owned';
import Stories from '../components/stories';
import OwnedBarChart from '../components/ownedBarChart';
import StockValue from '../components/stockValue';

export default function Home() {
  const groups = useSelector((state) => state.auth.groups);
  const owned = useSelector((state) => state.auth.owned);

  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Box display={'flex'} flexDirection={'column'} m={3}>
        <Box display={'flex'} flexWrap={'wrap'}>
          <Search />
          <OwnedBarChart />
        </Box>
        <Stories />
      </Box>
      <Box display={'flex'} flexDirection={'column'} m={3}>
        <StockValue />
        <SimpleAccordion title={'Stocks'} data={owned} type={0} />
        {groups.map((group, key) => (
          <SimpleAccordion key={key} title={`GROUP ${key + 1}`} data={group} type={1} />
        ))}
      </Box>
    </Box>
  );
}
