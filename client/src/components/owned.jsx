import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import { getCurrentValue } from './utilityService';
import { groupStocks, createStockStr } from './utilityService';
import { Box, Link, Button, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentStocks, setStockString, setOwned, setUser, setGroups } from '../redux/authSlice';

const OwnedStocks = ({ title, data, type }) => {
  const [openOwned, setOpenOwned] = useState(false);
  const [amount, setAmount] = useState(0);
  const [stockToChange, setStockToChange] = useState('');
  const [stockKey, setStockKey] = useState(-1);
  const currentStockInfo = useSelector((state) => state.currentStockInfo);
  const user = useSelector((state) => state.user);
  const groups = useSelector((state) => state.groups);
  const owned = useSelector((state) => state.owned);
  const currentStocks = useSelector((state) => state.currentStocks);

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let stocks;
  if (currentStockInfo.length > 0) {
    stocks = getCurrentValue(currentStockInfo, data);
  } else {
    stocks = data;
  }
  console.log('data ', stocks);
  const deleteOwned = async (stockToRemove) => {
    // Filter new owned list
    const upDatedOwned = owned.filter((stock) => stock.name !== stockToRemove);
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
      const responseInfo = await fetch(url, options);
      const resultInfo = await responseInfo.json();

      // Update string that contains a list of each stock used on the front page
      const getStocks = groupStocks(resultInfo.stocksOwned, resultInfo.stockGroups);

      const currStock = [...new Set([...getStocks])];
      dispatch(setCurrentStocks({ currentStocks: [...currStock] }));

      // do not need to remove stock info. It can stay.
      const editedStocksStr = createStockStr(currentStocks);
      dispatch(setStockString({ stockString: editedStocksStr }));
      dispatch(setOwned({ owned: resultInfo.stocksOwned }));
      dispatch(setGroups({ groups: resultInfo.stockGroups }));
      dispatch(setUser({ user: resultInfo }));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteGroup = async (stockToRemove, title) => {
    const spot = title.slice(7);

    let upDatedGroups = [...groups];

    let upDatedGroup = groups[spot - 1].filter((stock) => stock.name !== stockToRemove);
    if (upDatedGroup.lenth < 1) {
    }
    upDatedGroups[spot - 1] = upDatedGroup;

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
      const resultInfo = await response.json();

      // Update string that contains a list of each stock used on the front page
      const getStocks = groupStocks(resultInfo.stocksOwned, resultInfo.stockGroups);

      const currStock = [...new Set([...getStocks])];
      dispatch(setCurrentStocks({ currentStocks: [...currStock] }));

      // do not need to remove stock info. It can stay.
      const editedStocksStr = createStockStr(currentStocks);
      dispatch(setStockString({ stockString: editedStocksStr }));
      dispatch(setOwned({ owned: resultInfo.stocksOwned }));
      dispatch(setGroups({ groups: resultInfo.stockGroups }));
      dispatch(setUser({ user: resultInfo }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (stockToRemove) => {
    if (title === 'Stocks') {
      deleteOwned(stockToRemove);
    } else {
      deleteGroup(stockToRemove, title);
    }
  };

  const handleNav = (symbol) => {
    navigate(`/Stock/${symbol}`);
  };

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

  const openModal = (key, shortName, amount) => {
    setStockKey(key);
    setAmount(amount);
    setStockToChange(shortName);
    setOpenOwned(true);
  };

  // Update shares for owned stocks
  const updateShares = async () => {
    const updatedOwned = [];
    owned.map((stock) => {
      updatedOwned.push({ ...stock });
    });
    updatedOwned[stockKey].amount = amount;
    const data = { userId: user._id, owned: updatedOwned };

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

      dispatch(setOwned({ owned: json.stocksOwned }));
      dispatch(setUser({ user: json }));
      setStockKey(-1);
      setAmount(0);
      setStockToChange('');
      setOpenOwned(false);
    } catch (err) {
      console.log(err);
    }
  };
  const closeModal = () => {
    setOpenOwned(false);
  };

  return (
    <Box sx={{ width: '434px', mb: 1, borderRadius: 1 }}>
      <Accordion autoFocus elevation={5}>
        <AccordionSummary
          autoFocus
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          sx={{ borderRadius: 1, '&:hover': { backgroundColor: '#c4c0c0' } }}
        >
          <Typography autoFocus fontWeight={600} fontFamily={'Roboto'}>
            {title === 'Stocks' ? `${title}` : `Watch ${title}`}
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
                p={1}
                sx={{
                  width: '100%',
                }}
              >
                <Box>
                  <Typography>
                    <Link
                      fontSize={16}
                      fontWeight={600}
                      fontFamily={'Roboto'}
                      component='button'
                      variant='body2'
                      underline='hover'
                      onClick={() => handleNav(stock.symbol)}
                    >
                      {currentStockInfo.length > 0 ? stock.symbol : stock.name}
                    </Link>
                  </Typography>
                  <Typography fontSize={12} fontWeight={600} fontFamily={'Roboto'}>
                    {stock?.shortName}
                  </Typography>
                </Box>

                <Box ml={'auto'}>
                  <Box display={'flex'} justifyContent={'flex-end'}>
                    {type === 0 && (
                      <Typography
                        fontSize={10}
                        fontWeight={600}
                        fontFamily={'Roboto'}
                        sx={{
                          mt: 0.4,
                          whiteSpace: 'nowrap',
                          color: '#000000',
                          '&:hover': {
                            color: '#1D76D2',
                            textDecoration: 'underline',
                          },
                        }}
                        onClick={() => openModal(key, stock.shortName, data[key].amount)}
                      >
                        {data[key].amount} Shares
                      </Typography>
                    )}

                    {type === 0 && <Divider orientation='vertical' flexItem sx={{ ml: 1 }} />}
                    <Typography
                      fontSize={12}
                      fontWeight={600}
                      fontFamily={'Roboto'}
                      textAlign={'right'}
                      ml={1}
                      mt={0.4}
                    >
                      {currentStockInfo.length > 0 ? stock.regularMarketPrice : 0}
                    </Typography>
                  </Box>

                  {stock?.regularMarketChangePercent > 0 ? (
                    <Typography
                      textAlign={'right'}
                      fontSize={12}
                      fontWeight={600}
                      fontFamily={'Roboto'}
                      color={'green'}
                    >
                      {currentStockInfo.length > 0 ? stock?.regularMarketChange?.toFixed(2) : 0}(
                      {currentStockInfo.length > 0
                        ? stock?.regularMarketChangePercent?.toFixed(2)
                        : 0}
                      )%
                    </Typography>
                  ) : (
                    <Typography
                      textAlign={'right'}
                      fontSize={12}
                      fontWeight={600}
                      fontFamily={'Roboto'}
                      color={'#AB0227'}
                    >
                      {currentStockInfo.length > 0 ? stock?.regularMarketChange.toFixed(2) : 0}(
                      {currentStockInfo.length > 0
                        ? stock?.regularMarketChangePercent.toFixed(2)
                        : 0}
                      )%
                    </Typography>
                  )}
                </Box>
                <Divider orientation='vertical' flexItem sx={{ ml: 1 }} />
                <DeleteForeverIcon
                  sx={{
                    mt: 1,
                    ml: 1,
                    '&:hover': {
                      color: '#AB0227',
                    },
                  }}
                  onClick={(e) => handleDelete(stock.symbol)}
                />
              </Box>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
      <Modal
        open={openOwned}
        onClose={closeModal}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: 0.4,
            zIndex: -1,
          },
        }}
        aria-labelledby='modal-update-title'
        aria-describedby='modal-update-description'
      >
        <Box sx={style}>
          <Typography id='modal-update-title' variant='h6' component='h2' sx={{ mb: 1 }}>
            Update {stockToChange} shares
          </Typography>

          <Button
            id='modal-update-button'
            variant='contained'
            sx={{
              mr: 1,
              '&:hover': {
                fontWeight: 600,
                backgroundColor: '#fff',
                color: '#3c52b2',
              },
            }}
            onClick={updateShares}
          >
            UPDATE
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
    </Box>
  );
};

export default OwnedStocks;
