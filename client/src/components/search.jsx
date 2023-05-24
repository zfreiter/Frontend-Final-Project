import { useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box, Button, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { combineData } from '../stock_information/combineData';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const Search = () => {
  const [value, setValue] = useState(combineData[0]);
  const [found, setFound] = useState();
  const [show, setShow] = useState(false);
  const [openOwned, setOpenOwned] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const [owned, setOwned] = useState(0);
  const [group, setGroup] = useState('');

  /**
   * Function searches for an individual Stock
   */
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
        setFound((current) => ({
          stock: value,
          price: result.price,
          changePercentage: result.change_percentage,
          changePoint: result.change_point,
          totalVol: result.total_vol,
          date: today,
        }));
        if (!show) {
          setShow((current) => !current);
        }
        setValue(combineData[0]);
      } catch (error) {
        console.error('Error: ', error);
      }
    }
  };

  /* Options for MUI Search */
  const filterOptions = createFilterOptions({
    matchFrom: 'any',
    limit: 400,
  });

  /* Styles for MUI Modal */
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 2,
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #C4C4C4',
    boxShadow: 24,
    p: 4,
  };

  /* Testing. */
  const groups = [{ name: 'Group 1' }, { name: 'Risky' }, { name: 'Future' }];

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
          <Typography>{found.stock.label}</Typography>
          <Typography>${found.price}</Typography>
          {found.changePercentage >= 0 ? (
            <Typography color={'green'}>
              {found.changePoint}({found.changePercentage}%)
            </Typography>
          ) : (
            <Typography color={'red'}>
              {' '}
              {found.changePoint}({found.changePercentage}%)
            </Typography>
          )}
          <Typography>volume {found.totalVol}</Typography>
          <Typography fontSize={'12px'}>{found.date}</Typography>
          <Box display={'flex'} mt={1}>
            <Button
              variant='contained'
              sx={{ mr: '10px', fontSize: '10px' }}
              onClick={() => setOpenOwned(true)}
            >
              Add to Owned
            </Button>
            <Modal
              open={openOwned}
              onClose={() => setOpenOwned(false)}
              aria-labelledby='modal-owned-title'
              aria-describedby='modal-owned-description'
            >
              <Box sx={style}>
                <Typography id='modal-owned-title' variant='h6' component='h2' sx={{ mb: 1 }}>
                  Amount to add
                </Typography>

                <Button id='modal-owned-button' variant='contained' sx={{ mr: 1 }}>
                  ADD
                </Button>
                <TextField
                  size='small'
                  type='number'
                  label='Stock amount'
                  required
                  width={'75px'}
                  value={owned}
                  onChange={(e) => setOwned(e.target.value)}
                />
              </Box>
            </Modal>
            <Button
              variant='contained'
              sx={{ fontSize: '10px' }}
              onClick={() => setOpenGroup(true)}
            >
              Add to Groups
            </Button>
            <Modal
              open={openGroup}
              onClose={() => setOpenGroup(false)}
              aria-labelledby='modal-group-title'
              aria-describedby='modal-group-description'
            >
              <Box sx={style}>
                <Typography id='modal-group-title' variant='h6' component='h2' sx={{ mb: 1 }}>
                  Amount to add
                </Typography>
                <Box display={'flex'}>
                  <Button id='modal-group-button' variant='contained' sx={{ mr: 1 }}>
                    ADD
                  </Button>
                  <FormControl sx={{ minWidth: '200px' }} size='small'>
                    <InputLabel id='group-label'>Group</InputLabel>
                    <Select
                      labelId='group-select-label'
                      id='group-select'
                      value={group}
                      label='Group'
                      onChange={(e) => setGroup(e.target.value)}
                      input={<OutlinedInput label='Name' />}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value='New'>New Group</MenuItem>
                      {groups.map((group, key) => (
                        <MenuItem key={key} value={group.name}>
                          {group.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Modal>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Search;
