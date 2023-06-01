import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Search from '../components/search';
import SimpleAccordion from '../components/owned';

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const groups = useSelector((state) => state.auth.groups);
  const owned = useSelector((state) => state.auth.owned);

  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Search />
      <Box display={'flex'} flexDirection={'column'} m={3}>
        <SimpleAccordion title={'Owned Stocks'} data={user?.stocksOwned} />
        {user?.stockGroups.map((group, key) => (
          <SimpleAccordion key={key} title={`GROUP ${key + 1}`} data={group} />
        ))}
      </Box>
    </Box>
  );
}
