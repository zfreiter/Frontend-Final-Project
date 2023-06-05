import {AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material"
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import {Outlet, Link } from 'react-router-dom';

export default function Navbar() {
  return( 
    <AppBar position="static" sx={{backgroundColor: '#003922'}}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="Candle Stick Logo">
          <CandlestickChartOutlinedIcon />
          <CandlestickChartOutlinedIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          Website Name
        </Typography>
        <Stack direction="row" sx={{flexgrow:1}}>
          <Button color="inherit"><Link to="/home" style={{textDecoration: 'none', color: 'inherit'}}>Home</Link></Button>
          <Button color="inherit"><Link to="/about" style={{textDecoration: 'none', color: 'inherit'}}>About</Link></Button>
          <Button color="inherit"><Link to="/stocks" style={{textDecoration: 'none', color: 'inherit'}}>stocks</Link></Button>
          <Button color="inherit"><Link to="/stock?id=TSLA" style={{textDecoration: 'none', color: 'inherit'}}>stock</Link></Button>
          <Button color="inherit"><Link to="/cryptos" style={{textDecoration: 'none', color: 'inherit'}}>Cryptos</Link></Button>
          <Button color="inherit"><Link to="/account" style={{textDecoration: 'none', color: 'inherit'}}>Account</Link></Button>
        </Stack>
      </Toolbar>
      <Outlet/>
    </AppBar>
  );
}
