import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { getCurrentValue } from './utilityService';

const StockValue = () => {
  const owned = useSelector((state) => state.auth.owned);
  const currentStockInfo = useSelector((state) => state.auth.currentStockInfo);

  const stocks = getCurrentValue(currentStockInfo, owned);

  let regularMarketPreviousClose = 0;
  let regularMarketPrice = 0;
  owned.map((stock, key) => {
    regularMarketPreviousClose += stock.amount * stocks[key].regularMarketPreviousClose;
    regularMarketPrice += stock.amount * stocks[key].regularMarketPrice;
  });

  const percentChange = (
    ((regularMarketPreviousClose - regularMarketPrice) / regularMarketPreviousClose) *
    100
  ).toFixed(2);

  const priceDifference = (regularMarketPreviousClose - regularMarketPrice).toFixed(2);

  return (
    <Box
      display={'flex'}
      sx={{
        width: '434px',
        height: '48px',
        mb: 1,
        borderRadius: 1,
        boxShadow: 5,
      }}
    >
      <Typography autoFocus pl={'16px'} fontWeight={700} alignSelf={'center'}>
        Today ${regularMarketPrice.toLocaleString()}
      </Typography>
      <Typography
        pl={'16px'}
        fontWeight={700}
        alignSelf={'center'}
        color={regularMarketPrice - regularMarketPreviousClose > 0 ? 'green' : '#AB0227'}
      >
        {priceDifference}({percentChange}%)
      </Typography>
    </Box>
  );
};

export default StockValue;
