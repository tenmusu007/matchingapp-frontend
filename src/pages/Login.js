import React, { useState, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AuthContext } from '../state/AuthContext';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { checkEmail, checkPassword } from '../helper/AuthValidation';
import { loginCall } from '../state/dispatch';
import CenterLayout from '../Layout/CenterLayout';

const Login = () => {
  const [email, setEmail] = useState({ input: undefined, errMessage: '' });
  const [password, setPassword] = useState({
    input: undefined,
    errMessage: '',
  });
  const refEmail = useRef();
  const refPassword = useRef();
  const { isLogin, dispatch, message } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      checkEmail(refEmail.current.value, email, setEmail) &&
      checkPassword(refPassword.current.value, password, setPassword)
    ) {
      loginCall(
        {
          email: refEmail?.current.value,
          password: refPassword?.current.value,
        },
        dispatch
      );
    }
  };

  if (isLogin) return <Navigate to='/' />;

  return (
    <Container>
      <CenterLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 345,
            mx: 'auto',
            py: '1.3rem',
          }}
        >
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              error={
                email.input === '' || message === 'We can not find the user'
              }
              helperText={
                email.input === ''
                  ? email.errMessage
                  : message === 'We can not find the user'
                  ? message
                  : ''
              }
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              inputRef={refEmail}
            />
            <TextField
              error={password.input === '' || message === 'password is wrong'}
              helperText={
                password.input === ''
                  ? password.errMessage
                  : message === 'password is wrong'
                  ? message
                  : ''
              }
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              inputRef={refPassword}
            />

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Link component={RouterLink} to='/signup' variant='body2'>
                  Signup
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CenterLayout>
    </Container>
  );
};

export default Login;
