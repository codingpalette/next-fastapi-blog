import React, {useState} from 'react'
import {
  AppBar,
  Box,
  Button, CardActions, CardContent,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton, ListItemIcon, ListItemText,
  Modal, TextField,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ModalBox from "../ModalBox";
import {useRecoilState} from "recoil";
import {themeState} from "../../stores/themeState";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";

const Header = () => {
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  // 로그인 모달 상태 값
  const [loginModalActive, setLoginModalActive] = useState(false)
  // 로그인 모달 열기 이벤트
  const loginModalOpen = () => {
    setLoginModalActive(true)
  }
  // 로그인 모달 닫기 이벤트
  const loginModalClose = () => {
    reset()
    setLoginModalActive(false)
  }
  // 로그인 이벤트
  const onSubmit = async (value) => {
    console.log(value)
    const data = {
      email: value.email,
      password: value.password
    }
    try {
      const res = await axios.post('/api/user/login', data)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
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
      <ModalBox
        modalActive={loginModalActive}
        modalClose={loginModalClose}
        title="로그인"
        footer={[
          <Button key="back" size="small" variant="outlined" onClick={loginModalClose}>닫기</Button>,
          <Button key="submit" type="submit" size="small" variant="contained" onClick={handleSubmit(onSubmit)} >로그인</Button>
        ]}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="아이디"
                size="small"
                fullWidth
                sx={{marginBottom: '1rem'}}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: '아이디를 입력해 주세요.' }}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="비밀번호"
                size="small"
                type="password"
                fullWidth
                // sx={{marginBottom: '1rem'}}
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: '아이디를 입력해 주세요.' }}
          />
        </Box>
      </ModalBox>
    </>
  )
}

export default Header