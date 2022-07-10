import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {Button} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useRecoilState} from "recoil";
import {themeState} from "../stores/themeState";



const Home: NextPage = () => {

  const [mode, setMode ] = useRecoilState(themeState)

  const theme = useTheme();

  const themeChange = () => {
    window.localStorage.setItem("theme", mode === 'light' ? 'dark' : 'light')
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
   <>
     <Box
       sx={{
         display: 'flex',
         width: '100%',
         alignItems: 'center',
         justifyContent: 'center',
         bgcolor: 'background.default',
         color: 'text.primary',
         borderRadius: 1,
         p: 3,
       }}
     >
       <IconButton sx={{ ml: 1 }} onClick={themeChange} color="inherit">
         {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
       </IconButton>
     </Box>

     <div>
       ffds
     </div>
   </>
  )
}

export default Home
