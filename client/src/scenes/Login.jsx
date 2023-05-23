import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import CSImage from '../images/P3.jpg';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function Login() {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [isLogin, setLogin] = useState(true);

  const UpdateUsername = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const UpdatePassword = (event) => {
    setPass(event.target.value);
  };

  const SubmitLogin = async () => {
    let credentials = {
      email: username,
      password: pass,
    };

    const response = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
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

  return (
    <>
      <Box sx={{ width: '100%', display: 'inline-flex', alignItems: 'center' }}>
        <Box sx={{ width: '55%', borderStyle: 'none' }}>
          <ImageList
            sx={{
              width: '100%',
              height: '100vh',
              overflow: 'hidden',
              filter: 'brightness(60%)',
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            <img src={CSImage} height="100%" />
            <h1>Test - Text Over Image</h1>
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
              <h2>Sign In</h2>
              <h5>
                Don't have an account?{' '}
                <a href="#" onClick={SetToRegister}>
                  Register
                </a>
              </h5>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                sx={{ width: '75%', marginBottom: '15px' }}
                value={username}
                onChange={UpdateUsername}
              />
              <TextField
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
              width: '25%',
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
            <h2>Register</h2>
          </Box>
        )}
      </Box>
    </>
  );
}
