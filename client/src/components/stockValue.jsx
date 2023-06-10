import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { getCurrentValue } from './utilityService';

const StockValue = () => {
  const owned = useSelector((state) => state.owned);
  const currentStockInfo = useSelector((state) => state.currentStockInfo);

  const stocks = getCurrentValue(currentStockInfo, owned);

  let regularMarketPreviousClose = 0;
  let regularMarketPrice = 0;
  owned.map((stock, key) => {
    regularMarketPreviousClose += stock.amount * stocks[key]?.regularMarketPreviousClose;
    regularMarketPrice += stock.amount * stocks[key]?.regularMarketPrice;
  });

  const percentChange = (
    ((regularMarketPrice - regularMarketPreviousClose) / regularMarketPreviousClose) *
    100
  ).toFixed(2);
  const priceDifference = (regularMarketPrice - regularMarketPreviousClose).toFixed(2);

  return currentStockInfo.length > 0 ? (
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
      <Typography
        autoFocus
        pl={'16px'}
        fontSize={18}
        fontWeight={600}
        fontFamily={'Roboto'}
        alignSelf={'center'}
      >
        Today ${regularMarketPrice.toLocaleString()}
      </Typography>
      <Typography
        pl={'16px'}
        fontSize={18}
        fontWeight={600}
        fontFamily={'Roboto'}
        alignSelf={'center'}
        color={priceDifference >= 0 ? 'green' : '#AB0227'}
      >
        {priceDifference}({percentChange}%)
      </Typography>
    </Box>
  ) : (
    <Typography>Loading... or API is down</Typography>
  );
};

export default StockValue;
