import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

const OwnedStocks = ({ title, data }) => {
  return (
    <Box sx={{ width: '400px', mb: 1 }}>
      <Accordion autoFocus sx={{ border: '1px solid #033922' }}>
        <AccordionSummary
          autoFocus
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          sx={{ backgroundColor: '#033922' }}
        >
          <Typography autoFocus sx={{ color: 'white', backgroundColor: '#033922' }}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: '1px solid green' }}>
          {data.map((stock, key) => (
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
                p={1}
                sx={{
                  width: '100%',
                  '&:hover': {
                    borderRadius: 1,
                    backgroundColor: '#f2f2f2',
                  },
                  '&:hover .MuiBox-root': {
                    color: 'gray',
                  },
                }}
              >
                <Typography fontSize={'10px'} fontWeight={'bold'}>
                  Stock: {stock.name}
                </Typography>
                <Typography fontSize={'10px'}>Amount: {stock.amount}</Typography>
              </Box>
              {/* <Box>
                <Typography fontSize={'10px'}>Current price</Typography>
                <Typography fontSize={'10px'}>Change</Typography>
              </Box> */}
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default OwnedStocks;
