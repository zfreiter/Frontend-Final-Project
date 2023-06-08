import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../redux/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <AppBar position='static' sx={{ backgroundColor: '#003922' }}>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='Candle Stick Logo'>
          <CandlestickChartOutlinedIcon />
          <CandlestickChartOutlinedIcon />
        </IconButton>
        <Typography variant='h6' component='div'>
          Website Name
        </Typography>
        <Stack direction='row' sx={{ flexgrow: 1 }}>
          <Button
            color='inherit'
            sx={{
              mx: 1,
              '&:hover': {
                color: '#003922',
                backgroundColor: 'white',
              },
            }}
          >
            <Link
              to='/home'
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Home
            </Link>
          </Button>
          <Button
            color='inherit'
            sx={{
              mx: 1,
              '&:hover': {
                color: '#003922',
                backgroundColor: 'white',
              },
            }}
          >
            <Link to='/about' style={{ textDecoration: 'none', color: 'inherit' }}>
              About
            </Link>
          </Button>
          <Button
            color='inherit'
            sx={{
              mx: 1,
              '&:hover': {
                color: '#003922',
                backgroundColor: 'white',
              },
            }}
          >
            <Link to='/account' style={{ textDecoration: 'none', color: 'inherit' }}>
              Account
            </Link>
          </Button>
        </Stack>
        <Button
          variant='outlined'
          color='inherit'
          sx={{
            ml: 'auto',
            '&:hover': {
              color: '#AB0227',
              backgroundColor: 'white',
            },
          }}
          onClick={() => dispatch(setLogout())}
        >
          Log out
        </Button>
      </Toolbar>
      <Outlet />
    </AppBar>
  );
}
