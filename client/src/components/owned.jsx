import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
const OwnedStocks = ({ title, data }) => {
  return (
    <Box sx={{ width: '400px', mb: 1 }}>
      <Accordion sx={{ border: '1px solid #033922' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          sx={{ backgroundColor: '#033922' }}
        >
          <Typography sx={{ color: 'white', backgroundColor: '#033922' }}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: '1px solid green' }}>
          {data.map((stock, key) => (
            <Box
              key={key}
              display={'flex'}
              flexWrap={'wrap'}
              border={1}
              width={'100%'}
              p={1}
              my={1}
              borderRadius={1}
              justifyContent={'space-between'}
              backgroundColor={'white'}
            >
              <Box>
                <Typography fontSize={'10px'} fontWeight={'bold'} m={0} p={0}>
                  Stock: {stock.name}
                </Typography>
                <Typography fontSize={'10px'}>Amount: {stock.amount}</Typography>
              </Box>
              <Box>
                <Typography fontSize={'10px'}>Current price</Typography>
                <Typography fontSize={'10px'}>Change</Typography>
              </Box>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default OwnedStocks;
