import {useContext, useEffect} from 'react';
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
import {LoadingContext, NotificationContext, UserContext} from '../App';
import {getProfileApi, signInApi, SignInPayload} from '../api/auth';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const validationSchema = yup.object({
  email: yup
    .string()
    // .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
});

export default function SignIn() {
  const [, setIsLoggedIn] = useContext<any>(UserContext)
  const [, setNotification] = useContext<any>(NotificationContext)
  const [, setIsLoading] = useContext<any>(LoadingContext)
  const signInForm = useFormik<SignInPayload>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      try {
        await signInApi(values)
      } catch (e: any) {
        setNotification({message: e.message, severity: 'error'})
        return
      } finally {
        setIsLoading(false)
      }
      setIsLoggedIn(true)
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        await getProfileApi()
        setIsLoggedIn(true)
      } catch (e) {
        setIsLoggedIn(false)
      }
    }
    checkSession()
  }, [])

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
