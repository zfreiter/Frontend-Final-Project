import { useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';

import { Box, Button, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { nyse } from '../stock_information/nyseData';
import { nasdaq } from '../stock_information/nasdaqData';
import { combineData } from '../stock_information/combineData';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Search = () => {
  const [value, setValue] = useState(combineData[0]);
  const [found, setFound] = useState();
  const [show, setShow] = useState(false);
  const apple = { date: new Date().toString(), stock: 'aapl', price: '175.19000' };
  const combine = nasdaq.concat(nyse);

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
        setValue(combineData[0]);
      } catch (error) {
        console.error('Error: ', error);
      }
    }
  };

  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 400,
  });

  return (
    <Box display={'flex'} flexDirection={'column'} m={'20px 20px'} gap={1}>
      <Box display={'flex'} flexWrap={'wrap'} gap={'5px'}>
        <Button variant='contained' onClick={handleSearch}>
          Search
        </Button>
        <Autocomplete
          filterOptions={filterOptions}
          size='small'
          autoHighlight
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          disablePortal
          id='stock-search-combo-box'
          options={combineData}
          sx={{ width: 300 }}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box {...props}>
              {option.label} ({option.name})
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label='NASDAQ/NYSE Stock Symbol' />}
        />
      </Box>
      {found && show && (
        <Box
          position={'relative'}
          width={'397.75px'}
          border={1}
          borderRadius={1}
          borderColor={'#C4C4C4'}
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
          <Box display={'flex'} mt={1}>
            <Button variant='contained' sx={{ mr: '10px', fontSize: '10px' }}>
              Add to Owned
            </Button>
            <Button variant='contained' sx={{ fontSize: '10px' }}>
              Add to Groups
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Search;