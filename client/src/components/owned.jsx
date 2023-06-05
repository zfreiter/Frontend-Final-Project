import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

const OwnedStocks = ({ title, data, type }) => {
  const currentStockInfo = useSelector((state) => state.auth.currentStockInfo);

  let stocks = [];
  if (currentStockInfo) {
    stocks = currentStockInfo.filter((stock) => {
      return data.find((stocktwo) => {
        return stock.symbol === stocktwo.name;
      });
    });
  }
  console.log(stocks);
  return (
    <Box sx={{ width: '400px', mb: 1 }}>
      <Accordion autoFocus sx={{ border: 1 }}>
        <AccordionSummary
          autoFocus
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          sx={{ '&:hover': { backgroundColor: '#c4c0c0' } }}
        >
          <Typography autoFocus sx={{ color: 'green' }} fontWeight={700}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{}}>
          {stocks.map((stock, key) => (
            <Box
              key={key}
              display={'flex'}
              flexWrap={'wrap'}
              border={1}
              width={'100%'}
              my={1}
              borderRadius={1}
              justifyContent={'space-between'}
              backgroundColor={'white'}
            >
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                p={1}
                sx={{
                  width: '100%',
                  '&:hover': {
                    borderRadius: 1,
                    backgroundColor: '#e6e3e3',
                  },
                  '&:hover .MuiBox-root': {},
                }}
              >
                <Box>
                  <Typography fontSize={'10px'} fontWeight={'bold'}>
                    {stock.symbol}
                  </Typography>
                  <Typography fontSize={'10px'} fontWeight={'bold'}>
                    {stock.shortName}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontSize={'10px'} textAlign={'right'}>
                    ${stock.regularMarketPrice}
                  </Typography>
                  {type === 0 && (
                    <Typography fontSize={'10px'} textAlign={'right'} sx={{ whiteSpace: 'nowrap' }}>
                      {data[key].amount} Shares
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default OwnedStocks;
