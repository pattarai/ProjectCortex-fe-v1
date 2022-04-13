/**
 *
 * ForgotPassword
 *
 */
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from 'styled-components';
import Logo from './images/Logo.svg';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { SlideProps } from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import { AiOutlineClose } from 'react-icons/ai';
import { axiosPost } from '../../requests';
import { useHistory, useLocation } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { parse } from 'query-string';
import Problem from '../../components/Problem';

type TransitionProps = Omit<SlideProps, 'direction'>;

const theme = createTheme();

const CenterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export function ForgotPassword() {
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [passwordToken, setPasswordToken] = React.useState<
    undefined | null | string
  >();

  const [values, setValues] = React.useState({ email: '' });
  const [passwordValues, setPasswordValues] = React.useState({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({
    emailError: '',
    passwordError: '',
    isError: false,
  });
  const [mailBox, setMailBox] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [responseError, setResponseError] = React.useState('');
  const [state] = React.useState<SnackbarOrigin>({
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
  const [transition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  function checkError(valueObject) {
    let noofErrors = 0;
    let err = { ...errors };

    Object.entries(valueObject).forEach(([key, value]) => {
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
    try {
      setLoading(true);
      if (checkError(values)) {
        const response = await axiosPost('/auth/forgot-password', values);
        setValues({ email: '' });
        setResponseError(response.data.message);
        setOpen(true);
      }
      setLoading(false);
    } catch {
      setError(true);
    }
  };

  const handleUpdatePassword = async () => {
    setLoading(true);
    try {
      if (passwordValues.password === passwordValues.confirmPassword) {
        if (checkError(passwordValues)) {
          const response = await axiosPost('/auth/update-password', {
            ...passwordValues,
            token: passwordToken,
          });
          setPasswordValues({ password: '', confirmPassword: '' });
          setResponseError(response.data.message);
          setOpen(true);
          setTimeout(() => {
            history.push('/');
          }, 3000);
        }
      } else {
        setResponseError('Password and Confirm Password do not match');
        setOpen(true);
      }
      setLoading(false);
    } catch {
      // console.log('Error');
      setError(true);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const { token } = parse(location.search);
    if (token) {
      let tokenString = String(token);
      setPasswordToken(tokenString);
      setMailBox(false);
    }
  }, []);

  if (loading) return <Loader />;

  if (error) return <Problem isError={error} />;

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
              Reset Your
              <span style={{ color: '#4776E6' }}> Cortex Password </span>
            </Typography>
            {/* <Typography component="h2" variant="h5" sx={{ marginTop: '10px' }}>
              Reset Your Password
            </Typography> */}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
              minWidth={'50%'}
            >
              {mailBox ? (
                <>
                  <TextField
                    // variant="standard"
                    value={values.email}
                    error={
                      errors.isError &&
                      (values.email.trim() === '' ? true : false)
                    }
                    helperText={
                      errors.isError &&
                      (errors.emailError !== '' ? errors.emailError : '')
                    }
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Username or Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={e =>
                      setValues({ ...values, email: e.target.value })
                    }
                  />
                  <Button
                    type="button"
                    variant="contained"
                    size="medium"
                    sx={{ mt: 3, mb: 2 }}
                    color="secondary"
                    onClick={handleSubmit}
                  >
                    Reset Password
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    // variant="standard"
                    value={passwordValues.password}
                    error={
                      errors.isError &&
                      (passwordValues.password.trim() === '' ? true : false)
                    }
                    helperText={
                      errors.isError &&
                      (errors.passwordError !== '' ? errors.passwordError : '')
                    }
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="Password"
                    type="password"
                    autoFocus
                    onChange={e =>
                      setPasswordValues({
                        ...passwordValues,
                        password: e.target.value,
                      })
                    }
                  />
                  <TextField
                    // variant="standard"
                    value={passwordValues.confirmPassword}
                    error={
                      errors.isError &&
                      (passwordValues.confirmPassword.trim() === ''
                        ? true
                        : false)
                    }
                    helperText={
                      errors.isError &&
                      (errors.passwordError !== '' ? errors.passwordError : '')
                    }
                    margin="normal"
                    required
                    fullWidth
                    id="confirm password"
                    label="Confirm Password"
                    name="Confirm Password"
                    type="password"
                    onChange={e =>
                      setPasswordValues({
                        ...passwordValues,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <Button
                    type="button"
                    variant="contained"
                    size="medium"
                    sx={{ mt: 3, mb: 2 }}
                    color="secondary"
                    onClick={handleUpdatePassword}
                  >
                    Update Password
                  </Button>
                </>
              )}
              <CenterItem>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  TransitionComponent={transition}
                  autoHideDuration={6000}
                  open={open}
                  onClose={handleClose}
                  message={responseError}
                  key={vertical + horizontal}
                  action={
                    <React.Fragment>
                      <Button
                        color="primary"
                        size="small"
                        onClick={handleClose}
                      >
                        UNDO
                      </Button>
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5 }}
                        onClick={handleClose}
                      >
                        <AiOutlineClose />
                      </IconButton>
                    </React.Fragment>
                  }
                />
              </CenterItem>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
