import React, {useEffect, useMemo, useState} from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import {AppBar, Button, createTheme, IconButton, Toolbar, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import {useRecoilState} from "recoil";
import {themeState} from "../../stores/themeState";
import MenuIcon from '@mui/icons-material/Menu';

const Layout = ({ children }) => {
  const [useTheme, setUseTheme] = useRecoilState(themeState)

  const theme = useMemo(() =>
      createTheme({
        palette: {
          mode: useTheme,
          primary: {
            main: '#556cd6',
          },
          // secondary: {
          //   main: '#19857b',
          // },
          // error: {
          //   main: red.A400,
          // },
        },
      }),
    [useTheme]);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || "light"
    setUseTheme(localTheme)
  }, [])

  const themeChange = () => {
    console.log('useTheme', useTheme)
    localStorage.setItem('theme', useTheme === 'light' ? 'dark' : 'light')
    setUseTheme(useTheme === 'light' ? 'dark' : 'light')
  }

  return(
    <>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AppBar position="static">
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
              Photos
            </Typography>
          </Toolbar>
        </AppBar>
        <Button onClick={themeChange}>테마변경</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>

        <main>{children}</main>
      </ThemeProvider>
    </>
  )
}

export default Layout