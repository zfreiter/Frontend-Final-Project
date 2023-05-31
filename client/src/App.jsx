import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
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

import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setLogout, setGroups, setOwned } from './redux/authSlice';

export default function App() {
  const test = useSelector(setLogin);
  const [loggedIn, setLoginStatus] = useState(Boolean(useSelector((state) => state)));
  const [showNav, setNav] = useState(useSelector((state) => state));

  const LoginCallback = (data) => {
    setLoginStatus(data);
    setNav(data);
  };

  return (
    <BrowserRouter>
      {showNav && <Navbar />}
      <Routes>
        <Route
          path='/'
          element={loggedIn ? <Home /> : <Login parentCallback={LoginCallback} />}
        ></Route>
        <Route
          path='home'
          element={loggedIn ? <Home /> : <Login parentCallback={LoginCallback} />}
        ></Route>
        <Route
          path='About'
          element={loggedIn ? <About /> : <Login parentCallback={LoginCallback} />}
        ></Route>
        <Route
          path='Stocks'
          element={loggedIn ? <Stocks /> : <Login parentCallback={LoginCallback} />}
        ></Route>
        <Route
          path='Stock'
          element={loggedIn ? <Stock /> : <Login parentCallback={LoginCallback} />}
        ></Route>
        <Route
          path='Account'
          element={loggedIn ? <Account /> : <Login parentCallback={LoginCallback} />}
        ></Route>
        <Route
          path='Crypto'
          element={loggedIn ? <Crypto /> : <Login parentCallback={LoginCallback} />}
        ></Route>
        <Route
          path='Cryptos'
          element={loggedIn ? <Cryptos /> : <Login parentCallback={LoginCallback} />}
        ></Route>
        <Route
          path='*'
          element={loggedIn ? <NotFound /> : <Login parentCallback={LoginCallback} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
