import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Search from '../components/search';
import SimpleAccordion from '../components/owned';
import Stories from '../components/stories';
import OwnedBarChart from '../components/ownedBarChart';

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const groups = useSelector((state) => state.auth.groups);
  const owned = useSelector((state) => state.auth.owned);
  const currentStk = useSelector((state) => state.auth.currentStocks);
  const currentStockInfo = useSelector((state) => state.auth.currentStockInfo);
  const stkString = useSelector((state) => state.auth.stockString);
  //console.log('home groups ', owned);
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
        <SimpleAccordion title={'Stocks'} data={owned} type={0} />
        {groups.map((group, key) => (
          <SimpleAccordion key={key} title={`GROUP ${key + 1}`} data={group} type={1} />
        ))}
      </Box>
    </Box>
  );
}
