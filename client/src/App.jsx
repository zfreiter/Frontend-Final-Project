import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import Login from './scenes/Login';
import Home from './scenes/Home';
import About from './scenes/About';
import Stocks from './scenes/Stocks';
import Stock from './scenes/Stock';
import Account from './scenes/Account';
import NotFound from './scenes/NotFound';
import Crypto from './scenes/Crypto';
import Cryptos from './scenes/Cryptos';
import Navbar from './scenes/Navbar';

import { useSelector } from 'react-redux';

export default function App() {
  const loggedIn = Boolean(useSelector((state) => state.auth.token));

  return (
    <BrowserRouter>
      {loggedIn && <Navbar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={loggedIn ? <Home /> : <Navigate to='/' />} />
        <Route path='/About' element={loggedIn ? <About /> : <Navigate to='/' />} />
        <Route path='/Stocks' element={loggedIn ? <Stocks /> : <Navigate to='/' />} />
        <Route path='/Stock/:id' element={loggedIn ? <Stock /> : <Navigate to='/' />} />
        <Route path='/Account' element={loggedIn ? <Account /> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}
