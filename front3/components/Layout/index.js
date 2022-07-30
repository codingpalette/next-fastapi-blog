import Head from "next/head";
import React, {useEffect, useMemo, useState} from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from "@mui/material/styles";
import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  createTheme,
  IconButton,
  Paper,
  Typography
} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import {useRecoilState} from "recoil";
import {themeState} from "../../stores/themeState";
import {red} from "@mui/material/colors";
import Header from "../Header";
import Link from "next/link";

const Layout = ({ children, title, subTitle }) => {
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
              <Breadcrumbs aria-label="breadcrumb" sx={{marginBottom: '1rem'}}>
                <Link href="/">
                  <IconButton component="a" color="primary">
                    <HomeIcon />
                  </IconButton>
                </Link>
                {title && (
                  <Typography color="text.primary">{title}</Typography>
                )}
                {subTitle && (
                  <Typography color="text.primary">{subTitle}</Typography>
                )}
              </Breadcrumbs>
              {children}
            </Paper>
          </Container>
        </main>
      </ThemeProvider>
    </>
  )
}

export default Layout