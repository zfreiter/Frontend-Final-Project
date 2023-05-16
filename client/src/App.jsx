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

export default function App() {
  const [loggedIn, setLogin] = useState(false);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <Login />}></Route>
        <Route path="home" element={loggedIn ? <Home /> : <Login />}></Route>
        <Route path="About" element={loggedIn ? <About /> : <Login />}></Route>
        <Route
          path="Stocks"
          element={loggedIn ? <Stocks /> : <Login />}
        ></Route>
        <Route path="Stock" element={loggedIn ? <Stock /> : <Login />}></Route>
        <Route
          path="Account"
          element={loggedIn ? <Account /> : <Login />}
        ></Route>
        <Route
          path="Crypto"
          element={loggedIn ? <Crypto /> : <Login />}
        ></Route>
        <Route
          path="Cryptos"
          element={loggedIn ? <Cryptos /> : <Login />}
        ></Route>
        <Route path="*" element={loggedIn ? <NotFound /> : <Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
