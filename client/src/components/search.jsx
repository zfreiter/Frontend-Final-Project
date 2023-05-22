import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { nyse } from '../stock_information/nyseData';
import { nasdaq } from '../stock_information/nasdaqData';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Search = () => {
  const [value, setValue] = useState(nasdaq[0]);
  const [found, setFound] = useState();
  const [show, setShow] = useState(false);
  const apple = { date: new Date().toString(), stock: 'aapl', price: '175.19000' };

  console.log(value, found, show);
  const handleSearch = async () => {
    //setFound(apple);

    /* REALSTONK FOR ONE ITEM, BUT RETURNS THE WRONG INFOMATION AT TIMES */
    const url = `https://realstonks.p.rapidapi.com/${value.label}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5b832a5305msh1a5a25d45407de9p1eb957jsnda27c8afabda',
        'X-RapidAPI-Host': 'realstonks.p.rapidapi.com',
      },
    };

    // const urlQuote = `https://twelve-data1.p.rapidapi.com/quote?symbol=${search}&interval=1month&outputsize=30&format=json`;

    // const url = 'https://twelve-data1.p.rapidapi.com/stocks?exchange=NASDAQ&format=json';

    //const urlRealtime = `https://twelve-data1.p.rapidapi.com/price?symbol=${search}&format=json&outputsize=30`;

    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'X-RapidAPI-Key': '5b832a5305msh1a5a25d45407de9p1eb957jsnda27c8afabda',
    //     'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com',
    //   },
    // };
    if (value.label !== '') {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('result ', result);
        var today = new Date().toString();
        setFound((current) => ({ stock: value, price: result.price, date: today }));
        if (!show) {
          setShow((current) => !current);
        }
        setValue(nasdaq[0]);
      } catch (error) {
        console.error('Error: ', error);
      }
    }
  };

  return (
    <Box display={'flex'} flexDirection={'column'} m={'20px 20px'} gap={1}>
      <Box display={'flex'} flexWrap={'wrap'} gap={'5px'}>
        <Button variant='contained' onClick={handleSearch}>
          Search
        </Button>
        <Autocomplete
          size='small'
          autoHighlight
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          disablePortal
          id='stock-search-combo-box'
          options={nasdaq}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box {...props}>
              {option.label} ({option.name})
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label='NASDAQ Stock Symbol' />}
        />
      </Box>
      {found && show && (
        <Box
          position={'relative'}
          width={'397.75px'}
          border={1}
          borderRadius={2}
          borderColor={'#555555'}
          p={1}
        >
          <HighlightOffIcon
            color='#555555'
            sx={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              '&:hover': {
                color: '#555555',
              },
            }}
            onClick={() => setShow((current) => !current)}
          />
          <Typography fontWeight={'600'}>{found.stock.name}</Typography>
          <Typography fontWeight={'500'}>{found.stock.label}</Typography>
          <Typography fontWeight={'500'}>${found.price}</Typography>
          <Typography fontWeight={'500'} fontSize={'12px'}>
            {found.date}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Search;
