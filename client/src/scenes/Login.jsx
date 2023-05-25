import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import CSImage from '../images/P3.jpg';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Login() {
  // temp host variable
  let host = 'http://localhost:3001';
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [isLogin, setLogin] = useState(true);

  const [email, setEmail] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');

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
    setUsername(event.target.value);
    console.log(username);
  };

  const UpdatePassword = (event) => {
    setPass(event.target.value);
  };

  const SubmitRegister = async () => {
    let account = {
      firstName: first,
      lastName: last,
      email: email,
      password: pass,
    };

    const response = await fetch(`${host}/auth/register`, {
      method: 'POST',
      body: JSON.stringify(account),
    });

    if (response.ok) {
      // redirect to login
    } else {
      // prompt with error
    }
  };

  const SubmitLogin = async () => {
    let credentials = {
      email: username,
      password: pass,
    };

    const response = await fetch(`${host}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      // redirect
    } else {
      //prompt error
    }
  };

  const SetToRegister = () => {
    setLogin(false);
  };

  const SetAsLogin = () => {
    setLogin(true);
  };

  return (
    <main>
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', backgroundColor: '#0A1929' }}>
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
            <img src={CSImage} height="100%" alt="Image with neon colors and a geometric dog decoration" />
            <Typography
              variant="h2"
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
              className="container"
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
              variant="h1"
              gutterBottom
              sx={{fontSize: 'xx-large', fontWeight: 'bold'}}
            >
              Sign In
            </Typography>
            <Typography
              variant="h2"
              gutterBottom
              sx={{fontSize: 'medium', fontWeight: 'bold'}}
            >
              Don't Have An Account? <a href="#" onClick={SetToRegister}>Register</a> 
            </Typography>
              <TextField
                required
                id="outlined-basic"
                label="Username"
                variant="outlined"
                sx={{ width: '75%', marginBottom: '15px' }}
                value={username}
                onChange={UpdateUsername}
              />
              <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                sx={{ width: '75%' }}
                value={pass}
                onChange={UpdatePassword}
              />
              <Button
                sx={{ marginTop: '50px', marginRight: '60%' }}
                variant="contained"
                onClick={SubmitLogin}
              >
                Submit
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            className="container"
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
              variant="h1"
              gutterBottom
              sx={{fontSize: 'xx-large', fontWeight: 'bold', marginTop: '20px'}}
            >
              Register
            </Typography>
            <Typography
              variant="h2"
              gutterBottom
              sx={{fontSize: 'medium', fontWeight: 'bold'}}
            >
              Already have an account?{' '}
              <a href="#" onClick={SetAsLogin}>
                Sign In
              </a>
            </Typography>
            <TextField
              id="outlined-required-first"
              required
              label="First Name"
              variant="outlined"
              sx={{ width: '75%', marginBottom: '15px' }}
              value={first}
              onChange={UpdateFirst}
            />
            <TextField
              id="outlined-required-last"
              required
              label="Last Name"
              variant="outlined"
              sx={{ width: '75%', marginBottom: '15px' }}
              value={last}
              onChange={UpdateLast}
            />
            <TextField
              id="outlined-required-email"
              required
              label="Email"
              variant="outlined"
              sx={{ width: '75%', marginBottom: '15px' }}
              value={email}
              onChange={UpdateEmail}
            />

            <TextField
              id="outlined-password-input"
              required
              label="Password"
              type="password"
              sx={{ width: '75%', marginBottom: '20px' }}
              value={pass}
              onChange={UpdatePassword}
            />

            <Button
              sx={{
                marginTop: '20px',
                marginRight: '55%',
                marginBottom: '20px',
              }}
              variant="contained"
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
