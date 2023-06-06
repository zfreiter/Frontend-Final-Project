import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentStockInfo,
  setCurrentStocks,
  setStockString,
  setOwned,
  setUser,
  setGroups,
} from '../redux/authSlice';

const OwnedStocks = ({ title, data, type }) => {
  const currentStockInfo = useSelector((state) => state.auth.currentStockInfo);
  const user = useSelector((state) => state.auth.user);
  const groups = useSelector((state) => state.auth.groups);
  const owned = useSelector((state) => state.auth.owned);
  const currentStocks = useSelector((state) => state.auth.currentStocks);
  const stkString = useSelector((state) => state.auth.stockString);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  let stocks = [];
  if (currentStockInfo) {
    stocks = currentStockInfo.filter((stock) => {
      return data.find((stocktwo) => {
        return stock.symbol === stocktwo.name;
      });
    });
  }

  const deleteOwned = async (stockToRemove) => {
    // Filter new owned list
    const upDatedOwned = owned.filter((stock) => stock.name !== stockToRemove);
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
      const responseInfo = await fetch(url, options);
      const resultInfo = await responseInfo.json();

      // Update string that contains a list of each stock used on the front page
      const getStocks = [];
      resultInfo.stocksOwned.map((stock) => {
        getStocks.push(stock.name);
      });

      resultInfo.stockGroups.map((group) => {
        group.map((stock) => {
          getStocks.push(stock.name);
        });
      });

      const currStock = [...new Set([...getStocks])];

      dispatch(setCurrentStocks({ currentStocks: [...currStock] }));

      let stocksStr = '';
      currentStocks.map((stock) => {
        stocksStr += stock + ',';
      });

      // do not need to remove stock info. It can stay.
      const editedStocksStr = stocksStr.slice(0, -1);
      dispatch(setStockString({ stockString: editedStocksStr }));
      dispatch(setOwned({ owned: resultInfo.stocksOwned }));
      dispatch(setGroups({ groups: resultInfo.stockGroups }));
      dispatch(setUser({ user: resultInfo }));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteGroup = async (stockToRemove, title) => {
    const spot = title.slice(6);
    // need to remove a group if it is empty
    let upDatedGroups = [...groups];
    let upDatedGroup = groups[spot - 1].filter((stock) => stock.name !== stockToRemove);
    if (upDatedGroup.lenth < 1) {
    }
    upDatedGroups[spot - 1] = upDatedGroup;

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
      const resultInfo = await response.json();

      // Update string that contains a list of each stock used on the front page
      const getStocks = [];
      resultInfo.stocksOwned.map((stock) => {
        getStocks.push(stock.name);
      });

      resultInfo.stockGroups.map((group) => {
        group.map((stock) => {
          getStocks.push(stock.name);
        });
      });

      const currStock = [...new Set([...getStocks])];

      dispatch(setCurrentStocks({ currentStocks: [...currStock] }));

      let stocksStr = '';
      currentStocks.map((stock) => {
        stocksStr += stock + ',';
      });

      // do not need to remove stock info. It can stay.
      const editedStocksStr = stocksStr.slice(0, -1);
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

  return (
    <Box sx={{ width: '400px', mb: 1, borderRadius: 1 }}>
      <Accordion autoFocus elevation={5}>
        <AccordionSummary
          autoFocus
          expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          sx={{ borderRadius: 1, '&:hover': { backgroundColor: '#c4c0c0' } }}
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

                <Box ml={'auto'}>
                  <Typography fontSize={'10px'} textAlign={'right'}>
                    ${stock.regularMarketPrice}
                  </Typography>
                  {type === 0 && (
                    <Typography fontSize={'10px'} textAlign={'right'} sx={{ whiteSpace: 'nowrap' }}>
                      {data[key].amount} Shares
                    </Typography>
                  )}
                </Box>
                <Divider orientation='vertical' flexItem sx={{ ml: 1 }} />
                <DeleteForeverIcon
                  sx={{
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
    </Box>
  );
};

export default OwnedStocks;
