import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import CSImage from '../images/C1.jpg';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGroups, setLogin, setOwned } from '../redux/authSlice';

export default function Login(props) {
  // temp host variable
  let host = 'http://localhost:3001';
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // LOGIN state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ClearErrorMessage = () => {
    if (errorMessage !== '') {
      setErrorMessage('');
    }
  }
  const UpdateFirst = (event) => {
    setFirst(event.target.value);
  };

  const UpdateLast = (event) => {
    setLast(event.target.value);
  };

  const UpdateEmail = (event) => {
    setEmail(event.target.value);
  };
  const UpdateUsername = (event) => {
    ClearErrorMessage();
    setUsername(event.target.value);
  };

  const UpdatePassword = (event) => {
    ClearErrorMessage();
    setPass(event.target.value);
  };

  const SubmitRegister = async () => {
    ClearErrorMessage();
    let errorString = '';
    if (first === '' || first === null || first === undefined) {
      errorString+= '- First Name Invalid -' 
    }
    if (last === '' || last === null || last === undefined) {
      errorString+= '- Last Name Invalid -' 
    }
    if (email === '' || email === null || email === undefined || !email.includes('@')) {
      errorString+= '- Email Is Invalid -' 
    }
    if (pass === '' || pass === null || pass === undefined) {
      errorString+= '- Password Is Invalid -' 
    }

    if (errorString !== '') {
      setErrorMessage(`Error: ${errorString}`);
      return;
    }


    let account = {
      firstName: first,
      lastName: last,
      email: email,
      password: pass,
    };
    console.log(account);
    const response = await fetch(`http://localhost:3001/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(account),
    });
    navigate('/');
    if (response.status === 201) {
      // redirect to login
      //setIsLogin(true);
    } else {
      // prompt with error
    }
  };

  const SubmitLogin = async () => {
    
    ClearErrorMessage();
    
    if (!username.includes('@')) {
      setErrorMessage('Invalid Email');
      return;
    }

    let credentials = {
      email: username,
      password: pass,
    };
    try {
      const response = await fetch(`${host}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      console.log('response', response);
      if (!response.ok) {
        
        setErrorMessage('Email / Password Combination Not Found');
        return;
      }

      const data = await response.json();

      if (data) {
        dispatch(setLogin({ token: data.token, user: data.user }));
        dispatch(setOwned({ owned: data.user.stocksOwned }));
        dispatch(setGroups({ groups: data.user.stockGroups }));

        const getStocks = [];
        data.user.stocksOwned.map((stock) => {
          getStocks.push(stock.name);
        });
        data.user.stockGroups.map((stock) => {
          stock.map((stock) => {
            getStocks.push(stock.name);
          });
        });
        console.log('groupdata ', getStocks);
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const SetToRegister = () => {
    setPass('');
    setErrorMessage('');
    setIsLogin(false);
  };

  const SetAsLogin = () => {
    setErrorMessage('');
    setIsLogin(true);
  };

  return (
    <main>
      <Box
        sx={{ width: '100%', display: 'flex', alignItems: 'center', backgroundColor: '#0A1929' }}
      >
        <Box sx={{ width: '55%', borderStyle: 'none' }}>
          <ImageList
            sx={{
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
              filter: 'brightness(100%)',
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            <img
              src={CSImage}
              height='100%'
              width='1100px'
              alt='Image with neon colors and a geometric dog decoration'
            />
            <Typography
              variant='h2'
              gutterBottom
              sx={{
                position: 'absolute',
                textAlign: 'center',
                marginTop: '40%',
                backdropFilter: 'brightness(0.5)',
                filter: 'drop-shadow(2px 4px 6px black)',
                color: 'darkorange',
              }}
            >
                Welcome To Your Next Portfolio Manager
              </Typography>
            </ImageList>
          </Box>
          {isLogin ? (
            <Box sx={{ width: '45%', borderStyle: 'none' }}>
              <Box
                className='container'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'gainsboro',
                  margin: 'auto',
                  width: '80%',
                  height: '400px',
                  borderRadius: '10px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant='h1'
                  gutterBottom
                  sx={{ fontSize: 'xx-large', fontWeight: 'bold' }}
                >
                  Sign In
                </Typography>
                <Typography
                  variant='h2'
                  gutterBottom
                  sx={{ fontSize: 'medium', fontWeight: 'bold' }}
                >
                  Don't Have An Account?{' '}
                  <a href='#' onClick={SetToRegister}>
                    Register
                  </a>
                </Typography>
                <TextField
                  required
                  id='outlined-basic'
                  label='Email'
                  variant='outlined'
                  sx={{ width: '75%', marginBottom: '15px' }}
                  value={username}
                  onChange={UpdateUsername}
                />
                <TextField
                  required
                  id='outlined-password-input'
                  label='Password'
                  type='password'
                  sx={{ width: '75%' }}
                  value={pass}
                  onChange={UpdatePassword}
                />
                <Typography variant='h6' sx={{color: 'darkred'}}>{`${errorMessage}`}</Typography>
                <Button
                  sx={{ marginTop: '50px', marginRight: '60%' }}
                  variant='contained'
                  onClick={SubmitLogin}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          ) : (            
          <Box
            className='container'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '35%',
              height: 'fit-content',
              borderStyle: 'none',
              backgroundColor: 'gainsboro',
              marginRight: 'auto',
              marginLeft: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
            }}
          >
            <Typography
              variant='h1'
              gutterBottom
              sx={{ fontSize: 'xx-large', fontWeight: 'bold', marginTop: '20px' }}
            >
              Register
            </Typography>
            <Typography variant='h2' gutterBottom sx={{ fontSize: 'medium', fontWeight: 'bold' }}>
              Already have an account?{' '}
              <a href='#' onClick={SetAsLogin}>
                Sign In
              </a>
            </Typography>
            <TextField
              id='outlined-required-first'
              required
              label='First Name'
              variant='outlined'
              sx={{ width: '75%', marginBottom: '15px' }}
              value={first}
              onChange={UpdateFirst}
            />
            <TextField
              id='outlined-required-last'
              required
              label='Last Name'
              variant='outlined'
              sx={{ width: '75%', marginBottom: '15px' }}
              value={last}
              onChange={UpdateLast}
            />
            <TextField
              id='outlined-required-email'
              required
              label='Email'
              variant='outlined'
              sx={{ width: '75%', marginBottom: '15px' }}
              value={email}
              onChange={UpdateEmail}
            />

            <TextField
              id='outlined-password-input'
              required
              label='Password'
              type='password'
              sx={{ width: '75%', marginBottom: '20px' }}
              value={pass}
              onChange={UpdatePassword}
            />
            <Typography variant='h6' sx={{color: 'darkred', width: '80%', textAlign: 'center'}}>{`${errorMessage}`}</Typography>
            <Button
              sx={{
                marginTop: '20px',
                marginRight: '55%',
                marginBottom: '20px',
              }}
              variant='contained'
              onClick={SubmitRegister}
            >
              Register
            </Button>
          </Box>
        )}
      </Box>
    </main>
  );
}
