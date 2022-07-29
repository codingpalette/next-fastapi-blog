import Head from "next/head";
import React, {useEffect, useMemo, useState} from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import {Button, Card, CardContent, Container, createTheme, Paper} from "@mui/material";
import {useRecoilState} from "recoil";
import {themeState} from "../../stores/themeState";
import {red} from "@mui/material/colors";
import Header from "../Header";

const Layout = ({ children }) => {
  const [useTheme, setUseTheme] = useRecoilState(themeState)

  const theme = useMemo(() =>
      createTheme({
        palette: {
          mode: useTheme,
          primary: {
            main: '#556cd6',
          },
          secondary: {
            main: '#19857b',
          },
          error: {
            main: red.A400,
          },
        },
      }),
    [useTheme]);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") || "light"
    setUseTheme(localTheme)
  }, [])

  return(
    <>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <Header />
        <main>
          <Container maxWidth="lg" sx={{padding: '1rem'}}>
            <Paper square elevation={3} sx={{padding: '1rem'}}>
              {children}
            </Paper>
          </Container>
        </main>
      </ThemeProvider>
    </>
  )
}

export default Layout