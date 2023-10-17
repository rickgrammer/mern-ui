import {useContext, useEffect, useState} from "react"
import {LoadingContext, NotificationContext, UserContext, UserThemeContext, installedThemes} from "../App"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Container, Grid, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {getProfileApi, signOutApi, updateProfileApi} from "../api/auth";

function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          some text
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default function ButtonAppBar() {

  const [, setIsLoggedIn] = useContext<any>(UserContext)
  const [preference, setPreference] = useState('green')
  const [, setTheme] = useContext<any>(UserThemeContext)
  const [, setNotification] = useContext<any>(NotificationContext)
  const [, setIsLoading] = useContext<any>(LoadingContext)
  const changePreference = async (event: SelectChangeEvent) => {
    setTheme(installedThemes[event.target.value])
    setIsLoading(true)
    await updateProfileApi(event.target.value)
    setPreference(event.target.value)
    setIsLoading(false)
    setPreference(event.target.value)
  }
  useEffect(() => {
    const setInitialPrefernce = async () => {
      setIsLoading(true)
      const response = await getProfileApi()
      setIsLoading(false)
      setTheme(installedThemes[response.data.preference])
      setPreference(response.data.preference)
      setNotification({message: 'Restored preference', severity: 'success'})
    }
    setInitialPrefernce()
  }, [])

  const handleSignout = async () => {
    try {
      await signOutApi()
      setIsLoggedIn(false)
    } catch (e: any) {
      setNotification({message: e.message, severity: 'error'})
    }
  }
  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="secondary" position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Demo
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-standard"
              value={preference}
              onChange={changePreference}
              label="Preferences"
              defaultValue="Ten"
            >
              {Object.keys(installedThemes).map((theme, i) => <MenuItem key={i} value={theme}>{theme.toUpperCase()}</MenuItem>)}
            </Select>
            <Button color="inherit" onClick={handleSignout}>Sign out</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <BasicCard />
        </Grid>
        <Grid item xs={4}>
          <BasicCard />
        </Grid>
        <Grid item xs={4}>
          <BasicCard />
        </Grid>
        <Grid item xs={8}>
          <BasicCard />
        </Grid>
        <Grid item xs={8}>
          <BasicCard />
        </Grid>
        <Grid item xs={4}>
          <BasicCard />
        </Grid>
        <Grid item xs={4}>
          <BasicCard />
        </Grid>
        <Grid item xs={8}>
          <BasicCard />
        </Grid>
      </Grid>
    </Container>
  );
}


