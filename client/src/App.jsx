import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './scenes/Login';
import Home from './scenes/Home';
import About from './scenes/About';
import Stocks from './scenes/Stocks';
import Stock from './scenes/Stock';
import Account from './scenes/Account';
import NotFound from './scenes/NotFound';
import Crypto from './scenes/Crypto';
import Cryptos from './scenes/Cryptos';
import Navbar from './scenes/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="About" element={<About />}></Route>
        <Route path="Stocks" element={<Stocks />}></Route>
        <Route path="Stock" element={<Stock />}></Route>
        <Route path="Account" element={<Account />}></Route>
        <Route path="Crypto" element={<Crypto />}></Route>
        <Route path="Cryptos" element={<Cryptos />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
