import React, {useEffect, useState} from 'react'
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useRecoilState} from "recoil";
import {themeState} from "../../stores/themeState";
import Box from "@mui/material/Box";

interface LayoutProps {
  children: React.ReactNode;
};


const Layout = ({children}: LayoutProps) => {
  const [mode, setMode ] = useRecoilState(themeState)



  useEffect(() => {
    const localTheme: any = window.localStorage.getItem("theme")
    if (localTheme) {
      setMode(localTheme)
    } else {
      setMode('light')
    }
  }, [])

  const theme = React.useMemo(() =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );


  return(
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          width:'100%',
          height: '100%',
          minHeight: '100%',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}>
          {children}
        </Box>
      </ThemeProvider>
    </>
  )
}

export default Layout