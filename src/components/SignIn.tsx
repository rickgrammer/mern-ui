import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useFormik} from 'formik';
import {LoadingContext, UserContext} from '../App';

interface SignInPayload {
  email: string
  password: string
}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
});

export const api = (user: any) => new Promise(r => setTimeout(r, 3000))

export default function SignIn() {
  const [isLoggedIn, setIsLoggedIn] = React.useContext<any>(UserContext)
  const [_, setIsLoading] = React.useContext<any>(LoadingContext)
  const signInForm = useFormik<SignInPayload>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      await api(values)
      setIsLoggedIn(true)
      setIsLoading(false)
    },
  });

  // const [email, setEmail] = React.useState({
  //   value: '',
  //   isError: false,
  //   helperText: ''
  // })
  // const [password, setPassword] = React.useState({
  //   value: '',
  //   isError: ,
  //   helperText: ''
  // },


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={signInForm.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              id="email"
              name="email"
              label="Email Address"
              value={signInForm.values.email}
              onChange={signInForm.handleChange}
              onBlur={signInForm.handleBlur}
              error={signInForm.touched.email && Boolean(signInForm.errors.email)}
              helperText={signInForm.touched.email && signInForm.errors.email as string}
              margin="normal"
              required
              fullWidth
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={signInForm.values.password}
              onChange={signInForm.handleChange}
              onBlur={signInForm.handleBlur}
              error={signInForm.touched.password && Boolean(signInForm.errors.password)}
              helperText={signInForm.touched.password && signInForm.errors.password as string}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
