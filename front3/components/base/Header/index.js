import React, {useEffect, useState} from 'react'
import {
  AppBar,
  Box,
  Button, CardActions, CardContent, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem,
  Modal, Snackbar, TextField,
  Toolbar,
  Typography
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import ComputerIcon from '@mui/icons-material/Computer';
import ModalBox from "../../ModalBox";
import {useRecoilState} from "recoil";
import {themeState} from "../../../stores/themeState";
import {useForm, Controller} from "react-hook-form";
import axios from "axios";
import AlertBox from "../AlertBox";
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import {AccountCircle, ExpandLess, ExpandMore} from "@mui/icons-material";
import {login} from "../../../apis/user";
import Link from "next/link";

const Header = () => {
  // 유저 정보 가져오기
  const { data: userData, error: userError, mutate: userMutate } = useSWR('/api/user/check', fetcher)
  // 유저 메뉴 상태 값
  const [userMenuActive, setUserMenuActive] = useState(null)
  // 유저 메뉴 열기 이벤트
  const userMenuOpen = (event) => {
    setUserMenuActive(event.currentTarget)
  }
  // 유저 메뉴 닫기 이벤트
  const userMenuClose = () => {
    setUserMenuActive(null)
  }

  // 로그인 폼 값
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      login_id: '',
      nickname: '',
      password: '',
      password_check: ''
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
    setLoginModalMode('login')
    setLoginModalActive(false)
  }
  // 로그인 모달 모드 값
  const [loginModalMode, setLoginModalMode] = useState('login')
  // 로그인 모달 모드 변경 이벤트
  const loginModalModeChange = () => {
    setLoginModalMode(loginModalMode === 'login' ? 'join' : 'login')
  }
  // 버튼 로딩 상태 값
  const [buttonLoading, setButtonLoading] = useState(false)
  // 로그인 이벤트
  const onSubmit = async (value) => {
    setButtonLoading(true)
    const res = await login(value, loginModalMode)
    if (res.data.result === "fail") {
      alertOpen('error', res.data.message)
      setButtonLoading(false)
      return
    } else {
      alertOpen('success', res.data.message)
      setButtonLoading(false)
      await userMutate()
      setLoginModalMode('login')
      loginModalClose()
    }
  }
  // 로그아웃 이벤트
  const logOut = async () => {
    try {
      const res = await axios.post('/api/user/logout')
      console.log(res)
      await userMutate()
      userMenuClose()
    } catch (e) {
      if (e.response.data.detail) {
        alertOpen('error', e.response.data.detail.message)
      } else {
        alertOpen('error', '에러가 발생 했습니다.')
      }
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
  // 포스트 메뉴 상태 값
  const [postMenuActive, setPostMenuActive] = useState(false)
  // 포스트 메뉴 열기 토글 이벤트
  const postMenuToggle = () => {
    setPostMenuActive(!postMenuActive)
  }
  // 포스트 메뉴 닫기 이벤트
  const postMenuClose = () => {
    setPostMenuActive(true)
  }

  // 테마 상태 값
  const [useTheme, setUseTheme] = useRecoilState(themeState)
  // 테마 변경 이벤트
  const themeChange = () => {
    localStorage.setItem('blog_theme', useTheme === 'light' ? 'dark' : 'light')
    setUseTheme(useTheme === 'light' ? 'dark' : 'light')
  }

  // 경고창 상태 값
  const [alertActive, setAlertActive] = useState(false)
  // 경고창 텍스트
  const [alertText, setAlertText] = useState('')
  // 경고창 종류
  const [alertType, setAlertType] = useState('success')
  // 경고창 열기 이벤트
  const alertOpen = (type, text) => {
    setAlertType(type)
    setAlertText(text)
    setAlertActive(true)
  }
  // 경고창 닫기 이벤트
  const alertClose = () => {
    setAlertActive(false)
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
          {!userError && userData ? (
            <div>
              <IconButton
                size="large"
                onClick={userMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                anchorEl={userMenuActive}
                open={Boolean(userMenuActive)}
                onClose={userMenuClose}
              >
                <MenuItem onClick={userMenuClose}>Profile</MenuItem>
                {userData.level >= 10 && (
                  <Link href="/category_setting">
                    <MenuItem component="a">카테고리 설정</MenuItem>
                  </Link>
                )}
                <MenuItem onClick={logOut}>로그아웃</MenuItem>
              </Menu>
            </div>
          ): (
            <Button color="inherit" onClick={loginModalOpen}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={sideBarActive}
        onClose={sideBarClose}
      >
        <Box sx={{width: '220px'}}>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                coding palette
              </ListSubheader>
            }
          >
            <ListItem disablePadding>
              <Link href="/" passHref>
                <ListItemButton component="a">
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="HOME" />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItemButton onClick={postMenuToggle}>
              <ListItemIcon>
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText primary="POST" />
              {postMenuActive ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={postMenuActive} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link href="/post" passHref>
                  <ListItemButton component="a" sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="post" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
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
      <Dialog
        open={loginModalActive}
        onClose={loginModalClose}
        fullWidth
        maxWidth="xs"
      >
        <Box
          component="form"
          // noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogTitle>
            {loginModalMode === 'login' ? '로그인' : '회원가입'}
          </DialogTitle>
          <DialogContent >
          <div style={{marginTop: '10px'}}>
            <Controller
              name="login_id"
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
                  required
                />
              )}
            />
            {loginModalMode === 'join' && (
              <Controller
                name="nickname"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="닉네임"
                    size="small"
                    fullWidth
                    sx={{marginBottom: '1rem'}}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                  />
                )}
              />
            )}
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
                  sx={{marginBottom: '1rem'}}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  required
                />
              )}
            />
            {loginModalMode === 'join' && (
              <Controller
                name="password_check"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextField
                    label="비밀번호 확인"
                    size="small"
                    type="password"
                    fullWidth
                    sx={{marginBottom: '1rem'}}
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                  />
                )}
              />
            )}
          </div>
          <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button size="small" onClick={loginModalModeChange}>
              {loginModalMode === 'login' ? '회원가입' : '로그인'}
            </Button>
          </Box>
        </DialogContent>
          <DialogActions>
          <Button key="back" size="small" variant="outlined" onClick={loginModalClose}>닫기</Button>
          <LoadingButton
            key="submit"
            type="submit"
            size="small"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            loading={buttonLoading}
          >
            {loginModalMode === 'login' ? '로그인' : '회원가입'}
          </LoadingButton>
        </DialogActions>
        </Box>
      </Dialog>

      <AlertBox alertActive={alertActive} alertClose={alertClose} alertText={alertText} alertType={alertType} />
    </>
  )
}

export default Header