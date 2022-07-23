import React, {useState} from 'react'
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton, ListItemIcon, ListItemText,
  Modal,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ModalBox from "../ModalBox";
import {useRecoilState} from "recoil";
import {themeState} from "../../stores/themeState";

const Header = () => {

  // 로그인 모달 상태 값
  const [loginModalActive, setLoginModalActive] = useState(false)
  // 로그인 모달 열기 이벤트
  const loginModalOpen = () => {
    setLoginModalActive(true)
  }
  // 로그인 모달 닫기 이벤트
  const loginModalClose = () => {
    setLoginModalActive(false)
  }

  // 사이드바 상태 값
  const [sideBarActive, setSideBarActive] = useState(false)
  // 사이드바 열기 이벤트
  const sideBarOpen = () => {
    setSideBarActive(true)
  }
  // 사이드바 닫기 이벤트
  const sideBarClose = () => {
    setSideBarActive(false)
  }

  // 테마 상태 값
  const [useTheme, setUseTheme] = useRecoilState(themeState)
  // 테마 변경 이벤트
  const themeChange = () => {
    localStorage.setItem('theme', useTheme === 'light' ? 'dark' : 'light')
    setUseTheme(useTheme === 'light' ? 'dark' : 'light')
  }

  return(
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={sideBarOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog
          </Typography>
          <Button color="inherit" onClick={loginModalOpen}>Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={sideBarActive}
        onClose={sideBarClose}
      >
        <Box sx={{width: '220px'}}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={themeChange}>
                <ListItemIcon>
                  {useTheme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
                </ListItemIcon>
                <ListItemText primary="모드" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <ModalBox modalActive={loginModalActive} modalClose={loginModalClose} />
    </>
  )
}

export default Header