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
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentStockInfo,
  setCurrentStocks,
  setOwned,
  setStockString,
} from '../redux/authSlice';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
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
  const own = useSelector((state) => state.auth.user.stocksOwned);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const groups = useSelector((state) => state.auth.user.stockGroups);
  const currentStk = useSelector((state) => state.auth.currentStocks);
  const currentPrice = useSelector((state) => state.auth.currentStockInfo);
  const stockString = useSelector((state) => state.auth.stockString);
  const dispatch = useDispatch();

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

    const url = 'http://localhost:3001/own/owned';
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
      let stocksStr = '';
      stockList.map((stock) => {
        stocksStr += stock + ',';
      });
      const editedStocksStr = stocksStr.slice(0, -1);
      dispatch(setStockString({ stockString: editedStocksStr }));

      const urlInfo = `http://localhost:3001/stock/information?parems=${editedStocksStr}`;
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
      const url = 'http://localhost:3001/group/groups';

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
        console.log('new user ', json);

        const stockList = [...new Set([...currentStk, found.stock.label])];
        dispatch(setCurrentStocks({ currentStocks: stockList }));

        // Update string that contains a list of each stock used on the front page
        let stocksStr = '';
        stockList.map((stock) => {
          stocksStr += stock + ',';
        });
        const editedStocksStr = stocksStr.slice(0, -1);
        dispatch(setStockString({ stockString: editedStocksStr }));

        const urlInfo = `http://localhost:3001/stock/information?parems=${editedStocksStr}`;
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

        dispatch(setUser({ user: json }));
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
    const url = `http://localhost:3001/stock/price?find=${stockValue.label}`;

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
        const url2 = 'http://localhost:3001/stock/stories';

        const response2 = await fetch(url2, options);
        const js = await response2.json();
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

  return (
    <Box display={'flex'} flexDirection={'column'} gap={1} height={'300px'}>
      <Box display={'flex'} gap={'5px'}>
        <Button variant='contained' autoFocus onClick={handleSearch}>
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
        <Card elevation={3} sx={{ width: 'fit-content' }}>
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Box
              position={'relative'}
              width={'397.75px'}
              borderRadius={1}
              borderColor={'#C4C4C4'}
              p={2}
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
                <Typography color={'green'} fontWeight={700}>
                  {found.changePoint}({found.changePercentage}%)
                </Typography>
              ) : (
                <Typography color={'#AB0227'} fontWeight={700}>
                  {found.changePoint}({found.changePercentage}%)
                </Typography>
              )}
              <Typography>volume {found.totalVol}</Typography>
              <Typography fontSize={'12px'}>{found.date}</Typography>
              <Box display={'flex'} mt={1}>
                <Button
                  variant='contained'
                  disabled={own.some((stock) => stock.name === found.stock.label)}
                  sx={{ mr: '10px', fontSize: '10px' }}
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
                      sx={{ mr: 1 }}
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
                      <Button
                        id='modal-group-button'
                        variant='contained'
                        sx={{ mr: 1 }}
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
      )}
    </Box>
  );
};

export default Search;
