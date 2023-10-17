import {createContext, useState} from 'react'
import Home from './components/Home'
import SignIn from './components/SignIn'
import {LinearProgress} from '@mui/material'
export const UserContext = createContext({})
export const LoadingContext = createContext({})
export const UserThemeContext = createContext({})
export const NotificationContext = createContext({})

import { createTheme } from '@mui/material/styles';
import { green, red, blue, grey, yellow } from '@mui/material/colors';
import {ThemeProvider} from '@emotion/react'

export const installedThemes: any = {
  blue: createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: blue[300],
      },
    },
  }),
  green: createTheme({
    palette: {
      primary: {
        main: green[500],
      },
      secondary: {
        main: green[300],
      },
    },
  }),
  red: createTheme({
    palette: {
      primary: {
        main: red[500],
      },
      secondary: {
        main: red[300],
      },
    },
  }),
  yellow: createTheme({
    palette: {
      primary: {
        main: yellow[500],
      },
      secondary: {
        main: yellow[300],
      },
    },
  }),
  grey: createTheme({
    palette: {
      primary: {
        main: grey[300],
      },
      secondary: {
        main: grey[300],
      },
    },
  })
}

import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const closeNotification = () => {
    setNotification({message: '', severity: 'success'})
  }
  const [notification, setNotification] = React.useState<{message: string, severity: AlertColor}>({message: '', severity: 'success'});

  const [theme, setTheme]= useState(createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: red[500],
      },
    },
  }));
  return (
    <ThemeProvider theme={theme}>
      <NotificationContext.Provider value={[notification, setNotification]}>
        <UserThemeContext.Provider value={[theme, setTheme]}>
        {notification.message && <Snackbar open={true} autoHideDuration={4000} onClose={closeNotification}>
          <Alert severity={notification.severity} sx={{ width: '100%' }}>
              {notification.message}
          </Alert>
        </Snackbar> }
          <LoadingContext.Provider value={[isLoading, setIsLoading]}>
            <UserContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
              {isLoading && <LinearProgress />}
              {
                isLoggedIn ? <Home /> : <SignIn />
              }
            </UserContext.Provider>
          </LoadingContext.Provider>
        </UserThemeContext.Provider>
      </NotificationContext.Provider>
    </ThemeProvider>
  )
}

export default App
