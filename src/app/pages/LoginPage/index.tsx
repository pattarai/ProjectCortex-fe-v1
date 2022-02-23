/**
 *
 * LoginPage
 *
 */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import Logo from '../../images/Logo.svg';

import { useDispatch } from 'react-redux';
import { useLoginSlice } from './slice';
import { axiosPost } from '../../requests';
import { useHistory } from 'react-router-dom';

const theme = createTheme();

const CenterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export function LoginPage() {
  const dispatch = useDispatch();
  const { actions } = useLoginSlice();
  const history = useHistory();

  const [values, setValues] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
    isError: false,
  });

  function checkError() {
    let noofErrors = 0;
    let err = { ...errors };

    Object.entries(values).forEach(([key, value]) => {
      if (
        value === null ||
        (typeof value === 'string' && value.trim() === '')
      ) {
        err[`${key}Error`] = 'This field is required';
        noofErrors++;
      } else if (
        key === 'email' &&
        typeof value === 'string' &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ) {
        err[`${key}Error`] = 'Invalid email address';
        noofErrors++;
      } else {
        err[`${key}Error`] = '';
      }
    });

    if (noofErrors === 0) {
      return true;
    } else {
      err.isError = true;
      setErrors(err);
      return false;
    }
  }

  const handleSubmit = async () => {
    if (checkError()) {
      const response = await axiosPost('/auth/login', values);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        history.push('/dashboard');
      } else {
        console.log(response.data);
      }
    }
    // dispatch(
    //   actions.login({
    //     email: data.get('email'),
    //     password: data.get('password'),
    //   }),
    // );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Logo})`,
            backgroundRepeat: 'no-repeat',
            // backgroundColor: 'purple',
            background: 'linear-gradient(to right bottom, #4776E6, #8E54E9)',
            // t =>
            //   t.palette.mode === 'light'
            //     ? t.palette.grey[50]
            //     : t.palette.grey[900]
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <img src={Logo} alt=" " />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 25,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="h1"
              sx={{ letterSpacing: 15, m: 1, color: '#8E54E9' }}
            >
              PATTARAI
            </Box>
            <Typography component="h2" variant="h5">
              Welcome to <span style={{ color: '#4776E6' }}> Cortex! </span>
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                // variant="standard"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username or Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={e => setValues({ ...values, email: e.target.value })}
              />
              <TextField
                // variant="standard"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
              {/* <Copyright sx={{ mt: 5 }} /> */}
              <CenterItem>
                <Button
                  type="button"
                  variant="contained"
                  size="medium"
                  sx={{ mt: 3, mb: 2 }}
                  color="secondary"
                  onClick={handleSubmit}
                >
                  Sign In
                </Button>
              </CenterItem>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
