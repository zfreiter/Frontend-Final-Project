import { useState } from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useNavigate } from 'react-router-dom';
import { createStockStr } from './utilityService';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Divider from '@mui/material/Divider';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { combineData } from '../stock_information/combineData';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentStockInfo,
  setCurrentStocks,
  setGroups,
  setOwned,
  setStockString,
} from '../redux/authSlice';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { setUser } from '../redux/authSlice';

const Search = () => {
  const [stockValue, setStockValue] = useState(combineData[0]);
  const [found, setFound] = useState();
  const [show, setShow] = useState(false);
  const [openOwned, setOpenOwned] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const [selectGroup, setSelectGroup] = useState('');
  const [amount, setAmount] = useState(1);
  const own = useSelector((state) => state.user.stocksOwned);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const groups = useSelector((state) => state.user.stockGroups);
  const currentStk = useSelector((state) => state.currentStocks);
  const currentPrice = useSelector((state) => state.currentStockInfo);
  const stockString = useSelector((state) => state.stockString);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeOwnedModal = () => {
    setAmount(1);
    setOpenOwned(false);
  };

  const openOwnedModal = () => {
    setOpenOwned(true);
  };

  /* ADD STOCK WITH AMOUNT TO OWNED STOCKS TO DATABASE AND UPDATE DISPLAY */
  const addToOwned = async () => {
    let upDatedOwned = [];
    own.map((stock) => {
      upDatedOwned.push(stock);
    });

    upDatedOwned.push({ name: found.stock.label, amount: amount });
    const data = { userId: user._id, owned: upDatedOwned };

    const url = 'https://frontend-final-project-topaz.vercel.app/own/owned';
    //const url = 'http://localhost:3001/own/owned';
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();

      const stockList = [...new Set([...currentStk, found.stock.label])];

      // Update string that contains a list of each stock used on the front page
      let editedStocksStr = createStockStr(stockList);
      dispatch(setStockString({ stockString: editedStocksStr }));

      const urlInfo = `https://frontend-final-project-topaz.vercel.app/stock/information?parems=${editedStocksStr}`;
      //const urlInfo = `http://localhost:3001/stock/information?parems=${editedStocksStr}`;
      const optionsInfo = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      // Get the new stock info for the home page and update the state
      const responseInfo = await fetch(urlInfo, optionsInfo);
      const resultInfo = await responseInfo.json();

      dispatch(setCurrentStockInfo({ currentStockInfo: resultInfo }));

      dispatch(setCurrentStocks({ currentStocks: stockList }));
      dispatch(setOwned({ owned: json.stocksOwned }));

      dispatch(setUser({ user: json }));
      setAmount(1);
      setOpenOwned(false);
    } catch (err) {
      console.log(err);
    }
  };

  const addToGroup = async () => {
    const stockToAdd = { name: found.stock.label };
    if (selectGroup !== undefined) {
      let upDatedGroups = [];
      user.stockGroups.map((group) => {
        upDatedGroups.push([...group]);
      });

      upDatedGroups[selectGroup].push(stockToAdd);

      const data = { userId: user._id, groups: upDatedGroups };
      const url = 'https://frontend-final-project-topaz.vercel.app/group/groups';
      //const url = 'http://localhost:3001/group/groups';
      const options = {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();
        dispatch(setUser({ user: json }));
        const stockList = [...new Set([...currentStk, found.stock.label])];
        dispatch(setGroups({ groups: json.stockGroups }));
        dispatch(setCurrentStocks({ currentStocks: stockList }));

        const editedStocksStr = createStockStr(stockList);
        if (editedStocksStr !== stockString) {
          dispatch(setStockString({ stockString: editedStocksStr }));

          const urlInfo = `https://frontend-final-project-topaz.vercel.app/stock/information?parems=${editedStocksStr}`;
          //const urlInfo = `http://localhost:3001/stock/information?parems=${editedStocksStr}`;
          const optionsInfo = {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          };

          // Get the new stock info for the home page and update the state
          const responseInfo = await fetch(urlInfo, optionsInfo);
          const resultInfo = await responseInfo.json();
          if (resultInfo) {
            dispatch(setCurrentStockInfo({ currentStockInfo: resultInfo }));
          }
        }
        setSelectGroup('');
        setOpenGroup(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  /* Function searches for an individual Stock */
  const handleSearch = async () => {
    /* REALSTONK FOR ONE ITEM, BUT RETURNS THE WRONG INFOMATION AT TIMES */
    const url = `https://frontend-final-project-topaz.vercel.app/stock/price?find=${stockValue.label}`;
    //const url = `http://localhost:3001/stock/price?find=${stockValue.label}`;

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    if (stockValue.label !== '') {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        var today = new Date().toString();
        console.log('new test ', result);
        setFound((current) => ({
          stock: stockValue,
          price: result.price,
          changePercentage: result.change_percentage,
          changePoint: result.change_point,
          totalVol: result.total_vol,
          date: today,
        }));
        if (!show) {
          setShow((current) => !current);
        }
        setStockValue(combineData[0]);
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
  /* Used from https://mui.com/material-ui/react-modal/ with little modifications */
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

  const handleNav = (symbol) => {
    navigate(`/Stock/${symbol}`);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} gap={1} mb={3} height={'310px'}>
      <Box display={'flex'} gap={'5px'}>
        <Button
          variant='contained'
          onClick={handleSearch}
          sx={{
            boxShadow: 5,
            '&:hover': {
              backgroundColor: '#fff',
              color: '#3c52b2',
            },
          }}
        >
          Search
        </Button>
        <Autocomplete
          filterOptions={filterOptions}
          size='small'
          autoHighlight
          value={stockValue}
          onChange={(event, newValue) => {
            setStockValue(newValue);
          }}
          disablePortal
          id='stock-search-combo-box'
          options={combineData}
          sx={{
            borderRadius: 1,
            width: 300,
            boxShadow: 5,
          }}
          getOptionLabel={(option) => option.label}
          renderOption={(props, option) => (
            <Box {...props}>
              {option.label} ({option.name})
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label='NASDAQ/NYSE Stock Symbol' />}
        />
      </Box>
      {found && show ? (
        <Card elevation={5} sx={{ width: 'fit-content' }}>
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              width={'397.75px'}
              height={'400px'}
              borderRadius={1}
              borderColor={'#C4C4C4'}
              p={2}
            >
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography fontWeight={'600'} fontFamily={'Roboto'} fontSize={20}>
                  {found.stock.name}
                </Typography>
                <HighlightOffIcon
                  color='#555555'
                  sx={{
                    '&:hover': {
                      color: '#AB0227',
                    },
                  }}
                  onClick={() => setShow((current) => !current)}
                />
              </Box>
              <Typography>
                <Link
                  fontWeight={'600'}
                  fontFamily={'Roboto'}
                  fontSize={18}
                  component='button'
                  variant='body2'
                  underline='hover'
                  onClick={() => handleNav(found.stock.label)}
                >
                  {found.stock.label}
                </Link>
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Typography fontSize={18} fontWeight={600} fontFamily={'Roboto'}>
                ${found.price}
              </Typography>
              {found.changePercentage >= 0 ? (
                <Typography color={'green'} fontWeight={600} fontFamily={'Roboto'}>
                  {found.changePoint}({found.changePercentage}%)
                </Typography>
              ) : (
                <Typography color={'#AB0227'} fontSize={18} fontWeight={600} fontFamily={'Roboto'}>
                  {found.changePoint}({found.changePercentage}%)
                </Typography>
              )}
              <Typography fontSize={18} fontWeight={600} fontFamily={'Roboto'}>
                volume {found.totalVol}
              </Typography>
              <Typography fontSize={12} fontWeight={600} fontFamily={'Roboto'}>
                {found.date}
              </Typography>
              <Box display={'flex'} mt={2}>
                <Button
                  variant='contained'
                  disabled={own.some((stock) => stock.name === found.stock.label)}
                  sx={{
                    mr: '10px',
                    fontSize: '10px',
                    width: '119.25px',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#3c52b2',
                    },
                  }}
                  onClick={openOwnedModal}
                >
                  {own.some((stock) => stock.name === found.stock.label) ? 'Owned' : 'Add to Owned'}
                </Button>
                <Modal
                  open={openOwned}
                  onClose={closeOwnedModal}
                  aria-labelledby='modal-owned-title'
                  aria-describedby='modal-owned-description'
                >
                  <Box sx={style}>
                    <Typography id='modal-owned-title' variant='h6' component='h2' sx={{ mb: 1 }}>
                      Amount to add
                    </Typography>

                    <Button
                      id='modal-owned-button'
                      variant='contained'
                      sx={{
                        mr: 1,
                        '&:hover': {
                          fontWeight: 600,
                          backgroundColor: '#fff',
                          color: '#3c52b2',
                        },
                      }}
                      onClick={addToOwned}
                    >
                      ADD
                    </Button>
                    <TextField
                      size='small'
                      type='number'
                      label='Stock amount'
                      required
                      width={'75px'}
                      value={amount}
                      onChange={(event) => {
                        setAmount(event.target.value);
                      }}
                    />
                  </Box>
                </Modal>
                <Button
                  variant='contained'
                  sx={{
                    fontSize: '10px',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#3c52b2',
                    },
                  }}
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
                      <Button
                        id='modal-group-button'
                        variant='contained'
                        sx={{
                          mr: 1,
                          '&:hover': {
                            backgroundColor: '#fff',
                            color: '#3c52b2',
                          },
                        }}
                        onClick={addToGroup}
                      >
                        ADD
                      </Button>
                      <FormControl sx={{ minWidth: '200px' }} size='small'>
                        <InputLabel id='group-label'>Group</InputLabel>
                        <Select
                          labelId='group-select-label'
                          id='group-select'
                          value={selectGroup}
                          label='Group'
                          onChange={(e) => setSelectGroup(e.target.value)}
                          input={<OutlinedInput label='Name' />}
                        >
                          <MenuItem value=''>
                            <em>None</em>
                          </MenuItem>

                          {groups.map((group, key) => (
                            <MenuItem key={key} value={key}>
                              {key + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Card elevation={5} sx={{ width: 'fit-content' }}>
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              gap={2}
              width={'397.75px'}
              height={'400px'}
              borderRadius={1}
              mt={1}
              borderColor={'#C4C4C4'}
              p={2}
            >
              <Box display={'flex'}>
                <ArrowForwardIcon />
                <Typography
                  ml={1}
                  fontSize={18}
                  fontWeight={600}
                  fontFamily={'Roboto'}
                  lineHeight={1.5}
                >
                  Search for stocks in the Nasdaq and Nyse.
                </Typography>
              </Box>
              <Box display={'flex'}>
                <ArrowForwardIcon />
                <Typography
                  ml={1}
                  fontSize={18}
                  fontWeight={600}
                  fontFamily={'Roboto'}
                  lineHeight={1.5}
                >
                  Add to your owned stocks
                </Typography>
              </Box>
              <Box display={'flex'}>
                <ArrowForwardIcon />
                <Typography
                  ml={1}
                  fontSize={18}
                  fontWeight={600}
                  fontFamily={'Roboto'}
                  lineHeight={1.5}
                >
                  Add to one of three watch groups
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Search;
